import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, c as chatEditResume, i as improveBullet, t as tailorToJob } from "./ai.functions-DfTJ5cB6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { p as pdf, S as StyleSheet } from "../_libs/react-pdf__renderer.mjs";
import { o as optimizeResumeForOnePage } from "./resume-utils-BBQwWAqL.mjs";
import { R as ResumePreview, a as exportPreviewAsPDF, e as exportResumeDocx } from "./docx-templates-CELHtCzd.mjs";
import { f as fileSaverPkg } from "../_libs/file-saver.mjs";
import { a as Route$8, u as useAppStore } from "./router-Cf-UE9tm.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/docx.mjs";
import { A as ArrowLeft, b as Sparkles, t as PenLine, u as Target, v as LoaderCircle, D as Download, c as ChevronDown, F as FileText, w as FileType, x as Presentation, y as FileCode, z as Bot, J as Clock, R as RotateCcw, N as Send, X, O as Trash2, q as Plus, W as WandSparkles } from "../_libs/lucide-react.mjs";
import { q as Document, P as Page, V as View, T as Text, e as Image, S as Svg, R as Rect, j as Circle, h as Polygon } from "../_libs/react-pdf__primitives.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
import "../_libs/react-pdf__font.mjs";
import "../_libs/is-url.mjs";
import "../_libs/fontkit.mjs";
import "../_libs/restructure.mjs";
import "fs";
import "../_libs/swc__helpers.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/unicode-properties.mjs";
import "../_libs/base64-js.mjs";
import "../_libs/unicode-trie.mjs";
import "../_libs/tiny-inflate.mjs";
import "../_libs/dfa.mjs";
import "../_libs/clone.mjs";
import "../_libs/brotli.mjs";
import "tslib";
import "../_libs/react-pdf__pdfkit.mjs";
import "zlib";
import "../_libs/js-md5.mjs";
import "buffer";
import "../_libs/noble__ciphers.mjs";
import "events";
import "../_libs/linebreak.mjs";
import "../_libs/jay-peg.mjs";
import "../_libs/png-js.mjs";
import "../_libs/react-pdf__render.mjs";
import "../_libs/react-pdf__fns.mjs";
import "../_libs/abs-svg-path.mjs";
import "../_libs/parse-svg-path.mjs";
import "../_libs/normalize-svg-path.mjs";
import "../_libs/svg-arc-to-cubic-bezier.mjs";
import "../_libs/color-string.mjs";
import "../_libs/color-name.mjs";
import "../_libs/react-pdf__layout.mjs";
import "../_libs/react-pdf__stylesheet.mjs";
import "../_libs/media-engine.mjs";
import "../_libs/hsl-to-hex.mjs";
import "../_libs/hsl-to-rgb-for-reals.mjs";
import "../_libs/postcss-value-parser.mjs";
import "../_libs/react-pdf__textkit.mjs";
import "../_libs/bidi-js.mjs";
import "../_libs/hyphen.mjs";
import "../_libs/yoga-layout.mjs";
import "../_libs/emoji-regex-xs.mjs";
import "../_libs/react-pdf__image.mjs";
import "url";
import "path";
import "../_libs/react-pdf__svg.mjs";
import "../_libs/react-pdf__reconciler.mjs";
import "../_libs/scheduler.mjs";
import "../_libs/object-assign.mjs";
import "../_libs/zustand.mjs";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
const rtlTextPattern$1 = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;
function pdfIsRTL(data) {
  return rtlTextPattern$1.test([
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
function exportResumeMarkdown(data, filename) {
  const lines = [];
  lines.push(`# ${data.name}`);
  lines.push(`**${data.title}**`);
  lines.push("");
  const contact = [data.email, data.phone, data.location].filter(Boolean).join(" · ");
  if (contact) lines.push(contact);
  lines.push("");
  if (data.summary) {
    lines.push("## Summary");
    lines.push(data.summary);
    lines.push("");
  }
  if (data.experience.length > 0) {
    lines.push("## Experience");
    for (const e of data.experience) {
      lines.push(`### ${e.title} — ${e.company}`);
      lines.push(`*${e.duration}*`);
      if (e.description) lines.push(e.description);
      for (const a of e.achievements) lines.push(`- ${a}`);
      lines.push("");
    }
  }
  if (data.projects.length > 0) {
    lines.push("## Projects");
    for (const p of data.projects) {
      lines.push(`### ${p.name}`);
      lines.push(p.description);
      if (p.tech.length > 0) lines.push(`**Tech:** ${p.tech.join(", ")}`);
      if (p.impact) lines.push(`**Impact:** ${p.impact}`);
      lines.push("");
    }
  }
  if (data.skills.length > 0) {
    lines.push("## Skills");
    lines.push(data.skills.join(" · "));
    lines.push("");
  }
  if (data.education.length > 0) {
    lines.push("## Education");
    for (const e of data.education) {
      lines.push(`- **${e.degree}** — ${e.institution} (${e.year})`);
    }
    lines.push("");
  }
  if (data.certifications.length > 0) {
    lines.push("## Certifications");
    for (const c of data.certifications) lines.push(`- ${c}`);
    lines.push("");
  }
  const md = lines.join("\n");
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const name = filename.endsWith(".md") ? filename : `${filename}.md`;
  saveAs(blob, name);
}
async function exportResumePptx(data, filename) {
  const PptxGenJS = (await import("../_libs/pptxgenjs.mjs")).default;
  const prs = new PptxGenJS();
  prs.layout = "LAYOUT_WIDE";
  prs.author = data.name;
  prs.title = `${data.name} — Resume`;
  const BLUE = "2563EB";
  const DARK = "0F172A";
  const MUTED = "64748B";
  const WHITE = "FFFFFF";
  const LIGHT_BG = "EFF6FF";
  const slide1 = prs.addSlide();
  slide1.background = { color: BLUE };
  slide1.addText(data.name, {
    x: 0.5,
    y: 1.5,
    w: "90%",
    h: 1.2,
    fontSize: 48,
    bold: true,
    color: WHITE,
    fontFace: "Calibri"
  });
  slide1.addText(data.title, {
    x: 0.5,
    y: 2.8,
    w: "90%",
    h: 0.6,
    fontSize: 22,
    color: "BFDBFE",
    fontFace: "Calibri"
  });
  const contactParts = [data.email, data.phone, data.location].filter(Boolean).join("   ·   ");
  if (contactParts) {
    slide1.addText(contactParts, {
      x: 0.5,
      y: 3.5,
      w: "90%",
      h: 0.4,
      fontSize: 14,
      color: "93C5FD",
      fontFace: "Calibri"
    });
  }
  if (data.summary) {
    const slide2 = prs.addSlide();
    slide2.background = { color: "F8FAFC" };
    slide2.addText("Professional Summary", {
      x: 0.5,
      y: 0.3,
      w: "90%",
      h: 0.6,
      fontSize: 22,
      bold: true,
      color: BLUE,
      fontFace: "Calibri"
    });
    slide2.addShape("rect", {
      x: 0.5,
      y: 0.9,
      w: 12.5,
      h: 0.04,
      fill: { color: BLUE }
    });
    slide2.addText(data.summary, {
      x: 0.5,
      y: 1.1,
      w: "90%",
      h: 3.5,
      fontSize: 16,
      color: DARK,
      fontFace: "Calibri",
      valign: "top",
      wrap: true,
      lineSpacingMultiple: 1.5
    });
  }
  if (data.experience.length > 0) {
    const expSlide = prs.addSlide();
    expSlide.background = { color: WHITE };
    expSlide.addText("Experience", {
      x: 0.5,
      y: 0.3,
      w: "90%",
      h: 0.6,
      fontSize: 22,
      bold: true,
      color: BLUE,
      fontFace: "Calibri"
    });
    expSlide.addShape("rect", {
      x: 0.5,
      y: 0.9,
      w: 12.5,
      h: 0.04,
      fill: { color: BLUE }
    });
    let yPos = 1.1;
    for (const e of data.experience.slice(0, 3)) {
      expSlide.addText(`${e.title}  ·  ${e.company}`, {
        x: 0.5,
        y: yPos,
        w: 9,
        h: 0.35,
        fontSize: 14,
        bold: true,
        color: DARK,
        fontFace: "Calibri"
      });
      expSlide.addText(e.duration, {
        x: 9.5,
        y: yPos,
        w: 3.5,
        h: 0.35,
        fontSize: 12,
        color: MUTED,
        align: "right",
        fontFace: "Calibri"
      });
      yPos += 0.38;
      for (const a of e.achievements.slice(0, 3)) {
        expSlide.addText(`• ${a}`, {
          x: 0.8,
          y: yPos,
          w: 12,
          h: 0.28,
          fontSize: 11,
          color: MUTED,
          fontFace: "Calibri",
          wrap: true
        });
        yPos += 0.28;
      }
      yPos += 0.1;
      if (yPos > 6.5) break;
    }
  }
  if (data.skills.length > 0) {
    const skillSlide = prs.addSlide();
    skillSlide.background = { color: LIGHT_BG };
    skillSlide.addText("Skills", {
      x: 0.5,
      y: 0.3,
      w: "90%",
      h: 0.6,
      fontSize: 22,
      bold: true,
      color: BLUE,
      fontFace: "Calibri"
    });
    skillSlide.addShape("rect", {
      x: 0.5,
      y: 0.9,
      w: 12.5,
      h: 0.04,
      fill: { color: BLUE }
    });
    const cols = 4;
    Math.ceil(data.skills.length / cols);
    const colW = 3;
    const rowH = 0.5;
    data.skills.forEach((skill, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = 0.5 + col * colW;
      const y = 1.1 + row * rowH;
      skillSlide.addShape("roundRect", {
        x,
        y,
        w: 2.7,
        h: 0.38,
        fill: { color: WHITE },
        line: { color: BLUE, width: 1 },
        rectRadius: 0.05
      });
      skillSlide.addText(skill, {
        x,
        y: y + 0.05,
        w: 2.7,
        h: 0.28,
        fontSize: 11,
        color: DARK,
        align: "center",
        fontFace: "Calibri"
      });
    });
  }
  if (data.education.length > 0) {
    const eduSlide = prs.addSlide();
    eduSlide.background = { color: WHITE };
    eduSlide.addText("Education", {
      x: 0.5,
      y: 0.3,
      w: "90%",
      h: 0.6,
      fontSize: 22,
      bold: true,
      color: BLUE,
      fontFace: "Calibri"
    });
    eduSlide.addShape("rect", {
      x: 0.5,
      y: 0.9,
      w: 12.5,
      h: 0.04,
      fill: { color: BLUE }
    });
    let yPos = 1.2;
    for (const e of data.education) {
      eduSlide.addText(e.degree, {
        x: 0.5,
        y: yPos,
        w: 9,
        h: 0.35,
        fontSize: 14,
        bold: true,
        color: DARK,
        fontFace: "Calibri"
      });
      eduSlide.addText(e.year, {
        x: 9.5,
        y: yPos,
        w: 3.5,
        h: 0.35,
        fontSize: 12,
        color: MUTED,
        align: "right",
        fontFace: "Calibri"
      });
      yPos += 0.38;
      eduSlide.addText(e.institution, {
        x: 0.5,
        y: yPos,
        w: 12,
        h: 0.28,
        fontSize: 12,
        color: MUTED,
        fontFace: "Calibri"
      });
      yPos += 0.45;
    }
  }
  const name = filename.endsWith(".pptx") ? filename : `${filename}.pptx`;
  prs.writeFile({ fileName: name });
}
const rtlTextPattern = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/;
function hasRTLText(data) {
  return rtlTextPattern.test([data.name, data.title, data.location, data.summary, ...data.skills, ...data.certifications, ...data.experience.flatMap((item) => [item.title, item.company, item.description, ...item.achievements]), ...data.projects.flatMap((item) => [item.name, item.description, item.impact, ...item.tech]), ...data.education.flatMap((item) => [item.degree, item.institution])].filter(Boolean).join(" "));
}
function ResumeEditor() {
  const {
    id
  } = Route$8.useParams();
  const navigate = useNavigate();
  const resume = useAppStore((state) => state.resumes.find((item) => item.id === id));
  const updateResume = useAppStore((state) => state.updateResume);
  const apiKey = useAppStore((state) => state.apiKey);
  const language = useAppStore((state) => state.language);
  const isKu = language === "ku";
  const improveFn = useServerFn(improveBullet);
  const tailorFn = useServerFn(tailorToJob);
  const chatEditFn = useServerFn(chatEditResume);
  const [tailorOpen, setTailorOpen] = reactExports.useState(false);
  const [visualEditOpen, setVisualEditOpen] = reactExports.useState(false);
  const [jobDescription, setJobDescription] = reactExports.useState("");
  const [tailoring, setTailoring] = reactExports.useState(false);
  const [exporting, setExporting] = reactExports.useState(false);
  const [exportDropdownOpen, setExportDropdownOpen] = reactExports.useState(false);
  const exportDropdownRef = reactExports.useRef(null);
  const previewRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function handleOutside(e) {
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(e.target)) {
        setExportDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);
  const [chatInput, setChatInput] = reactExports.useState("");
  const [chatLoading, setChatLoading] = reactExports.useState(false);
  const [messages, setMessages] = reactExports.useState([{
    role: "assistant",
    content: isKu ? "سڵاو! دەتوانم یارمەتیت بدەم لە دەستکاریکردنی ئەم سیڤییە. پێم بڵێ دەتەوێت چی بگۆڕیت — یان داوام لێبکە هەر بەشێک سەرلەنوێ بنووسمەوە." : "Hi! I can help you edit this resume. Tell me what you'd like to change — or ask me to rewrite any section."
  }]);
  const messagesEndRef = reactExports.useRef(null);
  const [history, setHistory] = reactExports.useState([]);
  const [showHistory, setShowHistory] = reactExports.useState(false);
  const [isRevealing, setIsRevealing] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const t = setTimeout(() => setIsRevealing(false), 1800);
    return () => clearTimeout(t);
  }, []);
  reactExports.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);
  if (!resume) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-shell flex min-h-[100dvh] items-center justify-center bg-background px-4 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel max-w-md rounded-[2rem] p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: isKu ? "ئەم ڕەشنووسی سیڤییە نەدۆزرایەوە." : "This resume draft could not be found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/onboarding"
      }), className: "primary-button mt-6 px-5 py-3 text-sm font-medium", children: isKu ? "سەرلەنوێ دەستپێبکەرەوە" : "Start over" })
    ] }) });
  }
  const data = resume.data;
  const rtlResume = hasRTLText(data);
  const updateData = (patch) => updateResume(id, {
    data: {
      ...data,
      ...patch
    }
  });
  const setTemplate = (template) => updateResume(id, {
    template
  });
  const updateExperience = (index, patch) => {
    const next = [...data.experience];
    next[index] = {
      ...next[index],
      ...patch
    };
    updateData({
      experience: next
    });
  };
  const updateAchievement = (experienceIndex, achievementIndex, value) => {
    const next = [...data.experience];
    const achievements = [...next[experienceIndex].achievements];
    achievements[achievementIndex] = value;
    next[experienceIndex] = {
      ...next[experienceIndex],
      achievements
    };
    updateData({
      experience: next
    });
  };
  const handleImprove = async (experienceIndex, achievementIndex, mode) => {
    const original = data.experience[experienceIndex].achievements[achievementIndex];
    toast.loading("Improving bullet", {
      id: "improve"
    });
    try {
      const {
        bullet
      } = await improveFn({
        data: {
          apiKey,
          bullet: original,
          jobTitle: data.title,
          mode
        }
      });
      updateAchievement(experienceIndex, achievementIndex, bullet);
      toast.success(isKu ? "خاڵەکە نوێکرایەوە" : "Bullet updated", {
        id: "improve"
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : isKu ? "باشترکردنی خاڵەکە سەرکەوتوو نەبوو." : "Failed to improve bullet.", {
        id: "improve"
      });
    }
  };
  const handleTailor = async () => {
    if (jobDescription.trim().length < 20) {
      toast.error(isKu ? "تکایە وەسفێکی درێژتری کارەکە دابنێ." : "Paste a longer job description.");
      return;
    }
    setTailoring(true);
    try {
      const {
        resume: tailored
      } = await tailorFn({
        data: {
          apiKey,
          resume: data,
          jobDescription
        }
      });
      updateData(tailored);
      toast.success(isKu ? "سیڤییەکە گونجێندرا لەگەڵ وەسفی کارەکە" : "Resume tailored to job description");
      setTailorOpen(false);
      setJobDescription("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : isKu ? "گونجاندنی سیڤییەکە سەرکەوتوو نەبوو." : "Failed to tailor resume.");
    } finally {
      setTailoring(false);
    }
  };
  const getFilename = () => `${data.name.replace(/\s+/g, "_")}_${resume.title.slice(0, 30).replace(/\s+/g, "_")}`;
  const handleExport = async (format) => {
    setExporting(true);
    setExportDropdownOpen(false);
    const filename = getFilename();
    try {
      if (rtlResume && format !== "pdf") {
        if (previewRef.current) {
          await exportPreviewAsPDF(previewRef.current, filename);
          toast.success(isKu ? "PDF پاشەکەوت کرا — ڕێک وەک پێشبینینەکە دەردەکەوێت" : "Canvas PDF saved — matches the preview");
        }
        return;
      }
      if (format === "pdf") {
        if (previewRef.current) {
          await exportPreviewAsPDF(previewRef.current, filename);
        } else {
          await exportResumePDF(data, resume.template, filename);
        }
        toast.success(isKu ? "PDF پاشەکەوت کرا — ڕێک وەک پێشبینینەکە دەردەکەوێت" : "PDF saved — looks exactly like the preview");
      } else if (format === "pdf-standard") {
        await exportResumePDF(data, resume.template, filename);
        toast.success(isKu ? "PDF پاشەکەوت کرا" : "PDF saved");
      } else if (format === "docx") {
        await exportResumeDocx(data, resume.template, filename);
        toast.success(isKu ? "بەڵگەنامەی Word پاشەکەوت کرا" : "Word document saved");
      } else if (format === "pptx") {
        await exportResumePptx(data, filename);
        toast.success(isKu ? "پێشکەشکردنەکە پاشەکەوت کرا" : "Presentation saved");
      } else if (format === "md") {
        exportResumeMarkdown(data, filename);
        toast.success(isKu ? "Markdown پاشەکەوت کرا" : "Markdown saved");
      }
    } catch (error) {
      toast.error(isKu ? `هەناردەکردن سەرکەوتوو نەبوو: ${error instanceof Error ? error.message : String(error)}` : `Export failed: ${error instanceof Error ? error.message : String(error)}`);
      console.error(error);
    } finally {
      setExporting(false);
    }
  };
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setMessages((prev) => [...prev, {
      role: "user",
      content: userMsg
    }]);
    setChatLoading(true);
    const snapshotId = crypto.randomUUID();
    const snapshot = {
      ...data,
      experience: data.experience.map((e2) => ({
        ...e2,
        achievements: [...e2.achievements]
      }))
    };
    setHistory((prev) => [{
      id: snapshotId,
      label: userMsg.slice(0, 60),
      timestamp: Date.now(),
      snapshot
    }, ...prev]);
    try {
      const {
        resume: updatedResume,
        reply
      } = await chatEditFn({
        data: {
          apiKey,
          resume: data,
          userMessage: userMsg
        }
      });
      updateData(updatedResume);
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: reply,
        snapshotId
      }]);
      toast.success(isKu ? "سیڤی نوێکرایەوە" : "Resume updated");
    } catch (error) {
      setHistory((prev) => prev.filter((h) => h.id !== snapshotId));
      toast.error(error instanceof Error ? error.message : isKu ? "نوێکردنەوەی سیڤی سەرکەوتوو نەبوو." : "Failed to update resume.");
      setMessages((prev) => [...prev, {
        role: "assistant",
        content: isKu ? "کێشەیەکم بۆ دروست بوو. تکایە دووبارە هەوڵ بدەرەوە." : "I ran into an issue. Please try again."
      }]);
    } finally {
      setChatLoading(false);
    }
  };
  const handleRevert = (snapshotId) => {
    const entry = history.find((h) => h.id === snapshotId);
    if (!entry) return;
    updateData(entry.snapshot);
    toast.success(isKu ? "گەڕێندرایەوە بۆ وەشانی پێشووتر" : "Reverted to previous version");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-shell bg-background text-foreground flex flex-col h-[100dvh] overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "saas-nav flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 py-3 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:py-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", className: "flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tracking-tight text-slate-900 truncate max-w-[200px] sm:max-w-[300px]", children: resume.title })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setVisualEditOpen(true), className: "px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5 border border-slate-200", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-3.5 w-3.5" }),
          isKu ? "دەستکاریکردنی بینراو" : "Visual Edit"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: resume.template, onChange: (e) => setTemplate(e.target.value), className: "rounded-lg border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 outline-none transition-colors hover:bg-slate-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "minimal", children: "Minimal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "executive", children: "Executive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "noir", children: "Noir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "apex", children: "Apex" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "slate", children: "Slate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cipher", children: "Cipher" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "monolith", children: "Monolith" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pinnacle", children: "Pinnacle" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "avant", children: "Avant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "vanguard", children: "Vanguard" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "nexus", children: "Nexus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "orbit", children: "Orbit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "metric", children: "Metric" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "prism", children: "Prism" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "carbon", children: "Carbon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "atlas", children: "Atlas" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "forge", children: "Forge" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "zenith", children: "Zenith" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "vector", children: "Vector" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new-sleek", children: "NEW Sleek A4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new-professional", children: "NEW Professional A4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new-academic", children: "NEW Academic A4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ref-torres", children: "NEW Torres Exact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ref-silva", children: "NEW Silva Exact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ref-schumacher", children: "NEW Schumacher Exact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ref-palmerston", children: "NEW Palmerston Exact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ref-sanchez", children: "NEW Sanchez Exact" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTailorOpen(true), className: "px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-900 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3.5 w-3.5" }),
          isKu ? "گونجاندن" : "Tailor"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", ref: exportDropdownRef, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setExportDropdownOpen((v) => !v), disabled: exporting, className: "primary-button px-4 py-2 text-xs font-medium disabled:opacity-50 flex items-center gap-1.5", children: [
            exporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
            isKu ? "هەناردەکردن" : "Export",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `h-3 w-3 transition-transform ${exportDropdownOpen ? "rotate-180" : ""}` })
          ] }),
          exportDropdownOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 top-full mt-2 w-52 bg-white border-2 border-blue-100 rounded-xl shadow-xl z-50 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pt-2.5 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-slate-400", children: "PDF" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleExport("pdf"), className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-blue-500 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium leading-tight", children: rtlResume ? "Canvas PDF" : "Best Quality" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400 leading-tight", children: rtlResume ? "Best for Kurdish RTL" : "Matches preview exactly" })
              ] })
            ] }),
            !rtlResume && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleExport("pdf-standard"), className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-slate-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium leading-tight", children: "Standard" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400 leading-tight", children: "Smaller file, vector text" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-blue-100 mx-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pt-2.5 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-slate-400", children: "Other formats" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleExport("docx"), className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileType, { className: "w-4 h-4 text-blue-500" }),
                isKu ? "بەڵگەنامەی Word" : "Word Document"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleExport("pptx"), className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Presentation, { className: "w-4 h-4 text-blue-500" }),
                isKu ? "پێشکەشکردن" : "Presentation"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleExport("md"), className: "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-900 hover:bg-blue-50 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileCode, { className: "w-4 h-4 text-blue-500" }),
                isKu ? "مارکداون" : "Markdown"
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 grid lg:grid-cols-[380px_1fr] overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "border-r-2 border-blue-200 shadow-md bg-white/50 backdrop-blur-md flex flex-col h-full relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-b border-slate-100 bg-white flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-blue-600" }),
              isKu ? "یاریدەدەری زیرەکی دەستکرد" : "AI Resume Assistant"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: isKu ? "داوابکە هەر شتێک بگۆڕێت، یان وەشانی پێشوو هەڵبژێرە لە خوارەوە." : "Ask to change anything, or pick a past version below." })
          ] }),
          history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowHistory((v) => !v), className: `flex items-center gap-1 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors ${showHistory ? "bg-blue-100 text-blue-700" : "text-slate-500 hover:bg-slate-100"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            history.length,
            " ",
            isKu ? "وەشان" : `version${history.length !== 1 ? "s" : ""}`
          ] })
        ] }),
        showHistory && history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-slate-100 bg-slate-50/80 px-3 py-2 space-y-1 max-h-44 overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 px-1", children: isKu ? "وەشانە پاشەکەوتکراوەکان" : "Saved versions" }),
          history.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-white transition-colors group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-slate-700 truncate font-medium", children: h.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-slate-400", children: new Date(h.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleRevert(h.id), className: "shrink-0 flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 rounded-md hover:bg-blue-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3" }),
              " ",
              isKu ? "گێڕانەوە" : "Restore"
            ] })
          ] }, h.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-3", style: {
          scrollbarWidth: "thin",
          scrollbarColor: "#e2e8f0 transparent"
        }, children: [
          messages.map((msg, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`, children: [
            msg.role === "assistant" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-blue-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 max-w-[85%]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-sm px-3.5 py-2.5 rounded-2xl leading-relaxed ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-sm shadow-sm shadow-blue-200" : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm"}`, children: msg.content }),
              msg.role === "assistant" && msg.snapshotId && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleRevert(msg.snapshotId), className: "self-start flex items-center gap-1 text-[10.5px] font-medium text-slate-400 hover:text-blue-600 transition-colors ml-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3 h-3" }),
                " ",
                isKu ? "گەڕانەوە لەم گۆڕانکارییە" : "Undo this change"
              ] })
            ] })
          ] }, i)),
          chatLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2.5 justify-start", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-blue-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 text-white animate-spin" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 items-center px-4 py-3 rounded-2xl rounded-tl-sm bg-white border border-slate-200 shadow-sm", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce", style: {
              animationDelay: `${i * 0.15}s`
            } }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 bg-white border-t border-slate-100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleChatSubmit, className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: chatInput, onChange: (e) => setChatInput(e.target.value), placeholder: isKu ? "پوختەی کارەکەم با بەهێزتر بێت..." : "Make my summary more executive...", disabled: chatLoading, className: "w-full bg-slate-50 border border-slate-200 rounded-full pl-4 pr-12 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 transition-all" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: !chatInput.trim() || chatLoading, className: "absolute right-1.5 top-1.5 bottom-1.5 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center disabled:bg-slate-200 disabled:text-slate-400 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-3.5 h-3.5 ml-0.5" }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "h-full w-full overflow-y-auto bg-slate-50/50 p-4 sm:p-8 flex justify-center items-start @container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center w-full max-w-[794px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: previewRef, className: "relative w-[794px] min-w-[794px] rounded-xl border-2 border-slate-200 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.25)] bg-white overflow-hidden origin-top", style: {
        zoom: "min(1, calc(100cqw / 794))"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResumePreview, { data, template: resume.template }),
        isRevealing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 pointer-events-none z-20", style: {
          background: "linear-gradient(to bottom, transparent 0%, transparent var(--reveal), white var(--reveal), white 100%)",
          animation: "resumeReveal 1.6s cubic-bezier(0.22,1,0.36,1) forwards"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                @keyframes resumeReveal {
                  from { --reveal: 0%; }
                  to   { --reveal: 100%; }
                }
                @property --reveal {
                  syntax: '<percentage>';
                  inherits: false;
                  initial-value: 0%;
                }
              ` })
      ] }) }) })
    ] }),
    visualEditOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 sm:p-6 backdrop-blur-sm overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel w-full max-w-4xl rounded-[2rem] bg-white flex flex-col max-h-full overflow-hidden shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 flex items-center justify-between border-b border-slate-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold tracking-tight", children: isKu ? "دەستکاریکردنی بینراو" : "Visual Editor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: isKu ? "گۆڕانکاری ڕاستەوخۆ بکە لە بوارەکانی سیڤییەکەت." : "Make direct edits to your resume fields." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setVisualEditOpen(false), className: "w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-6 grid gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: isKu ? "سەرەوەی سیڤی" : "Header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: isKu ? "ناو" : "Name", value: data.name, onChange: (value) => updateData({
            name: value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: isKu ? "ناونیشان/پیشە" : "Title", value: data.title, onChange: (value) => updateData({
            title: value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: isKu ? "ئیمەیڵ" : "Email", value: data.email ?? "", onChange: (value) => updateData({
            email: value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: isKu ? "تەلەفۆن" : "Phone", value: data.phone ?? "", onChange: (value) => updateData({
            phone: value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: isKu ? "شوێن" : "Location", value: data.location ?? "", onChange: (value) => updateData({
            location: value
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: isKu ? "لینکی وێنە (ئارەزوومەندانە)" : "Photo URL (optional)", value: data.photoUrl ?? "", onChange: (value) => updateData({
            photoUrl: value
          }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: isKu ? "پوختە" : "Summary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: data.summary, onChange: (event) => updateData({
          summary: event.target.value
        }), rows: 5, className: "field-input resize-y" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: isKu ? "لێهاتووییەکان" : "Skills", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs font-medium text-muted-foreground px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: isKu ? "ناوی لێهاتوویی" : "Skill Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 text-center", title: "Level used for stars/bars (1-5)", children: isKu ? "ئاست (١-٥)" : "Level (1-5)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8" })
          ] }),
          data.skills.map((skill, i) => {
            const item = data.skillItems?.[i] ?? {
              level: skill.length % 3 + 3
            };
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: skill, onChange: (e) => {
                const newSkills = [...data.skills];
                newSkills[i] = e.target.value;
                const newItems = [...data.skillItems || data.skills.map((s) => ({
                  name: s,
                  level: s.length % 3 + 3
                }))];
                newItems[i].name = e.target.value;
                updateData({
                  skills: newSkills,
                  skillItems: newItems
                });
              }, className: "field-input flex-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", min: "1", max: "5", value: item.level, onChange: (e) => {
                const newItems = [...data.skillItems || data.skills.map((s) => ({
                  name: s,
                  level: s.length % 3 + 3
                }))];
                newItems[i].level = Number(e.target.value) || 1;
                updateData({
                  skillItems: newItems
                });
              }, className: "field-input w-20 text-center px-1", title: "Skill Level (1-5)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                const newSkills = data.skills.filter((_, idx) => idx !== i);
                const newItems = (data.skillItems || data.skills.map((s) => ({
                  name: s,
                  level: s.length % 3 + 3
                }))).filter((_, idx) => idx !== i);
                updateData({
                  skills: newSkills,
                  skillItems: newItems
                });
              }, className: "ghost-button p-2 text-foreground hover:text-red-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
            ] }, i);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            updateData({
              skills: [...data.skills, "New Skill"],
              skillItems: [...data.skillItems || data.skills.map((s) => ({
                name: s,
                level: s.length % 3 + 3
              })), {
                name: "New Skill",
                level: 3
              }]
            });
          }, className: "ghost-button mt-2 px-4 py-2 text-sm text-foreground self-start border border-dashed border-slate-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            isKu ? "لێهاتوویی زیاد بکە" : "Add Skill"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: isKu ? "ئەزموون" : "Experience", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
          data.experience.map((experience, experienceIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-muted rounded-[1.6rem] p-5 border-2 border-blue-200 bg-blue-50/30", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: isKu ? "ڕۆڵ/کار" : "Role", value: experience.title, onChange: (value) => updateExperience(experienceIndex, {
                title: value
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: isKu ? "کۆمپانیا" : "Company", value: experience.company, onChange: (value) => updateExperience(experienceIndex, {
                company: value
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: isKu ? "ماوە" : "Duration", value: experience.duration, onChange: (value) => updateExperience(experienceIndex, {
              duration: value
            }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-3", children: experience.achievements.map((achievement, achievementIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.3rem] bg-white p-4 shadow-sm border-2 border-blue-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: achievement, onChange: (event) => updateAchievement(experienceIndex, achievementIndex, event.target.value), rows: 3, className: "field-input min-h-[90px] resize-y border-transparent bg-transparent p-0 shadow-none focus:border-transparent focus:shadow-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["impact", "quantify", "concise"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleImprove(experienceIndex, achievementIndex, mode), className: "ghost-button px-3 py-2 text-xs text-foreground bg-slate-50 border border-slate-200", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-blue-500" }),
                  mode
                ] }, mode)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                  const next = [...data.experience];
                  next[experienceIndex] = {
                    ...next[experienceIndex],
                    achievements: next[experienceIndex].achievements.filter((_, index) => index !== achievementIndex)
                  };
                  updateData({
                    experience: next
                  });
                }, className: "ghost-button px-3 py-2 text-xs text-red-500 hover:bg-red-50", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                  isKu ? "سڕینەوە" : "Remove"
                ] })
              ] })
            ] }, `${achievementIndex}-${achievement.slice(0, 12)}`)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              const next = [...data.experience];
              next[experienceIndex] = {
                ...next[experienceIndex],
                achievements: [...next[experienceIndex].achievements, isKu ? "خاڵێکی نوێی ئەزموون" : "New achievement"]
              };
              updateData({
                experience: next
              });
            }, className: "ghost-button mt-4 px-4 py-2 text-sm text-foreground bg-white border border-dashed border-slate-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              isKu ? "خاڵ زیاد بکە" : "Add bullet"
            ] })
          ] }, `${experience.company}-${experienceIndex}`)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            updateData({
              experience: [...data.experience, {
                title: "New Role",
                company: "Company",
                duration: "Present",
                achievements: [],
                description: ""
              }]
            });
          }, className: "w-full ghost-button py-4 text-sm text-foreground border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-[1.6rem]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-5 w-5 mb-1 mx-auto text-slate-400" }),
            isKu ? "ئەزموون زیاد بکە" : "Add Experience"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setVisualEditOpen(false), className: "primary-button px-6 py-2.5 text-sm font-medium", children: isKu ? "تەواو" : "Done" }) })
    ] }) }),
    tailorOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm", onClick: () => setTailorOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel w-full max-w-3xl rounded-[2rem] p-6 sm:p-8 shadow-2xl", onClick: (event) => event.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: isKu ? "گونجاندنی کار" : "Job tailoring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTailorOpen(false), className: "w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-3xl font-semibold tracking-tight", children: isKu ? "وەسفی کارەکە دابنێ و سیڤییەکەت بە پێی ئەوە بگۆڕە." : "Paste the hiring brief and rewrite the draft against it." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: isKu ? "ئەمە سیڤییەکە نوێ دەکاتەوە، بۆیە کاتێک بەکاری بهێنە کە ڕۆڵەکە ڕوون بێت." : "This operation updates the current resume draft, so use it when the target role is clear enough to justify a rewrite." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: jobDescription, onChange: (event) => setJobDescription(event.target.value), placeholder: isKu ? "وەسفی کارەکە لێرە دابنێ." : "Paste the full job description here.", rows: 12, className: "field-input mt-6 resize-y bg-slate-50 focus:bg-white" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col justify-end gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTailorOpen(false), className: "ghost-button px-5 py-3 text-sm text-foreground border border-slate-200", children: isKu ? "پاشگەزبوونەوە" : "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleTailor, disabled: tailoring, className: "primary-button px-6 py-3 text-sm font-medium disabled:opacity-50", children: [
          tailoring ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-4 w-4" }),
          isKu ? "گونجاندنی سیڤی" : "Tailor resume"
        ] })
      ] })
    ] }) })
  ] });
}
function Card({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[1.5rem] p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5", children })
  ] });
}
function Input({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-sm font-medium text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (event) => onChange(event.target.value), className: "field-input bg-slate-50 focus:bg-white" })
  ] });
}
export {
  ResumeEditor as component
};
