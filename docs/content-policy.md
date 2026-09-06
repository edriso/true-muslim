# Writing and verifying content

## Audience and voice

Use simple MSA, not dialect or ornamental sermons. Address the reader gently. Explain
one idea at a time. Never judge an individual's faith. The guide teaches character
alongside worship; it does not replace learning obligatory worship or asking scholars.

## Lesson contract

Each JSON lesson includes slug, title, summary, category, meaning, ayah reference,
hadith ID, three suggested actions, at least two concrete examples of what to avoid,
a realistic scenario, reflection question, and one boundary preventing a common
misunderstanding. Activities are suggestions, not religiously prescribed counts or
routines. Order is explicit, contiguous from 1, and stable; the URL of an existing
lesson never changes even when the reading order improves. `content/guide.json` owns
the categories, and a category with no lesson fails the build, as does a narration
record no lesson cites.

A lesson may teach something to refuse rather than something to do. Those lessons take
the same shape: the meaning explains the harm, the actions are steps away from it, and
the boundary says that the warning is about the act and never a verdict on a person.
Where the evidence carries a threat, the boundary says so explicitly.

## Qur'an

Source: Tanzil Uthmani text 1.1, obtained byte-for-byte from edriso/learn-tajweed's
pinned corpus. SHA-256: 7f30c647331a61100ebf24a80507dc0fcdd9f2df97f1312b5b2dfcb982a7f326.
Official source and terms: https://tanzil.net/download/ and
https://tanzil.net/docs/text_license. The build resolves numeric references and emits
only needed verses. Lessons reference non-opening verses, avoiding prefixed basmala
ambiguity. Never write Qur'an in UI prose or lesson fields.

The home page hero uses 68:4, which is the Qur'an's own testimony about the Prophet's
خُلُق — the subject of the whole site, and the verse Tafsir al-Sa'di explains by listing
the very traits these lessons teach. 33:21 (`أُسْوَةٌ حَسَنَةٌ`) was weighed against it and
placed on `/about` instead: al-Sa'di reads it in its context at the Trench and reports the
usooli point drawn from it, that the Prophet's *acts* are evidence as his words are, so
its centre of gravity is following him rather than his character. The caption under a
displayed verse must state what that verse says — the hero's said `قدوتنا`, which is
33:21's claim, and now states 68:4's.

## Hadith

Use exact short excerpts from Sahih al-Bukhari or Sahih Muslim, and from nothing else.
Store the source URL, collection, number, narrator, honorific, كتاب, باب, printed
edition, printed-edition URL, excerpt flag, inspection date, and exact text in
data/hadith.json. Collection membership supports the label صحيح; do not invent a
separate grading attribution. The source manifest protects record bytes from unreviewed
changes. Recheck wording, attribution, and context before intentionally updating its
digest. Do not copy website commentary or translations.

The wording, narrator, number, كتاب and باب are read off the page of the printed
critical edition, which is the authority for all of them. The Sunnah.com URL is the
reader-facing link, and its number must be the printed number. On 2026-09-06 Sunnah.com
answered 403 to every request from the machine this work ran on, including through a
rendering fetcher, so the printed page is what a contributor inspects; never describe a
Sunnah.com page as inspected unless it actually was.

The two editions:

- Sahih al-Bukhari — الطبعة السلطانية, https://shamela.ws/book/1681
- Sahih Muslim — تحقيق محمد فؤاد عبد الباقي, https://shamela.ws/book/1727

`npm run verify:sources` folds Arabic through `scripts/arabic.mjs` before comparing. Keep
the mark ranges there as explicit escapes: written with the characters themselves the class
parses as U+0610-U+064B, which contains every Arabic letter, so every comparison silently
becomes one empty string inside another. `npm run test` guards this. And remember what a
green run does not cover: it finds the text *somewhere* on the page, so it cannot tell you
that a span stays inside one narration, that `excerpt` is right, or that an `attribution`
introduces the clause you quoted rather than the narration. Those stay a reading task.

