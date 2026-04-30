import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { o as optimizeResumeForOnePage } from "./resume-utils-BBQwWAqL.mjs";
import { P as Packer, a as Paragraph, T as TextRun, b as Table, c as TableRow, W as WidthType, d as TableCell, S as ShadingType, e as convertInchesToTwip, F as File, B as BorderStyle, A as AlignmentType } from "../_libs/docx.mjs";
import { f as fileSaverPkg } from "../_libs/file-saver.mjs";
import { Q as Phone, V as Mail, G as Globe, Y as MapPin } from "../_libs/lucide-react.mjs";
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
          (data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-600 border-b border-neutral-800 pb-2", children: label(data, "skills") }),
            data.skillItems && data.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-y-3", children: data.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-neutral-400 mb-1", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BarRating, { level: s.level })
            ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 border border-neutral-800 text-xs text-neutral-400 rounded-sm", children: s }, i)) })
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
          (data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-slate-900 mb-4 border-b-2 border-slate-100 pb-2", children: label(data, "skills") }),
            data.skillItems && data.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: data.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-700", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { level: s.level })
            ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md", children: s }, i)) })
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
        (data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-black text-slate-900 mb-4 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 bg-blue-600 rounded-sm" }),
            label(data, "skills")
          ] }),
          data.skillItems && data.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: data.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-blue-900", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BarRating, { level: s.level })
          ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded-md shadow-sm", children: s }, i)) })
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
        (data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[10px] font-bold uppercase tracking-[0.3em] rtl:tracking-normal text-neutral-400 mb-6 border-b border-neutral-200 pb-2", children: label(data, "expertise") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data.skillItems && data.skillItems.length > 0 ? data.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-neutral-700", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1.5 h-1.5 rounded-full ${star <= s.level ? "bg-neutral-800" : "bg-neutral-200"}` }, star)) })
          ] }, i)) : data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse items-center", children: [
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
        (data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-black uppercase tracking-widest rtl:tracking-normal border-b-4 border-black pb-2 mb-6", children: label(data, "metrics") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.skillItems && data.skillItems.length > 0 ? data.skillItems.map((s, i) => {
            const level = s.level * 20;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between rtl:flex-row-reverse text-[10px] font-black uppercase mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  level,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full border-2 border-black p-[1px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-black", style: { width: `${level}%` } }) })
            ] }, i);
          }) : data.skills.map((s, i) => {
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
        (data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-white mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 bg-indigo-500 rotate-45" }),
            label(data, "skills"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gray-800 ml-2" })
          ] }),
          data.skillItems && data.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: data.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider rtl:tracking-normal text-gray-300", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { level: s.level })
          ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider rtl:tracking-normal text-gray-300 border border-gray-800 px-3 py-1.5 bg-gray-900/50", children: s }, i)) })
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
        (data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold uppercase tracking-wider rtl:tracking-normal text-slate-900 mb-4 border-b border-slate-200 pb-2", children: label(data, "skills") }),
          data.skillItems && data.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: data.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-slate-900 font-medium", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BarRating, { level: s.level })
          ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-700 leading-relaxed", children: data.skills.join(" • ") })
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
        (data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-black uppercase tracking-tighter rtl:tracking-normal border-b-2 border-black pb-2 mb-6", children: label(data, "skills") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: data.skillItems && data.skillItems.length > 0 ? data.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BarRating, { level: s.level })
          ] }, i)) : data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold uppercase", children: s }, i)) })
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1.5", children: item.achievements.map((achievement, achievementIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "grid grid-cols-[14px_1fr] gap-2 text-[11px] leading-5 text-slate-700 ", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[1fr_auto] items-start gap-8 border-b border-slate-200 pb-8 ", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_260px] gap-10 pt-8 ", children: [
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
        (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.skills, children: c.skillItems && c.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: c.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-black uppercase tracking-[0.1em] rtl:tracking-normal text-slate-700", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BarRating, { level: s.level })
        ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: c.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-slate-200 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rtl:tracking-normal text-slate-700", children: skill }, skill)) }) }),
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: rtl ? "rtl" : "ltr", className: "bg-[#fbfcfd] p-8 font-sans text-slate-950", style: { minHeight: "1122px", width: "100%" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-[1058px] grid-cols-[230px_1fr] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_-45px_rgba(15,23,42,0.55)] ", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "bg-slate-950 p-7 text-white ", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PhotoBlock, { data: c, shape: "circle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-7 text-3xl font-black leading-[1] tracking-tight rtl:tracking-normal", children: c.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-[11px] font-black uppercase leading-5 tracking-[0.2em] rtl:tracking-normal text-cyan-200", children: c.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-slate-400", children: l.contact }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-[11px] font-semibold leading-5 text-slate-300", children: [c.location, c.email, c.phone].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item }, item)) })
      ] }),
      (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-[10px] font-black uppercase tracking-[0.22em] rtl:tracking-normal text-slate-400", children: l.skills }),
        c.skillItems && c.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: c.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-bold text-slate-100 mb-1", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 rtl:flex-row-reverse", children: Array.from({ length: 5 }).map((_, dot) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${dot < s.level ? "bg-white" : "bg-white/20"}` }, dot)) })
        ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: c.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-bold text-slate-100", children: skill }, skill)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-7 p-9 ", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[120px_1fr] gap-8 border-b-2 border-slate-950 pb-7 ", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_235px] gap-10 pt-7 ", children: [
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
        (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.skills, accent: "border-slate-950 text-slate-950", children: c.skillItems && c.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: c.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-slate-700", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(BarRating, { level: s.level })
        ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold leading-6 text-slate-700", children: c.skills.join(" · ") }) }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[308px_1fr] ", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "relative min-h-[954px] bg-[#f3f3f3] px-12 pb-10 pt-32 ", children: [
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
        (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]", children: l.skills }),
          c.skillItems && c.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: c.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-medium text-neutral-800", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BarRating, { level: s.level })
          ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-3 pl-5 text-[13px] font-medium text-neutral-800 rtl:pl-0 rtl:pr-5", children: c.skills.slice(0, 7).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: skill }, skill)) })
        ] }),
        c.certifications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[18px] font-black uppercase tracking-[0.2em] rtl:tracking-normal text-[#1d3f59]", children: l.certifications }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc space-y-3 pl-5 text-[13px] font-medium text-neutral-800 rtl:pl-0 rtl:pr-5", children: c.certifications.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: item }, item)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-11 pb-10 pt-7 text-neutral-800 ", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[230px_1fr] ", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "min-h-[932px] bg-[#fff0e3] px-8 py-9 ", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section$1, { title: l.contact, accent: "border-transparent text-[#1f1b18]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 text-[12px] leading-5", children: [c.phone, c.email, c.location].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item }, item)) }) }),
        c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[22px] font-normal", children: l.education }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-7", children: c.education.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[13px] leading-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium uppercase", children: item.degree }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "italic", children: item.institution }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: item.year })
          ] }, `${item.institution}-${index}`)) })
        ] }),
        (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[22px] font-normal", children: l.skills }),
          c.skillItems && c.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: c.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] font-medium", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(BarRating, { level: s.level })
          ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 text-[13px]", children: c.skills.slice(0, 8).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: skill }, skill)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-8 py-9 ", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "grid grid-cols-[230px_1fr_1fr] gap-14 ", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-[230px_1fr] gap-14 ", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-9 ", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "", children: [
        (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-5 text-[22px] font-black leading-none", children: rtl ? "لێهاتووییە سەرەکییەکان" : "Core Skills" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-10 gap-y-5", children: c.skillItems && c.skillItems.length > 0 ? c.skillItems.slice(0, 8).map((s, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-[13px] font-semibold leading-4", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[18px] bg-neutral-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-[#ff8a22] rtl:mr-auto", style: { width: `${s.level * 20}%` } }) })
          ] }, s.name)) : c.skills.slice(0, 8).map((skill, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-[13px] font-semibold leading-4", children: skill }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[18px] bg-neutral-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-[#ff8a22] rtl:mr-auto", style: { width: skillLevel(c, skill, index) } }) })
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[285px_1fr] ", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "min-h-[796px] bg-[#303b4e] px-12 py-12 text-white ", children: [
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
        (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-white/50 pb-2 text-[22px] font-black tracking-[0.12em] rtl:tracking-normal", children: l.skills }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: c.skillItems && c.skillItems.length > 0 ? c.skillItems.slice(0, 7).map((s, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-bold", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-[5px] bg-white/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-white rtl:mr-auto", style: { width: `${s.level * 20}%` } }) })
          ] }, s.name)) : c.skills.slice(0, 7).map((skill, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-bold", children: skill }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-[5px] bg-white/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-white rtl:mr-auto", style: { width: skillLevel(c, skill, index) } }) })
          ] }, skill)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b border-white/50 pb-2 text-[22px] font-black tracking-[0.12em] rtl:tracking-normal", children: rtl ? "زمان" : "Language" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-[12px] font-semibold", children: (rtl ? ["کوردی", "ئینگلیزی"] : ["English", "Kurdish"]).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item }, item)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-10 py-12 ", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[245px_1fr] ", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "min-h-[937px] bg-[#e6e6e6] px-6 pb-9 pt-[120px] ", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal", children: l.contact }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-[12px] leading-5", children: [c.phone, c.email, c.location].filter(Boolean).map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: item }, item)) })
        ] }),
        (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-9", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 border-b-2 border-[#8c939a] pb-2 text-[18px] font-black uppercase tracking-[0.15em] rtl:tracking-normal", children: l.skills }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: c.skillItems && c.skillItems.length > 0 ? c.skillItems.slice(0, 7).map((s, index) => {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex gap-1.5 rtl:flex-row-reverse", children: Array.from({ length: 5 }).map((_, dot) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${dot < s.level ? "bg-[#303b4e]" : "bg-[#b8bdc3]"}` }, dot)) })
            ] }, s.name);
          }) : c.skills.slice(0, 7).map((skill, index) => {
            const rating = skillRating(c, skill, index);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] font-semibold", children: skill }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex gap-1.5 rtl:flex-row-reverse", children: Array.from({ length: 5 }).map((_, dot) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-2 w-2 rounded-full ${dot < rating ? "bg-[#303b4e]" : "bg-[#b8bdc3]"}` }, dot)) })
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "space-y-9 px-11 py-12 ", children: [
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
function MercerTemplate({ data }) {
  const c = optimizeResumeForOnePage(data);
  const rtl = isRTL$1(c);
  const l = labels$1(rtl);
  const SectionHeader = ({ title }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-[#305178] text-white px-6 py-2 rounded-full inline-block mb-4 text-lg font-black min-w-[200px]", children: title });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: rtl ? "rtl" : "ltr", className: "bg-white font-sans text-slate-900", style: { minHeight: "1122px", width: "100%", position: "relative", overflow: "hidden" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[320px_1fr] min-h-[1122px] ", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "bg-[#305178] p-10 pt-64 text-white flex flex-col gap-10 relative z-0", children: [
      c.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold border-b border-white pb-2 mb-6 tracking-wide", children: l.education }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: c.education.map((edu, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-[14px] leading-tight", children: edu.institution }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] font-bold mt-1", children: edu.year }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] mt-1 leading-relaxed opacity-90", children: edu.degree })
        ] }, i)) })
      ] }),
      (c.skillItems?.length ? c.skillItems.length > 0 : c.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold border-b border-white pb-2 mb-6 tracking-wide", children: l.skills }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: c.skillItems && c.skillItems.length > 0 ? c.skillItems.slice(0, 8).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase w-24 truncate", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-3 bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-slate-200",
              style: { width: `${s.level * 20}%` }
            }
          ) })
        ] }, i)) : c.skills.slice(0, 8).map((skill, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-black uppercase w-24 truncate", children: skill }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-3 bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-slate-200",
              style: { width: skillLevel(c, skill, i) }
            }
          ) })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold border-b border-white pb-2 mb-6 tracking-wide", children: l.contact }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-[12px] font-bold", children: [
          c.phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { size: 10, fill: "currentColor" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.phone })
          ] }),
          c.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 10, fill: "currentColor" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: c.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { size: 10 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "www.reallygreatsite.com" })
          ] }),
          c.location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 rounded-full bg-white text-[#305178] flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 10, fill: "currentColor" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: c.location })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "p-10 pt-16 flex flex-col gap-10 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "absolute -left-[180px] top-10 w-64 h-64 rounded-full border-[12px] border-white overflow-hidden bg-slate-200 shadow-lg rtl:left-auto rtl:-right-[180px]",
          children: c.photoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.photoUrl, alt: c.name, className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-6xl font-black text-slate-400", children: initials(c.name) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-20 pt-4 rtl:ml-0 rtl:mr-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-6xl font-black text-[#305178] leading-[0.85] tracking-tighter rtl:tracking-normal uppercase w-fit", children: c.name.split(/\s+/).map((word, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: word }, idx)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[20px] font-black text-slate-950 mt-4 tracking-widest uppercase", children: c.title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: rtl ? "دەربارەی من" : "About Me" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[13px] leading-relaxed text-slate-800 font-medium px-1", children: c.summary })
        ] }),
        c.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: rtl ? "ئەزموونی کار" : "Experience Work" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 px-1", children: c.experience.map((exp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full bg-[#305178]" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-light tracking-wide uppercase text-[16px] text-slate-700", children: exp.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-black text-[13px] text-slate-900 ml-7 uppercase tracking-wider mb-2", children: [
              exp.duration,
              " - ",
              exp.company
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-slate-700 ml-7 leading-relaxed font-medium", children: [
              exp.description,
              exp.achievements.length > 0 && " " + exp.achievements.join(". ")
            ] })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SectionHeader, { title: rtl ? "سەرچاوە" : "Reference" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-10 px-1 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-[13px] text-slate-900", children: "Juliana Silva" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-slate-800 font-bold mt-0.5", children: "Rimberio / CTO" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-slate-600 mt-0.5 font-bold", children: "+123-456-7890" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-[13px] text-slate-900", children: "Donna Stroupe" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-slate-800 font-bold mt-0.5", children: "Borcelle / CEO" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-slate-600 mt-0.5 font-bold", children: "+123-456-7890" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
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
function StarRating({ level, max = 5 }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mt-0.5", children: Array.from({ length: max }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: `w-3 h-3 ${i < level ? "text-blue-500 fill-current" : "text-neutral-200 fill-current"}`, viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" }) }, i)) });
}
function BarRating({ level, max = 5 }) {
  const percentage = level / max * 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-blue-600 rounded-full", style: { width: `${percentage}%` } }) });
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
    (data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: l.skills, children: data.skillItems && data.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-y-3 gap-x-8", children: data.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-neutral-800", children: s.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { level: s.level })
    ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: data.skills.join(" · ") }) }),
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
          (data.skillItems?.length ? data.skillItems.length > 0 : data.skills.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-[10px] font-bold uppercase tracking-[0.2em] rtl:tracking-normal text-neutral-400", children: l.expertise }),
            data.skillItems && data.skillItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.skillItems.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(BarRating, { level: s.level })
            ] }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: s }, i)) })
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
    case "mercer":
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(MercerTemplate, { data });
      break;
    case "minimal":
    default:
      preview = /* @__PURE__ */ jsxRuntimeExports.jsx(MinimalTemplate, { data });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dir: rtl ? "rtl" : "ltr", className: "resume-rtl-scope h-full w-full [unicode-bidi:plaintext]", children: preview });
}
async function exportPreviewAsPDF(previewElement, filename) {
  const [{ toCanvas }, { default: jsPDF }] = await Promise.all([
    import("../_libs/html-to-image.mjs"),
    import("../_libs/jspdf.mjs").then(function(n) {
      return n.j;
    })
  ]);
  const originalHeight = previewElement.style.height;
  const originalOverflow = previewElement.style.overflow;
  const originalMaxHeight = previewElement.style.maxHeight;
  const originalWidth = previewElement.style.width;
  const originalMaxWidth = previewElement.style.maxWidth;
  const originalTransform = previewElement.style.transform;
  const originalZoom = previewElement.style.zoom;
  previewElement.style.width = "794px";
  previewElement.style.maxWidth = "none";
  previewElement.style.transform = "none";
  previewElement.style.zoom = "1";
  const fullHeight = previewElement.scrollHeight;
  previewElement.style.height = `${fullHeight}px`;
  previewElement.style.maxHeight = "none";
  previewElement.style.overflow = "visible";
  let canvas;
  try {
    canvas = await toCanvas(previewElement, {
      pixelRatio: 2,
      // 2× for retina-quality sharpness
      backgroundColor: void 0,
      // preserve dark/custom template backgrounds
      width: 794,
      height: fullHeight
    });
  } finally {
    previewElement.style.width = originalWidth;
    previewElement.style.maxWidth = originalMaxWidth;
    previewElement.style.transform = originalTransform;
    previewElement.style.zoom = originalZoom;
    previewElement.style.height = originalHeight;
    previewElement.style.maxHeight = originalMaxHeight;
    previewElement.style.overflow = originalOverflow;
  }
  const A4_W = 210;
  const A4_H = 297;
  const canvasW = canvas.width;
  const canvasH = canvas.height;
  const mmPerPx = A4_W / canvasW;
  const totalHeightMm = canvasH * mmPerPx;
  const numPages = Math.ceil(totalHeightMm / A4_H);
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  for (let page = 0; page < numPages; page++) {
    if (page > 0) pdf.addPage();
    const srcYPx = page * A4_H / mmPerPx;
    const srcHPx = Math.min(A4_H / mmPerPx, canvasH - srcYPx);
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvasW;
    pageCanvas.height = Math.ceil(srcHPx);
    const ctx = pageCanvas.getContext("2d");
    ctx.drawImage(canvas, 0, -srcYPx);
    const pageImg = pageCanvas.toDataURL("image/jpeg", 0.97);
    pdf.addImage(pageImg, "JPEG", 0, 0, A4_W, srcHPx * mmPerPx);
  }
  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
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
  exportPreviewAsPDF as a,
  exportResumeDocx as e
};
