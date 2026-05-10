// app/[locale]/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "@/lib/blog.server"; // تابع جدید
import { Metadata } from "next";
import ScrollReveal from "@/components/ScrollRevealProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faUser,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { getMessages } from "@/lib/getMessages";
import SmallHeader from "@/components/Header/SmallHeader";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import "./blog.css";

// تولید schema JSON-LD با آدرس محلی
const getBlogPostSchema = (post: any, locale: string, baseUrl: string) => {
  const fullImageUrl = post.image?.startsWith("http")
    ? post.image
    : `${baseUrl}/${post.image}`; // تغییر: حذف Django base URL

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": fullImageUrl,
    "datePublished": post.publish_date,
    "dateModified": post.updated_at || post.publish_date,
    "author": { "@type": "Person", "name": post.author },
    "url": `https://sinarahmani.ir/${locale}/${post.slug}`,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://sinarahmani.ir/${locale}/${post.slug}` },
    "inLanguage": locale === "fa" ? "fa-IR" : "en-US",
  };
};

export async function generateMetadata({ params }: { params: Promise<{ locale: "fa" | "en"; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);
  if (!post) {
    return { title: locale === "fa" ? "پست یافت نشد" : "Post Not Found" };
  }
  const baseUrl = "https://sinarahmani.ir";
  const blogSchema = getBlogPostSchema(post, locale, baseUrl);
  const pageUrl = `${baseUrl}/${locale}/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [`${baseUrl}/${post.image}`] : [],
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        fa: `${baseUrl}/fa/${slug}`,
        en: `${baseUrl}/en/${slug}`,
      },
    },
    other: { 'application/ld+json': JSON.stringify(blogSchema) },
  };
}

export async function generateStaticParams() {
  // در صورت نیاز می‌توانید تمام اسلاگ‌ها را از دیتابیس بگیرید و برگردانید
  return [];
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: "fa" | "en"; slug: string }> }) {
  const { locale, slug } = await params;
  const post = await getBlogPostBySlug(slug, locale);
  const isRTL = locale === "fa";
  const messages = await getMessages(locale);

  if (!post) notFound();

  // تصویر شاخص – الان مستقیماً از پوشه public سرو می‌شود
  const imageUrl = `/${post.image}`; // چون در دیتابیس مسیر نسبی مانند 'blog/filename.jpg' ذخیره شده

  return (
    <>
      <SmallHeader messages={messages} locale={locale} />
      <article dir={isRTL ? "rtl" : "ltr"} className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
        <div className="blog">
          <ScrollReveal from={{ opacity: 0, y: -20 }} to={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendarAlt} className="w-4" />
                  {new Date(post.publish_date).toLocaleDateString(locale === "fa" ? "fa-IR" : "en-US")}
                </span>
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="w-4" />
                  {post.author}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {post.image && (
            <ScrollReveal from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }}>
              <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl mb-12 group">
                <img src={imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal from={{ opacity: 0, y: 30 }} to={{ opacity: 1, y: 0 }}>
            {/* محتوا از CKEditor – دیگر نیازی به fixContentImages نیست چون آدرس تصاویر داخل ادیتور قبلاً نسبی هستند */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-loose
                prose-a:text-indigo-600 hover:prose-a:text-indigo-500
                prose-img:rounded-xl prose-img:shadow-lg
                prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                [&_figure]:my-8 [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-gray-500 mt-16 pt-16"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </ScrollReveal>

          <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <Link href={`/${locale}#blogs`} className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:gap-3 transition-all group">
              <span>{locale === "fa" ? "بازگشت به نوشته‌ها" : "Back to Posts"}</span>
              <FontAwesomeIcon icon={isRTL ? faArrowRight : faArrowLeft} className="w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </article>
      <Footer locale={locale} />
    </>
  );
}