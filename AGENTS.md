# Working on مسلم بحق

A free, Arabic guide to Islamic character. Correctness comes before polish. Read
`docs/content-policy.md` before editing religious content and `docs/architecture.md`
before changing the app or build pipeline. These rules apply to agents and humans.

## Religious integrity

- Use easy Modern Standard Arabic. Short sentences, familiar examples, respectful tone.
- The title is an aspiration, never a verdict about someone's faith. No takfir, sectarian
  attacks, shaming, invented fatwas, or promises of a specific reward without evidence.
- Character complements worship; never suggest it replaces prayer or other obligations.
- Qur'an is inserted by reference from the checksum-pinned Tanzil corpus. Never type,
  paraphrase as revelation, silently normalize, or edit a verse. Do not weaken validation.
- Hadith come from Sahih al-Bukhari or Sahih Muslim and nowhere else, with exact quoted
  text, narrator, collection, number, and the printed page you read them on. Clearly
  label excerpts. Never stitch narrations, and never add a diacritic to a quotation.
- Collate every narration against the printed critical edition of its collection and
  record its كتاب, باب and edition page. A quoted excerpt must read correctly on its own;
  give it an explicit `attribution` when the default prophetic line would not fit.
- Explanations and activities are editorial, not prophetic wording or binding rulings.
- Keep revelation out of editorial fields. A verse or a matn belongs in the block that
  displays it with its source, never restated as the site's own sentence in `meaning`,
  `summary`, `actions`, `avoid`, `scenario` or `boundary` — least of all on the page that
  already shows it. Describe what it says in your own words, or attribute it plainly.
- Do not invent consensus. State relevant disagreement with reliable references or omit
  the disputed issue from this introductory guide. Refer personal fatwas to qualified scholars.
- Evidence must support the actual claim. Search snippets and AI memory are not verification.
- Every `avoid` item is reprinted on `/mujtanabat` as a standalone prohibition, so each one
  must be carried by the lesson's own evidence. Do not slip a ruling into a bullet that the
  lesson's `boundary` then declines to give.
- Read the list of famous narrations that are not in either Sahih, and of the numbering
  traps, at the end of `docs/content-policy.md` before adding any narration.
- No images of people, music, advertising, or manipulative engagement mechanics.
- No scores, streaks, badges, rankings, or claims to measure piety.
- Source corrections require rechecking the source and documenting the change; a checksum
  proves integrity, not scholarly review. Do not claim the content was scholar-reviewed.

## Engineering and accessibility

- Keep route files in `app/`, shared UI in `components/`, content in `content/`,
  source records in `data/`, pure helpers in `lib/`, checks in `scripts/`, guides in `docs/`.
- Prefer server-rendered reading pages; client JavaScript only for real interactions.
- No backend, accounts, tracking, third-party font calls, or secrets in the client.
- Keep Arabic RTL throughout. Use logical CSS; never letter-space Arabic. Quran uses
  Amiri Quran, normal weight, line-height at least 2.5. Never clip diacritics. Body text
  is Naskh (Noto Naskh Arabic, which caps at weight 700); Cairo is for headings only,
  where its heavier weights are what its foundry designed for display.
- All three Arabic faces are `font-display: block`, overriding the `swap` Fontsource
  ships: swap paints the page in a system fallback and re-renders it, which changes the
  face and the metrics under the reader, and can drop a waqf mark from revelation. The
  layout preloads exactly those three files so the block period is a cached same-origin
  fetch rather than a blank page. Keep both halves — a blocking face that is not
  preloaded is worse than swapping. Only the Arabic subsets are overridden; latin, math
  and symbol subsets keep swap, so an incidental character never holds up the page.
- Semantic headings, visible focus, a skip link, readable contrast, 44px controls,
  keyboard access, narrow screens, and 200% zoom are requirements.
- Render every number through `lib/format.ts`. `toLocaleString('ar')` looks right in
  dev and silently returns Latin digits on the Workers runtime, which has no Arabic
  locale data.
- Do not add packages without a concrete need. Preserve the lockfile. Document setup.
- Keep the site functional without JavaScript for reading and navigation.
- Add third-party asset/data licenses to NOTICE. Preserve Tanzil attribution.

## Delivery

- Run `npm run check` and `npm run build` before finishing. Never hide failures.
- Run `npm run verify:sources` after touching `data/hadith.json`. It needs network
  access, so it stays out of `npm run check`; a failure means the record, not the tool.
  A pass means the wording is on the cited page — not that the span stays inside one
  narration, that `excerpt` is honest, or that the attribution introduces that clause.
- Do not trust a green check blindly. The shared folding in `scripts/arabic.mjs` once
  removed every Arabic letter, so the verifier compared empty strings and passed everything it
  was given. Write Arabic mark ranges as explicit escapes — spelled with the
  characters themselves the class parses as U+0610-U+064B and swallows the alphabet — and
  keep the test that folding preserves letters. When a check can only pass, it is not a
  check.
- Tests should protect source integrity, content references, and meaningful user behavior.
- Commit coherent milestones with short imperative messages. No AI signatures or
  Co-Authored-By trailers. Do not commit local settings, credentials, or build outputs.
- Do not push to GitHub or publish publicly unless the user authorizes it.

## Evidence index and expanding coverage

- Keep `/daleel` connected to the same lesson and source records as the reading pages.
  It must include the site's scope and limits, never an unsupported claim of completeness.
- `/mujtanabat` renders only from the lessons' own `avoid` lists. Never let it introduce
  a prohibition no lesson carries, and never drop the limits stated on it: examples not
  a classification, no measure for judging anyone, no fatwa, and repentance open.
- `content/guide.json` is the single source for category order and foundation verses.
  Tafsir URLs must identify the exact referenced verse.
- Preserve narration suffixes in both URLs and visible numbers (for example `1955a`).
- The authors' closing acknowledgement is editorial, not a hadith. Never attribute it
  to the Prophet or a Companion without separately verifying that attribution.
- New lessons include both useful actions and concrete examples of harm to avoid.
  Keep them appropriate for a broad age range; detailed personal rulings belong with scholars.
- A lesson may teach something to refuse. Where its evidence carries a threat or negates
  إيمان, the boundary must say the warning is about the act and not a verdict on a person.
- Editorial prose explains; it never restates the quoted narration as if it were the
  site's own sentence.
- Two lessons must not teach the same thing. A wide collection makes near-duplicates easy
  to write; if two overlap, re-scope one to what its own narration actually says rather
  than letting both drift toward the middle.
- Read `git log` before rewriting prose at scale. Fixes recorded there — a passive that
  left أهل العلم with no grammatical role, five boundaries reading as one filled-in
  template — are easy to reintroduce across dozens of files in a single pass.
- When changing lesson counts or scope, update README, architecture, and verification
  notes. Preserve existing lesson URLs even if the reading order improves.
