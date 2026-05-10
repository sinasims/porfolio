"use client";
import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";
import TextData from "./TextData";
import Nav from "./Nav";
import MobileMenu from "./MobileMenu";
import { easeInOut, motion } from 'framer-motion';

type Props = {
  messages: any;
  locale: string;
};

const Header = ({ messages, locale }: Props) => {
  const bgPosition = locale === 'en' ? '15% 10%' : '90% 10%';
  return (
    <>
    <motion.div id="header" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.6, ease:easeInOut}} className="overflow-hidden">
      <header className='relative h-[80vh] bg-cover bg-no-repeat bg-fixed text-white hero'
        style={{ 
          backgroundPosition: bgPosition
        }}>
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
          <TextData data={messages.Header.Text} language={locale} />
        </div>
        
      </header>
    </motion.div>
    <Nav nav={messages.navigation} locale={locale} />
    </>
  );
};

export default Header;
