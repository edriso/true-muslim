# Coverage and source review

This is an introductory character guide, not an encyclopedia of Islam and not a fatwa
service. The collection is organised around seven relationships rather than around a
list of virtues, so that a reader can find the lesson by the situation they are in.
Within each relationship it deliberately carries both halves of the religion: what to
do, and what to refuse.

| Relationship        | Lessons                                                                                                                                                                                                                    | Practical coverage                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| With Allah          | Tawhid, sincerity, following the Prophet ﷺ, prayer, fasting, hajj, the Qur'an, knowledge, dhikr, supplication, gratitude, reliance, hope, repentance, major sins, omens                                                            | Worship belonging to Allah alone, intention, the five prayers, fasting and hajj that change conduct, learning and teaching, asking, thanking, relying while acting, refusing the gravest sins, refusing superstition |
| With oneself        | Patience, pardon, humility, modesty, chastity, intoxicants and gambling, purity, contentment, a clear chest, time and health, consistency                                                                                                             | Anger, forgiveness, accepting correction, guarding oneself, what takes the mind and the money, cleanliness, envy, squandered hours, small deeds kept up                                                             |
| With the tongue     | Truthfulness, guarding speech, backbiting, tale-bearing, mockery and insult, true witness                                                                                                                                   | What غيبة actually is, carrying words to spoil relations, nicknames and ridicule, testimony that decides a right                                                                |
| With people         | Justice, ihsan, mercy, gentleness, every kindness, trust, promises, harming no one, brotherhood, greeting, thinking well, generosity, guests, the sick, relieving hardship, the widow and the poor, neighbors, permission, the road, reconciling, enjoining good, standing with the wronged, wrongdoing, inviolability | Fairness, careful work, the five duties owed a Muslim, shared walls, privacy and consent, public space, suspicion and spying, hospitality, illness, need, reconciliation, speaking up, and the inviolability of blood, property and honour |
| With family         | Parents, kin, children, spouses, everyone a shepherd                                                                                                                                                                        | Good companionship, contact that is safe to keep, patience with the young, a spouse's right to your time, responsibility for those in your care                                 |
| With money and work | Lawful earning, avoiding the doubtful, trust at work, wages, cheating, usury, debt, zakat, providing for family, squandering                                                                                                 | Earning rather than asking, doubtful gain, gifts to officials, paying a worker, hidden defects, interest, repayment, the poor's right in wealth, spending on one's own household, waste |
| With the world      | Animals, guarding a blessing, clearing the path                                                                                                                                                                             | Kindness to what cannot ask, using a provision without wasting it, shared paths and shared resources                                                                            |

Six foundation verses frame the whole collection. An-Nahl 16:90 pairs doing good with
avoiding wrongdoing. An-Nisa 4:58 anchors responsibility and fairness. Al-Baqarah 2:177
is the Qur'an's own definition of البر, and it is the reason the site never presents
character as a substitute for worship: the same verse lists belief, prayer, zakat,
keeping one's word and patience together. An-Nisa 4:36 begins with worship of Allah
alone and then ranks the rights of people by closeness, ending by dispraising the
arrogant. Al-An'am 6:151 is the Qur'an's own list of first prohibitions, which is why
the collection does not treat "what to avoid" as an afterthought. Al-Hujurat 49:12
forbids suspicion, spying and backbiting in one verse. No verse is paraphrased inside a
quotation; the pinned text is displayed in full, separately from the short editorial
summary.

## How a narration earns its place

Only Sahih al-Bukhari and Sahih Muslim are used. Each record in `data/hadith.json`
names the printed critical edition its wording was read from — al-Tab'a al-Sultaniyya
for al-Bukhari, Muhammad Fu'ad Abd al-Baqi's edition for Muslim — and links the exact
printed page, alongside the Sunnah.com page a reader can open. The recorded كتاب and
باب come from that page's own heading, not from memory. `npm run verify:sources`
re-runs the whole collation, including asking Shamela to resolve each printed number
back to the page the record cites.

