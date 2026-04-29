import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { ArrowLeft, Sparkles, LayoutTemplate, CheckCircle2, Languages } from "lucide-react";
import { ResumePreview } from "@/components/resume/templates";
import { useAppStore } from "@/lib/store";
import type { ResumeData, TemplateId } from "@/lib/types";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates — MemoryCV" },
      { name: "description", content: "Preview the resume templates available inside the MemoryCV editor." },
    ],
  }),
  component: TemplatesPage,
});

const SAMPLE: ResumeData = {
  name: "Maya Okafor",
  title: "Staff Software Engineer",
  email: "maya@example.com",
  phone: "+49 30 1234 5678",
  photoUrl: "https://picsum.photos/seed/maya-okafor-headshot/240/240",
  location: "Berlin, Germany",
  summary:
    "Staff engineer with 8 years scaling distributed payment systems. Brought a ledger platform to 12M tx/day and cut risk-scoring p99 from 480ms to 65ms. Mentor, speaker, and maintainer.",
  experience: [
    {
      title: "Staff Software Engineer",
      company: "Klarna",
      duration: "2022 — Present",
      description: "Owns the BNPL risk-scoring service across EU markets.",
      achievements: [
        "Rewrote risk-scoring hot path in Go, cutting p99 latency from 480ms to 65ms.",
        "Led architecture review across 4 squads, unblocking a major product launch.",
        "Founded an internal Rust guild with 30+ active contributors.",
      ],
    },
    {
      title: "Senior Engineer",
      company: "N26",
      duration: "2019 — 2022",
      description: "Migrated payment ledger from monolith to event-sourced microservices.",
      achievements: [
        "Architected and shipped an event-sourced ledger handling 12M transactions a day.",
        "Reduced settlement reconciliation errors by 94% during the first quarter after launch.",
      ],
    },
  ],
  projects: [
    {
      name: "pgPool-rs",
      description: "Open-source Postgres connection pooler written in Rust.",
      tech: ["Rust", "Postgres", "Tokio"],
      impact: "Used by multiple startup engineering teams.",
    },
  ],
  education: [{ degree: "BSc Computer Science", institution: "TU Munich", year: "2016" }],
  skills: ["TypeScript", "Go", "Rust", "Python", "PostgreSQL", "Kafka", "Kubernetes", "AWS"],
  certifications: ["AWS Solutions Architect Professional"],
};

