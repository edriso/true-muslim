import Link from 'next/link';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <Link href="/" className="footer-brand">
            مسلم بحق
          </Link>
          <p>دعوة إلى إصلاح النفس، لا حكم على إيمان أحد.</p>
        </div>
        {/* The whole map, including what the header leaves out, so nothing is
            reachable only from one place. */}
        <nav className="footer-links" aria-label="روابط الموقع">
          <Link href="/#virtues">الأخلاق</Link>
          <Link href="/mujtanabat">ما نجتنبه</Link>
          <Link href="/daleel">الدليل والمصادر</Link>
          <Link href="/about">عن الموقع</Link>
          <a href="https://github.com/edriso/true-muslim/issues">أبلغ عن خطأ</a>
          <a href="https://tanzil.net/">النص القرآني: مشروع تنزيل</a>
        </nav>
      </div>
    </footer>
  );
}
