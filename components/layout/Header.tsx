import Link from 'next/link';
import { Sprout } from 'lucide-react';
export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="مسلم بحق — الرئيسية">
          <span className="brand-mark">
            <Sprout aria-hidden="true" size={25} />
          </span>
          <span>
            مسلم بحق<span className="brand-sub">إيمان يثمر خُلُقًا</span>
          </span>
        </Link>
        <nav aria-label="القائمة الرئيسية">
          <Link href="/#virtues">الأخلاق</Link>
          <Link href="/about">الفكرة والمصادر</Link>
        </nav>
      </div>
    </header>
  );
}
