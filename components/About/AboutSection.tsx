"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCakeCandles,
  faPhone,
  faEnvelope,
  faLocationDot,
  faLaptopCode,
  faMusic,
  faChartLine,
  faCode,
  faInfoCircle,
  faVenusMars,
  faGraduationCap,
  faLanguage,
} from "@fortawesome/free-solid-svg-icons";
import ScrollReveal from "@/components/ScrollRevealProps";

// آبجکت ترجمه‌ها
const translations = {
  fa: {
    whoAmI: "من چه کسی هستم؟",
    name: "سینا رحمانی",
    jobTitle: "Full Stack Developer & Music Composer",
    introLine: "یک طراح وب سایت و توسعه دهنده نرم افزار که عاشق موسیقی هستم",
    bio: "من می‌خواهم شنونده‌ها را به دنیای خلاقیت و عشق من به موسیقی دعوت کنم. به عنوان یک طراح وب سایت و توسعه دهنده نرم افزار، من قادر به ایجاد تجربه‌های وب سایت شگفت‌انگیز و برنامه‌های کاربردی بی‌نظیر هستم. اما آنچه مرا از بقیه متمایز می‌کند، عشقم به موسیقی است.",
    tags: ["خلاق", "پشتکار", "علاقه‌مند به یادگیری"],
    personalInfo: "اطلاعات شخصی",
    fullName: "نام و نام خانوادگی:",
    birthday: "تاریخ تولد:",
    gender: "جنسیت:",
    genderMale: "مرد",
    education: "تحصیلات:",
    educationValue: "کارشناسی کامپیوتر",
    phone: "تلفن:",
    email: "ایمیل:",
    address: "آدرس:",
    addressValue: "ایران - مازندران - ساری",
    languagesLabel: "زبان‌ها:",
    languagesValue: "فارسی (مادری)، انگلیسی (متوسط)",
    myExpertise: "تخصص من",
    webDev: "توسعه وب و برنامه‌نویسی",
    webDevSkills: "Python, DJango, C#, VB.net, ASP.net, PHP, HTML, CSS, JavaScript, jQuery, SQL Server, MySQL, Xamarin",
    music: "موسیقی",
    musicDesc: "تنظیم کننده ی سبک پاپ هستم با ساز تخصصی پیانو",
    crypto: "بازار مالی و ارز دیجیتال",
    cryptoDesc: "از بازارهای مالی لذت می‌برم و فعالیت در این حوزه را یک شغل می‌دانم؛ فعالیت در این حوزه برای کسب دانش و تجربه بیشتر، برایم بسیار دلچسب است.",
  },
  en: {
    whoAmI: "Who Am I?",
    name: "Sina Rahmani",
    jobTitle: "Full Stack Developer & Music Composer",
    introLine: "A web designer and software developer who loves music",
    bio: "I want to invite listeners into the world of creativity and my love for music. As a web designer and software developer, I am able to create amazing web experiences and unique applications. But what sets me apart is my passion for music.",
    tags: ["Creative", "Persistent", "Eager to learn"],
    personalInfo: "Personal Information",
    fullName: "Full Name:",
    birthday: "Date of Birth:",
    gender: "Gender:",
    genderMale: "Male",
    education: "Education:",
    educationValue: "Bachelor's in Computer Science",
    phone: "Phone:",
    email: "Email:",
    address: "Address:",
    addressValue: "Iran - Mazandaran - Sari",
    languagesLabel: "Languages:",
    languagesValue: "Persian (Native), English (Intermediate)",
    myExpertise: "My Expertise",
    webDev: "Web Development & Programming",
    webDevSkills: "Python, DJango, C#, VB.net, ASP.net, PHP, HTML, CSS, JavaScript, jQuery, SQL Server, MySQL, Xamarin",
    music: "Music",
    musicDesc: "Pop music arranger, specializing in piano",
    crypto: "Financial Markets & Cryptocurrency",
    cryptoDesc: "I enjoy financial markets and consider activity in this field a profession; engaging in this area to gain more knowledge and experience is very delightful for me.",
  },
};

interface AboutSectionProps {
  locale?: "fa" | "en";
}

