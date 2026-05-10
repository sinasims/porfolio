import { MetadataRoute } from 'next'
import { getDb } from '@/lib/db'
import { RowDataPacket } from 'mysql2/promise'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://sinarahmani.ir' // آدرس سایت خود را جایگزین کنید
    const db = await getDb()

    // ۱. دریافت تاریخ آخرین آپدیت بلاگ‌ها (فقط پست‌های منتشر شده)
    const [blogResult] = await db.query<RowDataPacket[]>(
        `SELECT MAX(updated_at) as latest_blog_update FROM blog_posts WHERE is_published = TRUE`
    )
    const latestBlogUpdate = blogResult[0]?.latest_blog_update 
        ? new Date(blogResult[0].latest_blog_update).getTime() 
        : 0

    // ۲. دریافت تاریخ آخرین پروژه (فقط پروژه‌های فعال)
    const [projectResult] = await db.query<RowDataPacket[]>(
        `SELECT MAX(created_at) as latest_project_update FROM projects WHERE is_active = TRUE`
    )
    const latestProjectUpdate = projectResult[0]?.latest_project_update 
        ? new Date(projectResult[0].latest_project_update).getTime() 
        : 0

    // ۳. مقایسه و انتخاب جدیدترین تاریخ بین بلاگ‌ها و پروژه‌ها
    const latestSiteUpdateTimestamp = Math.max(latestBlogUpdate, latestProjectUpdate)
    // اگر سایت کاملا خالی بود، از تاریخ امروز استفاده کن
    const lastModifiedDate = latestSiteUpdateTimestamp > 0 
        ? new Date(latestSiteUpdateTimestamp) 
        : new Date()

    // ۴. دریافت لیست پست‌های بلاگ برای نقشه سایت
    const [posts] = await db.query<RowDataPacket[]>(
        `SELECT slug, updated_at FROM blog_posts WHERE is_published = TRUE ORDER BY updated_at DESC`
    )

    // ۵. ساخت نقشه سایت برای پست‌های بلاگ
    const blogUrls = posts.flatMap((post) => [
        {
            url: `${baseUrl}/fa/blog/${post.slug}`,
            lastModified: post.updated_at,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/en/blog/${post.slug}`,
            lastModified: post.updated_at,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ])

    // ۶. ساخت نقشه سایت برای صفحات استاتیک (صفحه اصلی) با تاریخ محاسبه شده
    const staticUrls = [
        {
            url: `${baseUrl}/fa`,
            lastModified: lastModifiedDate,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/en`,
            lastModified: lastModifiedDate,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
    ]

    return [...staticUrls, ...blogUrls]
}
