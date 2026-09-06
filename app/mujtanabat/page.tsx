import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Ayah } from '@/components/content/Evidence';
import { categories, lessons } from '@/lib/content';
import { arabicReference } from '@/lib/format';

export const metadata: Metadata = {
  title: 'ما نجتنبه',
  description:
    'فهرس لما ينهى عنه الإسلام من الأذى والمعاصي، مرتّبًا على أقسام الدليل، مع رابط كل درس ودليله. أمثلة للتعلّم، لا حصر للمحرّمات ولا حكم على أحد.',
};
export default function Mujtanabat() {
  return (
    <main id="main" tabIndex={-1} className="container daleel">
      <nav className="breadcrumbs" aria-label="مسار الصفحة">
        <Link href="/">الرئيسية</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">ما نجتنبه</span>
      </nav>
      <header className="article-header">
        <p className="eyebrow">الدين أمرٌ ونهي</p>
        <h1>ما نجتنبه</h1>
        <p className="lead">
          حسن الخُلُق فعلٌ للخير وترك للأذى. وهذه صفحة تجمع ما ذكرناه في الدروس من
          أمثلة ما نبتعد عنه، لتراه مجموعًا في مكان واحد، ثم ترجع إلى الدرس
          ودليله.
        </p>
      </header>
      <section className="daleel-section">
        <p className="eyebrow">أصلٌ جامع</p>
        <h2>أمرٌ بالعدل والإحسان، ونهيٌ عن الفحشاء والظلم</h2>
        <Ayah reference="16:90" />
        <p>
          الترك عملٌ يُؤجر عليه العبد كما يُؤجر على الفعل. فمن كفّ لسانه عن الغيبة،
          أو ردّ كسبًا حرامًا، أو أمسك عن الظلم وهو قادر، فقد تقرّب إلى الله بترك ما
          نهى عنه. وأعظم ما ننتهي عنه الشرك بالله، ثم ما فيه ظلم للناس في دمائهم
          وأموالهم وأعراضهم.
        </p>
      </section>
      <nav className="category-nav" aria-label="أقسام ما نجتنبه">
        {categories.map((category, i) => (
          <a href={`#avoid-${i}`} key={category}>
            {category}
          </a>
        ))}
      </nav>
      {categories.map((category, index) => (
        <section
          className="daleel-section"
          id={`avoid-${index}`}
          key={category}
        >
          <h2>{category}</h2>
          <ul className="evidence-index">
            {lessons
              .filter((lesson) => lesson.category === category)
              .map((lesson) => (
                <li key={lesson.slug}>
                  <div className="source-heading">
                    <Link href={`/virtues/${lesson.slug}`}>
                      {lesson.title}
                      <ArrowLeft size={16} aria-hidden="true" />
                    </Link>
                    <span>الدرس {arabicReference(lesson.order)}</span>
                  </div>
                  <ul className="avoid-list">
                    {lesson.avoid.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
        </section>
      ))}
      <section className="daleel-section limits-panel">
        <p className="eyebrow">اقرأ هذا قبل أن تستعمل الصفحة</p>
        <h2>حدود هذه القائمة</h2>
        <ul>
          <li>
            هذه أمثلة تعليمية للتدرّب على ترك الأذى، وليست حصرًا للمحرّمات ولا تصنيفًا
            فقهيًّا لها. والمعاصي تتفاوت في قدرها، فليست على درجة واحدة.
          </li>
          <li>
            ليست ميزانًا نحكم به على أحد. لا نحكم على إيمان الناس ولا على نياتهم،
            ولا نفتّش عن عيوبهم، ولا نعيّر من وقع في ذنب.
          </li>
          <li>
            ما تعلّق منها بحقوق الناس أو بحالتك الخاصة، فاسأل عنه أهل العلم؛
            فالصفحة مدخل للتعلّم ولا تصدر فتوى.
          </li>
          <li>
            من وقع في شيء من ذلك فباب التوبة مفتوح، والله يقبل التوبة عن عباده.
            ومن كان لأحدٍ عليه حقٌّ فليردّه إليه أو يستحلّه منه.
          </li>
        </ul>
        <p>
          <Link className="text-link" href="/virtues/repentance">
            اقرأ درس التوبة وإصلاح الخطأ{' '}
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
        </p>
      </section>
    </main>
  );
}
