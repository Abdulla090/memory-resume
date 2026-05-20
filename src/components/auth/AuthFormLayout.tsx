import { Link } from "@tanstack/react-router";
import { Cloud, Shield, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type AuthFormLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  isKu?: boolean;
};

export function AuthFormLayout({ title, subtitle, children, footer, isKu }: AuthFormLayoutProps) {
  const perks = isKu
    ? ["پاشەکەوتکردنی هەور", "سیڤیی زیرەک", "تایبەتمەندی تەواو"]
    : ["Cloud backup", "AI-tailored CVs", "Private & secure"];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(165deg,oklch(0.97_0.01_250)_0%,oklch(0.99_0.004_95)_42%,oklch(0.96_0.02_240)_100%)]">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-screen max-w-[440px] flex-col justify-center px-4 py-10 sm:py-14">
        <div className="rounded-2xl border border-border/70 bg-card/95 p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.18)] backdrop-blur-sm sm:p-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <span aria-hidden>←</span>
            MemoryCV
          </Link>

          <div className="mt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              <Sparkles className="h-3 w-3" />
              {isKu ? "هەژماری خۆڕایی" : "Free account"}
            </span>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-[1.65rem]">
              {title}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2">
            {perks.map((label) => (
              <li
                key={label}
                className="inline-flex items-center gap-1 rounded-lg border border-border/80 bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {label.includes("Cloud") || label.includes("هەور") ? (
                  <Cloud className="h-3 w-3 shrink-0 text-primary" />
                ) : (
                  <Shield className="h-3 w-3 shrink-0 text-primary" />
                )}
                {label}
              </li>
            ))}
          </ul>

          <div className="auth-clerk-shell mt-7">{children}</div>

          {footer && (
            <div className="mt-8 border-t border-border/60 pt-6 text-center text-sm text-muted-foreground">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
