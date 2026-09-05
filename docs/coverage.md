# Coverage and source review

This is an introductory character guide, not an encyclopedia of Islam and not a fatwa
service. The collection is organised around four relationships rather than around a
list of virtues, so that a reader can find the lesson by the situation they are in.

| Relationship | Lessons                                                                  | Practical coverage                                                                                                 |
| ------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| With Allah   | Sincerity, gratitude, repentance                                         | Intention, recognising blessings, stopping and repairing a mistake                                                 |
| With people  | Honesty, trust, justice, ihsan, mercy, gentleness, generosity, neighbors | Truth, money/responsibilities/secrets, fairness, careful work, kindness, giving without humiliation, shared spaces |
| With family  | Parents, kinship                                                         | Good companionship, listening, keeping contact that is safe to keep                                                |
| With oneself | Speech, patience, forgiveness, humility, modesty                         | Messages and gossip, anger, rights and boundaries, accepting correction, dignified conduct                        |

An-Nahl 16:90 frames doing good and avoiding wrongdoing. An-Nisa 4:58 anchors
responsibility and fairness. Neither verse is paraphrased inside a quotation; the
pinned text is displayed in full, separately from the short editorial summary.

## How a narration earns its place

Each record in `data/hadith.json` names two sources: the Sunnah.com page a reader can
open, and the printed critical edition the wording was collated against — al-Tab'a
al-Sultaniyya for al-Bukhari, Muhammad Fu'ad Abd al-Baqi's edition for Muslim. The
recorded كتاب and باب come from the printed page, not from memory. `npm run
verify:sources` re-runs the whole collation, including asking Shamela to resolve each
printed number back to the page id stored in the record.

Excerpting is allowed and is labelled, but an excerpt has to read correctly on its own.
Where a narration is a dialogue rather than a statement — Bukhari 527, where the
Prophet's answer begins with ثُمَّ — the record carries an `attribution` naming the
Companion who asked, so the quotation is never presented as a sentence it is not.

## Deliberate boundaries

- Charity here is voluntary sadaqa; it is not a substitute for learning zakat or the
  maintenance a person owes.
- Modesty is not a guide to rulings on dress, and must never stop someone asking a
  religious question they need answered (Bukhari 130).
- Forgiveness does not remove a wronged person's right to seek justice (42:41).
- Justice and kindness are not reserved for people who share one's religion (60:8).
- Kinship and patience never require staying in danger.
- Repentance includes regret and leaving the sin; cases involving other people's rights
  may need a scholar.
- The site does not settle disputed questions of fiqh, evaluate anyone's faith, or
  suggest that reading the lessons has achieved anything.

## What is deliberately not here

Detailed rulings, a curriculum of worship, biography, creed beyond what the lessons
state plainly, and any topic where an introductory page would do more harm than
silence. Where a reader's situation needs a judgement rather than a principle, every
lesson points them to people who can give one.
