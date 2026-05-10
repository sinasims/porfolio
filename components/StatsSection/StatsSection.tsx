'use client';

import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faProjectDiagram,
  faSmile,
  faUserGraduate,
  faTrophy,
  faMusic,
} from '@fortawesome/free-solid-svg-icons';
import ScrollReveal from "@/components/ScrollRevealProps";

// تبدیل عدد به رقم فارسی (فقط برای زبان فارسی)
const toPersianNumber = (num: number) => {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};

// نمایش عدد بر اساس زبان
const formatNumber = (num: number, locale: 'fa' | 'en') => {
  if (locale === 'fa') {
    return toPersianNumber(num);
  }
  return num.toString(); // اعداد انگلیسی معمولی
};

// آبجکت ترجمه
const translations = {
  fa: {
    title: "دستاوردهای من",
    stats: [
      { label: "سال سابقه کاری", suffix: "+" },
      { label: "پروژه موفق", suffix: "" },
      { label: "رضایت مشتری", suffix: "%" },
      { label: "قطعه موسیقی", suffix: "" },
    ],
  },
  en: {
    title: "My Achievements",
    stats: [
      { label: "Years of Experience", suffix: "+" },
      { label: "Successful Projects", suffix: "" },
      { label: "Client Satisfaction", suffix: "%" },
      { label: "Music Pieces", suffix: "" },
    ],
  },
};

interface CountUpItemProps {
  value: number;
  label: string;
  suffix: string;
  icon: any;
  duration?: number;
  gradient: string;
  locale: 'fa' | 'en';
}

const CountUpItem = ({ value, label, suffix, icon, duration = 2, gradient, locale }: CountUpItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const incrementTime = (duration * 1000) / end;
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="relative group h-full">
      {/* Gradient Border Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500`} />
      
      {/* Main Card */}
      <div className="relative text-center p-8 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 transition-all hover:shadow-2xl hover:scale-[1.05] backdrop-blur-sm h-full flex flex-col justify-center">
        <div className={`text-5xl mb-5 bg-gradient-to-br ${gradient} bg-clip-text text-transparent drop-shadow-lg`}>
          <FontAwesomeIcon icon={icon} />
        </div>
        <div className={`text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {isInView ? formatNumber(count, locale) : (locale === 'fa' ? '۰' : '0')}
          {suffix}
        </div>
        <div className="text-gray-700 dark:text-gray-300 text-lg font-medium">{label}</div>
      </div>
    </div>
  );
};

interface StatsSectionProps {
  locale?: 'fa' | 'en';
}

const StatsSection = ({ locale = 'fa' }: StatsSectionProps) => {
  const t = translations[locale];
  const isRTL = locale === 'fa';

  // داده‌های آماری (مقادیر عددی ثابت)
  const statsData = [
    { value: 14, icon: faBriefcase, gradient: 'from-indigo-500 via-purple-500 to-pink-500' },
    { value: 87, icon: faProjectDiagram, gradient: 'from-blue-500 via-cyan-500 to-teal-500' },
    { value: 99, icon: faSmile, gradient: 'from-green-500 via-emerald-500 to-teal-500' },
    { value: 23, icon: faMusic, gradient: 'from-orange-500 via-red-500 to-pink-500' },
  ];

  // ترکیب داده‌های عددی با ترجمه لیبل و پسوند
  const stats = statsData.map((stat, index) => ({
    ...stat,
    label: t.stats[index].label,
    suffix: t.stats[index].suffix,
  }));

  return (
    <div className="container mx-auto px-4 py-16 md:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <ScrollReveal from={{ opacity: 0, y: -30 }} to={{ opacity: 1, y: 0 }}>
        <div className="relative inline-block mx-auto mb-16 w-full text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 blur-2xl opacity-20 rounded-full" />
          <h2 className="relative text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 flex items-center justify-center gap-3">
            <span className="bg-gradient-to-br from-yellow-500 to-orange-600 p-4 rounded-xl text-white shadow-xl">
              <FontAwesomeIcon icon={faTrophy} className="text-3xl" />
            </span>
            <span>{t.title}</span>
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <ScrollReveal
            key={index}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CountUpItem
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              icon={stat.icon}
              gradient={stat.gradient}
              locale={locale}
            />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;