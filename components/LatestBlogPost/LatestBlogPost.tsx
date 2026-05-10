// components/LatestBlogPost/LatestBlogPost.tsx
'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faArrowLeft, faArrowRight, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import ScrollReveal from "@/components/ScrollRevealProps";
import Link from 'next/link';

export type BlogPost = {   // ✅ export type
  id: number;
  title: string;
  en_title: string;
  excerpt: string;
  en_excerpt: string;
  image: string;
  author: string;
  en_author: string;
  publish_date: string;
  slug: string;
};

const translations = {
  fa: {
    title: "آخرین نوشته‌ها",
    noPosts: "هیچ پستی یافت نشد.",
    readMore: "مطالعه بیشتر",
    arrowIcon: faArrowLeft,
  },
  en: {
    title: "Latest Posts",
    noPosts: "No posts found.",
    readMore: "Read More",
    arrowIcon: faArrowRight,
  },
};

interface LatestBlogPostProps {
  posts?: BlogPost[];
  locale?: 'fa' | 'en';
}

export default function LatestBlogPost({ posts = [], locale = 'fa' }: LatestBlogPostProps) {
  const t = translations[locale];
  const isRTL = locale === 'fa';
  const postsArray = Array.isArray(posts) ? posts : [];

  if (postsArray.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <p className="text-gray-500">{t.noPosts}</p>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US');
  };

  // ✅ اصلاح تابع تصویر (بدون نیاز به Django)
  const getFullImageUrl = (imagePath: string) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/')) return imagePath;
    return `/${imagePath}`;
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24" id='blogs' dir={isRTL ? 'rtl' : 'ltr'}>
      <ScrollReveal from={{ opacity: 0, y: -30 }} to={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faNewspaper} className="text-3xl" />
          <span>{t.title}</span>
        </h2>
      </ScrollReveal>

      <div className="max-w-6xl mx-auto space-y-8">
        {postsArray.map((post, index) => (
          <ScrollReveal
            key={post.id}
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-400" />
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 transition-all hover:shadow-2xl hover:-translate-y-1 duration-300 flex flex-col md:flex-row">
                <div className="relative h-56 md:h-auto md:w-1/3 overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img
                    src={getFullImageUrl(post.image)}
                    alt={locale === 'en' ? post.en_title : post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow md:w-2/3 bg-white dark:bg-gray-900">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCalendarAlt} className="w-4" />
                      {formatDate(post.publish_date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faUser} className="w-4" />
                      {locale === 'en' ? post.en_author : post.author}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    {locale === 'en' ? post.en_title : post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                    {locale === 'en' ? post.en_excerpt : post.excerpt}
                  </p>
                  <Link
                    href={`/${locale}/${post.slug}`}
                    className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:gap-3 transition-all self-start group/link"
                  >
                    <span>{t.readMore}</span>
                    <FontAwesomeIcon 
                      icon={t.arrowIcon} 
                      className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" 
                    />
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}