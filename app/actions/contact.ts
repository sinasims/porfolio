'use server';

import { getDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

// --------------------------------------------
//  توابع ارسال پیام به سرویس‌های خارجی
// --------------------------------------------
async function checkRateLimit(ip: string, email: string): Promise<{ allowed: boolean; message?: string }> {
    const db = await getDb();
    const halfHourAgo = new Date(Date.now() - 30 * 60 * 1000);

    // شمارش تعداد پیام‌های نیم‌ساعت اخیر با این آی‌پی یا این ایمیل
    const [rows] = await db.query(
        `SELECT COUNT(*) as count FROM contact_rate_limit 
         WHERE (ip_address = ? OR email = ?) AND created_at > ?`,
        [ip, email, halfHourAgo]
    ) as any[];

    const count = rows[0].count;
    if (count >= 2) {
        return { allowed: false, message: 'شما بیش از حد مجاز پیام ارسال کرده‌اید. لطفاً نیم ساعت دیگر تلاش کنید.' };
    }
    return { allowed: true };
}

async function sendToTelegram(message: string): Promise<boolean> {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return false;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
            }),
        });
        const data = await response.json();
        return response.ok && data.ok;
    } catch (error) {
        console.error('خطا در ارسال به تلگرام:', error);
        return false;
    }
}

async function sendToBale(message: string): Promise<boolean> {
    const token = process.env.BALE_BOT_TOKEN;
    const chatId = process.env.BALE_CHAT_ID;
    if (!token || !chatId) return false;

    const url = `https://tapi.bale.ai/bot${token}/sendMessage`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
            }),
        });
        const data = await response.json();
        return response.ok && data.ok;
    } catch (error) {
        console.error('خطا در ارسال به بله:', error);
        return false;
    }
}

// --------------------------------------------
//  اکشن اصلی ذخیره فرم تماس + ارسال به سرویس‌ها
// --------------------------------------------
export async function submitContact(formData: FormData): Promise<{ success: boolean; message?: string }> {
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim() || null;
    const subject = formData.get('subject')?.toString().trim() || null;
    const messageBody = formData.get('message')?.toString().trim();

    // اعتبارسنجی معمول
    if (!name || !email || !messageBody) {
        return { success: false, message: 'لطفاً نام، ایمیل و پیام را وارد کنید.' };
    }
    if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) {
        return { success: false, message: 'ایمیل وارد شده معتبر نیست.' };
    }

    // گرفتن آی‌پی کاربر
    const headersList = await headers();
    let ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    if (ip.includes(',')) ip = ip.split(',')[0].trim();

    // بررسی محدودیت نیم ساعته
    const rateLimit = await checkRateLimit(ip, email);
    if (!rateLimit.allowed) {
        return { success: false, message: rateLimit.message };
    }

    try {
        const db = await getDb();
        // ذخیره در جدول اصلی
        await db.query(
            `INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`,
            [name, email, phone, subject, messageBody]
        );

        // ثبت در جدول rate limit برای محدودیت‌های بعدی
        await db.query(
            `INSERT INTO contact_rate_limit (ip_address, email) VALUES (?, ?)`,
            [ip, email]
        );

        // ساخت پیام برای ارسال به تلگرام و بله (همان کد قبلی)
        const notificationText = `
📝 <b>پیام جدید از فرم تماس</b>
👤 نام: ${name}
📧 ایمیل: ${email}
📱 تلفن: ${phone || '—'}
📌 موضوع: ${subject || '—'}
💬 متن:
${messageBody}
        `.trim();

        // ارسال همزمان به تلگرام و بله (تابع‌های کمکی sendToTelegram, sendToBale تعریف شوند)
        await Promise.allSettled([
            sendToTelegram(notificationText),
            sendToBale(notificationText)
        ]);

        return { success: true, message: 'پیام شما با موفقیت ارسال شد.' };
    } catch (error) {
        console.error('خطا در ذخیره پیام تماس:', error);
        return { success: false, message: 'خطای داخلی سرور. لطفاً مجدد تلاش کنید.' };
    }
}

