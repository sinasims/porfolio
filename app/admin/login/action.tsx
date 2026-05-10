// app/admin/login/actions.ts
'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const username = formData.get('username');
  const password = formData.get('password');

  const validUsername = process.env.ADMIN_USERNAME;
  const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (username === validUsername && password === validPasswordHash) {
    // تنظیم کوکی ساده (در production حتماً از روش امن‌تر مثل JWT یا session استفاده کنید)
    (await cookies()).set('admin_auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 روز
    });
    return { success: true };
  } else {
    return { success: false, error: 'نام کاربری یا رمز عبور اشتباه است' };
  }
}

export async function logout() {
  (await cookies()).delete('admin_auth');
  redirect('/admin/login');
}