import Link from 'next/link';
import { ArrowLeft, BookOpen, HeartHandshake, Sprout } from 'lucide-react';
import { Ayah } from '@/components/content/Evidence';
import { lessons, categories } from '@/lib/content';
import { arabicOrdinal, arabicReference } from '@/lib/format';
export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="container intro">
        <div className="intro-copy">
          <p className="eyebrow">
            <span className="small-line" /> رحلة في أخلاق الإسلام
          </p>
          <h1>
            جمال الإسلام
            <br />
            <span>يظهر في أخلاقنا.</span>
          </h1>
          <p className="lead">
            نتعلّم ما يحبّه الله من الأخلاق، ونجتهد في أن نعيشه في كلماتنا ومواقفنا
            ومعاملتنا للناس.
          </p>
          <div className="intro-actions">
            <Link className="button primary" href="/virtues/sincerity">
              ابدأ بالإخلاص <ArrowLeft size={19} aria-hidden="true" />
            </Link>
            <a className="text-link" href="#virtues">
              تصفّح الأخلاق
            </a>
          </div>
          <p className="quiet">اقرأ بهدوء، واختر عملًا تبدأ به.</p>
        </div>
        <div className="intro-verse">
          <div className="ornament" aria-hidden="true">
            ✦
          </div>
          <Ayah reference="68:4" compact />
          <div className="verse-note">
            هديُ النبي صلى الله عليه وسلم
            <br />
            قدوتنا في حسن الخُلُق.
          </div>
        </div>
      </section>
      <section className="method-strip" aria-label="كيف تستفيد من الدليل">
        <div className="container method-inner">
          <div>
            <BookOpen aria-hidden="true" />
            <p>
              <strong>افهم المعنى</strong>
              <span>شرح قريب من حياتك</span>
            </p>
          </div>
          <div>
            <HeartHandshake aria-hidden="true" />
            <p>
              <strong>اقرأ الدليل</strong>
              <span>آية وحديث مع المصدر</span>
            </p>
          </div>
          <div>
            <Sprout aria-hidden="true" />
            <p>
              <strong>ابدأ بعمل</strong>
              <span>خطوة صغيرة صادقة</span>
            </p>
          </div>
        </div>
      </section>
      <section className="container virtues-section" id="virtues">
        <div className="section-heading">
          <div>
            <p className="eyebrow">من المعرفة إلى العمل</p>
            <h2>أخلاق نتعلّمها ونعيشها</h2>
          </div>
          <p>
            {arabicReference(lessons.length)} بابًا للخير.
            <br />
            ابدأ بما تحتاج إليه، وعُدْ متى شئت.
          </p>
        </div>
        <nav className="category-nav" aria-label="أقسام الأخلاق">
          {categories.map((category, i) => (
            <a href={`#category-${i}`} key={category}>
              {category}
            </a>
          ))}
        </nav>
        {categories.map((category, index) => (
          <section
            className="virtue-group"
            id={`category-${index}`}
            key={category}
            aria-labelledby={`heading-${index}`}
          >
            <div className="group-label">
              <span>{arabicOrdinal(index + 1)}</span>
              <h3 id={`heading-${index}`}>{category}</h3>
            </div>
            <div className="card-grid">
              {lessons
                .filter((l) => l.category === category)
                .map((lesson) => (
                  <Link
                    href={`/virtues/${lesson.slug}`}
                    className="virtue-card"
                    key={lesson.slug}
                  >
                    <span className="card-number">
                      {arabicOrdinal(lesson.order)}
                    </span>
                    <div>
                      <h4>{lesson.title}</h4>
                      <p>{lesson.summary}</p>
                    </div>
                    <ArrowLeft
                      className="card-arrow"
                      size={21}
                      aria-hidden="true"
                    />
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </section>
      <section className="container foundation-invitation">
        <div>
          <p className="eyebrow">من أين نبدأ؟</p>
          <h2>بالعدل والإحسان وأداء الأمانة.</h2>
          <p>
            آيتان جامعتان في سورة النحل وسورة النساء، نرجع إليهما لفهم ما نفعله
            من خير وما نجتنبه من أذى.
          </p>
        </div>
        <Link href="/daleel" className="button primary">
          اقرأ الدليل <ArrowLeft size={18} aria-hidden="true" />
        </Link>
      </section>
      <section className="closing">
        <div className="container closing-inner">
          <span className="eyebrow">المقصد قبل الخطوة</span>
          <h2>نصلح أنفسنا، ونحسن إلى الناس.</h2>
          <p>
            نطيع الله ونتبع رسوله صلى الله عليه وسلم، ونثق بحكمة ما أمرنا به وما
            نهانا عنه، وإن لم ندرك الحكمة كاملة. ونرجو أن يرى الناس جمال الإسلام
            في صدقنا ورحمتنا وعدلنا.
          </p>
          <Link className="text-link" href="/about">
            تعرّف على الفكرة ومنهج الكتابة{' '}
            <ArrowLeft size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
