// Arabic folding shared by the source verifier and its tests.
//
// The mark ranges are written as explicit escapes on purpose. Spelled with the
// characters themselves, `[ؐ-ًؚ-ٰٟۖ-ۭـ]` looks like a list of diacritics but
// parses as U+0610-U+064B — which swallows every Arabic letter, silently folding
// any text to the empty string and turning every comparison into `'' === ''`.
const MARKS = /[ؐ-ًؚ-ٰٟۖ-ۭـ]/gu;

/** Compare Arabic by skeleton: vowel marks and orthographic variants differ
 *  between the printed edition and a record without the wording differing.
 *  The printed pages set honorifics as ligatures; spell them out first. */
export const fold = (value) =>
  value
    .replace(/ﷺ/gu, 'صلى الله عليه وسلم')
    .replace(/ﷻ/gu, 'عز وجل')
    .replace(/﷿/gu, 'عز وجل')
    .replace(MARKS, '')
    .replace(/[أإآٱ]/gu, 'ا')
    .replace(/ى/gu, 'ي')
    .replace(/ة/gu, 'ه')
    .replace(/[^ء-ي\s]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
