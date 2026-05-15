import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Download, Heart, Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  THANKS_TEMPLATES,
  ThanksPreview,
} from "@/components/thanks/registry";
import {
  CARD_H,
  CARD_W,
  type ThanksData,
  type ThanksTemplateId,
} from "@/components/thanks/types";
import { exportLandscapeCardAsPDF } from "@/lib/pdf-landscape";
import { useAppStore } from "@/lib/store";

const isEnglishWord = (text: string) => /[A-Za-z]/.test(text);

const MixedText = ({
  value,
  className,
  dir,
}: {
  value: string;
  className?: string;
  dir?: "rtl" | "ltr";
}) => (
  <span className={className} dir={dir ?? "auto"} style={{ unicodeBidi: "plaintext" }}>
    {value.split(/(\s+)/).map((part, i) =>
      isEnglishWord(part) ? (
        <bdi key={i}>{part}</bdi>
      ) : (
        <span key={i}>{part}</span>
      ),
    )}
  </span>
);

export const Route = createFileRoute("/dashboard/thanks")({
  head: () => ({
    meta: [
      { title: "Thank-You Cards — MemoryCV" },
      {
        name: "description",
        content:
          "Design a landscape thank-you or invitation card for graduations, weddings, and celebrations.",
      },
    ],
  }),
  component: ThanksPage,
});

const DEFAULT_DATA: ThanksData = {
  headline: "Thank You",
  recipient: "To Our Dear Family & Friends",
  message:
    "Your presence and support made this moment truly unforgettable. From the bottom of our hearts, thank you for celebrating with us.",
  sender: "The Hassan Family",
  occasion: "Graduation Ceremony · 2026",
  date: "June 12, 2026",
  monogram: "S & A",
};

const PRESETS: { label: string; patch: Partial<ThanksData> }[] = [
  {
    label: "Graduation",
    patch: {
      headline: "Thank You",
      occasion: "Graduation Ceremony · 2026",
      recipient: "To Our Dear Family & Friends",
      message:
        "Your presence and support made this milestone truly unforgettable. Thank you for celebrating this chapter with us.",
      sender: "The Hassan Family",
      date: "June 12, 2026",
      monogram: "S.H",
    },
  },
  {
    label: "Wedding",
    patch: {
      headline: "With Gratitude",
      occasion: "Our Wedding Day",
      recipient: "To Our Cherished Guests",
      message:
        "We are endlessly grateful for your love, prayers, and presence on the most beautiful day of our lives.",
      sender: "Sara & Ahmed",
      date: "May 5, 2026",
      monogram: "S & A",
    },
  },
  {
    label: "Birthday",
    patch: {
      headline: "Thank You",
      occasion: "Birthday Celebration",
      recipient: "To Everyone Who Celebrated With Us",
      message:
        "Thank you for filling the day with warmth, laughter, and wonderful memories. Your kindness means the world.",
      sender: "— Leila",
      date: "April 22, 2026",
      monogram: "L",
    },
  },
  {
    label: "Corporate",
    patch: {
      headline: "Thank You",
      occasion: "Annual Partner Summit",
      recipient: "To Our Valued Partners",
      message:
        "Thank you for your trust and collaboration. Together we continue to build something exceptional.",
      sender: "MemoryCV Team",
      date: "March 18, 2026",
      monogram: "",
    },
  },
  {
    label: "You're Invited",
    patch: {
      headline: "You're Invited",
      occasion: "Please Join Us",
      recipient: "Hassan & Layla",
      message:
        "We request the honor of your company to celebrate our graduation ceremony on the evening of June 12th.",
      sender: "The Hassan Family",
      date: "June 12, 2026 · 7:00 PM",
      monogram: "H & L",
    },
  },
];

