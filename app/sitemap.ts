import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sinarahmani.ir/fa',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://sinarahmani.ir/en',
        },
      },
    },
    {
      url: 'https://sinarahmani.ir/en',
      lastModified: new Date(),
      alternates: {
        languages: {
          fa: 'https://sinarahmani.ir/fa',
        },
      },
    },
    // آدرس پروژه‌ها و مقالات را هم می‌توانید به صورت داینامیک اضافه کنید
  ];
}