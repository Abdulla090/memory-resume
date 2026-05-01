/* ─────────────────────────────────────────────────────────────
   TrustedMarquee — horizontal infinite scroll of company logos
   Design: Premium, larger monochromatic blue logos for trust
───────────────────────────────────────────────────────────── */

const marqueeX = `
@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
`;

const companies = [
  { 
    name: "Google", 
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.16 5.36-7.84 5.36-4.88 0-8.88-4.04-8.88-9s4-9 8.88-9c2.8 0 4.68 1.16 5.76 2.2l2.56-2.48C19.12 1.84 16.08 0 12.48 0 5.8 0 .4 5.4.4 12s5.4 12 12.08 12c6.92 0 11.52-4.88 11.52-11.72 0-.8-.08-1.4-.2-2.04h-11.32z"/>
      </svg>
    )
  },
  { 
    name: "Microsoft", 
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
      </svg>
    )
  },
  { 
    name: "Amazon", 
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M15.93 17.01c-1.57 1.05-3.71 1.63-5.85 1.63-3.14 0-5.93-1.2-7.93-3.12-.19-.18-.04-.43.2-.33 2.37.95 5.17 1.5 8.1 1.5 2.51 0 5.09-.43 7.33-1.29.27-.1.43.19.15.33l.001.28zm1.96-1.5c-.17-.22-.12-.48.11-.63 1.05-.66 2.05-1.43 2.05-2.84 0-1.89-1.39-2.95-3.51-2.95-1.99 0-4.06.94-4.06 2.6 0 .4.09.77.27 1.06.18.28.05.51-.23.46-1.47-.26-2.31-1.32-2.31-2.47 0-1.89 1.83-3.58 4.79-3.58 3.51 0 5.56 2.06 5.56 4.75 0 2.21-1.47 3.32-2.67 4.14-.17.11-.33.02-.27-.17l.27-2.3zm-6.16 2.07c-2.31 0-3.92-1.32-3.92-3.23 0-1.56 1.09-2.58 3.01-2.58 1.13 0 2.22.4 2.22 1.34v.26c0 .88-.6 1.56-1.63 1.56-1.02 0-1.37-.58-1.37-1.12 0-.25.04-.47.11-.64.07-.17-.03-.27-.18-.21-.86.36-1.37 1.25-1.37 2.18 0 1.4 1.14 2.16 2.5 2.16 1.25 0 2.11-.62 2.65-1.43.08-.12.22-.05.2.08l-.22.28c-.62.83-1.61 1.35-2.00 1.35z"/>
      </svg>
    )
  },
  { 
    name: "Apple", 
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.05 20.28c-.98.95-2.05 1.72-3.22 1.72-1.15 0-1.58-.69-2.92-.69-1.34 0-1.84.67-2.91.69-1.16.03-2.34-.84-3.32-1.72-2-1.85-3.53-5.22-3.53-8.39 0-3.15 1.57-6.52 3.53-8.38 1-1 2.22-1.51 3.42-1.51 1.2 0 1.71.69 3.04.69 1.33 0 1.8-.69 3.01-.69 1.19 0 2.37.5 3.37 1.51 1.96 1.86 3.49 5.23 3.49 8.38 0 3.17-1.53 6.54-3.49 8.39l.11-.01zm-4.73-19.1c.01 1.5-1.19 2.87-2.67 2.87-1.48 0-2.65-1.37-2.65-2.87 0-1.5 1.17-2.87 2.65-2.87 1.48 0 2.66 1.37 2.67 2.87z"/>
      </svg>
    )
  },
  { 
    name: "Meta", 
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 4.5C7.3 4.5 3.5 8.3 3.5 13s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5S16.7 4.5 12 4.5zm6.5 8.5c0 3.6-2.9 6.5-6.5 6.5s-6.5-2.9-6.5-6.5 2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5zM12 17c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
      </svg>
    )
  },
  { 
    name: "Stripe", 
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13.962 8.885c-2.455 0-3.828 1.28-3.828 3.047 0 2.902 3.98 2.427 3.98 3.743 0 .531-.494.814-1.341.814-1.132 0-2.522-.387-3.69-.974l-.454 3.036c1.233.56 2.766.924 4.184.924 2.593 0 4.148-1.28 4.148-3.09 0-2.993-3.98-2.473-3.98-3.766 0-.494.417-.79 1.25-.79.948 0 2.213.315 3.14.73l.484-3.047c-1.11-.476-2.528-.627-3.893-.627zm-10.457.734h3.145V22h-3.145V9.619zm0-4.83h3.145v3.136h-3.145V4.789zm13.125 4.83h3.146V22h-3.146V9.619zm0-4.83h3.146v3.136h-3.146V4.789z"/>
      </svg>
    )
  },
  { 
    name: "Airbnb", 
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 1.5a7.5 7.5 0 00-6.12 11.83L12 22.5l6.12-9.17A7.5 7.5 0 0012 1.5zm0 10.5a3 3 0 110-6 3 3 0 010 6z"/>
      </svg>
    )
  },
  { 
    name: "Netflix", 
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M5.5 0h4v18.5c0 .8.5 1.5 1.2 1.8l-5.2-1.3V0zm9 0h4v24l-4-1V0zm-4.5 10.5L14.5 0h4l-9 24v-1.5L10 10.5z"/>
      </svg>
    )
  }
];

import type { Language } from "@/routes/index";
import { copy } from "@/routes/index";

/* Pill chip per company */
function Chip({ name, svg }: { name: string; svg: React.ReactNode }) {
  return (
    <div className="mx-6 flex shrink-0 items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/30 px-8 py-5 shadow-[0_4px_20px_rgba(37,99,235,0.04)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-blue-50/50 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)]">
      <div className="text-blue-600/80">
        {svg}
      </div>
      <span className="whitespace-nowrap text-lg font-bold tracking-tight text-blue-900/70">
        {name}
      </span>
    </div>
  );
}

export function TrustedMarquee({ language }: { language: Language }) {
  const t = copy[language];
  
  return (
    <section className="relative overflow-hidden py-16 sm:py-20" dir="ltr">
      <style>{marqueeX}</style>

      {/* Label */}
      <div className="mb-10 text-center" dir={t.dir}>
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] mb-4">
          {t.trustedLabel}
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {t.trustedTitle}
        </h3>
      </div>

      {/* Track — left fade mask on both edges */}
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        {/* Row 1 — scrolls LEFT */}
        <div className="flex py-4" style={{ animation: "marquee-left 14s linear infinite" }}>
          {[...companies, ...companies].map((c, i) => (
            <Chip key={`r1-${i}`} name={c.name} svg={c.svg} />
          ))}
        </div>
      </div>
    </section>
  );
}
