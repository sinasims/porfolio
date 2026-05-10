// app/admin/projects/edit/[id]/actions.ts
'use server';

import { getDb } from '@/lib/db';
import fs from 'fs/promises';
import path from 'path';

export async function updateProject(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const en_title = formData.get('en_title') as string;
  const description = formData.get('description') as string;
  const en_description = formData.get('en_description') as string;
  const tech_stack = formData.get('tech_stack') as string;
  const live_url = formData.get('live_url') as string || null;
  const github_url = formData.get('github_url') as string || null;
  const order = parseInt(formData.get('order') as string) || 0;
  const is_active = formData.get('is_active') === 'on';

  try {
    const db = await getDb();
    let imageDbPath: string | undefined;
    const newImage = formData.get('image') as File;

    if (newImage && newImage.size > 0) {
      // حذف تصویر قدیمی
      const [rows] = await db.query('SELECT image FROM projects WHERE id = ?', [id]) as any[];
      const oldImage = rows[0]?.image;
      if (oldImage) {
        try {
          await fs.unlink(path.join(process.cwd(), 'public', oldImage));
        } catch (err) {}
      }

      // ذخیره تصویر جدید
      const publicDir = path.join(process.cwd(), 'public', 'projects');
      await fs.mkdir(publicDir, { recursive: true });
      const ext = path.extname(newImage.name);
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
      const buffer = Buffer.from(await newImage.arrayBuffer());
      await fs.writeFile(path.join(publicDir, filename), buffer);
      imageDbPath = `projects/${filename}`;
    }

    if (imageDbPath) {
      await db.query(
        `UPDATE projects SET 
          title=?, en_title=?, description=?, en_description=?, image=?, 
          tech_stack=?, live_url=?, github_url=?, \`order\`=?, is_active=?
        WHERE id=?`,
        [title, en_title || null, description, en_description || null, imageDbPath,
         tech_stack, live_url, github_url, order, is_active ? 1 : 0, id]
      );
    } else {
      await db.query(
        `UPDATE projects SET 
          title=?, en_title=?, description=?, en_description=?, 
          tech_stack=?, live_url=?, github_url=?, \`order\`=?, is_active=?
        WHERE id=?`,
        [title, en_title || null, description, en_description || null,
         tech_stack, live_url, github_url, order, is_active ? 1 : 0, id]
      );
    }
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'خطا در به‌روزرسانی پروژه' };
  }
}