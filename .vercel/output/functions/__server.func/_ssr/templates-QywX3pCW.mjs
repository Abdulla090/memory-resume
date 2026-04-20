import { j as jsxRuntimeExports } from "../_libs/react.mjs";
function MinimalTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-12 text-[#111] font-sans", style: { minHeight: "1100px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "border-b border-neutral-300 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-semibold tracking-tight", children: data.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-base text-neutral-700", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-neutral-500", children: [data.location, data.email, data.phone].filter(Boolean).join(" · ") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Summary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: data.summary }) }),
    data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Experience", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-semibold", children: [
          e.title,
          " · ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal", children: e.company })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-neutral-500", children: e.duration })
      ] }),
      e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-neutral-700", children: e.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1.5 list-disc space-y-1 pl-5 text-sm", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a }, j)) })
    ] }, i)) }) }),
    data.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Projects", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: data.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: p.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-neutral-700", children: p.description }),
      p.tech.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-neutral-500", children: p.tech.join(" · ") })
    ] }, i)) }) }),
    data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Skills", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: data.skills.join(" · ") }) }),
    data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Education", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: data.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between text-sm", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500", children: title }),
    children
  ] });
}
function ExecutiveTemplate({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "bg-white text-[#111]",
      style: { minHeight: "1100px", fontFamily: "Georgia, serif" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "col-span-1 bg-neutral-900 p-8 text-neutral-100", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold leading-tight", children: data.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm italic text-neutral-300", children: data.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-1 text-xs text-neutral-300", children: [
            data.location && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.location }),
            data.email && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.email }),
            data.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: data.phone })
          ] }),
          data.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400", children: "Expertise" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-sm", children: data.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: s }, i)) })
          ] }),
          data.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400", children: "Education" }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400", children: "Certifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 text-xs", children: data.certifications.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: c }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "col-span-2 p-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700", children: "Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: data.summary })
          ] }),
          data.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700", children: "Experience" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: data.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base font-bold", children: e.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm italic text-neutral-600", children: [
                e.company,
                " · ",
                e.duration
              ] }),
              e.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-neutral-800", children: e.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-1.5 list-disc space-y-1 pl-5 text-sm", children: e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: a }, j)) })
            ] }, i)) })
          ] }),
          data.projects.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 border-b border-neutral-300 pb-1 text-xs font-bold uppercase tracking-[0.2em] text-neutral-700", children: "Selected Projects" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: data.projects.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: p.description }),
              p.impact && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs italic text-neutral-600", children: [
                "Impact: ",
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
  if (template === "executive") return /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutiveTemplate, { data });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MinimalTemplate, { data });
}
export {
  ResumePreview as R
};
