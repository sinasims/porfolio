// components/ShareButton.tsx
'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';

interface ShareButtonProps {
  title: string;
  locale: 'fa' | 'en';
}

export default function ShareButton({ title, locale }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      });
    } else {
      // Fallback: می‌توانید یک alert یا کپی لینک در کلیپ‌بورد انجام دهید
      alert(locale === 'fa' ? 'لینک در کلیپ‌بورد کپی شد' : 'Link copied to clipboard');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 px-6 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full shadow-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition"
    >
      <FontAwesomeIcon icon={faShareAlt} className="text-indigo-500" />
      <span>{locale === 'fa' ? 'اشتراک‌گذاری' : 'Share'}</span>
    </button>
  );
}