import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateLesson, buildContent } from './content.mjs';
import { fold } from './arabic.mjs';
const lesson = JSON.parse(
  readFileSync('content/lessons/sincerity.json', 'utf8'),
);
const run = (value, slugs = new Set(), orders = new Set()) =>
  validateLesson(
    value,
    slugs,
    orders,
    { '98:5': 'source', '98:1': 'prefixed' },
    { sincerity: {} },
  );
test('checked-in religious corpus and references pass the complete integrity pipeline', () =>
  buildContent());
test('invalid Quran references cannot reach a lesson', () =>
  assert.throws(() => run({ ...lesson, ayah: '115:1' }), /Unknown ayah/));
test('unknown hadith references fail rather than rendering invented fallback text', () =>
  assert.throws(() => run({ ...lesson, hadith: 'missing' }), /Unknown hadith/));
test('duplicate lesson URLs and ordering are rejected', () => {
  assert.throws(() => run(lesson, new Set([lesson.slug])), /Duplicate slug/);
  assert.throws(
    () => run(lesson, new Set(), new Set([lesson.order])),
    /duplicate order/,
  );
});
test('opening verses cannot silently include an attached basmala', () =>
  assert.throws(() => run({ ...lesson, ayah: '98:1' }), /basmala/));
test('handwritten Uthmani characters in editorial prose are rejected', () =>
  assert.throws(
    () => run({ ...lesson, meaning: '\u0671 test' }),
    /Do not type/,
  ));
test('empty suggested actions fail content review checks', () =>
  assert.throws(
    () => run({ ...lesson, actions: ['', 'two', 'three'] }),
    /nonempty/,
  ));
test('lessons require concrete examples of behavior to avoid', () => {
  assert.throws(() => run({ ...lesson, avoid: [] }), /behaviors to avoid/);
});
test('supplementary evidence must resolve to a real verse', () => {
  assert.throws(
    () => run({ ...lesson, boundaryAyah: '115:9' }),
    /Unknown boundary/,
  );
});
test('every narration records the printed edition it was checked against', () => {
  const hadith = JSON.parse(readFileSync('data/hadith.json', 'utf8'));
  const printed = {
    البخاري: ['صحيح البخاري، الطبعة السلطانية', '1681'],
    مسلم: ['صحيح مسلم، تحقيق محمد فؤاد عبد الباقي', '1727'],
  };
  for (const [id, record] of Object.entries(hadith)) {
    const [edition, book] = printed[record.collection];
    assert.equal(record.edition, edition, id);
    assert.ok(
      record.editionUrl.startsWith(`https://shamela.ws/book/${book}/`),
      `${id} must link the printed edition of its own collection`,
    );
    assert.match(record.book, /^كتاب /u, id);
    assert.match(record.chapter, /^باب /u, id);
    assert.ok(record.narrator.trim() && record.honorific.trim(), id);
  }
});
test('narrations that open mid-sentence carry their own attribution', () => {
  const hadith = JSON.parse(readFileSync('data/hadith.json', 'utf8'));
  for (const [id, record] of Object.entries(hadith)) {
    // A quote starting with ثم has no antecedent under the default
    // "قال رسول الله ﷺ" line, so it needs its own attribution.
    if (/^ثُمَّ\b/u.test(record.text))
      assert.ok(record.attribution, `${id} needs narration context`);
  }
});
test('surah names are displayed with hamzat al-qat where the source omits it', () => {
  buildContent();
  const quran = JSON.parse(
    readFileSync('content/quran.generated.json', 'utf8'),
  );
  assert.equal(quran['14:7'].surahName, 'إبراهيم');
});
test('ordinals use Arabic-Indic digits without depending on runtime locale data', async () => {
  const { arabicOrdinal, arabicReference } = await import('../lib/format.ts');
  assert.equal(arabicOrdinal(1), '٠١');
  assert.equal(arabicOrdinal(26), '٢٦');
  assert.equal(arabicReference('1955a'), '١٩٥٥a');
});
// These invariants are asserted inside buildContent as well; re-checking the
// emitted files is what proves the artifact the app imports really holds them.
test('the collection has no empty category, gap in reading order, or unused narration', () => {
  buildContent();
  const guide = JSON.parse(readFileSync('content/guide.json', 'utf8'));
  const lessons = JSON.parse(
    readFileSync('content/lessons.generated.json', 'utf8'),
  );
  const hadith = JSON.parse(readFileSync('data/hadith.json', 'utf8'));
  for (const category of guide.categories)
    assert.ok(
      lessons.some((lesson) => lesson.category === category),
      category,
    );
  assert.deepEqual(
    lessons.map((lesson) => lesson.order),
    lessons.map((_, index) => index + 1),
  );
  for (const id of Object.keys(hadith))
    assert.ok(
      lessons.some((lesson) => lesson.hadith === id),
      `unused narration ${id}`,
    );
  for (const foundation of guide.foundations)
    assert.ok(foundation.lessons.length > 0, foundation.reference);
});
test('every lesson names something to avoid, so the collection teaches both sides', () => {
  const lessons = JSON.parse(
    readFileSync('content/lessons.generated.json', 'utf8'),
  );
  for (const lesson of lessons) {
    assert.ok(lesson.avoid.length >= 2, lesson.slug);
    // The avoided behaviours are editorial examples; they must never repeat a
    // quoted narration back at the reader as if it were the evidence.
    for (const item of lesson.avoid)
      assert.ok(!/[\u0671\u0670\u06d6-\u06ed]/u.test(item), lesson.slug);
  }
});

