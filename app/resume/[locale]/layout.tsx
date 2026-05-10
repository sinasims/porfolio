// app/[locale]/resume/layout.tsx
import { ReactNode } from 'react';
import './resume.css';

export default async function ResumeLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === 'en' ? 'ltr' : 'rtl';
  const font = locale === 'en' ? 'font-inter' : 'font-vazirMatn'
  // فقط یک div wrapper (یا هیچ wrapper) برگردانید، نه html و body
  return (
      <html lang={locale} dir={dir} suppressHydrationWarning>
        <body className={`${font} bg-white text-gray-900`}>

          {children}
        </body>
      </html>
    );
}