// app/admin/projects/edit/[id]/page.tsx
import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import EditProjectForm from './EditProjectForm';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [id]) as any[];
  if (rows.length === 0) notFound();
  const project = rows[0];

  // تبدیل is_active از tinyint به boolean
  project.is_active = project.is_active === 1;

  return <EditProjectForm project={project} />;
}