// app/admin/blog/create/actions.ts
'use server';

import { getDb } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';
import { redirect } from 'next/navigation';

export async function createBlogPost(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const title = formData.get('title') as string;
    const en_title = formData.get('en_title') as string;
    const slug = formData.get('slug') as string;
    const excerpt = formData.get('excerpt') as string;
    const en_excerpt = formData.get('en_excerpt') as string;
    let content = formData.get('content') as string;
    let en_content = formData.get('en_content') as string;
    content = cleanHtml(content);
    en_content = cleanHtml(en_content);
    const author = formData.get('author') as string || 'سینا رحمانی';
    const en_author = formData.get('en_author') as string;
    let publish_date = formData.get('publish_date') as string;
    if (!publish_date) {
      publish_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }
    const is_published = formData.get('is_published') === 'on';
    const upload_token = crypto.randomUUID();

    // آپلود تصویر
    const imageFile = formData.get('image') as File;
    if (!imageFile || imageFile.size === 0) {
      return { success: false, error: 'تصویر الزامی است' };
    }
    const uploadDir = path.join(process.cwd(), 'public', 'blog');
    await fs.mkdir(uploadDir, { recursive: true });
    const ext = path.extname(imageFile.name);
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const filepath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await fs.writeFile(filepath, buffer);
    const imageDbPath = `blog/${filename}`;

    const db = await getDb();
    await db.query(
      `INSERT INTO blog_posts 
        (upload_token, title, en_title, slug, excerpt, en_excerpt, content, en_content, image, author, en_author, publish_date, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [upload_token, title, en_title || null, slug, excerpt, en_excerpt || null, content, en_content || null, imageDbPath, author, en_author || null, publish_date, is_published ? 1 : 0]
    );
    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || 'خطا در ایجاد پست' };
  }
}

function cleanHtml(html: string): string {
    if (!html) return '';
    // تبدیل &nbsp; به فضای معمولی
    let cleaned = html.replace(/&nbsp;/g, ' ');
    // حذف تگ‌های خالی مانند <h4></h4>
    cleaned = cleaned.replace(/<(\w+)(?:\s[^>]*)?>\s*<\/\1>/g, '');
    return cleaned;
}