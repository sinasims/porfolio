"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { easeInOut, motion } from "framer-motion";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  // کامپوننت داخلی برای هر آیتم زبان (با پشتیبانی از انیمیشن شخصی)
  const LangLink = ({ locale, img, label, index }: { locale: string; img: string; label: string; index: number }) => {
    if (currentLocale === locale) {
      return (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.3 }}
        >
          <img src={img} alt={label} className="cursor-default w-8" />
        </motion.div>
      );
    }
    const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`);
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.3, ease:easeInOut }}
      >
        <Link href={newPath} title={label}>
          <img src={img} alt={label} className="w-8" />
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="flex gap-4 items-center">
      <LangLink locale="en" img="/images/icons/flag_en.svg" label="English" index={0} />
      <LangLink locale="fa" img="/images/icons/flag_fa.svg" label="فارسی" index={1} />
    </div>
  );
}