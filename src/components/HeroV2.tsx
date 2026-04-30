import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
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
    heroTitle: "Your career memory,",
    heroTitleAccent: "turned into a resume.",
    heroBody: "Tell us your story. We build the resume.",
    heroCta: "Build my resume",
    heroSecondary: "Browse templates",
  },
  ku: {
    dir: "rtl" as const,
    badge: "زیرەکی دەستکرد · دەستپێکردنی خۆڕایی",
    heroTitle: "بیرەوەرییەکانت،",
    heroTitleAccent: "بگۆڕە بۆ سیڤی.",
    heroBody: "چیرۆکەکەت بگێڕە. ئێمە سیڤییەکەت دادەمەزرێنین.",
    heroCta: "سیڤییەکەم دروست بکە",
    heroSecondary: "قاڵبەکان ببینە",
  },
};

function DirectionArrow({ language, className }: { language: Language; className: string }) {
  return language === "ku" ? <ArrowLeft className={className} /> : <ArrowRight className={className} />;
}

/* ── Infinite marquee CSS ─────────────────────────────────── */
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

/* Left column cards (scroll DOWN) */
const leftCards = [LeftCardSVG, CVCard1, CVCard3, CenterCardSVG, CVCard5];
/* Right column cards (scroll UP) */
const rightCards = [CVCard2, RightCardSVG, CVCard4, LeftCardSVG, CVCard3];

function MarqueeColumns() {
  return (
    <>
      <style>{marqueeCSS}</style>
      <div className="relative flex h-full w-full items-start justify-center gap-4 overflow-hidden" dir="ltr">

        {/* Left column — scrolls DOWN endlessly */}
        <div className="relative w-[46%] max-w-[210px] overflow-hidden" style={{ height: "100%" }}>
          <div
            className="flex flex-col gap-4"
            style={{ animation: "marquee-down 30s linear infinite" }}
          >
            {leftCards.map((Card, i) => (
              <div key={`l-${i}`} className="shrink-0 overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <Card />
              </div>
            ))}
            {leftCards.map((Card, i) => (
              <div key={`l2-${i}`} className="shrink-0 overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <Card />
              </div>
            ))}
          </div>
        </div>

        {/* Right column — scrolls UP endlessly, starts offset */}
        <div className="relative w-[46%] max-w-[210px] overflow-hidden pt-16" style={{ height: "100%" }}>
          <div
            className="flex flex-col gap-4"
            style={{ animation: "marquee-up 28s linear infinite" }}
          >
            {rightCards.map((Card, i) => (
              <div key={`r-${i}`} className="shrink-0 overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <Card />
              </div>
            ))}
            {rightCards.map((Card, i) => (
              <div key={`r2-${i}`} className="shrink-0 overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <Card />
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

/* ── Hero V2 — split layout with infinite marquee ─────────── */
export function HeroV2({ language }: { language: Language }) {
  const t = copy[language];

  return (
    <section className="app-frame px-3 pb-0 pt-4 sm:px-6 sm:pt-6" dir="ltr">
      <div className="hero-gradient relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]">
        <div className="relative grid items-center gap-0 md:grid-cols-[1.1fr_0.9fr] md:gap-8">

          {/* ── Left: text content ── */}
          <div className="relative z-10 flex flex-col px-6 py-10 sm:px-10 sm:py-14 md:py-20 md:px-14 lg:px-16 lg:py-24" dir={t.dir}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-1.5 text-xs font-semibold text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.2)] backdrop-blur-sm sm:text-sm">
                <Sparkles className="h-3.5 w-3.5 text-blue-200 sm:h-4 sm:w-4" />
                {t.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2rem,5.5vw,4rem)] font-extrabold leading-[1.08] tracking-tight text-white"
            >
              {t.heroTitle}
              <br />
              <span className="bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">
                {t.heroTitleAccent}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-5 max-w-[36ch] text-base font-medium leading-7 text-blue-100/75 sm:text-lg sm:leading-8"
            >
              {t.heroBody}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Link
                to="/onboarding"
                id="hero-v2-cta"
                className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(37,99,235,0.25),inset_0_4px_12px_rgba(255,255,255,0.15),inset_0_-6px_16px_rgba(30,58,138,0.15)] transition-all duration-300 hover:shadow-[0_12px_32px_rgba(37,99,235,0.35),inset_0_4px_12px_rgba(255,255,255,0.25)] active:scale-95 sm:px-8 sm:py-3.5"
              >
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]">{t.heroCta}</span>
                <DirectionArrow language={language} className="h-4 w-4 drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
              </Link>
              <Link
                to="/templates"
                className="group relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-gradient-to-b from-white/80 to-blue-50/60 px-6 py-3 text-sm font-bold text-blue-800 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.04),inset_0_4px_12px_rgba(255,255,255,0.8)] transition-all duration-300 hover:bg-white/95 active:scale-95 sm:px-8 sm:py-3.5"
              >
                <span className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">{t.heroSecondary}</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
          </div>

          {/* ── Right: infinite marquee columns (tablet/desktop) ── */}
          <div
            className="relative z-10 hidden h-[520px] overflow-hidden md:block lg:h-[620px]"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
            }}
          >
            <MarqueeColumns />
          </div>

          {/* ── Mobile: marquee strip (single column, fade-masked) ── */}
          <div
            className="relative z-10 h-[220px] w-full overflow-hidden md:hidden"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
            dir="ltr"
          >
            <div className="flex h-full justify-center gap-4 px-4">
              {/* single scrolling column for mobile */}
              <div className="relative w-[130px] overflow-hidden" style={{ height: "100%" }}>
                <div className="flex flex-col gap-4" style={{ animation: "marquee-down 18s linear infinite" }}>
                  {leftCards.map((Card, i) => (
                    <div key={`ml-${i}`} className="shrink-0 overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      <Card />
                    </div>
                  ))}
                  {leftCards.map((Card, i) => (
                    <div key={`ml2-${i}`} className="shrink-0 overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      <Card />
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative w-[130px] overflow-hidden pt-10" style={{ height: "100%" }}>
                <div className="flex flex-col gap-4" style={{ animation: "marquee-up 20s linear infinite" }}>
                  {rightCards.map((Card, i) => (
                    <div key={`mr-${i}`} className="shrink-0 overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      <Card />
                    </div>
                  ))}
                  {rightCards.map((Card, i) => (
                    <div key={`mr2-${i}`} className="shrink-0 overflow-hidden rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                      <Card />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
