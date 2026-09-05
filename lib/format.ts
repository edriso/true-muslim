/** Preserve suffixes used to distinguish narrations, e.g. Muslim 1955a. */
export function arabicReference(value: string | number) {
  return String(value).replace(
    /[0-9]/g,
    (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)],
  );
}

/**
 * Two-digit Arabic-Indic ordinal. `toLocaleString('ar')` cannot be used: the
 * Workers runtime ships without the Arabic locale data and silently returns
 * Latin digits, which put `01` in the middle of Arabic headings in production.
 */
export function arabicOrdinal(value: number) {
  return arabicReference(String(value).padStart(2, '0'));
}