function ThanksPage() {
  const language = useAppStore((s) => s.language);
  const isKu = language === "ku";

  const [template, setTemplate] = useState<ThanksTemplateId>("azure-classic");
  const [data, setData] = useState<ThanksData>(DEFAULT_DATA);
  const [exporting, setExporting] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const activeTemplate = useMemo(
    () => THANKS_TEMPLATES.find((t) => t.id === template) ?? THANKS_TEMPLATES[0],
    [template]
  );

  const update = <K extends keyof ThanksData>(key: K, value: ThanksData[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const applyPreset = (patch: Partial<ThanksData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    toast.success(isKu ? "نموونە دانرا" : "Preset applied");
  };

  const handleDownload = async () => {
    if (!svgRef.current || exporting) return;
    setExporting(true);
    try {
      const filename =
        `${data.headline || "thank-you"} — ${data.occasion || "card"}`
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .toLowerCase() || "thank-you-card";
      await exportLandscapeCardAsPDF(svgRef.current, filename);
      toast.success(isKu ? "PDF دابەزێنرا" : "Vector PDF downloaded");
    } catch (e) {
      toast.error(
        e instanceof Error
          ? e.message
          : isKu
            ? "دابەزاندن سەرکەوتوو نەبوو."
            : "Download failed."
      );
    } finally {
      setExporting(false);
    }
  };

  // Fit-to-pane scaling
  const [pane, setPane] = useState<HTMLDivElement | null>(null);
  const [fitScale, setFitScale] = useState(0.6);
  useEffect(() => {
    if (!pane) return;
    const update = () => {
      const availableW = Math.max(320, pane.clientWidth - 48);
      const availableH = Math.max(360, pane.clientHeight - 48);
      const scale = Math.min(1, availableW / CARD_W, availableH / CARD_H);
      setFitScale(scale);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(pane);
    return () => ro.disconnect();
  }, [pane]);

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 pb-12" dir={isKu ? "rtl" : "ltr"}>
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 rounded-[2rem] border border-slate-200/80 bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 shadow-[0_24px_70px_-40px_rgba(15,23,42,0.22)]"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
            <Heart className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              <MixedText value={isKu ? "کارتی سوپاس و بانگهێشت" : "Thank-You & Invitation Cards"} />
            </h1>
            <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-600">
              {isKu
                ? "کارتێکی لاندسکێپ دروست بکە بۆ دەرچوون، هاوسەرگیری، یان بروانامە. هەموو دەقەکان بە شێوەی ڕاست دەردەکەون و دەرکردن وەک PDF ڤێکتۆر دەبێت."
                : "Design a landscape card for graduations, weddings, or certificates — exported as a true vector PDF."}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleDownload}
          disabled={exporting}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:pointer-events-none disabled:opacity-60"
        >
          {exporting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          <MixedText value={isKu ? "دابەزاندنی PDF" : "Download Vector PDF"} />
        </button>
      </motion.header>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        {/* Left: editor */}
        <aside className="flex flex-col gap-5 rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm">
          {/* Presets */}
          <section>
            <h3 className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              <Sparkles className="h-3.5 w-3.5 text-sky-500" />
              {isKu ? "نموونەی خێرا" : "Quick presets"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => applyPreset(p.patch)}
                  className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-[11px] font-bold text-sky-700 transition-colors hover:bg-sky-100"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </section>

          <div className="h-px bg-slate-100" />

          {/* Templates */}
          <section>
            <h3 className="mb-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              {isKu ? "تیمپڵەیت" : "Template"}
            </h3>
            <div className="grid max-h-[420px] grid-cols-2 gap-2 overflow-y-auto pr-1">
              {THANKS_TEMPLATES.map((t) => {
                const isActive = t.id === template;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTemplate(t.id)}
                    className={`relative flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition-all ${
                      isActive
                        ? "border-sky-300 bg-sky-50 shadow-[0_0_0_3px_rgba(14,165,233,0.12)]"
                        : "border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/40"
                    }`}
                  >
                    {isActive && (
                      <CheckCircle2 className="absolute right-2 top-2 h-4 w-4 text-sky-500" />
                    )}
                    <span className="text-[12px] font-bold text-slate-900">{t.label}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-600">
                      {t.tag}
                    </span>
                    <span className="text-[10px] font-medium leading-tight text-slate-500">
                      {t.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="h-px bg-slate-100" />

          {/* Fields */}
          <section className="flex flex-col gap-3">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
              <MixedText value={isKu ? "ناوەڕۆک" : "Content"} />
            </h3>

            <Field
              label={isKu ? "سەردێڕ" : "Headline"}
              value={data.headline}
              onChange={(v) => update("headline", v)}
              placeholder="Thank You"
            />
            <Field
              label={isKu ? "بۆنە" : "Occasion"}
              value={data.occasion}
              onChange={(v) => update("occasion", v)}
              placeholder="Graduation Ceremony · 2026"
            />
            <Field
              label={isKu ? "بۆ" : "Recipient"}
              value={data.recipient}
              onChange={(v) => update("recipient", v)}
              placeholder="To Our Dear Family & Friends"
            />
            <Field
              label={isKu ? "پەیام" : "Message"}
              value={data.message}
              onChange={(v) => update("message", v)}
              multiline
              placeholder="Your presence made our day unforgettable…"
            />
            <Field
              label={isKu ? "لەلایەن" : "Sender"}
              value={data.sender}
              onChange={(v) => update("sender", v)}
              placeholder="The Hassan Family"
            />
            <Field
              label={isKu ? "ڕێکەوت" : "Date (optional)"}
              value={data.date ?? ""}
              onChange={(v) => update("date", v)}
              placeholder="June 12, 2026"
            />
            <Field
              label={isKu ? "ناوی کورت / مۆنۆگرام" : "Monogram (optional)"}
              value={data.monogram ?? ""}
              onChange={(v) => update("monogram", v)}
              placeholder="S & A"
            />
          </section>
        </aside>

        {/* Right: live preview */}
        <div
          ref={setPane}
          className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-50 p-4 sm:p-8 shadow-[0_18px_50px_-32px_rgba(15,23,42,0.22)]"
        >
          <div className="absolute left-4 top-4 rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-600 shadow-sm backdrop-blur">
            {activeTemplate.label}
          </div>

          <div
            style={{
              width: CARD_W * fitScale,
              height: CARD_H * fitScale,
            }}
            className="overflow-hidden rounded-[1rem] shadow-[0_36px_80px_-30px_rgba(15,23,42,0.32)] ring-1 ring-slate-200"
          >
            <ThanksPreview data={data} template={template} svgRef={svgRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="resize-none rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-[13px] text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-400/10"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2.5 text-[13px] text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-400/10"
        />
      )}
    </label>
  );
}
