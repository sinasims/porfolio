import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      // همچنین اگر از localhost استفاده می‌کنید
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
    ],
    // اضافه کردن این گزینه برای اجازه دادن به IPهای خصوصی (فقط در توسعه)
    dangerouslyAllowSVG: true, // در صورت نیاز
    unoptimized: false,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // هر مقدار دلخواه، مثلاً '20mb'
    },
  },
};

export default nextConfig;

