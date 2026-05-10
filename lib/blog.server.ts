// lib/blog.server.ts
import { getDb } from './db';
import { RowDataPacket } from 'mysql2/promise';

interface BlogPostRow extends RowDataPacket {
  id: number;
  title: string;
  en_title: string | null;
  slug: string;
  excerpt: string;
  en_excerpt: string | null;
  content: string;
  en_content: string | null;
  image: string;
  author: string;
  en_author: string | null;
  publish_date: string;
  updated_at: string;
  is_published: number;
}

export async function getBlogPostBySlug(slug: string, locale: 'fa' | 'en') {
  const db = await getDb();
  const [rows] = await db.query<BlogPostRow[]>(
    `SELECT 
      id, title, en_title, slug, excerpt, en_excerpt,
      content, en_content, image, author, en_author,
      publish_date, updated_at, is_published
    FROM blog_posts 
    WHERE slug = ? AND is_published = 1`,
    [slug]
  );

  if (rows.length === 0) return null;

  const post = rows[0];
  const isFa = locale === 'fa';

  // برگرداندن فیلدهای محلی‌شده
  return {
    id: post.id,
    title: isFa ? post.title : (post.en_title || post.title),
    slug: post.slug,
    excerpt: isFa ? post.excerpt : (post.en_excerpt || post.excerpt),
    content: isFa ? post.content : (post.en_content || post.content),
    image: post.image,
    author: isFa ? post.author : (post.en_author || post.author),
    publish_date: post.publish_date,
    updated_at: post.updated_at,
  };
}