function toSoraniResume(data: ResumeData): ResumeData {
  return {
    ...data,
    name: "شوان کەمال",
    title: "ئەندازیاری سینیۆری نەرمەکاڵا",
    email: data.email ?? "shwan@example.com",
    phone: data.phone ?? "+964 750 000 0000",
    location: "هەولێر، کوردستان",
    summary:
      "ئەندازیاری نەرمەکاڵا بە ئەزموونی فراوان لە دروستکردنی سیستەمی پەیوەندیدار و خزمەتگوزارییە دیجیتاڵییەکان. پسپۆڕ لە باشترکردنی خێرایی، ڕێکخستنی تیم، و گواستنەوەی بیرۆکە ئاڵۆزەکان بۆ بەرهەمی کاریگەر.",
    experience: [
      {
        title: "ئەندازیاری سینیۆری نەرمەکاڵا",
        company: "کۆمپانیای تەکنەلۆژی ڕووناک",
        duration: "٢٠٢٢ — ئێستا",
        description: "سەرپەرشتیاری بنیاتنانی خزمەتگوزارییە سەرەکییەکان و باشترکردنی ئەدای سیستەم.",
        achievements: [
          "خێرایی وەڵامدانەوەی سیستەم بە شێوەیەکی بەرچاو باشترکرا و ئەزموونی بەکارهێنەر ڕوونتر بوو.",
          "ڕێنمایی چوار تیمی جیاواز کرا بۆ ڕادەستکردنی بەرهەمێکی گرنگ لە کاتی دیاریکراو.",
          "ڕێکخستنی ڕێبازێکی نوێ بۆ پشکنینی کۆد و کەمکردنەوەی هەڵەکانی بەرهەم.",
        ],
      },
      {
        title: "ئەندازیاری نەرمەکاڵا",
        company: "ستۆدیۆی دیجیتاڵی کاروان",
        duration: "٢٠١٩ — ٢٠٢٢",
        description: "دروستکردنی داشبۆرد و سیستەمی ناوخۆیی بۆ بەڕێوەبردنی کار.",
        achievements: [
          "پرۆسەی ڕاپۆرتکردن بە ئۆتۆماتیکی کرا و کاتی کاری هەفتانە کەمکرایەوە.",
          "چوارچێوەی هاوبەشی UI دروستکرا بۆ یەکسانکردنی ئەزموونی بەکارهێنەر.",
        ],
      },
    ],
    projects: [
      {
        name: "سیستەمی هەڵسەنگاندنی زیرەک",
        description: "ئامرازێکی ناوخۆیی بۆ ڕێکخستن و پێوانەکردنی کارایی تیمەکان.",
        tech: ["TypeScript", "React", "PostgreSQL"],
        impact: "بەکارهاتووە لەلایەن چەند تیمێکی بەرهەم.",
      },
      {
        name: "داشبۆردی ڕاپۆرت",
        description: "بینینی خێرای داتای کار و پێوەرە گرنگەکان بۆ بەڕێوەبەران.",
        tech: ["Node.js", "Charts", "API"],
        impact: "کاتی ئامادەکردنی ڕاپۆرتی مانگانەی کەمکردەوە.",
      },
    ],
    education: [{ degree: "بەکالۆریۆس لە زانستی کۆمپیوتەر", institution: "زانکۆی سەلاحەدین", year: "٢٠١٦" }],
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "AWS", "ڕێبەرایەتی تیم", "چارەسەرکردنی کێشە"],
    skillItems: [
      { name: "TypeScript", level: 5 },
      { name: "React", level: 5 },
      { name: "Node.js", level: 4 },
      { name: "PostgreSQL", level: 4 },
      { name: "Docker", level: 3 },
      { name: "AWS", level: 4 },
      { name: "ڕێبەرایەتی تیم", level: 5 },
      { name: "چارەسەرکردنی کێشە", level: 5 },
    ],
    certifications: ["بڕوانامەی پیشەیی AWS", "بڕوانامەی بەڕێوەبردنی پرۆژە"],
  };
}

type Category = "All" | "Minimal" | "Professional" | "Academic" | "Creative";

