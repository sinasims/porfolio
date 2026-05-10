// components/Footer.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faEnvelope,
  faPhone,
  faMapMarker,
  faCopyright,
} from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faTwitter,
  faInstagram,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { usePathname } from "next/navigation";

// آبجکت ترجمه‌ها
const translations = {
  fa: {
    introduction: "توسعه‌دهنده فرانت‌اند با عشق به تجربه کاربری زیبا و کارآمد. همیشه در تلاش برای خلق اینترفیس‌های مدرن.",
    codeWithLove: "کدنویسی با عشق",
    usefulLinks: "لینک‌های مفید",
    myName: "سینا رحمانی",
    phoneNumber: "+۹۸ ۹۱۱ ۱۵۱ ۷۷۰۵",
    home: "صفحه اصلی",
    skills: "مهارت‌ها",
    projects: "پروژه‌ها",
    contact: "تماس با من",
    connectWithMe: "ارتباط با من",
    followMe: "دنبال کنید",
    availableForWork: "در دسترس برای همکاری",
    allRightsReserved: "تمامي حقوق محفوظ است.",
    location: "ساری، مازندران، ایران",
  },
  en: {
    introduction: "Front-end developer passionate about beautiful and efficient user experiences. Always striving to create modern interfaces.",
    codeWithLove: "Coding with love",
    myName: "Sina Rahmani",
    phoneNumber: "+98 911 151 7705",
    usefulLinks: "Useful Links",
    home: "Home",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    connectWithMe: "Connect with me",
    followMe: "Follow me",
    availableForWork: "Available for work",
    allRightsReserved: "All rights reserved.",
    location: "Sari, Mazandaran, Iran",
  },
};

interface FooterProps {
  locale?: "fa" | "en"; // اگر از جای دیگر می‌آید، این را حذف کنید و از useLocale استفاده کنید
}

const Footer = ({ locale = "fa" }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const navTop = navRef.current.getBoundingClientRect().top;
        setIsSticky(navTop <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: any, targetId: string, offset = 100) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const t = translations[locale]; // انتخاب متن‌ها بر اساس زبان
  const isRTL = locale === "fa";
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`);

  return (
    <footer
      className="relative mt-20 overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* گرادیانت پس‌زمینه و افکت شیشه‌ای */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/20 -z-10" />

      {/* حاشیه بالایی گرادیان درخشان */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-3/4 mx-auto" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* بخش لوگو / معرفی */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                {/* بهتر است از Next.js Image استفاده کنید */}
                <img
                  src="/images/sina/portrait.png"
                  alt="Sina Rahmani"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-l from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t.myName}
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {t.introduction}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="text-rose-500 animate-pulse">
                <FontAwesomeIcon icon={faHeart} />
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                {t.codeWithLove}
              </span>
            </div>
          </div>

          {/* لینک‌های سریع */}
          <div>
            <h4 className="text-gray-800 dark:text-gray-200 font-semibold mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-indigo-400 rounded-full"></span>
              {t.usefulLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#header"
                  onClick={(e) => handleSmoothScroll(e, "header", 100)}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-indigo-500 transition-all group-hover:w-2"></span>
                  {t.home}
                </Link>
              </li>
              <li>
                <Link
                  href="#resume"
                  onClick={(e) => handleSmoothScroll(e, "resume", 100)}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-indigo-500 transition-all group-hover:w-2"></span>
                  {t.skills}
                </Link>
              </li>
              <li>
                <Link
                  href="#projects"
                  onClick={(e) => handleSmoothScroll(e, "projects", 100)}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-indigo-500 transition-all group-hover:w-2"></span>
                  {t.projects}
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  onClick={(e) => handleSmoothScroll(e, "contact", 100)}
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:bg-indigo-500 transition-all group-hover:w-2"></span>
                  {t.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* اطلاعات تماس */}
          <div>
            <h4 className="text-gray-800 dark:text-gray-200 font-semibold mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-indigo-400 rounded-full"></span>
              {t.connectWithMe}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} className="w-4 text-indigo-500" />
                <a href="mailto:sina.rahmanii@gmail.com" className="hover:text-indigo-600 transition">
                  sina.rahmanii@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FontAwesomeIcon icon={faPhone} className="w-4 text-indigo-500" />
                <a href="tel:+989111517705" className="hover:text-indigo-600 transition" style={{ direction: "ltr" }}>
                  {t.phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <FontAwesomeIcon icon={faMapMarker} className="w-4 text-indigo-500" />
                <span>{t.location}</span>
              </li>
            </ul>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div>
            <h4 className="text-gray-800 dark:text-gray-200 font-semibold mb-4 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-indigo-400 rounded-full"></span>
              {t.followMe}
            </h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/sinasims"
                className="group relative w-10 h-10 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} className="text-lg" />
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 -z-10 transition-opacity" />
              </a>
              <a
                href="https://www.linkedin.com/in/sina-rahmani-195b54299/"
                className="group relative w-10 h-10 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 -z-10 transition-opacity" />
              </a>
              <a
                href="https://t.me/sina.rahmaniii"
                className="group relative w-10 h-10 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600"
                aria-label="Telegram"
              >
                <FontAwesomeIcon icon={faTelegram} className="text-lg" />
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 -z-10 transition-opacity" />
              </a>
              <a
                href="https://instagram.com/sina.rahmani"
                className="group relative w-10 h-10 rounded-2xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 -z-10 transition-opacity" />
              </a>
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-600 bg-white/50 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl px-3 py-2">
                <span>{t.availableForWork}</span>
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>

        {/* کپی رایت */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faCopyright} className="text-xs" />
            <span>{currentYear} {t.myName}. {t.allRightsReserved}</span>
          </div>
          <div className="flex items-center gap-4">
            {newPath === '/en' ? <span>English</span> : <Link href='/en'>English</Link>}
            {newPath === '/fa' ? <span>فارسی</span> : <Link href='/fa' className="font-vazirMatn">فارسی</Link>}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;