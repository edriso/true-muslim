# Verification — 2026-09-05

Completed:

- `npm run check`: source digests, 10 lesson schemas, 10 hadith records, 14 Qur'an
  references, seven negative/positive integrity tests, TypeScript and lint passed.
- `npm run build`: production Worker and client assets built successfully.
- `TEST_ORIGIN=http://localhost:4173 npm run test:routes`: home, methodology and all
  ten lesson pages returned 200 from the production Worker. The check confirmed
  Arabic/RTL markup, lesson content, exact Quran/hadith text and source links.
  An unknown lesson returned HTTP 404.
- All ten hadith texts independently compared with their source pages, including
  diacritics after NFC normalization. Excerpt/full-text labels were checked.
- `npm audit`: zero known vulnerabilities after updating the affected starter packages.

Limitations:

- Browser automation was unavailable. No visual screenshots, real keyboard/screen-reader
  session, mobile browser, or 200% zoom test was performed. CSS includes responsive
  layouts, visible focus, logical spacing, reduced-motion and print rules, but those
  need human/browser confirmation.
- Source verification is not a qualified scholarly review. The guide says this plainly.
- There is no public deployment or GitHub push in this workflow. A private Sites
  deployment is prepared for review; GitHub CI is configured for future pushes.
