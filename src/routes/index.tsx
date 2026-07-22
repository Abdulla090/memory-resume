/* eslint-disable react-refresh/only-export-components */
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { animate, motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { TrustedMarquee } from "../components/TrustedMarquee";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  FileText,
  Globe,
  LockKeyhole,
  Menu,
  Moon,
  Sparkles,
  Star,
  Sun,
  TrendingUp,
  Users,
  ArrowUpRight,
  X,
} from "lucide-react";
import { useDarkMode } from "@/hooks/use-dark-mode";
import React, { useEffect, useRef, useState } from "react";
import { LandingScrollMotion } from "@/components/landing/LandingScrollMotion";
import { HeroV2 } from "@/components/HeroV2";
import { useAppStore } from "@/lib/store";
import { useMobileOptimized } from "@/lib/performance";
import { useAuth } from "@/components/auth/AuthProvider";
import { landingCtaPath } from "@/lib/landing-cta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MemoryCV - Turn memory into a professional resume" },
      {
        name: "description",
        content: "Turn your professional memory into a clear, polished, role-ready resume.",
      },
    ],
  }),
  component: Landing,
});

export type Language = "en" | "ku" | "ar";
type NavItem = { label: string; to: "/" | "/templates"; hash?: string };

export const copy = {
  en: {
    dir: "ltr",
    lang: "en",
    toggle: "کوردی",
    menu: "Open menu",
    nav: [
      { label: "Features", to: "/", hash: "features" },
      { label: "Templates", to: "/templates" },
      { label: "FAQ", to: "/", hash: "faq" },
    ],
    navCta: "Get started",
    navSignIn: "Sign in",
    badge: "Memory to Resume Generation",
    badgeMobile: "AI · Free",
    heroTitle: "Turn your professional memory into a resume",
    heroTitleAccent: "ready for work.",
    heroBody:
      "MemoryCV gathers your experience, skills, and achievements, extracts a clean profile, tailors your resume for each role, and lets you download a polished document.",
    heroCta: "Get started",
    statsTitleA: "Build a resume that",
    statsTitleB: "actually works",
    statsCta: "Get started for free",
    stats: [
      { icon: Users, value: 150, suffix: "K+", label: "resumes generated", id: "stat-resumes" },
      {
        icon: TrendingUp,
        value: 85,
        suffix: "%",
        label: "higher interview rate",
        id: "stat-interviews",
      },
      { icon: Star, value: 49, suffix: "/5.0", label: "average user rating", id: "stat-rating" },
    ],
    bentoBadge: "AI-powered guidance",
    bentoTitleA: "A resume that moves your name",
    bentoTitleB: "to the top of the shortlist.",
    bentoBody:
      "In minutes, MemoryCV organizes your information, surfaces your strongest proof, and adapts the wording to the role you want.",
    bentoCta: "Get started",
    standTitleA: "Stand out",
    standTitleB: "inside busy applicant lists.",
    standBody:
      "Clean structure, stronger outcomes, and focused wording help recruiters understand your value faster.",
    standNote: "Trusted by 100K+ job seekers preparing stronger applications.",
    securityTitleA: "Your data stays protected",
    securityTitleB: "at every step.",
    securityBody:
      "Your private career information is used only to build your resume, and you can edit it whenever you need.",
    securityBadge: "Privacy comes first",
    downloadTitlePrefix: "Create, review, ",
    downloadTitleHighlight: "download.",
    downloadBody:
      "After your profile is organized, you can preview a clean resume layout that is ready to send.",
    downloadAlt: "Resume download preview",
    ctaTitle: "Send your resume with a clear, confident signal.",
    ctaBody:
      "Import memory, confirm your profile, generate for a target role, and refine the details that matter most.",
    ctaPrimary: "Get started",
    ctaSecondary: "View templates",
    trust: ["No credit card required", "Free start", "Edit anytime"],
    trustedLabel: "Industry Leaders",
    trustedTitle: "Trusted by the world's best",
    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "How does the AI resume builder work?",
        a: "You answer a short, guided intake — personal details, career history, education, skills, projects and languages. MemoryCV then uses Gemini-powered agents to structure, rewrite and grammar-check every section into an ATS-ready resume tailored to your target role.",
      },
      {
        q: "Which templates can I choose from?",
        a: "You get 20+ hand-crafted templates — from Swiss editorial and executive classics to modern two-column, academic and creative layouts. You can switch templates at any time from the editor without losing your content.",
      },
      {
        q: "Will my resume pass ATS screenings?",
        a: "Yes. Every template uses semantic structure, standard section headings and clean typography so Applicant Tracking Systems parse your resume correctly. The AI also rewrites bullets to include measurable impact and relevant keywords.",
      },
      {
        q: "What export formats do you support?",
        a: "You can export as high-quality vector PDF (the default for job applications), editable DOCX for recruiters who ask for Word, and plain TXT for ATS uploads that reject styled files.",
      },
      {
        q: "Can I tailor one resume for many different jobs?",
        a: "Yes. Paste a job description into the AI Optimize tool and MemoryCV rewrites your summary, skills and bullet points to match the role — while keeping your master profile intact. Every tailored version is saved to your dashboard.",
      },
      {
        q: "Do you generate cover letters and thank-you notes?",
        a: "Both are built in. The Cover Letter studio drafts a role-specific letter from your profile in seconds, and the Thank-You card library gives you elegant post-interview templates you can personalize and export.",
      },
      {
        q: "Is there an interview practice mode?",
        a: "Yes. Interview Mode runs an adaptive 5-phase simulation with role-specific questions, follow-ups and a scoring rubric covering communication, technical depth and behavioural signals — with instant feedback after each answer.",
      },
      {
        q: "Do you support Kurdish and Arabic?",
        a: "The entire product — landing page, dashboard, intake form, editor and AI writing — works in English, Kurdish (Sorani) and Arabic with full right-to-left layout, localized fonts and native-quality AI output.",
      },
      {
        q: "Is my data private?",
        a: "Your career profile is only used to build your own resume. Nothing is sold, shared or used to train third-party models, and you can edit or delete your data at any time from the dashboard.",
      },
      {
        q: "Is MemoryCV free to start?",
        a: "Yes — you can build, preview and export your first resume without a credit card. Advanced AI tailoring, unlimited exports and premium templates are available on paid plans.",
      },
    ],

    characterAlt: "Career character illustration",
    shieldAlt: "Data protection shield",
  },
  ku: {
    dir: "rtl",
    lang: "ckb",
    toggle: "English",
    menu: "کردنەوەی مێنیو",
    nav: [
      { label: "تایبەتمەندییەکان", to: "/", hash: "features" },
      { label: "قاڵبەکان", to: "/templates" },
      { label: "پرسیارە باوەکان", to: "/", hash: "faq" },
    ],
    navCta: "دەست پێبکە",
    navSignIn: "چوونەژوورەوە",
    badge: "گەڕاندنەوەی یادەوەری بۆ سیڤی",
    badgeMobile: "زیرەکی دەستکرد · خۆڕایی",
    heroTitle: "بیرەوەرییە پیشەییەکانت،",
    heroTitleAccent: "بگۆڕە بۆ سیڤی.",
    heroBody:
      "زانیاری، ئەزموون و تواناکانت کۆدەکاتەوە، پڕۆفایلێکی ڕێک دەردەهێنێت، سیڤییەکەت بۆ هەر کارێک دەگونجێنێت و بە شێوەیەکی پاک دەتوانیت دایبگریت.",
    heroCta: "ئێستا سیڤییەکەم دروست بکە",
    statsTitleA: "سیڤییەک دروست بکە کە",
    statsTitleB: "بە ڕاستی کار دەکات",
    statsCta: "بەخۆڕایی دەست پێبکە",
    stats: [
      { icon: Users, value: 150, suffix: "K+", label: "سیڤیی دروستکراو", id: "stat-resumes" },
      {
        icon: TrendingUp,
        value: 85,
        suffix: "%",
        label: "زیاتر بانگهێشتی چاوپێکەوتن",
        id: "stat-interviews",
      },
      {
        icon: Star,
        value: 49,
        suffix: "/5.0",
        label: "هەڵسەنگاندنی بەکارهێنەران",
        id: "stat-rating",
      },
    ],
    bentoBadge: "پشتگیریی زیرەکی دەستکرد",
    bentoTitleA: "سیڤییەک کە ناوی تۆ",
    bentoTitleB: "لە لیستی کاندیدەکاندا دەباتە پێشەوە.",
    bentoBody:
      "لە چەند خولەکدا زانیارییەکانت ڕێک دەخرێن، خاڵە بەهێزەکانت دەردەخرێن و دەقەکە بۆ ڕۆڵی مەبەستت دەگونجێندرێت.",
    bentoCta: "دروستکردن دەست پێبکە",
    standTitleA: "لە نێو داواکارییەکاندا",
    standTitleB: "جیاواز دەربکەوە.",
    standBody:
      "ڕێکخستنی دەق، پێشخستنی ئەنجامەکان و دیزاینی پاک یارمەتیت دەدات بە خێراتر تێبینی بکرێیت.",
    standNote: "زیاتر لە 100K بەکارهێنەر بۆ داواکاری کار بەکاریان هێناوە.",
    securityTitleA: "داتاکەت پارێزراوە",
    securityTitleB: "لە هەر هەنگاوێکدا.",
    securityBody:
      "زانیارییە تایبەتییەکانت تەنها بۆ دروستکردنی سیڤی بەکاردێن و دەتوانیت هەمیشە دەستیان بگۆڕیت.",
    securityBadge: "تایبەتمەندی لە پێشەوەیە",
    downloadTitlePrefix: "دروست بکە، وردبینی بکە، ",
    downloadTitleHighlight: "دایبگرە.",
    downloadBody: "دوای ڕێکخستنی پڕۆفایل، سیڤییەکەت بە قاڵبی پاک و ئامادەی ناردن دەبینیت.",
    downloadAlt: "پێشبینی دابەزاندنی سیڤی",
    ctaTitle: "سیڤییەکەت بە دەنگێکی ڕوون و پڕ مانا بنێرە.",
    ctaBody:
      "بیرەوەرییەکانت هاوردە بکە، پڕۆفایلەکەت پشتڕاست بکەوە، بۆ ڕۆڵی مەبەستت بیگونجێنە و ئەو شوێنانە باشتر بکە کە گرنگن.",
    ctaPrimary: "کردنەوەی پرۆسە",
    ctaSecondary: "بینینی قاڵبەکان",
    trust: ["پێویست بە کارتی بانکی ناکات", "دەستپێکردنی خۆڕایی", "هەر کات دەتوانیت بگۆڕیت"],
    trustedLabel: "پێشەنگەکانی پیشەسازی",
    trustedTitle: "متمانە پێکراو لەلایەن باشترینەکانی جیهانەوە",
    faqTitle: "پرسیارە باوەکان",
    faqItems: [
      {
        q: "دروستکەری سیڤی بە زیرەکی دەستکرد چۆن کار دەکات؟",
        a: "پرسیارگەلێکی ڕێنمایی کورت وەڵام دەدەیتەوە — زانیاری کەسی، مێژووی کار، خوێندن، لێهاتووییەکان، پڕۆژە و زمانەکان. پاشان ئاجێنتەکانی MemoryCV بە بنەمای Gemini هەموو بەشەکان ڕێک دەخات، دووبارە دەنووسێتەوە و ڕێنووسی چاک دەکاتەوە بۆ سیڤییەکی ATS-گونجاو کە بۆ ڕۆڵی مەبەستت گونجێنراوە.",
      },
      {
        q: "کام قاڵبەکان بەردەستن؟",
        a: "زیاتر لە ٢٠ قاڵبی دەستکرد — لە ستایلی سویسی و پیشەیی کلاسیک بۆ دوو ستوونی مۆدێرن، ئەکادیمی و داهێنەرانە. لە ئێدیتەردا دەتوانیت هەر کاتێک قاڵب بگۆڕیت بەبێ لەدەستدانی ناوەڕۆکەکەت.",
      },
      {
        q: "ئایا سیڤییەکەم لە ATS تێدەپەڕێت؟",
        a: "بەڵێ. هەموو قاڵبەکان پێکهاتەیەکی مانادار و سەردێڕی ستانداردیان هەیە بۆ ئەوەی سیستەمەکانی ATS بە دروستی بیخوێننەوە. ئاجێنتەکەش خاڵەکان بە کاریگەری پێواوکراو و ووشە کلیلییە پێویستەکانەوە دووبارە دەنووسێتەوە.",
      },
      {
        q: "چ فۆرماتێکی داگرتن بەردەستە؟",
        a: "دەتوانیت وەکو PDF ی ڤێکتۆر بە کوالێتی بەرز (پەسەندکراو بۆ داواکاری کار)، DOCX ی گۆڕانکاریپەزێر بۆ ئەو کارگێڕانەی داوای Word دەکەن، و TXT ی سادە بۆ ئەو ATSانەی فایلی ڕازێنراو ڕەت دەکەنەوە، دای بگریت.",
      },
      {
        q: "دەتوانم یەک پڕۆفایل بۆ چەندین کار بگونجێنم؟",
        a: "بەڵێ. وەسفی کار لە بەشی AI Optimize بلکێنە، MemoryCV پوختە، لێهاتووی و خاڵەکانت بۆ ئەو ڕۆڵە دووبارە دەنووسێتەوە — لە کاتێکدا پڕۆفایلە سەرەکییەکەت پارێزراو دەمێنێت. هەموو وەشانە گونجاوەکان لە داشبۆردەکەت هەڵدەگیرێن.",
      },
      {
        q: "نامەی پێشەکی و کارتی سوپاسیش دروست دەکەن؟",
        a: "هەردووکیان لە ناوەوە هەن. ستۆدیۆی Cover Letter لە چەند چرکەیەکدا نامەیەکی تایبەت بە ڕۆڵ لە پڕۆفایلەکەتەوە دەردەهێنێت، و کتێبخانەی Thank-You چەندین قاڵبی جوانی دوای چاوپێکەوتنت پێدەدات کە دەتوانیت کەسیبکەیت و داگری بکەیت.",
      },
      {
        q: "ئایا مۆدی ڕاهێنانی چاوپێکەوتن هەیە؟",
        a: "بەڵێ. Interview Mode سیمولاتۆرێکی ٥ قۆناغی گونجێنراو دەبەخشێت لەگەڵ پرسیاری تایبەت بە ڕۆڵ، پرسیاری شوێنکەوتوو و ڕەگاکانی هەڵسەنگاندن بۆ گەیاندن، قوڵی تەکنیکی و هەڵسوکەوت — لەگەڵ فیدباکی خێرا دوای هەر وەڵامێک.",
      },
      {
        q: "کوردی و عەرەبی پشتیوانی دەکرێن؟",
        a: "هەموو بەرهەمەکە — پەڕەی سەرەکی، داشبۆرد، فۆرمی پڕکردنەوە، ئێدیتەر و نووسینی زیرەک — بە ئینگلیزی، کوردی (سۆرانی) و عەرەبی کار دەکات لەگەڵ لاپەڕەبەندی ڕاست-بۆ-چەپی تەواو، فۆنتی گونجاو و بەرهەمی زیرەک بە کوالێتی زگماکی.",
      },
      {
        q: "ئایا داتاکەم پارێزراوە؟",
        a: "پڕۆفایلی کاریی تۆ تەنها بۆ دروستکردنی سیڤییەکەی خۆت بەکار دەهێنرێت. هیچ شتێک نافرۆشرێت، بەشدار ناکرێت یان بۆ ڕاهێنانی مۆدێلە دەرەکییەکان بەکار ناهێنرێت، و هەر کاتێک دەتوانیت داتاکەت لە داشبۆردەوە دەستکاری بکەیت یان بیسڕیتەوە.",
      },
      {
        q: "ئایا MemoryCV خۆڕاییە بۆ دەستپێکردن؟",
        a: "بەڵێ — دەتوانیت یەکەم سیڤیت دروست بکەیت، پێشبینینی بکەیت و داگری بکەیت بەبێ کارتی بانکی. گونجاندنی زیرەکی پێشکەوتوو، داگرتنی بێسنوور و قاڵبە تایبەتەکان لە پلانە پارەداریەکاندا بەردەستن.",
      },
    ],

    characterAlt: "وێنەی کەسایەتی بۆ کار",
    shieldAlt: "نیشانی پاراستنی داتا",
  },
  ar: {
    dir: "rtl",
    lang: "ar",
    toggle: "English",
    menu: "فتح القائمة",
    nav: [
      { label: "المميزات", to: "/", hash: "features" },
      { label: "القوالب", to: "/templates" },
      { label: "الأسئلة الشائعة", to: "/", hash: "faq" },
    ],
    navCta: "ابدأ الآن",
    navSignIn: "تسجيل الدخول",
    badge: "من الذاكرة إلى سيرة ذاتية بالذكاء الاصطناعي",
    badgeMobile: "ذكاء اصطناعي · مجاناً",
    heroTitle: "حوّل ذاكرتك المهنية إلى",
    heroTitleAccent: "سيرة ذاتية جاهزة للعمل.",
    heroBody:
      "يجمع MemoryCV خبراتك ومهاراتك وإنجازاتك، ويستخرج ملفاً مهنياً منسّقاً، ويكيّف سيرتك الذاتية لكل وظيفة، ثم يتيح لك تنزيل مستند احترافي.",
    heroCta: "ابدأ الآن",
    statsTitleA: "أنشئ سيرة ذاتية",
    statsTitleB: "تصنع الفرق فعلاً",
    statsCta: "ابدأ مجاناً",
    stats: [
      { icon: Users, value: 150, suffix: "K+", label: "سيرة ذاتية منشأة", id: "stat-resumes" },
      {
        icon: TrendingUp,
        value: 85,
        suffix: "%",
        label: "نسبة أعلى لطلبات المقابلة",
        id: "stat-interviews",
      },
      { icon: Star, value: 49, suffix: "/5.0", label: "متوسط تقييم المستخدمين", id: "stat-rating" },
    ],
    bentoBadge: "توجيه بالذكاء الاصطناعي",
    bentoTitleA: "سيرة ذاتية تضع اسمك",
    bentoTitleB: "في مقدمة قائمة المرشحين.",
    bentoBody:
      "في دقائق، ينظّم MemoryCV معلوماتك، ويُبرز أقوى إنجازاتك، ويُكيّف الصياغة للوظيفة التي تستهدفها.",
    bentoCta: "ابدأ الآن",
    standTitleA: "تميّز",
    standTitleB: "وسط قوائم المتقدمين المزدحمة.",
    standBody:
      "هيكل واضح، ونتائج أقوى، وصياغة مركّزة تساعد المسؤولين عن التوظيف على فهم قيمتك بسرعة.",
    standNote: "موثوق من قِبل أكثر من 100 ألف باحث عن عمل يعدّون طلبات أقوى.",
    securityTitleA: "بياناتك محمية",
    securityTitleB: "في كل خطوة.",
    securityBody:
      "تُستخدم معلوماتك المهنية الخاصة فقط لبناء سيرتك الذاتية، ويمكنك تعديلها متى شئت.",
    securityBadge: "الخصوصية أولاً",
    downloadTitlePrefix: "أنشئ، راجع، ",
    downloadTitleHighlight: "نزّل.",
    downloadBody:
      "بعد تنظيم ملفك، يمكنك معاينة سيرة ذاتية بتصميم أنيق جاهزة للإرسال.",
    downloadAlt: "معاينة تنزيل السيرة الذاتية",
    ctaTitle: "أرسل سيرتك الذاتية بإشارة واضحة وواثقة.",
    ctaBody:
      "استورد الذاكرة، وأكّد ملفك، وأنشئ سيرة لوظيفة محددة، ثم اضبط التفاصيل الأهم.",
    ctaPrimary: "ابدأ الآن",
    ctaSecondary: "عرض القوالب",
    trust: ["لا حاجة لبطاقة ائتمان", "بداية مجانية", "عدّل في أي وقت"],
    trustedLabel: "رواد الصناعة",
    trustedTitle: "موثوق من قِبل الأفضل عالمياً",
    faqTitle: "الأسئلة الشائعة",
    faqItems: [
      {
        q: "كيف يعمل مُنشئ السير الذاتية بالذكاء الاصطناعي؟",
        a: "تُجيب على استمارة موجّهة قصيرة — معلومات شخصية، مسيرة مهنية، تعليم، مهارات، مشاريع ولغات. ثم تستخدم وكلاء MemoryCV المدعومون بـ Gemini لهيكلة كل قسم وإعادة صياغته وتدقيقه لغوياً لإنتاج سيرة ذاتية جاهزة لأنظمة ATS ومكيّفة لوظيفتك المستهدفة.",
      },
      {
        q: "ما القوالب المتاحة؟",
        a: "أكثر من 20 قالباً مصمّماً يدوياً — من الطراز السويسري التحريري والتنفيذي الكلاسيكي إلى تصاميم عمودَين حديثة وأكاديمية وإبداعية. يمكنك تبديل القالب في أي وقت من المحرر دون فقد المحتوى.",
      },
      {
        q: "هل ستجتاز سيرتي أنظمة ATS؟",
        a: "نعم. كل قالب يستخدم بنية دلالية وعناوين أقسام قياسية وطباعة نظيفة لتقرأه أنظمة تتبع المتقدمين بشكل صحيح. كما يعيد الذكاء الاصطناعي صياغة النقاط لتضمين أثر قابل للقياس وكلمات مفتاحية ذات صلة.",
      },
      {
        q: "ما صيغ التصدير المدعومة؟",
        a: "يمكنك التصدير كـ PDF متجهي عالي الجودة (المعتمد لطلبات التوظيف)، وDOCX قابل للتحرير لمن يطلبونه بصيغة Word، وTXT نصي عادي لأنظمة ATS التي ترفض الملفات المنسّقة.",
      },
      {
        q: "هل يمكنني تكييف ملف واحد لعدة وظائف؟",
        a: "نعم. الصق وصف الوظيفة في أداة AI Optimize فيعيد MemoryCV صياغة الملخّص والمهارات والنقاط لتناسب الدور — مع الحفاظ على ملفك الرئيسي كما هو. كل نسخة مكيّفة تُحفظ في لوحة التحكم.",
      },
      {
        q: "هل تُنشئون رسائل تعريفية وبطاقات شكر؟",
        a: "كلاهما مدمج. يصوغ استوديو Cover Letter رسالة خاصة بالوظيفة من ملفك في ثوانٍ، وتوفّر مكتبة Thank-You قوالب أنيقة لما بعد المقابلة يمكنك تخصيصها وتصديرها.",
      },
      {
        q: "هل هناك وضع تدريب على المقابلات؟",
        a: "نعم. يقدّم Interview Mode محاكاة تكيّفية من 5 مراحل تشمل أسئلة خاصة بالدور، وأسئلة متابعة، ورُبْريك تقييم يغطي التواصل والعمق التقني والإشارات السلوكية — مع ملاحظات فورية بعد كل إجابة.",
      },
      {
        q: "هل تدعمون الكردية والعربية؟",
        a: "المنتج بأكمله — الصفحة الرئيسية، ولوحة التحكم، والاستمارة، والمحرر، وكتابة الذكاء الاصطناعي — يعمل بالإنجليزية والكردية (سوراني) والعربية بدعم كامل من اليمين إلى اليسار وخطوط محلية ومخرجات AI بجودة لغة أصلية.",
      },
      {
        q: "هل بياناتي خاصة؟",
        a: "يُستخدم ملفك المهني فقط لبناء سيرتك الذاتية. لا يُباع ولا يُشارك ولا يُستخدم لتدريب نماذج طرف ثالث، ويمكنك تعديل بياناتك أو حذفها في أي وقت من لوحة التحكم.",
      },
      {
        q: "هل MemoryCV مجاني للبدء؟",
        a: "نعم — يمكنك إنشاء ومعاينة وتصدير أول سيرة ذاتية دون بطاقة ائتمان. التكييف المتقدم بالذكاء الاصطناعي، والتصدير غير المحدود، والقوالب المميّزة متاحة في الخطط المدفوعة.",
      },
    ],
    characterAlt: "رسم توضيحي لشخصية مهنية",
    shieldAlt: "درع حماية البيانات",
  },
} as const;

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const mobile = useMobileOptimized();
  const [val, setVal] = useState(mobile ? to : 0);
  const ref = useRef(false);

  if (mobile) {
    return (
      <span>
        {to.toLocaleString("en-US")}
        {suffix}
      </span>
    );
  }

  return (
    <motion.span
      onViewportEnter={() => {
        if (ref.current) return;
        ref.current = true;
        animate(0, to, {
          duration: 1.6,
          ease: "easeOut",
          onUpdate: (v) => setVal(Math.round(v)),
        });
      }}
    >
      {val.toLocaleString("en-US")}
      {suffix}
    </motion.span>
  );
}