export default function AboutSection({ locale = "fa" }: AboutSectionProps) {
  const t = translations[locale];
  const isRTL = locale === "fa";

  // اطلاعات شخصی ثابت (مقادیر شخصی تغییر نمی‌کند ولی ممکن است تاریخ به فرمت میلادی تبدیل شود)
  const birthDate = locale === "fa" ? "۱۳۶۳/۱۰/۰۲" : "1984/12/23";
  const phoneNumber = "00989111517705";
  const emailAddress = "sina.rahmanii@gmail.com";

  return (
    <div
      id="about"
      dir={isRTL ? "rtl" : "ltr"}
      className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16 max-md:px-4"
    >
      {/* کارت اول: درباره من */}
      <div className="relative group h-full overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500" />
        <div className="relative border border-gray-700 rounded-2xl p-6 shadow-lg shadow-gray-800/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-white to-indigo-50/30 dark:from-gray-900 dark:to-indigo-950/30 h-full">
          <ScrollReveal from={{ opacity: 0, x: -50 }} to={{ opacity: 1, x: 0 }}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              <span className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg text-white shadow-lg">
                <FontAwesomeIcon icon={faUser} className="text-xl" />
              </span>
              <span>{t.whoAmI}</span>
            </h3>
          </ScrollReveal>

          <ScrollReveal from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }}>
            <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/50 dark:border-indigo-800/50">
              <p className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
                {t.name}
              </p>
              <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
                {t.jobTitle}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }}>
            <p className="text-base mb-3 font-semibold text-gray-800 dark:text-gray-200">
              {t.introLine}
            </p>
          </ScrollReveal>

          <ScrollReveal
            from={{ opacity: 0, y: 30, scale: 0.95 }}
            to={{ opacity: 1, y: 0, scale: 1 }}
          >
            <p className="text-sm text-justify text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              {t.bio}
            </p>
          </ScrollReveal>

          <ScrollReveal from={{ opacity: 0, y: 20 }} to={{ opacity: 1, y: 0 }}>
            <div className="flex flex-wrap gap-2 mt-4">
              {t.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* کارت دوم: اطلاعات شخصی */}
      <div className="relative group h-full overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500" />
        <div className="relative border border-gray-700 rounded-2xl p-6 shadow-lg shadow-gray-800/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 h-full">
          <ScrollReveal from={{ opacity: 0, x: -50 }} to={{ opacity: 1, x: 0 }}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400">
              <span className="bg-gradient-to-br from-blue-500 to-cyan-600 p-2 rounded-lg text-white shadow-lg">
                <FontAwesomeIcon icon={faInfoCircle} className="text-xl" />
              </span>
              <span>{t.personalInfo}</span>
            </h3>
          </ScrollReveal>

          <div className="space-y-3">
            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-md transition-all group/item">
                <p className="text-sm flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faUser} className="w-4 text-blue-500 group-hover/item:scale-110 transition-transform" />
                  <strong className="min-w-[80px]">{t.fullName}</strong>
                  <span>{t.name}</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-950/30 dark:to-teal-950/30 border border-cyan-200/50 dark:border-cyan-800/50 hover:shadow-md transition-all group/item">
                <p className="text-sm flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faCakeCandles} className="w-4 text-cyan-500 group-hover/item:scale-110 transition-transform" />
                  <strong className="min-w-[80px]">{t.birthday}</strong>
                  <span>{birthDate}</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-950/30 dark:to-emerald-950/30 border border-teal-200/50 dark:border-teal-800/50 hover:shadow-md transition-all group/item">
                <p className="text-sm flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faVenusMars} className="w-4 text-teal-500 group-hover/item:scale-110 transition-transform" />
                  <strong className="min-w-[80px]">{t.gender}</strong>
                  <span>{t.genderMale}</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-md transition-all group/item">
                <p className="text-sm flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faGraduationCap} className="w-4 text-emerald-500 group-hover/item:scale-110 transition-transform" />
                  <strong className="min-w-[80px]">{t.education}</strong>
                  <span>{t.educationValue}</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-lime-50 dark:from-green-950/30 dark:to-lime-950/30 border border-green-200/50 dark:border-green-800/50 hover:shadow-md transition-all group/item">
                <p className="text-sm flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faPhone} className="w-4 text-green-500 group-hover/item:scale-110 transition-transform" />
                  <strong className="min-w-[80px]">{t.phone}</strong>
                  <span dir="ltr">{phoneNumber}</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-lime-50 to-yellow-50 dark:from-lime-950/30 dark:to-yellow-950/30 border border-lime-200/50 dark:border-lime-800/50 hover:shadow-md transition-all group/item">
                <p className="text-sm flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 text-lime-500 group-hover/item:scale-110 transition-transform" />
                  <strong className="min-w-[80px]">{t.email}</strong>
                  <span dir="ltr" className="text-xs">{emailAddress}</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border border-yellow-200/50 dark:border-yellow-800/50 hover:shadow-md transition-all group/item">
                <p className="text-sm flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4 text-yellow-500 group-hover/item:scale-110 transition-transform" />
                  <strong className="min-w-[80px]">{t.address}</strong>
                  <span>{t.addressValue}</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-md transition-all group/item">
                <p className="text-sm flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FontAwesomeIcon icon={faLanguage} className="w-4 text-orange-500 group-hover/item:scale-110 transition-transform" />
                  <strong className="min-w-[80px]">{t.languagesLabel}</strong>
                  <span>{t.languagesValue}</span>
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* کارت سوم: تخصص من */}
      <div className="relative group h-full overflow-hidden">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500" />
        <div className="relative border border-gray-700 rounded-2xl p-6 shadow-lg shadow-gray-800/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-white to-orange-50/30 dark:from-gray-900 dark:to-orange-950/30 h-full">
          <ScrollReveal from={{ opacity: 0, x: -50 }} to={{ opacity: 1, x: 0 }}>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400">
              <span className="bg-gradient-to-br from-orange-500 to-red-600 p-2 rounded-lg text-white shadow-lg">
                <FontAwesomeIcon icon={faLaptopCode} className="text-xl" />
              </span>
              <span>{t.myExpertise}</span>
            </h3>
          </ScrollReveal>

          <div className="space-y-5">
            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200/50 dark:border-indigo-800/50 hover:shadow-md transition-all">
                <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <FontAwesomeIcon icon={faCode} className="text-indigo-500" />
                  <span>{t.webDev}</span>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  {t.webDevSkills}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/30 border border-pink-200/50 dark:border-pink-800/50 hover:shadow-md transition-all">
                <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <FontAwesomeIcon icon={faMusic} className="text-pink-500" />
                  <span>{t.music}</span>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {t.musicDesc}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal from={{ opacity: 0, x: -30 }} to={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-md transition-all">
                <h4 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <FontAwesomeIcon icon={faChartLine} className="text-emerald-500" />
                  <span>{t.crypto}</span>
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                  {t.cryptoDesc}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}