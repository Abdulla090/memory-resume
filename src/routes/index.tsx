import { createFileRoute, Link } from "@tanstack/react-router";
import { animate, motion, useMotionValue, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { TrustedMarquee } from "../components/TrustedMarquee";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  Download,
  FileText,
  Globe,
  LockKeyhole,
  Menu,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  ArrowUpRight,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { HeroV2 } from "@/components/HeroV2";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MemoryCV - Turn memory into a professional resume" },
      {
        name: "description",
        content:
          "Turn your professional memory into a clear, polished, role-ready resume.",
      },
    ],
  }),
  component: Landing,
});

export type Language = "en" | "ku";

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
      { icon: TrendingUp, value: 85, suffix: "%", label: "higher interview rate", id: "stat-interviews" },
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
        a: "MemoryCV asks you targeted questions about your career, then uses advanced AI to instantly organize and write a clean, professional resume tailored to your target role."
      },
      {
        q: "Will my resume be ATS-friendly?",
        a: "Yes. All our templates are designed to be easily read by Applicant Tracking Systems (ATS), ensuring your resume passes automated screenings."
      },
      {
        q: "Can I export my resume to PDF?",
        a: "Absolutely. Once you are happy with your resume, you can download it as a high-quality PDF ready to be attached to your job applications."
      },
      {
        q: "Do you offer cover letter generation?",
        a: "Currently, our primary focus is generating world-class resumes. However, cover letter generation based on your resume profile is a planned feature!"
      }
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
      { icon: TrendingUp, value: 85, suffix: "%", label: "زیاتر بانگهێشتی چاوپێکەوتن", id: "stat-interviews" },
      { icon: Star, value: 49, suffix: "/5.0", label: "هەڵسەنگاندنی بەکارهێنەران", id: "stat-rating" },
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
    downloadBody:
      "دوای ڕێکخستنی پڕۆفایل، سیڤییەکەت بە قاڵبی پاک و ئامادەی ناردن دەبینیت.",
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
        a: "مێمۆری سیڤی پرسیاری ورد لەسەر ئەزموونەکانت دەکات، پاشان زیرەکی دەستکرد بەکاردێنێت بۆ نووسین و ڕێکخستنی سیڤییەکی پیشەیی کە بۆ ڕۆڵی مەبەستت گونجاو بێت."
      },
      {
        q: "ئایا سیڤییەکەم بۆ سیستەمی ATS گونجاوە؟",
        a: "بەڵێ. سەرجەم قاڵبەکانمان بە شێوەیەکە کە بە ئاسانی لەلایەن سیستەمەکانی بەدواداچوونی داواکاران (ATS) دەخوێندرێنەوە، کە دڵنیایی دەدات لە دەرچوونی سیڤییەکەت لە پشکنینە ئۆتۆماتیکییەکان."
      },
      {
        q: "دەتوانم سیڤییەکەم بە فۆرماتی PDF دابگرم؟",
        a: "بێگومان. کاتێک لە سیڤییەکەت ڕازی بوویت، دەتوانیت بە کوالێتی بەرز وەکو PDF دایبگریت و ئامادەیە بۆ ناردن لەگەڵ داواکارییەکانت."
      },
      {
        q: "ئایا خزمەتگوزاری نووسینی نامەی پێشەکی (Cover Letter)تان هەیە؟",
        a: "لە ئێستادا تەرکیزمان لەسەر دروستکردنی سیڤییەکی پێشکەوتووە، بەڵام خزمەتگوزاری دروستکردنی نامەی پێشەکی لەسەر بنەمای سیڤییەکەت یەکێکە لەو تایبەتمەندییانەی کە لە پلاندایە."
      }
    ],
    characterAlt: "وێنەی کەسایەتی بۆ کار",
    shieldAlt: "نیشانی پاراستنی داتا",
  },
} as const;

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(false);

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