const TEMPLATES: { id: TemplateId; label: string; desc: string; category: Category; isNew?: boolean }[] = [
  { id: "minimal",   label: "Minimal",   desc: "Clean hierarchy", category: "Minimal" },
  { id: "slate",     label: "Slate",      desc: "Swiss precision", category: "Minimal" },
  { id: "avant",     label: "Avant",      desc: "Brutalist lines", category: "Minimal" },
  { id: "vanguard",  label: "Vanguard",   desc: "Massive typography", category: "Minimal" },
  { id: "executive", label: "Executive",  desc: "Dark sidebar", category: "Professional", isNew: false },
  { id: "apex",      label: "Apex",       desc: "Bold top bar", category: "Professional" },
  { id: "monolith",  label: "Monolith",   desc: "Highly structured", category: "Professional" },
  { id: "metric",    label: "Metric",     desc: "Data-driven", category: "Professional" },
  { id: "carbon",    label: "Carbon",     desc: "Charcoal sidebar", category: "Professional", isNew: true },
  { id: "atlas",     label: "Atlas",      desc: "Corporate authority", category: "Professional", isNew: true },
  { id: "new-sleek", label: "NEW Sleek A4", desc: "Photo-led precision", category: "Professional", isNew: true },
  { id: "new-professional", label: "NEW Professional A4", desc: "Executive sidebar", category: "Professional", isNew: true },
  { id: "new-academic", label: "NEW Academic A4", desc: "Research CV layout", category: "Academic", isNew: true },
  { id: "ref-torres", label: "NEW Torres Exact", desc: "Blue photo sidebar", category: "Professional", isNew: true },
  { id: "ref-silva", label: "NEW Silva Exact", desc: "Brown account split", category: "Professional", isNew: true },
  { id: "ref-schumacher", label: "NEW Schumacher Exact", desc: "Orange skill bars", category: "Creative", isNew: true },
  { id: "ref-palmerston", label: "NEW Palmerston Exact", desc: "Slate graphic designer", category: "Professional", isNew: true },
  { id: "ref-sanchez", label: "NEW Sanchez Exact", desc: "Timeline manager", category: "Professional", isNew: true },
  { id: "noir",      label: "Noir",       desc: "All-black luxury", category: "Creative" },
  { id: "cipher",    label: "Cipher",     desc: "Dark tech aesthetic", category: "Creative" },
  { id: "pinnacle",  label: "Pinnacle",   desc: "Dark layered layout", category: "Creative" },
  { id: "nexus",     label: "Nexus",      desc: "Timeline SVG nodes", category: "Creative" },
  { id: "orbit",     label: "Orbit",      desc: "Interactive elements", category: "Creative" },
  { id: "prism",     label: "Prism",      desc: "Geometric shapes", category: "Creative" },
  { id: "forge",     label: "Forge",      desc: "Industrial brutalist", category: "Minimal", isNew: true },
  { id: "zenith",    label: "Zenith",     desc: "Gold luxury premium", category: "Professional", isNew: true },
  { id: "vector",    label: "Vector",     desc: "Dark mode tech", category: "Creative", isNew: true },
];

