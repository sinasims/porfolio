// app/admin/projects/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from './actions';

export default function CreateProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    const result = await createProject(formData);
    if (result.success) {
      router.push('/admin/projects');
    } else {
      setError(result.error || 'خطا در ایجاد پروژه');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto" style={{direction: "rtl"}}>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        ایجاد پروژه جدید
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
        {/* ردیف دو ستونی در دسکتاپ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">عنوان (فارسی) *</label>
            <input type="text" name="title" required className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">عنوان (انگلیسی)</label>
            <input type="text" name="en_title" className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">تکنولوژی‌ها (با کاما) *</label>
            <input type="text" name="tech_stack" required placeholder="React, Next.js, Tailwind" className="w-full px-4 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">ترتیب نمایش</label>
            <input type="number" name="order" defaultValue={0} className="w-full px-4 py-2 rounded-xl border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">توضیحات (فارسی) *</label>
          <textarea name="description" rows={4} required className="w-full px-4 py-2 rounded-xl border" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">توضیحات (انگلیسی)</label>
          <textarea name="en_description" rows={4} className="w-full px-4 py-2 rounded-xl border" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">تصویر شاخص *</label>
          <input type="file" name="image" accept="image/*" required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">لینک زنده</label>
            <input type="url" name="live_url" placeholder="https://..." className="w-full px-4 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">لینک گیت‌هاب</label>
            <input type="url" name="github_url" placeholder="https://github.com/..." className="w-full px-4 py-2 rounded-xl border" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_active" defaultChecked id="is_active" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <label htmlFor="is_active" className="text-sm font-medium">فعال باشد</label>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            انصراف
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition shadow-md"
          >
            {loading ? 'در حال ذخیره...' : 'ایجاد پروژه'}
          </button>
        </div>
      </form>
    </div>
  );
}