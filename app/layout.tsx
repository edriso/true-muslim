import type { Metadata } from 'next';
import '@fontsource-variable/cairo';
import '@fontsource/amiri-quran/arabic-400.css';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
export const metadata: Metadata = {
  title: { default: 'مسلم بحق | إيمان يثمر خُلُقًا', template: '%s | مسلم بحق' },
  icons: { icon: '/favicon.svg' },
  description:
    'دليل عربي ميسر لأخلاق الإسلام: نفهم المعنى، ونقرأ الدليل من القرآن والسنة، ونتدرّب على العمل في حياتنا.',
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
