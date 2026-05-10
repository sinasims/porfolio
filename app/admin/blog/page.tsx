// app/admin/blog/page.tsx
import { getDb } from '@/lib/db';
import Link from 'next/link';
import DeleteBlogPostButton from '@/components/DeleteBlogPostButton';
import { notFound } from 'next/navigation';

export default async function AdminBlogPage() {
  const db = await getDb();
  const [rows] = await db.query(`
    SELECT id, title, en_title, slug, excerpt, image, author, publish_date, is_published, created_at
    FROM blog_posts
    ORDER BY publish_date DESC
  `) as any[];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* هدر و دکمه جدید */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          مدیریت پست‌های وبلاگ
        </h1>
        <Link
          href="/admin/blog/create"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          پست جدید
        </Link>
      </div>

      {/* نمای دسکتاپ: جدول */}
      <div className="hidden md:block bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">شناسه</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">عنوان</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">تصویر</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">نویسنده</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">تاریخ انتشار</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">وضعیت</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {rows.map((post: any) => (
                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="px-6 py-4 text-sm font-mono">#{post.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">slug: {post.slug}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={`/${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{post.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(post.publish_date)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                      post.is_published 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {post.is_published ? 'منتشر شده' : 'پیش‌نویس'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="text-yellow-600 hover:text-yellow-800 dark:text-yellow-400 dark:hover:text-yellow-300 transition p-1"
                        title="ویرایش"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <DeleteBlogPostButton postId={post.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* نمای موبایل: کارت‌ها */}
      <div className="md:hidden space-y-4">
        {rows.map((post: any) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex gap-4">
              <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img src={`/${post.image}`} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">slug: {post.slug}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    post.is_published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {post.is_published ? 'منتشر شده' : 'پیش‌نویس'}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <span>نویسنده: {post.author}</span>
                  <span>تاریخ: {formatDate(post.publish_date)}</span>
                </div>
                <div className="mt-3 flex justify-end gap-3">
                  <Link href={`/admin/blog/edit/${post.id}`} className="text-yellow-600 dark:text-yellow-400 p-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  <DeleteBlogPostButton postId={post.id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {rows.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          هیچ پستی ثبت نشده است. اولین پست را اضافه کنید.
        </div>
      )}
    </div>
  );
}