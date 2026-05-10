import Nav from "@/components/Header/Nav";
import Header from "@/components/Header/Header";
import { getMessages } from "@/lib/getMessages";
import { motion } from "framer-motion";
import ScrollLinkedAnimation from "@/components/ScrollLinkedAnimation";
import ScrollReveal from "@/components/ScrollRevealProps";
import AboutSection from "@/components/About/AboutSection";
import ResumeSection from "@/components/Resume/ResumeSection";
import StatsSection from "@/components/StatsSection/StatsSection";
import ProjectsSection from "@/components/ProjectsSection/ProjectsSection";

import LatestBlogPost, {BlogPost} from "@/components/LatestBlogPost/LatestBlogPost";
import ContactForm from "@/components/Contact/ContactForm";
import Footer from "@/components/Footer/Footer";
import { Metadata } from 'next';
import faSchema from '@/messages/jsonld/fa.json';
import enSchema from '@/messages/jsonld/en.json';
import { getDb } from "@/lib/db";

type Project = {
  id: number;
  title: string;
  en_title: string;          // حتماً string باشد
  description: string;
  en_description: string;    // حتماً string باشد
  image: string;
  tech_stack: string;
  live_url: string | null;
  github_url: string | null;
  created_at: string;
  order: number;
  is_active: boolean;
};

// ✅ اصلاح تابع getPersonSchema
const getPersonSchema = (locale: string) => {
  if (locale === 'en') {
    return enSchema;
  }
  return faSchema;
};

// اضافه کردن generateMetadata برای تزریق JSON-LD به head
// اضافه کردن generateMetadata برای تزریق JSON-LD و متادیتای اصلی
export async function generateMetadata({ params }: { params: Promise<{ locale: "en" | "fa" }> }) {
  const { locale } = await params;
  const schema = getPersonSchema(locale);

  // عنوان و توضیحات پیش‌فرض برای هر زبان
  const titles = {
    fa: "سینا رحمانی | توسعه‌دهنده فول استک و طراح سایت",
    en: "Sina Rahmani | Full-Stack Developer & Web Designer",
  };
  const descriptions = {
    fa: "سینا رحمانی، توسعه‌دهنده فول استک با ۲۰ سال تجربه در React، Next.js، Django، Python، C# و PHP. طراح سایت و نوازنده پیانو.",
    en: "Sina Rahmani, Full-Stack Developer with 20 years of experience in React, Next.js, Django, Python, C#, and PHP. Web designer and pianist.",
  };

  // ساخت آدرس کامل صفحه (برای canonical و hreflang)
  const baseUrl = "https://sinarahmani.ir";
  const pageUrl = `${baseUrl}/${locale}`;

  return {
    title: titles[locale],
    description: descriptions[locale],
    alternates: {
      canonical: pageUrl,
      languages: {
        'fa': `${baseUrl}/fa`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/fa`, // زبان پیش‌فرض فارسی
      },
    },
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: pageUrl,
      siteName: "Sina Rahmani Portfolio",
      locale: locale === 'fa' ? 'fa_IR' : 'en_US',
      type: "website",
    },
    other: {
      'application/ld+json': JSON.stringify(schema),
    },
  } as Metadata;
}
export default async function Page({params, }: { params: Promise<{ locale: "en" | "fa" }>;}) {


  // api

  // const res = await fetch('http://127.0.0.1:8000/api/blog-posts/?limit=3&page=1');
  // const blogPosts = await res.json();
  // const latestPost = blogPosts[0] || null;



  const { locale } = await params;
  const messages = await getMessages(locale);
  let projects: Project[] = [];
  try {
    const db = await getDb();
    const [rows] = await db.query(`
      SELECT 
        id, title, en_title, description, en_description,
        image, tech_stack, live_url, github_url, created_at,
        \`order\`, is_active
      FROM projects 
      WHERE is_active = 1 
      ORDER BY \`order\` ASC, created_at DESC
    `) as [any[], any];

    // تبدیل مقادیر null به رشته خالی برای فیلدهای مورد نیاز
    projects = rows.map((row: any) => ({
      ...row,
      en_title: row.en_title ?? '',          // اگر null بود → '' 
      en_description: row.en_description ?? '',
      is_active: row.is_active === 1,
    })) as Project[];

  } catch (error) {
    console.error('❌ خطا در دریافت پروژه‌ها:', error);
    projects = [];
  }

  
  let blogPosts: BlogPost[] = [];
  try {
    const db = await getDb();
    const [rows] = await db.query(`
      SELECT 
        id, title, en_title, excerpt, en_excerpt, 
        image, author, en_author, publish_date, slug
      FROM blog_posts 
      WHERE is_published = 1 
      ORDER BY publish_date DESC 
      LIMIT 3
    `) as [any[], any];

    blogPosts = rows.map((row: any) => ({
      id: row.id,
      title: row.title,
      en_title: row.en_title ?? '',
      excerpt: row.excerpt,
      en_excerpt: row.en_excerpt ?? '',
      image: row.image,
      author: row.author,
      en_author: row.en_author ?? '',
      publish_date: row.publish_date,
      slug: row.slug,
    })) as BlogPost[];
  } catch (error) {
    console.error('❌ خطا در دریافت بلاگ پست‌ها:', error);
    blogPosts = [];
  }

  // بررسی وجود Header
  const headerMessages = messages?.Header;
  if (!headerMessages) {
    console.error("Header messages missing for locale:", locale, messages);
    return <div>متاسفانه خطایی در بارگذاری اطلاعات هدر رخ داده است.</div>;
  }

  return (
    <>
      <main>
        <Header messages={messages} locale={locale} />
        <AboutSection locale={locale} />
        <ResumeSection locale={locale} />
        <StatsSection locale={locale} />
        <ProjectsSection locale={locale} projects={projects}/>
        <LatestBlogPost locale={locale} posts={blogPosts}/>
        <ContactForm locale={locale} />
        <Footer locale={locale} />
      </main>
    </>
  )
}
