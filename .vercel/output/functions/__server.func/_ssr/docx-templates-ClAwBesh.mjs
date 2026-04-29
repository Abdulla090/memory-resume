import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { p as pdf, S as StyleSheet } from "../_libs/react-pdf__renderer.mjs";
import { o as optimizeResumeForOnePage } from "./resume-utils-BBQwWAqL.mjs";
import { P as Packer, a as Paragraph, T as TextRun, B as BorderStyle, A as AlignmentType, F as File, c as convertInchesToTwip, b as Table, d as TableRow, W as WidthType, e as TableCell, S as ShadingType } from "../_libs/docx.mjs";
import { f as fileSaverPkg } from "../_libs/file-saver.mjs";
import { q as Document, P as Page, V as View, T as Text, e as Image, S as Svg, R as Rect, j as Circle, h as Polygon } from "../_libs/react-pdf__primitives.mjs";
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
  vector: buildForgeDocx
};
async function exportResumeDocx(data, template, filename) {
  const builder = DOCX_BUILDERS[template] ?? buildMinimalDocx;
  const doc = builder(data);
  const blob = await Packer.toBlob(doc);
  const name = filename.endsWith(".docx") ? filename : `${filename}.docx`;
  saveAs(blob, name);
}
export {
  GetPDFDocument as G,
  exportResumePDF as a,
  exportResumeDocx as e
};
