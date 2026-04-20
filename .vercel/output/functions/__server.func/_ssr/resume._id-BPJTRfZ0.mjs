import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, i as improveBullet, t as tailorToJob } from "./ai.functions-D2jzvC1D.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { p as pdf, S as StyleSheet } from "../_libs/react-pdf__renderer.mjs";
import { o as optimizeResumeForOnePage } from "./resume-utils-BBQwWAqL.mjs";
import { R as ResumePreview } from "./templates-QywX3pCW.mjs";
import { R as Route, u as useAppStore } from "./router-CGNha9sQ.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import { A as ArrowLeft, a as Sparkles, e as Target, L as LoaderCircle, D as Download, T as Trash2, P as Plus, W as WandSparkles } from "../_libs/lucide-react.mjs";
import { q as Document, P as Page, V as View, T as Text, e as Image, S as Svg, j as Circle, R as Rect, h as Polygon } from "../_libs/react-pdf__primitives.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
  itemHeader: { flexDirection: "row", justifyContent: "space-between" },
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
  side: { width: "33%", backgroundColor: "#111", color: "#fff", padding: 20 },
  main: { width: "67%", padding: 22 },
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", justifyContent: "space-between" }, children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", justifyContent: "space-between" }, children: [
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
const prism = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1a1a1a" },
  header: { marginBottom: 30, textAlign: "center" },
  name: { fontSize: 26, fontWeight: 300, letterSpacing: -1, marginBottom: 4 },
  title: { fontSize: 11, fontWeight: 700, color: "#666", marginBottom: 8 },
  sectionTitle: { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 },
  body: { fontSize: 9, lineHeight: 1.5, color: "#444" }
});
function PrismPDF({ data }) {
  const compact = optimizeResumeForOnePage(data);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Document, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Page, { size: "A4", style: prism.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: prism.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { alignItems: "center", marginBottom: 12 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Svg, { width: "24", height: "24", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Polygon, { points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2", fill: "none", stroke: "#111", strokeWidth: "1.5" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: prism.name, children: compact.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: prism.title, children: compact.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flexDirection: "row", justifyContent: "center", marginTop: 4 }, children: [compact.location, compact.email, compact.phone].filter(Boolean).map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", alignItems: "center", marginHorizontal: 6 }, children: [
        i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Svg, { width: "4", height: "4", style: { marginRight: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rect, { width: "4", height: "4", fill: "#ccc" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#888" }, children: c })
      ] }, i)) })
    ] }),
    compact.summary ? /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { marginBottom: 30, paddingHorizontal: 30, textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: prism.body, children: compact.summary }) }) : null,
    compact.experience.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 30 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", alignItems: "center", marginBottom: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Svg, { width: "8", height: "8", viewBox: "0 0 24 24", style: { marginRight: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Polygon, { points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2", fill: "none", stroke: "#111", strokeWidth: "2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: prism.sectionTitle, children: "Experience" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1, height: 1, backgroundColor: "#eee", marginLeft: 8 } })
      ] }),
      compact.experience.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 16 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", justifyContent: "space-between" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 11, fontWeight: 700 }, children: e.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, color: "#999" }, children: e.duration })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 10, color: "#555", marginBottom: 6 }, children: e.company }),
        e.achievements.map((a, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", marginBottom: 3 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Svg, { width: "4", height: "4", viewBox: "0 0 6 6", style: { marginTop: 2, marginRight: 6 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Polygon, { points: "3 0 6 3 3 6 0 3", fill: "#111" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { ...prism.body, flex: 1 }, children: a })
        ] }, j))
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1, paddingRight: 20 }, children: compact.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", alignItems: "center", marginBottom: 16 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Svg, { width: "8", height: "8", viewBox: "0 0 24 24", style: { marginRight: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Polygon, { points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2", fill: "none", stroke: "#111", strokeWidth: "2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: prism.sectionTitle, children: "Skills" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1, height: 1, backgroundColor: "#eee", marginLeft: 8 } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flexDirection: "row", flexWrap: "wrap" }, children: compact.skills.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, color: "#333", borderWidth: 1, borderColor: "#ddd", paddingHorizontal: 6, paddingVertical: 3, marginRight: 6, marginBottom: 6 }, children: s }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1, paddingLeft: 20 }, children: compact.education.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { flexDirection: "row", alignItems: "center", marginBottom: 16 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Svg, { width: "8", height: "8", viewBox: "0 0 24 24", style: { marginRight: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Polygon, { points: "12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2", fill: "none", stroke: "#111", strokeWidth: "2" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: prism.sectionTitle, children: "Education" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(View, { style: { flex: 1, height: 1, backgroundColor: "#eee", marginLeft: 8 } })
        ] }),
        compact.education.map((e, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { style: { marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 10, fontWeight: 700 }, children: e.degree }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 9, color: "#555", marginTop: 2 }, children: e.institution }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { style: { fontSize: 8, color: "#aaa", marginTop: 2 }, children: e.year })
        ] }, i))
      ] }) })
    ] })
  ] }) });
}
async function exportResumePDF(data, template, filename) {
  let doc = /* @__PURE__ */ jsxRuntimeExports.jsx(MinimalPDF, { data });
  if (template === "executive") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutivePDF, { data });
  if (template === "noir") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutivePDF, { data });
  if (template === "apex") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutivePDF, { data });
  if (template === "slate") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(MinimalPDF, { data });
  if (template === "cipher") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(ExecutivePDF, { data });
  if (template === "monolith") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(MinimalPDF, { data });
  if (template === "pinnacle") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(MinimalPDF, { data });
  if (template === "avant") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(MinimalPDF, { data });
  if (template === "vanguard") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(MinimalPDF, { data });
  if (template === "nexus") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(NexusPDF, { data });
  if (template === "orbit") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(OrbitPDF, { data });
  if (template === "metric") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(MetricPDF, { data });
  if (template === "prism") doc = /* @__PURE__ */ jsxRuntimeExports.jsx(PrismPDF, { data });
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
function ResumeEditor() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const resume = useAppStore((state) => state.resumes.find((item) => item.id === id));
  const updateResume = useAppStore((state) => state.updateResume);
  const apiKey = useAppStore((state) => state.apiKey);
  const improveFn = useServerFn(improveBullet);
  const tailorFn = useServerFn(tailorToJob);
  const [tailorOpen, setTailorOpen] = reactExports.useState(false);
  const [jobDescription, setJobDescription] = reactExports.useState("");
  const [tailoring, setTailoring] = reactExports.useState(false);
  const [exporting, setExporting] = reactExports.useState(false);
  if (!resume) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "page-shell flex min-h-[100dvh] items-center justify-center bg-background px-4 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel max-w-md rounded-[2rem] p-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "This resume draft could not be found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/dashboard"
      }), className: "primary-button mt-6 px-5 py-3 text-sm font-medium", children: "Return to dashboard" })
    ] }) });
  }
  const data = resume.data;
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
      toast.success("Bullet updated", {
        id: "improve"
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to improve bullet.", {
        id: "improve"
      });
    }
  };
  const handleTailor = async () => {
    if (jobDescription.trim().length < 20) {
      toast.error("Paste a longer job description.");
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
      toast.success("Resume tailored to job description");
      setTailorOpen(false);
      setJobDescription("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to tailor resume.");
    } finally {
      setTailoring(false);
    }
  };
  const handleExport = async () => {
    setExporting(true);
    try {
      await exportResumePDF(data, resume.template, `${data.name.replace(/\s+/g, "_")}_${resume.title.slice(0, 30).replace(/\s+/g, "_")}`);
      toast.success("PDF downloaded");
    } catch (error) {
      toast.error("PDF export failed");
      console.error(error);
    } finally {
      setExporting(false);
    }
  };
  const completionSignal = Math.min(100, Math.round((Number(Boolean(data.summary)) + Number(data.experience.length > 0) + Number(data.skills.length > 0) + Number(Boolean(data.email)) + Number(Boolean(data.phone))) / 5 * 100)) || 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-shell bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "saas-nav", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-frame px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 py-3 lg:h-16 lg:flex-row lg:items-center lg:justify-between lg:py-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "flex items-center justify-center h-8 w-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-3 h-3 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold tracking-tight text-slate-900 truncate max-w-[200px] sm:max-w-[300px]", children: resume.title })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "prism", children: "Prism" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTailorOpen(true), className: "px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "h-3.5 w-3.5" }),
          "Tailor"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleExport, disabled: exporting, className: "primary-button px-4 py-2 text-xs font-medium disabled:opacity-50 flex items-center gap-1.5", children: [
          exporting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          "Export PDF"
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "app-frame grid gap-6 px-4 pb-16 pt-3 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "grid gap-6 lg:sticky lg:top-6 lg:h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2.25rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Draft status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl font-semibold tracking-tight", children: "Edit with tighter control before export." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-6 text-muted-foreground", children: "This workspace is split between structured editing and live document preview so the output stays readable while you refine details." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Completion signal" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground", children: [
                  completionSignal,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-2 rounded-full bg-secondary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 rounded-full bg-foreground", style: {
                width: `${completionSignal}%`
              } }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SignalCard, { label: "Experience blocks", value: data.experience.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SignalCard, { label: "Skills retained", value: data.skills.length }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SignalCard, { label: "Template mode", value: resume.template })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2rem] p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "AI assist" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Use bullet actions to sharpen impact, quantify outcomes, or tighten phrasing." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Use the job-tailoring panel when the brief is specific enough to rewrite the draft meaningfully." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 xl:grid-cols-[0.95fr_1.05fr]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Name", value: data.name, onChange: (value) => updateData({
                name: value
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Title", value: data.title, onChange: (value) => updateData({
                title: value
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Email", value: data.email ?? "", onChange: (value) => updateData({
                email: value
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Phone", value: data.phone ?? "", onChange: (value) => updateData({
                phone: value
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Location", value: data.location ?? "", onChange: (value) => updateData({
                location: value
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Photo URL (optional)", value: data.photoUrl ?? "", onChange: (value) => updateData({
                photoUrl: value
              }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Summary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: data.summary, onChange: (event) => updateData({
              summary: event.target.value
            }), rows: 5, className: "field-input resize-y" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Skills", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs font-medium text-muted-foreground px-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Skill Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 text-center", title: "Level used for stars/bars (1-5)", children: "Level (1-5)" }),
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
                  }, className: "ghost-button p-2 text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
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
              }, className: "ghost-button mt-2 px-4 py-2 text-sm text-foreground self-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
                "Add Skill"
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-panel rounded-[2.25rem] p-4 sm:p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "surface-muted rounded-[1.6rem] p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "origin-top overflow-hidden rounded-[1rem] shadow-[0_24px_60px_-24px_rgba(15,23,42,0.2)] lg:scale-[0.9]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResumePreview, { data, template: resume.template }) }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Experience", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4", children: data.experience.map((experience, experienceIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-muted rounded-[1.6rem] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Role", value: experience.title, onChange: (value) => updateExperience(experienceIndex, {
              title: value
            }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Company", value: experience.company, onChange: (value) => updateExperience(experienceIndex, {
              company: value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { label: "Duration", value: experience.duration, onChange: (value) => updateExperience(experienceIndex, {
            duration: value
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 space-y-3", children: experience.achievements.map((achievement, achievementIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[1.3rem] bg-background p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: achievement, onChange: (event) => updateAchievement(experienceIndex, achievementIndex, event.target.value), rows: 3, className: "field-input min-h-[90px] resize-y border-transparent bg-transparent p-0 shadow-none focus:border-transparent focus:shadow-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["impact", "quantify", "concise"].map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleImprove(experienceIndex, achievementIndex, mode), className: "ghost-button px-3 py-2 text-xs text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
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
              }, className: "ghost-button px-3 py-2 text-xs text-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3.5 w-3.5" }),
                "Remove"
              ] })
            ] })
          ] }, `${achievementIndex}-${achievement.slice(0, 12)}`)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            const next = [...data.experience];
            next[experienceIndex] = {
              ...next[experienceIndex],
              achievements: [...next[experienceIndex].achievements, "New achievement"]
            };
            updateData({
              experience: next
            });
          }, className: "ghost-button mt-4 px-4 py-2 text-sm text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
            "Add bullet"
          ] })
        ] }, `${experience.company}-${experienceIndex}`)) }) })
      ] })
    ] }),
    tailorOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-30 flex items-center justify-center bg-[rgba(245,242,235,0.7)] p-4 backdrop-blur-md", onClick: () => setTailorOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel w-full max-w-3xl rounded-[2rem] p-6 sm:p-8", onClick: (event) => event.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: "Job tailoring" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-3xl font-semibold tracking-tight", children: "Paste the hiring brief and rewrite the draft against it." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-6 text-muted-foreground", children: "This operation updates the current resume draft, so use it when the target role is clear enough to justify a rewrite." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: jobDescription, onChange: (event) => setJobDescription(event.target.value), placeholder: "Paste the full job description here.", rows: 12, className: "field-input mt-6 resize-y" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col justify-end gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTailorOpen(false), className: "ghost-button px-5 py-3 text-sm text-foreground", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleTailor, disabled: tailoring, className: "primary-button px-6 py-3 text-sm font-medium disabled:opacity-50", children: [
          tailoring ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(WandSparkles, { className: "h-4 w-4" }),
          "Tailor resume"
        ] })
      ] })
    ] }) })
  ] });
}
function Card({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-panel rounded-[2.25rem] p-6", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value, onChange: (event) => onChange(event.target.value), className: "field-input" })
  ] });
}
function SignalCard({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "surface-muted rounded-[1.4rem] px-4 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "eyebrow", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-xl font-semibold tracking-tight capitalize", children: value })
  ] });
}
export {
  ResumeEditor as component
};
