# Verification — 2026-09-06

This pass widened the collection from 26 lessons in five categories to 75 in seven,
adding 49 lessons and 48 narrations. Everything below was run, not assumed.

## Sources

- The pinned corpus `data/quran-uthmani.txt` is unchanged and still byte-identical to
  the upstream copy at `edriso/learn-tajweed@main` (SHA-256 `7f30c647…a7f326`), carrying
  the genuine Tanzil Uthmani 1.1 copyright block. `data/surah-names.json` is unchanged
  too (`956eb52f…787439`). Neither file is edited; the surah names whose upstream
  spelling drops hamzat al-qat' are still corrected at display time only.
- All 85 referenced verses resolve from that corpus, and none of the original 33 was
  dropped. The 52 added in this pass were read in full against the lesson they support,
  and candidates were rejected on that reading: 31:13 was dropped from the omens lesson
  because equating التطيّر with الشرك is a scholarly judgement the site has no sahih
  evidence for, and 27:47, which is about التطيّر itself, took its place. Six more were
  replaced during review for the same reason — a verse whose displayed span does less than
  its placement implies is a claim the reader cannot check.
- All 74 narrations were collated against the printed critical editions —
  al-Tab'a al-Sultaniyya for al-Bukhari (shamela.ws book 1681) and Muhammad Fu'ad
  Abd al-Baqi's edition for Muslim (book 1727). `npm run verify:sources` passes for all
  74: the exact Arabic appears on the cited page, the printed number resolves back to
  that page, and the recorded باب matches the page's own heading.
- **Sunnah.com could not be inspected in this pass.** It answered HTTP 403 to every
  request from this machine, with several user agents and through a rendering fetcher.
  The printed critical edition was therefore the inspected source for wording, narrator,
  number, كتاب and باب — which `docs/content-policy.md` already names as the authority
  for all five — and the Sunnah.com URL is carried as a reader-facing link whose number
  is the printed number. Nothing in the repository claims a Sunnah.com page was read.
  A contributor who can reach the site should spot-check the new links.
- 65 of the 74 records are from al-Bukhari, whose Sultaniyya text is fully vocalised.
  Muslim's transcription on Shamela is uneven, so it was used only where al-Bukhari
  carries nothing equivalent, and never where the page looked defective.

## What this pass found and fixed

- **Six candidate narrations were rejected on inspection**, not adjusted to fit:
  Muslim 1598 (the page prints `لَعَنَ رَسُولَ اللَّهِ … أَكَلَ الربا` for
  `لَعَنَ رَسُولُ اللَّهِ … آكِلَ الرِّبَا`); Muslim 2230 and Bukhari 6006 (no named
  Companion in the isnad, so `narrator` could not be filled from the page); Muslim 2228
  and Muslim 49 (both need a suffixed Sunnah.com identifier that cannot be checked while
  the site is unreachable); Bukhari 2086 (it does carry `وَآكِلِ الرِّبَا وَمُوكِلِهِ`, but
  inside a list that also names ثمن الدم، الواشمة and المصور, importing three unrelated
  and partly disputed questions into a lesson about usury).
- **`إن الله يحب إذا عمل أحدكم عملا أن يتقنه` and its relatives stayed out.** One more
  entry was added to that list in `docs/content-policy.md`: the widely quoted
  `مَنِ اسْتَعْمَلْنَاهُ عَلَى عَمَلٍ فَرَزَقْنَاهُ رِزْقًا…` is **not** Muslim 1833's wording —
  the page reads `فَكَتَمَنَا مِخْيَطًا فَمَا فَوْقَهُ`. Bukhari 7174 carries the point instead.
- **A numbering trap was found and the verifier taught to handle it.** Bukhari 6412's
  matn is on Shamela page 9625, but `specialnumber2id` resolves 6412 to 9626, which
  holds only its mutaba'a and no wording. `verify:sources` now accepts a differing page
  id only when both pages report the same printed ج and ص, so a genuinely wrong link
  still fails. It also folds the ﷿ ligature, which the `dhikr` باب heading prints.
- **Two quotations were narrowed deliberately.** Bukhari 7373 is cut at
  `وَلَا يُشْرِكُوا بِهِ شَيْئًا`, and Bukhari 6044 at `سِبَابُ الْمُسْلِمِ فُسُوقٌ`. Both
  continuations need a scholarly qualification an introductory page should not attempt,
  and neither is what its lesson claims. Both are labelled as excerpts.