export function Header({ language, onToggleLanguage }: { language: Language; onToggleLanguage: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = copy[language];

  // Raw scroll progress 0→1 (clamped to first 120px)
  const rawScroll = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => rawScroll.set(Math.min(window.scrollY / 120, 1));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [rawScroll]);

  // Spring-smooth version of the scroll progress
  const progress = useSpring(rawScroll, { stiffness: 160, damping: 28, mass: 0.6 });

  // Interpolated style values — morph from full-width bar → centered pill
  const maxW         = useTransform(progress, [0, 1], ["1280px", "780px"]);
  const marginTop    = useTransform(progress, [0, 1], ["0px",    "12px"]);
  const paddingX     = useTransform(progress, [0, 1], ["24px",   "20px"]);
  const height       = useTransform(progress, [0, 1], ["64px",   "52px"]);
  const borderRadius = useTransform(progress, [0, 1], ["0px",    "999px"]);
  const bgOpacity    = useTransform(progress, [0, 1], [0,        0.85]);
  const shadowOpacity= useTransform(progress, [0, 1], [0,        1]);
  const borderOpacity= useTransform(progress, [0, 1], [0,        1]);
  const gap          = useTransform(progress, [0, 1], ["0px",    "8px"]);

  // Nav link sizes
  const navPx        = useTransform(progress, [0, 1], ["16px",   "12px"]);
  const navPy        = useTransform(progress, [0, 1], ["8px",    "6px"]);
  const navFontSize  = useTransform(progress, [0, 1], ["14px",   "13px"]);

  // CTA button
  const ctaPx        = useTransform(progress, [0, 1], ["20px",   "14px"]);
  const ctaPy        = useTransform(progress, [0, 1], ["10px",   "7px"]);
  const ctaFontSize  = useTransform(progress, [0, 1], ["14px",   "12px"]);

  return (
    <>
      {/* ── DESKTOP animated pill header (hidden on mobile) ── */}
      <header className="fixed left-0 right-0 top-0 z-50 pointer-events-none hidden md:block" dir="ltr">
        <motion.div
          className="relative mx-auto pointer-events-auto flex items-center justify-between"
          style={{
            maxWidth: maxW,
            marginTop,
            paddingLeft: paddingX,
            paddingRight: paddingX,
            height,
            borderRadius,
            gap,
            backgroundColor: useTransform(bgOpacity, (v) => `rgba(255,255,255,${v})`),
            boxShadow: useTransform(shadowOpacity, (v) => `0 8px 32px rgba(0,0,0,${v * 0.09}), 0 1px 3px rgba(0,0,0,${v * 0.05})`),
            border: useTransform(borderOpacity, (v) => `1px solid rgba(203,213,225,${v * 0.6})`),
            backdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 16}px)`) as any,
            WebkitBackdropFilter: useTransform(bgOpacity, (v) => `blur(${v * 16}px)`) as any,
          }}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2 cursor-pointer" id="nav-logo">
            <img src="/logo/MemoryCV Logo Icon Only.png" alt="MemoryCV" className="h-16 w-16 rounded-lg object-contain" />
            <span className="text-xl font-bold tracking-tight text-slate-900">MemoryCV</span>
          </Link>

          {/* Center nav */}
          <nav className="hidden items-center md:flex" style={{ gap: "2px" }}>
            {t.nav.map((item) => (
              <motion.div key={item.label} style={{ paddingLeft: navPx, paddingRight: navPx, paddingTop: navPy, paddingBottom: navPy }}>
                <Link
                  to={item.to as any}
                  hash={(item as any).hash}
                  className="rounded-lg font-semibold text-slate-600 transition-colors hover:text-slate-900"
                  style={{ fontSize: navFontSize } as unknown as React.CSSProperties}
                  dir={t.dir}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex shrink-0 items-center gap-2">
            <motion.button
              onClick={onToggleLanguage}
              className="hidden items-center gap-1.5 rounded-lg font-semibold text-slate-600 transition-colors hover:text-slate-900 md:flex overflow-hidden"
              style={{ fontSize: navFontSize } as unknown as React.CSSProperties}
              aria-label="Change language"
              dir="ltr"
            >
              <Globe className="h-4 w-4 shrink-0" />
              <motion.span
                style={{
                  maxWidth: useTransform(progress, [0.6, 1], ["80px", "0px"]),
                  opacity: useTransform(progress, [0.5, 0.9], [1, 0]),
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "inline-block",
                }}
              >
                {t.toggle}
              </motion.span>
            </motion.button>

            <motion.div style={{ paddingLeft: ctaPx, paddingRight: ctaPx, paddingTop: ctaPy, paddingBottom: ctaPy }} className="hidden md:block rounded-full bg-blue-600 shadow-sm transition-shadow hover:bg-blue-700 hover:shadow-md">
              <Link
                to="/dashboard"
                id="nav-free-trial"
                className="block whitespace-nowrap font-bold text-white"
                style={{ fontSize: ctaFontSize } as unknown as React.CSSProperties}
                dir={t.dir}
              >
                {t.navCta}
              </Link>
            </motion.div>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 md:hidden"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={t.menu}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.div>

      </header>

      {/* ── MOBILE solid header (md:hidden) ── */}
      <header
        className="fixed left-0 right-0 top-0 z-50 items-center justify-between px-4 hidden"
        style={{ height: "56px", backgroundColor: "rgba(255,255,255,0.97)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(226,232,240,0.8)" }}
        dir="ltr"
      >
        <Link to="/" className="flex shrink-0 items-center gap-2" id="nav-logo-mobile">
          <img src="/logo/MemoryCV Logo Icon Only.png" alt="MemoryCV" className="h-16 w-16 rounded-lg object-contain" />
          <span className="text-xl font-bold tracking-tight text-slate-900">MemoryCV</span>
        </Link>
        <button
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={t.menu}
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="mob-close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span key="mob-open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
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
            className="fixed inset-0 z-40 md:hidden"
            style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", backgroundColor: "rgba(255,255,255,0.96)" }}
          >
            <div className="absolute inset-0" onClick={() => setMobileOpen(false)} />

            <div className="relative z-10 flex h-full flex-col items-center justify-center gap-3 px-8" dir={t.dir}>

              <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.25 }} className="mb-8 flex items-center gap-2.5">
                <img src="/logo/MemoryCV Logo Icon Only.png" alt="MemoryCV" className="h-20 w-20 rounded-xl object-contain" />
                <span className="text-3xl font-bold tracking-tight text-slate-900">MemoryCV</span>
              </motion.div>

              {t.nav.map((item: { label: string; to: string; hash?: string }, i: number) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06, duration: 0.24, ease: "easeOut" }} className="w-full max-w-xs">
                  <Link
                    to={item.to as any}
                    hash={(item as any).hash}
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-2xl border border-slate-100 bg-white/80 px-6 py-4 text-base font-semibold text-slate-800 shadow-sm transition-all active:scale-95 hover:border-blue-200 hover:text-blue-600"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + t.nav.length * 0.06, duration: 0.24, ease: "easeOut" }} className="w-full max-w-xs">
                <button
                  onClick={() => { onToggleLanguage(); setMobileOpen(false); }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white/80 px-6 py-4 text-base font-semibold text-slate-700 shadow-sm transition-all active:scale-95 hover:border-blue-200 hover:text-blue-600"
                >
                  <Globe className="h-4 w-4" />
                  {t.toggle}
                </button>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + (t.nav.length + 1) * 0.06, duration: 0.24, ease: "easeOut" }} className="mt-4 w-full max-w-xs">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 text-base font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.28)] transition-all active:scale-95 hover:bg-blue-700"
                  dir={t.dir}
                >
                  {t.navCta}
                </Link>
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
      <div className="h-14 md:h-16 w-full flex-none" />
    </>
  );
}

export const LeftCardSVG = () => (
  <svg viewBox="0 0 240 320" className="h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="left-header-gradient" x1="0" y1="0" x2="240" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2563eb" />
        <stop offset="1" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
    <rect width="240" height="320" rx="16" fill="#ffffff" />
    <rect x="0.5" y="0.5" width="239" height="319" rx="15.5" fill="none" stroke="#e2e8f0" />
    <path d="M0 16C0 7.16 7.16 0 16 0H224C232.84 0 240 7.16 240 16V80H0V16Z" fill="url(#left-header-gradient)" />
    <circle cx="48" cy="40" r="24" fill="white" fillOpacity="0.2" />
    <circle cx="48" cy="40" r="20" fill="white" />
    <path d="M48 34C44.69 34 42 36.69 42 40C42 43.31 44.69 46 48 46C51.31 46 54 43.31 54 40C54 36.69 51.31 34 48 34ZM38 40C38 34.48 42.48 30 48 30C53.52 30 58 34.48 58 40C58 45.52 53.52 50 48 50C42.48 50 38 45.52 38 40Z" fill="#2563eb" />
    <text x="84" y="36" fill="white" fontSize="16" fontWeight="bold" fontFamily="system-ui, sans-serif">Sarah Chen</text>
    <text x="84" y="52" fill="#bfdbfe" fontSize="11" fontFamily="system-ui, sans-serif">Senior UX Designer</text>
    <text x="24" y="110" fill="#2563eb" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="system-ui, sans-serif">PROFESSIONAL EXPERIENCE</text>
    <rect x="24" y="124" width="2" height="24" fill="#3b82f6" />
    <text x="34" y="132" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">Google</text>
    <text x="216" y="132" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="system-ui, sans-serif">2021 - Present</text>
    <text x="34" y="146" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">Senior Product Designer</text>
    <rect x="24" y="164" width="2" height="24" fill="#cbd5e1" />
    <text x="34" y="172" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">Figma</text>
    <text x="216" y="172" fill="#64748b" fontSize="9" textAnchor="end" fontFamily="system-ui, sans-serif">2019 - 2021</text>
    <text x="34" y="186" fill="#475569" fontSize="10" fontFamily="system-ui, sans-serif">UX Lead</text>
    <text x="24" y="224" fill="#2563eb" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="system-ui, sans-serif">CORE SKILLS</text>
    <rect x="24" y="234" width="56" height="20" rx="10" fill="#eff6ff" />
    <text x="52" y="247" fill="#1d4ed8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">UI Design</text>
    <rect x="84" y="234" width="60" height="20" rx="10" fill="#eff6ff" />
    <text x="114" y="247" fill="#1d4ed8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">Prototyping</text>
    <rect x="148" y="234" width="68" height="20" rx="10" fill="#eff6ff" />
    <text x="182" y="247" fill="#1d4ed8" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="system-ui, sans-serif">User Testing</text>
    <path d="M24 286 L216 286" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 286 L170 286" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
    <text x="24" y="274" fill="#64748b" fontSize="8" fontFamily="system-ui, sans-serif">Profile Extraction Complete</text>
    <text x="216" y="274" fill="#2563eb" fontSize="9" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">100%</text>
  </svg>
);

export const CenterCardSVG = () => (
  <svg viewBox="0 0 280 400" className="h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="280" height="400" rx="8" fill="#ffffff" />
    <rect x="0.5" y="0.5" width="279" height="399" rx="7.5" fill="none" stroke="#e2e8f0" />
    <g transform="translate(190, 10)">
      <rect width="80" height="24" rx="12" fill="#eff6ff" stroke="#bfdbfe" />
      <text x="40" y="16" fill="#1d4ed8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">AI GENERATED</text>
    </g>
    <text x="140" y="56" fill="#0f172a" fontSize="18" fontWeight="bold" textAnchor="middle" fontFamily="system-ui, sans-serif">ALEXANDRA SMITH</text>
    <text x="140" y="68" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="system-ui, sans-serif">New York, NY - alexandra@email.com - (555) 123-4567</text>
    <path d="M20 80 L260 80" stroke="#f1f5f9" strokeWidth="1" />
    <text x="20" y="96" fill="#2563eb" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">PROFESSIONAL SUMMARY</text>
    <text x="20" y="110" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Results-driven Senior Engineer with 8+ years of experience in scalable web</text>
    <text x="20" y="120" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">architecture and cloud-native applications. Proven track record of leading</text>
    <text x="20" y="130" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">cross-functional teams to deliver enterprise-grade solutions.</text>
    <text x="20" y="156" fill="#2563eb" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">EXPERIENCE</text>
    <text x="20" y="172" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">TechCorp Industries</text>
    <text x="260" y="172" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">2020 - Present</text>
    <text x="20" y="182" fill="#64748b" fontSize="8" fontStyle="italic" fontFamily="system-ui, sans-serif">Senior Software Engineer</text>
    <circle cx="26" cy="194" r="1.5" fill="#3b82f6" />
    <text x="32" y="196" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Architected microservices migrating 2M+ users with 99.99% uptime.</text>
    <circle cx="26" cy="206" r="1.5" fill="#3b82f6" />
    <text x="32" y="208" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Reduced AWS infrastructure costs by 30% through resource optimization.</text>
    <text x="20" y="230" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">Innovate Software</text>
    <text x="260" y="230" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">2016 - 2020</text>
    <text x="20" y="240" fill="#64748b" fontSize="8" fontStyle="italic" fontFamily="system-ui, sans-serif">Software Engineer</text>
    <circle cx="26" cy="252" r="1.5" fill="#3b82f6" />
    <text x="32" y="254" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Developed RESTful APIs serving 50M+ requests monthly.</text>
    <circle cx="26" cy="264" r="1.5" fill="#3b82f6" />
    <text x="32" y="266" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Mentored 4 junior developers and established CI/CD best practices.</text>
    <text x="20" y="296" fill="#2563eb" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">EDUCATION</text>
    <text x="20" y="312" fill="#0f172a" fontSize="9" fontWeight="bold" fontFamily="system-ui, sans-serif">University of Technology</text>
    <text x="260" y="312" fill="#0f172a" fontSize="8" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">2012 - 2016</text>
    <text x="20" y="322" fill="#64748b" fontSize="8" fontStyle="italic" fontFamily="system-ui, sans-serif">Bachelor of Science in Computer Science</text>
    <text x="20" y="352" fill="#2563eb" fontSize="10" fontWeight="bold" fontFamily="system-ui, sans-serif">TECHNICAL SKILLS</text>
    <text x="20" y="368" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Languages: JavaScript, TypeScript, Python, Java, Go</text>
    <text x="20" y="380" fill="#475569" fontSize="7" fontFamily="system-ui, sans-serif">Frameworks: React, Node.js, Express, Django, Next.js</text>
  </svg>
);

export const RightCardSVG = () => (
  <svg viewBox="0 0 240 320" className="h-auto w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="right-header-gradient" x1="0" y1="0" x2="240" y2="100" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1e3a8a" />
        <stop offset="1" stopColor="#1e40af" />
      </linearGradient>
    </defs>
    <rect width="240" height="320" rx="16" fill="#ffffff" />
    <rect x="0.5" y="0.5" width="239" height="319" rx="15.5" fill="none" stroke="#e2e8f0" />
    <path d="M0 16C0 7.16 7.16 0 16 0H224C232.84 0 240 7.16 240 16V100H0V16Z" fill="url(#right-header-gradient)" />
    <text x="24" y="36" fill="#93c5fd" fontSize="10" fontWeight="bold" letterSpacing="1" fontFamily="system-ui, sans-serif">TARGET ROLE MATCH</text>
    <text x="24" y="76" fill="white" fontSize="42" fontWeight="900" fontFamily="system-ui, sans-serif">96<tspan fontSize="24" fill="#93c5fd">%</tspan></text>
    <rect x="24" y="124" width="24" height="24" rx="6" fill="#dcfce7" />
    <path d="M30 136L34 140L42 130" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <text x="56" y="136" fill="#0f172a" fontSize="12" fontWeight="bold" fontFamily="system-ui, sans-serif">Strong Match</text>
    <text x="56" y="148" fill="#64748b" fontSize="9" fontFamily="system-ui, sans-serif">Ready to apply for Senior Dev</text>
    <text x="24" y="184" fill="#2563eb" fontSize="9" fontWeight="bold" letterSpacing="1" fontFamily="system-ui, sans-serif">MATCH BREAKDOWN</text>
    <text x="24" y="206" fill="#334155" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">Required Skills</text>
    <text x="216" y="206" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">100%</text>
    <path d="M24 216 L216 216" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 216 L216 216" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
    <text x="24" y="238" fill="#334155" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">Experience Level</text>
    <text x="216" y="238" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">90%</text>
    <path d="M24 248 L216 248" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 248 L196 248" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
    <text x="24" y="270" fill="#334155" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">Keywords</text>
    <text x="216" y="270" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="system-ui, sans-serif">85%</text>
    <path d="M24 280 L216 280" stroke="#f1f5f9" strokeWidth="6" strokeLinecap="round" />
    <path d="M24 280 L180 280" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

function HeroCards() {
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
    <div ref={ref} className="relative flex w-full origin-top items-center justify-center" style={{ height: "clamp(340px,46vw,430px)" }} dir="ltr">
      <motion.div
        className="absolute rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
        style={{ width: "clamp(108px,17vw,190px)", zIndex: 10, x: leftX, y: leftY, rotate: leftRotate }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 70 }}
      >
        <LeftCardSVG />
      </motion.div>
      <motion.div
        className="absolute rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
        style={{ width: "clamp(108px,17vw,190px)", zIndex: 10, x: rightX, y: rightY, rotate: rightRotate }}
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

function DirectionArrow({ language, className }: { language: Language; className: string }) {
  return language === "ku" ? <ArrowLeft className={className} /> : <ArrowRight className={className} />;
}

function Hero({ language }: { language: Language }) {
  const t = copy[language];

  return (
    <section className="app-frame px-3 pb-0 pt-4 sm:px-6 sm:pt-6">
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

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.5 }} className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/dashboard"
              id="hero-cta"
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(37,99,235,0.5)] active:scale-95 sm:px-8 sm:py-3.5"
            >
              {t.heroCta}
              <DirectionArrow language={language} className="h-4 w-4" />
            </Link>
            <Link
              to="/templates"
              className="group inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-white/10 px-6 py-3 text-sm font-bold text-blue-50 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] transition-all hover:-translate-y-0.5 hover:bg-white/20 hover:text-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] active:scale-95 sm:px-8 sm:py-3.5"
            >
              {t.ctaSecondary}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>

        <div className="relative mx-auto" style={{ maxWidth: "min(760px,100%)", height: "clamp(340px,46vw,430px)", marginTop: "clamp(16px,4vw,48px)" }}>
          <HeroCards />
        </div>
      </div>
    </section>
  );
}

export function StatsSection({ language }: { language: Language }) {
  const t = copy[language];
  const textAlign = language === "ku" ? "text-right" : "text-left";

  return (
    <section className="app-frame relative px-4 pb-12 sm:px-6 sm:pb-24" style={{ paddingTop: "clamp(60px,10vw,140px)" }}>
      <div className="absolute right-10 top-20 -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute bottom-10 left-10 -z-10 h-80 w-80 rounded-full bg-sky-100/40 blur-3xl" />

      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-16 md:flex-row md:items-center">
        <motion.h2
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className={`text-[clamp(1.75rem,6vw,3.75rem)] font-extrabold ${language === "ku" ? "leading-[1.4]" : "leading-[1.18]"} tracking-tight text-slate-900 ${textAlign}`}
          dir={t.dir}
        >
          {t.statsTitleA}<br />
          <span className="text-blue-600">{t.statsTitleB}</span>
        </motion.h2>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="hidden shrink-0 sm:flex">
          <Link
            to="/dashboard"
            id="stats-free-trial"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_10px_20px_rgba(37,99,235,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)]"
            dir={t.dir}
          >
            {t.statsCta}
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {t.stats.map((s, i) => (
          <motion.div
            key={s.id}
            id={s.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(37,99,235,0.15)" }}
            className={`group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white/80 p-6 text-center shadow-lg backdrop-blur-xl sm:items-start sm:rounded-[2rem] sm:p-10 sm:${textAlign}`}
            dir={t.dir}
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-50/0 to-blue-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110">
              <s.icon className="h-6 w-6 text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-baseline justify-center text-4xl font-black tracking-tight text-slate-900 sm:justify-start">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-semibold text-slate-500">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const BentoHeroCard = ({ language }: { language: Language }) => {
  const t = copy[language];
  const textAlign = language === "ku" ? "text-right" : "text-left";

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative w-full overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-br from-[#e8f3ff] to-[#cce4ff] shadow-xl"
  >
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-[-10%] right-[10%] h-[200px] w-[400px] rounded-full bg-white/60 blur-2xl" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[300px] w-[600px] rounded-full bg-white/80 blur-3xl" />
    </div>

    <div className="relative z-10 grid gap-6 p-5 sm:p-10 md:grid-cols-[0.95fr_1.05fr] md:p-14">
      <div className={`relative z-20 flex flex-col items-start ${textAlign} md:items-start`} dir={t.dir}>
        <div className="mb-8 flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold text-blue-700">{t.bentoBadge}</span>
        </div>

        <h2 className={`mb-5 text-[clamp(1.6rem,5vw,3rem)] font-extrabold ${language === "ku" ? "leading-[1.45]" : "leading-[1.15]"} tracking-tight text-slate-900`}>
          {t.bentoTitleA}<br />
          <span className="text-blue-600">{t.bentoTitleB}</span>
        </h2>

        <p className="mb-10 max-w-[32ch] text-base font-medium leading-8 text-slate-600 md:text-lg">
          {t.bentoBody}
        </p>

        <Link to="/dashboard" className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_12px_25px_-6px_rgba(37,99,235,0.6)]">
          {t.bentoCta}
          <DirectionArrow language={language} className="h-5 w-5" />
        </Link>
      </div>

      <div className="pointer-events-none relative hidden h-[330px] items-center justify-center sm:flex sm:h-[420px] md:h-[460px]" dir="ltr">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-300/30 via-white/50 to-blue-200/30 blur-3xl" />
        <div className="relative flex h-[320px] w-[280px] select-none items-center justify-center sm:h-[400px] sm:w-[360px]">
          <div className="absolute right-[7%] top-[6%] w-[145px] origin-center rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] sm:w-[190px]" style={{ transform: "rotate(-8deg)" }}>
            <LeftCardSVG />
          </div>
          <div className="absolute bottom-[4%] left-[8%] z-10 w-[170px] origin-center rounded-lg shadow-[0_25px_35px_rgba(37,99,235,0.15)] sm:w-[225px]" style={{ transform: "rotate(6deg)" }}>
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
  const isRtl = language === "ku";
  const textAlign = isRtl ? "text-right" : "text-left";

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`relative flex min-h-[300px] w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white p-6 ${textAlign} shadow-xl sm:min-h-[380px] sm:rounded-[2rem] sm:p-10`}
  >
    {/* Subtle gradient wash on the text side */}
    <div className={`pointer-events-none absolute top-0 z-0 h-full w-1/2 ${isRtl ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} from-[#f0f7ff] to-transparent`} />

    <div className="relative z-10 max-w-[230px]" dir={t.dir}>
      <h3 className={`mb-2 text-[clamp(1.5rem,4vw,1.875rem)] font-extrabold ${language === "ku" ? "leading-[1.45]" : "leading-[1.18]"} tracking-tight text-slate-900`}>
        <span className="whitespace-nowrap">{t.standTitleA}</span><br />
        <span className="text-blue-500">{t.standTitleB}</span>
      </h3>
      <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
        {t.standBody}
      </p>
    </div>
    <div className="relative z-10 mt-auto max-w-[160px] pt-8 text-xs font-semibold leading-6 text-slate-400" dir={t.dir}>
      {t.standNote}
    </div>

    {/* Image: right for EN, left for KU */}
    <div
      className="pointer-events-none absolute bottom-0 z-10 flex h-[200px] w-[180px] items-end justify-center sm:h-[285px] sm:w-[235px]"
      style={{ [isRtl ? "left" : "right"]: "-10px" }}
      dir="ltr"
    >
      <motion.img
        src="/images/bento/3d guy transparent.png"
        alt={t.characterAlt}
        className="h-full w-full select-none object-contain object-bottom drop-shadow-2xl"
        draggable={false}
        style={{ transform: isRtl ? "scaleX(-1)" : "none" }}
      />
    </div>
  </motion.div>
  );
};


const BentoSecurityCard = ({ language }: { language: Language }) => {
  const t = copy[language];
  const isRtl = language === "ku";
  const textAlign = isRtl ? "text-right" : "text-left";

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    className={`relative flex min-h-[300px] w-full flex-col justify-between overflow-hidden rounded-[1.5rem] border border-slate-100 bg-white p-6 ${textAlign} shadow-xl sm:min-h-[380px] sm:rounded-[2rem] sm:p-10`}
  >
    {/* Gradient on text side */}
    <div className={`pointer-events-none absolute top-0 z-0 h-full w-2/3 ${isRtl ? "right-0 bg-gradient-to-l" : "left-0 bg-gradient-to-r"} from-[#f0f7ff] to-transparent`} />

    <div className="relative z-10 max-w-[240px]" dir={t.dir}>
      <h3 className={`mb-2 text-[clamp(1.5rem,4vw,1.875rem)] font-extrabold ${language === "ku" ? "leading-[1.45]" : "leading-[1.18]"} tracking-tight text-slate-900`}>
        {t.securityTitleA}<br />
        <span className="text-blue-500">{t.securityTitleB}</span>
      </h3>
      <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
        {t.securityBody}
      </p>
    </div>
    <div className="relative z-10 mt-auto pt-8" dir={t.dir}>
      <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 text-xs font-bold text-blue-600 shadow-sm">
        <LockKeyhole className="h-4 w-4 text-blue-500" />
        {t.securityBadge}
      </div>
    </div>

    {/* Image: right for EN, left for KU */}
    <div
      className="pointer-events-none absolute bottom-[12px] z-10 flex h-[150px] w-[150px] items-center justify-center sm:h-[190px] sm:w-[190px]"
      style={{ [isRtl ? "left" : "right"]: "-4px" }}
      dir="ltr"
    >
      <motion.img
        src="/images/bento/sheild transparent.png"
        alt={t.shieldAlt}
        className="h-full w-full select-none object-contain drop-shadow-2xl"
        draggable={false}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  </motion.div>
  );
};


