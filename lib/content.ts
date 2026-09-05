import lessonData from '@/content/lessons.generated.json';
import quran from '@/content/quran.generated.json';
import hadith from '@/data/hadith.json';

export const lessons = lessonData;
export const categories = ['مع الله', 'مع الناس', 'في البيت', 'مع النفس'];
export type Lesson = (typeof lessonData)[number];
export const getLesson = (slug: string) =>
  lessons.find((lesson) => lesson.slug === slug);
export function getAyah(ref: string) {
  const verse = quran[ref as keyof typeof quran];
  if (!verse) throw new Error(`Unknown Quran reference: ${ref}`);
  return verse;
}
export function getHadith(id: string) {
  const record = hadith[id as keyof typeof hadith];
  if (!record) throw new Error(`Unknown hadith: ${id}`);
  return record;
}
