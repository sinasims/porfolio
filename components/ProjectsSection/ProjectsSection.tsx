'use client';

import React from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faCode, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ScrollReveal from "@/components/ScrollRevealProps";

type Project = {
  id: number;
  title: string;
  en_title: string;
  description: string;
  en_description: string;
  image: string;
  tech_stack: string;
  live_url?: string | null;
  github_url?: string | null;
  created_at: string;
  order: number;
  is_active: boolean;
};

// آبجکت ترجمه
const translations = {
  fa: {
    title: "نمونه کارها",
    noProjects: "هیچ پروژه‌ای یافت نشد.",
    viewProject: "مشاهده پروژه",
    viewSite: "مشاهده سایت",
    viewCode: "مخزن کد",
    arrowIcon: faArrowLeft,
  },
  en: {
    title: "Portfolio",
    noProjects: "No projects found.",
    viewProject: "View Project",
    viewSite: "View Site",
    viewCode: "Source Code",
    arrowIcon: faArrowRight,
  },
};

interface ProjectsSectionProps {
  projects?: Project[];
  locale?: 'fa' | 'en';
}

export default function ProjectsSection({ projects = [], locale = 'fa' }: ProjectsSectionProps) {
  const t = translations[locale];
  const isRTL = locale === 'fa';
  const projectsArray = Array.isArray(projects) ? projects : [];

  if (projectsArray.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <p className="text-gray-500">{t.noProjects}</p>
      </div>
    );
  }

  const getTechArray = (techStackStr: string): string[] => {
    if (!techStackStr) return [];
    return techStackStr.split(',').map(tech => tech.trim()).filter(Boolean);
  };

  const getFullImageUrl = (imagePath: string) => {
      if (!imagePath) return '';
      if (imagePath.startsWith('http')) return imagePath;
      if (imagePath.startsWith('/')) return imagePath;
      return `/${imagePath}`; // فرض بر این است که تصاویر در پوشه public/ قرار دارند
  };

  return (
    <div id='projects' className="container mx-auto px-4 py-16 md:py-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <ScrollReveal from={{ opacity: 0, y: -30 }} to={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-indigo-600 dark:text-indigo-400 flex items-center justify-center gap-2">
          <FontAwesomeIcon icon={faCode} className="text-3xl" />
          <span>{t.title}</span>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsArray.map((project, index) => {
          const techArray = getTechArray(project.tech_stack);
          const imageUrl = getFullImageUrl(project.image);
          return (
            <ScrollReveal
              key={project.id}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative group h-full">
                {/* Gradient Border Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-400" />
                
                {/* Main Card */}
                <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 transition-all hover:shadow-2xl hover:-translate-y-2 duration-300 flex flex-col h-full">
                  <div className="relative h-56 w-full overflow-hidden group/image">
                    <img
                      src={imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition" title={t.viewSite}>
                          <FontAwesomeIcon icon={faLink} className="w-5 h-5" />
                        </a>
                      )}
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 p-2 rounded-full hover:bg-indigo-600 hover:text-white transition" title={t.viewCode}>
                          <FontAwesomeIcon icon={faCode} className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{locale === 'en' ? project.en_title : project.title }</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow">{locale === 'en' ? project.en_description : project.description }</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {techArray.map((tech) => (
                        <span key={tech} className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 text-xs px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.live_url || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium text-sm hover:gap-2 transition-all group/link"
                    >
                      <span>{t.viewProject}</span>
                      <FontAwesomeIcon 
                        icon={t.arrowIcon} 
                        className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" 
                      />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}