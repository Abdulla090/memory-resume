import { createFileRoute, Link } from "@tanstack/react-router";
import { animate, motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Download,
  FileText,
  Globe,
  LockKeyhole,
  Menu,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useRef, useState } from "react";

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

type Language = "en" | "ku";

const copy = {
  en: {
    dir: "ltr",
    lang: "en",
    toggle: "کوردی",
    menu: "Open menu",
    nav: [
      { label: "Home", to: "/" },
      { label: "Templates", to: "/templates" },
      { label: "Build Resume", to: "/onboarding" },
      { label: "Start", to: "/onboarding" },
    ],
    navCta: "Start now",
    heroTitle: "Turn your professional memory into a resume ready for work",
    heroBody:
      "MemoryCV gathers your experience, skills, and achievements, extracts a clean profile, tailors your resume for each role, and lets you download a polished document.",
    heroCta: "Build my resume now",
    statsTitleA: "Build a resume that",
    statsTitleB: "actually works",
    statsCta: "Start for free",
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
    bentoCta: "Start building",
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
    downloadTitle: "Create, review, download.",
    downloadBody:
      "After your profile is organized, you can preview a clean resume layout that is ready to send.",
    downloadAlt: "Resume download preview",
    ctaTitle: "Send your resume with a clear, confident signal.",
    ctaBody:
      "Import memory, confirm your profile, generate for a target role, and refine the details that matter most.",
    ctaPrimary: "Open the workflow",
    ctaSecondary: "View templates",
    trust: ["No credit card required", "Free start", "Edit anytime"],
    characterAlt: "Career character illustration",
    shieldAlt: "Data protection shield",
  },
  ku: {
    dir: "rtl",
    lang: "ckb",
    toggle: "English",
    menu: "کردنەوەی مێنیو",
    nav: [
      { label: "سەرەکی", to: "/" },
      { label: "قاڵبەکان", to: "/templates" },
      { label: "دروستکردنی سیڤی", to: "/onboarding" },
      { label: "دەستپێکردن", to: "/onboarding" },
    ],
    navCta: "دەست پێبکە",
    heroTitle: "بیرەوەرییە پیشەییەکانت بگۆڕە بۆ سیڤییەکی ئامادەی کار",
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
    downloadTitle: "دروست بکە، وردبینی بکە، دایبگرە.",
    downloadBody:
      "دوای ڕێکخستنی پڕۆفایل، سیڤییەکەت بە قاڵبی پاک و ئامادەی ناردن دەبینیت.",
    downloadAlt: "پێشبینی دابەزاندنی سیڤی",
    ctaTitle: "سیڤییەکەت بە دەنگێکی ڕوون و پڕ مانا بنێرە.",
    ctaBody:
      "بیرەوەرییەکانت هاوردە بکە، پڕۆفایلەکەت پشتڕاست بکەوە، بۆ ڕۆڵی مەبەستت بیگونجێنە و ئەو شوێنانە باشتر بکە کە گرنگن.",
    ctaPrimary: "کردنەوەی پرۆسە",
    ctaSecondary: "بینینی قاڵبەکان",
    trust: ["پێویست بە کارتی بانکی ناکات", "دەستپێکردنی خۆڕایی", "هەر کات دەتوانیت بگۆڕیت"],
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

function Header({ language, onToggleLanguage }: { language: Language; onToggleLanguage: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = copy[language];

  return (
    <header className="saas-nav" dir="ltr">
      <div className="app-frame px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer" id="nav-logo">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-[1rem] font-bold tracking-tight text-slate-900">MemoryCV</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {t.nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                dir={t.dir}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleLanguage}
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 md:flex"
              aria-label="Change language"
              dir={t.dir}
            >
              <Globe className="h-4 w-4" />
              {t.toggle}
            </button>
            <Link to="/onboarding" id="nav-free-trial" className="primary-button px-4 py-2.5 text-sm sm:px-5" dir={t.dir}>
              {t.navCta}
            </Link>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 md:hidden"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={t.menu}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mt-1 border-t border-slate-100 pb-4 md:hidden">
            <button
              onClick={onToggleLanguage}
              className="flex w-full items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
              dir={t.dir}
            >
              <Globe className="h-4 w-4" />
              {t.toggle}
            </button>
            {t.nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                dir={t.dir}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
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
    <section className="app-frame px-3 pb-0 pt-4 sm:px-6 sm:pt-6" dir="ltr">
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

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26, duration: 0.5 }} className="mt-7">
            <Link
              to="/onboarding"
              id="hero-cta"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:px-8 sm:py-3.5"
            >
              {t.heroCta}
              <DirectionArrow language={language} className="h-4 w-4" />
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

function StatsSection({ language }: { language: Language }) {
  const t = copy[language];
  const textAlign = language === "ku" ? "text-right" : "text-left";

  return (
    <section className="app-frame relative px-4 pb-16 sm:px-6 sm:pb-24" style={{ paddingTop: "clamp(80px,14vw,140px)" }} dir="ltr">
      <div className="absolute right-10 top-20 -z-10 h-96 w-96 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute bottom-10 left-10 -z-10 h-80 w-80 rounded-full bg-sky-100/40 blur-3xl" />

      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-16 md:flex-row md:items-center">
        <motion.h2
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-3xl font-extrabold leading-[1.18] tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
          dir={t.dir}
        >
          {t.statsTitleA}<br />
          <span className="text-blue-600">{t.statsTitleB}</span>
        </motion.h2>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="shrink-0">
          <Link
            to="/onboarding"
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
            className={`group relative flex cursor-pointer flex-col items-start overflow-hidden rounded-[2rem] border border-slate-100 bg-white/80 p-8 ${textAlign} shadow-lg backdrop-blur-xl sm:p-10`}
            dir={t.dir}
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-blue-50/0 to-blue-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 shadow-lg shadow-blue-500/30 transition-transform duration-300 group-hover:scale-110">
              <s.icon className="h-6 w-6 text-white" />
            </div>
            <div className="relative z-10">
              <div className="flex items-baseline text-4xl font-black tracking-tight text-slate-900">
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
    whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(37,99,235,0.15)" }}
    className="group relative w-full overflow-hidden rounded-[2rem] border border-white/50 bg-gradient-to-br from-[#e8f3ff] to-[#cce4ff] shadow-xl"
    dir="ltr"
  >
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-[-10%] right-[10%] h-[200px] w-[400px] rounded-full bg-white/60 blur-2xl" />
      <div className="absolute bottom-[-20%] left-[-10%] h-[300px] w-[600px] rounded-full bg-white/80 blur-3xl" />
    </div>

    <div className="relative z-10 grid gap-8 p-6 sm:p-10 md:grid-cols-[0.95fr_1.05fr] md:p-14">
      <div className={`relative z-20 flex flex-col items-start ${textAlign} md:items-start`} dir={t.dir}>
        <div className="mb-8 flex items-center gap-2 rounded-full border border-white bg-white/90 px-4 py-1.5 shadow-sm backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold text-blue-700">{t.bentoBadge}</span>
        </div>

        <h2 className="mb-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          {t.bentoTitleA}<br />
          <span className="text-blue-600">{t.bentoTitleB}</span>
        </h2>

        <p className="mb-10 max-w-[32ch] text-base font-medium leading-8 text-slate-600 md:text-lg">
          {t.bentoBody}
        </p>

        <Link to="/onboarding" className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-lg font-bold text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.5)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_12px_25px_-6px_rgba(37,99,235,0.6)]">
          {t.bentoCta}
          <DirectionArrow language={language} className="h-5 w-5" />
        </Link>
      </div>

      <div className="pointer-events-none relative flex h-[330px] items-center justify-center sm:h-[420px] md:h-[460px]" dir="ltr">
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
  const textAlign = language === "ku" ? "text-right" : "text-left";

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(37,99,235,0.1)" }}
    className={`group relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 ${textAlign} shadow-xl sm:p-10`}
    dir="ltr"
  >
    <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-1/2 bg-gradient-to-r from-[#f0f7ff] to-transparent" />
    <div className="relative z-10 max-w-[230px]" dir={t.dir}>
      <h3 className="mb-2 text-3xl font-extrabold leading-[1.18] tracking-tight text-slate-900">
        {t.standTitleA}<br />
        <span className="text-blue-500">{t.standTitleB}</span>
      </h3>
      <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
        {t.standBody}
      </p>
    </div>
    <div className="relative z-10 mt-auto max-w-[160px] pt-8 text-xs font-semibold leading-6 text-slate-400" dir={t.dir}>
      {t.standNote}
    </div>
    <div className="pointer-events-none absolute bottom-0 left-[-10px] z-10 flex h-[285px] w-[235px] items-end justify-center sm:left-[-20px] sm:w-[250px]" dir="ltr">
      <motion.img
        src="/images/bento/3d guy transparent.png"
        alt={t.characterAlt}
        className="h-full w-full select-none object-contain object-bottom drop-shadow-2xl"
        draggable={false}
      />
    </div>
  </motion.div>
  );
};

const BentoSecurityCard = ({ language }: { language: Language }) => {
  const t = copy[language];
  const textAlign = language === "ku" ? "text-right" : "text-left";

  return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 }}
    whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(37,99,235,0.1)" }}
    className={`group relative flex min-h-[380px] w-full flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-100 bg-white p-8 ${textAlign} shadow-xl sm:p-10`}
    dir="ltr"
  >
    <div className="pointer-events-none absolute left-0 top-0 z-0 h-full w-2/3 bg-gradient-to-r from-[#f0f7ff] to-transparent" />
    <div className="relative z-10 max-w-[240px]" dir={t.dir}>
      <h3 className="mb-2 text-3xl font-extrabold leading-[1.18] tracking-tight text-slate-900">
        {t.securityTitleA}<br />
        <span className="text-blue-500">{t.securityTitleB}</span>
      </h3>
      <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
        {t.securityBody}
      </p>
    </div>
    <div className="relative z-10 mt-auto pt-8" dir={t.dir}>
      <div className="inline-flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 text-xs font-bold text-blue-600 shadow-sm transition-shadow group-hover:shadow-md">
        <LockKeyhole className="h-4 w-4 text-blue-500" />
        {t.securityBadge}
      </div>
    </div>
    <div className="pointer-events-none absolute bottom-[16px] left-[-8px] z-10 flex h-[220px] w-[220px] items-center justify-center" dir="ltr">
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
    className="relative grid min-h-[300px] overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-xl md:grid-cols-[0.8fr_1.2fr]"
    dir="ltr"
  >
    <div className={`relative z-10 flex flex-col justify-center p-8 ${textAlign} sm:p-10`} dir={t.dir}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
        <Download className="h-5 w-5" />
      </div>
      <h3 className="text-3xl font-extrabold leading-[1.18] tracking-tight text-slate-900">
        {t.downloadTitle}
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

function BentoGridSection({ language }: { language: Language }) {
  const t = copy[language];

  return (
    <section className="relative overflow-hidden bg-[#f4f9ff] px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-28 md:pt-40" dir="ltr">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[600px] w-[800px] -translate-y-1/2 rounded-full bg-blue-100/40 opacity-70 blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-1/4 h-[500px] w-[600px] rounded-full bg-sky-100/40 opacity-60 blur-3xl" />

      <div className="mx-auto max-w-6xl space-y-6">
        <BentoHeroCard language={language} />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <BentoStandOutCard language={language} />
          <BentoSecurityCard language={language} />
        </div>

        <BentoCreateWinCard language={language} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mt-12 overflow-hidden rounded-[2rem] px-6 py-10 text-center shadow-2xl sm:mt-20 sm:px-8 sm:py-16"
          style={{ background: "linear-gradient(145deg,#1e40af 0%,#2563eb 55%,#3b82f6 100%)" }}
          id="closing-cta"
          dir="ltr"
        >
          <div className="pointer-events-none absolute right-10 top-4 h-14 w-20 rotate-6 rounded-xl border border-white/20 bg-white/10 opacity-15" />
          <div className="pointer-events-none absolute bottom-4 left-10 h-10 w-16 -rotate-3 rounded-xl border border-white/15 bg-white/10 opacity-10" />
          <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-white sm:text-4xl" dir={t.dir}>
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mb-10 max-w-[54ch] text-base font-medium leading-8 text-blue-100/90 md:text-lg" dir={t.dir}>
            {t.ctaBody}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/onboarding" id="closing-cta-btn" className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-blue-700 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
              {t.ctaPrimary}
              <DirectionArrow language={language} className="h-5 w-5" />
            </Link>
            <Link to="/templates" id="closing-templates-btn" className="hero-outline-button rounded-2xl border-2 border-blue-300 px-8 py-4 text-lg font-bold text-white transition-all hover:border-blue-200 hover:bg-blue-600">
              {t.ctaSecondary}
            </Link>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold text-slate-500">
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
  const [language, setLanguage] = useState<Language>("en");
  const t = copy[language];

  return (
    <div className="page-shell bg-background text-foreground" dir="ltr" lang={t.lang}>
      <Header language={language} onToggleLanguage={() => setLanguage((current) => (current === "en" ? "ku" : "en"))} />
      <main>
        <Hero language={language} />
        <StatsSection language={language} />
        <BentoGridSection language={language} />
      </main>
    </div>
  );
}
