/** Preserve suffixes used to distinguish narrations, e.g. Muslim 1955a. */
export function arabicReference(value: string | number) {
  return String(value).replace(
    /[0-9]/g,
    (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)],
  );
}
