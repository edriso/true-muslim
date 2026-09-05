'use client';
import Link from 'next/link';
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" tabIndex={-1} className="container not-found">
      <h1>تعذّر عرض الصفحة</h1>
      <p>تعذّر تحميل هذه الصفحة. جرّب مرة أخرى، أو عُدْ إلى الرئيسية.</p>
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
