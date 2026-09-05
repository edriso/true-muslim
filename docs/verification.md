# Verification — 2026-09-05

## Sources

Every Qur'an reference and every narration was checked again in this pass, and the
checks are now repeatable rather than a one-time claim.

- The pinned corpus `data/quran-uthmani.txt` is byte-identical to the upstream copy at
  `edriso/learn-tajweed@main` (SHA-256 `7f30c647…a7f326`), and it carries the genuine
  Tanzil Uthmani 1.1 copyright block. `data/surah-names.json` matches upstream too
  (`956eb52f…787439`). Neither file is edited; the four surah names whose upstream
  spelling drops hamzat al-qat' are corrected at display time only.
- All 33 referenced verses resolve from that corpus and were read against the virtue
  they support, including the four supplementary boundary verses (31:15, 4:148, 42:41,
  60:8) and the three foundation verses.
- All 26 narrations were collated against the printed critical editions —
  al-Tab'a al-Sultaniyya for al-Bukhari (shamela.ws book 1681) and Muhammad Fu'ad
  Abd al-Baqi's edition for Muslim (book 1727). Wording, narrator, number, kitab and
  bab all match. `npm run verify:sources` re-runs that collation on demand and also
  asks Shamela to resolve each printed number back to a page id, so a wrong link is
  caught rather than trusted.

Four defects were found and fixed by this pass:

- `bukhari:1` was missing a sukun and had its shadda and fatha in non-canonical order.
- `bukhari:527` was quoted as the three-word fragment `ثُمَّ بِرُّ الْوَالِدَيْنِ`
  under the line "قال رسول الله صلى الله عليه وسلم", which is unreadable as printed.
  It now carries the question it answers, attributed to Ibn Mas'ud.
- The `sincerity` bab carried an honorific the printed heading does not have.
- Every ordinal on the site rendered as a Latin digit in production. The Workers
  runtime ships without Arabic locale data, so `toLocaleString('ar')` silently fell
  back — `01 الإخلاص` in an Arabic sidebar. All ordinals now map digits explicitly.

Three excerpts that stopped short of their own point were widened to the full
prophetic sentence (`bukhari:6094`, `bukhari:1469`, `muslim:2702b`).

## Checks run

- `npm run check`: source digests, 26 lesson schemas, 26 narration records, 33 Qur'an
  references, 13 integrity tests, TypeScript and lint — all passing.
- `npm run verify:sources`: all 26 narrations match their printed editions.
- `npm run build`: production Worker and client assets built.
- `TEST_ORIGIN=http://localhost:8787 npm run test:routes`: home, about, evidence index
  and all 26 lesson pages return 200 with Arabic/RTL markup, exact Qur'an and hadith
  text, the narration's attribution line, its kitab and bab, its source links and its
  printed-edition link. An unknown lesson returns 404.
- Contrast was computed, not estimated, for every colour pair in both schemes. Every
  text pair passes WCAG AA; the only sub-3:1 pairs left are plain dividers, which are
  decorative and exempt.
- Glyph coverage was checked by parsing the shipped woff2 files: Noto Naskh Arabic
  covers every codepoint in the lesson and narration prose, Cairo covers every UI
  string including Arabic-Indic digits, and Amiri Quran covers all nine Qur'anic
  annotation marks the corpus uses.

## Limitations

- No browser automation was available. There are no screenshots, and no real keyboard,
  screen-reader, mobile-browser or 200% zoom session was run. The responsive, focus,
  reduced-motion, dark-scheme and print rules are reasoned about and computed, not
  seen. A human should look at the site in a browser before wide release.
- Source verification is not scholarly review. A checksum and a collation prove the
  text is the text; they say nothing about whether the editorial application of a
  narration to a virtue is sound. The site says this plainly on `/daleel`.
- `npm run verify:sources` depends on shamela.ws staying reachable and keeping its
  page ids. If it starts failing wholesale, check the site before the data.
- The Pages artifact was link-checked by serving it the way GitHub Pages serves a
  project site: all 41 internal URLs across the 30 prerendered pages resolve, and an
  unknown path returns the 404 page. That was a local mock, not the live site.
- No sitemap or canonical URLs are emitted yet. Now that the site has a public URL,
  `metadataBase: new URL('https://edriso.github.io/true-muslim/')` plus `app/sitemap.ts`
  and per-page `alternates.canonical` are worth adding.
