import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import {
  LeftCardSVG,
  CenterCardSVG,
  RightCardSVG,
} from "../routes/index";
import { CVCard1, CVCard2, CVCard3, CVCard4, CVCard5 } from "./CVCards";

type Language = "en" | "ku";

const copy = {
  en: {
    dir: "ltr" as const,
    badge: "AI-powered · Free to start",
    badgeMobile: "AI · Free",
    heroTitle: "Your career memory,",
    heroTitleAccentPrefix: "turned into ",
    heroTitleAccentHighlight: "a CV.",
    heroBody: "Tell us your story. We build the resume.",
    heroCta: "Get started",
    heroSecondary: "Browse templates",
  },
  ku: {
    dir: "rtl" as const,
    badge: "زیرەکی دەستکرد · دەستپێکردنی خۆڕایی",
    badgeMobile: "زیرەکی دەستکرد · خۆڕایی",
    heroTitle: "بیرەوەرییەکانت،",
    heroTitleAccentPrefix: "بگۆڕە بۆ ",
    heroTitleAccentHighlight: "سیڤی.",
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
  0%   { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, -50%, 0); }
}
@keyframes marquee-up {
  0%   { transform: translate3d(0, -50%, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
`;

/* Card arrays */
const leftCards  = [LeftCardSVG, CVCard1, CVCard3, CenterCardSVG, CVCard5];
const rightCards = [CVCard2, RightCardSVG, CVCard4, LeftCardSVG, CVCard3];

/* ── Unified marquee: adapts column widths via responsive classes ── */
function MarqueeColumns() {
  return (
    <>
      <style>{marqueeCSS}</style>
      <div className="relative flex h-full w-full items-start justify-center gap-2 overflow-hidden sm:gap-4 pointer-events-none" dir="ltr">

        {/* Left column — scrolls DOWN */}
        <div
          className="relative overflow-hidden"
          style={{ width: "46%", maxWidth: "100%", height: "100%" }}
        >
          <div
            className="flex flex-col gap-2 sm:gap-4"
            style={{ animation: "marquee-down 22s linear infinite", willChange: "transform" }}
          >
            {leftCards.map((Card, i) => (
              <div key={`l-${i}`} className="shrink-0 overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:rounded-xl">
                <Card />
              </div>
            ))}
            {leftCards.map((Card, i) => (
              <div key={`l2-${i}`} className="shrink-0 overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:rounded-xl">
                <Card />
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
            style={{ animation: "marquee-up 20s linear infinite", willChange: "transform" }}
          >
            {rightCards.map((Card, i) => (
              <div key={`r-${i}`} className="shrink-0 overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:rounded-xl">
                <Card />
              </div>
            ))}
            {rightCards.map((Card, i) => (
              <div key={`r2-${i}`} className="shrink-0 overflow-hidden rounded-lg shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:rounded-xl">
                <Card />
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
  const [starting, setStarting] = useState(false);
  const navigate = useNavigate();
  const onboardingDone = useAppStore((s) => s.onboardingDone);
  const handleStart = () => {
    setStarting(true);
    void navigate({ to: onboardingDone ? "/dashboard" : "/onboarding" });
  };

  return (
    <section className="flex-1 max-w-[1600px] w-full mx-auto px-3 sm:px-6 relative z-10 pt-4 sm:pt-6">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden hero-gradient rounded-[2rem] sm:rounded-[2.5rem]">
        {/*
          Two-column layout on ALL screen sizes:
          - Mobile:  text takes ~58%, marquee takes ~42% (narrower cards)
          - Desktop: text takes ~55%, marquee takes ~45% (wider cards)
        */}
        {/* Mobile Kurdish: stacked. Desktop: two-col side-by-side */}
        <div
          className={`relative ${
            language === "ku"
              ? "flex flex-col md:grid md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-4"
              : "grid grid-cols-[58%_42%] items-center md:grid-cols-[1.1fr_0.9fr] md:gap-4"
          }`}
          dir="ltr"
        >

          {/* ── Left: text content ── */}
          <div
            className={`relative z-10 flex flex-col overflow-hidden ${
              language === "ku"
                ? "order-1 py-8 pr-4 pl-4 sm:px-10 sm:py-14 md:order-2 md:py-20 lg:px-16 lg:py-24"
                : "order-1 py-8 pl-4 pr-3 sm:px-10 sm:py-14 md:px-14 md:py-20 lg:px-16 lg:py-24"
            }`}
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
              className={`font-extrabold tracking-tight text-white ${
                language === "ku"
                  ? "text-[clamp(1.55rem,7.5vw,4rem)] leading-[1.5] sm:text-[clamp(1.8rem,5.5vw,4rem)] sm:leading-[1.6]"
                  : "text-[clamp(1.8rem,5.8vw,4rem)] leading-[1.08] sm:text-[clamp(2rem,5.5vw,4rem)]"
              }`}
            >
              {t.heroTitle}
              <br />
              {t.heroTitleAccentPrefix}
              <span className="relative inline-block whitespace-nowrap pr-2">
                <span className="relative z-10 text-white drop-shadow-sm">{t.heroTitleAccentHighlight}</span>
                {/* Hand-drawn underline SVG - GREEN, bolder on mobile */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-[0.45em] sm:h-[0.38em] text-[#22c55e] pointer-events-none"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 1px 3px rgba(34,197,94,0.5))" }}
                >
                  <path d="M 2 8 C 30 1, 70 1, 98 8" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-2 hidden text-[11px] font-semibold leading-5 text-white/95 drop-shadow-sm sm:mt-5 sm:block sm:max-w-[36ch] sm:text-lg sm:leading-8"
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
              <button
                id="hero-v2-cta"
                onClick={handleStart}
                aria-label={t.heroCta}
                className="group relative isolate inline-flex min-w-[150px] items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-[linear-gradient(180deg,#3478f1_0%,#2567e4_58%,#215bd5_100%)] px-4 py-2.5 text-xs font-bold text-white shadow-[0_10px_22px_-17px_rgba(17,74,190,0.58),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-4px_10px_rgba(22,63,160,0.12)] outline-none transition-[box-shadow,filter,border-color] duration-300 ease-out hover:border-white/34 hover:shadow-[0_14px_28px_-18px_rgba(17,74,190,0.72),inset_0_1px_0_rgba(255,255,255,0.34),inset_0_-5px_12px_rgba(22,63,160,0.13)] hover:brightness-[1.025] focus-visible:ring-4 focus-visible:ring-white/35 active:brightness-[0.98] sm:min-w-[178px] sm:px-8 sm:py-3.5 sm:text-sm"
              >
                <span className="pointer-events-none absolute inset-x-4 top-[2px] h-[38%] rounded-full bg-white/12 blur-[2px] transition-opacity duration-300 group-hover:opacity-90" />
                <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_50%)] opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/0 transition-[box-shadow,opacity] duration-500 group-hover:ring-white/24 group-hover:shadow-[inset_0_0_22px_rgba(255,255,255,0.12)]" />
                <span className="pointer-events-none absolute inset-y-[-20%] left-[-50%] w-[34%] rotate-12 bg-gradient-to-r from-transparent via-white/24 to-transparent opacity-0 blur-[2px] transition-[transform,opacity] duration-700 ease-out group-hover:translate-x-[430%] group-hover:opacity-100" />
                <span className="relative z-10">
                  {starting ? (language === "ku" ? "ئامادەکردن..." : "Preparing...") : t.heroCta}
                </span>
                <span className="relative z-10 grid h-6 w-6 place-items-center rounded-full bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-[background-color,box-shadow,filter] duration-300 group-hover:bg-white/20 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_0_10px_rgba(255,255,255,0.08)] group-hover:brightness-105">
                  <DirectionArrow language={language} className="h-3.5 w-3.5" />
                </span>
              </button>
              <Link
                to="/templates"
                className="group relative isolate inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full border border-white/30 bg-gradient-to-b from-white/80 to-blue-50/60 px-4 py-2.5 text-xs font-bold text-blue-800 backdrop-blur-xl shadow-[0_10px_22px_-18px_rgba(15,69,200,0.34),inset_0_1px_0_rgba(255,255,255,0.72),inset_0_-5px_12px_rgba(59,130,246,0.08)] transition-[box-shadow,background-color,border-color] duration-300 hover:border-white/40 hover:bg-white/95 hover:shadow-[0_11px_24px_-19px_rgba(15,69,200,0.38),inset_0_1px_0_rgba(255,255,255,0.76),inset_0_-5px_12px_rgba(59,130,246,0.07)] active:bg-white/90 sm:px-8 sm:py-3.5 sm:text-sm"
              >
                <span className="pointer-events-none absolute inset-x-4 top-[2px] h-[38%] rounded-full bg-white/60 blur-[2px]" />
                <span className="relative z-10">{t.heroSecondary}</span>
                <ArrowUpRight className="relative z-10 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4" />
              </Link>
            </motion.div>
          </div>

          {/* ── Right: marquee columns (all screen sizes, smaller on mobile) ── */}
          <div
            className={`relative z-10 overflow-hidden ${
              language === "ku"
                ? "order-2 h-[180px] sm:h-[420px] md:order-1 md:h-[520px] lg:h-[620px]"
                : "order-2 h-[300px] sm:h-[420px] md:h-[520px] lg:h-[620px]"
            }`}
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