/** Smart CTA: signed in → dashboard; else signup or onboarding */
function CtaButton({
  id,
  className,
  onboardingDone,
  children,
}: {
  id?: string;
  className?: string;
  onboardingDone: boolean;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { clerkEnabled, isSignedIn } = useAuth();
  return (
    <button
      id={id}
      className={className}
      onClick={() =>
        navigate({
          to: landingCtaPath({
            clerkEnabled,
            isSignedIn,
            onboardingDone,
            mode: isSignedIn ? "dashboard" : "start",
          }),
        })
      }
    >
      {children}
    </button>
  );
}

const LANGUAGE_OPTIONS: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "ku", label: "Kurdish", native: "کوردی" },
];

function LanguageDropdown({
  language,
  onSelect,
  align = "end",
}: {
  language: Language;
  onSelect: (lang: Language) => void;
  align?: "start" | "end";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGUAGE_OPTIONS.find((l) => l.code === language) ?? LANGUAGE_OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" dir="ltr">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
        aria-label="Change language"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline whitespace-nowrap">{current.native}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            role="listbox"
            className={`absolute top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg ${
              align === "end" ? "right-0" : "left-0"
            }`}
          >
            {LANGUAGE_OPTIONS.map((opt) => {
              const active = opt.code === language;
              return (
                <li key={opt.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onSelect(opt.code);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="whitespace-nowrap">{opt.native}</span>
                    <span className="text-xs text-slate-400">{opt.label}</span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header({
  language,
  onSelectLanguage,
}: {
  language: Language;
  onSelectLanguage: (lang: Language) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = copy[language];
  const navigate = useNavigate();
  const onboardingDone = useAppStore((s) => s.onboardingDone);
  const { clerkEnabled, isSignedIn } = useAuth();
  const { isDark, toggle: toggleDark } = useDarkMode();
  const handleStart = () =>
    navigate({
      to: landingCtaPath({
        clerkEnabled,
        isSignedIn,
        onboardingDone,
        mode: isSignedIn ? "dashboard" : "start",
      }),
    });
  const handleSignIn = () =>
    navigate({
      to: landingCtaPath({ clerkEnabled, isSignedIn, onboardingDone, mode: "login" }),
    });

  // Zero-cost scroll detection — IntersectionObserver fires once on threshold cross, not per frame
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:fixed;top:80px;left:0;width:1px;height:1px;pointer-events:none;z-index:-1;";
    document.body.appendChild(sentinel);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      sentinel.remove();
    };
  }, []);

  return (
    <>
      {/* ── DESKTOP header (hidden on mobile) ── */}
      <header
        className="fixed left-0 right-0 top-0 z-50 pointer-events-none hidden md:flex justify-center"
        dir="ltr"
      >
        <div
          className="pointer-events-auto flex items-center justify-between"
          style={{
            maxWidth: scrolled ? "800px" : "100%",
            width: "100%",
            marginTop: scrolled ? "10px" : "0px",
            marginLeft: scrolled ? "auto" : "0",
            marginRight: scrolled ? "auto" : "0",
            paddingLeft: scrolled ? "20px" : "24px",
            paddingRight: scrolled ? "20px" : "24px",
            height: scrolled ? "52px" : "64px",
            borderRadius: scrolled ? "999px" : "0px",
            background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.95)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)"
              : "0 1px 0 rgba(226,232,240,0.8)",
            borderBottom: scrolled ? "none" : "1px solid rgba(226,232,240,0.8)",
            border: scrolled ? "1px solid rgba(203,213,225,0.6)" : "none",
            /* Always keep blur active — switching it on mid-scroll creates a new compositor layer = first-scroll jank */
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            willChange: "max-width, border-radius",
            transition:
              "max-width 0.65s cubic-bezier(0.25,0.46,0.45,0.94), margin-top 0.65s cubic-bezier(0.25,0.46,0.45,0.94), height 0.65s cubic-bezier(0.25,0.46,0.45,0.94), border-radius 0.65s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.65s cubic-bezier(0.25,0.46,0.45,0.94)",
          }}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2 cursor-pointer" id="nav-logo">
            <img
              src="/logo/MemoryCV Logo Icon Only.png"
              alt="MemoryCV"
              className="h-14 w-14 rounded-lg object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-slate-900">MemoryCV</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {t.nav.map((item: NavItem) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                dir={t.dir}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden md:flex">
              <LanguageDropdown language={language} onSelect={onSelectLanguage} />
            </div>


            <button
              onClick={toggleDark}
              className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:flex"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              dir="ltr"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {!isSignedIn && clerkEnabled && (
              <button
                type="button"
                onClick={handleSignIn}
                className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 md:block"
              >
                {t.navSignIn}
              </button>
            )}
            <button
              onClick={handleStart}
              id="nav-free-trial"
              className="hidden md:block rounded-full bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
            >
              {isSignedIn ? (language === "ku" ? "داشبۆرد" : language === "ar" ? "لوحة التحكم" : "Dashboard") : t.navCta}
            </button>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={t.menu}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE solid header (md:hidden) ── */}
      <header
        className="perf-surface fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-slate-200/80 bg-white/98 px-4 md:hidden"
        style={{ height: "60px" }}
        dir="ltr"
      >
        <Link to="/" className="flex shrink-0 items-center gap-2" id="nav-logo-mobile">
          <img
            src="/logo/MemoryCV Logo Icon Only.png"
            alt="MemoryCV"
            className="h-12 w-12 rounded-lg object-contain"
          />
          <span className="text-lg font-bold tracking-tight text-slate-900">MemoryCV</span>
        </Link>
        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={t.menu}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span
                key="mob-close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span
                key="mob-open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="perf-surface fixed inset-0 z-40 bg-white/98 md:hidden"
          >
            <div className="absolute inset-0" onClick={() => setMobileOpen(false)} />

            <div
              className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-8"
              dir={t.dir}
            >
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.25 }}
                className="mb-8 flex items-center gap-2.5"
              >
                <img
                  src="/logo/MemoryCV Logo Icon Only.png"
                  alt="MemoryCV"
                  className="h-20 w-20 rounded-xl object-contain"
                />
                <span className="text-3xl font-bold tracking-tight text-slate-900">MemoryCV</span>
              </motion.div>

              {t.nav.map((item: NavItem, i: number) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.24, ease: "easeOut" }}
                  className="w-full max-w-xs"
                >
                  <Link
                    to={item.to}
                    hash={item.hash}
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-2xl border border-slate-100 bg-white/80 px-6 py-4 text-base font-semibold text-slate-800 shadow-sm transition-all active:scale-95 hover:border-blue-200 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + t.nav.length * 0.06, duration: 0.24, ease: "easeOut" }}
                className="w-full max-w-xs"
              >
                <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-100 bg-white/80 p-2 shadow-sm" dir="ltr">
                  {LANGUAGE_OPTIONS.map((opt) => {
                    const active = opt.code === language;
                    return (
                      <button
                        key={opt.code}
                        type="button"
                        onClick={() => {
                          onSelectLanguage(opt.code);
                          setMobileOpen(false);
                        }}
                        className={`rounded-xl px-3 py-3 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {opt.native}
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + (t.nav.length + 1) * 0.06, duration: 0.24, ease: "easeOut" }}
                className="w-full max-w-xs"
              >
                <button
                  onClick={toggleDark}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white/80 px-6 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all active:scale-95 hover:border-blue-200 hover:text-blue-600"
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {isDark
                    ? language === "ku" ? "دۆخی ڕووناک" : language === "ar" ? "الوضع الفاتح" : "Light mode"
                    : language === "ku" ? "دۆخی تاریک" : language === "ar" ? "الوضع الداكن" : "Dark mode"}
                </button>
              </motion.div>


              {!isSignedIn && clerkEnabled && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.08 + (t.nav.length + 1) * 0.06,
                    duration: 0.24,
                    ease: "easeOut",
                  }}
                  className="mt-4 w-full max-w-xs"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      void handleSignIn();
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-base font-semibold text-slate-800 shadow-sm transition-all active:scale-95 hover:border-blue-200 hover:text-blue-600"
                  >
                    {t.navSignIn}
                  </button>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.08 + (t.nav.length + 2) * 0.06,
                  duration: 0.24,
                  ease: "easeOut",
                }}
                className="mt-4 w-full max-w-xs"
              >
                <button
                  onClick={() => { setMobileOpen(false); void handleStart(); }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.28)] transition-all active:scale-95 hover:bg-blue-700"
                >
                  {isSignedIn ? (language === "ku" ? "داشبۆرد" : language === "ar" ? "لوحة التحكم" : "Dashboard") : t.navCta}
                </button>
              </motion.div>
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-colors hover:bg-slate-50"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-[60px] md:h-16 w-full flex-none" />
    </>
  );
}

export const LeftCardSVG = () => (
  <svg
    viewBox="0 0 240 320"
    className="h-auto w-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="left-header-gradient"
        x1="0"
        y1="0"
        x2="240"
        y2="80"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2563eb" />
        <stop offset="1" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <rect width="240" height="320" rx="16" fill="#ffffff" />
    <rect x="0.5" y="0.5" width="239" height="319" rx="15.5" fill="none" stroke="#e2e8f0" />
    <path
      d="M0 16C0 7.16 7.16 0 16 0H224C232.84 0 240 7.16 240 16V80H0V16Z"
      fill="url(#left-header-gradient)"
    />
    <circle cx="48" cy="40" r="24" fill="white" fillOpacity="0.2" />
    <circle cx="48" cy="40" r="20" fill="white" />
    <path
      d="M48 34C44.69 34 42 36.69 42 40C42 43.31 44.69 46 48 46C51.31 46 54 43.31 54 40C54 36.69 51.31 34 48 34ZM38 40C38 34.48 42.48 30 48 30C53.52 30 58 34.48 58 40C58 45.52 53.52 50 48 50C42.48 50 38 45.52 38 40Z"
      fill="#2563eb"
    />
    <text
      x="84"
      y="36"
      fill="white"
      fontSize="16"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      Sarah Chen
    </text>
    <text x="84" y="52" fill="#bfdbfe" fontSize="11" fontFamily="system-ui, sans-serif">
      Senior UX Designer
    </text>
    <text
      x="24"
      y="110"
      fill="#2563eb"
      fontSize="9"
      fontWeight="bold"
      letterSpacing="1"
      fontFamily="system-ui, sans-serif"
    >
      PROFESSIONAL EXPERIENCE
    </text>
    <rect x="24" y="124" width="2" height="24" fill="#3b82f6" />
    <text
      x="34"
      y="132"
      fill="#0f172a"
      fontSize="12"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      Google
    </text>
    <text
      x="216"
      y="132"
      fill="#64748b"
      fontSize="9"
      textAnchor="end"
      fontFamily="system-ui, sans-serif"
    >
      2021 - Present
    </text>
    <text x="34" y="146" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">
      Senior Product Designer
    </text>
    <rect x="24" y="164" width="2" height="24" fill="#cbd5e1" />
    <text
      x="34"
      y="172"
      fill="#0f172a"
      fontSize="12"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      Figma
    </text>
    <text
      x="216"
      y="172"
      fill="#64748b"
      fontSize="9"
      textAnchor="end"
      fontFamily="system-ui, sans-serif"
    >
      2019 - 2021
    </text>
    <text x="34" y="186" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">
      UX Lead
    </text>
    <text
      x="24"
      y="224"
      fill="#2563eb"
      fontSize="9"
      fontWeight="bold"
      letterSpacing="1"
      fontFamily="system-ui, sans-serif"
    >
      CORE SKILLS
    </text>
    <rect x="24" y="234" width="56" height="20" rx="10" fill="#eff6ff" />
    <text
      x="52"
      y="247"
      fill="#1d4ed8"
      fontSize="9"
      fontWeight="600"
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
    >
      UI Design
    </text>
    <rect x="84" y="234" width="60" height="20" rx="10" fill="#eff6ff" />
    <text
      x="114"
      y="247"
      fill="#1d4ed8"
      fontSize="9"
      fontWeight="600"
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
    >
      Prototyping
    </text>
    <rect x="148" y="234" width="68" height="20" rx="10" fill="#eff6ff" />
    <text
      x="182"
      y="247"
      fill="#1d4ed8"
      fontSize="9"
      fontWeight="600"
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
    >
      User Testing
    </text>
    <path d="M24 286 L216 286" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 286 L170 286" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
    <text x="24" y="274" fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">
      Profile Extraction Complete
    </text>
    <text
      x="216"
      y="274"
      fill="#2563eb"
      fontSize="9"
      fontWeight="bold"
      textAnchor="end"
      fontFamily="system-ui, sans-serif"
    >
      100%
    </text>
  </svg>
);

export const CenterCardSVG = () => (
  <svg
    viewBox="0 0 280 400"
    className="h-auto w-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="280" height="400" rx="8" fill="#ffffff" />
    <rect x="0.5" y="0.5" width="279" height="399" rx="7.5" fill="none" stroke="#e2e8f0" />
    <g transform="translate(190, 10)">
      <rect width="80" height="24" rx="12" fill="#eff6ff" stroke="#bfdbfe" />
      <text
        x="40"
        y="16"
        fill="#1d4ed8"
        fontSize="9"
        fontWeight="bold"
        textAnchor="middle"
        fontFamily="system-ui, sans-serif"
      >
        AI GENERATED
      </text>
    </g>
    <text
      x="140"
      y="56"
      fill="#0f172a"
      fontSize="18"
      fontWeight="bold"
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
    >
      ALEXANDRA SMITH
    </text>
    <text
      x="140"
      y="68"
      fill="#64748b"
      fontSize="8"
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
    >
      New York, NY - alexandra@email.com - (555) 123-4567
    </text>
    <path d="M20 80 L260 80" stroke="#f1f5f9" strokeWidth="1" />
    <text
      x="20"
      y="96"
      fill="#2563eb"
      fontSize="10"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      PROFESSIONAL SUMMARY
    </text>
    <text x="20" y="110" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">
      Results-driven Senior Engineer with 8+ years of experience in scalable web
    </text>
    <text x="20" y="120" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">
      architecture and cloud-native applications. Proven track record of leading
    </text>
    <text x="20" y="130" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">
      cross-functional teams to deliver enterprise-grade solutions.
    </text>
    <text
      x="20"
      y="156"
      fill="#2563eb"
      fontSize="10"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      EXPERIENCE
    </text>
    <text
      x="20"
      y="172"
      fill="#0f172a"
      fontSize="9"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      TechCorp Industries
    </text>
    <text
      x="260"
      y="172"
      fill="#0f172a"
      fontSize="8"
      fontWeight="bold"
      textAnchor="end"
      fontFamily="system-ui, sans-serif"
    >
      2020 - Present
    </text>
    <text
      x="20"
      y="182"
      fill="#64748b"
      fontSize="8"
      fontStyle="italic"
      fontFamily="system-ui, sans-serif"
    >
      Senior Software Engineer
    </text>
    <circle cx="26" cy="194" r="1.5" fill="#3b82f6" />
    <text x="32" y="196" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">
      Architected microservices migrating 2M+ users with 99.99% uptime.
    </text>
    <circle cx="26" cy="206" r="1.5" fill="#3b82f6" />
    <text x="32" y="208" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">
      Reduced AWS infrastructure costs by 30% through resource optimization.
    </text>
    <text
      x="20"
      y="230"
      fill="#0f172a"
      fontSize="9"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      Innovate Software
    </text>
    <text
      x="260"
      y="230"
      fill="#0f172a"
      fontSize="8"
      fontWeight="bold"
      textAnchor="end"
      fontFamily="system-ui, sans-serif"
    >
      2016 - 2020
    </text>
    <text
      x="20"
      y="240"
      fill="#64748b"
      fontSize="8"
      fontStyle="italic"
      fontFamily="system-ui, sans-serif"
    >
      Software Engineer
    </text>
    <circle cx="26" cy="252" r="1.5" fill="#3b82f6" />
    <text x="32" y="254" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">
      Developed RESTful APIs serving 50M+ requests monthly.
    </text>
    <circle cx="26" cy="264" r="1.5" fill="#3b82f6" />
    <text x="32" y="266" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">
      Mentored 4 junior developers and established CI/CD best practices.
    </text>
    <text
      x="20"
      y="296"
      fill="#2563eb"
      fontSize="10"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      EDUCATION
    </text>
    <text
      x="20"
      y="312"
      fill="#0f172a"
      fontSize="9"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      University of Technology
    </text>
    <text
      x="260"
      y="312"
      fill="#0f172a"
      fontSize="8"
      fontWeight="bold"
      textAnchor="end"
      fontFamily="system-ui, sans-serif"
    >
      2012 - 2016
    </text>
    <text
      x="20"
      y="322"
      fill="#64748b"
      fontSize="8"
      fontStyle="italic"
      fontFamily="system-ui, sans-serif"
    >
      Bachelor of Science in Computer Science
    </text>
    <text
      x="20"
      y="352"
      fill="#2563eb"
      fontSize="10"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      TECHNICAL SKILLS
    </text>
    <text x="20" y="368" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">
      Languages: JavaScript, TypeScript, Python, Java, Go
    </text>
    <text x="20" y="380" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">
      Frameworks: React, Node.js, Express, Django, Next.js
    </text>
  </svg>
);

export const RightCardSVG = () => (
  <svg
    viewBox="0 0 240 320"
    className="h-auto w-full"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="right-header-gradient"
        x1="0"
        y1="0"
        x2="240"
        y2="100"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1e3a8a" />
        <stop offset="1" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    <rect width="240" height="320" rx="16" fill="#ffffff" />
    <rect x="0.5" y="0.5" width="239" height="319" rx="15.5" fill="none" stroke="#e2e8f0" />
    <path
      d="M0 16C0 7.16 7.16 0 16 0H224C232.84 0 240 7.16 240 16V100H0V16Z"
      fill="url(#right-header-gradient)"
    />
    <text
      x="24"
      y="36"
      fill="#93c5fd"
      fontSize="10"
      fontWeight="bold"
      letterSpacing="1"
      fontFamily="system-ui, sans-serif"
    >
      TARGET ROLE MATCH
    </text>
    <text
      x="24"
      y="76"
      fill="white"
      fontSize="42"
      fontWeight="900"
      fontFamily="system-ui, sans-serif"
    >
      96
      <tspan fontSize="24" fill="#93c5fd">
        %
      </tspan>
    </text>
    <rect x="24" y="124" width="24" height="24" rx="6" fill="#dcfce7" />
    <path
      d="M30 136L34 140L42 130"
      stroke="#16a34a"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x="56"
      y="136"
      fill="#0f172a"
      fontSize="12"
      fontWeight="bold"
      fontFamily="system-ui, sans-serif"
    >
      Strong Match
    </text>
    <text x="56" y="148" fill="#64748b" fontSize="9" fontFamily="system-ui, sans-serif">
      Ready to apply for Senior Dev
    </text>
    <text
      x="24"
      y="184"
      fill="#2563eb"
      fontSize="9"
      fontWeight="bold"
      letterSpacing="1"
      fontFamily="system-ui, sans-serif"
    >
      MATCH BREAKDOWN
    </text>
    <text
      x="24"
      y="206"
      fill="#334155"
      fontSize="10"
      fontWeight="600"
      fontFamily="system-ui, sans-serif"
    >
      Required Skills
    </text>
    <text
      x="216"
      y="206"
      fill="#0f172a"
      fontSize="10"
      fontWeight="bold"
      textAnchor="end"
      fontFamily="system-ui, sans-serif"
    >
      100%
    </text>
    <path d="M24 216 L216 216" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 216 L216 216" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
    <text
      x="24"
      y="238"
      fill="#334155"
      fontSize="10"
      fontWeight="600"
      fontFamily="system-ui, sans-serif"
    >
      Experience Level
    </text>
    <text
      x="216"
      y="238"
      fill="#0f172a"
      fontSize="10"
      fontWeight="bold"
      textAnchor="end"
      fontFamily="system-ui, sans-serif"
    >
      90%
    </text>
    <path d="M24 248 L216 248" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 248 L196 248" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
    <text
      x="24"
      y="270"
      fill="#334155"
      fontSize="10"
      fontWeight="600"
      fontFamily="system-ui, sans-serif"
    >
      Keywords
    </text>
    <text
      x="216"
      y="270"
      fill="#0f172a"
      fontSize="10"
      fontWeight="bold"
      textAnchor="end"
      fontFamily="system-ui, sans-serif"
    >
      85%
    </text>
    <path d="M24 280 L216 280" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 280 L180 280" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

function HeroCardsStatic() {
  const cardW = "clamp(108px,17vw,190px)";
  const centerW = "clamp(145px,23vw,245px)";

  return (
    <div
      className="relative flex w-full origin-top items-center justify-center perf-contain"
      style={{ height: "clamp(340px,46vw,430px)" }}
      dir="ltr"
    >
      <div
        className="absolute rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
        style={{ width: cardW, zIndex: 10, left: "4%", top: "14%", transform: "rotate(-8deg)" }}
      >
        <LeftCardSVG />
      </div>
      <div
        className="absolute rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
        style={{ width: cardW, zIndex: 10, right: "4%", top: "14%", transform: "rotate(8deg)" }}
      >
        <RightCardSVG />
      </div>
      <div
        className="absolute rounded-lg shadow-[0_25px_50px_rgba(37,99,235,0.25)]"
        style={{ width: centerW, zIndex: 20, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      >
        <CenterCardSVG />
      </div>
    </div>
  );
}

function HeroCardsParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "center center"],
  });

  const leftX = useTransform(scrollYProgress, [0, 1], ["0%", "-108%"]);
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const rightX = useTransform(scrollYProgress, [0, 1], ["0%", "108%"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const centerY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <div
      ref={ref}
      className="relative flex w-full origin-top items-center justify-center"
      style={{ height: "clamp(340px,46vw,430px)" }}
      dir="ltr"
    >
      <motion.div
        className="absolute rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
        style={{
          width: "clamp(108px,17vw,190px)",
          zIndex: 10,
          x: leftX,
          y: leftY,
          rotate: leftRotate,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 70 }}
      >
        <LeftCardSVG />
      </motion.div>
      <motion.div
        className="absolute rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
        style={{
          width: "clamp(108px,17vw,190px)",
          zIndex: 10,
          x: rightX,
          y: rightY,
          rotate: rightRotate,
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 70 }}
      >
        <RightCardSVG />
      </motion.div>
      <motion.div
        className="absolute rounded-lg shadow-[0_25px_50px_rgba(37,99,235,0.25)]"
        style={{ width: "clamp(145px,23vw,245px)", zIndex: 20, y: centerY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 70 }}
      >
        <CenterCardSVG />
      </motion.div>
    </div>
  );
}

function HeroCards() {
  const mobile = useMobileOptimized();
  return mobile ? <HeroCardsStatic /> : <HeroCardsParallax />;
}

function DirectionArrow({ language, className }: { language: Language; className: string }) {
  return language !== "en" ? (
    <ArrowLeft className={className} />
  ) : (
    <ArrowRight className={className} />
  );
}

function Hero({ language }: { language: Language }) {
  const t = copy[language];
  const onboardingDone = useAppStore((s) => s.onboardingDone);

  return (
    <section className="app-frame px-4 pb-0 pt-4 sm:px-6 sm:pt-6">
      <div className="hero-gradient relative pb-16 sm:pb-20">
        <div className="relative px-4 pb-4 pt-8 text-center sm:px-6 sm:pt-16">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-[760px] text-3xl font-bold leading-[1.18] tracking-tight text-white sm:text-5xl md:text-6xl"
            dir={t.dir}
          >
            {t.heroTitle}
            <span className="mx-2 mt-2 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 align-middle shadow-[0_0_15px_rgba(59,130,246,0.25)] backdrop-blur-sm sm:mt-0">
              <FileText className="h-4 w-4 text-blue-200 sm:h-7 sm:w-7" />
              <span className="text-2xl text-[#bfdbfe] sm:text-4xl md:text-5xl">MemoryCV</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.5 }}
            className="mx-auto mt-5 max-w-[560px] text-sm leading-8 text-blue-100/90 sm:text-base"
            dir={t.dir}
          >
            {t.heroBody}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.5 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-4"
          >
            <CtaButton id="hero-cta" onboardingDone={onboardingDone} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)] active:scale-95 sm:px-8 sm:py-3.5">
              {t.heroCta}
              <DirectionArrow language={language} className="h-4 w-4" />
            </CtaButton>
            <Link
              to="/templates"
              className="group inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-white/10 px-6 py-3 text-sm font-bold text-blue-50 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:text-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] active:scale-95 sm:px-8 sm:py-3.5"
            >
              {t.ctaSecondary}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        <div
          className="relative mx-auto"
          style={{
            maxWidth: "min(760px,100%)",
            height: "clamp(340px,46vw,430px)",
            marginTop: "clamp(16px,4vw,48px)",
          }}
        >
          <HeroCards />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Editorial / Ultra-SaaS system
   Canvas: #FAFAF7   Card: #FFF   Rule: #E7E5DE   Ink: slate-900
   Accent: #2A5BFF   Mono numerics · tabular-nums · hairlines
───────────────────────────────────────────────────────────── */

const editorialRule = "border-t border-[#E7E5DE]";
const editorialCard =
  "relative overflow-hidden rounded-[22px] border border-[#E7E5DE] bg-white shadow-[0_1px_0_rgba(15,23,42,0.02)]";
const editorialEyebrow =
  "inline-flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500";

function EditorialSectionHeader({
  index,
  kicker,
  titleTop,
  titleBottom,
  dir,
}: {
  index: string;
  kicker: string;
  titleTop: React.ReactNode;
  titleBottom: React.ReactNode;
  dir: "ltr" | "rtl";
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-center gap-4" dir="ltr">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-400">
          {index}
        </span>
        <span className="h-px flex-1 bg-[#E7E5DE]" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">
          {kicker}
        </span>
      </div>
      <h2
        className="mt-8 max-w-[22ch] text-[clamp(2rem,4.6vw,3.75rem)] font-semibold tracking-[-0.028em] text-slate-900"
        style={{ lineHeight: 1.02 }}
        dir={dir}
      >
        {titleTop}
        <br />
        <span className="text-slate-400">{titleBottom}</span>
      </h2>
    </div>
  );
}

/* ── Section: Proof strip (replaces StatsSection) ── */
export function StatsSection({ language }: { language: Language }) {
  const t = copy[language];
  const isRtl = language !== "en";

  return (
    <section
      id="proof"
      className="perf-defer-section relative bg-[#FAFAF7] px-5 pt-24 pb-20 sm:px-8 sm:pt-32 sm:pb-28"
    >
      <EditorialSectionHeader
        index="§ 01"
        kicker={isRtl ? "ژمارە / بەڵگە" : "Numbers / Proof"}
        titleTop={t.statsTitleA}
        titleBottom={t.statsTitleB}
        dir={t.dir}
      />

      {/* Metric ledger — hairline-separated hero numbers */}
      <div className="mx-auto mt-16 max-w-6xl border-y border-[#E7E5DE]" dir="ltr">
        <div className="grid grid-cols-1 divide-y divide-[#E7E5DE] md:grid-cols-3 md:divide-y-0 md:divide-x">
          {t.stats.map((s, i) => (
            <motion.div
              key={s.id}
              id={s.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative px-6 py-10 sm:px-10 sm:py-14"
            >
              <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">
                <span className="tabular-nums">{`0${i + 1}`}</span>
                <span className="h-px w-6 bg-slate-300" />
                <s.icon className="h-3.5 w-3.5 text-slate-500" strokeWidth={1.6} />
              </div>

              <div className="mt-6 flex items-baseline gap-1.5 font-semibold tabular-nums tracking-[-0.03em] text-slate-900">
                <span className="text-[clamp(3rem,6.5vw,5.25rem)] leading-[0.9]">
                  <Counter to={s.value} />
                </span>
                <span className="text-[clamp(1.25rem,2vw,1.75rem)] leading-none text-[#2A5BFF]">
                  {s.suffix}
                </span>
              </div>

              <div
                className="mt-5 text-[13px] font-medium leading-[1.55] text-slate-500"
                dir={t.dir}
              >
                {s.label}
              </div>

              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#2A5BFF] transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Product spotlight — real CV cards on paper grid
───────────────────────────────────────────────────────────── */
function BentoIndex({ n }: { n: string }) {
  return (
    <span className="pointer-events-none absolute right-6 top-6 font-mono text-[10px] font-medium tabular-nums text-slate-400/70">
      {n}
    </span>
  );
}

const BentoHeroCard = ({ language }: { language: Language }) => {
  const t = copy[language];
  const isRtl = language !== "en";
  const textAlign = isRtl ? "text-right" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`${editorialCard} w-full`}
    >
      
      <div className="grid gap-10 p-6 sm:p-10 md:grid-cols-[1.05fr_1fr] md:gap-10 md:p-16">
        <div className={`flex flex-col justify-between ${textAlign}`} dir={t.dir}>
          <div>
            <div className={editorialEyebrow}>
              <span className="h-px w-6 bg-slate-300" />
              <span>{isRtl ? "پلاتفۆرم" : "Platform"}</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-400">{t.bentoBadge}</span>
            </div>

            <h3
              className={`mt-6 text-[clamp(1.75rem,3vw,2.75rem)] font-semibold tracking-[-0.02em] text-slate-900 ${
                isRtl ? "leading-[1.45]" : "leading-[1.08]"
              }`}
            >
              {t.bentoTitleA}
              <br />
              <span className="text-[#2A5BFF]">{t.bentoTitleB}</span>
            </h3>

            <p className="mt-5 max-w-[46ch] text-[15px] font-normal leading-[1.7] text-slate-500">
              {t.bentoBody}
            </p>
          </div>

          <div className={`mt-10 ${editorialRule} pt-6`}>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-3 text-[13px] text-slate-600 sm:grid-cols-2">
              {[
                { k: "01", v: isRtl ? "بنکەی داتای تایبەتی" : "Career-memory capture" },
                { k: "02", v: isRtl ? "هەڵسەنگاندنی ATS" : "ATS-grade formatting" },
                { k: "03", v: isRtl ? "گونجاندن بۆ ڕۆڵ" : "Role-tailored wording" },
                { k: "04", v: isRtl ? "هەناردەی PDF" : "Recruiter-ready PDF" },
              ].map((it) => (
                <li key={it.k} className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tabular-nums text-slate-400">{it.k}</span>
                  <span className="font-medium tracking-tight">{it.v}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/dashboard"
                className="group inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-slate-800"
              >
                {t.bentoCta}
                <DirectionArrow language={language} className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/templates"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-slate-700 underline decoration-slate-300 decoration-[1.5px] underline-offset-[6px] transition-colors hover:text-slate-900 hover:decoration-slate-500"
              >
                {isRtl ? "قاڵبەکان" : "Browse templates"}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative hidden min-h-[420px] items-center justify-center md:flex" dir="ltr">
          <div className="relative flex h-[420px] w-full items-center justify-center">
            <div className="relative z-10 w-[70%] rounded-lg shadow-[0_30px_50px_-24px_rgba(15,23,42,0.28)] ring-1 ring-slate-200/70">
              <CenterCardSVG />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BentoStandOutCard = ({ language }: { language: Language }) => {
  const t = copy[language];
  const isRtl = language !== "en";
  const textAlign = isRtl ? "text-right" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`${editorialCard} flex min-h-[380px] flex-col justify-between p-6 sm:min-h-[460px] sm:p-10 ${textAlign}`}
    >
      

      <div dir={t.dir} className="relative z-10 max-w-[30ch]">
        <div className={editorialEyebrow}>
          <span className="h-px w-6 bg-slate-300" />
          {isRtl ? "دەربکەوە" : "Signal"}
        </div>
        <h3 className={`mt-5 text-[clamp(1.4rem,2.1vw,1.75rem)] font-semibold tracking-[-0.015em] text-slate-900 ${isRtl ? "leading-[1.45]" : "leading-[1.15]"}`}>
          {t.standTitleA}
          <br />
          <span className="text-slate-500">{t.standTitleB}</span>
        </h3>
        <p className="mt-4 text-[14px] font-normal leading-[1.7] text-slate-500">
          {t.standBody}
        </p>
      </div>

      <div className="relative z-10 mt-8" dir="ltr">
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1.5 font-semibold tabular-nums tracking-tight text-slate-900">
            <span className="text-[42px] leading-none">+42</span>
            <span className="text-lg text-[#2A5BFF]">%</span>
          </div>
          <svg viewBox="0 0 120 40" className="h-11 w-32" fill="none">
            <path d="M2,32 L18,28 L34,30 L52,20 L70,24 L86,14 L104,16 L118,6" stroke="#2A5BFF" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="118" cy="6" r="2.5" fill="#2A5BFF" />
          </svg>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 z-0 flex h-[180px] w-[160px] items-end justify-center opacity-90 sm:h-[230px] sm:w-[200px]"
        style={{ [isRtl ? "left" : "right"]: "-12px" }}
        dir="ltr"
      >
        <motion.img
          src="/images/bento/3d guy transparent.png"
          alt={t.characterAlt}
          className="h-full w-full select-none object-contain object-bottom"
          draggable={false}
          style={{ transform: isRtl ? "scaleX(-1)" : "none", filter: "drop-shadow(0 20px 24px rgba(15,23,42,0.10))" }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

const BentoSecurityCard = ({ language }: { language: Language }) => {
  const t = copy[language];
  const isRtl = language !== "en";
  const textAlign = isRtl ? "text-right" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
      className={`${editorialCard} flex min-h-[380px] flex-col justify-between p-6 sm:min-h-[460px] sm:p-10 ${textAlign}`}
    >
      

      <div dir={t.dir} className="relative z-10 max-w-[30ch]">
        <div className={editorialEyebrow}>
          <span className="h-px w-6 bg-slate-300" />
          {isRtl ? "متمانە" : "Trust"}
        </div>
        <h3 className={`mt-5 text-[clamp(1.4rem,2.1vw,1.75rem)] font-semibold tracking-[-0.015em] text-slate-900 ${isRtl ? "leading-[1.45]" : "leading-[1.15]"}`}>
          {t.securityTitleA}
          <br />
          <span className="text-slate-500">{t.securityTitleB}</span>
        </h3>
        <p className="mt-4 text-[14px] font-normal leading-[1.7] text-slate-500">
          {t.securityBody}
        </p>
      </div>


      <div
        className="pointer-events-none absolute bottom-4 z-0 flex h-[150px] w-[150px] items-center justify-center opacity-95 sm:h-[190px] sm:w-[190px]"
        style={{ [isRtl ? "left" : "right"]: "-8px" }}
        dir="ltr"
      >
        <motion.img
          src="/images/bento/sheild transparent.png"
          alt={t.shieldAlt}
          className="h-full w-full select-none object-contain"
          draggable={false}
          style={{ filter: "drop-shadow(0 20px 30px rgba(42,91,255,0.16))" }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
};

const BentoCreateWinCard = ({ language }: { language: Language }) => {
  const t = copy[language];
  const isRtl = language !== "en";
  const textAlign = isRtl ? "text-right" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`${editorialCard} w-full`}
    >
      
      <div className="p-6 sm:p-10 md:p-14">
        <div className={`mx-auto flex max-w-3xl flex-col ${textAlign}`} dir={t.dir}>
          <div className={editorialEyebrow}>
            <span className="h-px w-6 bg-slate-300" />
            {isRtl ? "هەناردە" : "Export"}
          </div>
          <h3 className={`mt-5 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold tracking-[-0.015em] text-slate-900 ${isRtl ? "leading-[1.4]" : "leading-[1.12]"}`}>
            {t.downloadTitlePrefix}
            <span className="text-[#2A5BFF]">{t.downloadTitleHighlight}</span>
          </h3>
          <p className="mt-4 max-w-[52ch] text-[14px] font-normal leading-[1.7] text-slate-500 sm:text-[15px]">
            {t.downloadBody}
          </p>

          <div
            className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
            dir="ltr"
          >
            {[
              { k: "PDF", s: ".pdf", d: "Recruiter-ready" },
              { k: "DOCX", s: ".docx", d: "Fully editable" },
              { k: "TXT", s: ".txt", d: "ATS plain-text" },
            ].map((f) => (
              <div
                key={f.k}
                className="flex items-center gap-3 rounded-xl border border-[#E7E5DE] bg-white px-4 py-3"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-900 text-white">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5 font-mono text-[11px] tabular-nums">
                    <span className="font-semibold text-slate-900">{f.k}</span>
                    <span className="text-slate-400">{f.s}</span>
                  </div>
                  <div className="truncate text-[11.5px] text-slate-500">{f.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] tabular-nums text-slate-500"
            dir="ltr"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
              300 DPI
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
              A4 / Letter
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" strokeWidth={2} />
              Selectable text
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
};

/* ── Workflow ticker: 4-step process strip ── */
function WorkflowStrip({ language }: { language: Language }) {
  const isRtl = language !== "en";
  const steps = isRtl
    ? [
        { k: "01", t: "بیرەوەری", d: "زانیاری کاریت هاوردە بکە" },
        { k: "02", t: "پڕۆفایل", d: "دەرهێنانی ئوتۆماتیکی" },
        { k: "03", t: "گونجاندن", d: "بۆ ڕۆڵی مەبەست" },
        { k: "04", t: "هەناردە", d: "PDF ئامادە" },
      ]
    : [
        { k: "01", t: "Memory", d: "Import your career history" },
        { k: "02", t: "Profile", d: "Auto-structured extraction" },
        { k: "03", t: "Tailor", d: "Optimize per role" },
        { k: "04", t: "Export", d: "Recruiter-ready PDF" },
      ];

  return (
    <div className={`${editorialCard} p-0`} dir="ltr">
      <div className="grid grid-cols-2 divide-x divide-y divide-[#E7E5DE] md:grid-cols-4 md:divide-y-0">
        {steps.map((s, i) => (
          <motion.div
            key={s.k}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative flex flex-col justify-between p-6 sm:p-8 min-h-[160px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold tabular-nums tracking-[0.22em] text-slate-400">
                {s.k}
              </span>
              {i < steps.length - 1 && (
                <span className="hidden md:inline-block h-px w-6 bg-slate-300 opacity-60 group-hover:bg-[#2A5BFF] transition-colors" />
              )}
            </div>
            <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "text-right" : "text-left"}>
              <div className="text-[15px] font-semibold tracking-tight text-slate-900">
                {s.t}
              </div>
              <div className="mt-1 text-[12px] font-medium leading-[1.55] text-slate-500">
                {s.d}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function FAQSection({ language }: { language: Language }) {
  const t = copy[language];
  const isRtl = language !== "en";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div id="faq" className="mx-auto mt-20 w-full max-w-4xl sm:mt-28" dir="ltr">
      <div className="mx-auto max-w-3xl text-center" dir={t.dir}>
          <div className={`${editorialEyebrow} justify-center`} dir="ltr">
            <span className="h-px w-6 bg-slate-300" />
            <span>§ 03</span>
            <span className="text-slate-300">·</span>
            <span>{isRtl ? "پرسیارەکان" : "Questions"}</span>
          </div>
          <h2
            className={`mt-6 text-[clamp(1.75rem,3.4vw,2.75rem)] font-semibold tracking-[-0.025em] text-slate-900 ${
              isRtl ? "leading-[1.35]" : "leading-[1.06]"
            }`}
          >
            {t.faqTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-[14px] font-normal leading-[1.7] text-slate-500">
            {isRtl
              ? "پێش دەستپێکردن، ئەمە باوترین پرسیارەکانن دەربارەی مێمۆری سیڤی."
              : "Before you start — the questions candidates ask us most."}
          </p>
      </div>

        <div className="mx-auto mt-12 max-w-3xl border-t border-[#E7E5DE]" dir={t.dir}>
          {t.faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={i} className="border-b border-[#E7E5DE]">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="group grid w-full grid-cols-[2.25rem_minmax(0,1fr)_2.25rem] items-center gap-3 py-6 text-center focus:outline-none"
                >
                  <div className="contents">
                    <span className="font-mono text-[10px] font-semibold tabular-nums tracking-[0.18em] text-slate-400">
                      {`0${i + 1}`}
                    </span>
                    <span className="text-center text-[15px] font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-[#2A5BFF] sm:text-[17px]">
                      {item.q}
                    </span>
                  </div>
                  <span
                    className={`mx-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all ${
                      open ? "border-[#2A5BFF] bg-[#2A5BFF] text-white" : "border-slate-300 text-slate-500"
                    }`}
                  >
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="mx-auto max-w-[62ch] px-8 pb-6 text-center text-[14px] font-normal leading-[1.75] text-slate-600">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
    </div>
  );
}

/* ── Closing CTA: bold ink panel, editorial framing ── */
function ClosingCta({ language }: { language: Language }) {
  const t = copy[language];
  const isRtl = language !== "en";
  const onboardingDone = useAppStore((s) => s.onboardingDone);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-20 overflow-hidden rounded-[28px] bg-slate-950 sm:mt-28"
      id="closing-cta"
    >
      {/* Precision grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(80% 80% at 50% 20%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(80% 80% at 50% 20%, black 20%, transparent 80%)",
        }}
      />
      {/* Subtle accent wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[380px] w-[720px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(42,91,255,0.35), rgba(42,91,255,0.08) 60%, transparent 80%)",
        }}
      />

      <div className="relative px-6 py-16 sm:px-14 sm:py-24" dir="ltr">
        {/* Top rail */}
        <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-white/50">
          <span className="tabular-nums">§ 04</span>
          <span className="h-px w-6 bg-white/25" />
          <span>{isRtl ? "دەست پێبکە" : "Begin"}</span>
        </div>

        <h2
          className={`mt-8 max-w-[22ch] text-[clamp(2rem,5.2vw,4rem)] font-semibold tracking-[-0.03em] text-white ${
            isRtl ? "text-right leading-[1.25]" : "leading-[1.02]"
          }`}
          dir={t.dir}
        >
          {t.ctaTitle}
        </h2>

        <p
          className={`mt-6 max-w-[52ch] text-[15px] font-normal leading-[1.75] text-white/60 ${
            isRtl ? "text-right" : ""
          }`}
          dir={t.dir}
        >
          {t.ctaBody}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <CtaButton
            id="closing-cta-btn"
            onboardingDone={onboardingDone}
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold text-slate-900 transition-all hover:bg-slate-100"
          >
            {t.ctaPrimary}
            <DirectionArrow language={language} className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </CtaButton>
          <Link
            to="/templates"
            id="closing-templates-btn"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3.5 text-[14px] font-semibold text-white/90 transition-colors hover:border-white/40 hover:text-white"
          >
            {t.ctaSecondary}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Trust rail */}
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
          {t.trust.map((item, i) => (
            <div key={item} className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] font-semibold tabular-nums tracking-[0.22em] text-white/40">
                {`0${i + 1}`}
              </span>
              <span className="text-[12.5px] font-medium text-white/80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function BentoGridSection({ language }: { language: Language }) {
  const isRtl = language !== "en";

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#FAFAF7] px-5 pb-24 pt-8 sm:px-8 sm:pb-32"
    >
      <EditorialSectionHeader
        index="§ 02"
        kicker={isRtl ? "پلاتفۆرم / تایبەتمەندی" : "Platform / Features"}
        titleTop={
          isRtl ? "پلاتفۆرمێک بۆ ئەوانەی" : "A platform engineered for the"
        }
        titleBottom={
          isRtl ? "دەیانەوێت جیاواز دەربکەون." : "details recruiters actually read."
        }
        dir={isRtl ? "rtl" : "ltr"}
      />

      <div className="mx-auto mt-14 max-w-6xl space-y-5 sm:mt-20">
        <BentoHeroCard language={language} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <BentoStandOutCard language={language} />
          <BentoSecurityCard language={language} />
        </div>

        <BentoCreateWinCard language={language} />

        <WorkflowStrip language={language} />

        <div data-gsap-reveal>
          <FAQSection language={language} />
        </div>

        <div data-gsap-reveal>
          <ClosingCta language={language} />
        </div>
      </div>
    </section>
  );
}

/* ── Editorial footer: academic, professional, ultra-SaaS ── */
function SiteFooter({ language }: { language: Language }) {
  const isRtl = language !== "en";
  const dir = isRtl ? "rtl" : "ltr";
  const year = new Date().getFullYear();

  const t =
    language === "ku"
      ? {
          tagline:
            "پلاتفۆرمێکی زانستی بۆ نووسینی سیڤی، دیزاینکراو بۆ ڕاوێژکاران و تاقیکاری ATS.",
          product: "بەرهەم",
          resources: "سەرچاوەکان",
          company: "کۆمپانیا",
          legal: "یاسایی",
          productLinks: [
            { l: "تایبەتمەندی", h: "features" },
            { l: "قاڵبەکان", to: "/templates" as const },
            { l: "پرسیارە دووبارەکان", h: "faq" },
            { l: "دەست پێبکە", h: "closing-cta" },
          ],
          resourceLinks: [
            { l: "ڕێبەری سیڤی", to: "/" as const },
            { l: "ATS", to: "/" as const },
            { l: "چاوپێکەوتن", to: "/interview" as const },
            { l: "بەڵگەنامەکان", to: "/" as const },
          ],
          companyLinks: [
            { l: "دەربارە", to: "/" as const },
            { l: "پەیوەندی", to: "/" as const },
            { l: "بلاگ", to: "/" as const },
          ],
          legalLinks: [
            { l: "نهێنی", to: "/privacy" as const },
            { l: "مەرجەکان", to: "/terms" as const },
          ],
          rights: "هەموو مافەکان پارێزراون",
          made: "بە وردی دیزاینکراو",
          status: "هەموو سیستەمەکان کار دەکەن",
        }
      : language === "ar"
        ? {
            tagline:
              "منصّة أكاديمية لبناء السيرة الذاتية، مصمّمة للمُوظّفين ومُهيَّأة لأنظمة ATS.",
            product: "المنتج",
            resources: "المصادر",
            company: "الشركة",
            legal: "قانوني",
            productLinks: [
              { l: "المميّزات", h: "features" },
              { l: "القوالب", to: "/templates" as const },
              { l: "الأسئلة الشائعة", h: "faq" },
              { l: "ابدأ الآن", h: "closing-cta" },
            ],
            resourceLinks: [
              { l: "دليل السيرة الذاتية", to: "/" as const },
              { l: "ATS", to: "/" as const },
              { l: "المقابلات", to: "/interview" as const },
              { l: "التوثيق", to: "/" as const },
            ],
            companyLinks: [
              { l: "من نحن", to: "/" as const },
              { l: "اتصل بنا", to: "/" as const },
              { l: "المدوّنة", to: "/" as const },
            ],
            legalLinks: [
              { l: "الخصوصية", to: "/privacy" as const },
              { l: "الشروط", to: "/terms" as const },
            ],
            rights: "جميع الحقوق محفوظة",
            made: "مصمّمة بعناية",
            status: "جميع الأنظمة تعمل",
          }
        : {
            tagline:
              "An academic-grade platform for résumé craft — engineered for recruiters, tuned for ATS.",
            product: "Product",
            resources: "Resources",
            company: "Company",
            legal: "Legal",
            productLinks: [
              { l: "Features", h: "features" },
              { l: "Templates", to: "/templates" as const },
              { l: "FAQ", h: "faq" },
              { l: "Get started", h: "closing-cta" },
            ],
            resourceLinks: [
              { l: "Resume guide", to: "/" as const },
              { l: "ATS handbook", to: "/" as const },
              { l: "Interview mode", to: "/interview" as const },
              { l: "Documentation", to: "/" as const },
            ],
            companyLinks: [
              { l: "About", to: "/" as const },
              { l: "Contact", to: "/" as const },
              { l: "Blog", to: "/" as const },
            ],
            legalLinks: [
              { l: "Privacy", to: "/privacy" as const },
              { l: "Terms", to: "/terms" as const },
            ],
            rights: "All rights reserved",
            made: "Crafted with precision",
            status: "All systems operational",
          };

  const columns = [
    { title: t.product, links: t.productLinks },
    { title: t.resources, links: t.resourceLinks },
    { title: t.company, links: t.companyLinks },
    { title: t.legal, links: t.legalLinks },
  ];

  return (
    <footer
      className="relative mt-24 border-t border-[#E7E5DE] bg-[#FAFAF7] sm:mt-32"
      dir={dir}
    >
      {/* Hairline accent */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent"
      />

      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        {/* Top meta rail */}
        <div
          className="flex flex-col gap-3 border-b border-[#E7E5DE] pb-8 sm:flex-row sm:items-center sm:justify-between"
          dir="ltr"
        >
          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500">
            <span className="tabular-nums">§ 05</span>
            <span className="h-px w-6 bg-slate-300" />
            <span>Colophon</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.14em] text-slate-500">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="uppercase tracking-[0.22em]">{t.status}</span>
          </div>
        </div>

        {/* Brand + columns */}
        <div className="mt-12 grid gap-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] md:gap-16">
          {/* Brand block */}
          <div className={isRtl ? "text-right" : "text-left"}>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <img
                src="/logo/MemoryCV Logo Icon Only.png"
                alt="MemoryCV"
                className="h-8 w-8"
              />
              <span className="text-[17px] font-semibold tracking-[-0.01em] text-slate-900">
                MemoryCV
              </span>
            </Link>
            <p className="mt-5 max-w-[38ch] text-[13.5px] leading-[1.75] text-slate-500">
              {t.tagline}
            </p>

            {/* Editorial signature line */}
            <div
              className="mt-8 flex items-center gap-3 border-t border-[#E7E5DE] pt-5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-slate-400"
              dir="ltr"
            >
              <span>MMXXVI</span>
              <span className="h-px w-6 bg-slate-300" />
              <span>{t.made}</span>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-6">
            {columns.map((col) => (
              <div key={col.title} className={isRtl ? "text-right" : "text-left"}>
                <h4 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-slate-900">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => {
                    const label = link.l;
                    if ("h" in link && link.h) {
                      return (
                        <li key={label}>
                          <a
                            href={`#${link.h}`}
                            className="text-[13px] text-slate-500 transition-colors hover:text-slate-900"
                          >
                            {label}
                          </a>
                        </li>
                      );
                    }
                    if ("to" in link && link.to) return (
                      <li key={label}>
                        <Link
                          to={link.to}
                          className="text-[13px] text-slate-500 transition-colors hover:text-slate-900"
                        >
                          {label}
                        </Link>
                      </li>
                    );
                    return null;
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 flex flex-col-reverse items-start gap-4 border-t border-[#E7E5DE] pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-mono text-[11px] tracking-[0.06em] text-slate-500" dir="ltr">
            © {year} MemoryCV · {t.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2" dir="ltr">
            {t.legalLinks.map((l) => (
              <Link
                key={l.l}
                to={l.to}
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 transition-colors hover:text-slate-900"
              >
                {l.l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function Landing() {
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const onboardingDone = useAppStore((s) => s.onboardingDone);
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const t = copy[language];

  // Landing shows only for logged-out / brand-new users. Returning users
  // (finished onboarding or signed in) go straight to the app.
  useEffect(() => {
    if (isSignedIn || onboardingDone) {
      navigate({ to: "/jobs", replace: true });
    }
  }, [isSignedIn, onboardingDone, navigate]);


  return (
    <LandingScrollMotion>
      <div className="landing-page page-shell font-doran bg-background text-foreground" dir={t.dir} lang={t.lang}>
        <Header
          language={language}
          onSelectLanguage={(lang) => setLanguage(lang)}
        />
        <main>
          <HeroV2 language={language} />
          <div data-gsap-reveal>
            <TrustedMarquee language={language} />
          </div>
          <div data-gsap-depth>
            <div data-gsap-reveal>
              <StatsSection language={language} />
            </div>
          </div>
          <div data-gsap-reveal>
            <BentoGridSection language={language} />
          </div>
        </main>
        <div data-gsap-reveal>
          <SiteFooter language={language} />
        </div>
      </div>
    </LandingScrollMotion>
  );
}

