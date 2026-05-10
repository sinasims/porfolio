// proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // فقط مسیرهایی که با /admin شروع می‌شوند محافظت می‌کنیم
  if (pathname.startsWith('/admin')) {
    // استثنا برای صفحه لاگین
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // بررسی کوکی احراز هویت
    const authCookie = request.cookies.get('admin_auth');
    if (!authCookie || authCookie.value !== 'true') {
      // ریدایرکت به صفحه لاگین
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// 🔥 تغییر مهم: استثنا کردن تمام فایل‌های استاتیک (تصاویر، فونت، آیکون و ...)
export const config = {
  matcher: [
    /*
     * به جز موارد زیر روی همه مسیرها اجرا کن:
     * - _next/static (فایل‌های build شده Next.js)
     * - _next/image (بهینه‌سازی تصویر Next.js)
     * - favicon.ico (آیکون مرورگر)
     * - images (همه تصاویر داخل public/images)
     * - fonts (فونت‌های داخل public/fonts)
     * - icons (آیکون‌های داخل public/icons)
     * - svg (فایل‌های svg داخل public)
     */
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|fonts|icons|/admin/:path*|.*\\.svg).*)',
  ],
};