Excerpting is allowed and is labelled, but an excerpt has to read correctly on its own.
Where a narration is a dialogue rather than a statement — Bukhari 527, where the
Prophet's answer begins with ثُمَّ, or Muslim 2589, where the definition of غيبة answers
a question — the record carries an `attribution` copied from the printed page, so the
quotation is never presented as a sentence it is not.

Two of these choices are worth stating plainly, because they cost something:

- Al-Bukhari is preferred wherever it carries the meaning, because the Sultaniyya text
  is fully vocalised. Ten of the seventy-four records come from Muslim, three of them
  added in this pass. The Muslim transcription is uneven, and where it is visibly
  defective the narration was not used: Muslim 1598's page prints
  `لَعَنَ رَسُولَ اللَّهِ … أَكَلَ الربا` for what the edition reads
  `لَعَنَ رَسُولُ اللَّهِ … آكِلَ الرِّبَا`, so the usury lesson cites the الموبقات
  narration, whose printed list names أكل الربا itself.
- One record, Muslim 2589, is printed without vocalisation on its page. It is displayed
  exactly as printed. Adding diacritics to a quotation is editing it, so the choice was
  between an unvocalised line and dropping the Prophet's own definition of غيبة from a
  guide that teaches against it. The definition was kept.

## Deliberate boundaries

- Charity here is voluntary sadaqa; it is not a substitute for learning zakat or the
  maintenance a person owes. The zakat lesson states its own obligation and sends the
  reader to scholars for the thresholds.
- Modesty is not a guide to rulings on dress, and must never stop someone asking a
  religious question they need answered (Bukhari 130).
- Chastity is written for a wide age range: it teaches guarding the eye and closing the
  door to harm, with no physical detail, and it names no one.
- Forgiveness does not remove a wronged person's right to seek justice (42:41).
- Justice and kindness are not reserved for people who share one's religion (60:8).
- Kinship, patience and marriage never require staying in danger.
- Repentance includes regret and leaving the sin; cases involving other people's rights
  may need a scholar.
- The lessons that carry a threat — hypocrisy's signs, `لَا يَدْخُلُ الْجَنَّةَ قَتَّاتٌ`,
  `سِبَابُ الْمُسْلِمِ فُسُوقٌ`, the الموبقات — say in their own boundary that the warning
  is about the act and not a verdict on any person. No lesson evaluates anyone's faith,
  and the tawhid and omens lessons say outright that takfir is not the reader's to make.
- Enjoining good is bounded on the page: within one's ability, with gentleness, no
  policing of others, and punishment is for those who hold authority over it.
- The usury, banking, employment and zakat lessons describe the principle and refuse to
  rule on a particular contract, bank or salary.
- The site does not settle disputed questions of fiqh or suggest that reading the
  lessons has achieved anything.

The last category is still the smallest, and honestly so. Kindness to animals, guarding
a blessing and clearing a shared path are the three places where al-Bukhari and Muslim
give a clean, self-contained narration about the world we live in without crossing into
juristic detail; a fourth was attempted and dropped (Bukhari 239 supports only the
"do not spoil what is shared" half of an environment lesson, and its heading could not
be reconciled with the page). Three is thin for a relationship that has its own chapters
in the classical books, and it should grow before it is treated as settled.

## What is deliberately not here

Detailed rulings, a curriculum of worship, biography, creed beyond what the lessons
state plainly, and any topic where an introductory page would do more harm than
silence — which is why suicide, ruqya and the details of marriage and dress are named
only where a boundary needs them and are otherwise sent to people who can answer.
Where a reader's situation needs a judgement rather than a principle, every lesson
points them to people who can give one.

`/mujtanabat` gathers every lesson's examples of harm on one page. It is the one place
in the site where the prohibitions are read as a list, so it carries its own limits
directly under the heading: these are teaching examples, sins are not all of one
degree, the page is not a measure to judge anyone by, rulings for a particular case
belong with scholars, and repentance is open.
