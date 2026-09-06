import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/noto-naskh-arabic/wght.css';
import '@fontsource-variable/cairo/wght.css';
import '@fontsource/amiri-quran/arabic-400.css';
import './globals.css';
// The three Arabic faces the page cannot be read without. Imported for their URL so
// the hash and the Pages base path come from the build, then preloaded: without this
// the browser only learns it needs them after parsing CSS and laying text out, which
// is what makes a blocking face feel like a blank page.
import naskhArabic from '@fontsource-variable/noto-naskh-arabic/files/noto-naskh-arabic-arabic-wght-normal.woff2?url';
import cairoArabic from '@fontsource-variable/cairo/files/cairo-arabic-wght-normal.woff2?url';
import amiriQuranArabic from '@fontsource/amiri-quran/files/amiri-quran-arabic-400-normal.woff2?url';
import { Header } from '@/components/layout/Header';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { Footer } from '@/components/layout/Footer';
const DESCRIPTION =
  'دليل عربي ميسّر لأخلاق الإسلام: نفهم المعنى، ونقرأ الدليل من القرآن والسنة، ونتدرّب على العمل في حياتنا.';
export const metadata: Metadata = {
  title: { default: 'مسلم بحق | إيمان يثمر خُلُقًا', template: '%s | مسلم بحق' },
  applicationName: 'مسلم بحق',
  description: DESCRIPTION,
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    siteName: 'مسلم بحق',
    title: 'مسلم بحق | إيمان يثمر خُلُقًا',
    description: DESCRIPTION,
  },
};
export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfcfa' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1614' },
  ],
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {[naskhArabic, cairoArabic, amiriQuranArabic].map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            /* Font fetches are CORS-mode even same-origin; without this the
               preload is discarded and the file is downloaded twice. */
            crossOrigin="anonymous"
          />
        ))}
        <ScrollToTop />
        <a className="skip-link" href="#main">
          انتقل إلى المحتوى
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