- **Editorial prose that mirrored its own narration was rewritten.** Ten lessons had a
  `meaning` that restated the quoted matn almost verbatim — `debt`, `relieve-distress`,
  `wara`, `sanctity`, `earning`, `road-harm`, `wages`, `quran`, `no-cheating`,
  `false-witness`. They now explain in the site's own words, or attribute plainly to the
  Prophet ﷺ what the narration says. The longest remaining overlap between any lesson's
  prose and its narration is the honorific phrase itself.
- **The home page's verse is now 33:21, and 68:4 moved to `/about`.** The hero addresses
  the reader in every line and the site's name is an aspiration to become something, so
  the verse fronting it is the one addressed to the reader and naming the example to
  follow. 68:4 is the Qur'an's testimony about the Prophet's خُلُق — Tafsir al-Sa'di
  explains it by listing the traits these lessons teach — but it speaks about him rather
  than to the reader, so it answers what he was like and now does that on `/about`. The
  caption `قدوتنا` had been sitting under 68:4, which does not license it; that mismatch
  was the signal, and the fix was the verse rather than the caption. The hero's verse type
  scale came down from a display size to roughly the in-page verse size, because 139
  characters do not sit in an arch built for four words.
- **A route change now lands at the top of the page.** Following a link from the foot of
  a long page left the reader at the foot of the next one, and sometimes part way down it
  — measured in a browser: `/virtues/road-harm` at y=1933 to `/about` landed at y=1949,
  and `/about` at y=1983 to `/mujtanabat` landed at y=15518. The router does scroll, but
  it then calls `focus()` on the new `<main>` for screen readers, and focusing an element
  scrolls it into view, so every navigation settled at y=99 — `<main>`'s top, with the
  header pushed off screen. That focus lands in a microtask after a layout effect, so one
  correction is not enough; `components/layout/ScrollToTop.tsx` scrolls on the route
  change and again on the next animation frame, both `instant` so the smooth rule is not
  turned into an animation. All four measured navigations now land at exactly 0, and
  same-page anchors, cross-page fragments and back-button restoration were re-measured
  and still behave.
- **The reading faces no longer change under the reader.** Fontsource ships
  `font-display: swap`, so every load painted the page in a system fallback and then
  re-rendered it in Naskh and Cairo — a visible family change and a reflow on each
  refresh. Amiri Quran was already overridden to `block` for revelation; Naskh and Cairo
  now are too, for their Arabic subsets only, declared after the imports so they win.
  The layout preloads those three files (91 KB, 30 KB and 44 KB, immutably cached), so
  the block period is a same-origin fetch and, on the refresh case that prompted this,
  a cache hit. Latin, math and symbol subsets keep `swap`. Two tests guard it: one that
  the three faces block and that the overridden subset ranges still match what the
  packages ship, and one that every route preloads all three.
- **The header now carries only the three reading destinations**, and the footer carries
  the whole map. `عن الموقع` moved out of the header: four items wrapped to two lines on a
  narrow screen, and the page about the site is not a reading destination. Nothing became
  unreachable — the footer is a `<nav>` with its own accessible name and lists every page,
  and `/about` is still linked from the home page's closing section. `scripts/smoke.mjs`
  now asserts both navigation landmarks and all three internal destinations on every
  route, so the split cannot silently become a dead end.
- **The lesson index was restructured for its new size.** 75 links in a sticky box
  meant the reader's own lesson was usually below the fold, and the skip link landed a
  keyboard user in front of all of them. The index now follows the article in the DOM
  and is ordered back into the first column with CSS, and each category is its own
  `<details>` with only the reader's category open. Both are pure HTML and CSS; nothing
  new depends on JavaScript.
- **`npm run verify:sources` was not comparing any wording at all, and now does.**
  Its diacritic class was written with the marks themselves, `[ؐ-ًؚ-ٰٟۖ-ۭـ]`
  spelled as characters. That reads as a list of diacritics and parses as **U+0610-U+064B**,
  a range that contains every Arabic letter. `fold()` therefore reduced both the record and
  the printed page to the empty string, and the three comparisons that matter — the text
  appearing on the page, the bab matching the heading, the attribution being printed
  wording — were each an empty string inside an empty string, which is always true. Only
  the printed-number check and the page-id resolution were ever real. This predates this
  pass: the tool has been reporting PASS for wording it never read. The folding now lives
  in `scripts/arabic.mjs` with the ranges as explicit escapes and a comment saying why,
  `scripts/content.test.mjs` asserts that folding keeps letters and drops marks, and a
  second test asserts every record still folds to real Arabic. All 74 records were then
  re-verified under the fixed comparison, and all 74 pass — so the wording was in fact
  right, but until now nothing had established that.
