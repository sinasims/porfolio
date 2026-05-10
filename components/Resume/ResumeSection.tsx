'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faGraduationCap,
  faCode,
  faLanguage,
  faCalendarAlt,
  faUserGraduate,
  faSchool,
} from '@fortawesome/free-solid-svg-icons';
import ScrollReveal from "@/components/ScrollRevealProps";
import { motion } from 'framer-motion';

// آبجکت ترجمه‌ها
const translations = {
  fa: {
    title: "رزومه",
    workExperience: "تجربه کاری",
    education: "تحصیلات",
    technicalSkills: "مهارت‌های فنی",
    languages: "زبان‌ها",
    job1Title: "مدیر تیم طراحی سایت",
    job1Period: "۱۳۸۹ - ۱۳۹۴",
    job1Description: "از سال ۱۳۸۹ - ۱۳۹۴ در شرکت سفیر به عنوان مدیر تیم طراحی سایت و نرم افزار فعالیت کردم. در این مسئولیت، با برنامه‌ریزی، هدایت تیم و انجام پروژه‌های طراحی و توسعه وب سایت و نرم افزار، تجربه گسترده‌ای را کسب کرده‌ام.",
    job2Title: "فریلنسر",
    job2Period: "۱۳۹۴ - تا کنون",
    job2Description: "به عنوان توسعه‌دهنده ارشد فول‌استک از سال ۱۳۹۴ تاکنون به صورت فریلنسر و خوداشتغال فعالیت داشته‌ام. در این مدت بیش از ۳۰ اپلیکیشن وب برای مشتریان بین‌المللی طراحی و پیاده‌سازی کرده‌ام، موفق به بهبود امتیاز سئو و عملکرد وب‌سایت‌ها تا ۴۰ درصد شده‌ام و در کنار آن، مهاجرت سیستم‌های قدیمی را به استک‌های مدرن انجام داده‌ام تا کارایی و مقیاس‌پذیری بالاتری حاصل شود.",
    job3Title: "استودیو موسیقی",
    job3Period: "۱۳۹۱ - تا کنون",
    job3Description: "آموزش موسیقی به شاگردهای زیادی می‌پردازم. در استودیو موسیقی، به طور فعال در فرایند تولید موسیقی شرکت کرده و آهنگ‌های متنوعی در سبک‌ها و ژانرهای مختلف را خلق کرده‌ام. همچنین، از تجربه‌هایم در این زمینه، به شاگردهایم آموزش موسیقی می‌دهم و آنها را در مسیر پیشرفت و بهبود در عرصه موسیقی همراهی می‌کنم.",
    mastersDegree: "فوق لیسانس",
    mastersField: "فارغ التحصیل رشته کامپیوتر گرایش نرم افزار از دانشگاه آزاد واحد ساری.",
    bachelorsDegree: "لیسانس",
    bachelorsField: "فارغ التحصیل رشته کامپیوتر گرایش نرم افزار از دانشگاه علم و صنعت ایران.",
    preUniversity: "پیش دانشگاهی",
    preUniversityField: "پیش دانشگاهی را در رشته ریاضی در مدرسه علامه طباطبائی با موفقیت گذراندم.",
    persian: "Persian (فارسی) – مادری",
    english: "English (انگلیسی)",
    german: "Deutsch (آلمانی)",
  },
  en: {
    title: "Resume",
    workExperience: "Work Experience",
    education: "Education",
    technicalSkills: "Technical Skills",
    languages: "Languages",
    job1Title: "Website Design Team Manager",
    job1Period: "2010 - 2015",
    job1Description: "I have been working as the website and software design team manager at Safir Company. In this role, I have gained extensive experience in planning, leading the team, and executing web and software development projects.",
    job2Title: "Freelance / Self-employed",
    job2Period: "2015 – Present",
    job2Description: "As a Senior Full-Stack Developer working as a freelancer / self‑employed since 2015, I have designed and developed over 30 web applications for international clients. I successfully improved SEO and performance scores by up to 40% and migrated legacy systems to modern technology stacks, resulting in higher efficiency and scalability.",
    job3Title: "Music Studio",
    job3Period: "2012 - Present",
    job3Description: "I teach music to many students. In the music studio, I actively participate in music production and have created various tracks in different styles and genres. Additionally, I share my experiences with my students, guiding them toward progress and improvement in the field of music.",
    mastersDegree: "Master's Degree",
    mastersField: "Graduated in Computer Engineering (Software) from Islamic Azad University, Sari branch.",
    bachelorsDegree: "Bachelor's Degree",
    bachelorsField: "Graduated in Computer Engineering (Software) from Iran University of Science and Technology.",
    preUniversity: "Pre-University",
    preUniversityField: "Successfully completed Pre-University in Mathematics at Allameh Tabatabaei School.",
    persian: "Persian (Farsi) – Native",
    english: "English",
    german: "German",
  },
};

