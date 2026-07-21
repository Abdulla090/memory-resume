import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

type AuthFormLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  isKu?: boolean;
};

/**
 * Ultra-SaaS split auth layout — Linear / Figma / Expo grade.
 * Left: editorial dark panel with product narrative + testimonial.
 * Right: bone-white form panel with tight typography.
 */
export function AuthFormLayout({ title, subtitle, children, footer, isKu }: AuthFormLayoutProps) {
  const dir = isKu ? "rtl" : "ltr";
  const bullets = isKu
    ? [
        "پاشەکەوتکردنی ئۆتۆماتیکی هەور",
        "سیڤیی زیرەک بۆ هەر پۆستێک",
        "ناردنی PDF بە یەک کلیک",
      ]
    : [
        "Automatic cloud sync across devices",
        "AI-tailored resumes for any role",
        "Export vector PDF in one click",
      ];

  const quote = isKu
    ? "لە کاتژمێرێکدا سیڤییەکی پیشەیی و تایبەتم بۆ پۆستەکەم دروستکرد."
    : "I shipped a role-specific, recruiter-ready resume in under an hour.";
  const quoteAuthor = isKu ? "لانا م. — بەرپرسی بەرهەم" : "Lana M. — Product Lead";

  return (
    <div dir={dir} className="min-h-screen w-full bg-white text-slate-900 antialiased">
      <div className="grid min-h-screen w-full lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        {/* LEFT — editorial dark panel */}
        <aside className="relative hidden overflow-hidden bg-[#0A0B10] text-white lg:flex lg:flex-col lg:justify-between">
          {/* Precision grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse at 30% 20%, #000 40%, transparent 75%)",
            }}
          />
          {/* Aurora */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.18 258) 0%, transparent 60%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.7 0.15 220) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10 flex items-center gap-2.5 px-12 pt-10">
            <Link to="/" className="group inline-flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 ring-1 ring-white/15 backdrop-blur">
                <span className="h-2 w-2 rounded-[2px] bg-white" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">MemoryCV</span>
            </Link>
          </div>

          <div className="relative z-10 flex flex-col gap-10 px-12 pb-16">
            <div className="max-w-md">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {isKu ? "بەردەست بۆ سەرجەم بەکارهێنەران" : "Trusted by 12,000+ builders"}
              </div>
              <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-[2.35rem]">
                {isKu ? (
                  <>
                    بیرەوەریی AI ـەکەت،
                    <br />
                    سیڤییەکی بێکۆتا.
                  </>
                ) : (
                  <>
                    Your AI memory.
                    <br />
                    <span className="text-white/50">Infinite resumes.</span>
                  </>
                )}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/60">
                {isKu
                  ? "کارە کۆنەکان و بەڵگەکانت بگۆڕە بۆ سیڤییەکی تایبەتی و ئامادە بۆ هەر ڕۆڵێک."
                  : "Turn your ChatGPT, Claude, or Gemini memory into recruiter-ready resumes — tailored per role in seconds."}
              </p>
            </div>

            <ul className="space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14px] text-white/80">
                  <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <figure className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
              <div className="absolute -top-2 left-5 h-4 w-4 rotate-45 border-l border-t border-white/10 bg-white/[0.03]" />
              <blockquote className="text-[14px] leading-relaxed text-white/85">
                “{quote}”
              </blockquote>
              <figcaption className="mt-3 flex items-center gap-2.5 text-[12px] text-white/55">
                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-fuchsia-400 to-sky-400" />
                {quoteAuthor}
              </figcaption>
            </figure>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-white/5 px-12 py-5 text-[11px] uppercase tracking-[0.18em] text-white/40">
            <span>SOC 2 · GDPR</span>
            <span>© MemoryCV</span>
          </div>
        </aside>

        {/* RIGHT — form panel */}
        <main className="relative flex min-h-screen flex-col bg-[#FAFAF7]">
          {/* Mobile top bar */}
          <div className="flex items-center justify-between px-6 pt-6 lg:hidden">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-slate-900">
                <span className="h-1.5 w-1.5 rounded-[2px] bg-white" />
              </span>
              MemoryCV
            </Link>
            <Link to="/" className="text-xs font-medium text-slate-500 hover:text-slate-900">
              {isKu ? "گەڕانەوە" : "← Home"}
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-center px-6 py-10 sm:px-10 lg:py-16">
            <div className="w-full max-w-[400px]">
              <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                {isKu ? "هەژماری خۆڕایی" : "Free account"}
              </div>
              <h1 className="text-[1.75rem] font-semibold leading-tight tracking-tight text-slate-900 sm:text-[2rem]">
                {title}
              </h1>
              <p className="mt-2 text-[14px] leading-relaxed text-slate-500">{subtitle}</p>

              <div className="auth-clerk-shell mt-8">{children}</div>

              {footer && (
                <div className="mt-8 text-center text-[13px] text-slate-500">{footer}</div>
              )}

              <p className="mt-10 text-center text-[11px] leading-relaxed text-slate-400">
                {isKu
                  ? "بە بەردەوامبوون، ڕەزامەندی دەدەیت لەگەڵ مەرجەکان و سیاسەتی تایبەتی."
                  : "By continuing you agree to our Terms and Privacy Policy."}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
