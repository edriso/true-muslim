# Coverage and source review

This is an introductory character guide, not an encyclopedia of Islam and not a fatwa
service. The collection is organised around five relationships rather than around a
list of virtues, so that a reader can find the lesson by the situation they are in.

| Relationship  | Lessons                                                                                                      | Practical coverage                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| With Allah    | Sincerity, gratitude, repentance                                                                             | Intention, recognising blessings, stopping and repairing a mistake                                                        |
| With people   | Honesty, trust, promises, justice, ihsan, mercy, gentleness, generosity, greeting, neighbors, permission, roads | Truth, responsibilities and secrets, keeping your word, fairness, careful work, kindness, giving without humiliation, the five duties owed to a fellow Muslim, shared walls, privacy and consent, public space |
| With family   | Parents, kinship, children                                                                                   | Good companionship, listening, keeping contact that is safe to keep, patience with those younger than you                 |
| With oneself  | Speech, patience, forgiveness, envy, humility, modesty                                                       | Messages and gossip, anger, rights and boundaries, comparison, accepting correction, dignified conduct                    |
| With the world | Animals, moderation                                                                                         | Kindness to what cannot ask, using a provision without wasting it                                                         |

Three foundation verses frame the whole collection. An-Nahl 16:90 pairs doing good
with avoiding wrongdoing. An-Nisa 4:58 anchors responsibility and fairness.
Al-Baqarah 2:177 is the Qur'an's own definition of البر, and it is the reason the site
never presents character as a substitute for worship: the same verse lists belief,
prayer, zakat, keeping one's word and patience together. No verse is paraphrased
inside a quotation; the pinned text is displayed in full, separately from the short
editorial summary.

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

The fifth category is deliberately the smallest. It exists because stewardship of
what cannot speak for itself is a real relationship with its own classical chapters,
not because the two lessons had nowhere else to go — but two is thin, and it should
grow before it is treated as settled.

## What is deliberately not here

Detailed rulings, a curriculum of worship, biography, creed beyond what the lessons
state plainly, and any topic where an introductory page would do more harm than
silence. Where a reader's situation needs a judgement rather than a principle, every
lesson points them to people who can give one.
