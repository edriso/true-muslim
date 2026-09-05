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
  ...lessons.map((l) => [`/virtues/${l.slug}`, l.title, l]),
]) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.match(html, /lang="ar"/);
  assert.match(html, /dir="rtl"/);
  assert.ok(html.includes(title), `Missing title on ${path}`);
  assert.ok(html.includes('id="main"'), `Missing main target on ${path}`);
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
