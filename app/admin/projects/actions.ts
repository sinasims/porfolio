// app/admin/projects/actions.ts
'use server';

import { getDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

export async function deleteProject(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;

  const db = await getDb();
  
  // ابتدا مسیر تصویر را بگیریم تا فایل فیزیکی هم حذف شود
  const [rows] = await db.query('SELECT image FROM projects WHERE id = ?', [id]) as any[];
  if (rows.length > 0) {
    const imagePath = path.join(process.cwd(), 'public', rows[0].image);
    try {
      await fs.unlink(imagePath);
    } catch (err) {
      console.error('خطا در حذف فایل تصویر:', err);
    }
  }

  await db.query('DELETE FROM projects WHERE id = ?', [id]);
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}