import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateLesson, buildContent } from './content.mjs';
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