Record the exact page as `editionUrl`. `https://shamela.ws/ajax/specialnumber2id/<book>/<number>`
resolves a printed number straight to its page id, so the link never has to be hunted
for; `npm run verify:sources` uses it to re-check every stored link. Bukhari numbering on Sunnah.com follows the
Sultaniyya edition and Muslim numbering follows Abd al-Baqi, so the printed number
must match the number in the URL. Suffixed Muslim identifiers (1955a, 2702b) mark
successive narrations under one printed number; link the page carrying that narration.

Prefer al-Bukhari wherever it carries the meaning. The Sultaniyya text on Shamela is
fully vocalised and marks the prophetic matn with `«»`. The Muslim text there is only
partly vocalised, mixes the muhaqqiq's notes in right after the matn — usually opening
with a word in brackets, and never quotable — and carries real transcription defects.
Where the Muslim page is visibly defective, choose a different narration rather than
copying it, and never repair it: adding a diacritic or fixing a case ending inside a
quotation is editing revelation-adjacent text, which this project does not do. If the
only sound narration for a point is printed without vocalisation, quoting it as printed
is acceptable, and the reason belongs in `docs/coverage.md`.

`excerpt` marks a partial quotation of the prophetic wording, not a partial
quotation of the page. A matn followed only by isnad notes (تابعه، ورواه، وقال لنا)
is complete, so it is `false`. A matn quoted from the middle of a longer saying, or
lifted out of a surrounding story or dialogue, is `true`.

A quotation must be readable as printed. An excerpt that opens with a connective
(ثم، و) and has no antecedent is not acceptable under the default line
"قال رسول الله صلى الله عليه وسلم". Either widen the excerpt to a self-contained span
or set `attribution` to the wording that actually introduces it — for example a
Companion's question in a narration shaped as a dialogue. `attribution` may hold only one of
two things: the narration's own framing, copied from the printed page with Arabic
punctuation added, or the narrator introducing their own report. `npm run
verify:sources` enforces exactly that. Never paraphrase a narration into it, and
never put editorial explanation there — that belongs in the lesson's `meaning`.

## Review checklist

- Evidence matches the virtue and is not stretched into a ruling it does not establish.
- Wording matches the linked narration, and partial text is labelled as an excerpt.
- Practical prose is visibly separate from evidence, with no invented reward or threat.
- Family duties do not become permission for harm; patience does not mean accepting abuse.
- Gentleness is not surrendering rights; obedience to people is not unconditional.
- Every lesson source opens at a specific verse or narration.
- The narration text, narrator, number, كتاب and باب match the printed critical edition.
- Run npm run check and npm run build. Record actual checks; never claim scholarly approval.

## Supplemental evidence for boundaries

The parents lesson links Luqman 31:15: refusing a sinful demand does not remove
kind companionship. The speech lesson links An-Nisa 4:148 for speaking about
injustice. These support the specific boundaries, separately from each lesson's main
verse and hadith. The applications were independently checked against the source
pages during development; this is a source review, not a claim of scholarly approval.

## Evidence page and scope (expanded collection)

`content/guide.json` owns the categories, foundation verses, their source explanations,
related lessons, and non-lesson verse references. `/daleel` lists every lesson's
primary and supplementary evidence from the same records used by the lesson pages.
It explains what this introductory site does not claim. Do not claim comprehensive
coverage of Islam, guaranteed spiritual outcomes, or completed scholarly review. This
holds however far the collection grows: a wider guide is still a guide, and describing
it as complete would be a false claim about the religion, not a marketing flourish.

`/mujtanabat` gathers every lesson's `avoid` examples in one place, grouped by
category, each linked back to its lesson. It renders from the same records; it never
introduces a prohibition that no lesson carries. Because a bare list of sins is easy to
misread, the page states its own limits directly: teaching examples rather than an
exhaustive classification, sins differing in degree, no measure for judging anyone, no
fatwa for a particular case, and repentance open to whoever fell into something.

