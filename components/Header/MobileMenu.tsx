"use client"; // اگر در Next.js 13+ استفاده می‌کنید

import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from "framer-motion";
import React, { useState } from 'react';
import SocialIcons from './SocialIcons';
import NavMobile from './NavMobile';

type Props = {
  messages: any;
  nav: string;
  locale: string;
};

const MobileMenu = ({ messages, nav, locale }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);
  const slide = locale === 'en' ? 'left-0' : 'right-0';
  const translate = locale === 'en' ? '-translate-x-full' : 'translate-x-full';
  const title = locale === 'en' ? 'menu' : 'منو';
  const pos = locale === 'en' ? 'right-4' : 'left-4';


  return (
    <div className={`overflow-hidden fixed top-4 ${pos} z-90 md:hidden mobile-menu bg-gray-900 p-2 rounded xl shadow-xl`}>
      <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}  className='flex md:hidden items-center'>
        <button onClick={openMenu} className=''>
          <FontAwesomeIcon icon={faBars} className='text-3xl' /> 
        </button>
      </motion.div>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black/30 z-40 transition-opacity duration-300'
          onClick={closeMenu}
        />
      )}

      <div
        className={`
          fixed top-0 ${slide} h-full bg-white dark:bg-gray-900 shadow-lg z-50
          transform transition-transform duration-300 ease-in-out w-[80%] flex flex-col 
          ${isOpen ? 'translate-x-0' : translate}
        `}
      >
        {/* هدر منو با دکمه بستن */}
        <div
          className='flex justify-between items-center p-4 border-b'>
            <span className='text-lg font-bold'>{title}</span>
            <button onClick={closeMenu}>
              <FontAwesomeIcon icon={faTimes} className='text-2xl' />
            </button>
        </div>
        
        

        {/* لینک‌های منو */}
        <div className="flex flex-col justify-between flex-1">
          <NavMobile nav={nav} locale={locale} onLinkClick={closeMenu}/>
          <SocialIcons messages={messages.SocialData} locale={locale} />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;