import { Link } from "@tanstack/react-router";
import { Sparkles, FileText, BarChart3, CheckCircle2 } from "lucide-react";
import type { ReactNode } from "react";

type AuthFormLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  isKu?: boolean;
};

/** Floating resume card shown on the dark branding panel */
function ResumeMockup({ isKu }: { isKu?: boolean }) {
  return (
    <div className="auth-resume-mockup">
      {/* Card surface */}
      <div className="auth-resume-card">
        {/* Header row */}
        <div className="auth-resume-header">
          <div className="auth-resume-avatar" />
          <div className="auth-resume-meta">
            <div className="auth-resume-bar" style={{ width: "72%", height: "10px" }} />
            <div className="auth-resume-bar" style={{ width: "48%", height: "7px", opacity: 0.5 }} />
          </div>
          <div className="auth-resume-badge">
            <CheckCircle2 size={11} className="text-sky-400" />
          </div>
        </div>

        {/* Section label */}
        <div className="auth-resume-section-label">
          <BarChart3 size={9} className="auth-resume-icon" />
          <span>{isKu ? "بەتوانایی" : "Skills"}</span>
        </div>

        {/* Skill bars */}
        {[
          { label: isKu ? "React" : "React", pct: 92, delay: "0ms" },
          { label: isKu ? "تایپ‌ئێسکریپت" : "TypeScript", pct: 85, delay: "80ms" },
          { label: isKu ? "UI/UX" : "UI/UX", pct: 78, delay: "160ms" },
        ].map((skill) => (
          <div key={skill.label} className="auth-resume-skill-row">
            <span className="auth-resume-skill-label">{skill.label}</span>
            <div className="auth-resume-skill-track">
              <div
                className="auth-resume-skill-fill"
                style={{ width: `${skill.pct}%`, animationDelay: skill.delay }}
              />
            </div>
            <span className="auth-resume-skill-pct">{skill.pct}%</span>
          </div>
        ))}

        {/* Divider */}
        <div className="auth-resume-divider" />

        {/* Section label */}
        <div className="auth-resume-section-label">
          <FileText size={9} className="auth-resume-icon" />
          <span>{isKu ? "ئەزموون" : "Experience"}</span>
        </div>

        {/* Experience rows */}
        {[
          { title: isKu ? "مهەندسی باش" : "Senior Engineer", sub: isKu ? "٢٠٢٢ — ئێستا" : "2022 — Present", dot: "bg-sky-400" },
          { title: isKu ? "دیزاینەری UI" : "UI Designer", sub: isKu ? "٢٠١٩ — ٢٠٢٢" : "2019 — 2022", dot: "bg-blue-400" },
        ].map((exp) => (
          <div key={exp.title} className="auth-resume-exp-row">
            <div className={`auth-resume-dot ${exp.dot}`} />
            <div>
              <div className="auth-resume-bar" style={{ width: "60%", height: "8px" }} />
              <div className="auth-resume-bar" style={{ width: "38%", height: "6px", opacity: 0.45, marginTop: "4px" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Floating score badge */}
      <div className="auth-resume-score">
        <span className="auth-resume-score-num">98</span>
        <span className="auth-resume-score-label">{isKu ? "نمرە" : "Score"}</span>
      </div>

      {/* Floating tag */}
      <div className="auth-resume-tag">
        <Sparkles size={9} className="text-sky-300" />
        <span>{isKu ? "باشترین ٥٪" : "Top 5%"}</span>
      </div>
    </div>
  );
}

export function AuthFormLayout({ title, subtitle, children, footer, isKu }: AuthFormLayoutProps) {
  const featureList = isKu
    ? [
        "پاشەکەوتکردنی هەوری ئۆتۆماتیکی",
        "سیڤیی زیرەک بە AI",
        "داگرتنی PDF بە یەک کلیک",
      ]
    : [
        "Auto cloud backup",
        "AI-tailored CVs",
        "One-click PDF export",
      ];

  return (
    <div className="auth-root">
      {/* ── Left branding panel (hidden on mobile) ─────────────── */}
      <div className="auth-panel-brand" aria-hidden>
        {/* Grid background */}
        <div className="auth-grid-bg" />
        {/* Glow blobs */}
        <div className="auth-glow auth-glow-1" />
        <div className="auth-glow auth-glow-2" />

        <div className="auth-panel-inner">
          {/* Logo wordmark */}
          <Link to="/" className="auth-logo-link" tabIndex={-1}>
            <div className="auth-logo-icon">
              <FileText size={14} className="text-white" />
            </div>
            <span className="auth-logo-text">MemoryCV</span>
          </Link>

          {/* Headline */}
          <div className="auth-brand-headline">
            <h2 className="auth-brand-title">
              {isKu ? "قەدەغەیەکی پیشەیی" : "Power your career."}
            </h2>
            <p className="auth-brand-sub">
              {isKu
                ? "داتابەیسی کەسیی سەرکەوتنەکانت. لە هەر شوێنێک."
                : "Your personal database of professional achievements. Anywhere."}
            </p>
          </div>

          {/* Floating mockup */}
          <ResumeMockup isKu={isKu} />

          {/* Feature bullets */}
          <ul className="auth-features">
            {featureList.map((f) => (
              <li key={f} className="auth-feature-item">
                <CheckCircle2 size={13} className="auth-feature-icon" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Right form panel ────────────────────────────────────── */}
      <div className="auth-panel-form">
        {/* Subtle background texture */}
        <div className="auth-form-bg" />

        <div className="auth-form-inner">
          {/* Back link */}
          <Link to="/" className="auth-back-link">
            <span aria-hidden className="auth-back-arrow">←</span>
            <span>MemoryCV</span>
          </Link>

          {/* Badge */}
          <div className="auth-badge">
            <Sparkles size={10} className="auth-badge-icon" />
            <span>{isKu ? "هەژماری خۆڕایی" : "Free account"}</span>
          </div>

          {/* Title */}
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">{subtitle}</p>

          {/* Clerk / custom form */}
          <div className="auth-form-shell">{children}</div>

          {/* Footer link */}
          {footer && (
            <div className="auth-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
