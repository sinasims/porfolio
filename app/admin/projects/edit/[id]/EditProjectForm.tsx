// app/admin/projects/edit/[id]/EditProjectForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateProject } from './actions';

export default function EditProjectForm({ project }: { project: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    formData.append('id', project.id.toString());
    const result = await updateProject(formData);
    if (result.success) {
      router.push('/admin/projects');
    } else {
      setError(result.error || 'خطا در به‌روزرسانی');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto" style={{direction: "rtl"}}>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        ویرایش پروژه
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
        {/* تصویر فعلی */}
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
          <label className="block text-sm font-medium mb-2">تصویر فعلی</label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              <img src={`/${project.image}`} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <span className="text-xs text-gray-500">برای تغییر تصویر جدید را انتخاب کنید</span>
          </div>
        </div>

        {/* فیلدها مشابه فرم ایجاد */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">عنوان (فارسی) *</label>
            <input type="text" name="title" defaultValue={project.title} required className="w-full px-4 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">عنوان (انگلیسی)</label>
            <input type="text" name="en_title" defaultValue={project.en_title || ''} className="w-full px-4 py-2 rounded-xl border" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">تکنولوژی‌ها (با کاما) *</label>
            <input type="text" name="tech_stack" defaultValue={project.tech_stack} required className="w-full px-4 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">ترتیب نمایش</label>
            <input type="number" name="order" defaultValue={project.order} className="w-full px-4 py-2 rounded-xl border" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">توضیحات (فارسی) *</label>
          <textarea name="description" rows={4} defaultValue={project.description} required className="w-full px-4 py-2 rounded-xl border" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">توضیحات (انگلیسی)</label>
          <textarea name="en_description" rows={4} defaultValue={project.en_description || ''} className="w-full px-4 py-2 rounded-xl border" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">تصویر جدید (اختیاری)</label>
          <input type="file" name="image" accept="image/*" className="w-full text-sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">لینک زنده</label>
            <input type="url" name="live_url" defaultValue={project.live_url || ''} className="w-full px-4 py-2 rounded-xl border" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">لینک گیت‌هاب</label>
            <input type="url" name="github_url" defaultValue={project.github_url || ''} className="w-full px-4 py-2 rounded-xl border" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="is_active" defaultChecked={project.is_active} id="is_active" className="w-5 h-5" />
          <label htmlFor="is_active" className="text-sm font-medium">فعال باشد</label>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => router.back()} className="px-6 py-2 rounded-xl border">انصراف</button>
          <button type="submit" disabled={loading} className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
            {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </button>
        </div>
      </form>
    </div>
  );
}