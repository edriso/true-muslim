import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { lessons, getLesson, getAyah, getHadith } from '@/lib/content';
import { Ayah, Hadith } from '@/components/content/Evidence';
import { arabicReference } from '@/lib/format';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return lessons.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = getLesson((await params).slug);
  return {
    title: lesson?.title ?? 'الصفحة غير موجودة',
    description: lesson?.summary,
  };
}
export default async function LessonPage({ params }: Props) {
  const lesson = getLesson((await params).slug);
  if (!lesson) notFound();
  const index = lessons.findIndex((l) => l.slug === lesson.slug);
  const previous = lessons[index - 1],
    next = lessons[index + 1];
  return (
    <main id="main" className="container reading-shell">
      <aside className="lesson-sidebar">
        <p className="eyebrow">أبواب الأخلاق</p>
        <nav aria-label="كل الدروس">
          {lessons.map((l) => (
            <Link
              key={l.slug}
              href={`/virtues/${l.slug}`}
              aria-current={l.slug === lesson.slug ? 'page' : undefined}
            >
              <span>
                {l.order.toLocaleString('ar', { minimumIntegerDigits: 2 })}
              </span>
              {l.title}
            </Link>
          ))}
        </nav>
      </aside>
      <article>
        <nav className="breadcrumbs" aria-label="مسار الصفحة">
          <Link href="/">الرئيسية</Link>
          <span aria-hidden="true">/</span>
          <Link href="/#virtues">الأخلاق</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{lesson.title}</span>
        </nav>
        <header className="article-header">
          <p className="eyebrow">
            {lesson.category} · الدرس {lesson.order.toLocaleString('ar')} من{' '}
            {lessons.length.toLocaleString('ar')}
          </p>
          <h1>{lesson.title}</h1>
          <p className="lead">{lesson.summary}</p>
        </header>
        <section className="article-section">
          <p className="editorial-label">شرح بأسلوب مبسّط</p>
          <h2>ما معنى {lesson.title}؟</h2>
          <p>{lesson.meaning}</p>
        </section>
        <section className="article-section" aria-labelledby="evidence">
          <h2 id="evidence">من القرآن والسنة</h2>
          <Ayah reference={lesson.ayah} />
          <Hadith id={lesson.hadith} />
          <p className="evidence-note">
            موضع الحديث: {getHadith(lesson.hadith).book} ·{' '}
            {getHadith(lesson.hadith).chapter}
          </p>
        </section>
        <section className="article-section avoid-box">
          <p className="editorial-label">أمثلة لما نجتنبه</p>
          <h2>ما نبتعد عنه</h2>
          <ul>
            {lesson.avoid.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="article-section practice-box">
          <p className="eyebrow">تطبيقات مقترحة</p>
          <h2>كيف أبدأ؟</h2>
          <p>اختر عملًا يناسب حالك، واجتهد في الاستمرار عليه.</p>
          <ol>
            {lesson.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ol>
        </section>
        <section className="article-section scenario">
          <p className="editorial-label">مثال من الحياة</p>
          <h2>موقف صغير، وأثر طيب</h2>
          <p>{lesson.scenario}</p>
        </section>
        <section className="article-section boundary">
          <strong>انتبه إلى هذا</strong>
          <p>{lesson.boundary}</p>
          {lesson.boundaryAyah && (
            <p>
              <a className="text-link" href={getAyah(lesson.boundaryAyah).url}>
                اقرأ سورة {getAyah(lesson.boundaryAyah).surahName} · الآية{' '}
                {arabicReference(getAyah(lesson.boundaryAyah).ayah)}
              </a>
            </p>
          )}
        </section>
        <section className="article-section">
          <p className="eyebrow">وقفة مع النفس</p>
          <h2>{lesson.reflection}</h2>
          <p>التعلّم بداية، وحسن الخُلُق عمل نجتهد فيه كلما مررنا بموقف جديد.</p>
        </section>
        <nav className="lesson-nav" aria-label="التنقل بين الدروس">
          {previous ? (
            <Link href={`/virtues/${previous.slug}`}>
              <span>الدرس السابق</span>
              <strong>
                <ArrowRight size={18} aria-hidden="true" />
                {previous.title}
              </strong>
            </Link>
          ) : (
            <Link href="/#virtues">
              <span>تصفّح الدليل</span>
              <strong>كل الأخلاق</strong>
            </Link>
          )}
          {next ? (
            <Link href={`/virtues/${next.slug}`}>
              <span>الدرس التالي</span>
              <strong>
                {next.title}
                <ArrowLeft size={18} aria-hidden="true" />
              </strong>
            </Link>
          ) : (
            <Link href="/#virtues">
              <span>تابع العمل بما تعلّمت</span>
              <strong>
                العودة إلى الأخلاق <ArrowLeft size={18} aria-hidden="true" />
              </strong>
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
