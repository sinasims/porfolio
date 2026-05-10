// components/ClientTopLoader.tsx
'use client';
import NextTopLoader from 'nextjs-toploader';

export default function ClientTopLoader() {
  return (
    <NextTopLoader
      color="#FF0000"        // رنگ قرمز
      height={3}             // ضخامت 3 پیکسل
      showSpinner={false}    // بدون چرخانه بارگذاری
      shadow="0 0 10px #FF0000, 0 0 5px #FF0000"  // افکت درخشان
      speed={200}            // سرعت محو شدن
      crawlSpeed={200}       // سرعت حرکت نوار
      initialPosition={0.08} // نقطه شروع
      crawl={true}           // حرکت مارپیچی
      easing="ease"          // نرم‌افزاری
    />
  );
}