const BentoCreateWinCard = ({ language }: { language: Language }) => {
  const t = copy[language];
  const textAlign = language === "ku" ? "text-right" : "text-left";

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.2 }}
    className="relative grid min-h-[280px] overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white shadow-xl sm:rounded-[2rem] md:grid-cols-[0.8fr_1.2fr]"
  >
    <div className={`relative z-10 flex flex-col justify-center p-8 ${textAlign} sm:p-10`} dir={t.dir}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
        <Download className="h-5 w-5" />
      </div>
      <h3 className={`text-3xl font-extrabold ${language === "ku" ? "leading-[1.45]" : "leading-[1.18]"} tracking-tight text-slate-900`}>
        {t.downloadTitlePrefix}
        <span className="text-blue-500">{t.downloadTitleHighlight}</span>
      </h3>
      <p className="mt-4 max-w-[34ch] text-sm font-medium leading-7 text-slate-500">
        {t.downloadBody}
      </p>
    </div>
    <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-[#eef6ff] px-4" dir="ltr">
      <img
        src="/images/bento/download cv bento.webp"
        alt={t.downloadAlt}
        className="h-full max-h-[360px] w-full select-none object-contain"
        draggable={false}
      />
    </div>
  </motion.div>
  );
};

export function FAQSection({ language }: { language: Language }) {
  const t = copy[language];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div id="faq" className="mt-16 mb-10 w-full max-w-4xl mx-auto px-4 sm:px-0" dir={t.dir}>
      <h2 className="mb-8 text-[clamp(1.5rem,4vw,2.25rem)] font-extrabold tracking-tight text-slate-900 text-center">
        {t.faqTitle}
      </h2>
      <div className="space-y-4">
        {t.faqItems.map((item, i) => (
          <div key={i} className="rounded-2xl border border-slate-200/60 bg-white/60 backdrop-blur-sm shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:border-blue-200/50 hover:bg-white/90">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-6 py-5 text-left font-bold text-slate-800 focus:outline-none"
            >
              <span className="text-base sm:text-lg">{item.q}</span>
              <div className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-200 ${openIndex === i ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-400"}`}>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BentoGridSection({ language }: { language: Language }) {
  const t = copy[language];

  return (
    <section id="features" className="relative overflow-hidden bg-[#f4f9ff] px-4 pb-12 pt-12 sm:px-6 sm:pb-24 sm:pt-28 md:pt-40">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[600px] w-[800px] -translate-y-1/2 rounded-full bg-blue-100/40 opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[600px] rounded-full bg-sky-100/40 opacity-60 blur-3xl" />

      <div className="mx-auto max-w-6xl space-y-6">
        <BentoHeroCard language={language} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <BentoStandOutCard language={language} />
          <BentoSecurityCard language={language} />
        </div>

        <BentoCreateWinCard language={language} />

        <FAQSection language={language} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-10 overflow-hidden rounded-[1.5rem] px-5 py-10 text-center shadow-2xl sm:mt-20 sm:rounded-[2rem] sm:px-8 sm:py-16"
          style={{ background: "linear-gradient(145deg,#1e40af 0%,#2563eb 55%,#3b82f6 100%)" }}
          id="closing-cta"
          dir="ltr"
        >
          <div className="pointer-events-none absolute right-10 top-4 h-14 w-20 rotate-6 rounded-xl border border-white/20 bg-white/10 opacity-15" />
          <div className="pointer-events-none absolute bottom-4 left-10 h-10 w-16 -rotate-3 rounded-xl border border-white/15 bg-white/10 opacity-10" />
          <h2 className="mb-3 text-[clamp(1.4rem,4vw,2.25rem)] font-extrabold tracking-tight text-white sm:mb-4" dir={t.dir}>
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mb-8 max-w-[54ch] text-sm font-medium leading-7 text-blue-100/90 sm:mb-10 sm:text-base md:text-lg" dir={t.dir}>
            {t.ctaBody}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dashboard" id="closing-cta-btn" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-blue-700 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl sm:rounded-2xl sm:px-8 sm:py-4 sm:text-lg">
              {t.ctaPrimary}
              <DirectionArrow language={language} className="h-5 w-5" />
            </Link>
            <Link to="/templates" id="closing-templates-btn" className="hero-outline-button rounded-xl border-2 border-blue-300 px-6 py-3 text-base font-bold text-white transition-all hover:border-blue-200 hover:bg-blue-600 sm:rounded-2xl sm:px-8 sm:py-4 sm:text-lg">
              {t.ctaSecondary}
            </Link>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-xs font-semibold text-slate-500 sm:mt-12 sm:gap-8 sm:text-sm">
          {t.trust.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Landing() {
  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const t = copy[language];
  const isRTL = language === "ku";

  return (
    <div className="page-shell bg-background text-foreground" dir={t.dir} lang={t.lang}>
      <Header language={language} onToggleLanguage={() => setLanguage(language === "en" ? "ku" : "en")} />
      <main>
        <HeroV2 language={language} />
        <TrustedMarquee language={language} />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <StatsSection language={language} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <BentoGridSection language={language} />
        </motion.div>
      </main>
    </div>
  );
}
