import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { ResumePreview } from "@/components/resume/templates";
import type { TemplateId } from "@/lib/types";

type Language = "en" | "ku";

const copy = {
  en: {
    dir: "ltr" as const,
    badge: "AI-powered · Free to start",
    badgeMobile: "AI · Free",
    heroTitle: "Your career memory,",
    heroTitleAccent: "turned into a CV.",
    heroBody: "Tell us your story. We build the resume.",
    heroCta: "Get started",
    heroSecondary: "Browse templates",
  },
  ku: {
    dir: "rtl" as const,
    badge: "زیرەکی دەستکرد · دەستپێکردنی خۆڕایی",
    badgeMobile: "زیرەکی دەستکرد · خۆڕایی",
    heroTitle: "بیرەوەرییەکانت،",
    heroTitleAccent: "بگۆڕە بۆ سیڤی.",
    heroBody: "چیرۆکەکەت بگێڕە. ئێمە سیڤییەکەت دادەمەزرێنین.",
    heroCta: "دەستپێکردن",
    heroSecondary: "قاڵبەکان ببینە",
  },
};

function DirectionArrow({ language, className }: { language: Language; className: string }) {
  return language === "ku" ? <ArrowLeft className={className} /> : <ArrowRight className={className} />;
}

/* ── Infinite marquee keyframes ─────────────────────────────── */
const marqueeCSS = `
@keyframes marquee-down {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}
@keyframes marquee-up {
  0%   { transform: translateY(-50%); }
  100% { transform: translateY(0); }
}
`;

/* ── Unified marquee: adapts column widths via responsive classes ── */
const MINI_SAMPLE: any = {
  name: "Jane Doe",
  title: "Product Designer",
  email: "jane@example.com",
  phone: "+1 234 567 890",
  photoUrl: "https://picsum.photos/seed/maya-okafor-headshot/240/240",
  location: "New York, NY",
  summary: "Creative designer focusing on UI/UX and visual storytelling.",
  experience: [
    { title: "Lead Designer", company: "Creative Studio", duration: "2020 — Present", description: "Leading design team for major client projects.", achievements: [] },
    { title: "UX Designer", company: "Tech Startup", duration: "2018 — 2020", description: "Designed core application interfaces.", achievements: [] }
  ],
  projects: [],
  education: [{ degree: "BFA Design", institution: "Design School", year: "2018" }],
  skills: ["Figma", "UI/UX", "Prototyping"],
  certifications: [],
};

const ThumbnailCard = ({ id }: { id: TemplateId }) => (
  <div className="w-full aspect-[1/1.414] relative overflow-hidden rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-slate-200/80 bg-white flex items-center justify-center">
    <svg viewBox="0 0 794 1123" className="w-full h-full pointer-events-none">
      <foreignObject width="794" height="1123">
        <div className="w-[794px] h-[1123px] bg-white text-left overflow-hidden">
          <ResumePreview data={MINI_SAMPLE} template={id} />
        </div>
      </foreignObject>
    </svg>
  </div>
);

/* Card arrays using real templates */
const leftCards: TemplateId[]  = [
  "new-sleek", 
  "ref-torres", 
  "ref-schumacher", 
  "mercer", 
  "executive", 
  "ref-sanchez"
];
const rightCards: TemplateId[] = [
  "new-professional", 
  "ref-silva", 
  "ref-palmerston", 
  "new-academic", 
  "nexus"
];

