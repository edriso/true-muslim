import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
export function validateLesson(lesson, slugs, orders, verses, hadith) {
  for (const key of [
    'slug',
    'title',
    'category',
    'summary',
    'ayah',
    'hadith',
    'meaning',
    'scenario',
    'reflection',
    'boundary',
  ]) {
    assert.equal(typeof lesson[key], 'string', `Missing string: ${key}`);
    assert.ok(lesson[key].trim(), `Empty field: ${key}`);
  }
  assert.match(lesson.slug, /^[a-z]+(?:-[a-z]+)*$/);
  assert.ok(!slugs.has(lesson.slug), `Duplicate slug: ${lesson.slug}`);
  assert.ok(
    Number.isInteger(lesson.order) &&
      lesson.order > 0 &&
      !orders.has(lesson.order),
    'Invalid or duplicate order',
  );
  assert.ok(
    ['مع الله', 'مع الناس', 'في البيت', 'مع النفس'].includes(lesson.category),
    'Unknown category',
  );
  assert.ok(verses[lesson.ayah], `Unknown ayah: ${lesson.ayah}`);
  assert.ok(
    !lesson.ayah.endsWith(':1'),
    'Opening ayat need explicit basmala handling',
  );
  assert.ok(hadith[lesson.hadith], `Unknown hadith: ${lesson.hadith}`);
  assert.ok(
    Array.isArray(lesson.actions) &&
      lesson.actions.length === 3 &&
      lesson.actions.every((a) => typeof a === 'string' && a.trim()),
    'Three nonempty actions required',
  );
  // Revelation belongs in pinned source data, never in editorial fields.
  assert.ok(
    !/[\u0671\u0670\u06d6-\u06ed]/u.test(JSON.stringify(lesson)),
    'Do not type Uthmani Quran in lesson prose',
  );
  if (lesson.boundaryAyah != null)
    assert.ok(verses[lesson.boundaryAyah], 'Unknown boundary ayah');
  slugs.add(lesson.slug);
  orders.add(lesson.order);
}
export function buildContent() {
  for (const [file, expected] of Object.entries(read('data/integrity.json'))) {
    assert.equal(
      createHash('sha256').update(readFileSync(file)).digest('hex'),
      expected,
      `Source changed: ${file}. Review the source; do not bypass this check.`,
    );
  }
  const verses = {};
  for (const line of readFileSync('data/quran-uthmani.txt', 'utf8').split(
    '\n',
  )) {
    const match = /^(\d+)\|(\d+)\|(.+)$/.exec(line);
    if (match) verses[`${match[1]}:${match[2]}`] = match[3];
  }
  assert.equal(
    Object.keys(verses).length,
    6236,
    'Unexpected Quran verse count',
  );
  const names = read('data/surah-names.json');
  const hadith = read('data/hadith.json');
  for (const record of Object.values(hadith)) {
    for (const field of [
      'text',
      'url',
      'collection',
      'number',
      'narrator',
      'checkedAt',
    ])
      assert.ok(
        typeof record[field] === 'string' && record[field].trim(),
        `Hadith missing ${field}`,
      );
    assert.match(
      record.url,
      /^https:\/\/sunnah\.com\/(bukhari|muslim):[0-9]+[a-z]?$/,
    );
    assert.equal(typeof record.excerpt, 'boolean');
    assert.ok(record.url.endsWith(`:${record.number}`));
    assert.ok(['البخاري', 'مسلم'].includes(record.collection));
  }
  const slugs = new Set(),
    orders = new Set();
  const lessons = readdirSync('content/lessons')
    .filter((f) => f.endsWith('.json'))
    .map((file) => {
      const lesson = read(`content/lessons/${file}`);
      validateLesson(lesson, slugs, orders, verses, hadith);
      assert.equal(file, `${lesson.slug}.json`);
      return lesson;
    });
  assert.ok(lessons.length > 0);
  const references = new Set([
    '68:4',
    '2:285',
    '31:15',
    ...lessons.map((l) => l.ayah),
    ...lessons.map((l) => l.boundaryAyah).filter(Boolean),
  ]);
  const selected = {};
  for (const ref of references) {
    const [surah, ayah] = ref.split(':');
    assert.ok(
      verses[ref] && Number(ayah) <= names[surah].verses,
      `Invalid reference ${ref}`,
    );
    selected[ref] = {
      text: verses[ref],
      surahName: names[surah].name,
      ayah,
      url: `https://tanzil.net/#${ref}`,
    };
  }
  writeFileSync(
    'content/lessons.generated.json',
    JSON.stringify(
      lessons.sort((a, b) => a.order - b.order),
      null,
      2,
    ) + '\n',
  );
  writeFileSync(
    'content/quran.generated.json',
    JSON.stringify(selected, null, 2) + '\n',
  );
  console.log(
    `Verified ${lessons.length} lessons, ${Object.keys(hadith).length} hadith records, and ${references.size} Quran references.`,
  );
}
if (process.argv[1]?.endsWith('/content.mjs')) buildContent();
