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
    read('content/guide.json').categories.includes(lesson.category),
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
  assert.ok(
    Array.isArray(lesson.avoid) &&
      lesson.avoid.length >= 2 &&
      lesson.avoid.every((value) => typeof value === 'string' && value.trim()),
    'At least two behaviors to avoid required',
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
  const integrity = read('data/integrity.json');
  assert.deepEqual(
    Object.keys(integrity).sort(),
    ['data/hadith.json', 'data/quran-uthmani.txt', 'data/surah-names.json'],
    'Missing or unexpected source integrity entry',
  );
  for (const [file, expected] of Object.entries(integrity)) {
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
  const EDITIONS = {
    البخاري: { name: 'صحيح البخاري، الطبعة السلطانية', book: 1681 },
    مسلم: { name: 'صحيح مسلم، تحقيق محمد فؤاد عبد الباقي', book: 1727 },
  };
  const HONORIFICS = ['رضي الله عنه', 'رضي الله عنها', 'رضي الله عنهما'];
  for (const record of Object.values(hadith)) {
    for (const field of [
      'text',
      'url',
      'collection',
      'number',
      'narrator',
      'honorific',
      'book',
      'chapter',
      'edition',
      'editionUrl',
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
    assert.equal(
      record.collection,
      record.url.includes('/bukhari:') ? 'البخاري' : 'مسلم',
      'Collection does not match source URL',
    );
    assert.ok(
      HONORIFICS.includes(record.honorific),
      'Companion honorific must be one of the accepted forms',
    );
    assert.match(
      record.book,
      /^كتاب /u,
      'Book must name a كتاب of the collection',
    );
    assert.match(
      record.chapter,
      /^باب /u,
      'Chapter must name a باب of the collection',
    );
    // The printed critical edition is the wording check behind the reader-facing link.
    const printed = EDITIONS[record.collection];
    assert.equal(record.edition, printed.name, 'Unexpected printed edition');
    assert.match(
      record.editionUrl,
      new RegExp(`^https://shamela\\.ws/book/${printed.book}/[0-9]+$`),
      'Printed edition link must open the matching book',
    );
    if (record.attribution != null)
      assert.ok(
        typeof record.attribution === 'string' && record.attribution.trim(),
        'Empty narration attribution',
      );
    assert.match(record.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
    assert.ok(
      !Number.isNaN(Date.parse(record.checkedAt)),
      'Invalid source inspection date',
    );
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
  const guide = read('content/guide.json');
  for (const foundation of guide.foundations) {
    assert.ok(foundation.title && foundation.summary);
    assert.ok(verses[foundation.reference], 'Unknown foundation verse');
    const [chapter, verse] = foundation.reference.split(':');
    assert.equal(
      foundation.tafsir,
      `https://quran.ksu.edu.sa/tafseer/saadi/sura${chapter}-aya${verse}.html`,
      'Tafsir link must match the foundation verse',
    );
    assert.ok(
      foundation.lessons.every((slug) => slugs.has(slug)),
      'Unknown foundation lesson',
    );
    assert.match(
      foundation.tafsir,
      /^https:\/\/quran\.ksu\.edu\.sa\/tafseer\/saadi\/sura[0-9]+-aya[0-9]+\.html$/,
    );
  }
  // The pinned upstream metadata omits hamzat al-qat' in a few surah names.
  // Correct only how the name is displayed; the pinned file stays byte-identical.
  const SURAH_NAME_FIXES = {
    14: 'إبراهيم',
    76: 'الإنسان',
    78: 'النبأ',
    82: 'الانفطار',
    84: 'الانشقاق',
  };
  const references = new Set([
    ...guide.pageReferences,
    ...guide.foundations.map((f) => f.reference),
    ...lessons.map((l) => l.ayah),
    ...lessons.map((l) => l.boundaryAyah).filter(Boolean),
  ]);
  const selected = {};
  for (const ref of references) {
    const [surah, ayah] = ref.split(':');
    assert.ok(
      verses[ref] && Number(ayah) <= names[surah].verses && ayah !== '1',
      `Invalid reference ${ref}`,
    );
    selected[ref] = {
      text: verses[ref],
      surahName: SURAH_NAME_FIXES[surah] ?? names[surah].name,
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
