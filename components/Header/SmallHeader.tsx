"use client";
import React, { useRef } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";
import { easeInOut, motion } from 'framer-motion';
import Link from "next/link";

type Props = {
  messages: any;
  locale: string;
};

const SmallHeader = ({ messages, locale }: Props) => {
  const navRef = useRef<HTMLElement>(null);
  return (
    <div className="sticky top-0 bg-white dark:bg-gray-900 z-20">
      <motion.div id="header" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6, ease:easeInOut}} className="overflow-hidden">
        <header className='relative text-white'>
          <div className='relative h-full container mx-auto md:px-8 flex flex-col'>
            <div className='flex justify-between pt-4 max-md:px-4' role='navigation'>
              <div className='hidden md:block'>
                <SocialIcons messages={messages.Header.SocialData} locale={locale} />
              </div>
              <div className='flex gap-8 items-center'>
                <LanguageSwitcher />
                <ThemeToggle />
              </div>
              <MobileMenu messages={messages.Header} nav={messages.navigation} locale={locale}/>
              
            </div>
          </div>
          
        </header>
      </motion.div>
      <nav
        ref={navRef}
        className="shadow-lg z-50 transition-all duration-300 relative md:sticky md:top-0 hidden md:block nav-bg"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 items-center py-4 relative">
            <ul className="flex justify-end gap-6">
              
              <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0, ease:easeInOut, type:"spring", bounce:.7}}>
                <Link href={`/${locale}#header`}>
                  {messages.navigation.home}
                </Link>
              </motion.li>
              <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0.2, ease:easeInOut, type:"spring", bounce:.7}}>
                <Link href={`/${locale}#about`} >
                  {messages.navigation.about}
                </Link>
              </motion.li>
              <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0.4, ease:easeInOut, type:"spring", bounce:.7}}>
                <Link href={`/${locale}#resume`} >
                  {messages.navigation.resume}
                </Link>
                </motion.li>
            </ul>

            <motion.div initial={{opacity:0, scale:0}} animate={{opacity:1, scale:1}} transition={{type: "spring", duration:2.2, delay:0, ease:easeInOut, bounce:0.8}} className="flex justify-center">
              <img
                src="/images/sina/portrait.png"
                alt={locale === 'en' ? 'Sina Rahmani' : 'سینا رحمانی'}
                className={`absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[10px] border-gray-100 rounded-full w-[120px] h-[120px] shadow-md transition-all duration-300`}
                title={locale === 'en' ? 'Sina Rahmani' : 'سینا رحمانی'}
              />
            </motion.div>

            <ul className="flex justify-start gap-6">
              <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0.3, ease:easeInOut, type:"spring", bounce:.7}}>
                <Link href={`/${locale}#projects`} >
                  {messages.navigation.portfolio}
                </Link>
              </motion.li>
              <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0.5, ease:easeInOut, type:"spring", bounce:.7}}>
                <Link href={`/${locale}#blogs`}>
                  {messages.navigation.blog}
                </Link>
              </motion.li>
              <motion.li initial={{opacity:0, y:20, scale:0}} animate={{opacity:1, y:0, scale:1}} transition={{duration:0.8, delay:0.7, ease:easeInOut, type:"spring", bounce:.7}}>
                <Link href={`/${locale}#contact`}>
                  {messages.navigation.contact}
                </Link>
              </motion.li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SmallHeader;
