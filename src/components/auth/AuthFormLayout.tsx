import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, FileText, LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";

type AuthFormLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
  isKu?: boolean;
};

export function AuthFormLayout({ title, subtitle, children, footer, isKu }: AuthFormLayoutProps) {
  const dir = isKu ? "rtl" : "ltr";
  const workflow = isKu
    ? ["زانیارییەکانت کۆبکەرەوە", "سیڤییەکەت بۆ ڕۆڵەکە بگونجێنە", "بە PDF هەناردەی بکە"]
    : ["Capture your career history", "Tailor it to the role", "Export a polished PDF"];

  return (
    <div dir={dir} className="min-h-[100dvh] bg-[#F3F5F7] text-slate-950 antialiased">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1480px] lg:grid-cols-[minmax(360px,0.82fr)_minmax(520px,1.18fr)]">
        <aside className="relative m-4 hidden overflow-hidden rounded-[28px] bg-[#111827] text-white lg:flex lg:flex-col lg:justify-between xl:m-6">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />

          <div className="relative px-10 pt-10 xl:px-14 xl:pt-12">
            <Link to="/" className="inline-flex items-center gap-3 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#2563EB] shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
                <FileText className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.02em]">MemoryCV</span>
            </Link>
          </div>

          <div className="relative px-10 xl:px-14" dir={dir}>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-300">
              {isKu ? "شوێنی کاری پیشەیی" : "Career workspace"}
            </p>
            <h2 className={`mt-5 max-w-[15ch] text-[clamp(2rem,3.2vw,3.35rem)] font-semibold tracking-[-0.045em] ${isKu ? "leading-[1.35]" : "leading-[1.02]"}`}>
              {isKu ? "هەموو ئەو شتانەی بۆ هەنگاوی داهاتووت پێویستن." : "Everything you need for the next career move."}
            </h2>
            <p className="mt-5 max-w-[42ch] text-[14px] leading-7 text-slate-300">
              {isKu
                ? "زانیارییە پیشەییەکانت لە شوێنێکی پارێزراودا ڕێکبخە و بۆ هەر دەرفەتێک سیڤییەکی گونجاو دروست بکە."
                : "Organize your experience in one private workspace, then shape a focused resume for every opportunity."}
            </p>

            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4" dir="ltr">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300">Workspace ready</span>
                </div>
                <LockKeyhole className="h-4 w-4 text-slate-400" strokeWidth={1.8} />
              </div>
              <ol className="divide-y divide-white/10">
                {workflow.map((item, index) => (
                  <li key={item} className="flex items-center gap-4 px-5 py-4">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 font-mono text-[10px] text-slate-400">
                      0{index + 1}
                    </span>
                    <span className="text-[13px] font-medium text-slate-200">{item}</span>
                    <Check className="ms-auto h-4 w-4 shrink-0 text-blue-300" strokeWidth={2} />
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="relative flex items-center justify-between border-t border-white/10 px-10 py-6 text-[11px] text-slate-400 xl:px-14" dir="ltr">
            <span>Private by default</span>
            <span className="font-mono uppercase tracking-[0.16em]">MemoryCV</span>
          </div>
        </aside>

        <main className="flex min-h-[100dvh] flex-col">
          <header className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-12 lg:py-8 xl:px-20">
            <Link to="/" className="inline-flex items-center gap-2 text-[13px] font-semibold text-slate-500 transition-colors hover:text-slate-950">
              <ArrowLeft className={`h-4 w-4 ${isKu ? "rotate-180" : ""}`} strokeWidth={1.8} />
              {isKu ? "گەڕانەوە بۆ سەرەتا" : "Back to home"}
            </Link>
            <div className="inline-flex items-center gap-2 text-[11px] font-medium text-slate-500">
              <LockKeyhole className="h-3.5 w-3.5" strokeWidth={1.8} />
              {isKu ? "پەیوەندیی پارێزراو" : "Secure access"}
            </div>
          </header>

          <div className="flex flex-1 items-center justify-center px-5 pb-12 pt-4 sm:px-8 lg:px-12 lg:pb-20 xl:px-20">
            <div className="w-full max-w-[460px]">
              <div className="mb-8 lg:hidden">
                <Link to="/" className="inline-flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#2563EB] text-white">
                    <FileText className="h-4.5 w-4.5" strokeWidth={1.8} />
                  </span>
                  <span className="font-semibold tracking-tight">MemoryCV</span>
                </Link>
              </div>

              <div className="border-b border-slate-200 pb-7" dir={dir}>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2563EB]">
                  {isKu ? "هەژماری پارێزراو" : "Your account"}
                </p>
                <h1 className={`mt-3 text-[clamp(2rem,5vw,2.75rem)] font-semibold tracking-[-0.045em] text-slate-950 ${isKu ? "leading-[1.3]" : "leading-[1.05]"}`}>
                  {title}
                </h1>
                <p className="mt-3 max-w-[46ch] text-[14px] leading-6 text-slate-500">{subtitle}</p>
              </div>

              <div className="auth-clerk-shell mt-7 rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.28)] sm:p-7">
                {children}
              </div>

              {footer && <div className="mt-6 text-center text-[13px] text-slate-500">{footer}</div>}

              <p className="mx-auto mt-8 max-w-[42ch] text-center text-[11px] leading-5 text-slate-400">
                {isKu
                  ? "بە بەردەوامبوون، ڕەزامەندی لەسەر مەرجەکان و سیاسەتی تایبەتی دەدەیت."
                  : "By continuing, you agree to the Terms and Privacy Policy."}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
