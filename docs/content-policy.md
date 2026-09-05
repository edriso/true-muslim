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
Sunnah.com. Store the source URL, collection, number, narrator, excerpt flag, inspection
date, and exact text in data/hadith.json. Collection membership supports the label
صحيح; do not invent a separate grading attribution. The source manifest protects
record bytes from unreviewed changes. Recheck wording, attribution, and context before
intentionally updating its digest. Do not copy website commentary or translations.

## Review checklist

- Evidence matches the virtue and is not stretched into a ruling it does not establish.
- Wording matches the linked narration, and partial text is labelled as an excerpt.
- Practical prose is visibly separate from evidence, with no invented reward or threat.
- Family duties do not become permission for harm; patience does not mean accepting abuse.
- Gentleness is not surrendering rights; obedience to people is not unconditional.
- Every lesson source opens at a specific verse or narration.
- Run npm run check and npm run build. Record actual checks; never claim scholarly approval.

## Supplemental evidence for boundaries

The parents lesson links Luqman 31:15: refusing a sinful demand does not remove
kind companionship. The speech lesson links An-Nisa 4:148 for speaking about
injustice. These support the specific boundaries, separately from each lesson's main
verse and hadith. The applications were independently checked against the source
pages during development; this is a source review, not a claim of scholarly approval.
