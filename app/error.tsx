'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="container not-found">
      <h1>تعذّر عرض الصفحة</h1>
      <p>حاول مرة أخرى، أو عد إلى الرئيسية.</p>
      <button className="button primary" onClick={reset}>
        حاول مرة أخرى
      </button>
      <p>
        <Link className="text-link" href="/">
          العودة إلى الرئيسية
        </Link>
      </p>
    </main>
  );
}
