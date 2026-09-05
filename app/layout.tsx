import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/noto-naskh-arabic/wght.css';
import '@fontsource-variable/cairo/wght.css';
import '@fontsource/amiri-quran/arabic-400.css';
import './globals.css';
import { Header } from '@/components/layout/Header';
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
