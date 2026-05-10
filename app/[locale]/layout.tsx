import fs from "fs";
import path from "path";
import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { locales } from "@/lib/i18n";
import CursorHalo from "@/components/Cursor";
import ClientTopLoader from "@/components/ClientTopLoader";

// محتوای theme-init.html را بخوان (فقط در سرور)
const themeInit = fs.readFileSync(
  path.join(process.cwd(), "app/theme-init.html"),
  "utf8"
);

export const metadata = {
  other: {
    head: themeInit, // محتوای HTML مستقیم به <head> تزریق می‌شود
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) notFound();
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const dir = locale === "fa" ? "rtl" : "ltr";
  const fontClass = locale === "fa" ? "font-vazir" : "font-inter";


  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className="dark">
      <body className={`${fontClass} dark:bg-gray-900 bg-white dark:text-gray-100 text-gray-900 transition-colors duration-300`}>
        <ClientTopLoader />
        <CursorHalo />
        {children}
      </body>
    </html>
  );
}
