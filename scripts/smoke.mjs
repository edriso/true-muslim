import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const origin = process.env.TEST_ORIGIN || 'http://localhost:3000';
// The Pages export prefixes every internal URL; the Worker build does not.
const base = process.env.TEST_BASE_PATH ?? '';
const lessons = JSON.parse(
  readFileSync('content/lessons.generated.json', 'utf8'),
);
const verses = JSON.parse(readFileSync('content/quran.generated.json', 'utf8'));
const hadith = JSON.parse(readFileSync('data/hadith.json', 'utf8'));
const guide = JSON.parse(readFileSync('content/guide.json', 'utf8'));
for (const [path, title, lesson] of [
  ['/', 'مسلم بحق'],
  ['/about', 'عن الموقع'],
  ['/daleel', 'الدليل والمصادر'],
  ['/mujtanabat', 'ما نجتنبه'],
  ...lessons.map((l) => [`/virtues/${l.slug}`, l.title, l]),
]) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.match(html, /lang="ar"/);
  assert.match(html, /dir="rtl"/);
  assert.ok(html.includes(title), `Missing title on ${path}`);
  assert.ok(html.includes('id="main"'), `Missing main target on ${path}`);
  // Two navigation landmarks with distinct names, and every destination
  // reachable from the footer even when the header does not carry it.
  assert.ok(
    html.includes('aria-label="القائمة الرئيسية"'),
    `No header nav on ${path}`,
  );
  assert.ok(
    html.includes('aria-label="روابط الموقع"'),
    `No footer nav on ${path}`,
  );
  // The reading faces block rather than swap, so every page has to preload them or
  // the block period becomes a visibly blank one.
  for (const face of [
    'noto-naskh-arabic-arabic',
    'cairo-arabic',
    'amiri-quran-arabic',
  ])
    assert.match(
      html,
      new RegExp(`<link[^>]*rel="preload"[^>]*${face}[^>]*as="font"`),
      `${face} is not preloaded on ${path}`,
    );
  for (const href of ['/about', '/daleel', '/mujtanabat'])
    assert.ok(
      html.includes(`href="${base}${href}"`),
      `Not reachable from ${path}: ${href}`,
    );
  if (path === '/mujtanabat') {
    // The page is the only place the whole avoid list is gathered, so every
    // lesson and every one of its examples has to reach it.
    for (const item of lessons) {
      assert.ok(html.includes(item.title), `Missing lesson: ${item.slug}`);
      for (const avoid of item.avoid)
        assert.ok(
          html.includes(avoid),
          `Missing avoided behavior: ${item.slug}`,
        );
    }
    assert.ok(html.includes('حدود هذه القائمة'));
    assert.ok(html.includes('ليست ميزانًا نحكم به على أحد'));
    assert.ok(!html.includes('NaN'), 'Invalid reference number');
  }
  if (path === '/daleel') {
    for (const { reference, tafsir } of guide.foundations) {
      assert.ok(
        html.includes(verses[reference].text),
        `Missing foundational verse ${reference}`,
      );
      assert.ok(html.includes(tafsir), `Missing tafsir link ${reference}`);
    }
    for (const item of lessons) {
      const record = hadith[item.hadith];
      assert.ok(
        html.includes(record.url),
        `Missing evidence index hadith: ${item.slug}`,
      );
      assert.ok(
        html.includes(verses[item.ayah].url),
        `Missing evidence index Quran: ${item.slug}`,
      );
      if (item.boundaryAyah)
        assert.ok(
          html.includes(verses[item.boundaryAyah].url),
          `Missing supplementary source: ${item.slug}`,
        );
      const label = record.number.replace(
        /[0-9]/g,
        (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)],
      );
      assert.ok(
        html.includes(label),
        `Missing full hadith identifier: ${item.slug}`,
      );
      for (const field of ['book', 'chapter', 'editionUrl', 'edition'])
        assert.ok(
          html.includes(record[field]),
          `Missing narration ${field}: ${item.slug}`,
        );
    }
    assert.ok(html.includes('ما الذي لا يدّعيه هذا الموقع؟'));
    assert.ok(html.includes('وليست حديثًا نبويًا'));
    assert.ok(!html.includes('NaN'), 'Invalid reference number');
  }
  if (lesson) {
    assert.ok(
      html.includes(verses[lesson.ayah].text),
      `Missing exact Quran text on ${path}`,
    );
    assert.ok(
      html.includes(hadith[lesson.hadith].text),
      `Missing exact hadith text on ${path}`,
    );
    assert.ok(
      html.includes(hadith[lesson.hadith].url),
      `Missing source link on ${path}`,
    );
    assert.ok(
      html.includes(hadith[lesson.hadith].chapter),
      `Missing narration placement on ${path}`,
    );
    const { attribution } = hadith[lesson.hadith];
    assert.ok(
      html.includes(attribution ?? 'قال رسول الله صلى الله عليه وسلم:'),
      `Missing narration attribution on ${path}`,
    );
    assert.ok(html.includes(lesson.scenario), `Missing scenario on ${path}`);
  }
  console.log(`PASS ${path}`);
}
assert.equal(
  (await fetch(new URL('/virtues/does-not-exist', origin))).status,
  404,
);
console.log('PASS unknown lesson returns 404');
