import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';
import { Ayah } from '@/components/content/Evidence';
import {
  categories,
  foundations,
  getAyah,
  getHadith,
  getLesson,
  lessons,
} from '@/lib/content';
import { arabicReference } from '@/lib/format';

export const metadata: Metadata = {
  title: 'الدليل والمصادر',
  description:
    'آيات جامعة لأخلاق الإسلام، وفهرس أدلة الدروس، ومنهج نقل النصوص وحدود هذا الدليل.',
};
export default function Daleel() {
  return (
    <main id="main" className="container daleel">
      <nav className="breadcrumbs" aria-label="مسار الصفحة">
        <Link href="/">الرئيسية</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">الدليل والمصادر</span>
      </nav>
      <header className="article-header">
        <p className="eyebrow">نعرف المعنى، ونرجع إلى الدليل</p>
        <h1>الدليل والمصادر</h1>
        <p className="lead">
          نجمع هنا أصولًا نتعلّم منها، ومراجع ترجع إليها بنفسك. النصوص الشرعية أصل،
          وشرحنا محاولة للفهم والتقريب.
        </p>
      </header>
      <nav className="category-nav" aria-label="أقسام صفحة الدليل">
        <a href="#foundations">آيات جامعة</a>
        <a href="#source-index">أدلة الدروس</a>
        <a href="#methodology">منهج النقل</a>
        <a href="#limits">حدود الموقع</a>
      </nav>
      <section id="foundations" className="daleel-section">
        <p className="eyebrow">أصل نجمع عليه المعاني</p>
        <h2>آيات جامعة لأخلاق الإسلام</h2>
        {foundations.map((foundation) => (
          <section className="foundation" key={foundation.reference}>
            <h3>{foundation.title}</h3>
            <Ayah reference={foundation.reference} />
            <p className="editorial-label">معنى مبسّط، وليس نصّ التفسير</p>
            <p>{foundation.summary}</p>
            <a className="text-link" href={foundation.tafsir}>
              اقرأ تفسير السعدي <ArrowUpLeft size={16} aria-hidden="true" />
            </a>
            <div className="related-lessons">
              {foundation.lessons.map((slug) => (
                <Link key={slug} href={`/virtues/${slug}`}>
                  {getLesson(slug)?.title}
                  <ArrowLeft size={15} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </section>
      <section id="source-index" className="daleel-section">
        <p className="eyebrow">مرجع لكل درس</p>
        <h2>أدلة الدروس</h2>
        <p>
          افتح الدرس لقراءة النص مع شرحه، أو انتقل مباشرة إلى مصدر الآية والحديث.
          وصف الحديث بأنه صحيح مبني على وروده في صحيح البخاري أو صحيح مسلم.
        </p>
        {categories.map((category) => (
          <section className="source-group" key={category}>
            <h3>{category}</h3>
            <ul className="evidence-index">
              {lessons
                .filter((lesson) => lesson.category === category)
                .map((lesson) => {
                  const verse = getAyah(lesson.ayah),
                    narration = getHadith(lesson.hadith);
                  return (
                    <li key={lesson.slug}>
                      <div className="source-heading">
                        <Link href={`/virtues/${lesson.slug}`}>
                          {lesson.title}
                          <ArrowLeft size={16} aria-hidden="true" />
                        </Link>
                        <span>
                          {narration.excerpt
                            ? 'مقتطف من حديث صحيح'
                            : 'حديث صحيح'}
                        </span>
                      </div>
                      <div className="source-references">
                        <a href={verse.url}>
                          سورة {verse.surahName} · الآية{' '}
                          {arabicReference(verse.ayah)}
                        </a>
                        <a href={narration.url}>
                          صحيح {narration.collection} ·{' '}
                          <bdi>{arabicReference(narration.number)}</bdi>
                        </a>
                      </div>
                      <p className="source-narrator">
                        الراوي: {narration.narrator}
                      </p>
                      {lesson.boundaryAyah && (
                        <a
                          className="source-boundary"
                          href={getAyah(lesson.boundaryAyah).url}
                        >
                          دليل إضافي للتوضيح: سورة{' '}
                          {getAyah(lesson.boundaryAyah).surahName} ·{' '}
                          {arabicReference(getAyah(lesson.boundaryAyah).ayah)}
                        </a>
                      )}
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}
      </section>
      <section id="methodology" className="daleel-section">
        <h2>كيف ننقل النصوص؟</h2>
        <ol className="methodology-list">
          <li>
            <strong>القرآن الكريم:</strong> نعرض الآيات كاملة من النص العثماني في{' '}
            <a href="https://tanzil.net/">مشروع تنزيل</a>، مع اسم السورة ورقم
            الآية ورابطها. لا نكتب الآيات من الذاكرة.
          </li>
          <li>
            <strong>الحديث النبوي:</strong> ننقل من صفحات أحاديث محددة في{' '}
            <a href="https://sunnah.com/">Sunnah.com</a>، ونذكر الكتاب والرقم
            والراوي، ونبيّن متى يكون النص مقتطفًا من حديث أطول.
          </li>
          <li>
            <strong>الشرح:</strong> نفصل كلامنا عن الآية والحديث، ونربط تفسير
            الآيات الجامعة بمرجعه. أمثلة الحياة وأسئلة التأمل والتطبيقات من إعداد
            الموقع؛ ليست أقوالًا نبوية أو عبادات بأعداد مخصوصة.
          </li>
          <li>
            <strong>المراجعة والتصحيح:</strong> نراجع النصوص ومراجعها، وتتحقق
            أدوات البناء من سلامة النسخ والمراجع. هذا يساعد على منع الخطأ، ولا
            يغني عن مراجعة أهل العلم.
          </li>
        </ol>
      </section>
      <section id="limits" className="daleel-section limits-panel">
        <p className="eyebrow">وضوح وأمانة</p>
        <h2>ما الذي لا يدّعيه هذا الموقع؟</h2>
        <ul>
          <li>
            لا يدّعي أن أحدًا كامل الإيمان، ولا يحكم على إيمان الناس أو نياتهم.
          </li>
          <li>
            لا يحصر الإسلام في الأخلاق، ولا يجعل حسن المعاملة بديلًا عن التوحيد والصلاة
            وسائر الفرائض.
          </li>
          <li>
            لا يجمع كل أبواب الدين أو كل أدلة الأخلاق؛ هو مدخل تعليمي قابل للتوسّع
            والتصحيح.
          </li>
          <li>
            لا يصدر فتاوى لحالاتك الخاصة، ولا يستغني عن أهل العلم عند الإشكال أو
            الخلاف.
          </li>
          <li>
            لا يدّعي العصمة من الخطأ، ولا مراجعة شرعية متخصصة لم تحصل، ولا يقيس
            التقوى بعدد الدروس التي قرأتها.
          </li>
        </ul>
      </section>
      <section className="daleel-section author-note">
        <p className="eyebrow">كلمة القائمين على الموقع</p>
        <p>
          ما كان في هذا العمل من توفيق فمن الله وحده، وما كان فيه من خطأ أو سهو
          أو نسيان فمنّا ومن الشيطان. نسأل الله أن يرزقنا الإخلاص والصواب، وأن
          يعيننا على تصحيح أخطائنا.
        </p>
        <p className="quiet">
          هذه كلمة من القائمين على الموقع، وليست حديثًا نبويًا.
        </p>
        <a
          className="text-link"
          href="https://islamweb.net/ar/fatwa/print.php?id=79988"
        >
          عن معنى هذه العبارة <ArrowUpLeft size={16} aria-hidden="true" />
        </a>
      </section>
      <section className="daleel-section">
        <h2>وجدت خطأ؟ ساعدنا على تصحيحه.</h2>
        <p>
          أرسل رابط الصفحة، وحدّد النص الذي يحتاج إلى مراجعة، وأرفق المصدر الصحيح
          إن تيسّر. لا تنشر معلوماتك الشخصية أو تفاصيلك الخاصة في البلاغ العام.
        </p>
        <a
          className="text-link"
          href="https://github.com/edriso/true-muslim/issues"
        >
          أبلغ عن خطأ <ArrowUpLeft size={16} aria-hidden="true" />
        </a>
      </section>
    </main>
  );
}
