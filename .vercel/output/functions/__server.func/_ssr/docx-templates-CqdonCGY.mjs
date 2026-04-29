import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as optimizeResumeForOnePage } from "./resume-utils-BBQwWAqL.mjs";
import { p as pdf, S as StyleSheet } from "../_libs/react-pdf__renderer.mjs";
import { P as Packer, a as Paragraph, T as TextRun, b as Table, c as TableRow, W as WidthType, d as TableCell, S as ShadingType, e as convertInchesToTwip, F as File, B as BorderStyle, A as AlignmentType } from "../_libs/docx.mjs";
import { f as fileSaverPkg } from "../_libs/file-saver.mjs";
import { q as Document, P as Page, V as View, T as Text, e as Image, S as Svg, R as Rect, j as Circle, h as Polygon } from "../_libs/react-pdf__primitives.mjs";
const rtlPattern$2 = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;
function isRTL$2(data) {
  return rtlPattern$2.test(
    [
      data.name,
      data.title,
      data.location,
      data.summary,
      ...data.skills,
      ...data.certifications,
      ...data.experience.flatMap((item) => [item.title, item.company, item.description, ...item.achievements]),
      ...data.projects.flatMap((item) => [item.name, item.description, item.impact, ...item.tech]),
      ...data.education.flatMap((item) => [item.degree, item.institution])
    ].filter(Boolean).join(" ")
  );
}
function label(data, key) {
  const rtl = isRTL$2(data);
  const map = rtl ? {
    profile: "پڕۆفایل",
    executiveProfile: "پڕۆفایلی پیشەیی",
    summary: "پوختە",
    experience: "ئەزموون",
    professionalExperience: "ئەزموونی پیشەیی",
    projects: "پرۆژەکان",
    skills: "لێهاتووییەکان",
    keySkills: "لێهاتووییە سەرەکییەکان",
    expertise: "پسپۆڕی",
    metrics: "پێوەرەکان",
    education: "خوێندن",
    certifications: "بڕوانامەکان",
    terminalExperience: "~/ئەزموون $",
    terminalSkills: "~/لێهاتوویی $",
    terminalEducation: "~/خوێندن $"
  } : {
    profile: "Profile",
    executiveProfile: "Executive Profile",
    summary: "Executive Summary",
    experience: "Experience",
    professionalExperience: "Professional Experience",
    projects: "Projects",
    skills: "Skills",
    keySkills: "Key Skills",
    expertise: "Expertise",
    metrics: "Metrics",
    education: "Education",
    certifications: "Certifications",
    terminalExperience: "~/experience $",
    terminalSkills: "~/skills $",
    terminalEducation: "~/education $"
  };
  return map[key];
}
function NoirTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#0a0a0a] text-neutral-300 p-12 font-sans", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-neutral-800 pb-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-light tracking-[0.15em] rtl:tracking-normal text-white uppercase", children: data.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm tracking-[0.2em] rtl:tracking-normal text-neutral-500 uppercase", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-neutral-600 tracking-widest rtl:tracking-normal uppercase", children: [data.location, data.email, data.phone].filter(Boolean).join("  |  ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-8 text-center max-w-2xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-neutral-400", children: data.summary }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 space-y-8", children: [
      data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-600 border-b border-neutral-800 pb-2", children: label(data, "experience") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between rtl:flex-row-reverse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-base text-white", children: [
              e.title,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-neutral-500 italic", children: [
                "· ",
                e.company
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-neutral-600 tracking-wider rtl:tracking-normal", children: e.duration })
          ] }),
          e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-neutral-400", children: e.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1 text-sm text-neutral-400", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 rtl:flex-row-reverse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-neutral-700", children: "›" }),
            " ",
            a
          ] }, j)) })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-2 gap-8 flex-1", children: [
        data.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-600 border-b border-neutral-800 pb-2", children: label(data, "projects") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white text-sm", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-neutral-400 mt-1", children: p.description }),
            p.tech.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] tracking-wider rtl:tracking-normal text-neutral-600 uppercase", children: p.tech.join(" · ") })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-600 border-b border-neutral-800 pb-2", children: label(data, "skills") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 border border-neutral-800 text-xs text-neutral-400 rounded-sm", children: s }, i)) })
          ] }),
          data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-600 border-b border-neutral-800 pb-2", children: label(data, "education") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-white", children: e.degree }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-neutral-500 mt-0.5", children: [
                e.institution,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-neutral-700", children: "·" }),
                " ",
                e.year
              ] })
            ] }, i)) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ApexTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white text-slate-800 font-sans", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-slate-900 text-white p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-extrabold tracking-tight rtl:tracking-normal", children: data.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xl font-medium text-blue-400", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm text-slate-300 font-medium", children: [data.location, data.email, data.phone].filter(Boolean).join("  •  ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-slate-600 font-medium", children: data.summary }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-3 gap-8 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2 space-y-8", children: [
          data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2", children: label(data, "experience") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between rtl:flex-row-reverse", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-900", children: e.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full", children: e.duration })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-slate-500 mb-2", children: e.company }),
              e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 mb-2", children: e.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-1 pl-4 rtl:pl-0 rtl:pr-4 text-sm text-slate-600 marker:text-slate-300", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a }, j)) })
            ] }, i)) })
          ] }),
          data.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2", children: label(data, "projects") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-900", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 mt-1", children: p.description }),
              p.tech.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs font-semibold text-blue-600", children: p.tech.join(" · ") })
            ] }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "col-span-1 space-y-8", children: [
          data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2", children: label(data, "skills") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md", children: s }, i)) })
          ] }),
          data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2", children: label(data, "education") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-slate-900", children: e.degree }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-600 mt-1", children: e.institution }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-slate-400 mt-1", children: e.year })
            ] }, i)) })
          ] }),
          data.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2", children: label(data, "certifications") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: data.certifications.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-slate-600 font-medium", children: c }, i)) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function NexusTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white text-slate-800 p-12 font-sans", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex justify-between rtl:flex-row-reverse items-end border-b-4 border-blue-600 pb-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-black text-slate-900", children: data.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-medium text-blue-600 mt-1", children: data.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right rtl:text-left text-sm font-medium text-slate-500 space-y-1", children: [
        data.location && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.location }),
        data.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.email }),
        data.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.phone })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-slate-700", children: data.summary }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-12 gap-8 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-8 space-y-8", children: data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-black text-slate-900 mb-6 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 bg-blue-600 rounded-sm" }),
          label(data, "experience")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 relative before:absolute before:inset-0 before:ml-[5px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-1.5 rtl:left-auto rtl:right-0 w-3 h-3 rounded-full bg-white border-2 border-blue-600 z-10 -ml-[5px] rtl:ml-0 rtl:-mr-[5px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between rtl:flex-row-reverse mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-slate-900", children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-500", children: e.duration })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-blue-600 mb-2", children: e.company }),
          e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 mb-2", children: e.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-1 pl-4 rtl:pl-0 rtl:pr-4 text-sm text-slate-600 marker:text-slate-300", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a }, j)) })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4 space-y-8", children: [
        data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-black text-slate-900 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 bg-blue-600 rounded-sm" }),
            label(data, "skills")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md shadow-sm", children: s }, i)) })
        ] }),
        data.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-black text-slate-900 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 bg-blue-600 rounded-sm" }),
            label(data, "projects")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 p-3 rounded-lg border border-slate-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-slate-900", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-600 mt-1", children: p.description })
          ] }, i)) })
        ] }),
        data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-black text-slate-900 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 bg-blue-600 rounded-sm" }),
            label(data, "education")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-slate-900", children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-600 mt-0.5", children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-blue-600 mt-0.5", children: e.year })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] });
}
function OrbitTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#fafafa] text-neutral-800 p-12 font-sans", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-10 pb-8 border-b border-neutral-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-extralight tracking-widest rtl:tracking-normal text-neutral-900 uppercase", children: data.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm font-bold tracking-[0.2em] rtl:tracking-normal text-neutral-500 uppercase", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center gap-4 text-xs font-medium text-neutral-400 uppercase tracking-widest rtl:tracking-normal", children: [data.location, data.email, data.phone].filter(Boolean).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-4", children: [
        i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-neutral-300" }),
        item
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-12 gap-12 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-8 space-y-10", children: data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-400 mb-6 border-b border-neutral-200 pb-2", children: label(data, "experience") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between rtl:flex-row-reverse", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-neutral-900 uppercase tracking-wide rtl:tracking-normal", children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-neutral-500", children: e.duration })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-neutral-500 mb-3", children: e.company }),
          e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-600 mb-3 leading-relaxed", children: e.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm text-neutral-600 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-neutral-300 mt-1.5 w-1 h-1 rounded-full bg-neutral-400 shrink-0" }),
            a
          ] }, j)) })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4 space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-400 mb-6 border-b border-neutral-200 pb-2", children: label(data, "profile") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-neutral-600", children: data.summary })
        ] }),
        data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-400 mb-6 border-b border-neutral-200 pb-2", children: label(data, "expertise") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-neutral-700", children: s }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1.5 h-1.5 rounded-full ${star <= s.length % 3 + 3 ? "bg-neutral-800" : "bg-neutral-200"}` }, star)) })
          ] }, i)) })
        ] }),
        data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-400 mb-6 border-b border-neutral-200 pb-2", children: label(data, "education") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-neutral-900", children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-neutral-500 mt-1", children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-medium text-neutral-400 mt-1", children: e.year })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] });
}
function MetricTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white text-black p-10 font-sans", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-4 border-black p-8 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-black uppercase tracking-tighter rtl:tracking-normal", children: data.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse items-end mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold uppercase tracking-widest rtl:tracking-normal", children: data.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold uppercase", children: [data.location, data.email, data.phone].filter(Boolean).join(" // ") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-12 gap-10 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4 space-y-10", children: [
        data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-black uppercase tracking-widest rtl:tracking-normal border-b-4 border-black pb-2 mb-6", children: label(data, "metrics") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.skills.map((s, i) => {
            const level = (s.length % 3 + 3) * 20;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse text-[10px] font-black uppercase mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  level,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full border-2 border-black p-[1px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-black", style: { width: `${level}%` } }) })
            ] }, i);
          }) })
        ] }),
        data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-black uppercase tracking-widest rtl:tracking-normal border-b-4 border-black pb-2 mb-6", children: label(data, "education") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-black uppercase", children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium mt-1", children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-gray-500 mt-1", children: e.year })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-8 space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-black uppercase tracking-widest rtl:tracking-normal border-b-4 border-black pb-2 mb-6", children: label(data, "summary") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-relaxed", children: data.summary })
        ] }),
        data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-black uppercase tracking-widest rtl:tracking-normal border-b-4 border-black pb-2 mb-6", children: label(data, "experience") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-4 border-black pl-5 rtl:border-l-0 rtl:border-r-4 rtl:pl-0 rtl:pr-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse items-center mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-black uppercase", children: e.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-black text-white text-[10px] font-black uppercase px-2 py-1", children: e.duration })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-gray-600 mb-3", children: e.company }),
            e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-3", children: e.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-sm font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black", children: "•" }),
              " ",
              a
            ] }, j)) })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] });
}
function PrismTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#121212] text-gray-300 p-12 font-sans", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center rtl:flex-row-reverse mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-indigo-500 rotate-45 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-indigo-500" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-light tracking-widest rtl:tracking-normal text-white", children: data.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs font-bold tracking-[0.2em] rtl:tracking-normal text-indigo-400 uppercase", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex justify-center gap-4 text-[10px] font-medium text-gray-500 uppercase tracking-widest rtl:tracking-normal", children: [data.location, data.email, data.phone].filter(Boolean).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-4", children: [
        i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1 h-1 bg-gray-700 rotate-45" }),
        item
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-12 text-center px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-gray-400", children: data.summary }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-12 gap-10 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-7 space-y-10", children: data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-white mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-indigo-500 rotate-45" }),
          label(data, "experience"),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gray-800 ml-2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse items-baseline mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-white", children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-gray-500 tracking-wider rtl:tracking-normal", children: e.duration })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-indigo-400 mb-3", children: e.company }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 text-sm text-gray-400 leading-relaxed", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 bg-gray-700 mt-1.5 rotate-45 shrink-0" }),
            a
          ] }, j)) })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-5 space-y-10", children: [
        data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-white mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-indigo-500 rotate-45" }),
            label(data, "skills"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gray-800 ml-2" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider rtl:tracking-normal text-gray-300 border border-gray-800 px-3 py-1.5 bg-gray-900/50", children: s }, i)) })
        ] }),
        data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-white mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-indigo-500 rotate-45" }),
            label(data, "education"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gray-800 ml-2" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-white", children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-gray-500 mt-1 uppercase tracking-wider rtl:tracking-normal", children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-gray-700 mt-1", children: e.year })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] });
}
function SlateTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-50 text-slate-900 p-12 font-sans", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-slate-300 pb-8 mb-8 flex justify-between items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-semibold tracking-tight rtl:tracking-normal text-slate-900", children: data.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg text-slate-600", children: data.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right rtl:text-left text-sm text-slate-500 space-y-1", children: [
        data.location && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.location }),
        data.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.email }),
        data.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.phone })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-slate-700", children: data.summary }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
      data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider rtl:tracking-normal text-slate-900 mb-6 border-b border-slate-200 pb-2", children: label(data, "professionalExperience") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse items-baseline mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-medium text-slate-900", children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-500 font-medium", children: e.duration })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base text-slate-600 mb-3", children: e.company }),
          e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-700 mb-3", children: e.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-1 text-sm text-slate-600 marker:text-slate-400", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a }, j)) })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-2 gap-10 flex-1", children: [
        data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider rtl:tracking-normal text-slate-900 mb-4 border-b border-slate-200 pb-2", children: label(data, "skills") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-700 leading-relaxed", children: data.skills.join(" • ") })
        ] }),
        data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider rtl:tracking-normal text-slate-900 mb-4 border-b border-slate-200 pb-2", children: label(data, "education") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-medium text-slate-900", children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-600 mt-1", children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-500 mt-1", children: e.year })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] });
}
function AvantTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white text-black p-12 font-serif", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b-4 border-black pb-6 mb-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-6xl font-black uppercase tracking-tighter rtl:tracking-normal", children: data.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xl font-bold uppercase tracking-widest rtl:tracking-normal", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-bold uppercase tracking-widest rtl:tracking-normal", children: [data.location, data.email, data.phone].filter(Boolean).join(" | ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10 text-center px-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed font-medium", children: data.summary }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
      data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black uppercase tracking-tighter rtl:tracking-normal border-b-2 border-black pb-2 mb-6", children: label(data, "experience") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-12 gap-6 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-3 text-sm font-bold uppercase", children: e.duration }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-9 border-l-2 border-black pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-black uppercase", children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold mt-1 mb-3", children: e.company }),
            e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-3", children: e.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-1 text-sm font-medium marker:text-black", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a }, j)) })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-2 gap-12 flex-1", children: [
        data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black uppercase tracking-tighter rtl:tracking-normal border-b-2 border-black pb-2 mb-6", children: label(data, "skills") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase", children: s }, i)) })
        ] }),
        data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black uppercase tracking-tighter rtl:tracking-normal border-b-2 border-black pb-2 mb-6", children: label(data, "education") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-black uppercase", children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-bold mt-1", children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold mt-1", children: e.year })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] });
}
function VanguardTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white text-neutral-900 p-12 font-sans overflow-hidden", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative mb-16 pt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-12 -left-4 rtl:left-auto rtl:-right-4 text-[140px] font-black text-neutral-100 uppercase tracking-tighter rtl:tracking-normal opacity-50 z-0 whitespace-nowrap overflow-hidden", children: data.name.split(" ")[0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-black uppercase tracking-tighter rtl:tracking-normal", children: data.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl font-bold text-neutral-500 uppercase tracking-tight rtl:tracking-normal", children: data.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-6 rtl:flex-row-reverse text-sm font-bold uppercase text-neutral-600", children: [
          data.location && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: data.location }),
          data.email && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: data.email }),
          data.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: data.phone })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-12 gap-10 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-8 space-y-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("section", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium leading-relaxed", children: data.summary }) }),
        data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-black uppercase tracking-widest rtl:tracking-normal text-neutral-400 mb-6", children: label(data, "experience") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold uppercase tracking-tight rtl:tracking-normal", children: e.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-neutral-500 bg-neutral-100 px-3 py-1", children: e.duration })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold text-neutral-500 mb-4", children: e.company }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-base font-medium text-neutral-700 leading-relaxed flex gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-neutral-300 font-bold", children: "—" }),
              " ",
              a
            ] }, j)) })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4 space-y-12", children: [
        data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-black uppercase tracking-widest rtl:tracking-normal text-neutral-400 mb-6", children: label(data, "expertise") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold bg-neutral-900 text-white px-3 py-2 uppercase", children: s }, i)) })
        ] }),
        data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-black uppercase tracking-widest rtl:tracking-normal text-neutral-400 mb-6", children: label(data, "education") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold uppercase tracking-tight rtl:tracking-normal", children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-medium text-neutral-600 mt-1", children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-neutral-400 mt-1", children: e.year })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] });
}
function MonolithTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-neutral-100 p-12 font-sans", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white border border-neutral-300 shadow-sm p-10 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "text-center mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight rtl:tracking-normal text-neutral-900", children: data.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg font-medium text-neutral-600 uppercase tracking-widest rtl:tracking-normal", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex justify-center gap-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider rtl:tracking-normal", children: [data.location, data.email, data.phone].filter(Boolean).join(" | ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10 text-center max-w-3xl mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-neutral-700", children: data.summary }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-12 gap-8 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-8 space-y-8", children: data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-neutral-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rtl:tracking-normal mb-6 inline-block", children: label(data, "professionalExperience") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-neutral-200 p-5 bg-neutral-50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse items-baseline mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold text-neutral-900", children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-neutral-500", children: e.duration })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-neutral-700 mb-3", children: e.company }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-1 text-sm text-neutral-600 marker:text-neutral-400", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a }, j)) })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4 space-y-8", children: [
        data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-neutral-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rtl:tracking-normal mb-6 inline-block", children: label(data, "skills") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-neutral-700 bg-neutral-100 border border-neutral-200 px-2 py-1", children: s }, i)) })
        ] }),
        data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-neutral-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-widest rtl:tracking-normal mb-6 inline-block", children: label(data, "education") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-neutral-200 p-4 bg-neutral-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-neutral-900", children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-medium text-neutral-600 mt-1", children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-neutral-400 mt-1", children: e.year })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] }) });
}
function CipherTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#050505] text-[#00ff41] p-12 font-mono selection:bg-[#00ff41] selection:text-black", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-10 border-b border-[#00ff41]/30 pb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl font-bold tracking-tight rtl:tracking-normal", children: [
        ">",
        data.name,
        "_"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-lg text-[#008f11]", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-6 text-xs text-[#008f11]", children: [
        data.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "[loc: ",
          data.location,
          "]"
        ] }),
        data.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "[mail: ",
          data.email,
          "]"
        ] }),
        data.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "[tel: ",
          data.phone,
          "]"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-[#00ff41]/80", children: data.summary }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-12 gap-10 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-8 space-y-10", children: data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold mb-6 text-[#008f11]", children: label(data, "terminalExperience") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse items-baseline mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-bold", children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#008f11]", children: e.duration })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-[#008f11] mb-3", children: [
            "@ ",
            e.company
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-sm text-[#00ff41]/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#008f11]", children: ">" }),
            " ",
            a
          ] }, j)) })
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4 space-y-10", children: [
        data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold mb-6 text-[#008f11]", children: label(data, "terminalSkills") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm", children: [
            "[",
            s,
            "]"
          ] }, i)) })
        ] }),
        data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold mb-6 text-[#008f11]", children: label(data, "terminalEducation") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold", children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#008f11] mt-1", children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-[#008f11]/60 mt-1", children: e.year })
          ] }, i)) })
        ] })
      ] })
    ] })
  ] });
}
function PinnacleTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white text-slate-800 font-sans", style: { minHeight: "1122px", width: "100%", display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "bg-indigo-950 text-indigo-50 p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl font-black tracking-tight rtl:tracking-normal text-white", children: data.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xl font-medium text-indigo-300", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-6 text-sm font-medium text-indigo-200", children: [
        data.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-500" }),
          data.location
        ] }),
        data.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-500" }),
          data.email
        ] }),
        data.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-500" }),
          data.phone
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto p-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-widest rtl:tracking-normal text-indigo-900 mb-4", children: label(data, "executiveProfile") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed text-slate-700", children: data.summary })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid rtl:[direction:rtl] grid-cols-12 gap-12 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-8 space-y-12", children: data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-widest rtl:tracking-normal text-indigo-900 mb-6", children: label(data, "professionalExperience") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative pl-6 border-l-2 border-indigo-100 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[-5px] top-2 rtl:left-auto rtl:right-[-5px] w-2 h-2 rounded-full bg-indigo-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse items-baseline mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-900", children: e.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded", children: e.duration })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-indigo-600 mb-3", children: e.company }),
            e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-600 mb-3", children: e.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc pl-5 rtl:pl-0 rtl:pr-5 space-y-1 text-sm text-slate-600 marker:text-indigo-400", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a }, j)) })
          ] }, i)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-4 space-y-12", children: [
          data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-widest rtl:tracking-normal text-indigo-900 mb-6", children: label(data, "keySkills") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-slate-700 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full", children: s }, i)) })
          ] }),
          data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-bold uppercase tracking-widest rtl:tracking-normal text-indigo-900 mb-6", children: label(data, "education") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-slate-900", children: e.degree }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-600 mt-1", children: e.institution }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-indigo-500 mt-1", children: e.year })
            ] }, i)) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
const rtlPattern$1 = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;
function isRTL$1(data) {
  return rtlPattern$1.test(
    [
      data.name,
      data.title,
      data.location,
      data.summary,
      ...data.skills,
      ...data.certifications,
      ...data.experience.flatMap((item) => [item.title, item.company, item.description, ...item.achievements]),
      ...data.projects.flatMap((item) => [item.name, item.description, item.impact, ...item.tech]),
      ...data.education.flatMap((item) => [item.degree, item.institution])
    ].filter(Boolean).join(" ")
  );
}
function labels$1(rtl) {
  return rtl ? {
    profile: "پوختە",
    experience: "ئەزموون",
    projects: "پرۆژەکان",
    skills: "لێهاتووییەکان",
    education: "خوێندن",
    certifications: "بڕوانامەکان",
    contact: "پەیوەندی",
    selected: "دیاریکراو"
  } : {
    profile: "Profile",
    experience: "Experience",
    projects: "Selected Projects",
    skills: "Skills",
    education: "Education",
    certifications: "Certifications",
    contact: "Contact",
    selected: "Selected"
  };
}
function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");
}
function PhotoBlock({ data, shape = "rounded" }) {
  const radius = shape === "circle" ? "rounded-full" : shape === "arch" ? "rounded-t-full rounded-b-2xl" : "rounded-[1.4rem]";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-28 w-28 shrink-0 overflow-hidden border border-slate-200 bg-slate-100 ${radius}`, children: data.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.photoUrl, alt: data.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-2xl font-black tracking-tight rtl:tracking-normal text-slate-500", children: initials(data.name) }) });
}
function Section$1({
  title,
  children,
  accent = "border-slate-900 text-slate-950"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "break-inside-avoid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `mb-3 border-b pb-2 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal ${accent}`, children: title }),
    children
  ] });
}
function ContactLines({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1 text-[11px] font-semibold leading-5 text-slate-500", children: [data.location, data.email, data.phone].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item }, item)) });
}
function ExperienceList({ data, marker = "dot" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: data.experience.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: marker === "rule" ? "border-l-2 border-slate-200 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4" : "", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[14px] font-extrabold leading-tight text-slate-950", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[12px] font-bold text-slate-600", children: item.company })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 text-[10px] font-black uppercase tracking-[0.12em] rtl:tracking-normal text-slate-400", children: item.duration })
    ] }),
    item.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] leading-5 text-slate-600", children: item.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1.5", children: item.achievements.map((achievement, achievementIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-[14px_1fr] gap-2 text-[11px] leading-5 text-slate-700 rtl:grid-cols-[1fr_14px]", children: [
      marker === "index" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-black text-slate-400", children: String(achievementIndex + 1).padStart(2, "0") }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-[7px] h-1.5 w-1.5 rounded-full bg-slate-950" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: achievement })
    ] }, achievementIndex)) })
  ] }, `${item.company}-${index}`)) });
}
function NewSleekTemplate({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL$1(c);
  const l = labels$1(rtl);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: rtl ? "rtl" : "ltr", className: "bg-white p-10 font-sans text-slate-950", style: { minHeight: "1122px", width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[1fr_auto] items-start gap-8 border-b border-slate-200 pb-8 rtl:grid-cols-[auto_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 h-1.5 w-24 rounded-full bg-slate-950" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-[12ch] text-5xl font-black leading-[0.94] tracking-tight rtl:tracking-normal text-slate-950", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm font-black uppercase tracking-[0.28em] rtl:tracking-normal text-slate-500", children: c.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-5 rtl:items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoBlock, { data: c }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactLines, { data: c })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_260px] gap-10 pt-8 rtl:grid-cols-[260px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.profile, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] leading-7 text-slate-700", children: c.summary }) }),
        c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.experience, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceList, { data: c, marker: "index" }) }),
        c.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.projects, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: c.projects.map((project, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[13px] font-extrabold text-slate-950", children: project.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-5 text-slate-600", children: project.description }),
          project.tech.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] font-black uppercase tracking-[0.16em] rtl:tracking-normal text-slate-400", children: project.tech.join(" / ") })
        ] }, `${project.name}-${index}`)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-7 border-l border-slate-200 pl-7 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-7", children: [
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.skills, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: c.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rtl:tracking-normal text-slate-700", children: skill }, skill)) }) }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.education, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: c.education.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-extrabold leading-5 text-slate-950", children: item.degree }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[11px] font-semibold text-slate-500", children: item.institution }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] font-black text-slate-400", children: item.year })
        ] }, `${item.institution}-${index}`)) }) }),
        c.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.certifications, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-[11px] font-semibold leading-5 text-slate-600", children: c.certifications.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item }, item)) }) })
      ] })
    ] })
  ] });
}
function NewProfessionalTemplate({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL$1(c);
  const l = labels$1(rtl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: rtl ? "rtl" : "ltr", className: "bg-[#fbfcfd] p-8 font-sans text-slate-950", style: { minHeight: "1122px", width: "100%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-[1058px] grid-cols-[230px_1fr] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_-45px_rgba(15,23,42,0.55)] rtl:grid-cols-[1fr_230px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "bg-slate-950 p-7 text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoBlock, { data: c, shape: "circle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-7 text-3xl font-black leading-[1] tracking-tight rtl:tracking-normal", children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] font-black uppercase leading-5 tracking-[0.2em] rtl:tracking-normal text-cyan-200", children: c.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-slate-400", children: l.contact }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-[11px] font-semibold leading-5 text-slate-300", children: [c.location, c.email, c.phone].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item }, item)) })
      ] }),
      c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-slate-400", children: l.skills }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: c.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-bold text-slate-100", children: skill }, skill)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-7 p-9", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-3xl border border-slate-200 bg-slate-50 p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-cyan-700", children: l.profile }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] leading-7 text-slate-700", children: c.summary })
      ] }),
      c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.experience, accent: "border-cyan-700 text-cyan-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceList, { data: c, marker: "rule" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-7", children: [
        c.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.projects, accent: "border-cyan-700 text-cyan-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: c.projects.map((project, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[12px] font-extrabold text-slate-950", children: project.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-5 text-slate-600", children: project.description })
        ] }, `${project.name}-${index}`)) }) }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.education, accent: "border-cyan-700 text-cyan-800", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: c.education.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-extrabold text-slate-950", children: item.degree }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[11px] text-slate-600", children: [
            item.institution,
            " · ",
            item.year
          ] })
        ] }, `${item.institution}-${index}`)) }) })
      ] })
    ] })
  ] }) });
}
function NewAcademicTemplate({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL$1(c);
  const l = labels$1(rtl);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: rtl ? "rtl" : "ltr", className: "bg-white p-11 font-serif text-slate-950", style: { minHeight: "1122px", width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[120px_1fr] gap-8 border-b-2 border-slate-950 pb-7 rtl:grid-cols-[1fr_120px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoBlock, { data: c, shape: "arch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-slate-500", children: [
          l.selected,
          " Curriculum Vitae"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl font-bold leading-tight tracking-tight rtl:tracking-normal", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[15px] font-semibold text-slate-700", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-semibold text-slate-500", children: [c.location, c.email, c.phone].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item }, item)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_235px] gap-10 pt-7 rtl:grid-cols-[235px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-7", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.profile, accent: "border-slate-950 text-slate-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] leading-7 text-slate-700", children: c.summary }) }),
        c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.experience, accent: "border-slate-950 text-slate-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExperienceList, { data: c, marker: "dot" }) }),
        c.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.projects, accent: "border-slate-950 text-slate-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: c.projects.map((project, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[13px] font-bold text-slate-950", children: project.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-5 text-slate-700", children: project.description }),
          project.impact && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] italic text-slate-500", children: project.impact })
        ] }, `${project.name}-${index}`)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-7", children: [
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.education, accent: "border-slate-950 text-slate-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: c.education.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-bold leading-5", children: item.degree }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[11px] text-slate-600", children: item.institution }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] font-bold text-slate-400", children: item.year })
        ] }, `${item.institution}-${index}`)) }) }),
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.skills, accent: "border-slate-950 text-slate-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold leading-6 text-slate-700", children: c.skills.join(" · ") }) }),
        c.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.certifications, accent: "border-slate-950 text-slate-950", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-[11px] leading-5 text-slate-700", children: c.certifications.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item }, item)) }) })
      ] })
    ] })
  ] });
}
function skillLevel(data, skill, index) {
  return `${Math.max(28, Math.min(100, skillRating(data, skill, index) / 5 * 100))}%`;
}
function skillRating(data, skill, index) {
  const explicit = data.skillItems?.find((item) => item.name === skill)?.level;
  return Math.max(1, Math.min(5, explicit ?? index % 4 + 2));
}
function RefTorresTemplate({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL$1(c);
  const l = labels$1(rtl);
  const sideItems = [c.location, c.email, c.phone].filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: rtl ? "rtl" : "ltr", className: "relative overflow-hidden bg-white font-sans text-[#1d3f59]", style: { minHeight: "1122px", width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[168px] bg-[#315b74]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full opacity-20", style: { backgroundImage: "linear-gradient(135deg, transparent 0 46%, rgba(255,255,255,.35) 46% 47%, transparent 47% 100%)", backgroundSize: "28px 28px" } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[308px_1fr] rtl:grid-cols-[1fr_308px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "relative min-h-[954px] bg-[#f3f3f3] px-12 pb-10 pt-32", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-[105px] left-1/2 h-[220px] w-[220px] -translate-x-1/2 overflow-hidden rounded-full border-[5px] border-[#d8e2e9] bg-slate-200", children: c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.photoUrl, alt: c.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-5xl font-black text-slate-500", children: initials(c.name) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-3 text-[42px] font-light uppercase leading-[1.02] tracking-[0.08em] rtl:tracking-normal text-[#1e405a]", children: [
          c.name.split(/\s+/).slice(0, 1).join(" "),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-black", children: c.name.split(/\s+/).slice(1).join(" ") || c.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 border-b border-[#b8c5ce] pb-4 text-[15px] font-semibold uppercase tracking-[0.09em] rtl:tracking-normal text-neutral-800", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]", children: l.contact }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-[12px] font-semibold leading-5 text-neutral-700", children: sideItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item }, item)) })
        ] }),
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]", children: l.skills }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-3 pl-5 text-[13px] font-medium text-neutral-800 rtl:pl-0 rtl:pr-5", children: c.skills.slice(0, 7).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: skill }, skill)) })
        ] }),
        c.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]", children: l.certifications }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-3 pl-5 text-[13px] font-medium text-neutral-800 rtl:pl-0 rtl:pr-5", children: c.certifications.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: item }, item)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-11 pb-10 pt-7 text-neutral-800", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.profile, accent: "border-[#b8c5ce] text-[#1d3f59]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] leading-5", children: c.summary }) }),
        c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]", children: l.experience }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: c.experience.slice(0, 4).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[14px] font-black leading-tight", children: item.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-bold text-neutral-600", children: item.company })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "shrink-0 text-[12px] text-neutral-600", children: item.duration })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-5 text-neutral-700", children: item.description || item.achievements[0] })
          ] }, `${item.company}-${index}`)) })
        ] }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]", children: l.education }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: c.education.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-5 text-[12px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black", children: item.institution }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item.degree })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-neutral-600", children: item.year })
          ] }, `${item.institution}-${index}`)) })
        ] }),
        c.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-[#b8c5ce] pb-2 text-[18px] font-black uppercase tracking-[0.18em] rtl:tracking-normal text-[#1d3f59]", children: l.projects }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-6", children: c.projects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[13px] font-black", children: project.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] leading-5", children: project.description })
          ] }, project.name)) })
        ] })
      ] })
    ] })
  ] });
}
function RefSilvaTemplate({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL$1(c);
  const l = labels$1(rtl);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: rtl ? "rtl" : "ltr", className: "bg-white font-sans text-[#1f1b18]", style: { minHeight: "1122px", width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex h-[190px] items-center gap-11 bg-[#342820] px-12 text-white rtl:flex-row-reverse", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[135px] w-[135px] overflow-hidden rounded-full bg-stone-200", children: c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.photoUrl, alt: c.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-4xl font-black text-stone-500", children: initials(c.name) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-l-[7px] border-white pl-8 rtl:border-l-0 rtl:border-r-[7px] rtl:pl-0 rtl:pr-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[45px] font-black leading-none tracking-tight rtl:tracking-normal", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[23px] font-bold", children: c.title })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[230px_1fr] rtl:grid-cols-[1fr_230px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "min-h-[932px] bg-[#fff0e3] px-8 py-9", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.contact, accent: "border-transparent text-[#1f1b18]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 text-[12px] leading-5", children: [c.phone, c.email, c.location].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item }, item)) }) }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[22px] font-normal", children: l.education }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-7", children: c.education.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] leading-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium uppercase", children: item.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "italic", children: item.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item.year })
          ] }, `${item.institution}-${index}`)) })
        ] }),
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[22px] font-normal", children: l.skills }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 text-[13px]", children: c.skills.slice(0, 8).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: skill }, skill)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-8 py-9", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[23px] font-normal", children: rtl ? "پوختە" : "Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-1.5 pl-5 text-[12px] leading-5 rtl:pl-0 rtl:pr-5", children: (c.summary.match(/[^.!?]+[.!?]*/g) ?? [c.summary]).slice(0, 4).map((line, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: line.trim() }, index)) })
        ] }),
        c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[23px] font-normal", children: rtl ? "ئەزموونەکان" : "Experiences" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: c.experience.slice(0, 3).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[14px] font-medium uppercase", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px]", children: [
              item.company,
              " / ",
              item.duration
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 list-disc space-y-1 pl-5 text-[12px] leading-5 rtl:pl-0 rtl:pr-5", children: (item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: achievement }, achievementIndex)) })
          ] }, `${item.company}-${index}`)) })
        ] }),
        c.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[23px] font-normal", children: rtl ? "خەڵات و پرۆژەکان" : "Awards" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 text-[13px]", children: c.projects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-medium uppercase", children: project.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: project.impact || project.description })
          ] }, project.name)) })
        ] })
      ] })
    ] })
  ] });
}
function RefSchumacherTemplate({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL$1(c);
  const l = labels$1(rtl);
  const contact = [c.location, c.email, c.phone].filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: rtl ? "rtl" : "ltr", className: "border-[4px] border-[#7c3cff] bg-white px-[80px] py-[84px] font-sans text-[#161616]", style: { minHeight: "1122px", width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[230px_1fr_1fr] gap-14 rtl:grid-cols-[1fr_1fr_230px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-[42px] font-black leading-[0.86] tracking-tight rtl:tracking-normal", children: [
        c.name.split(/\s+/).slice(0, 1).join(" "),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        c.name.split(/\s+/).slice(1).join(" ") || c.name
      ] }),
      contact.slice(0, 2).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-7 text-[13px] font-bold leading-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-3 h-[2px] w-8 bg-neutral-400" }),
        item
      ] }, item))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-[230px_1fr] gap-14 rtl:grid-cols-[1fr_230px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-9", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-[22px] font-black leading-none", children: l.profile }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold leading-[1.15]", children: c.summary })
        ] }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[22px] font-black leading-none", children: l.education }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: c.education.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px] font-semibold leading-[1.15]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item.year })
          ] }, `${item.institution}-${index}`)) })
        ] }),
        c.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[22px] font-black leading-none", children: l.certifications }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 text-[12px] font-semibold leading-[1.15]", children: c.certifications.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item }, item)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[22px] font-black leading-none", children: rtl ? "لێهاتووییە سەرەکییەکان" : "Core Skills" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-10 gap-y-5", children: c.skills.slice(0, 8).map((skill, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-[13px] font-semibold leading-4", children: skill }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[18px] bg-neutral-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-[#ff8a22]", style: { width: skillLevel(c, skill, index) } }) })
          ] }, skill)) })
        ] }),
        c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[22px] font-black leading-none", children: l.experience }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: c.experience.slice(0, 3).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "relative pl-6 rtl:pl-0 rtl:pr-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-1.5 h-4 w-4 rounded-full bg-[#f58213] rtl:left-auto rtl:right-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[13px] font-black leading-4", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-black leading-4", children: item.company }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-black leading-4", children: item.duration }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 list-disc space-y-1 pl-5 text-[11px] font-semibold leading-[1.15] rtl:pl-0 rtl:pr-5", children: (item.achievements.length ? item.achievements : [item.description]).slice(0, 4).map((achievement, achievementIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: achievement }, achievementIndex)) })
          ] }, `${item.company}-${index}`)) })
        ] })
      ] })
    ] })
  ] });
}
function RefPalmerstonTemplate({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL$1(c);
  const l = labels$1(rtl);
  const contacts = [c.phone, c.email, c.location].filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: rtl ? "rtl" : "ltr", className: "bg-white font-sans text-[#121923]", style: { minHeight: "1122px", width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative h-[326px] bg-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 h-[230px] w-[280px] rounded-br-[52px] bg-[#303b4e] rtl:left-auto rtl:right-0 rtl:rounded-bl-[52px] rtl:rounded-br-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[58px] top-[30px] h-[138px] w-[138px] overflow-hidden rounded-full border-[6px] border-[#b7b2ad] bg-slate-200 rtl:left-auto rtl:right-[58px]", children: c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.photoUrl, alt: c.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-4xl font-black text-slate-500", children: initials(c.name) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-[325px] pt-[66px] rtl:ml-0 rtl:mr-[325px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "max-w-[420px] text-[43px] font-black uppercase leading-[1.03] tracking-[0.02em] rtl:tracking-normal text-[#223a59]", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[17px] uppercase tracking-[0.22em] rtl:tracking-normal text-[#223a59]", children: c.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[22px] left-[22px] right-[16px] flex h-[55px] items-center justify-around gap-4 rounded-full bg-[#303b4e] px-7 text-[11px] font-bold text-white", children: contacts.slice(0, 4).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white/15 text-[9px]", children: ["P", "M", "L", "W"][index] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item })
      ] }, item)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[285px_1fr] rtl:grid-cols-[1fr_285px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "min-h-[796px] bg-[#303b4e] px-12 py-12 text-white", children: [
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-white/50 pb-2 text-[22px] font-black tracking-[0.12em] rtl:tracking-normal", children: l.education }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: c.education.slice(0, 3).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px] leading-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-black", children: item.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: item.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item.year })
          ] }, `${item.institution}-${index}`)) })
        ] }),
        c.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-white/50 pb-2 text-[22px] font-black tracking-[0.12em] rtl:tracking-normal", children: l.certifications }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-2 pl-4 text-[12px] font-semibold leading-5 rtl:pl-0 rtl:pr-4", children: c.certifications.slice(0, 3).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: item }, item)) })
        ] }),
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-white/50 pb-2 text-[22px] font-black tracking-[0.12em] rtl:tracking-normal", children: l.skills }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: c.skills.slice(0, 7).map((skill, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-bold", children: skill }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-[5px] bg-white/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-white", style: { width: skillLevel(c, skill, index) } }) })
          ] }, skill)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-white/50 pb-2 text-[22px] font-black tracking-[0.12em] rtl:tracking-normal", children: rtl ? "زمان" : "Language" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-[12px] font-semibold", children: (rtl ? ["کوردی", "ئینگلیزی"] : ["English", "Kurdish"]).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item }, item)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-10 py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: rtl ? "دەربارەی من" : "About me", accent: "border-[#9aa3ad] text-[#1f3148]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] leading-5", children: c.summary }) }),
        c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-[#9aa3ad] pb-2 text-[20px] font-black tracking-[0.18em] rtl:tracking-normal text-[#1f3148]", children: l.experience }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: c.experience.slice(0, 3).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[14px] font-black", children: item.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[11px] font-semibold", children: item.duration })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-bold", children: item.company }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] leading-5 text-neutral-700", children: item.description || item.achievements[0] })
          ] }, `${item.company}-${index}`)) })
        ] }),
        c.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-[#9aa3ad] pb-2 text-[20px] font-black tracking-[0.18em] rtl:tracking-normal text-[#1f3148]", children: rtl ? "سەرچاوە" : "Reference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-8 text-[12px]", children: c.projects.slice(0, 2).map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: project.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 leading-5", children: project.description })
          ] }, project.name)) })
        ] })
      ] })
    ] })
  ] });
}
function RefSanchezTemplate({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL$1(c);
  const l = labels$1(rtl);
  const TimelineSection = ({ title, icon, children }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pl-16 rtl:pl-0 rtl:pr-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-[17px] top-0 grid h-[140px] w-[1px] bg-[#99a1ab] rtl:left-auto rtl:right-[17px]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full bg-[#303b4e] text-[12px] font-black text-white rtl:left-auto rtl:right-0", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 border-b border-[#7d8792] pb-2 text-[19px] font-black uppercase tracking-[0.17em] rtl:tracking-normal text-[#303b4e]", children: title }),
    children
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: rtl ? "rtl" : "ltr", className: "bg-white font-sans text-[#263241]", style: { minHeight: "1122px", width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative h-[185px] bg-[#303b4e] text-white", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[28px] top-[78px] z-10 h-[170px] w-[170px] overflow-hidden rounded-full border-[7px] border-white bg-slate-200 rtl:left-auto rtl:right-[28px]", children: c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.photoUrl, alt: c.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center text-4xl font-black text-slate-500", children: initials(c.name) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-[315px] pt-[62px] rtl:pl-0 rtl:pr-[315px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-[38px] font-black uppercase leading-none", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[18px] font-bold uppercase", children: c.title })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[245px_1fr] rtl:grid-cols-[1fr_245px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "min-h-[937px] bg-[#e6e6e6] px-6 pb-9 pt-[120px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal", children: l.contact }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-[12px] leading-5", children: [c.phone, c.email, c.location].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item }, item)) })
        ] }),
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal", children: l.skills }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: c.skills.slice(0, 7).map((skill, index) => {
            const rating = skillRating(c, skill, index);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold", children: skill }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex gap-1.5", children: Array.from({ length: 5 }).map((_, dot) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${dot < rating ? "bg-[#303b4e]" : "bg-[#b8bdc3]"}` }, dot)) })
            ] }, skill);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal", children: rtl ? "زمانەکان" : "Languages" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-1 pl-4 text-[12px] rtl:pl-0 rtl:pr-4", children: (rtl ? ["کوردی", "ئینگلیزی"] : ["English", "Kurdish"]).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: item }, item)) })
        ] }),
        c.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal", children: rtl ? "سەرچاوە" : "Reference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-bold", children: c.projects[0].name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[11px] leading-5", children: c.projects[0].description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-9 px-11 py-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineSection, { title: l.profile, icon: "i", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] leading-5", children: c.summary }) }),
        c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineSection, { title: l.experience, icon: "W", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", children: c.experience.slice(0, 3).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[13px] font-black uppercase", children: item.company }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold", children: item.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-[11px] font-bold uppercase", children: item.duration })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 list-disc space-y-1 pl-5 text-[11px] leading-5 rtl:pl-0 rtl:pr-5", children: (item.achievements.length ? item.achievements : [item.description]).slice(0, 3).map((achievement, achievementIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: achievement }, achievementIndex)) })
        ] }, `${item.company}-${index}`)) }) }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineSection, { title: l.education, icon: "E", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: c.education.slice(0, 2).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[12px] leading-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-black", children: item.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "shrink-0 font-semibold", children: item.year })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item.institution })
        ] }, `${item.institution}-${index}`)) }) })
      ] })
    ] })
  ] });
}
const rtlPattern = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;
function isRTL(data) {
  return rtlPattern.test(
    [
      data.name,
      data.title,
      data.location,
      data.summary,
      ...data.skills,
      ...data.certifications,
      ...data.experience.flatMap((item) => [item.title, item.company, item.description, ...item.achievements]),
      ...data.projects.flatMap((item) => [item.name, item.description, item.impact, ...item.tech]),
      ...data.education.flatMap((item) => [item.degree, item.institution])
    ].filter(Boolean).join(" ")
  );
}
function labels(rtl) {
  return rtl ? {
    summary: "پوختە",
    profile: "پڕۆفایل",
    experience: "ئەزموون",
    projects: "پرۆژەکان",
    selectedProjects: "پرۆژە دیاریکراوەکان",
    skills: "لێهاتووییەکان",
    expertise: "پسپۆڕی",
    education: "خوێندن",
    certifications: "بڕوانامەکان",
    impact: "کاریگەری"
  } : {
    summary: "Summary",
    profile: "Profile",
    experience: "Experience",
    projects: "Projects",
    selectedProjects: "Selected Projects",
    skills: "Skills",
    expertise: "Expertise",
    education: "Education",
    certifications: "Certifications",
    impact: "Impact"
  };
}
function MinimalTemplate({ data }) {
  const rtl = isRTL(data);
  const l = labels(rtl);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { dir: rtl ? "rtl" : "ltr", className: "bg-white p-12 text-[#111] font-sans", style: { minHeight: "1122px", width: "100%" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-neutral-300 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight rtl:tracking-normal", children: data.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-base text-neutral-700", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-neutral-500", children: [data.location, data.email, data.phone].filter(Boolean).join(" · ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: l.summary, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: data.summary }) }),
    data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: l.experience, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
          e.title,
          " · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal", children: e.company })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-neutral-500", children: e.duration })
      ] }),
      e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-neutral-700", children: e.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1.5 list-disc space-y-1 pl-5 text-sm rtl:pl-0 rtl:pr-5", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a }, j)) })
    ] }, i)) }) }),
    data.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: l.projects, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: p.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-700", children: p.description }),
      p.tech.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-neutral-500", children: p.tech.join(" · ") })
    ] }, i)) }) }),
    data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: l.skills, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: data.skills.join(" · ") }) }),
    data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: l.education, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: e.degree }),
        " · ",
        e.institution
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-neutral-500", children: e.year })
    ] }, i)) }) })
  ] });
}
function Section({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-xs font-semibold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-500", children: title }),
    children
  ] });
}
function ExecutiveTemplate({ data }) {
  const rtl = isRTL(data);
  const l = labels(rtl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      dir: rtl ? "rtl" : "ltr",
      className: "bg-white text-[#111]",
      style: { minHeight: "1122px", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column", width: "100%" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 rtl:[direction:rtl]", style: { flex: 1, minHeight: "1122px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "col-span-1 bg-neutral-900 p-8 text-neutral-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold leading-tight", children: data.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm italic text-neutral-300", children: data.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-1 text-xs text-neutral-300", children: [
              data.location && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.location }),
              data.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.email }),
              data.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.phone })
            ] })
          ] }),
          data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-400", children: l.expertise }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: s }, i)) })
          ] }),
          data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-400", children: l.education }),
            data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: e.degree }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-neutral-400", children: [
                e.institution,
                ", ",
                e.year
              ] })
            ] }, i))
          ] }),
          data.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-400", children: l.certifications }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-xs", children: data.certifications.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: c }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "col-span-2 p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-700", children: l.profile }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: data.summary })
          ] }),
          data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-700", children: l.experience }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-bold", children: e.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm italic text-neutral-600", children: [
                e.company,
                " · ",
                e.duration
              ] }),
              e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-neutral-800", children: e.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1.5 list-disc space-y-1 pl-5 text-sm rtl:pl-0 rtl:pr-5", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a }, j)) })
            ] }, i)) })
          ] }),
          data.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-700", children: l.selectedProjects }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: data.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: p.description }),
              p.impact && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs italic text-neutral-600", children: [
                l.impact,
                ": ",
                p.impact
              ] })
            ] }, i)) })
          ] })
        ] })
      ] })
    }
  );
}
function ResumePreview({
  data,
  template
}) {
  const rtl = isRTL(data);
  let preview;
  switch (template) {
    case "executive":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutiveTemplate, { data });
      break;
    case "noir":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(NoirTemplate, { data });
      break;
    case "apex":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(ApexTemplate, { data });
      break;
    case "nexus":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(NexusTemplate, { data });
      break;
    case "orbit":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitTemplate, { data });
      break;
    case "metric":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(MetricTemplate, { data });
      break;
    case "prism":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(PrismTemplate, { data });
      break;
    case "slate":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(SlateTemplate, { data });
      break;
    case "avant":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(AvantTemplate, { data });
      break;
    case "vanguard":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(VanguardTemplate, { data });
      break;
    case "monolith":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(MonolithTemplate, { data });
      break;
    case "cipher":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(CipherTemplate, { data });
      break;
    case "pinnacle":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(PinnacleTemplate, { data });
      break;
    case "new-sleek":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(NewSleekTemplate, { data });
      break;
    case "new-professional":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(NewProfessionalTemplate, { data });
      break;
    case "new-academic":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(NewAcademicTemplate, { data });
      break;
    case "ref-torres":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(RefTorresTemplate, { data });
      break;
    case "ref-silva":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(RefSilvaTemplate, { data });
      break;
    case "ref-schumacher":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(RefSchumacherTemplate, { data });
      break;
    case "ref-palmerston":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(RefPalmerstonTemplate, { data });
      break;
    case "ref-sanchez":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(RefSanchezTemplate, { data });
      break;
    case "minimal":
    default:
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(MinimalTemplate, { data });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: rtl ? "rtl" : "ltr", className: "resume-rtl-scope h-full w-full [unicode-bidi:plaintext]", children: preview });
}
const noirS = StyleSheet.create({
  page: { padding: 40, fontSize: 9, fontFamily: "Helvetica", backgroundColor: "#0a0a0a", color: "#a3a3a3" },
  header: { alignItems: "center", borderBottomWidth: 0.5, borderBottomColor: "#262626", paddingBottom: 14, marginBottom: 14 },
  name: { fontSize: 22, fontWeight: 700, color: "#ffffff", letterSpacing: 2 },
  title: { fontSize: 9, color: "#737373", letterSpacing: 2, marginTop: 3 },
  contact: { fontSize: 7.5, color: "#525252", marginTop: 6, letterSpacing: 1 },
  sec: { fontSize: 7.5, fontWeight: 700, color: "#525252", letterSpacing: 3, marginTop: 14, marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: "#262626", paddingBottom: 3 },
  expRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  expTitle: { fontSize: 10, color: "#ffffff" },
  expMeta: { fontSize: 8, color: "#737373" },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#a3a3a3", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 1, paddingLeft: 8 },
  cols: { flexDirection: "row", gap: 20, marginTop: 14, flex: 1 }
});
function NoirPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: noirS.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: noirS.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: noirS.name, children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: noirS.title, children: c.title.toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: noirS.contact, children: [c.location, c.email, c.phone].filter(Boolean).join("  |  ") })
    ] }),
    c.summary ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: noirS.body, children: c.summary }) : null,
    c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: noirS.sec, children: "EXPERIENCE" }),
      c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: noirS.expRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: noirS.expTitle, children: [
            e.title,
            " · ",
            e.company
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: noirS.expMeta, children: e.duration })
        ] }),
        e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: noirS.bullet, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 8, color: "#525252" }, children: "›" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...noirS.body, flex: 1, marginTop: 0 }, children: a })
        ] }, j))
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: noirS.cols, children: [
      c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: noirS.sec, children: "SKILLS" }),
        c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#737373", marginBottom: 3 }, children: s }, i))
      ] }),
      c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: noirS.sec, children: "EDUCATION" }),
        c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, color: "#ffffff", fontWeight: 700 }, children: e.degree }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { fontSize: 8, color: "#737373" }, children: [
            e.institution,
            " · ",
            e.year
          ] })
        ] }, i))
      ] })
    ] })
  ] }) });
}
const prismDarkS = StyleSheet.create({
  page: { padding: 40, fontSize: 9, fontFamily: "Helvetica", backgroundColor: "#121212", color: "#9ca3af" },
  header: { alignItems: "center", marginBottom: 24 },
  name: { fontSize: 24, fontWeight: 300, color: "#ffffff", letterSpacing: 2 },
  title: { fontSize: 9, fontWeight: 700, color: "#818cf8", letterSpacing: 2, marginTop: 4 },
  contact: { fontSize: 7.5, color: "#6b7280", marginTop: 6 },
  sec: { fontSize: 8, fontWeight: 700, color: "#ffffff", letterSpacing: 2, marginTop: 14, marginBottom: 8, flexDirection: "row", alignItems: "center" },
  secDot: { width: 6, height: 6, backgroundColor: "#818cf8", marginRight: 6 },
  secLine: { flex: 1, height: 0.5, backgroundColor: "#1f2937", marginLeft: 8 },
  expTitle: { fontSize: 10, fontWeight: 700, color: "#ffffff" },
  expMeta: { fontSize: 8, color: "#818cf8", marginTop: 1 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#9ca3af", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2 },
  cols: { flexDirection: "row", gap: 20, flex: 1 }
});
function PrismDarkPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: prismDarkS.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: prismDarkS.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: prismDarkS.name, children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: prismDarkS.title, children: c.title.toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: prismDarkS.contact, children: [c.location, c.email, c.phone].filter(Boolean).join("  ·  ") })
    ] }),
    c.summary ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...prismDarkS.body, textAlign: "center", marginBottom: 16 }, children: c.summary }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: prismDarkS.cols, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1.5 }, children: c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: prismDarkS.sec, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: prismDarkS.secDot }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, fontWeight: 700, color: "#ffffff", letterSpacing: 2 }, children: "EXPERIENCE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: prismDarkS.secLine })
        ] }),
        c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: prismDarkS.expTitle, children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: prismDarkS.expMeta, children: [
            e.company,
            " · ",
            e.duration
          ] }),
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: prismDarkS.bullet, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10, color: "#818cf8" }, children: "◆" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...prismDarkS.body, flex: 1, marginTop: 0 }, children: a })
          ] }, j))
        ] }, i))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: prismDarkS.sec, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: prismDarkS.secDot }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, fontWeight: 700, color: "#ffffff", letterSpacing: 2 }, children: "SKILLS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: prismDarkS.secLine })
          ] }),
          c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#d1d5db", borderWidth: 0.5, borderColor: "#374151", padding: 4, marginBottom: 4 }, children: s }, i))
        ] }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { ...prismDarkS.sec, marginTop: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: prismDarkS.secDot }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, fontWeight: 700, color: "#ffffff", letterSpacing: 2 }, children: "EDUCATION" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: prismDarkS.secLine })
          ] }),
          c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, fontWeight: 700, color: "#ffffff" }, children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { fontSize: 8, color: "#6b7280", marginTop: 2 }, children: [
              e.institution,
              " · ",
              e.year
            ] })
          ] }, i))
        ] })
      ] })
    ] })
  ] }) });
}
const pinnS = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", color: "#334155" },
  header: { backgroundColor: "#1e1b4b", padding: 32 },
  name: { fontSize: 26, fontWeight: 700, color: "#ffffff", letterSpacing: 1 },
  title: { fontSize: 10, color: "#a5b4fc", marginTop: 4 },
  contact: { fontSize: 8, color: "#818cf8", marginTop: 8 },
  body: { padding: 28 },
  sec: { fontSize: 8, fontWeight: 700, color: "#1e1b4b", letterSpacing: 2, marginTop: 16, marginBottom: 8, borderBottomWidth: 1, borderBottomColor: "#e0e7ff", paddingBottom: 3 },
  expTitle: { fontSize: 11, fontWeight: 700, color: "#0f172a" },
  expCo: { fontSize: 9, color: "#6366f1", marginTop: 1, marginBottom: 4 },
  textBody: { fontSize: 8.5, lineHeight: 1.5, color: "#475569", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2 },
  cols: { flexDirection: "row", gap: 20, flex: 1 },
  skill: { fontSize: 8, color: "#475569", borderWidth: 0.5, borderColor: "#c7d2fe", backgroundColor: "#eef2ff", padding: 4, marginBottom: 4, marginRight: 4 }
});
function PinnaclePDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: pinnS.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: pinnS.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: pinnS.name, children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: pinnS.title, children: c.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: pinnS.contact, children: [c.location, c.email, c.phone].filter(Boolean).join("  ·  ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: pinnS.body, children: [
      c.summary ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: pinnS.textBody, children: c.summary }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: pinnS.cols, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1.8 }, children: c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: pinnS.sec, children: "PROFESSIONAL EXPERIENCE" }),
          c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 12, borderLeftWidth: 2, borderLeftColor: "#e0e7ff", paddingLeft: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: pinnS.expTitle, children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: pinnS.expCo, children: [
              e.company,
              " · ",
              e.duration
            ] }),
            e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: pinnS.bullet, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10, color: "#6366f1" }, children: "›" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...pinnS.textBody, flex: 1, marginTop: 0 }, children: a })
            ] }, j))
          ] }, i))
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
          c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: pinnS.sec, children: "KEY SKILLS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flexDirection: "row", flexWrap: "wrap" }, children: c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: pinnS.skill, children: s }, i)) })
          ] }),
          c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...pinnS.sec, marginTop: 14 }, children: "EDUCATION" }),
            c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 8 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, fontWeight: 700, color: "#0f172a" }, children: e.degree }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#6366f1", marginTop: 1 }, children: e.institution }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 7.5, color: "#94a3b8", marginTop: 1 }, children: e.year })
            ] }, i))
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const cipS = StyleSheet.create({
  page: { padding: 36, fontSize: 9, fontFamily: "Courier", backgroundColor: "#050505", color: "#00ff41" },
  name: { fontSize: 20, fontWeight: 700, color: "#00ff41" },
  title: { fontSize: 9, color: "#008f11", marginTop: 3 },
  contact: { fontSize: 7.5, color: "#008f11", marginTop: 6 },
  div: { borderBottomWidth: 0.5, borderBottomColor: "#00ff4130", marginTop: 10, marginBottom: 10 },
  sec: { fontSize: 10, fontWeight: 700, color: "#008f11", marginTop: 14, marginBottom: 6 },
  expTitle: { fontSize: 10, fontWeight: 700, color: "#00ff41" },
  expMeta: { fontSize: 8, color: "#008f11", marginTop: 1 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#00ff4199", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2 },
  cols: { flexDirection: "row", gap: 20, flex: 1 }
});
function CipherPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: cipS.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: cipS.name, children: [
      "> ",
      c.name,
      "_"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: cipS.title, children: c.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: cipS.contact, children: [c.location && `[loc: ${c.location}]`, c.email && `[mail: ${c.email}]`, c.phone && `[tel: ${c.phone}]`].filter(Boolean).join("  ") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: cipS.div }),
    c.summary ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: cipS.body, children: c.summary }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: cipS.cols, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1.8 }, children: c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: cipS.sec, children: "~/experience $" }),
        c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: cipS.expTitle, children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: cipS.expMeta, children: e.duration })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: cipS.expMeta, children: [
            "@ ",
            e.company
          ] }),
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: cipS.bullet, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10, color: "#008f11" }, children: ">" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...cipS.body, flex: 1, marginTop: 0 }, children: a })
          ] }, j))
        ] }, i))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: cipS.sec, children: "~/skills $" }),
          c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { fontSize: 8, color: "#00ff41", marginBottom: 3 }, children: [
            "[",
            s,
            "]"
          ] }, i))
        ] }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: cipS.sec, children: "~/education $" }),
          c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, fontWeight: 700, color: "#00ff41" }, children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { fontSize: 8, color: "#008f11", marginTop: 1 }, children: [
              e.institution,
              " · ",
              e.year
            ] })
          ] }, i))
        ] })
      ] })
    ] })
  ] }) });
}
const vgS = StyleSheet.create({
  page: { padding: 40, fontSize: 9, fontFamily: "Helvetica", color: "#171717" },
  name: { fontSize: 32, fontWeight: 700, letterSpacing: -1 },
  title: { fontSize: 14, color: "#737373", marginTop: 4 },
  contact: { fontSize: 8, color: "#525252", marginTop: 8, flexDirection: "row", gap: 12 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#f5f5f5", marginTop: 12, marginBottom: 20 },
  cols: { flexDirection: "row", gap: 24, flex: 1 },
  sec: { fontSize: 8, fontWeight: 700, color: "#737373", letterSpacing: 3, marginTop: 16, marginBottom: 8 },
  expTitle: { fontSize: 16, fontWeight: 700 },
  expMeta: { fontSize: 10, color: "#737373", marginTop: 2, marginBottom: 6 },
  body: { fontSize: 9, lineHeight: 1.6, color: "#404040", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2 },
  skill: { fontSize: 8.5, fontWeight: 700, color: "#ffffff", backgroundColor: "#171717", padding: 5, marginBottom: 4, marginRight: 4 }
});
function VanguardPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: vgS.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vgS.name, children: c.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vgS.title, children: c.title.toUpperCase() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: vgS.contact, children: [c.location, c.email, c.phone].filter(Boolean).map((x, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: x }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: vgS.divider }),
    c.summary ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...vgS.body, fontSize: 11, marginBottom: 20 }, children: c.summary }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: vgS.cols, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1.8 }, children: c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vgS.sec, children: "EXPERIENCE" }),
        c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 14 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vgS.expTitle, children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: vgS.expMeta, children: [
            e.company,
            " · ",
            e.duration
          ] }),
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: vgS.bullet, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 12, color: "#d4d4d4" }, children: "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...vgS.body, flex: 1, marginTop: 0 }, children: a })
          ] }, j))
        ] }, i))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vgS.sec, children: "EXPERTISE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flexDirection: "row", flexWrap: "wrap" }, children: c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vgS.skill, children: s }, i)) })
        ] }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...vgS.sec, marginTop: 14 }, children: "EDUCATION" }),
          c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 10, fontWeight: 700 }, children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8.5, color: "#737373", marginTop: 2 }, children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#a3a3a3", marginTop: 2 }, children: e.year })
          ] }, i))
        ] })
      ] })
    ] })
  ] }) });
}
const slateS = StyleSheet.create({
  page: { padding: 40, fontSize: 9, fontFamily: "Helvetica", color: "#0f172a", backgroundColor: "#f8fafc" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", borderBottomWidth: 1, borderBottomColor: "#cbd5e1", paddingBottom: 12, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 700, color: "#0f172a" },
  title: { fontSize: 10, color: "#64748b", marginTop: 3 },
  contactText: { fontSize: 8, color: "#94a3b8", marginBottom: 2, textAlign: "right" },
  sec: { fontSize: 8, fontWeight: 700, color: "#0f172a", letterSpacing: 1, marginTop: 14, marginBottom: 6, borderBottomWidth: 1, borderBottomColor: "#e2e8f0", paddingBottom: 2 },
  expTitle: { fontSize: 11, fontWeight: 700, color: "#0f172a" },
  expMeta: { fontSize: 8.5, color: "#64748b", marginTop: 1, marginBottom: 4 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#334155", marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 2 },
  cols: { flexDirection: "row", gap: 20, flex: 1 }
});
function SlatePDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: slateS.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: slateS.headerRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: slateS.name, children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: slateS.title, children: c.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { children: [c.location, c.email, c.phone].filter(Boolean).map((x, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: slateS.contactText, children: x }, i)) })
    ] }),
    c.summary ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: slateS.body, children: c.summary }) : null,
    c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: slateS.sec, children: "PROFESSIONAL EXPERIENCE" }),
      c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 10 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: slateS.expTitle, children: e.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: slateS.expMeta, children: [
          e.company,
          " · ",
          e.duration
        ] }),
        e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: slateS.bullet, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10, color: "#94a3b8" }, children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...slateS.body, flex: 1, marginTop: 0 }, children: a })
        ] }, j))
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: slateS.cols, children: [
      c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: slateS.sec, children: "SKILLS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: slateS.body, children: c.skills.join(" • ") })
      ] }),
      c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: slateS.sec, children: "EDUCATION" }),
        c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, fontWeight: 700 }, children: e.degree }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { fontSize: 8, color: "#64748b", marginTop: 1 }, children: [
            e.institution,
            " · ",
            e.year
          ] })
        ] }, i))
      ] })
    ] })
  ] }) });
}
const avantS = StyleSheet.create({
  page: { padding: 36, fontSize: 9, fontFamily: "Times-Roman", color: "#000000" },
  header: { borderBottomWidth: 3, borderBottomColor: "#000", paddingBottom: 10, marginBottom: 14, alignItems: "center" },
  name: { fontSize: 28, fontWeight: 700, letterSpacing: -0.5 },
  title: { fontSize: 11, fontWeight: 700, marginTop: 4, letterSpacing: 2 },
  contact: { fontSize: 8, marginTop: 6, letterSpacing: 1 },
  secTitle: { fontSize: 14, fontWeight: 700, borderBottomWidth: 1.5, borderBottomColor: "#000", paddingBottom: 3, marginTop: 16, marginBottom: 8 },
  expRow: { flexDirection: "row", marginBottom: 10 },
  expDate: { width: 60, fontSize: 8.5, fontWeight: 700 },
  expContent: { flex: 1, borderLeftWidth: 1.5, borderLeftColor: "#000", paddingLeft: 10 },
  expTitle: { fontSize: 13, fontWeight: 700 },
  expCo: { fontSize: 10, fontWeight: 700, marginTop: 2, marginBottom: 4 },
  body: { fontSize: 9, lineHeight: 1.5, color: "#111" },
  bullet: { flexDirection: "row", marginTop: 1 },
  cols: { flexDirection: "row", gap: 20, flex: 1 }
});
function AvantPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: avantS.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: avantS.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: avantS.name, children: c.name.toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: avantS.title, children: c.title.toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: avantS.contact, children: [c.location, c.email, c.phone].filter(Boolean).join(" | ") })
    ] }),
    c.summary ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...avantS.body, textAlign: "center", marginBottom: 14 }, children: c.summary }) : null,
    c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: avantS.secTitle, children: "EXPERIENCE" }),
      c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: avantS.expRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: avantS.expDate, children: e.duration }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: avantS.expContent, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: avantS.expTitle, children: e.title.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: avantS.expCo, children: e.company }),
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: avantS.bullet, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10 }, children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...avantS.body, flex: 1 }, children: a })
          ] }, j))
        ] })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: avantS.cols, children: [
      c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: avantS.secTitle, children: "SKILLS" }),
        c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, fontWeight: 700, marginBottom: 3 }, children: s.toUpperCase() }, i))
      ] }),
      c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: avantS.secTitle, children: "EDUCATION" }),
        c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 11, fontWeight: 700 }, children: e.degree.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, fontWeight: 700, marginTop: 2 }, children: e.institution }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8.5, marginTop: 2 }, children: e.year })
        ] }, i))
      ] })
    ] })
  ] }) });
}
const minimal = StyleSheet.create({
  page: { padding: 34, fontSize: 9, fontFamily: "Helvetica", color: "#111" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  headerMain: { flex: 1, paddingRight: 16 },
  photo: { width: 58, height: 58, borderRadius: 12, objectFit: "cover" },
  name: { fontSize: 19, fontWeight: 700 },
  title: { fontSize: 10, color: "#444", marginTop: 2 },
  contact: { fontSize: 8, color: "#777", marginTop: 4 },
  divider: { borderBottomWidth: 1, borderBottomColor: "#ccc", marginTop: 8 },
  sectionTitle: {
    fontSize: 8,
    color: "#777",
    marginTop: 11,
    marginBottom: 5,
    letterSpacing: 2,
    fontWeight: 700
  },
  itemHeader: { flexDirection: "row" },
  itemTitle: { fontSize: 9, fontWeight: 700 },
  itemMeta: { fontSize: 8, color: "#777" },
  bullet: { flexDirection: "row", marginTop: 1, paddingLeft: 8 },
  bulletDot: { width: 8 },
  body: { fontSize: 9, lineHeight: 1.35, color: "#222", marginTop: 2 }
});
function MinimalPDF({ data }) {
  const compact = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: minimal.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: minimal.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: minimal.headerMain, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.name, children: compact.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.title, children: compact.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.contact, children: [compact.location, compact.email, compact.phone].filter(Boolean).join(" · ") })
      ] }),
      compact.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: compact.photoUrl, style: minimal.photo }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: minimal.divider }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.sectionTitle, children: "SUMMARY" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.body, children: compact.summary }),
    compact.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.sectionTitle, children: "EXPERIENCE" }),
      compact.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: minimal.itemHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: minimal.itemTitle, children: [
            e.title,
            " · ",
            e.company
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.itemMeta, children: e.duration })
        ] }),
        e.description ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.body, children: e.description }) : null,
        e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: minimal.bullet, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.bulletDot, children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...minimal.body, flex: 1, marginTop: 0 }, children: a })
        ] }, j))
      ] }, i))
    ] }),
    compact.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.sectionTitle, children: "PROJECTS" }),
      compact.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.itemTitle, children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.body, children: p.description }),
        p.tech.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.itemMeta, children: p.tech.join(" · ") })
      ] }, i))
    ] }),
    compact.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.sectionTitle, children: "SKILLS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.body, children: compact.skills.join(" · ") })
    ] }),
    compact.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.sectionTitle, children: "EDUCATION" }),
      compact.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: minimal.itemHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: minimal.body, children: [
          e.degree,
          " · ",
          e.institution
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: minimal.itemMeta, children: e.year })
      ] }, i))
    ] })
  ] }) });
}
const exec = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Times-Roman", color: "#111", flexDirection: "row" },
  side: { width: "33%", backgroundColor: "#111", color: "#fff", padding: 20, height: "100%" },
  main: { width: "67%", padding: 22, height: "100%" },
  photo: { width: 58, height: 58, borderRadius: 12, marginBottom: 14, objectFit: "cover" },
  name: { fontSize: 18, fontWeight: 700, color: "#fff" },
  role: { fontSize: 9, fontStyle: "italic", color: "#bbb", marginTop: 2 },
  sideContact: { fontSize: 8, color: "#ccc", marginTop: 8 },
  sideHeader: {
    fontSize: 8,
    color: "#888",
    marginTop: 14,
    marginBottom: 5,
    letterSpacing: 2,
    fontWeight: 700
  },
  sideItem: { fontSize: 8, color: "#eee", marginBottom: 3 },
  mainHeader: {
    fontSize: 8,
    color: "#444",
    letterSpacing: 2,
    fontWeight: 700,
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 3
  },
  expTitle: { fontSize: 10, fontWeight: 700 },
  expMeta: { fontSize: 8, fontStyle: "italic", color: "#666", marginTop: 1 },
  body: { fontSize: 9, lineHeight: 1.35, marginTop: 2 },
  bullet: { flexDirection: "row", marginTop: 1, paddingLeft: 8 }
});
function ExecutivePDF({ data }) {
  const compact = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: exec.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: exec.side, children: [
      compact.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: compact.photoUrl, style: exec.photo }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.name, children: compact.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.role, children: compact.title }),
      compact.location ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.sideContact, children: compact.location }) : null,
      compact.email ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.sideContact, children: compact.email }) : null,
      compact.phone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.sideContact, children: compact.phone }) : null,
      compact.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.sideHeader, children: "EXPERTISE" }),
        compact.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.sideItem, children: s }, i))
      ] }),
      compact.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.sideHeader, children: "EDUCATION" }),
        compact.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...exec.sideItem, fontWeight: 700 }, children: e.degree }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: exec.sideItem, children: [
            e.institution,
            ", ",
            e.year
          ] })
        ] }, i))
      ] }),
      compact.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.sideHeader, children: "CERTIFICATIONS" }),
        compact.certifications.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.sideItem, children: c }, i))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: exec.main, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.mainHeader, children: "PROFILE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.body, children: compact.summary }),
      compact.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.mainHeader, children: "EXPERIENCE" }),
        compact.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 8 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.expTitle, children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: exec.expMeta, children: [
            e.company,
            " · ",
            e.duration
          ] }),
          e.description ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.body, children: e.description }) : null,
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: exec.bullet, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 8 }, children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...exec.body, flex: 1, marginTop: 0 }, children: a })
          ] }, j))
        ] }, i))
      ] }),
      compact.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.mainHeader, children: "SELECTED PROJECTS" }),
        compact.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...exec.expTitle, fontSize: 10 }, children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: exec.body, children: p.description }),
          p.impact ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { ...exec.expMeta, fontSize: 9 }, children: [
            "Impact: ",
            p.impact
          ] }) : null
        ] }, i))
      ] })
    ] })
  ] }) });
}
const nexus = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#111" },
  header: { marginBottom: 30 },
  name: { fontSize: 28, fontWeight: 700, marginBottom: 4 },
  title: { fontSize: 12, color: "#666", marginBottom: 16 },
  contact: { fontSize: 9, color: "#777", flexDirection: "row", justifyContent: "flex-end" },
  sectionTitle: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 },
  timelineItem: { paddingLeft: 16, marginBottom: 20 },
  expTitle: { fontSize: 12, fontWeight: 700 },
  expCompany: { fontSize: 10, color: "#555", marginBottom: 4 },
  expMeta: { fontSize: 9, color: "#888", marginBottom: 4 },
  body: { fontSize: 9, lineHeight: 1.5, color: "#444" },
  bullet: { flexDirection: "row", marginBottom: 2, paddingLeft: 4 }
});
function NexusPDF({ data }) {
  const compact = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: nexus.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: nexus.name, children: compact.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: nexus.title, children: compact.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { alignItems: "flex-end" }, children: [compact.location, compact.email, compact.phone].filter(Boolean).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...nexus.contact, marginBottom: 2 }, children: c }, i)) })
    ] }),
    compact.summary ? /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { marginBottom: 24 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: nexus.body, children: compact.summary }) }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1, paddingRight: 20 }, children: compact.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", alignItems: "center", marginBottom: 16 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: nexus.sectionTitle, children: "Experience" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1, height: 1, backgroundColor: "#eaeaea", marginLeft: 8 } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { borderLeftWidth: 1, borderLeftColor: "#ccc", marginLeft: 4 }, children: compact.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: nexus.timelineItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Svg, { width: "8", height: "8", viewBox: "0 0 12 12", style: { position: "absolute", left: -4, top: 4 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { cx: "6", cy: "6", r: "4", fill: "#fff", stroke: "#111", strokeWidth: "2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: nexus.expTitle, children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: nexus.expMeta, children: e.duration })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: nexus.expCompany, children: e.company }),
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: nexus.bullet, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 8 }, children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...nexus.body, flex: 1 }, children: a })
          ] }, j))
        ] }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { width: 180, paddingLeft: 20 }, children: [
        compact.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 24 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", alignItems: "center", marginBottom: 16 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: nexus.sectionTitle, children: "Skills" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1, height: 1, backgroundColor: "#eaeaea", marginLeft: 8 } })
          ] }),
          compact.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, fontWeight: 700, marginBottom: 2 }, children: s }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Svg, { width: "100%", height: "3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Rect, { width: "100%", height: "3", fill: "#eee" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Rect, { width: `${compact.skillItems[i].level * 20}%`, height: "3", fill: "#111" })
            ] })
          ] }, i))
        ] }),
        compact.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", alignItems: "center", marginBottom: 16 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: nexus.sectionTitle, children: "Education" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1, height: 1, backgroundColor: "#eaeaea", marginLeft: 8 } })
          ] }),
          compact.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 10, fontWeight: 700 }, children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, color: "#555", marginTop: 2 }, children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#999", marginTop: 2 }, children: e.year })
          ] }, i))
        ] })
      ] })
    ] })
  ] }) });
}
const orbit = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#222" },
  header: { textAlign: "center", marginBottom: 30 },
  name: { fontSize: 24, fontWeight: 300, letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" },
  title: { fontSize: 11, fontWeight: 700, color: "#555", marginBottom: 12 },
  contact: { flexDirection: "row", justifyContent: "center" },
  sectionTitle: { fontSize: 11, fontWeight: 300, textTransform: "uppercase", letterSpacing: 2, borderBottomWidth: 1, borderBottomColor: "#111", paddingBottom: 4, marginBottom: 16 },
  expTitle: { fontSize: 11, fontWeight: 700 },
  expCompany: { fontSize: 10, color: "#666", marginBottom: 4 },
  body: { fontSize: 9, lineHeight: 1.5, color: "#444" },
  bullet: { flexDirection: "row", marginBottom: 2, paddingLeft: 4 }
});
function OrbitPDF({ data }) {
  const compact = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: orbit.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: orbit.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: orbit.name, children: compact.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: orbit.title, children: compact.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: orbit.contact, children: [compact.location, compact.email, compact.phone].filter(Boolean).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", alignItems: "center", marginHorizontal: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Svg, { width: "8", height: "8", viewBox: "0 0 24 24", style: { marginRight: 4 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { cx: "12", cy: "12", r: "10", fill: "none", stroke: "#222", strokeWidth: "2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#777" }, children: c })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1, paddingRight: 20 }, children: compact.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 24 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: orbit.sectionTitle, children: "Experience" }),
        compact.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 16 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: orbit.expTitle, children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: orbit.expCompany, children: [
            e.company,
            " | ",
            e.duration
          ] }),
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: orbit.bullet, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 6, fontSize: 8 }, children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...orbit.body, flex: 1 }, children: a })
          ] }, j))
        ] }, i))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1, paddingLeft: 20 }, children: [
        compact.summary ? /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 24 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: orbit.sectionTitle, children: "Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: orbit.body, children: compact.summary })
        ] }) : null,
        compact.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 24 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: orbit.sectionTitle, children: "Expertise" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flexDirection: "row", flexWrap: "wrap" }, children: compact.skills.map((s, i) => {
            const rating = s.length % 3 + 3;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { width: "50%", marginBottom: 8 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, fontWeight: 700, marginBottom: 2 }, children: s }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flexDirection: "row" }, children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(Svg, { width: "8", height: "8", viewBox: "0 0 24 24", style: { marginRight: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Polygon, { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2", fill: star <= rating ? "#222" : "#eee" }) }, star)) })
            ] }, i);
          }) })
        ] }),
        compact.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: orbit.sectionTitle, children: "Education" }),
          compact.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 10, fontWeight: 700 }, children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, color: "#555" }, children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#888" }, children: e.year })
          ] }, i))
        ] })
      ] })
    ] })
  ] }) });
}
const metric = StyleSheet.create({
  page: { padding: 30, fontSize: 10, fontFamily: "Helvetica", color: "#000" },
  header: { borderWidth: 2, borderColor: "#000", padding: 20, marginBottom: 24 },
  name: { fontSize: 28, fontWeight: 700, textTransform: "uppercase", marginBottom: 6 },
  title: { fontSize: 12, fontWeight: 700, color: "#444" },
  sectionTitle: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, borderBottomWidth: 2, borderBottomColor: "#000", paddingBottom: 4, marginBottom: 16 },
  body: { fontSize: 9, lineHeight: 1.5, color: "#222" }
});
function MetricPDF({ data }) {
  const compact = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: metric.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: metric.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: metric.name, children: compact.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: metric.title, children: compact.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, color: "#555" }, children: [compact.location, compact.email, compact.phone].filter(Boolean).join("  //  ") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { width: 180, paddingRight: 20 }, children: [
        compact.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 24 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: metric.sectionTitle, children: "Metrics" }),
          compact.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 10 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, fontWeight: 700, textTransform: "uppercase" }, children: s }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { fontSize: 8, fontWeight: 700 }, children: [
                compact.skillItems[i].level * 20,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Svg, { width: "100%", height: "6", style: { borderWidth: 1, borderColor: "#000" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rect, { width: `${compact.skillItems[i].level * 20}%`, height: "6", fill: "#000" }) })
          ] }, i))
        ] }),
        compact.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 24 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: metric.sectionTitle, children: "Education" }),
          compact.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, fontWeight: 700, textTransform: "uppercase" }, children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#444", marginTop: 2 }, children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#888", marginTop: 2 }, children: e.year })
          ] }, i))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1, paddingLeft: 20 }, children: [
        compact.summary ? /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 24 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: metric.sectionTitle, children: "Executive Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: metric.body, children: compact.summary })
        ] }) : null,
        compact.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: metric.sectionTitle, children: "Professional Experience" }),
          compact.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 16, borderLeftWidth: 3, borderLeftColor: "#000", paddingLeft: 12 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 2 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 12, fontWeight: 700 }, children: e.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { backgroundColor: "#000", paddingHorizontal: 4, paddingVertical: 2 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, fontWeight: 700, color: "#fff" }, children: e.duration }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 10, fontWeight: 700, color: "#555", marginBottom: 6 }, children: e.company }),
            e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", marginBottom: 2, paddingLeft: 4 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 6, fontSize: 8 }, children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...metric.body, flex: 1 }, children: a })
            ] }, j))
          ] }, i))
        ] })
      ] })
    ] })
  ] }) });
}
const carbon = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", color: "#111", flexDirection: "row" },
  bar: { width: 6, backgroundColor: "#1a1a1a", height: "100%" },
  side: { width: "30%", backgroundColor: "#f4f4f4", padding: 20, height: "100%" },
  main: { width: "64%", padding: 22, height: "100%" },
  photo: { width: 64, height: 64, borderRadius: 6, marginBottom: 12, objectFit: "cover" },
  name: { fontSize: 20, fontWeight: 700, letterSpacing: 1 },
  title: { fontSize: 9, color: "#555", marginTop: 2, marginBottom: 14, letterSpacing: 2 },
  sideSection: { fontSize: 7, fontWeight: 700, color: "#999", letterSpacing: 2, marginTop: 14, marginBottom: 5 },
  sideText: { fontSize: 8, color: "#333", marginBottom: 3, lineHeight: 1.4 },
  mainSection: { fontSize: 8, fontWeight: 700, color: "#1a1a1a", letterSpacing: 2, marginTop: 14, marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: "#1a1a1a", paddingBottom: 3 },
  expTitle: { fontSize: 10, fontWeight: 700 },
  expMeta: { fontSize: 8, color: "#777", marginTop: 1, marginBottom: 3 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#333" },
  bullet: { flexDirection: "row", marginTop: 2, paddingLeft: 8 }
});
function CarbonPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: carbon.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: carbon.bar }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: carbon.side, children: [
      c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: c.photoUrl, style: carbon.photo }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.name, children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.title, children: c.title.toUpperCase() }),
      c.location ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.sideText, children: c.location }) : null,
      c.email ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.sideText, children: c.email }) : null,
      c.phone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.sideText, children: c.phone }) : null,
      c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.sideSection, children: "SKILLS" }),
        c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: carbon.sideText, children: [
          "— ",
          s
        ] }, i))
      ] }),
      c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.sideSection, children: "EDUCATION" }),
        c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...carbon.sideText, fontWeight: 700 }, children: e.degree }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.sideText, children: e.institution }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...carbon.sideText, color: "#999" }, children: e.year })
        ] }, i))
      ] }),
      c.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.sideSection, children: "CERTS" }),
        c.certifications.map((cert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.sideText, children: cert }, i))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: carbon.main, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.mainSection, children: "PROFILE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.body, children: c.summary }),
      c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.mainSection, children: "EXPERIENCE" }),
        c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.expTitle, children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: carbon.expMeta, children: [
            e.company,
            " · ",
            e.duration
          ] }),
          e.description ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.body, children: e.description }) : null,
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: carbon.bullet, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 8 }, children: "▪" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...carbon.body, flex: 1, marginTop: 0 }, children: a })
          ] }, j))
        ] }, i))
      ] }),
      c.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.mainSection, children: "PROJECTS" }),
        c.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...carbon.expTitle, fontSize: 9 }, children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: carbon.body, children: p.description }),
          p.impact ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: carbon.expMeta, children: [
            "Impact: ",
            p.impact
          ] }) : null
        ] }, i))
      ] })
    ] })
  ] }) });
}
const atlas = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", color: "#111" },
  header: { backgroundColor: "#0f1923", padding: 28, flexDirection: "row", alignItems: "flex-start" },
  photo: { width: 64, height: 64, borderRadius: 4, marginRight: 20, objectFit: "cover" },
  headerText: { flex: 1 },
  name: { fontSize: 24, fontWeight: 700, color: "#fff", letterSpacing: 1 },
  title: { fontSize: 10, color: "#aaa", marginTop: 3, letterSpacing: 1 },
  contacts: { fontSize: 8, color: "#888", marginTop: 8, flexDirection: "row", flexWrap: "wrap", gap: 12 },
  body: { padding: 24 },
  cols: { flexDirection: "row", gap: 20, flex: 1 },
  mainCol: { flex: 2 },
  sideCol: { flex: 1 },
  section: { fontSize: 8, fontWeight: 700, color: "#0f1923", letterSpacing: 2, marginTop: 16, marginBottom: 6, borderBottomWidth: 1, borderBottomColor: "#ddd", paddingBottom: 3 },
  expTitle: { fontSize: 10, fontWeight: 700 },
  expMeta: { fontSize: 8, color: "#666", marginTop: 1 },
  textBody: { fontSize: 8.5, lineHeight: 1.5, color: "#333", marginTop: 3 },
  bullet: { flexDirection: "row", marginTop: 2 },
  sideText: { fontSize: 8, color: "#444", marginBottom: 3, lineHeight: 1.4 }
});
function AtlasPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: atlas.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: atlas.header, children: [
      c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: c.photoUrl, style: atlas.photo }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: atlas.headerText, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.name, children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.title, children: c.title.toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: atlas.contacts, children: [
          c.location ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: c.location }) : null,
          c.email ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: c.email }) : null,
          c.phone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: c.phone }) : null
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: atlas.body, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.textBody, children: c.summary }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: atlas.cols, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: atlas.mainCol, children: [
          c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.section, children: "EXPERIENCE" }),
            c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 10 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.expTitle, children: e.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: atlas.expMeta, children: [
                e.company,
                " · ",
                e.duration
              ] }),
              e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: atlas.bullet, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10, color: "#0f1923" }, children: "›" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...atlas.textBody, flex: 1, marginTop: 0 }, children: a })
              ] }, j))
            ] }, i))
          ] }),
          c.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.section, children: "PROJECTS" }),
            c.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...atlas.expTitle, fontSize: 9 }, children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.textBody, children: p.description })
            ] }, i))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: atlas.sideCol, children: [
          c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.section, children: "SKILLS" }),
            c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: atlas.sideText, children: [
              "· ",
              s
            ] }, i))
          ] }),
          c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.section, children: "EDUCATION" }),
            c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...atlas.sideText, fontWeight: 700 }, children: e.degree }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: atlas.sideText, children: [
                e.institution,
                ", ",
                e.year
              ] })
            ] }, i))
          ] }),
          c.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.section, children: "CERTS" }),
            c.certifications.map((cert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: atlas.sideText, children: cert }, i))
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const forge = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", color: "#111", padding: 36 },
  photo: { width: 56, height: 56, borderRadius: 3, objectFit: "cover", marginBottom: 10 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", borderBottomWidth: 2, borderBottomColor: "#111", paddingBottom: 10, marginBottom: 14 },
  name: { fontSize: 26, fontWeight: 700, letterSpacing: -0.5 },
  title: { fontSize: 9, color: "#555", letterSpacing: 2, marginTop: 3 },
  contactBlock: { alignItems: "flex-end" },
  contactText: { fontSize: 7.5, color: "#555", marginBottom: 2 },
  section: { fontSize: 7.5, fontWeight: 700, letterSpacing: 3, color: "#111", marginTop: 16, marginBottom: 6 },
  expRow: { flexDirection: "row", marginBottom: 10 },
  expBar: { width: 2, backgroundColor: "#111", marginRight: 10, marginTop: 3 },
  expContent: { flex: 1 },
  expTitle: { fontSize: 10, fontWeight: 700 },
  expMeta: { fontSize: 8, color: "#666", fontFamily: "Courier", marginTop: 1, marginBottom: 3 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#333" },
  bullet: { flexDirection: "row", marginTop: 1 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 4 },
  skillPill: { borderWidth: 0.5, borderColor: "#333", paddingHorizontal: 6, paddingVertical: 2, fontSize: 7.5 }
});
function ForgePDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: forge.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: forge.headerRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { children: [
        c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: c.photoUrl, style: forge.photo }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.name, children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.title, children: c.title.toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: forge.contactBlock, children: [
        c.location ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.contactText, children: c.location }) : null,
        c.email ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.contactText, children: c.email }) : null,
        c.phone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.contactText, children: c.phone }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.body, children: c.summary }),
    c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.section, children: "EXPERIENCE" }),
      c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: forge.expRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: forge.expBar }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: forge.expContent, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.expTitle, children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: forge.expMeta, children: [
            e.company,
            " / ",
            e.duration
          ] }),
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: forge.bullet, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10 }, children: "—" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...forge.body, flex: 1, marginTop: 0 }, children: a })
          ] }, j))
        ] })
      ] }, i))
    ] }),
    c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.section, children: "SKILLS" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: forge.skillsRow, children: c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.skillPill, children: s }, i)) })
    ] }),
    c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: forge.section, children: "EDUCATION" }),
      c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: forge.body, children: [
        e.degree,
        " · ",
        e.institution,
        " · ",
        e.year
      ] }, i))
    ] })
  ] }) });
}
const zenith = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Helvetica", color: "#111", padding: 40 },
  top: { alignItems: "center", marginBottom: 24 },
  photo: { width: 72, height: 72, borderRadius: 36, objectFit: "cover", marginBottom: 10 },
  name: { fontSize: 28, fontWeight: 700, letterSpacing: 2, textAlign: "center" },
  title: { fontSize: 9, color: "#888", letterSpacing: 3, marginTop: 4, textAlign: "center" },
  rule: { height: 0.5, backgroundColor: "#c9a84c", marginTop: 6, width: "30%" },
  contacts: { flexDirection: "row", justifyContent: "center", gap: 18, marginTop: 6 },
  contactText: { fontSize: 7.5, color: "#666" },
  section: { fontSize: 7.5, fontWeight: 700, letterSpacing: 3, color: "#c9a84c", marginTop: 18, marginBottom: 8, textAlign: "center" },
  divider: { height: 0.5, backgroundColor: "#e5e5e5", marginBottom: 10 },
  expTitle: { fontSize: 10, fontWeight: 700 },
  expMeta: { fontSize: 8, color: "#888", marginTop: 1, marginBottom: 4 },
  body: { fontSize: 8.5, lineHeight: 1.6, color: "#333" },
  bullet: { flexDirection: "row", marginTop: 2 },
  cols: { flexDirection: "row", gap: 24, flex: 1 },
  mainCol: { flex: 1.6 },
  sideCol: { flex: 1 },
  sideText: { fontSize: 8, color: "#444", marginBottom: 4, lineHeight: 1.4 }
});
function ZenithPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: zenith.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: zenith.top, children: [
      c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: c.photoUrl, style: zenith.photo }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.name, children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.title, children: c.title.toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: zenith.rule }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: zenith.contacts, children: [
        c.location ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.contactText, children: c.location }) : null,
        c.email ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.contactText, children: c.email }) : null,
        c.phone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.contactText, children: c.phone }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.body, children: c.summary }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: zenith.cols, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: zenith.mainCol, children: c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.section, children: "EXPERIENCE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: zenith.divider }),
        c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 12 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.expTitle, children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: zenith.expMeta, children: [
            e.company,
            " · ",
            e.duration
          ] }),
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: zenith.bullet, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10, color: "#c9a84c" }, children: "›" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...zenith.body, flex: 1, marginTop: 0 }, children: a })
          ] }, j))
        ] }, i))
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: zenith.sideCol, children: [
        c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.section, children: "SKILLS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: zenith.divider }),
          c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.sideText, children: s }, i))
        ] }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.section, children: "EDUCATION" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: zenith.divider }),
          c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...zenith.sideText, fontWeight: 700 }, children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: zenith.sideText, children: [
              e.institution,
              " · ",
              e.year
            ] })
          ] }, i))
        ] }),
        c.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.section, children: "CERTS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: zenith.divider }),
          c.certifications.map((cert, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: zenith.sideText, children: cert }, i))
        ] })
      ] })
    ] })
  ] }) });
}
const vector = StyleSheet.create({
  page: { fontSize: 9, fontFamily: "Courier", color: "#e2e8f0", backgroundColor: "#0d1117" },
  header: { backgroundColor: "#161b22", padding: 24, borderBottomWidth: 1, borderBottomColor: "#30363d" },
  photo: { width: 56, height: 56, borderRadius: 4, objectFit: "cover", marginBottom: 10 },
  name: { fontSize: 22, fontWeight: 700, color: "#58a6ff", letterSpacing: 1 },
  title: { fontSize: 9, color: "#8b949e", marginTop: 3, letterSpacing: 1 },
  contacts: { flexDirection: "row", gap: 16, marginTop: 8 },
  contactText: { fontSize: 7.5, color: "#8b949e" },
  body: { padding: 22 },
  section: { fontSize: 7.5, fontWeight: 700, letterSpacing: 3, color: "#58a6ff", marginTop: 16, marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: "#30363d", paddingBottom: 3 },
  expTitle: { fontSize: 10, fontWeight: 700, color: "#f0f6fc" },
  expMeta: { fontSize: 8, color: "#8b949e", marginTop: 1, marginBottom: 3 },
  textBody: { fontSize: 8.5, lineHeight: 1.5, color: "#c9d1d9" },
  bullet: { flexDirection: "row", marginTop: 2 },
  skillsRow: { flexDirection: "row", flexWrap: "wrap", gap: 5, marginTop: 4 },
  skillPill: { backgroundColor: "#21262d", borderWidth: 0.5, borderColor: "#58a6ff", paddingHorizontal: 7, paddingVertical: 2, fontSize: 7.5, color: "#58a6ff" },
  cols: { flexDirection: "row", gap: 18, flex: 1 }
});
function VectorPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: vector.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: vector.header, children: [
      c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: c.photoUrl, style: vector.photo }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.name, children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.title, children: c.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: vector.contacts, children: [
        c.location ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.contactText, children: c.location }) : null,
        c.email ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.contactText, children: c.email }) : null,
        c.phone ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.contactText, children: c.phone }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: vector.body, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.textBody, children: c.summary }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: vector.cols, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1.7 }, children: [
          c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.section, children: "// EXPERIENCE" }),
            c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 10 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.expTitle, children: e.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: vector.expMeta, children: [
                e.company,
                " · ",
                e.duration
              ] }),
              e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: vector.bullet, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 12, color: "#58a6ff" }, children: "→" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...vector.textBody, flex: 1, marginTop: 0 }, children: a })
              ] }, j))
            ] }, i))
          ] }),
          c.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.section, children: "// PROJECTS" }),
            c.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...vector.expTitle, fontSize: 9 }, children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.textBody, children: p.description })
            ] }, i))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
          c.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.section, children: "// STACK" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: vector.skillsRow, children: c.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.skillPill, children: s }, i)) })
          ] }),
          c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: vector.section, children: "// EDUCATION" }),
            c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...vector.textBody, fontWeight: 700, color: "#f0f6fc" }, children: e.degree }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: vector.expMeta, children: [
                e.institution,
                " · ",
                e.year
              ] })
            ] }, i))
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
const rtlTextPattern = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;
function pdfIsRTL(data) {
  return rtlTextPattern.test([
    data.name,
    data.title,
    data.location,
    data.summary,
    ...data.skills,
    ...data.certifications,
    ...data.experience.flatMap((item) => [item.title, item.company, item.description, ...item.achievements]),
    ...data.projects.flatMap((item) => [item.name, item.description, item.impact, ...item.tech]),
    ...data.education.flatMap((item) => [item.degree, item.institution])
  ].filter(Boolean).join(" "));
}
function pdfLabels(rtl) {
  return rtl ? { profile: "PROFILE", experience: "EXPERIENCE", projects: "PROJECTS", skills: "SKILLS", education: "EDUCATION", certifications: "CERTIFICATIONS", contact: "CONTACT" } : { profile: "PROFILE", experience: "EXPERIENCE", projects: "PROJECTS", skills: "SKILLS", education: "EDUCATION", certifications: "CERTIFICATIONS", contact: "CONTACT" };
}
const newSleek = StyleSheet.create({
  page: { padding: 34, fontSize: 9, fontFamily: "Helvetica", color: "#0f172a", backgroundColor: "#ffffff" },
  header: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderBottomColor: "#d8dee8", paddingBottom: 22 },
  headerRTL: { flexDirection: "row-reverse" },
  accent: { width: 70, height: 4, backgroundColor: "#0f172a", borderRadius: 4, marginBottom: 14 },
  name: { fontSize: 28, fontWeight: 700, lineHeight: 0.95 },
  title: { fontSize: 8, color: "#64748b", letterSpacing: 2, marginTop: 10 },
  photo: { width: 76, height: 76, borderRadius: 14, objectFit: "cover", marginBottom: 10 },
  contact: { fontSize: 7.5, color: "#64748b", marginBottom: 3 },
  bodyGrid: { flexDirection: "row", gap: 24, paddingTop: 20 },
  bodyGridRTL: { flexDirection: "row-reverse" },
  main: { flex: 1 },
  side: { width: 150, borderLeftWidth: 1, borderLeftColor: "#e2e8f0", paddingLeft: 16 },
  sideRTL: { borderLeftWidth: 0, borderRightWidth: 1, borderRightColor: "#e2e8f0", paddingLeft: 0, paddingRight: 16 },
  section: { fontSize: 7.5, fontWeight: 700, letterSpacing: 2, borderBottomWidth: 0.7, borderBottomColor: "#0f172a", paddingBottom: 4, marginBottom: 8, marginTop: 12 },
  body: { fontSize: 8.3, lineHeight: 1.45, color: "#334155" },
  itemTitle: { fontSize: 9.5, fontWeight: 700, color: "#0f172a" },
  itemMeta: { fontSize: 7.3, color: "#64748b", marginTop: 2, marginBottom: 3 },
  bullet: { flexDirection: "row", marginTop: 2 },
  chip: { fontSize: 7.2, borderWidth: 0.6, borderColor: "#d8dee8", paddingHorizontal: 5, paddingVertical: 2, marginRight: 4, marginBottom: 4, borderRadius: 8 }
});
function NewSleekPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = pdfIsRTL(c);
  const l = pdfLabels(rtl);
  const align = rtl ? "right" : "left";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: newSleek.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: [newSleek.header, rtl && newSleek.headerRTL], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: newSleek.accent }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.name, textAlign: align }, children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.title, textAlign: align }, children: c.title.toUpperCase() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { alignItems: rtl ? "flex-start" : "flex-end", width: 130 }, children: [
        c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: c.photoUrl, style: newSleek.photo }) : /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { ...newSleek.photo, backgroundColor: "#e2e8f0" } }),
        [c.location, c.email, c.phone].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.contact, textAlign: align }, children: item }, item))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: [newSleek.bodyGrid, rtl && newSleek.bodyGridRTL], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: newSleek.main, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.section, textAlign: align }, children: l.profile }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.body, textAlign: align }, children: c.summary }),
        c.experience.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.section, textAlign: align }, children: l.experience }),
          c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 9 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.itemTitle, textAlign: align }, children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { ...newSleek.itemMeta, textAlign: align }, children: [
              e.company,
              " / ",
              e.duration
            ] }),
            e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { ...newSleek.bullet, flexDirection: rtl ? "row-reverse" : "row" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10, color: "#0f172a" }, children: "-" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.body, flex: 1, textAlign: align }, children: a })
            ] }, j))
          ] }, i))
        ] }) : null,
        c.projects.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.section, textAlign: align }, children: l.projects }),
          c.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.itemTitle, textAlign: align }, children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.body, textAlign: align }, children: p.description })
          ] }, i))
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: [newSleek.side, rtl && newSleek.sideRTL], children: [
        c.skills.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.section, textAlign: align }, children: l.skills }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flexDirection: rtl ? "row-reverse" : "row", flexWrap: "wrap" }, children: c.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: newSleek.chip, children: skill }, skill)) })
        ] }) : null,
        c.education.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.section, textAlign: align }, children: l.education }),
          c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 7 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.itemTitle, fontSize: 8.5, textAlign: align }, children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { ...newSleek.body, textAlign: align }, children: [
              e.institution,
              " / ",
              e.year
            ] })
          ] }, i))
        ] }) : null,
        c.certifications.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.section, textAlign: align }, children: l.certifications }),
          c.certifications.map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newSleek.body, marginBottom: 4, textAlign: align }, children: cert }, cert))
        ] }) : null
      ] })
    ] })
  ] }) });
}
const newProfessional = StyleSheet.create({
  page: { padding: 24, fontSize: 9, fontFamily: "Helvetica", color: "#0f172a", backgroundColor: "#f8fafc" },
  shell: { flexDirection: "row", minHeight: 794, borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 18, overflow: "hidden", backgroundColor: "#ffffff" },
  shellRTL: { flexDirection: "row-reverse" },
  side: { width: 165, backgroundColor: "#0f172a", color: "#ffffff", padding: 20 },
  photo: { width: 74, height: 74, borderRadius: 37, objectFit: "cover", marginBottom: 18 },
  sideName: { fontSize: 19, fontWeight: 700, lineHeight: 1.05, color: "#ffffff" },
  sideRole: { fontSize: 7.5, letterSpacing: 1.5, color: "#a5f3fc", marginTop: 8 },
  sideHeading: { fontSize: 7.5, letterSpacing: 1.8, color: "#94a3b8", marginTop: 18, marginBottom: 7 },
  sideText: { fontSize: 7.8, color: "#e2e8f0", lineHeight: 1.35, marginBottom: 5 },
  main: { flex: 1, padding: 24 },
  profileBox: { backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 16, padding: 14, marginBottom: 14 },
  heading: { fontSize: 7.5, fontWeight: 700, letterSpacing: 2, color: "#0e7490", borderBottomWidth: 0.7, borderBottomColor: "#0e7490", paddingBottom: 4, marginTop: 12, marginBottom: 8 },
  body: { fontSize: 8.3, lineHeight: 1.45, color: "#334155" },
  title: { fontSize: 9.5, fontWeight: 700 },
  meta: { fontSize: 7.5, color: "#64748b", marginTop: 2, marginBottom: 3 },
  bullet: { flexDirection: "row", marginTop: 2 }
});
function NewProfessionalPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = pdfIsRTL(c);
  const l = pdfLabels(rtl);
  const align = rtl ? "right" : "left";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Page, { size: "A4", style: newProfessional.page, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: [newProfessional.shell, rtl && newProfessional.shellRTL], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: newProfessional.side, children: [
      c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: c.photoUrl, style: newProfessional.photo }) : /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { ...newProfessional.photo, backgroundColor: "#334155" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.sideName, textAlign: align }, children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.sideRole, textAlign: align }, children: c.title.toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.sideHeading, textAlign: align }, children: l.contact }),
      [c.location, c.email, c.phone].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.sideText, textAlign: align }, children: item }, item)),
      c.skills.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.sideHeading, textAlign: align }, children: l.skills }),
        c.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.sideText, textAlign: align }, children: skill }, skill))
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: newProfessional.main, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: newProfessional.profileBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.heading, marginTop: 0, textAlign: align }, children: l.profile }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.body, textAlign: align }, children: c.summary })
      ] }),
      c.experience.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.heading, textAlign: align }, children: l.experience }),
        c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 9, borderLeftWidth: rtl ? 0 : 1.5, borderRightWidth: rtl ? 1.5 : 0, borderColor: "#cbd5e1", paddingLeft: rtl ? 0 : 10, paddingRight: rtl ? 10 : 0 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.title, textAlign: align }, children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { ...newProfessional.meta, textAlign: align }, children: [
            e.company,
            " / ",
            e.duration
          ] }),
          e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { ...newProfessional.bullet, flexDirection: rtl ? "row-reverse" : "row" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10 }, children: "-" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.body, flex: 1, textAlign: align }, children: a })
          ] }, j))
        ] }, i))
      ] }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: rtl ? "row-reverse" : "row", gap: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1 }, children: c.projects.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.heading, textAlign: align }, children: l.projects }),
          c.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.title, fontSize: 8.8, textAlign: align }, children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.body, textAlign: align }, children: p.description })
          ] }, i))
        ] }) : null }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1 }, children: c.education.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.heading, textAlign: align }, children: l.education }),
          c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newProfessional.title, fontSize: 8.8, textAlign: align }, children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { ...newProfessional.body, textAlign: align }, children: [
              e.institution,
              " / ",
              e.year
            ] })
          ] }, i))
        ] }) : null })
      ] })
    ] })
  ] }) }) });
}
const newAcademic = StyleSheet.create({
  page: { padding: 38, fontSize: 9, fontFamily: "Times-Roman", color: "#111827", backgroundColor: "#ffffff" },
  header: { flexDirection: "row", gap: 22, borderBottomWidth: 1.6, borderBottomColor: "#111827", paddingBottom: 18 },
  headerRTL: { flexDirection: "row-reverse" },
  photo: { width: 72, height: 88, borderTopLeftRadius: 36, borderTopRightRadius: 36, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, objectFit: "cover" },
  kicker: { fontSize: 7.5, letterSpacing: 2.2, color: "#64748b", marginBottom: 8 },
  name: { fontSize: 26, fontWeight: 700 },
  role: { fontSize: 11, color: "#334155", marginTop: 4 },
  contacts: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginTop: 9 },
  contact: { fontSize: 7.5, color: "#64748b" },
  grid: { flexDirection: "row", gap: 24, paddingTop: 18 },
  gridRTL: { flexDirection: "row-reverse" },
  main: { flex: 1 },
  side: { width: 150 },
  heading: { fontSize: 7.8, fontWeight: 700, letterSpacing: 2, borderBottomWidth: 0.7, borderBottomColor: "#111827", paddingBottom: 4, marginTop: 12, marginBottom: 8 },
  body: { fontSize: 8.5, lineHeight: 1.5, color: "#334155" },
  itemTitle: { fontSize: 9.5, fontWeight: 700 },
  itemMeta: { fontSize: 7.8, color: "#64748b", marginTop: 2, marginBottom: 3 },
  bullet: { flexDirection: "row", marginTop: 2 }
});
function NewAcademicPDF({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = pdfIsRTL(c);
  const l = pdfLabels(rtl);
  const align = rtl ? "right" : "left";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: newAcademic.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: [newAcademic.header, rtl && newAcademic.headerRTL], children: [
      c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { src: c.photoUrl, style: newAcademic.photo }) : /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { ...newAcademic.photo, backgroundColor: "#e2e8f0" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.kicker, textAlign: align }, children: "SELECTED CURRICULUM VITAE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.name, textAlign: align }, children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.role, textAlign: align }, children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { ...newAcademic.contacts, flexDirection: rtl ? "row-reverse" : "row" }, children: [c.location, c.email, c.phone].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: newAcademic.contact, children: item }, item)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: [newAcademic.grid, rtl && newAcademic.gridRTL], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: newAcademic.main, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.heading, textAlign: align }, children: l.profile }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.body, textAlign: align }, children: c.summary }),
        c.experience.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.heading, textAlign: align }, children: l.experience }),
          c.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 9 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.itemTitle, textAlign: align }, children: e.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { style: { ...newAcademic.itemMeta, textAlign: align }, children: [
              e.company,
              " / ",
              e.duration
            ] }),
            e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { ...newAcademic.bullet, flexDirection: rtl ? "row-reverse" : "row" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { width: 10 }, children: "-" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.body, flex: 1, textAlign: align }, children: a })
            ] }, j))
          ] }, i))
        ] }) : null,
        c.projects.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.heading, textAlign: align }, children: l.projects }),
          c.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 6 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.itemTitle, textAlign: align }, children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.body, textAlign: align }, children: p.description }),
            p.impact ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.itemMeta, textAlign: align }, children: p.impact }) : null
          ] }, i))
        ] }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: newAcademic.side, children: [
        c.education.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.heading, textAlign: align }, children: l.education }),
          c.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 7 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.itemTitle, fontSize: 8.8, textAlign: align }, children: e.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.body, textAlign: align }, children: e.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.itemMeta, textAlign: align }, children: e.year })
          ] }, i))
        ] }) : null,
        c.skills.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.heading, textAlign: align }, children: l.skills }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.body, textAlign: align }, children: c.skills.join(" / ") })
        ] }) : null,
        c.certifications.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.heading, textAlign: align }, children: l.certifications }),
          c.certifications.map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...newAcademic.body, marginBottom: 4, textAlign: align }, children: cert }, cert))
        ] }) : null
      ] })
    ] })
  ] }) });
}
function GetPDFDocument({ data, template }) {
  switch (template) {
    case "executive":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutivePDF, { data });
    case "nexus":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(NexusPDF, { data });
    case "orbit":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitPDF, { data });
    case "metric":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(MetricPDF, { data });
    case "prism":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PrismDarkPDF, { data });
    case "carbon":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonPDF, { data });
    case "atlas":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AtlasPDF, { data });
    case "forge":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ForgePDF, { data });
    case "zenith":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ZenithPDF, { data });
    case "vector":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(VectorPDF, { data });
    case "new-sleek":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(NewSleekPDF, { data });
    case "new-professional":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(NewProfessionalPDF, { data });
    case "new-academic":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(NewAcademicPDF, { data });
    case "ref-torres":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AtlasPDF, { data });
    case "ref-silva":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutivePDF, { data });
    case "ref-schumacher":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ForgePDF, { data });
    case "ref-palmerston":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AtlasPDF, { data });
    case "ref-sanchez":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonPDF, { data });
    // Dedicated renderers matching live preview designs
    case "noir":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(NoirPDF, { data });
    case "apex":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AtlasPDF, { data });
    case "slate":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(SlatePDF, { data });
    case "cipher":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CipherPDF, { data });
    case "monolith":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CarbonPDF, { data });
    case "pinnacle":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PinnaclePDF, { data });
    case "avant":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(AvantPDF, { data });
    case "vanguard":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(VanguardPDF, { data });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(MinimalPDF, { data });
  }
}
async function exportResumePDF(data, template, filename) {
  const doc = /* @__PURE__ */ jsxRuntimeExports.jsx(GetPDFDocument, { data, template });
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
const { saveAs } = fileSaverPkg;
const ACCENT = "1a56db";
const DARK = "111827";
const MUTED = "6b7280";
function hr(color = "e5e7eb") {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color } },
    spacing: { before: 80, after: 80 },
    children: []
  });
}
function sectionHeading(text, accent = ACCENT) {
  return new Paragraph({
    spacing: { before: 280, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: accent } },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 20,
        color: DARK,
        characterSpacing: 60
      })
    ]
  });
}
function expBlock(title, company, duration, desc, achievements) {
  const paragraphs = [];
  paragraphs.push(
    new Paragraph({
      spacing: { before: 160, after: 30 },
      children: [
        new TextRun({ text: title, bold: true, size: 20, color: DARK }),
        new TextRun({ text: `  ·  ${company}  ·  ${duration}`, size: 18, color: MUTED })
      ]
    })
  );
  if (desc) {
    paragraphs.push(new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: desc, size: 18, color: MUTED, italics: true })] }));
  }
  for (const a of achievements) {
    paragraphs.push(
      new Paragraph({
        bullet: { level: 0 },
        spacing: { after: 20 },
        children: [new TextRun({ text: a, size: 18, color: DARK })]
      })
    );
  }
  return paragraphs;
}
function skillPills(skills) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: skills.flatMap((s, i) => [
      new TextRun({ text: s, bold: true, size: 18, color: DARK }),
      ...i < skills.length - 1 ? [new TextRun({ text: "  ·  ", size: 18, color: MUTED })] : []
    ])
  });
}
function buildMinimalDocx(data) {
  const children = [];
  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: data.name, bold: true, size: 52, color: DARK })]
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: data.title, size: 22, color: MUTED })]
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        ...data.email ? [new TextRun({ text: data.email, size: 18, color: MUTED }), new TextRun({ text: "  |  ", size: 18, color: MUTED })] : [],
        ...data.phone ? [new TextRun({ text: data.phone, size: 18, color: MUTED }), new TextRun({ text: "  |  ", size: 18, color: MUTED })] : [],
        ...data.location ? [new TextRun({ text: data.location, size: 18, color: MUTED })] : []
      ]
    }),
    hr(),
    new Paragraph({
      spacing: { before: 100, after: 100 },
      children: [new TextRun({ text: data.summary, size: 18, color: DARK, italics: true })]
    })
  );
  if (data.experience.length > 0) {
    children.push(sectionHeading("Experience"));
    for (const e of data.experience) children.push(...expBlock(e.title, e.company, e.duration, e.description, e.achievements));
  }
  if (data.skills.length > 0) {
    children.push(sectionHeading("Skills"), skillPills(data.skills));
  }
  if (data.projects.length > 0) {
    children.push(sectionHeading("Projects"));
    for (const p of data.projects) {
      children.push(
        new Paragraph({ spacing: { before: 120, after: 20 }, children: [new TextRun({ text: p.name, bold: true, size: 20, color: DARK })] }),
        new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: p.description, size: 18, color: DARK })] }),
        ...p.impact ? [new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: `Impact: ${p.impact}`, size: 17, color: MUTED, italics: true })] })] : []
      );
    }
  }
  if (data.education.length > 0) {
    children.push(sectionHeading("Education"));
    for (const e of data.education) {
      children.push(new Paragraph({
        spacing: { before: 80, after: 20 },
        children: [
          new TextRun({ text: e.degree, bold: true, size: 19, color: DARK }),
          new TextRun({ text: `  ·  ${e.institution}  ·  ${e.year}`, size: 18, color: MUTED })
        ]
      }));
    }
  }
  if (data.certifications.length > 0) {
    children.push(sectionHeading("Certifications"), skillPills(data.certifications));
  }
  return new File({
    sections: [{ properties: { page: { margin: { top: convertInchesToTwip(0.75), bottom: convertInchesToTwip(0.75), left: convertInchesToTwip(0.9), right: convertInchesToTwip(0.9) } } }, children }]
  });
}
function buildExecutiveDocx(data) {
  const sideContent = [
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: data.name, bold: true, size: 26, color: "ffffff" })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: data.title, size: 18, color: "aaaaaa", italics: true })] })
  ];
  if (data.email) sideContent.push(new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: data.email, size: 16, color: "cccccc" })] }));
  if (data.phone) sideContent.push(new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: data.phone, size: 16, color: "cccccc" })] }));
  if (data.location) sideContent.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: data.location, size: 16, color: "cccccc" })] }));
  if (data.skills.length > 0) {
    sideContent.push(new Paragraph({ spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "SKILLS", bold: true, size: 16, color: "888888", characterSpacing: 80 })] }));
    for (const s of data.skills.slice(0, 10)) sideContent.push(new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: s, size: 16, color: "eeeeee" })] }));
  }
  const mainContent = [
    new Paragraph({ spacing: { before: 60, after: 80 }, children: [new TextRun({ text: data.summary, size: 18, color: DARK, italics: true })] })
  ];
  if (data.experience.length > 0) {
    mainContent.push(sectionHeading("Experience", ACCENT));
    for (const e of data.experience) mainContent.push(...expBlock(e.title, e.company, e.duration, e.description, e.achievements));
  }
  if (data.projects.length > 0) {
    mainContent.push(sectionHeading("Projects", ACCENT));
    for (const p of data.projects) {
      mainContent.push(
        new Paragraph({ spacing: { before: 100, after: 20 }, children: [new TextRun({ text: p.name, bold: true, size: 20, color: DARK })] }),
        new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: p.description, size: 18, color: DARK })] })
      );
    }
  }
  const table = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 32, type: WidthType.PERCENTAGE },
            shading: { type: ShadingType.SOLID, color: "111111" },
            margins: { top: convertInchesToTwip(0.3), bottom: convertInchesToTwip(0.3), left: convertInchesToTwip(0.25), right: convertInchesToTwip(0.2) },
            children: sideContent
          }),
          new TableCell({
            width: { size: 68, type: WidthType.PERCENTAGE },
            margins: { top: convertInchesToTwip(0.25), bottom: convertInchesToTwip(0.25), left: convertInchesToTwip(0.3), right: convertInchesToTwip(0.25) },
            children: mainContent
          })
        ]
      })
    ]
  });
  return new File({
    sections: [{ properties: { page: { margin: { top: convertInchesToTwip(0), bottom: convertInchesToTwip(0.5), left: convertInchesToTwip(0), right: convertInchesToTwip(0) } } }, children: [table] }]
  });
}
function buildForgeDocx(data) {
  const children = [
    new Paragraph({
      spacing: { after: 20 },
      border: { bottom: { style: BorderStyle.THICK, size: 12, color: DARK } },
      children: [
        new TextRun({ text: data.name, bold: true, size: 56, color: DARK }),
        new TextRun({ text: `    ${data.title.toUpperCase()}`, size: 20, color: MUTED, characterSpacing: 80 })
      ]
    }),
    new Paragraph({
      spacing: { before: 60, after: 120 },
      alignment: AlignmentType.RIGHT,
      children: [
        ...data.location ? [new TextRun({ text: `${data.location}  `, size: 17, color: MUTED })] : [],
        ...data.email ? [new TextRun({ text: `${data.email}  `, size: 17, color: MUTED })] : [],
        ...data.phone ? [new TextRun({ text: data.phone, size: 17, color: MUTED })] : []
      ]
    }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: data.summary, size: 18, color: DARK, italics: true })] })
  ];
  if (data.experience.length > 0) {
    children.push(sectionHeading("Experience", DARK));
    for (const e of data.experience) children.push(...expBlock(e.title, e.company, e.duration, e.description, e.achievements));
  }
  if (data.skills.length > 0) {
    children.push(sectionHeading("Skills", DARK), skillPills(data.skills));
  }
  if (data.projects.length > 0) {
    children.push(sectionHeading("Projects", DARK));
    for (const p of data.projects) {
      children.push(
        new Paragraph({ spacing: { before: 100, after: 20 }, children: [new TextRun({ text: p.name, bold: true, size: 20 })] }),
        new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: p.description, size: 18, color: MUTED })] })
      );
    }
  }
  if (data.education.length > 0) {
    children.push(sectionHeading("Education", DARK));
    for (const e of data.education) children.push(new Paragraph({ spacing: { before: 80, after: 20 }, children: [new TextRun({ text: e.degree, bold: true, size: 19 }), new TextRun({ text: `  ·  ${e.institution}  ·  ${e.year}`, size: 18, color: MUTED })] }));
  }
  return new File({
    sections: [{ properties: { page: { margin: { top: convertInchesToTwip(0.75), bottom: convertInchesToTwip(0.75), left: convertInchesToTwip(0.85), right: convertInchesToTwip(0.85) } } }, children }]
  });
}
function buildZenithDocx(data) {
  const GOLD = "b8952e";
  const children = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 30 }, children: [new TextRun({ text: data.name, bold: true, size: 56, color: DARK, characterSpacing: 100 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: data.title.toUpperCase(), size: 18, color: MUTED, characterSpacing: 120 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 30 }, children: [new TextRun({ text: "——————", size: 20, color: GOLD })] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 100 },
      children: [
        ...data.location ? [new TextRun({ text: `${data.location}  `, size: 17, color: MUTED })] : [],
        ...data.email ? [new TextRun({ text: `${data.email}  `, size: 17, color: MUTED })] : [],
        ...data.phone ? [new TextRun({ text: data.phone, size: 17, color: MUTED })] : []
      ]
    }),
    new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: data.summary, size: 18, color: DARK, italics: true })] })
  ];
  if (data.experience.length > 0) {
    children.push(sectionHeading("Experience", GOLD));
    for (const e of data.experience) children.push(...expBlock(e.title, e.company, e.duration, e.description, e.achievements));
  }
  if (data.skills.length > 0) {
    children.push(sectionHeading("Skills", GOLD), skillPills(data.skills));
  }
  if (data.projects.length > 0) {
    children.push(sectionHeading("Projects", GOLD));
    for (const p of data.projects) {
      children.push(
        new Paragraph({ spacing: { before: 100, after: 20 }, children: [new TextRun({ text: p.name, bold: true, size: 20, color: DARK })] }),
        new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: p.description, size: 18, color: MUTED })] })
      );
    }
  }
  if (data.education.length > 0) {
    children.push(sectionHeading("Education", GOLD));
    for (const e of data.education) children.push(new Paragraph({ spacing: { before: 80, after: 20 }, children: [new TextRun({ text: e.degree, bold: true, size: 19, color: DARK }), new TextRun({ text: `  ·  ${e.institution}  ·  ${e.year}`, size: 18, color: MUTED })] }));
  }
  if (data.certifications.length > 0) {
    children.push(sectionHeading("Certifications", GOLD), skillPills(data.certifications));
  }
  return new File({
    sections: [{ properties: { page: { margin: { top: convertInchesToTwip(0.8), bottom: convertInchesToTwip(0.8), left: convertInchesToTwip(1), right: convertInchesToTwip(1) } } }, children }]
  });
}
const DOCX_BUILDERS = {
  minimal: buildMinimalDocx,
  avant: buildMinimalDocx,
  slate: buildMinimalDocx,
  monolith: buildMinimalDocx,
  pinnacle: buildZenithDocx,
  executive: buildExecutiveDocx,
  noir: buildExecutiveDocx,
  apex: buildExecutiveDocx,
  cipher: buildExecutiveDocx,
  vanguard: buildExecutiveDocx,
  nexus: buildForgeDocx,
  orbit: buildForgeDocx,
  metric: buildForgeDocx,
  prism: buildForgeDocx,
  carbon: buildExecutiveDocx,
  atlas: buildExecutiveDocx,
  forge: buildForgeDocx,
  zenith: buildZenithDocx,
  vector: buildForgeDocx,
  "new-sleek": buildForgeDocx,
  "new-professional": buildExecutiveDocx,
  "new-academic": buildZenithDocx,
  "ref-torres": buildExecutiveDocx,
  "ref-silva": buildExecutiveDocx,
  "ref-schumacher": buildForgeDocx,
  "ref-palmerston": buildExecutiveDocx,
  "ref-sanchez": buildExecutiveDocx
};
async function exportResumeDocx(data, template, filename) {
  const builder = DOCX_BUILDERS[template] ?? buildMinimalDocx;
  const doc = builder(data);
  const blob = await Packer.toBlob(doc);
  const name = filename.endsWith(".docx") ? filename : `${filename}.docx`;
  saveAs(blob, name);
}
export {
  ResumePreview as R,
  exportResumePDF as a,
  exportResumeDocx as e
};
