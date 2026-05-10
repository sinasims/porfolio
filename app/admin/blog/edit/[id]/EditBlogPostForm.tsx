// app/admin/blog/edit/[id]/EditBlogPostForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { updateBlogPost } from './actions';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-96 w-full border rounded animate-pulse bg-gray-100 dark:bg-gray-800" />,
});

export default function EditBlogPostForm({ post }: { post: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState(post.content || '');
  const [enContent, setEnContent] = useState(post.en_content || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    formData.append('id', post.id.toString());
    formData.append('content', content);
    formData.append('en_content', enContent);
    const result = await updateBlogPost(formData);
    if (result.success) {
      router.push('/admin/blog');
    } else {
      setError(result.error || 'خطا در به‌روزرسانی پست');
    }
    setLoading(false);
  };

  // تبدیل publish_date به فرمت مناسب برای input datetime-local
  const getFormattedDateTime = () => {
    if (!post.publish_date) return '';
    const date = new Date(post.publish_date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">ویرایش پست</h1>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">عنوان (فارسی) *</label>
            <input type="text" name="title" defaultValue={post.title} required className="w-full px-4 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">عنوان (انگلیسی)</label>
            <input type="text" name="en_title" defaultValue={post.en_title || ''} className="w-full px-4 py-2 rounded-xl border" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">نامک (slug) *</label>
            <input type="text" name="slug" defaultValue={post.slug} required className="w-full px-4 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">تاریخ انتشار</label>
            <input
              type="datetime-local"
              name="publish_date"
              defaultValue={getFormattedDateTime()}
              className="w-full px-4 py-2 rounded-xl border"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">خلاصه (فارسی) *</label>
          <textarea name="excerpt" rows={3} defaultValue={post.excerpt} required className="w-full px-4 py-2 rounded-xl border" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">خلاصه (انگلیسی)</label>
          <textarea name="en_excerpt" rows={3} defaultValue={post.en_excerpt || ''} className="w-full px-4 py-2 rounded-xl border" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">محتوای فارسی</label>
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">محتوای انگلیسی</label>
          <RichTextEditor value={enContent} onChange={setEnContent} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">نویسنده (فارسی)</label>
            <input type="text" name="author" defaultValue={post.author} className="w-full px-4 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">نویسنده (انگلیسی)</label>
            <input type="text" name="en_author" defaultValue={post.en_author || ''} className="w-full px-4 py-2 rounded-xl border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">تصویر فعلی</label>
          <img src={`/${post.image}`} alt={post.title} className="w-32 h-32 object-cover rounded mb-2" />
          <label className="block text-sm font-medium mb-2">تصویر جدید (اختیاری)</label>
          <input type="file" name="image" accept="image/*" className="w-full text-sm" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_published" defaultChecked={post.is_published} id="is_published" className="w-5 h-5" />
          <label htmlFor="is_published" className="text-sm font-medium">منتشر شود</label>
        </div>

        {error && <div className="bg-red-50 p-3 rounded-xl text-red-700 text-sm">{error}</div>}

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-xl border">انصراف</button>
          <button type="submit" disabled={loading} className="px-6 py-2 rounded-xl bg-indigo-600 text-white disabled:opacity-50">
            {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </button>
        </div>
      </form>
    </div>
  );
}