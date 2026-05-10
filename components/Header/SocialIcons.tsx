import React from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faInstagram, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

config.autoAddCss = false;

const iconMap: Record<string, any> = {
  faMobileAlt: faMobileAlt,
  faGoogle: faGoogle,
  faInstagram: faInstagram,
  faTelegram: faTelegram,
  faWhatsapp: faWhatsapp,
};

type Props = {
  messages: any;
  locale: string
};

const SocialIcons = ({ messages, locale }: Props) => {
  return (
    <div>
    <div className='w-full max-md:mt-4 max-md:p-4'>
      <ul className={`flex gap-4 items-center max-md:justify-center social-icons`}>
        {Object.values(messages).map((item: any, idx: number) => (
          <motion.li
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.2 }}
           key={idx}>
            <a href={item.link} title={item.text} aria-label={item.text}>
              <FontAwesomeIcon icon={iconMap[item.icon]} className="text-3xl" /> 
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
    <div className='flex max-md:justify-center md:hidden'>
      {locale === 'en' ? (
        <span>Designed by <a className='text-primary' href='https://sinarahmani.ir'>Sina Rahmani</a></span>
      ) : (
        <span>طراحی شده توسط <a className='text-primary' href='https://sinarahmani.ir'>سینا رحمانی</a></span>
      )}
    </div>
    </div>
  );
};

export default SocialIcons;