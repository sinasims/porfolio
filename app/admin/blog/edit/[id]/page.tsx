// app/admin/blog/edit/[id]/page.tsx
import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditBlogPostForm from './EditBlogPostForm';

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const [rows] = await db.query('SELECT * FROM blog_posts WHERE id = ?', [id]) as any[];
  
  if (rows.length === 0) notFound();
  
  const post = rows[0];
  post.is_published = post.is_published === 1;
  
  return <EditBlogPostForm post={post} />;
}