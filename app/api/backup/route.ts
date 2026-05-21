// app/api/backup/route.ts
import { NextResponse } from 'next/server';
import mysqldump from 'fan-mysqldump';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function GET() {
  let backupFile = '';

  try {
    // 1. تنظیمات مسیر فایل موقت (با os.tmpdir() برای کار روی تمام سیستم عامل‌ها)
    const tempDir = os.tmpdir();
    const fileName = `backup-${new Date().toISOString().replace(/[:.]/g, '-')}.sql`;
    backupFile = path.join(tempDir, fileName);

    // 2. گرفتن بک‌آپ مستقیم در فایل
    await mysqldump({
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      dumpToFile: backupFile,
    });

    // 3. خواندن فایل بک‌آپ برای ارسال به تلگرام
    const fileBuffer = fs.readFileSync(backupFile);

    // 4. ارسال فایل به عنوان سند (Document) در تلگرام
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('document', new Blob([fileBuffer]), fileName);

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('خطا در ارسال فایل به تلگرام');
    }

    // 5. پاکسازی فایل موقت
    fs.unlinkSync(backupFile);

    return NextResponse.json({ success: true, message: 'بک‌آپ با موفقیت ارسال شد' });

  } catch (error) {
    console.error('خطا در فرآیند بک‌آپ:', error);
    // پاکسازی فایل در صورت وجود
    if (backupFile && fs.existsSync(backupFile)) {
      try { fs.unlinkSync(backupFile); } catch(e) { /* خطای پاکسازی را نادیده بگیر */ }
    }
    return NextResponse.json({ success: false, message: 'خطا در گرفتن بک‌آپ' }, { status: 500 });
  }
}