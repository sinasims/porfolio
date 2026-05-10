// components/ContactForm/ContactForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faComment, faPaperPlane, faShieldAlt, faExclamationTriangle, faCheckCircle, faPhone } from '@fortawesome/free-solid-svg-icons';
import ScrollReveal from '@/components/ScrollRevealProps';
import { submitContact } from '@/app/actions/contact';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const translations = {
  fa: {
    badge: "ارتباط با من",
    title: "در تماس باشید",
    subtitle: "سوال، پیشنهاد یا همکاری؟ خوشحال می‌شوم پیامتان را دریافت کنم.",
    nameLabel: "نام و نام خانوادگی",
    namePlaceholder: "علی رضایی",
    emailLabel: "ایمیل",
    emailPlaceholder: "example@domain.com",
    phoneLabel: "شماره تماس",
    phonePlaceholder: "0912 123 4567",
    subjectLabel: "موضوع",
    subjectPlaceholder: "همکاری، مشاوره، سوال...",
    messageLabel: "پیام شما",
    messagePlaceholder: "متن پیام خود را اینجا بنویسید...",
    captchaLabel: "تأیید امنیتی",
    captchaPlaceholder: "جواب",
    sendButton: "ارسال پیام",
    sending: "در حال ارسال...",
    successMessage: "پیام شما با موفقیت ارسال شد.",
    rateLimitMessage: "شما بیش از حد مجاز پیام ارسال کرده‌اید. لطفا ۱۰ دقیقه دیگر دوباره تلاش کنید.",
    errorMessage: "خطایی در ارسال پیام رخ داد: ",
    connectionError: "خطای ارتباط با سرور.",
    validation: {
      required: "لطفاً تمامی فیلدها را پر کنید.",
      invalidEmail: "ایمیل معتبر وارد کنید.",
      invalidCaptcha: "پاسخ سوال امنیتی نادرست است.",
    },
  },
  en: {
    badge: "Contact Me",
    title: "Get In Touch",
    subtitle: "Questions, suggestions, or collaboration? I'd be happy to hear from you.",
    nameLabel: "Full Name",
    namePlaceholder: "Ali Rezaei",
    emailLabel: "Email",
    emailPlaceholder: "example@domain.com",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+98 912 123 4567",
    subjectLabel: "Subject",
    subjectPlaceholder: "Collaboration, consultation, question...",
    messageLabel: "Your Message",
    messagePlaceholder: "Write your message here...",
    captchaLabel: "Security Check",
    captchaPlaceholder: "Answer",
    sendButton: "Send Message",
    sending: "Sending...",
    successMessage: "Your message has been sent successfully.",
    rateLimitMessage: "You have sent too many messages. Please try again in 10 minutes.",
    errorMessage: "An error occurred while sending: ",
    connectionError: "Connection error.",
    validation: {
      required: "Please fill in all fields.",
      invalidEmail: "Please enter a valid email.",
      invalidCaptcha: "Incorrect security answer.",
    },
  },
};

interface ContactFormProps {
  locale?: 'fa' | 'en';
}

const ContactForm = ({ locale = 'fa' }: ContactFormProps) => {
  const t = translations[locale];
  const isRTL = locale === 'fa';

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
  
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: 0 });
  const [userCaptcha, setUserCaptcha] = useState('');

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 10) + 1;
    const n2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1: n1, num2: n2, answer: n1 + n2 });
    setUserCaptcha('');
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', message: t.validation.required });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: t.validation.invalidEmail });
      return false;
    }
    if (parseInt(userCaptcha) !== captcha.answer) {
      setStatus({ type: 'error', message: t.validation.invalidCaptcha });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setStatus({ type: null, message: '' });
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      const result = await submitContact(formDataToSend);

      if (result.success) {
        setStatus({ type: 'success', message: t.successMessage });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        generateCaptcha();
      } else {
        let errorMsg = result.message || t.errorMessage;
        if (errorMsg.includes('بیش از حد مجاز') || errorMsg.includes('too many')) {
          setStatus({ type: 'error', message: t.rateLimitMessage });
        } else {
          setStatus({ type: 'error', message: errorMsg });
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus({ type: 'error', message: t.connectionError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen py-16 md:py-24 overflow-hidden" id='contact' dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal from={{ opacity: 0, y: -20 }} to={{ opacity: 1, y: 0 }}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm border border-white/30 dark:border-gray-700/50">
              <FontAwesomeIcon icon={faComment} className="text-indigo-500 dark:text-indigo-400 text-xl" />
              <span className="text-gray-700 dark:text-gray-200 font-medium tracking-wide">{t.badge}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              {t.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">
              {t.subtitle}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto">
          <ScrollReveal from={{ opacity: 0, y: 40 }} to={{ opacity: 1, y: 0 }}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-400" />
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-800/50 overflow-hidden">
                <div className="p-6 md:p-8 lg:p-10">
                  <form onSubmit={handleSubmit} className="space-y-7">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <FontAwesomeIcon icon={faUser} className="text-indigo-500 text-xs" />
                          <span>{t.nameLabel}</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                          placeholder={t.namePlaceholder}
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <FontAwesomeIcon icon={faEnvelope} className="text-indigo-500 text-xs" />
                          <span>{t.emailLabel}</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                          placeholder={t.emailPlaceholder}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <FontAwesomeIcon icon={faPhone} className="text-indigo-500 text-xs" />
                          <span>{t.phoneLabel}</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                          placeholder={t.phonePlaceholder}
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                          <FontAwesomeIcon icon={faComment} className="text-indigo-500 text-xs" />
                          <span>{t.subjectLabel}</span>
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200"
                          placeholder={t.subjectPlaceholder}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <FontAwesomeIcon icon={faPaperPlane} className="text-indigo-500 text-xs rotate-180" />
                        <span>{t.messageLabel}</span>
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all duration-200 resize-y"
                        placeholder={t.messagePlaceholder}
                        disabled={loading}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        <FontAwesomeIcon icon={faShieldAlt} className="text-indigo-500 text-xs" />
                        <span>{t.captchaLabel}</span>
                      </label>
                      <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                        <div className="flex-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-xl px-5 py-3 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-between gap-8">
                          <span className="text-indigo-700 dark:text-indigo-300 font-bold text-lg tracking-wider">
                            {captcha.num1} + {captcha.num2}
                          </span>
                          <span className="text-gray-400 text-sm">=</span>
                          <input
                            type="number"
                            value={userCaptcha}
                            onChange={(e) => setUserCaptcha(e.target.value)}
                            className="w-24 px-3 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 flex-1"
                            placeholder={t.captchaPlaceholder}
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </div>

                    {status.type && (
                      <div
                        className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all transform duration-300 ${
                          status.type === 'success'
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                            : 'bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                        }`}
                      >
                        <FontAwesomeIcon icon={status.type === 'success' ? faCheckCircle : faExclamationTriangle} />
                        <span>{status.message}</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="relative w-full group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 p-[1px] focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="contact-btn relative flex items-center justify-center gap-3 bg-gray-900 dark:bg-gray-950 rounded-xl py-3.5 px-4 transition-all duration-200 group-hover:bg-opacity-80">
                          {loading ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span className="text-white font-semibold">{t.sending}</span>
                            </div>
                          ) : (
                            <>
                              <span className="font-semibold tracking-wide">{t.sendButton}</span>
                              <FontAwesomeIcon icon={faPaperPlane} className="text-sm transition-transform group-hover:translate-x-1 rotate-180"/>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;