/* ── Unified marquee: adapts column widths via responsive classes ── */
function MarqueeColumns() {
  return (
    <>
      <style>{marqueeCSS}</style>
      <div className="relative flex h-full w-full items-start justify-center gap-2 overflow-hidden sm:gap-4" dir="ltr">

        {/* Left column — scrolls DOWN */}
        <div
          className="relative overflow-hidden"
          style={{ width: "46%", maxWidth: "100%", height: "100%" }}
        >
          <div
            className="flex flex-col gap-2 sm:gap-4"
            style={{ animation: "marquee-down 22s linear infinite" }}
          >
            {leftCards.map((id, i) => (
              <div key={`l-${i}`} className="shrink-0 overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:rounded-xl">
                <ThumbnailCard id={id} />
              </div>
            ))}
            {leftCards.map((id, i) => (
              <div key={`l2-${i}`} className="shrink-0 overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:rounded-xl">
                <ThumbnailCard id={id} />
              </div>
            ))}
          </div>
        </div>

        {/* Right column — scrolls UP, starts offset */}
        <div
          className="relative overflow-hidden pt-10 sm:pt-16"
          style={{ width: "46%", maxWidth: "100%", height: "100%" }}
        >
          <div
            className="flex flex-col gap-2 sm:gap-4"
            style={{ animation: "marquee-up 20s linear infinite" }}
          >
            {rightCards.map((id, i) => (
              <div key={`r-${i}`} className="shrink-0 overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:rounded-xl">
                <ThumbnailCard id={id} />
              </div>
            ))}
            {rightCards.map((id, i) => (
              <div key={`r2-${i}`} className="shrink-0 overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:rounded-xl">
                <ThumbnailCard id={id} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

/* ── Hero V2 ─────────────────────────────────────────────────── */
export function HeroV2({ language }: { language: Language }) {
  const t = copy[language];

  return (
    <section className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 relative z-10 pt-4 sm:pt-6">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden hero-gradient rounded-[2rem] sm:rounded-[2.5rem]">
        {/*
          Two-column layout on ALL screen sizes:
          - Mobile:  text takes ~58%, marquee takes ~42% (narrower cards)
          - Desktop: text takes ~55%, marquee takes ~45% (wider cards)
        */}
        <div className="relative grid grid-cols-[58%_42%] items-center md:grid-cols-[1.1fr_0.9fr] md:gap-4">

          {/* ── Left: text content ── */}
          <div
            className="relative z-10 flex flex-col pl-4 pr-3 py-8 sm:px-10 sm:py-14 md:px-14 md:py-20 lg:px-16 lg:py-24"
            dir={t.dir}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-3 sm:mb-5"
            >
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-400/30 bg-blue-500/20 px-2.5 py-1 text-[9px] font-semibold text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.2)] backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-1.5 sm:text-xs">
                <Sparkles className="h-2.5 w-2.5 text-blue-200 sm:h-3.5 sm:w-3.5" />
                <span className="hidden xs:inline">{t.badge}</span>
                <span className="xs:hidden">{t.badgeMobile}</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-[clamp(1.8rem,5.8vw,4rem)] font-extrabold ${language === "ku" ? "leading-[1.6]" : "leading-[1.08]"} tracking-tight text-white sm:text-[clamp(2rem,5.5vw,4rem)]`}
            >
              {t.heroTitle}
              <br />
              <span className="relative inline-block whitespace-nowrap pr-2">
                <span className="relative z-10 text-white drop-shadow-sm">{t.heroTitleAccent}</span>
                {/* Hand-drawn underline SVG - VIBRANT RED, NO GLOW */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-[0.35em] text-[#ff3333] pointer-events-none"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                >
                  <path d="M 2 8 C 30 1, 70 1, 98 8" />
                </svg>
                {/* REALISTIC MINI CV */}
                <div className={`absolute top-1/2 -translate-y-1/2 ${language === "ku" ? "-left-16 sm:-left-20" : "-right-16 sm:-right-20"} hidden sm:flex h-16 w-12 sm:h-20 sm:w-14 flex-col rounded-[6px] sm:rounded-[8px] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-slate-100 rotate-6 transition-transform duration-500 hover:rotate-12 hover:scale-110 overflow-hidden ring-1 ring-slate-900/5`}>
                  {/* CV Header */}
                  <div className="h-3 sm:h-4 w-full bg-blue-600 shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-90" />
                  </div>
                  {/* CV Content */}
                  <div className="flex-1 p-1.5 sm:p-2 flex flex-col gap-1.5 sm:gap-2 bg-slate-50">
                    {/* Top Row: Avatar + Title */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-slate-300 shrink-0 shadow-sm border border-white" />
                      <div className="flex flex-col gap-0.5 sm:gap-[3px] w-full">
                        <div className="h-[3px] sm:h-[4px] w-full rounded-full bg-slate-400" />
                        <div className="h-[2px] sm:h-[3px] w-2/3 rounded-full bg-blue-400/60" />
                      </div>
                    </div>
                    {/* Columns */}
                    <div className="flex gap-1.5 sm:gap-2 h-full">
                      {/* Left col */}
                      <div className="flex flex-col gap-[3px] sm:gap-1 w-1/3">
                        <div className="h-[2px] sm:h-[3px] w-full rounded-full bg-slate-300" />
                        <div className="h-[2px] sm:h-[3px] w-full rounded-full bg-slate-300" />
                        <div className="h-[2px] sm:h-[3px] w-4/5 rounded-full bg-slate-300" />
                        <div className="h-[2px] sm:h-[3px] w-[90%] rounded-full bg-slate-300 mt-0.5 sm:mt-1" />
                        <div className="h-[2px] sm:h-[3px] w-[70%] rounded-full bg-slate-300" />
                      </div>
                      {/* Right col */}
                      <div className="flex flex-col gap-[3px] sm:gap-1 w-2/3">
                        <div className="h-[3px] sm:h-[4px] w-full rounded-full bg-slate-400/80 mb-[1px]" />
                        <div className="h-[2px] sm:h-[3px] w-full rounded-full bg-slate-300" />
                        <div className="h-[2px] sm:h-[3px] w-[90%] rounded-full bg-slate-300" />
                        <div className="h-[2px] sm:h-[3px] w-full rounded-full bg-slate-300" />
                        
                        <div className="h-[3px] sm:h-[4px] w-full rounded-full bg-slate-400/80 mt-[2px] sm:mt-[3px] mb-[1px]" />
                        <div className="h-[2px] sm:h-[3px] w-[95%] rounded-full bg-slate-300" />
                        <div className="h-[2px] sm:h-[3px] w-full rounded-full bg-slate-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-2 hidden text-[11px] font-medium leading-5 text-blue-100/75 sm:mt-5 sm:block sm:max-w-[36ch] sm:text-lg sm:leading-8"
            >
              {t.heroBody}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-4 flex flex-row flex-wrap gap-2 sm:mt-8 sm:items-center sm:gap-4"
            >
              <Link
                to="/dashboard"
                id="hero-v2-cta"
                className="relative inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.25),inset_0_4px_12px_rgba(255,255,255,0.15),inset_0_-6px_16px_rgba(30,58,138,0.15)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(37,99,235,0.35)] active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm"
              >
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">{t.heroCta}</span>
                <DirectionArrow language={language} className="h-3 w-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] sm:h-4 sm:w-4" />
              </Link>
              <Link
                to="/templates"
                className="group relative inline-flex items-center justify-center gap-1.5 rounded-full border border-white/30 bg-gradient-to-b from-white/80 to-blue-50/60 px-4 py-2.5 text-xs font-bold text-blue-800 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.04),inset_0_4px_12px_rgba(255,255,255,0.8)] transition-all duration-300 hover:bg-white/95 active:scale-95 sm:px-8 sm:py-3.5 sm:text-sm"
              >
                <span className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">{t.heroSecondary}</span>
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
              </Link>
            </motion.div>
          </div>

          {/* ── Right: marquee columns (all screen sizes, smaller on mobile) ── */}
          <div
            className="relative z-10 h-[300px] overflow-hidden sm:h-[420px] md:h-[520px] lg:h-[620px]"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <MarqueeColumns />
          </div>

        </div>
      </div>
    </section>
  );
}
