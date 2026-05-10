// app/admin/projects/create/actions.ts
'use server';

import fs from 'fs/promises';
import path from 'path';
import { getDb } from '@/lib/db';
import { redirect } from 'next/navigation';

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string;
  const en_title = formData.get('en_title') as string;
  const description = formData.get('description') as string;
  const en_description = formData.get('en_description') as string;
  const tech_stack = formData.get('tech_stack') as string;
  const live_url = formData.get('live_url') as string || null;
  const github_url = formData.get('github_url') as string || null;
  const order = parseInt(formData.get('order') as string) || 0;
  const is_active = formData.get('is_active') === 'on';

  // آپلود تصویر
  const imageFile = formData.get('image') as File;
  if (!imageFile || imageFile.size === 0) {
    return { success: false, error: 'تصویر الزامی است' };
  }

  // بررسی پوشه public/projects
  const publicDir = path.join(process.cwd(), 'public', 'projects');
  await fs.mkdir(publicDir, { recursive: true });

  // ایجاد نام یکتا برای فایل
  const ext = path.extname(imageFile.name);
  const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
  const filePath = path.join(publicDir, filename);
  const buffer = Buffer.from(await imageFile.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  const imageDbPath = `projects/${filename}`;

  // ذخیره در دیتابیس
  const db = await getDb();
  await db.query(
    `INSERT INTO projects 
      (title, en_title, description, en_description, image, tech_stack, live_url, github_url, \`order\`, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [title, en_title || null, description, en_description || null, imageDbPath, tech_stack, live_url, github_url, order, is_active ? 1 : 0]
  );

  redirect('/admin/projects');
}