// The source verifier compares folded Arabic. A mark class written with the
// characters themselves once parsed as U+0610-U+064B, which swallowed every
// Arabic letter: text folded to '' and `''.includes('')` passed every record.
// These assertions fail loudly if folding ever becomes lossy again.
test('folding Arabic drops marks and keeps letters', () => {
  assert.equal(fold('إِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ'), 'ان الصدق يهدي الي البر');
  assert.equal(fold('مَنْ لاَ يَرْحَمُ لاَ يُرْحَمُ'), 'من لا يرحم لا يرحم');
  // Ligatured honorifics on the printed pages match their spelled-out form.
  assert.equal(fold('قَالَ النَّبِيُّ ﷺ'), fold('قال النبي صلى الله عليه وسلم'));
  assert.equal(fold('بَابُ فَضْلِ ذِكْرِ اللهِ ﷿'), fold('باب فضل ذكر الله عز وجل'));
  // Orthographic variants fold together; different wording does not.
  assert.equal(fold('رحمة'), fold('رَحْمَهْ'));
  assert.notEqual(fold('الصدق'), fold('الكذب'));
  assert.ok(fold('نص').length > 0);
});
test('every narration record survives folding as non-empty Arabic', () => {
  const hadith = JSON.parse(readFileSync('data/hadith.json', 'utf8'));
  for (const [id, record] of Object.entries(hadith)) {
    assert.ok(fold(record.text).split(' ').length > 2, id);
    assert.ok(fold(record.chapter).startsWith('باب'), id);
  }
});

// A `swap` face paints the page in a system fallback and then re-renders it in the
// real one — the family change a reader sees on reload. The reading faces block
// instead, and the layout preloads them so the block period is a cached fetch.
test('the Arabic reading faces block instead of swapping', () => {
  const css = readFileSync('app/globals.css', 'utf8');
  const faces = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map((m) => m[1]);
  const blocking = faces.filter((f) => /font-display:\s*block/u.test(f));
  for (const family of [
    'Noto Naskh Arabic Variable',
    'Cairo Variable',
    'Amiri Quran',
  ])
    assert.ok(
      blocking.some((face) => face.includes(family)),
      `${family} may not swap: a fallback paint changes the face under the reader`,
    );
  // The overrides cover only the Arabic subset, so each has to carry the range its
  // package ships. A Fontsource update that widened or narrowed it would silently
  // leave characters back on the swapping face. Compared as sets, because the
  // formatter rewraps the range and the order is not meaningful.
  const ranges = (face) =>
    (/unicode-range:\s*([^;]+);/u.exec(face)?.[1] ?? '')
      .split(',')
      .map((part) => part.trim().toUpperCase())
      .filter(Boolean)
      .sort();
  for (const [pkg, subset] of [
    [
      '@fontsource-variable/noto-naskh-arabic/wght.css',
      'noto-naskh-arabic-arabic',
    ],
    ['@fontsource-variable/cairo/wght.css', 'cairo-arabic'],
  ]) {
    const shipped = readFileSync(`node_modules/${pkg}`, 'utf8').split(
      `${subset}-wght-normal */`,
    )[1];
    const ours = blocking.find((face) =>
      face.includes(`${subset}-wght-normal.woff2`),
    );
    assert.ok(ours, `no blocking face for ${subset}`);
    assert.deepEqual(
      ranges(ours),
      ranges(shipped),
      `${subset} subset range drifted from its package`,
    );
  }
});
test('the layout preloads every face the reader waits on', () => {
  const layout = readFileSync('app/layout.tsx', 'utf8');
  for (const subset of [
    'noto-naskh-arabic-arabic-wght-normal.woff2',
    'cairo-arabic-wght-normal.woff2',
    'amiri-quran-arabic-400-normal.woff2',
  ])
    assert.ok(layout.includes(`${subset}?url`), `${subset} is not preloaded`);
  // Font fetches are CORS-mode even same-origin; without this the preload is
  // discarded and the file is fetched a second time.
  assert.match(layout, /crossOrigin="anonymous"/u);
  assert.match(layout, /rel="preload"/u);
});
