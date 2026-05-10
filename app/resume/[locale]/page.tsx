import { Metadata } from "next";

// متادیتای صفحه (به انگلیسی)
export const metadata: Metadata = {
  title: "Sina Rahmani | Full-Stack Developer Resume",
  description: "Professional resume of Sina Rahmani, Full-Stack Developer with 20+ years of experience.",
};

export default async function ResumePage({
  params,
}: {
  params: Promise<{ locale: "en" | "fa" }>;
}) {
  const { locale } = await params;
  const isEnglish = locale === "en";
  const font = locale === 'en' ? 'font-monument' : 'font-titr'

  // اطلاعات رزومه – می‌توانید از API یا فایل جداگانه دریافت کنید
  const resumeData = {
    name: isEnglish
    ? 'Sina Rahmani'
    : 'سینا رحمانی',
    title: isEnglish
    ? 'Full-Stack Developer & Web Designer'
    : 'توسعه دهنده فول استک و طراح وب سایت',
    contact: {
      phone: isEnglish
        ? '+98 911 151 7705'
        : '+۹۸ ۹۱۱ ۱۵۱ ۷۷۰۵',
      email: "sina.rahmanii@gmail.com",
      website: "sinarahmani.ir",
      location: isEnglish
        ? 'Sari, Iran'
        : 'ساری، ایران',
    },
    summary: isEnglish
      ? "Passionate Full-Stack Developer with over 20 years of experience in building scalable web applications. Skilled in both frontend (React, Next.js) and backend (Django, Python, C#). Strong focus on clean code, performance, and user experience."
      : "توسعه‌دهنده فول استک با بیش از ۲۰ سال تجربه در ساخت اپلیکیشن‌های وب مقیاس‌پذیر. مسلط به فرانت‌اند (React، Next.js) و بک‌اند (Django، Python، C#). تمرکز قوی بر کدنویسی تمیز، کارایی و تجربه کاربری.",
    skills: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3"],
      backend: ["Python/Django", "C#", "PHP", "RESTful API"],
      tools: ["Git", "VS Code"],
    },
    experience: [
      {
        title: isEnglish
          ? 'Senior Full-Stack Developer'
          : 'توسعه‌دهنده ارشد فول‌استک',
        company: isEnglish
          ? 'Freelance / Self-employed'
          : 'فریلنسر / خوداشتغال',
        period: isEnglish
          ? '2015 – Present'
          : '۱۳۹۴ - تاکنون',
        achievements: isEnglish
          ? ["Developed 30+ web apps for clients worldwide", "Improved SEO and performance scores by 40%", "Migrated legacy systems to modern stacks"]
          : ["توسعه بیش از ۳۰ اپلیکیشن وب برای مشتریان جهانی", "بهبود امتیاز سئو و عملکرد تا ۴۰٪", "مهاجرت سیستم‌های قدیمی به استک‌های مدرن"],
      },
      {
        title: isEnglish
          ? 'Lead Developer'
          : 'توسعه‌دهنده ارشد',
        company: isEnglish
          ? 'Safir Co'
          : 'شرکت سفیر',
        period: isEnglish
          ? '2010 – 2015'
          : '۱۳۸۹ - ۱۳۹۴',
        achievements: isEnglish
          ? ["Led team of 5 developers on enterprise projects", "Implemented CI/CD pipeline reducing deployment time by 50%", "Mentored junior developers"]
          : ["رهبری تیم ۵ نفره در پروژه‌های سازمانی", "پیاده‌سازی خط لوله CI/CD و کاهش ۵۰٪ زمان استقرار", "منتورینگ توسعه‌دهندگان تازه‌کار"],
      },
    ],
    education: {
      bachelor: {
        degree: isEnglish ? "B.Sc. in Computer Engineering" : "کارشناسی مهندسی کامپیوتر",
        university: isEnglish ? "Iran University of Science and Technology" : "دانشگاه علم و صنعت ایران",
        year: "2011",
      },
    },
    certificates: [
      "Building Web Applications in PHP (Coursera)",
      "HTML, CSS, and Javascript for Web Developers (Coursera)",
    ],
    languages: isEnglish
      ? [{ name: "Persian", level: "Native" }, { name: "English", level: "Work skills" }]
      : [{ name: "فارسی", level: "زبان مادری" }, { name: "انگلیسی", level: "مهارت کاری" }],
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white shadow-xl rounded-2xl print:shadow-none print:my-0">
      {/* هدر با نام و عنوان */}
      <div className="text-center border-b pb-6 mb-6">
        <h1 className={`${font} text-4xl font-extrabold text-gray-900${locale === 'fa' ? ' mb-4' : ''}`}>{resumeData.name}</h1>
        <p className="text-xl text-indigo-600 mt-2">{resumeData.title}</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-600"  style={{direction: 'ltr'}}>
          <span>📞 {resumeData.contact.phone}</span>
          <span>✉️ {resumeData.contact.email}</span>
          <span>🌐 {resumeData.contact.website}</span>
          <span>📍 {resumeData.contact.location}</span>
        </div>
      </div>

      {/* خلاصه */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3 mb-3">
          {isEnglish ? "Professional Summary" : "خلاصه حرفه‌ای"}
        </h2>
        <p className="text-gray-700 leading-relaxed">{resumeData.summary}</p>
      </section>

      {/* مهارت‌ها */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3 mb-3">
          {isEnglish ? "Technical Skills" : "مهارت‌های فنی"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold text-indigo-700">{locale === 'en' ? 'Frontend' : 'فرانت اند'}</h3>
            <ul className="list-disc list-inside text-gray-700 mt-1">
              {resumeData.skills.frontend.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-700">{locale === 'en' ? 'Backend' : 'بک اند'}</h3>
            <ul className="list-disc list-inside text-gray-700 mt-1">
              {resumeData.skills.backend.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-indigo-700">{locale === 'en' ? 'Tools & Others' : 'ابزارها'}</h3>
            <ul className="list-disc list-inside text-gray-700 mt-1">
              {resumeData.skills.tools.map((tool, idx) => (
                <li key={idx}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* سابقه کاری */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3 mb-3">
          {isEnglish ? "Work Experience" : "تجارب کاری"}
        </h2>
        {resumeData.experience.map((job, idx) => (
          <div key={idx} className="mb-6">
            <div className="flex flex-wrap justify-between items-baseline">
              <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
              <span className="text-sm text-gray-500">{job.period}</span>
            </div>
            <p className="text-indigo-600 font-medium">{job.company}</p>
            <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
              {job.achievements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      
      {/* تحصیلات */}
      <section className="mb-8 pt-8">
        <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3 mb-3">
          {isEnglish ? "Education" : "تحصیلات"}
        </h2>
        <div>
          <h3 className="text-lg font-semibold">{resumeData.education.bachelor.degree}</h3>
          <p className="text-gray-600">{resumeData.education.bachelor.university} – {resumeData.education.bachelor.year}</p>
        </div>
      </section>

      {/* گواهینامه‌ها */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3 mb-3">
          {isEnglish ? "Certifications" : "گواهینامه‌ها"}
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          {resumeData.certificates.map((cert, idx) => (
            <li key={idx}>{cert}</li>
          ))}
        </ul>
      </section>

      {/* زبان‌ها */}
      <section>
        <h2 className="text-2xl font-bold border-l-4 border-indigo-500 pl-3 mb-3">
          {isEnglish ? "Languages" : "زبان‌ها"}
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          {resumeData.languages.map((lang, idx) => (
            <li key={idx}>
              {lang.name} – {lang.level}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}