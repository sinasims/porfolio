"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

type Props = {
  nav: any;
  locale: string;
  onLinkClick: () => void; 
}

export default function NavMobile({ nav, locale, onLinkClick }: Props) {
  const router = useRouter();
  const OFFSET = 40;
  const links = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}#about`, label: nav.about },
    { href: `/${locale}#resume`, label: nav.resume },
    { href: `/${locale}#projects`, label: nav.portfolio },
    { href: `/${locale}#blogs`, label: nav.blog },
    { href: `/${locale}#contact`, label: nav.contact },
  ];
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();               // جلوگیری از رفتار پیش‌فرض لینک
    onLinkClick();                    // بستن منو

    const hash = href.split("#")[1];  // استخراج id (مثلاً about)
    if (!hash) {
      // اگر لینک به صفحه دیگری مثل blogs بود، بدون اسکرول هدایت کن
      router.push(href);
      return;
    }

    const targetElement = document.getElementById(hash);
    if (!targetElement) {
      // اگر المنت وجود نداشت، فقط هدایت کن
      router.push(href);
      return;
    }

    // اسکرول نرم به مختصات هدف منهای آفست
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: elementPosition - OFFSET,
      behavior: "smooth",
    });

    // به‌روزرسانی هش در URL بدون ایجاد حرکت مجدد
    window.history.pushState(null, "", href);
  };
  const linkClass = "block relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current after:transition-all after:duration-300 hover:after:w-full pb-2";

  return (
    <nav className="shadow-lg z-50 transition-all duration-300 relative mt-8 px-4">
      <ul className="flex flex-col gap-6">
        {links.map((link, idx) => (
          <li key={idx}>
            <Link href={link.href} className={linkClass} onClick={(e) => handleSmoothScroll(e, link.href)}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}