function Thumbnail({ id }: { id: TemplateId }) {
  // Generate a mini CSS abstract representation of the template
  switch (id) {
    case "executive":
      return (
        <div className="w-full h-full bg-white rounded-md flex overflow-hidden border border-slate-200">
          <div className="w-1/3 h-full bg-slate-800 p-1 flex flex-col gap-0.5">
            <div className="w-full h-1 bg-slate-600 rounded-sm" />
            <div className="w-2/3 h-0.5 bg-slate-700 rounded-sm" />
          </div>
          <div className="w-2/3 h-full p-1.5 flex flex-col gap-1">
            <div className="w-full h-1 bg-slate-200 rounded-sm" />
            <div className="w-full h-1 bg-slate-200 rounded-sm" />
            <div className="w-3/4 h-1 bg-slate-200 rounded-sm" />
          </div>
        </div>
      );
    case "noir":
    case "cipher":
    case "pinnacle":
      return (
        <div className="w-full h-full bg-slate-900 rounded-md p-1.5 flex flex-col gap-1 border border-slate-700">
          <div className="w-1/2 h-1.5 bg-slate-500 rounded-sm mx-auto mb-1" />
          <div className="w-full h-1 bg-slate-700 rounded-sm" />
          <div className="w-full h-1 bg-slate-700 rounded-sm" />
          <div className="w-4/5 h-1 bg-slate-700 rounded-sm" />
        </div>
      );
    case "apex":
      return (
        <div className="w-full h-full bg-white rounded-md flex flex-col overflow-hidden border border-slate-200">
          <div className="w-full h-4 bg-slate-800 p-1 flex flex-col justify-center items-center">
            <div className="w-1/2 h-1 bg-slate-500 rounded-sm" />
          </div>
          <div className="p-1 flex flex-col gap-1 flex-1">
            <div className="w-full h-1 bg-slate-200 rounded-sm" />
            <div className="w-3/4 h-1 bg-slate-200 rounded-sm" />
          </div>
        </div>
      );
    case "nexus":
    case "orbit":
    case "prism":
      return (
        <div className="w-full h-full bg-slate-50 rounded-md p-1.5 flex flex-col gap-1 border border-slate-200 relative overflow-hidden">
          <div className="absolute top-1 right-1 w-3 h-3 rounded-full border border-blue-400 opacity-50" />
          <div className="w-1/2 h-1.5 bg-blue-500 rounded-sm mb-1" />
          <div className="w-full h-1 bg-slate-200 rounded-sm" />
          <div className="w-4/5 h-1 bg-slate-200 rounded-sm" />
        </div>
      );
    case "carbon":
      return (
        <div className="w-full h-full bg-white rounded-md flex overflow-hidden border border-slate-200">
          <div className="w-1 h-full bg-slate-900" />
          <div className="w-1/3 h-full bg-slate-100 p-1 flex flex-col gap-0.5">
            <div className="w-3 h-3 rounded-sm bg-slate-300 mb-1" />
            <div className="w-full h-0.5 bg-slate-400 rounded-sm" />
          </div>
          <div className="flex-1 h-full p-1 flex flex-col gap-0.5">
            <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
            <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
          </div>
        </div>
      );
    case "atlas":
      return (
        <div className="w-full h-full bg-white rounded-md flex flex-col overflow-hidden border border-slate-200">
          <div className="w-full h-5 bg-slate-900 p-1 flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-slate-600" />
            <div className="w-1/2 h-1 bg-slate-600 rounded-sm" />
          </div>
          <div className="flex flex-1 p-1 gap-1">
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
              <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
            </div>
            <div className="w-1/3 flex flex-col gap-0.5">
              <div className="w-full h-0.5 bg-slate-300 rounded-sm" />
              <div className="w-full h-0.5 bg-slate-300 rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "forge":
      return (
        <div className="w-full h-full bg-white rounded-md p-1.5 flex flex-col gap-1 border border-slate-200">
          <div className="w-full border-b-2 border-slate-900 pb-1 mb-0.5 flex justify-between">
            <div className="w-1/3 h-1.5 bg-slate-900 rounded-sm" />
            <div className="w-1/4 h-1 bg-slate-400 rounded-sm" />
          </div>
          <div className="flex gap-0.5">
            <div className="w-0.5 h-6 bg-slate-900 shrink-0" />
            <div className="flex flex-col gap-0.5 flex-1">
              <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
              <div className="w-3/4 h-0.5 bg-slate-200 rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "zenith":
      return (
        <div className="w-full h-full bg-white rounded-md p-1 flex flex-col items-center gap-1 border border-slate-200">
          <div className="w-4 h-4 rounded-full bg-slate-200 mt-0.5" />
          <div className="w-1/2 h-1 bg-slate-900 rounded-sm" />
          <div className="w-1/3 h-0.5 bg-yellow-600 rounded-sm" />
          <div className="w-full h-0.5 bg-slate-100 rounded-sm" />
          <div className="w-full h-0.5 bg-slate-100 rounded-sm" />
        </div>
      );
    case "vector":
      return (
        <div className="w-full h-full bg-slate-950 rounded-md flex flex-col overflow-hidden border border-slate-700">
          <div className="w-full bg-slate-900 p-1 border-b border-slate-700">
            <div className="w-1/2 h-1 bg-blue-400 rounded-sm" />
          </div>
          <div className="flex flex-1 p-1 gap-1">
            <div className="flex-1 flex flex-col gap-0.5">
              <div className="w-full h-0.5 bg-slate-700 rounded-sm" />
              <div className="w-3/4 h-0.5 bg-slate-700 rounded-sm" />
            </div>
            <div className="w-1/3 flex flex-col gap-0.5">
              <div className="w-full h-0.5 bg-blue-900 rounded-sm" />
              <div className="w-full h-0.5 bg-blue-900 rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "new-sleek":
      return (
        <div className="w-full h-full bg-white rounded-md p-1.5 flex flex-col gap-1 border border-slate-200">
          <div className="flex items-start justify-between gap-1 border-b border-slate-200 pb-1">
            <div className="space-y-0.5">
              <div className="w-8 h-1.5 bg-slate-900 rounded-sm" />
              <div className="w-10 h-0.5 bg-slate-300 rounded-sm" />
            </div>
            <div className="h-4 w-4 rounded-md bg-slate-200" />
          </div>
          <div className="grid grid-cols-[1fr_0.45fr] gap-1 flex-1">
            <div className="space-y-0.5 pt-1">
              <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
              <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
              <div className="w-4/5 h-0.5 bg-slate-200 rounded-sm" />
            </div>
            <div className="space-y-0.5 border-l border-slate-100 pl-1 pt-1">
              <div className="w-full h-0.5 bg-slate-300 rounded-sm" />
              <div className="w-3/4 h-0.5 bg-slate-300 rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "new-professional":
      return (
        <div className="w-full h-full bg-white rounded-md flex overflow-hidden border border-slate-200">
          <div className="w-1/3 h-full bg-slate-950 p-1">
            <div className="w-4 h-4 rounded-full bg-slate-600 mb-1" />
            <div className="w-full h-0.5 bg-cyan-200 rounded-sm" />
            <div className="w-2/3 h-0.5 bg-slate-600 rounded-sm mt-0.5" />
          </div>
          <div className="flex-1 p-1.5 space-y-1">
            <div className="w-full h-3 bg-slate-100 rounded-sm" />
            <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
            <div className="w-5/6 h-0.5 bg-slate-200 rounded-sm" />
          </div>
        </div>
      );
    case "new-academic":
      return (
        <div className="w-full h-full bg-white rounded-md p-1.5 flex flex-col gap-1 border border-slate-200">
          <div className="flex gap-1 border-b-2 border-slate-900 pb-1">
            <div className="h-4 w-3 rounded-t-full bg-slate-200" />
            <div className="flex-1 space-y-0.5">
              <div className="w-2/3 h-1 bg-slate-900 rounded-sm" />
              <div className="w-1/2 h-0.5 bg-slate-400 rounded-sm" />
            </div>
          </div>
          <div className="grid grid-cols-[1fr_0.4fr] gap-1 pt-1">
            <div className="space-y-0.5">
              <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
              <div className="w-full h-0.5 bg-slate-200 rounded-sm" />
              <div className="w-3/4 h-0.5 bg-slate-200 rounded-sm" />
            </div>
            <div className="space-y-0.5">
              <div className="w-full h-0.5 bg-slate-300 rounded-sm" />
              <div className="w-2/3 h-0.5 bg-slate-300 rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "ref-torres":
      return (
        <div className="w-full h-full bg-white rounded-md overflow-hidden border border-slate-200">
          <div className="h-5 bg-[#315b74]" />
          <div className="flex h-full">
            <div className="w-1/3 bg-slate-100 p-1">
              <div className="mx-auto -mt-3 mb-1 h-7 w-7 rounded-full border-2 border-slate-300 bg-slate-300" />
              <div className="h-1 w-full bg-[#1d3f59] rounded-sm" />
              <div className="mt-1 h-0.5 w-2/3 bg-slate-300 rounded-sm" />
            </div>
            <div className="flex-1 p-1.5 space-y-1">
              <div className="h-1 w-1/2 bg-[#1d3f59] rounded-sm" />
              <div className="h-0.5 w-full bg-slate-200 rounded-sm" />
              <div className="h-0.5 w-4/5 bg-slate-200 rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "ref-silva":
      return (
        <div className="w-full h-full bg-white rounded-md overflow-hidden border border-slate-200">
          <div className="flex h-6 items-center gap-1 bg-[#342820] p-1">
            <div className="h-4 w-4 rounded-full bg-stone-300" />
            <div className="h-4 w-0.5 bg-white" />
            <div className="h-1 w-1/2 bg-white rounded-sm" />
          </div>
          <div className="flex h-full">
            <div className="w-1/3 bg-[#fff0e3] p-1 space-y-1">
              <div className="h-0.5 w-full bg-stone-300 rounded-sm" />
              <div className="h-0.5 w-3/4 bg-stone-300 rounded-sm" />
            </div>
            <div className="flex-1 p-1.5 space-y-1">
              <div className="h-1 w-1/2 bg-stone-800 rounded-sm" />
              <div className="h-0.5 w-full bg-stone-200 rounded-sm" />
              <div className="h-0.5 w-5/6 bg-stone-200 rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "ref-schumacher":
      return (
        <div className="w-full h-full bg-white rounded-md p-1.5 border-2 border-[#7c3cff]">
          <div className="grid grid-cols-[0.45fr_1fr] gap-1">
            <div className="h-4 w-full bg-slate-900 rounded-sm" />
            <div className="grid grid-cols-2 gap-1">
              <div className="h-0.5 w-full bg-slate-400 mt-1" />
              <div className="h-0.5 w-full bg-slate-400 mt-1" />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-[0.45fr_1fr] gap-1">
            <div className="space-y-0.5">
              <div className="h-1 w-2/3 bg-slate-900 rounded-sm" />
              <div className="h-0.5 w-full bg-slate-200 rounded-sm" />
              <div className="h-0.5 w-4/5 bg-slate-200 rounded-sm" />
            </div>
            <div className="grid grid-cols-2 gap-1">
              {[1, 2, 3, 4].map((item) => (
                <div key={item}>
                  <div className="h-0.5 w-3/4 bg-slate-900 rounded-sm" />
                  <div className="mt-0.5 h-1.5 bg-slate-300"><div className="h-full w-2/3 bg-[#ff8a22]" /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case "ref-palmerston":
      return (
        <div className="w-full h-full bg-white rounded-md overflow-hidden border border-slate-200">
          <div className="relative h-7">
            <div className="absolute left-0 top-0 h-5 w-1/3 rounded-br-lg bg-[#303b4e]" />
            <div className="ml-[40%] pt-1 space-y-0.5">
              <div className="h-1.5 w-2/3 bg-[#223a59] rounded-sm" />
              <div className="h-0.5 w-1/2 bg-[#223a59] rounded-sm" />
            </div>
            <div className="absolute bottom-0 left-1 right-1 h-2 rounded-full bg-[#303b4e]" />
          </div>
          <div className="flex h-full">
            <div className="w-1/3 bg-[#303b4e] p-1 space-y-1">
              <div className="h-0.5 w-full bg-white/50 rounded-sm" />
              <div className="h-0.5 w-4/5 bg-white/40 rounded-sm" />
              <div className="mt-1 h-1 bg-white/20"><div className="h-full w-2/3 bg-white" /></div>
            </div>
            <div className="flex-1 p-1.5 space-y-1">
              <div className="h-1 w-1/2 bg-[#223a59] rounded-sm" />
              <div className="h-0.5 w-full bg-slate-200 rounded-sm" />
              <div className="h-0.5 w-5/6 bg-slate-200 rounded-sm" />
            </div>
          </div>
        </div>
      );
    case "ref-sanchez":
      return (
        <div className="w-full h-full bg-white rounded-md overflow-hidden border border-slate-200">
          <div className="relative h-7 bg-[#303b4e]">
            <div className="absolute left-1 top-3 h-5 w-5 rounded-full border-2 border-white bg-slate-300" />
            <div className="ml-9 pt-2 space-y-0.5">
              <div className="h-1.5 w-1/2 bg-white rounded-sm" />
              <div className="h-0.5 w-1/3 bg-white/70 rounded-sm" />
            </div>
          </div>
          <div className="flex h-full">
            <div className="w-1/3 bg-slate-200 p-1 pt-3 space-y-1">
              <div className="h-0.5 w-full bg-slate-500 rounded-sm" />
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <span key={i} className="h-1 w-1 rounded-full bg-[#303b4e]" />)}</div>
            </div>
            <div className="flex-1 p-1.5 space-y-1">
              <div className="h-1 w-1/2 bg-[#303b4e] rounded-sm" />
              <div className="h-0.5 w-full bg-slate-200 rounded-sm" />
              <div className="h-0.5 w-4/5 bg-slate-200 rounded-sm" />
            </div>
          </div>
        </div>
      );
    default:
      // Minimal and others
      return (
        <div className="w-full h-full bg-white rounded-md p-1.5 flex flex-col gap-1 border border-slate-200">
          <div className="w-1/2 h-1.5 bg-slate-300 rounded-sm mb-1" />
          <div className="w-full h-1 bg-slate-100 rounded-sm" />
          <div className="w-full h-1 bg-slate-100 rounded-sm" />
          <div className="w-3/4 h-1 bg-slate-100 rounded-sm" />
        </div>
      );
  }
}

function TemplatesPage() {
  const profile = useAppStore((state) => state.profile);
  const resumes = useAppStore((state) => state.resumes);
  const data: ResumeData = resumes[0]?.data ?? buildFromProfile(profile) ?? SAMPLE;
  
  const [active, setActive] = useState<TemplateId>("minimal");
  const [filter, setFilter] = useState<Category>("All");
  const [soraniMode, setSoraniMode] = useState(false);
  const previewData = useMemo(() => soraniMode ? toSoraniResume(data) : data, [data, soraniMode]);

  const filteredTemplates = useMemo(() => {
    if (filter === "All") return TEMPLATES;
    return TEMPLATES.filter(t => t.category === filter);
  }, [filter]);

  const categories: Category[] = ["All", "Minimal", "Professional", "Academic", "Creative"];

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative overflow-hidden flex flex-col">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-[150px] pointer-events-none mix-blend-multiply" />

      {/* Glass Navigation */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-blue-100/50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 cursor-pointer group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)] group-hover:shadow-[0_4px_16px_rgba(37,99,235,0.4)] transition-all duration-300 group-hover:scale-105">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-[1.05rem] font-bold tracking-tight text-slate-900 group-hover:text-blue-950 transition-colors">
                MemoryCV
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Link 
                to="/onboarding" 
                className="px-4 py-2 text-sm font-medium text-blue-900/70 hover:text-blue-700 bg-white/50 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-xl transition-all duration-300 flex items-center gap-2 shadow-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1600px] w-full mx-auto grid gap-6 px-4 pb-24 pt-6 sm:px-6 lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] relative z-10">
        
        {/* SIDEBAR: Ultimate User Friendly Template Picker */}
        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
          
          {/* Header Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-[1.5rem] p-6 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase mb-3">
              <LayoutTemplate className="w-3.5 h-3.5" />
              Template Library
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Aesthetics</span>
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Select a template to instantly reformat your content.
            </p>
          </div>

          {/* Interactive Picker Area */}
          <div className="bg-white/60 backdrop-blur-md rounded-[1.5rem] p-4 border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col flex-1 min-h-0">
            
            {/* Pill Filters */}
            <div className="flex items-center gap-1.5 mb-4 pb-1 overflow-x-auto scrollbar-hide shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                    filter === cat
                      ? "bg-slate-800 text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1 pb-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {filteredTemplates.map(({ id, label, isNew }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={`group relative flex flex-col items-center gap-2 rounded-[1rem] p-2 transition-all duration-300 text-center ${
                      isActive 
                        ? "bg-blue-600 shadow-[0_8px_20px_rgba(37,99,235,0.2)] border-transparent scale-[1.02]" 
                        : "bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-200 hover:shadow-sm"
                    }`}
                  >
                    {/* Visual Thumbnail */}
                    <div className="w-full aspect-[1/1.2] rounded-lg overflow-hidden relative shadow-[0_2px_10px_rgba(0,0,0,0.05)] bg-slate-100">
                      <Thumbnail id={id} />
                      {isActive && (
                        <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center backdrop-blur-[1px]">
                          <CheckCircle2 className="w-8 h-8 text-blue-600 drop-shadow-md bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    
                    {/* Label */}
                    <div className="w-full px-1 flex flex-col items-center mt-1 mb-1">
                      <span className={`text-sm font-bold truncate w-full ${isActive ? "text-white" : "text-slate-900"}`}>
                        {label}
                      </span>
                    </div>

                    {isNew && !isActive && (
                      <span className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 px-2 py-0.5 rounded-full bg-blue-500 text-white text-[9px] font-bold uppercase tracking-wider shadow-sm z-10 border border-white">
                        New
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Preview Area */}
        <section className="flex flex-col h-full min-h-[800px] lg:h-[calc(100vh-8rem)]">
          <div className="flex-1 bg-slate-200/50 backdrop-blur-3xl rounded-[2rem] p-4 sm:p-6 border border-slate-300/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)] relative flex flex-col overflow-hidden">
            
            {/* Toolbar Area */}
            <div className="flex items-center justify-between mb-4 px-2 shrink-0">
              <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white shadow-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Live Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoraniMode((value) => !value)}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold tracking-wide shadow-sm transition-all active:scale-[0.98] ${
                    soraniMode
                      ? "border-slate-800 bg-slate-900 text-white"
                      : "border-white bg-white/80 text-slate-700 hover:bg-white"
                  }`}
                >
                  <Languages className="h-3.5 w-3.5" />
                  {soraniMode ? "کوردی" : "Kurdish RTL"}
                </button>
                <ExportButtons data={previewData} template={active} name={previewData.name} />
              </div>
            </div>

            {/* Resume Container with smooth scroll */}
            <div className="flex-1 overflow-hidden rounded-[1rem] shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_30px_60px_-20px_rgba(0,0,0,0.15)] bg-white relative @container">
              <ClientPDFPreview data={previewData} template={active} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

import { exportResumePDF } from "@/components/resume/pdf-templates";
import { exportResumeDocx } from "@/components/resume/docx-templates";
import { Download, FileText } from "lucide-react";

function ExportButtons({ data, template, name }: { data: ResumeData; template: TemplateId; name: string }) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [docxLoading, setDocxLoading] = useState(false);
  const filename = name.replace(/\s+/g, "_") || "resume";

  const handlePDF = async () => {
    setPdfLoading(true);
    try { await exportResumePDF(data, template, filename); } finally { setPdfLoading(false); }
  };
  const handleDocx = async () => {
    setDocxLoading(true);
    try { await exportResumeDocx(data, template, filename); } finally { setDocxLoading(false); }
  };

  return (
    <>
      <button
        onClick={handleDocx}
        disabled={docxLoading}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white text-xs font-bold tracking-wide text-slate-700 shadow-sm hover:bg-white hover:shadow-md transition-all disabled:opacity-50"
      >
        <FileText className="w-3.5 h-3.5" />
        {docxLoading ? "..." : "DOCX"}
      </button>
      <button
        onClick={handlePDF}
        disabled={pdfLoading}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 backdrop-blur-md border border-blue-500 text-xs font-bold tracking-wide text-white shadow-sm hover:bg-blue-700 hover:shadow-md transition-all disabled:opacity-50"
      >
        <Download className="w-3.5 h-3.5" />
        {pdfLoading ? "..." : "PDF"}
      </button>
    </>
  );
}



function ClientPDFPreview({ data, template }: { data: ResumeData; template: TemplateId }) {
  return (
    <div className="h-full w-full overflow-auto bg-slate-100 p-4">
      <div
        className="mx-auto w-[794px] min-w-[794px] origin-top overflow-hidden rounded-sm bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.45)]"
        style={{ zoom: "min(1, calc(100cqw / 794))" }}
      >
        <ResumePreview data={data} template={template} />
      </div>
    </div>
  );
}

function buildFromProfile(profile: ReturnType<typeof useAppStore.getState>["profile"]): ResumeData | null {
  if (!profile) return null;

  return {
    name: profile.name,
    title: profile.experience[0]?.title ?? "Professional",
    email: profile.email,
    phone: profile.phone,
    photoUrl: profile.photoUrl,
    location: profile.location,
    summary: profile.summary,
    experience: profile.experience,
    projects: profile.projects,
    education: profile.education,
    skills: [...profile.skills.technical, ...profile.skills.tools].slice(0, 14),
    certifications: profile.certifications,
  };
}
