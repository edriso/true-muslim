import Link from 'next/link';
export default function NotFound() {
  return (
    <main id="main" className="container not-found">
      <p className="eyebrow">٤٠٤</p>
      <h1>الصفحة غير موجودة</h1>
      <p>ربما تغيّر الرابط. يمكنك العودة إلى الدليل واختيار خُلُق تقرأ عنه.</p>
      <Link className="button primary" href="/">
        العودة إلى الرئيسية
      </Link>
    </main>
  );
}
