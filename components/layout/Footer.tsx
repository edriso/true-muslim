import Link from 'next/link';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <Link href="/" className="footer-brand">
            مسلم بحق
          </Link>
          <p>دعوة لإصلاح النفس، لا حكم على إيمان أحد.</p>
        </div>
        <div className="footer-links">
          <Link href="/daleel">الدليل والمصادر</Link>
          <Link href="/about">عن الموقع</Link>
          <a href="https://github.com/edriso/true-muslim/issues">أبلغ عن خطأ</a>
          <a href="https://tanzil.net/">النص القرآني: مشروع تنزيل</a>
        </div>
      </div>
    </footer>
  );
}
