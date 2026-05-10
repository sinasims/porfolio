// components/JsonLd.tsx
import Script from "next/script";

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id="json-ld"  // id یکتا برای هر اسکریپت (اختیاری ولی خوب است)
      type="application/ld+json"
      strategy="beforeInteractive"  // کلید اصلی: این باعث می‌شود در head قرار گیرد
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}