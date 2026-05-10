// app/admin/blog/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { createBlogPost } from './actions';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="h-64 w-full border rounded animate-pulse bg-gray-100 dark:bg-gray-800" />
});

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [content, setContent] = useState('');
  const [enContent, setEnContent] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    formData.append('content', content);
    formData.append('en_content', enContent);
    const result = await createBlogPost(formData);
    if (result.success) {
      router.push('/admin/blog');
    } else {
      setError(result.error || 'خطا در ایجاد پست');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        ایجاد پست جدید وبلاگ
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">عنوان (فارسی) *</label>
            <input type="text" name="title" required className="w-full px-4 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">عنوان (انگلیسی)</label>
            <input type="text" name="en_title" className="w-full px-4 py-2 rounded-xl border" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">نامک (slug) *</label>
            <input type="text" name="slug" required className="w-full px-4 py-2 rounded-xl border" placeholder="my-post-slug" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">نویسنده (فارسی)</label>
            <input type="text" name="author" defaultValue="سینا رحمانی" className="w-full px-4 py-2 rounded-xl border" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">نویسنده (انگلیسی)</label>
            <input type="text" name="en_author" className="w-full px-4 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">تاریخ انتشار</label>
            <input type="datetime-local" name="publish_date" className="w-full px-4 py-2 rounded-xl border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">خلاصه (فارسی) *</label>
          <textarea name="excerpt" rows={3} required className="w-full px-4 py-2 rounded-xl border" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">خلاصه (انگلیسی)</label>
          <textarea name="en_excerpt" rows={3} className="w-full px-4 py-2 rounded-xl border" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">محتوای فارسی (CKEditor)</label>
          
          <RichTextEditor value={content} onChange={setContent} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">محتوای انگلیسی</label>
          <RichTextEditor value={enContent} onChange={setEnContent} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">تصویر شاخص *</label>
          <input type="file" name="image" accept="image/*" required className="w-full text-sm" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_published" defaultChecked id="is_published" className="w-5 h-5" />
          <label htmlFor="is_published" className="text-sm font-medium">منتشر شود</label>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-xl border">انصراف</button>
          <button type="submit" disabled={loading} className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
            {loading ? 'در حال ذخیره...' : 'ایجاد پست'}
          </button>
        </div>
      </form>
    </div>
  );
}