// app/admin/blog/actions.ts
'use server';

import { getDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

export async function deleteBlogPost(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;

  const db = await getDb();
  
  // گرفتن مسیر تصویر برای حذف فایل فیزیکی
  const [rows] = await db.query('SELECT image FROM blog_posts WHERE id = ?', [id]) as any[];
  if (rows.length > 0) {
    const imagePath = path.join(process.cwd(), 'public', rows[0].image);
    try {
      await fs.unlink(imagePath);
    } catch (err) {
      console.error('خطا در حذف تصویر پست:', err);
    }
  }

  await db.query('DELETE FROM blog_posts WHERE id = ?', [id]);
  revalidatePath('/admin/blog');
  redirect('/admin/blog');
}

