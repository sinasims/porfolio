// app/admin/blog/edit/[id]/actions.ts
'use server';

import { getDb } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

export async function updateBlogPost(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const id = formData.get('id') as string;
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
    if (!publish_date) publish_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const is_published = formData.get('is_published') === 'on';

    const db = await getDb();
    let imageDbPath: string | undefined;

    const newImage = formData.get('image') as File;
    if (newImage && newImage.size > 0) {
      // حذف تصویر قدیمی
      const [rows] = await db.query('SELECT image FROM blog_posts WHERE id = ?', [id]) as any[];
      const oldImage = rows[0]?.image;
      if (oldImage) {
        try {
          await fs.unlink(path.join(process.cwd(), 'public', oldImage));
        } catch (err) {}
      }

      // ذخیره تصویر جدید
      const uploadDir = path.join(process.cwd(), 'public', 'blog');
      await fs.mkdir(uploadDir, { recursive: true });
      const ext = path.extname(newImage.name);
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
      const buffer = Buffer.from(await newImage.arrayBuffer());
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      imageDbPath = `blog/${filename}`;
    }

    if (imageDbPath) {
      await db.query(
        `UPDATE blog_posts SET 
          title=?, en_title=?, slug=?, excerpt=?, en_excerpt=?, content=?, en_content=?,
          author=?, en_author=?, publish_date=?, is_published=?, image=?
        WHERE id=?`,
        [title, en_title || null, slug, excerpt, en_excerpt || null, content, en_content || null,
         author, en_author || null, publish_date, is_published ? 1 : 0, imageDbPath, id]
      );
    } else {
      await db.query(
        `UPDATE blog_posts SET 
          title=?, en_title=?, slug=?, excerpt=?, en_excerpt=?, content=?, en_content=?,
          author=?, en_author=?, publish_date=?, is_published=?
        WHERE id=?`,
        [title, en_title || null, slug, excerpt, en_excerpt || null, content, en_content || null,
         author, en_author || null, publish_date, is_published ? 1 : 0, id]
      );
    }

    return { success: true };
  } catch (error: any) {
    console.error(error);
    return { success: false, error: error.message || 'خطا در به‌روزرسانی پست' };
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