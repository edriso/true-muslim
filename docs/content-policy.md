# Writing and verifying content

## Audience and voice

Use simple MSA, not dialect or ornamental sermons. Address the reader gently. Explain
one idea at a time. Never judge an individual's faith. The guide teaches character
alongside worship; it does not replace learning obligatory worship or asking scholars.

## Lesson contract

Each JSON lesson includes slug, title, summary, category, meaning, ayah reference,
hadith ID, three suggested actions, a realistic scenario, reflection question, and
one boundary preventing a common misunderstanding. Activities are suggestions, not
religiously prescribed counts or routines. Order is explicit and stable.

## Qur'an

Source: Tanzil Uthmani text 1.1, obtained byte-for-byte from edriso/learn-tajweed's
pinned corpus. SHA-256: 7f30c647331a61100ebf24a80507dc0fcdd9f2df97f1312b5b2dfcb982a7f326.
Official source and terms: https://tanzil.net/download/ and
https://tanzil.net/docs/text_license. The build resolves numeric references and emits
only needed verses. Lessons reference non-opening verses, avoiding prefixed basmala
ambiguity. The home page uses 68:4. Never write Qur'an in UI prose or lesson fields.

## Hadith

Use exact short excerpts from inspected pages of Sahih al-Bukhari or Sahih Muslim on
Sunnah.com. Store the source URL, collection, number, narrator, honorific, كتاب, باب,
printed edition, printed-edition URL, excerpt flag, inspection date, and exact text in
data/hadith.json. Collection membership supports the label صحيح; do not invent a
separate grading attribution. The source manifest protects record bytes from unreviewed
changes. Recheck wording, attribution, and context before intentionally updating its
digest. Do not copy website commentary or translations.

Every record is also collated against the printed critical edition of its own
collection, which is the authority for wording, narrator, number and placement:

- Sahih al-Bukhari — الطبعة السلطانية, https://shamela.ws/book/1681
- Sahih Muslim — تحقيق محمد فؤاد عبد الباقي, https://shamela.ws/book/1727

Record the exact page as `editionUrl`. Bukhari numbering on Sunnah.com follows the
Sultaniyya edition and Muslim numbering follows Abd al-Baqi, so the printed number
must match the number in the URL. Suffixed Muslim identifiers (1955a, 2702b) mark
successive narrations under one printed number; link the page carrying that narration.

A quotation must be readable as printed. An excerpt that opens with a connective
(ثم، و) and has no antecedent is not acceptable under the default line
"قال رسول الله صلى الله عليه وسلم". Either widen the excerpt to a self-contained span
or set `attribution` to the wording that actually introduces it — for example a
Companion's question in a narration shaped as a dialogue. Never paraphrase a narration
into the attribution line and never present editorial framing as part of the quote.

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
coverage of Islam, guaranteed spiritual outcomes, or completed scholarly review.

The authors' closing statement is original editorial wording, not a hadith or a
quotation attributed to a Companion. Its permissibility and meaning were checked at
https://islamweb.net/ar/fatwa/print.php?id=79988 (accessed 2026-09-05). It does not
remove the authors' duty to acknowledge and correct mistakes.

Foundation summaries were checked against Tafsir al-Sa'di hosted by King Saud University:

- https://quran.ksu.edu.sa/tafseer/saadi/sura16-aya90.html
- https://quran.ksu.edu.sa/tafseer/saadi/sura4-aya58.html
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

## Surah display names

`data/surah-names.json` is kept byte-identical to its upstream copy, so it keeps the
upstream spellings that omit hamzat al-qat' (ابراهيم، الانسان، النبإ) and that write
hamzat al-wasl as qat' (الإنفطار، الإنشقاق). `scripts/content.mjs` corrects only how
those names are displayed, through `SURAH_NAME_FIXES`. Never edit the pinned file to
fix a spelling; add the display correction and keep the digest unchanged.
