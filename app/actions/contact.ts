'use server';

import { getDb } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// --------------------------------------------
//  توابع ارسال پیام به سرویس‌های خارجی
// --------------------------------------------

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

    // اعتبارسنجی ساده
    if (!name || !email || !messageBody) {
        return { success: false, message: 'لطفاً نام، ایمیل و پیام را وارد کنید.' };
    }
    if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(email)) {
        return { success: false, message: 'ایمیل وارد شده معتبر نیست.' };
    }

    try {
        const db = await getDb();
        // ذخیره در دیتابیس
        await db.query(
            `INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`,
            [name, email, phone, subject, messageBody]
        );

        // ساخت پیام متنی برای ارسال به سرویس‌ها
        const notificationText = `
📝 پیام جدید از فرم تماس
👤 نام: ${name}
📧 ایمیل: ${email}
📱 تلفن: ${phone || '—'}
📌 موضوع: ${subject || '—'}
💬 متن:
${messageBody}
        `.trim();

        // ارسال همزمان به تلگرام و بله (در پس‌زمینه و بدون blocking کامل)
        // از Promise.allSettled استفاده می‌کنیم تا خطای یکی دیگری را متوقف نکند
        const results = await Promise.allSettled([
            sendToTelegram(notificationText),
            sendToBale(notificationText),
        ]);

        const telegramOk = results[0].status === 'fulfilled' && results[0].value;
        const baleOk = results[1].status === 'fulfilled' && results[1].value;

        if (!telegramOk || !baleOk) {
            console.warn('⚠️ یکی از پیام‌رسان‌ها خطا داشت.', { telegramOk, baleOk });
        }

        return { success: true, message: 'پیام شما با موفقیت ارسال شد.' };
    } catch (error) {
        console.error('خطا در ذخیره پیام تماس:', error);
        return { success: false, message: 'خطای داخلی سرور. لطفاً مجدد تلاش کنید.' };
    }
}