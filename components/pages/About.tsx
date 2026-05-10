"use client";

import React, { ReactNode } from "react";

type AboutProps = {
  data: {
    paragraphs: string[];
    links: Record<string, string>;
  };
};

/**
 * این تابع تگ‌های <tag> را به لینک تبدیل می‌کند.
 * خروجی آن آرایه‌ای از ReactNode است که هم رشته و هم Element را شامل می‌شود.
 */
function parseRichText(text: string, links: Record<string, string>): ReactNode {
  const output: ReactNode[] = [];
  let remaining = text;

  // رگکس برای پیدا کردن تگ‌هایی مثل <company>text</company>
  const tagRegex = /<([a-zA-Z0-9_-]+)>(.*?)<\/\1>/;

  let keyCounter = 0;

  while (remaining.length > 0) {
    const match = remaining.match(tagRegex);

    if (!match) {
      output.push(remaining);
      break;
    }

    const [fullMatch, tagName, content] = match;
    const startIndex = remaining.indexOf(fullMatch);

    // ۱. اضافه کردن متن قبل از تگ
    if (startIndex > 0) {
      output.push(remaining.slice(0, startIndex));
    }

    // ۲. تبدیل تگ به لینک (اگر در دیتای لینک‌ها موجود بود)
    const href = links[tagName];
    if (href) {
      output.push(
        <a
          key={`${tagName}-${keyCounter++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 dark:text-white dark:hover:text-slate-300 transition-color duration-200"
        >
          {content}
        </a>
      );
    } else {
      output.push(content);
    }

    // ۳. بریدن متن پردازش شده و ادامه حلقه
    remaining = remaining.slice(startIndex + fullMatch.length);
  }

  return output;
}

export default function About({ data }: AboutProps) {
  return (
    <section
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 "
      aria-label="About me"
    >
      {data.paragraphs.map((paragraph, index) => (
        <p key={index} className="mb-4 leading-relaxed dark:text-gray-400">
          {parseRichText(paragraph, data.links)}
        </p>
      ))}
    </section>
  );
}
