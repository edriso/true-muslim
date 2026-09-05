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
- Hadith must have an inspected trusted source, exact quoted text, narrator, collection,
  number, and supported authenticity. Clearly label excerpts. Never stitch narrations.
- Explanations and activities are editorial, not prophetic wording or binding rulings.
- Do not invent consensus. State relevant disagreement with reliable references or omit
  the disputed issue from this introductory guide. Refer personal fatwas to qualified scholars.
- Evidence must support the actual claim. Search snippets and AI memory are not verification.
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
  Amiri Quran, normal weight, and line-height at least 2.5. Never clip diacritics.
- Semantic headings, visible focus, a skip link, readable contrast, 44px controls,
  keyboard access, narrow screens, and 200% zoom are requirements.
- Do not add packages without a concrete need. Preserve the lockfile. Document setup.
- Keep the site functional without JavaScript for reading and navigation.
- Add third-party asset/data licenses to NOTICE. Preserve Tanzil attribution.

## Delivery

- Run `npm run check` and `npm run build` before finishing. Never hide failures.
- Tests should protect source integrity, content references, and meaningful user behavior.
- Commit coherent milestones with short imperative messages. No AI signatures or
  Co-Authored-By trailers. Do not commit local settings, credentials, or build outputs.
- Do not push to GitHub or publish publicly unless the user authorizes it.

## Evidence index and expanding coverage

- Keep `/daleel` connected to the same lesson and source records as the reading pages.
  It must include the site's scope and limits, never an unsupported claim of completeness.
- `content/guide.json` is the single source for category order and foundation verses.
  Tafsir URLs must identify the exact referenced verse.
- Preserve narration suffixes in both URLs and visible numbers (for example `1955a`).
- The authors' closing acknowledgement is editorial, not a hadith. Never attribute it
  to the Prophet or a Companion without separately verifying that attribution.
- New lessons include both useful actions and concrete examples of harm to avoid.
  Keep them appropriate for a broad age range; detailed personal rulings belong with scholars.
- When changing lesson counts or scope, update README, architecture, and verification
  notes. Preserve existing lesson URLs even if the reading order improves.
