// Re-runs the collation recorded in data/hadith.json against the printed
// critical editions. Network-dependent, so it is deliberately NOT part of
// `npm run check`; run it when a narration is added or its wording is changed.
//
//   npm run verify:sources
//
// It proves three things per record: the exact Arabic text appears on the cited
// edition page, the printed hadith number on that page matches the number in the
// Sunnah.com URL, and the recorded باب matches the page's own heading. It cannot
// prove the narration is being applied to the right lesson — that stays a human
// reading task, as docs/content-policy.md says.
import { readFileSync } from 'node:fs';

const EDITIONS = { البخاري: 1681, مسلم: 1727 };
const AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0 Safari/537.36';
const DIACRITICS = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/gu;
const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

/** Compare Arabic by skeleton: vowel marks and orthographic variants differ
 *  between the printed edition and Sunnah.com without the wording differing.
 *  The printed pages set the honorific as a ligature; spell it out first. */
const fold = (value) =>
  value
    .replace(/\uFDFA/gu, 'صلى الله عليه وسلم')
    .replace(/\uFDFB/gu, 'عز وجل')
    .replace(/\u0610|\u0611|\u0612|\u0613|\u0614|\u0615/gu, '')
    .replace(DIACRITICS, '')
    .replace(/[أإآٱ]/gu, 'ا')
    .replace(/ى/gu, 'ي')
    .replace(/ة/gu, 'ه')
    .replace(/[^ء-ي\s]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();

const toArabicDigits = (value) =>
  String(value).replace(/[0-9]/gu, (digit) => ARABIC_DIGITS[Number(digit)]);

async function page(url) {
  const response = await fetch(url, { headers: { 'user-agent': AGENT } });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  const html = await response.text();
  const title = /<title>(.*?)<\/title>/su.exec(html)?.[1] ?? '';
  const body = (/<div class="nass[^"]*"[^>]*>(.*)/su.exec(html)?.[1] ?? html)
    .split('تحميل الصفحة')[0]
    .replace(/<[^>]+>/gu, ' ');
  return { title, body };
}

/** Shamela maps a printed hadith number to the page carrying it. Narrations that
 *  share a number (1955a/1955b) resolve to the first of them, so a mismatch is
 *  only reported when the record has no suffix. */
async function pageIdFor(collection, number) {
  if (/[a-z]$/u.test(number)) return null;
  const response = await fetch(
    `https://shamela.ws/ajax/specialnumber2id/${EDITIONS[collection]}/${number}`,
    { headers: { 'user-agent': AGENT } },
  );
  if (!response.ok) return null;
  const id = (await response.text()).trim();
  return /^[0-9]+$/u.test(id) ? id : null;
}

const records = JSON.parse(readFileSync('data/hadith.json', 'utf8'));
const failures = [];
for (const [id, record] of Object.entries(records)) {
  const expected = `https://shamela.ws/book/${EDITIONS[record.collection]}/`;
  if (!record.editionUrl.startsWith(expected)) {
    failures.push(`${id}: edition link does not match ${record.collection}`);
    continue;
  }
  let printed, resolved;
  try {
    printed = await page(record.editionUrl);
    // Shamela can resolve a printed number to its own page id, which checks the
    // recorded link independently of how it was first found.
    resolved = await pageIdFor(record.collection, record.number);
  } catch (error) {
    failures.push(`${id}: ${error.message}`);
    continue;
  }
  const problems = [];
  if (resolved && !record.editionUrl.endsWith(`/${resolved}`))
    problems.push(
      `edition link points at a different page than the printed number resolves to (${resolved})`,
    );
  if (!fold(printed.body).includes(fold(record.text)))
    problems.push('text not found on the printed page');
  // `attribution` is either the narration's own framing, which must appear on the
  // printed page, or the narrator introducing their own report, which is already
  // verified through the narrator field. Nothing else may go in it.
  if (record.attribution) {
    const quoted = fold(printed.body).includes(fold(record.attribution));
    const namesNarrator = fold(record.attribution).includes(
      fold(record.narrator),
    );
    if (!quoted && !namesNarrator)
      problems.push('attribution is neither printed wording nor the narrator');
  }
  // Narration suffixes (1955a) share one printed number with their siblings.
  const number = toArabicDigits(record.number.replace(/[a-z]+$/u, ''));
  if (!printed.body.includes(number))
    problems.push(`printed number ${number} not found`);
  if (!fold(printed.title).includes(fold(record.chapter)))
    problems.push(`chapter differs from the page heading: ${printed.title}`);
  if (problems.length) failures.push(`${id}: ${problems.join('; ')}`);
  console.log(
    `${problems.length ? 'FAIL' : 'PASS'} ${id} — ${record.collection} ${record.number}`,
  );
}
if (failures.length) {
  console.error(`\n${failures.length} record(s) need review:`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `\nAll ${Object.keys(records).length} narrations match their printed editions.`,
  );
}
