/**
 * TextToolbar — A floating contextual toolbar that appears next to clicked text
 * in the resume preview. Provides quick actions: Edit, Font Size, Weight, Color,
 * Font Family, Text Transform. Positioned relative to the preview container.
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Pencil,
  Type,
  Palette,
  Bold,
  ALargeSmall,
  CaseSensitive,
  X,
  ChevronLeft,
  Minus,
  Plus,
} from "lucide-react";
import type { FieldStyleOverride } from "@/lib/types";

// ── Popular Google Fonts for the font picker ─────────────────────────────────
const FONT_OPTIONS = [
  "System Default",
  "DM Sans",
  "Outfit",
  "Roboto",
  "Lato",
  "Montserrat",
  "Source Sans 3",
  "Raleway",
  "Nunito",
  "Poppins",
  "Work Sans",
  "Manrope",
  "Space Grotesk",
  "Sora",
  "Geist",
  "Plus Jakarta Sans",
  "Playfair Display",
  "Merriweather",
  "Libre Baskerville",
  "Crimson Pro",
];

// ── Color Preset Palette ─────────────────────────────────────────────────────
const COLOR_PRESETS = [
  "#1a1a1a", "#334155", "#475569", "#64748b",
  "#0f172a", "#1e293b", "#0c4a6e", "#1e40af",
  "#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa",
  "#047857", "#059669", "#10b981", "#34d399",
  "#b91c1c", "#dc2626", "#ef4444", "#f87171",
  "#b45309", "#d97706", "#f59e0b", "#fbbf24",
  "#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd",
  "#be185d", "#db2777", "#ec4899", "#f472b6",
  "#ffffff", "#f8fafc", "#f1f5f9", "#e2e8f0",
];

const WEIGHT_OPTIONS = [
  { label: "Thin", value: 100 },
  { label: "Light", value: 300 },
  { label: "Regular", value: 400 },
  { label: "Medium", value: 500 },
  { label: "Semibold", value: 600 },
  { label: "Bold", value: 700 },
  { label: "Black", value: 900 },
];

const TRANSFORM_OPTIONS: { label: string; value: FieldStyleOverride["textTransform"] }[] = [
  { label: "Aa", value: "none" },
  { label: "AA", value: "uppercase" },
  { label: "aa", value: "lowercase" },
  { label: "Ab", value: "capitalize" },
];

type SubPanel = "size" | "weight" | "color" | "font" | "transform" | null;

interface TextToolbarProps {
  /** The field path (e.g. "name", "experience.0.title") */
  path: string;
  /** Current text content at the path */
  value: string;
  /** Current override for this field, if any */
  override: FieldStyleOverride;
  /** Position to anchor the toolbar (relative to preview container) */
  position: { x: number; y: number };
  /** Callback to update the field override */
  onUpdateOverride: (path: string, override: FieldStyleOverride) => void;
  /** Callback to open the inline text editor */
  onEdit: () => void;
  /** Callback to close the toolbar */
  onClose: () => void;
  /** Global design defaults for reference */
  defaults: { fontSize: number; fontFamily: string; color: string };
}