// کامپوننت نوار پیشرفت (بدون تغییر، فقط انیمیشن)
const ProgressBar = ({ label, percent, color = 'bg-indigo-600' }: { label: string; percent: number; color?: string }) => {
  return (
    <ScrollReveal from={{ opacity: 0, x: -20 }} to={{ opacity: 1, x: 0 }}>
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{percent}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className={`h-2.5 rounded-full ${color}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${percent}%` }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </div>
    </ScrollReveal>
  );
};

interface ResumeSectionProps {
  locale?: 'fa' | 'en';  // اگر از جای دیگر می‌آید، مقدار پیش‌فرض fa
}

const ResumeSection = ({ locale = 'fa' }: ResumeSectionProps) => {
  const t = translations[locale];
  const isRTL = locale === 'fa';

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 overflow-hidden" id='resume' dir={isRTL ? 'rtl' : 'ltr'}>
      {/* عنوان بخش با انیمیشن */}
      <ScrollReveal from={{ opacity: 0, y: -30 }} to={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faBriefcase} className="text-3xl" />
          <span>{t.title}</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ستون اول: تجربه کاری */}
        <div className="space-y-6">
          <ScrollReveal from={{ opacity: 0, x: -50 }} to={{ opacity: 1, x: 0 }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-white to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/20 rounded-2xl border border-indigo-200/50 dark:border-indigo-800/30 shadow-lg p-6 transition-all hover:shadow-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                  <span className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-xl text-white shadow-lg">
                    <FontAwesomeIcon icon={faBriefcase} />
                  </span>
                  <span>{t.workExperience}</span>
                </h3>
                <div className="space-y-6">
                  {/* آیتم ۱ */}
                  <div className="relative pr-6 border-r-4 border-blue-500/30 dark:border-blue-400/30 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300">
                    <div className="absolute -right-2 top-0 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full shadow-lg shadow-blue-500/50" />
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2 font-medium">
                      <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
                      <span className="text-sm">{t.job1Period}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.job1Title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-justify leading-relaxed">
                      {t.job1Description}
                    </p>
                  </div>
                  {/* آیتم ۲ */}
                  <div className="relative pr-6 border-r-4 border-indigo-500/30 dark:border-indigo-400/30 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all duration-300">
                    <div className="absolute -right-2 top-0 w-4 h-4 bg-indigo-500 dark:bg-indigo-400 rounded-full shadow-lg shadow-indigo-500/50" />
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 mb-2 font-medium">
                      <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
                      <span className="text-sm">{t.job2Period}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.job2Title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-justify leading-relaxed">
                      {t.job2Description}
                    </p>
                  </div>
                  {/* آیتم ۳ */}
                  <div className="relative pr-6 border-r-4 border-purple-500/30 dark:border-purple-400/30 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300">
                    <div className="absolute -right-2 top-0 w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full shadow-lg shadow-purple-500/50" />
                    <div className="flex items-center text-purple-600 dark:text-purple-400 mb-2 font-medium">
                      <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
                      <span className="text-sm">{t.job3Period}</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.job3Title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-justify leading-relaxed">
                      {t.job3Description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ستون دوم: تحصیلات */}
        <div className="space-y-6">
          <ScrollReveal from={{ opacity: 0, y: -30 }} to={{ opacity: 1, y: 0 }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/30 shadow-lg p-6 transition-all hover:shadow-2xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
                  <span className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl text-white shadow-lg">
                    <FontAwesomeIcon icon={faGraduationCap} />
                  </span>
                  <span>{t.education}</span>
                </h3>
                <div className="space-y-6">
                  <div className="relative pr-6 border-r-4 border-blue-500/30 dark:border-blue-400/30 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300">
                    <div className="absolute -right-2 top-0 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full shadow-lg shadow-blue-500/50" />
                    <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2 font-medium">
                      <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
                      <span className={`text-sm ${locale === 'fa' ? 'font-peyda-num' : ''}`}>
                        {locale === 'fa' ? '1402' : '2024'}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-2">
                      <FontAwesomeIcon icon={faUserGraduate} className="text-blue-500" />
                      <span>{t.mastersDegree}</span>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{t.mastersField}</p>
                  </div>
                  <div className="relative pr-6 border-r-4 border-cyan-500/30 dark:border-cyan-400/30 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all duration-300">
                    <div className="absolute -right-2 top-0 w-4 h-4 bg-cyan-500 dark:bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50" />
                    <div className="flex items-center text-cyan-600 dark:text-cyan-400 mb-2 font-medium">
                      <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
                      <span className={`text-sm ${locale === 'fa' ? 'font-peyda-num' : ''}`}>
                        {locale === 'fa' ? '1389' : '2011'}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-2">
                      <FontAwesomeIcon icon={faUserGraduate} className="text-cyan-500" />
                      <span>{t.bachelorsDegree}</span>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{t.bachelorsField}</p>
                  </div>
                  <div className="relative pr-6 border-r-4 border-teal-500/30 dark:border-teal-400/30 hover:border-teal-500 dark:hover:border-teal-400 transition-all duration-300">
                    <div className="absolute -right-2 top-0 w-4 h-4 bg-teal-500 dark:bg-teal-400 rounded-full shadow-lg shadow-teal-500/50" />
                    <div className="flex items-center text-teal-600 dark:text-teal-400 mb-2 font-medium">
                      <FontAwesomeIcon icon={faCalendarAlt} className="ml-2" />
                      <span className={`text-sm ${locale === 'fa' ? 'font-peyda-num' : ''}`}>
                        {locale === 'fa' ? '1381' : '2003'}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-2">
                      <FontAwesomeIcon icon={faSchool} className="text-teal-500" />
                      <span>{t.preUniversity}</span>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{t.preUniversityField}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ستون سوم: مهارت‌ها و زبان */}
        <div className="space-y-6">
          {/* مهارت‌ها */}
          <ScrollReveal from={{ opacity: 0, x: 50 }} to={{ opacity: 1, x: 0 }}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 transition-all hover:shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <FontAwesomeIcon icon={faCode} />
                <span>{t.technicalSkills}</span>
              </h3>
              <div className="space-y-4">
                <ProgressBar label="HTML5 & CSS3" percent={100} color="bg-indigo-600" />
                <ProgressBar label="Tailwind CSS" percent={100} color="bg-indigo-600" />
                <ProgressBar label="JavaScript" percent={95} color="bg-indigo-600" />
                <ProgressBar label="TypeScript" percent={90} color="bg-indigo-600" />
                <ProgressBar label="Next.js" percent={90} color="bg-indigo-600" />
                <ProgressBar label="Python/Django" percent={90} color="bg-indigo-600" />
                <ProgressBar label="PHP" percent={95} color="bg-indigo-600" />
                <ProgressBar label="SQL" percent={90} color="bg-indigo-600" />
                <ProgressBar label="C# & VB" percent={100} color="bg-indigo-600" />
                <ProgressBar label="RESTful API" percent={90} color="bg-indigo-600" />
              </div>
            </div>
          </ScrollReveal>

          {/* زبان‌ها */}
          <ScrollReveal from={{ opacity: 0, x: 50 }} to={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 transition-all hover:shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <FontAwesomeIcon icon={faLanguage} />
                <span>{t.languages}</span>
              </h3>
              <div className="space-y-4">
                <ProgressBar label={t.persian} percent={100} color="bg-emerald-600" />
                <ProgressBar label={t.english} percent={75} color="bg-emerald-600" />
                <ProgressBar label={t.german} percent={50} color="bg-emerald-600" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ResumeSection;