The authors' closing statement is original editorial wording, not a hadith or a
quotation attributed to a Companion. Its permissibility and meaning were checked at
https://islamweb.net/ar/fatwa/print.php?id=79988 (accessed 2026-09-05). It does not
remove the authors' duty to acknowledge and correct mistakes.

Foundation summaries were checked against Tafsir al-Sa'di hosted by King Saud University:

- https://quran.ksu.edu.sa/tafseer/saadi/sura16-aya90.html
- https://quran.ksu.edu.sa/tafseer/saadi/sura4-aya58.html
- https://quran.ksu.edu.sa/tafseer/saadi/sura2-aya177.html
  They are brief editorial summaries, not verbatim tafsir or independent rulings.
  Justice also links 60:8 for kindness and fairness toward non-hostile non-Muslims.

Narration identifiers may contain suffixes (1955a, 2734a, 2702b). Preserve these in
links and visible labels; never convert the entire identifier with Number().
Every lesson has an `avoid` list: examples of harmful behavior, not an exhaustive
classification of forbidden acts. Labels must distinguish it from quoted evidence.
The repentance explanation includes leaving the sin and regretting it, checked
against Tafsir al-Sa'di on 3:135:
https://quran.ksu.edu.sa/tafseer/saadi/sura3-aya135.html.
The modesty lesson's invitation to ask needed religious questions is supported by
https://sunnah.com/bukhari:130; no private or intimate details are requested by the app.
Foundation summaries added with the wider collection were read against Tafsir al-Sa'di
on the same host: https://quran.ksu.edu.sa/tafseer/saadi/sura4-aya36.html,
https://quran.ksu.edu.sa/tafseer/saadi/sura6-aya151.html and
https://quran.ksu.edu.sa/tafseer/saadi/sura49-aya12.html (accessed 2026-09-06). They
remain brief editorial summaries, not verbatim tafsir and not independent rulings.

## Surah display names

`data/surah-names.json` is kept byte-identical to its upstream copy, so it keeps the
upstream spellings that omit hamzat al-qat' (ابراهيم، الانسان، النبإ) and that write
hamzat al-wasl as qat' (الإنفطار، الإنشقاق). `scripts/content.mjs` corrects only how
those names are displayed, through `SURAH_NAME_FIXES`. Never edit the pinned file to
fix a spelling; add the display correction and keep the digest unchanged.

## Narrations that look permitted but are not

Each of these circulates widely in Arabic character material and would fail the
Bukhari/Muslim-only rule. All were checked negatively against the full text of both
Sahihs before being listed here.

- `إن الله يحب إذا عمل أحدكم عملا أن يتقنه` — the usual proof text for إتقان العمل.
  In Abu Ya'la 4386, al-Tabarani's al-Awsat 897 and al-Bayhaqi's Shu'ab 4929-4931.
  Its grading is disputed, not agreed: every chain runs through Mus'ab b. Thabit.
  Do not use it, and do not call it sahih.
- `تبسمك في وجه أخيك صدقة` — **it is in al-Adab al-Mufrad 891, which is al-Bukhari's
  other book, not the Sahih.** A takhrij line reading "البخاري" here is a trap. Also
  Tirmidhi 1956 and Ibn Hibban 474. If the virtue is wanted, use Muslim 2626's own
  wording (`ولو أن تلقى أخاك بوجه طلق`) — the two are separate narrations that share
  only their Companion, so moving the first wording onto the second number is a real
  misattribution, not a paraphrase.
- `خيركم خيركم لأهله` — not in either Sahih and not in al-Adab al-Mufrad either.
  Cite Tirmidhi 3895 if it is ever needed elsewhere; never al-Bukhari.
