import Link from 'next/link';
import { Sprout } from 'lucide-react';
export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="مسلم بحق، الرئيسية">
          <span className="brand-mark">
            <Sprout aria-hidden="true" size={25} />
          </span>
          <span>
            مسلم بحق <span className="brand-sub">إيمان يثمر خُلُقًا</span>
          </span>
        </Link>
        {/* Only the three reading destinations. Everything about the site
            itself lives in the footer, so this row still fits one line on a
            narrow screen and at 200% zoom. */}
        <nav aria-label="القائمة الرئيسية">
          <Link href="/#virtues">الأخلاق</Link>
          <Link href="/mujtanabat">ما نجتنبه</Link>
          <Link href="/daleel">الدليل والمصادر</Link>
        </nav>
      </div>
    </header>
  );
}