export function TextToolbar({
  path,
  override,
  position,
  onUpdateOverride,
  onEdit,
  onClose,
  defaults,
}: TextToolbarProps) {
  const [subPanel, setSubPanel] = useState<SubPanel>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(override.fontSize ?? defaults.fontSize);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (subPanel) setSubPanel(null);
        else onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose, subPanel]);

  const merge = useCallback(
    (patch: Partial<FieldStyleOverride>) => {
      onUpdateOverride(path, { ...override, ...patch });
    },
    [onUpdateOverride, path, override],
  );

  // Human-readable label for the path
  const label = path
    .replace(/\.\d+\./g, " › ")
    .replace(/\./g, " › ")
    .replace(/^(\w)/, (_, c: string) => c.toUpperCase());

  // Clamp position so toolbar doesn't overflow viewport
  const left = Math.max(12, Math.min(position.x - 140, window.innerWidth - 320));
  const top = Math.max(12, position.y + 8);

  const toolbarButtons = [
    { id: "edit" as const, icon: Pencil, label: "Edit", color: "text-blue-600", bg: "bg-blue-50 hover:bg-blue-100" },
    { id: "size" as SubPanel, icon: ALargeSmall, label: "Size", color: "text-slate-700", bg: "bg-slate-50 hover:bg-slate-100" },
    { id: "weight" as SubPanel, icon: Bold, label: "Weight", color: "text-slate-700", bg: "bg-slate-50 hover:bg-slate-100" },
    { id: "color" as SubPanel, icon: Palette, label: "Color", color: "text-slate-700", bg: "bg-slate-50 hover:bg-slate-100" },
    { id: "font" as SubPanel, icon: Type, label: "Font", color: "text-slate-700", bg: "bg-slate-50 hover:bg-slate-100" },
    { id: "transform" as SubPanel, icon: CaseSensitive, label: "Case", color: "text-slate-700", bg: "bg-slate-50 hover:bg-slate-100" },
  ];

  return (
    <motion.div
      ref={toolbarRef}
      initial={{ opacity: 0, y: 6, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.96 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="fixed z-[300]"
      style={{ left, top }}
    >
      <div className="w-[280px] rounded-2xl bg-white border border-slate-200/80 shadow-[0_16px_48px_-12px_rgba(15,23,42,0.25),0_4px_12px_rgba(15,23,42,0.08)] overflow-hidden">
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
          {subPanel ? (
            <button
              onClick={() => setSubPanel(null)}
              className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ChevronLeft className="size-3.5" />
              Back
            </button>
          ) : (
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.12em] truncate max-w-[200px]">
              {label}
            </p>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="size-3.5" />
          </button>
        </div>

        {/* ── Main toolbar buttons ── */}
        <AnimatePresence mode="wait">
          {!subPanel && (
            <motion.div
              key="main"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.12 }}
              className="p-2 grid grid-cols-3 gap-1.5"
            >
              {toolbarButtons.map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => {
                    if (btn.id === "edit") {
                      onEdit();
                      onClose();
                    } else {
                      setSubPanel(btn.id);
                    }
                  }}
                  className={`flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl ${btn.bg} ${btn.color} transition-all active:scale-95`}
                >
                  <btn.icon className="size-4" />
                  <span className="text-[10px] font-semibold">{btn.label}</span>
                </button>
              ))}
            </motion.div>
          )}

          {/* ── Font Size Sub-Panel ── */}
          {subPanel === "size" && (
            <motion.div
              key="size"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.12 }}
              className="p-3 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Font Size</span>
                <span className="text-xs font-bold text-slate-900 tabular-nums">{fontSize}px</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const v = Math.max(6, fontSize - 1);
                    setFontSize(v);
                    merge({ fontSize: v });
                  }}
                  className="size-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                >
                  <Minus className="size-3.5" />
                </button>
                <input
                  type="range"
                  min={6}
                  max={48}
                  step={1}
                  value={fontSize}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setFontSize(v);
                    merge({ fontSize: v });
                  }}
                  className="flex-1 h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
                <button
                  onClick={() => {
                    const v = Math.min(48, fontSize + 1);
                    setFontSize(v);
                    merge({ fontSize: v });
                  }}
                  className="size-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
              <button
                onClick={() => {
                  setFontSize(defaults.fontSize);
                  const { fontSize: _, ...rest } = override;
                  onUpdateOverride(path, rest);
                }}
                className="text-[10px] font-medium text-slate-400 hover:text-blue-600 transition-colors"
              >
                Reset to default ({defaults.fontSize}px)
              </button>
            </motion.div>
          )}

          {/* ── Font Weight Sub-Panel ── */}
          {subPanel === "weight" && (
            <motion.div
              key="weight"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.12 }}
              className="p-2 space-y-1"
            >
              {WEIGHT_OPTIONS.map((w) => {
                const active = (override.fontWeight ?? 400) === w.value;
                return (
                  <button
                    key={w.value}
                    onClick={() => merge({ fontWeight: w.value })}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                      active
                        ? "bg-slate-900 text-white font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span style={{ fontWeight: w.value }}>{w.label}</span>
                    <span className="text-[10px] opacity-60">{w.value}</span>
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* ── Color Sub-Panel ── */}
          {subPanel === "color" && (
            <motion.div
              key="color"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.12 }}
              className="p-3 space-y-3"
            >
              <div className="flex items-center gap-2">
                <div
                  className="size-7 rounded-lg border-2 border-slate-200 shadow-sm"
                  style={{ backgroundColor: override.color ?? defaults.color }}
                />
                <input
                  type="text"
                  value={override.color ?? defaults.color}
                  onChange={(e) => merge({ color: e.target.value })}
                  className="flex-1 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none focus:border-blue-400 focus:bg-white transition-colors"
                  placeholder="#000000"
                />
              </div>
              <div className="grid grid-cols-8 gap-1.5">
                {COLOR_PRESETS.map((c) => {
                  const active = (override.color ?? defaults.color) === c;
                  return (
                    <button
                      key={c}
                      onClick={() => merge({ color: c })}
                      className={`size-7 rounded-lg border-2 transition-all hover:scale-110 ${
                        active ? "border-blue-500 ring-2 ring-blue-200 scale-110" : "border-slate-200"
                      }`}
                      style={{ backgroundColor: c }}
                      title={c}
                    />
                  );
                })}
              </div>
              <button
                onClick={() => {
                  const { color: _, ...rest } = override;
                  onUpdateOverride(path, rest);
                }}
                className="text-[10px] font-medium text-slate-400 hover:text-blue-600 transition-colors"
              >
                Reset to default
              </button>
            </motion.div>
          )}

          {/* ── Font Family Sub-Panel ── */}
          {subPanel === "font" && (
            <motion.div
              key="font"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.12 }}
              className="perf-scroll p-2 max-h-[240px] overflow-y-auto space-y-0.5 scrollbar-thin scrollbar-thumb-slate-200"
            >
              {FONT_OPTIONS.map((f) => {
                const active = (override.fontFamily ?? defaults.fontFamily) === f || (f === "System Default" && !override.fontFamily);
                return (
                  <button
                    key={f}
                    onClick={() => {
                      if (f === "System Default") {
                        const { fontFamily: _, ...rest } = override;
                        onUpdateOverride(path, rest);
                      } else {
                        merge({ fontFamily: f });
                      }
                    }}
                    className={`w-full flex items-center px-3 py-2 rounded-xl text-sm transition-all ${
                      active
                        ? "bg-slate-900 text-white font-semibold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    style={{ fontFamily: f === "System Default" ? "inherit" : `'${f}', sans-serif` }}
                  >
                    {f}
                  </button>
                );
              })}
            </motion.div>
          )}

          {/* ── Text Transform Sub-Panel ── */}
          {subPanel === "transform" && (
            <motion.div
              key="transform"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.12 }}
              className="p-3 flex gap-2"
            >
              {TRANSFORM_OPTIONS.map((t) => {
                const active = (override.textTransform ?? "none") === t.value;
                return (
                  <button
                    key={t.value}
                    onClick={() => merge({ textTransform: t.value })}
                    className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-xl text-sm font-bold transition-all ${
                      active
                        ? "bg-slate-900 text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <span className="text-lg">{t.label}</span>
                    <span className="text-[9px] font-medium opacity-70">{t.value}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