- **A defect was found in the verifier's own new code and fixed.** The fallback that
  compares printed pages swallowed fetch errors, so a 429 or a DNS blip from Shamela
  would have been reported as "this record links the wrong page" — blaming the record
  for a tool failure, which is exactly backwards. It now says which of the two happened.
- **Every threat-carrying narration has a boundary that refuses the verdict.** Where the
  evidence negates إيمان (Bukhari 13, 15, 33), names a فسوق or a موبقة, or promises Allah
  as an adversary, the lesson says in its own `boundary` that the warning is about the
  act, that a negation of faith here is a negation of its completeness, and that judging
  a person is not the reader's to do.

## Checks run

- `npm run check`: source digests, 75 lesson schemas, 74 narration records, 85 Qur'an
  references, 17 integrity tests, TypeScript and lint — all passing. Three new
  build-time assertions and four new tests were added and pass: no category without a lesson, reading order
  contiguous from 1, and no narration record that no lesson cites.
- `npm run verify:sources`: all 74 narrations match their printed editions — under the
  repaired comparison, which is the first run of this tool that actually read the Arabic.
- A static accessibility audit was run against all 79 rendered routes: exactly one `h1`
  each, no heading level skipped, every `nav` landmark separately named, no link without
  an accessible name, every decorative `svg` hidden, no duplicate `id`, and every
  `aria-labelledby` and same-page fragment resolving to an element that exists. Clean.
  Every interactive element kind was checked against the 44px rule; `.footer-brand` was
  the one target under it at 1.3rem, and now sets its own minimum.
- Glyph coverage was recomputed by parsing the shipped woff2 files with fontTools:
  Noto Naskh Arabic covers every codepoint in the lesson prose and the narrations,
  Cairo covers every title, category and Arabic-Indic ordinal, and Amiri Quran covers
  every codepoint of the 85 selected verses, annotation marks included. Nothing in the
  new content falls back to a system font.
- `npm run build`: production Worker and client assets built.
- `TEST_ORIGIN=http://localhost:8787 npm run test:routes`: home, about, evidence index,
  the new `/mujtanabat` page and all 75 lesson pages return 200 with Arabic/RTL markup,
  exact Qur'an and hadith text, each narration's attribution line, its كتاب and باب, its
  source links and its printed-edition link. `/mujtanabat` is additionally asserted to
  carry every lesson and every one of its avoided behaviours, so the gathered list can
  never silently drift from the lessons. An unknown lesson returns 404.
- `PAGES_BASE_PATH=/true-muslim npm run build:pages`: the artifact holds 80 HTML files
  (home, about, evidence index, what-to-avoid, 75 lessons and the 404 page). It was
  link-checked the way GitHub Pages serves a project site: all 90 internal URLs and
  assets across those files resolve, every same-page and cross-page fragment
  (`#virtues`, `#category-N`, `#avoid-N`, the `/daleel` sections) exists on its target
  page, and no link is missing the `/true-muslim` prefix. That was a local check against
  the built artifact, not the live site.
- The digest for `data/hadith.json` was updated only after `verify:sources` passed on
  the new bytes, which is the order `docs/content-policy.md` requires.

## Limitations

- **This is not scholarly review.** A checksum and a collation prove the text is the
  text; they say nothing about whether applying a narration to a virtue is sound, or
  whether the Arabic explanation is the best one. The site says this plainly on
  `/daleel`, and it matters more now that the collection includes lessons about
  prohibitions, where a careless sentence does more damage than a clumsy one about
  kindness. A qualified reviewer should read the 49 new lessons before wide release.
- **One narration is displayed without vocalisation.** Muslim 2589, the definition of
  غيبة, is printed unpointed on its page in this edition's transcription. It is shown
  exactly as printed, because adding diacritics to a quotation is editing it. It will
  look different from the other 73 records, and that is deliberate.