- `المسلمون على شروطهم` — al-Bukhari carries it only mu'allaqan. A ta'liq is not a
  narration you may cite with a number.
- `على شرط البخاري` / `على شرط الشيخين` means *meets their criteria*, never
  *narrated by them*. This confusion is the commonest source of a false attribution.
- `مَنِ اسْتَعْمَلْنَاهُ عَلَى عَمَلٍ فَرَزَقْنَاهُ رِزْقًا، فَمَا أَخَذَ بَعْدَ ذَلِكَ فَهُوَ غُلُولٌ` — this
  wording is not in Sahih Muslim. Muslim 1833 reads
  `فَكَتَمَنَا مِخْيَطًا فَمَا فَوْقَهُ`. For a lesson on a job as a trust, Bukhari 7174
  (`باب هدايا العمال`) is the narration that says it.
- `أَعْطُوا الْأَجِيرَ أَجْرَهُ` and `لَا ضَرَرَ وَلَا ضِرَارَ` and `اتَّقِ اللهَ حَيْثُمَا كُنْتَ`
  and the curse on `الراشي والمرتشي` are in neither Sahih.

## Numbering traps inside the two Sahihs

- Bukhari 3186 is printed as a merged entry `٣١٨٦ - ٣١٨٧`. Prefer 3188 for a clean
  single-number citation of the same meaning.
- Muslim 2558/2559: the printed page numbers the narration and its own muta'aba
  differently, so one is a transcription slip. Cite Bukhari 6065 instead.
- Muslim 1468 is the dila' narration; 1469 is `لا يفرك مؤمن مؤمنة`. A Sunnah.com-derived
  dataset indexes the latter as `1468b`, which contradicts the print. Inspect the site
  directly before writing a record for it.
- Muslim 1054 is `قد أفلح من أسلم ورزق كفافا`; 1051 is a different hadith. The 1051
  citation is widespread and wrong.
- Bukhari 2465 and 6229 both carry the haqq al-tariq narration in different wordings.
  Do not attach one's wording to the other's number.
- Bukhari 6412's matn is on Shamela page 9625, but `specialnumber2id` resolves 6412 to
  9626, which holds only its mutaba'a (`٦٤١٢ (م) … مِثْلَهُ`) and no wording. One printed
  page can be split across two page ids, so `verify:sources` accepts a differing id only
  when the two pages report the same printed ج and ص.
- Muslim 49 prints two narrations (٧٨ and ٧٩) under one number on two pages, and Shamela
  resolves `49` to the isnad-only page. A record for the matn would need the suffixed
  Sunnah.com identifier `49a`, which cannot be checked while Sunnah.com is unreachable;
  the ship parable (Bukhari 2493) carries the same point with an unsuffixed number.
- Bukhari 3331 carries `اسْتَوْصُوا بِالنِّسَاءِ` cleanly, but on page 7738 the Sultaniyya
  prints 5185 and 5186 inside one pair of `«»` with `٥١٨٦ -` mid-quotation, so 5186
  cannot be quoted without either crossing a number boundary or opening on a bare `و`.
- Bukhari 2086 does carry `وَآكِلِ الرِّبَا وَمُوكِلِهِ`, but in a list that also names
  ثمن الدم، الواشمة and المصور. Quoting it on a lesson about usury imports three
  unrelated and partly disputed questions the page cannot answer, so it is unused.
- Bukhari's `باب إماطة الأذى` is مُعَلَّق (`وقال همام عن أبي هريرة…`, no isnad). Use 2472
  in `باب من أخذ الغصن` for clearing a path.
- Bukhari 6006 (`كَافِلُ الْيَتِيمِ`) has no Companion in its isnad at all, so its
  `narrator` cannot be filled; 6005 ends on a hand gesture (`هَكَذَا`). Bukhari 6007 is
  the clean narration in that باب, but it names الأرملة والمسكين and not the orphan, so
  the lesson must not promise an orphan narration.
