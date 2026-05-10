"use client";

import { easeInOut, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

type Props = {
  nav: any;
  locale: string;
}

export default function Navbar({nav, locale}: Props) {
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
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = targetPosition - offset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };
  return (
    <nav
      ref={navRef}
      className="shadow-lg z-50 transition-all duration-300 relative md:sticky md:top-0 hidden md:block nav-bg"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center py-4 relative">
          <ul className="flex justify-end gap-6">
            
            <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0, ease:easeInOut, type:"spring", bounce:.7}}>
              <a href="#header" onClick={(e) => handleSmoothScroll(e, 'header', 100)}>
                {nav.home}
              </a>
            </motion.li>
            <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0.2, ease:easeInOut, type:"spring", bounce:.7}}>
              <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about', 100)}>
                {nav.about}
              </a>
            </motion.li>
            <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0.4, ease:easeInOut, type:"spring", bounce:.7}}>
              <a href="#resume" onClick={(e) => handleSmoothScroll(e, 'resume', 100)}>
                {nav.resume}
              </a>
              </motion.li>
          </ul>

          <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} transition={{type: "spring", duration:2.2, delay:0, ease:easeInOut, bounce:0.8}} className="flex justify-center">
            <img
              src="/images/sina/portrait.png"
              alt={locale === 'en' ? 'Sina Rahmani' : 'سینا رحمانی'}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[10px] border-gray-100 rounded-full w-[170px] h-[170px] shadow-md transition-all duration-300 ${
                isSticky ? "opacity-0 invisible" : "opacity-100 visible"
              }`}
              title={locale === 'en' ? 'Sina Rahmani' : 'سینا رحمانی'}
            />

            <div
              className={`text-center transition-all duration-300 ${
                isSticky ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <h5 className="fa-text-titr text-lg font-bold">{locale === 'en' ? 'Sina Rahmani' : 'سینا رحمانی'}</h5>
              <div className="fa-text-vazir text-gray-400 text-xs mt-1">
                {locale === 'en' ? 'Web designer | Software developer' : 'طراح سایت | توسعه دهنده نرم افزار'}
              </div>
            </div>
          </motion.div>

          <ul className="flex justify-start gap-6">
            <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0.3, ease:easeInOut, type:"spring", bounce:.7}}>
              <a href="#projects" onClick={(e) => handleSmoothScroll(e, 'projects', 100)}>
                {nav.portfolio}
              </a>
            </motion.li>
            <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0.5, ease:easeInOut, type:"spring", bounce:.7}}>
              <a href="#blogs" onClick={(e) => handleSmoothScroll(e, 'blogs', 100)}>
                {nav.blog}
              </a>
            </motion.li>
            <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0.7, ease:easeInOut, type:"spring", bounce:.7}}>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact', 100)}>
                {nav.contact}
              </a>
            </motion.li>
          </ul>
        </div>
      </div>
    </nav>
  );
}