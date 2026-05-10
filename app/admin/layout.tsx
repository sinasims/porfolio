// app/admin/layout.tsx
import { logout } from './login/action';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className="dark">
      <body className={`font-vazirMatn dark:bg-gray-900 bg-white dark:text-gray-100 text-gray-900 transition-colors duration-300`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">پنل مدیریت</h1>
            <form action={logout}>
            <button
                type="submit"
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
                خروج
            </button>
            </form>
        </nav>
        <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}