- **The editorial review pass caught nine defects in the new content, all fixed.** The
  worst was a regression: `تُسأل عنها أهل العلم` — a passive that leaves أهل العلم with no
  grammatical role — went into sixteen boundaries, and commit `cc0de88` had removed that
  exact clause from four boundaries in the smaller collection. The rest: Qur'anic wording
  written as the site's own sentence in five lessons, directly under the block already
  displaying the verse; two excerpts cut on a bare `و` with no antecedent; a lesson whose
  `meaning` told the صبرة الطعام story while quoting a narration that does not contain it;
  `zakat` quoted from two conditions into the instruction to Mu'adh, under an attribution
  that introduces the narration rather than that clause; three complete matns flagged as
  excerpts; four accusatives coordinated onto a nominative predicate; `نُقيس` for `نَقيس`;
  and three reward claims the cited evidence does not carry (`أثقله في الميزان`, a
  three-way promise about how du'a is answered, and `وإنما برحمة الله`).
- **Six verses were replaced because they were doing less work than their placement
  implied** — 9:108 opens on مسجد الضرار, 68:11 is a bare genitive, 51:26 has neither
  subject nor guests in it, 2:172 is about eating and thanking rather than earning, 5:2 is
  one of the longest verses in the corpus with the operative clause last, and 25:67 sat on
  a lesson whose narration is about planting. They now read 74:4, 49:6, 51:24, 67:15,
  4:135 and 11:61. 25:67 stayed in the collection as the supplementary verse behind
  `wastefulness`'s boundary, where "not squandering is not stinginess either" is exactly
  what it says.
- **Two independent review passes were run over the finished change** — one editorial,
  against `docs/content-policy.md`, and one engineering, against the accessibility and
  layout rules in `AGENTS.md` — and their findings were applied rather than filed. The
  engineering pass is what caught the verifier defect and the index problems above.
- **A green `verify:sources` still does not cover everything.** It asserts the folded text
  appears *somewhere* on the cited page. It cannot see whether a quoted span straddles two
  narrations, whether `excerpt` is labelled correctly, or whether an `attribution` actually
  introduces the clause quoted rather than the narration. Four defects in this pass sat in
  exactly that blind spot and were caught by reading the printed pages, not by the tool.
- **Agents assisted with sourcing, and were not trusted.** The narrations were located
  and transcribed with the help of parallel subagents working from the printed pages;
  every record they produced was then re-verified mechanically by `verify:sources`
  against the same pages, and every editorial decision above was made by hand. Several
  of their findings corrected the brief they were given.
- **Some browser behaviour is now measured rather than reasoned about.** The scroll work
  above was done by driving a local Chrome over the DevTools protocol from a script with
  no added dependencies, reading `window.scrollY` across real navigations. That covers
  scroll position only. There are still no screenshots, and no real keyboard,
  screen-reader, mobile-browser or 200% zoom session: the responsive, focus and
  dark-scheme rules remain reasoned about, not seen. A human should look at the site in a
  browser before wide release.
- `npm run verify:sources` depends on shamela.ws staying reachable and keeping its page
  ids. If it starts failing wholesale, check the site before the data.
- No sitemap or canonical URLs are emitted yet. `metadataBase` plus `app/sitemap.ts` and
  per-page `alternates.canonical` are still worth adding.

## Earlier pass — 2026-09-05

The first source review of the original 26 lessons found and fixed four defects, kept
here because they are the kind of mistake that recurs: `bukhari:1` was missing a sukun
and had its shadda and fatha in non-canonical order; `bukhari:527` was quoted as a
three-word fragment beginning `ثُمَّ` under a prophetic line that made it unreadable, and
now carries the question it answers; the `sincerity` باب carried an honorific the printed
heading does not have; and every ordinal on the site rendered as a Latin digit in
production, because the Workers runtime ships without Arabic locale data and
`toLocaleString('ar')` silently fell back. Three excerpts that stopped short of their own
point were widened then as well (`bukhari:6094`, `bukhari:1469`, `muslim:2702b`).

That pass also computed contrast for every colour pair in both schemes — every text pair
passes WCAG AA, and the only sub-3:1 pairs are decorative dividers. That was not
recomputed here because no colour changed; the new rules add layout and spacing only.
Glyph coverage was recomputed, and is listed above.
