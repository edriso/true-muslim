import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const origin = process.env.TEST_ORIGIN || 'http://localhost:3000';
const lessons = JSON.parse(
  readFileSync('content/lessons.generated.json', 'utf8'),
);
const verses = JSON.parse(readFileSync('content/quran.generated.json', 'utf8'));
const hadith = JSON.parse(readFileSync('data/hadith.json', 'utf8'));
for (const [path, title, lesson] of [
  ['/', 'مسلم بحق'],
  ['/about', 'الفكرة والمصادر'],
  ['/daleel', 'الدليل والمصادر'],
  ...lessons.map((l) => [`/virtues/${l.slug}`, l.title, l]),
]) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.match(html, /lang="ar"/);
  assert.match(html, /dir="rtl"/);
  assert.ok(html.includes(title), `Missing title on ${path}`);
  assert.ok(html.includes('id="main"'), `Missing main target on ${path}`);
  if (path === '/daleel') {
    for (const ref of ['16:90', '4:58'])
      assert.ok(
        html.includes(verses[ref].text),
        `Missing foundational verse ${ref}`,
      );
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
    assert.ok(html.includes(lesson.scenario), `Missing scenario on ${path}`);
  }
  console.log(`PASS ${path}`);
}
assert.equal(
  (await fetch(new URL('/virtues/does-not-exist', origin))).status,
  404,
);
console.log('PASS unknown lesson returns 404');
