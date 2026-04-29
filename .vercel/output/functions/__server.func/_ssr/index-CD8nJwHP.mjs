import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as Sparkles, F as FileText, U as Users, T as TrendingUp, d as Star, B as Brain, e as ArrowRight, f as Target, g as Layers, D as Download, h as CircleCheckBig } from "../_libs/lucide-react.mjs";
import { m as motion, a as animate } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Counter({
  to,
  suffix = ""
}) {
  const [val, setVal] = reactExports.useState(0);
  const ref = reactExports.useRef(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.span, { onViewportEnter: () => {
    if (ref.current) return;
    ref.current = true;
    animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v))
    });
  }, children: [
    val.toLocaleString(),
    suffix
  ] });
}
function Header() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "saas-nav", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "app-frame px-4 sm:px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-16 items-center justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 cursor-pointer", id: "nav-logo", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[1rem] font-bold tracking-tight text-slate-900", children: "MemoryCV" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden md:flex items-center gap-1", children: [["Home", "/"], ["Features", "/templates"], ["Build Resume", "/onboarding"], ["Contact", "/"]].map(([label, path]) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: path, className: "px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer", id: `nav-${label.toLowerCase()}`, children: label }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", id: "nav-free-trial", className: "primary-button px-5 py-2.5 text-sm cursor-pointer", children: "Free Trial" })
  ] }) }) });
}
const LeftCardSVG = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 240 320", className: "w-full h-auto drop-shadow-xl", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "240", height: "320", rx: "16", fill: "white" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0.5", y: "0.5", width: "239", height: "319", rx: "15.5", fill: "white", stroke: "#E2E8F0" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 16C0 7.16344 7.16344 0 16 0H224C232.837 0 240 7.16344 240 16V80H0V16Z", fill: "url(#left-header-gradient)" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "left-header-gradient", x1: "0", y1: "0", x2: "240", y2: "80", gradientUnits: "userSpaceOnUse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#1E3A8A" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#3B82F6" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "48", cy: "40", r: "24", fill: "white", fillOpacity: "0.2" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "48", cy: "40", r: "20", fill: "white" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M48 34C44.6863 34 42 36.6863 42 40C42 43.3137 44.6863 46 48 46C51.3137 46 54 43.3137 54 40C54 36.6863 51.3137 34 48 34ZM38 40C38 34.4772 42.4772 30 48 30C53.5228 30 58 34.4772 58 40C58 45.5228 53.5228 50 48 50C42.4772 50 38 45.5228 38 40Z", fill: "#3B82F6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "84", y: "36", fill: "white", fontSize: "16", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Sarah Chen" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "84", y: "52", fill: "#BFDBFE", fontSize: "11", fontFamily: "system-ui, sans-serif", children: "Senior UX Designer" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "110", fill: "#64748B", fontSize: "9", fontWeight: "bold", letterSpacing: "1", fontFamily: "system-ui, sans-serif", children: "PROFESSIONAL EXPERIENCE" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "24", y: "124", width: "2", height: "24", fill: "#3B82F6" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "132", fill: "#0F172A", fontSize: "12", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Google" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "132", fill: "#64748B", fontSize: "9", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2021 – Present" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "146", fill: "#475569", fontSize: "10", fontFamily: "system-ui, sans-serif", children: "Senior Product Designer" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "24", y: "164", width: "2", height: "24", fill: "#E2E8F0" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "172", fill: "#0F172A", fontSize: "12", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Figma" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "172", fill: "#64748B", fontSize: "9", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2019 – 2021" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "34", y: "186", fill: "#475569", fontSize: "10", fontFamily: "system-ui, sans-serif", children: "UX Lead" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "224", fill: "#64748B", fontSize: "9", fontWeight: "bold", letterSpacing: "1", fontFamily: "system-ui, sans-serif", children: "CORE SKILLS" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "24", y: "234", width: "56", height: "20", rx: "10", fill: "#F0F9FF" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "52", y: "247", fill: "#0369A1", fontSize: "9", fontWeight: "600", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "UI Design" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "84", y: "234", width: "60", height: "20", rx: "10", fill: "#F0F9FF" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "114", y: "247", fill: "#0369A1", fontSize: "9", fontWeight: "600", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "Prototyping" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "148", y: "234", width: "68", height: "20", rx: "10", fill: "#F0F9FF" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "182", y: "247", fill: "#0369A1", fontSize: "9", fontWeight: "600", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "User Testing" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 286 L216 286", stroke: "#F1F5F9", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 286 L170 286", stroke: "#3B82F6", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "274", fill: "#94A3B8", fontSize: "8", fontFamily: "system-ui, sans-serif", children: "Profile Extraction Complete" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "274", fill: "#3B82F6", fontSize: "9", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "100%" })
] });
const CenterCardSVG = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 280 400", className: "w-full h-auto drop-shadow-2xl", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "280", height: "400", rx: "8", fill: "white" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0.5", y: "0.5", width: "279", height: "399", rx: "7.5", fill: "white", stroke: "#E2E8F0" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { transform: "translate(190, 10)", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "80", height: "24", rx: "12", fill: "#3B82F6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "40", y: "26", fill: "white", fontSize: "9", fontWeight: "bold", textAnchor: "middle", fontFamily: "system-ui, sans-serif", transform: "translate(0, -9)", children: "AI GENERATED" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "140", y: "56", fill: "#0F172A", fontSize: "18", fontWeight: "bold", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "ALEXANDRA SMITH" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "140", y: "68", fill: "#64748B", fontSize: "8", textAnchor: "middle", fontFamily: "system-ui, sans-serif", children: "New York, NY • alexandra@email.com • (555) 123-4567" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 80 L260 80", stroke: "#CBD5E1", strokeWidth: "1" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "96", fill: "#0F172A", fontSize: "10", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "PROFESSIONAL SUMMARY" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "110", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Results-driven Senior Engineer with 8+ years of experience in scalable web" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "120", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "architecture and cloud-native applications. Proven track record of leading" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "130", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "cross-functional teams to deliver enterprise-grade solutions." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "156", fill: "#0F172A", fontSize: "10", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "EXPERIENCE" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "172", fill: "#0F172A", fontSize: "9", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "TechCorp Industries" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "260", y: "172", fill: "#0F172A", fontSize: "8", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2020 - Present" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "182", fill: "#475569", fontSize: "8", fontStyle: "italic", fontFamily: "system-ui, sans-serif", children: "Senior Software Engineer" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "194", r: "1.5", fill: "#64748B" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "32", y: "196", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Architected microservices migrating 2M+ users with 99.99% uptime." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "206", r: "1.5", fill: "#64748B" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "32", y: "208", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Reduced AWS infrastructure costs by 30% through resource optimization." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "230", fill: "#0F172A", fontSize: "9", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Innovate Software" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "260", y: "230", fill: "#0F172A", fontSize: "8", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2016 - 2020" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "240", fill: "#475569", fontSize: "8", fontStyle: "italic", fontFamily: "system-ui, sans-serif", children: "Software Engineer" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "252", r: "1.5", fill: "#64748B" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "32", y: "254", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Developed RESTful APIs serving 50M+ requests monthly." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "26", cy: "264", r: "1.5", fill: "#64748B" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "32", y: "266", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: "Mentored 4 junior developers and established CI/CD best practices." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "296", fill: "#0F172A", fontSize: "10", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "EDUCATION" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "312", fill: "#0F172A", fontSize: "9", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "University of Technology" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "260", y: "312", fill: "#0F172A", fontSize: "8", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "2012 - 2016" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "322", fill: "#475569", fontSize: "8", fontStyle: "italic", fontFamily: "system-ui, sans-serif", children: "Bachelor of Science in Computer Science" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "20", y: "352", fill: "#0F172A", fontSize: "10", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "TECHNICAL SKILLS" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: "20", y: "368", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("tspan", { fontWeight: "bold", fill: "#0F172A", children: "Languages:" }),
    " JavaScript, TypeScript, Python, Java, Go"
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: "20", y: "380", fill: "#475569", fontSize: "7", fontFamily: "system-ui, sans-serif", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("tspan", { fontWeight: "bold", fill: "#0F172A", children: "Frameworks:" }),
    " React, Node.js, Express, Django, Next.js"
  ] })
] });
const RightCardSVG = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 240 320", className: "w-full h-auto drop-shadow-xl", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "240", height: "320", rx: "16", fill: "white" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "0.5", y: "0.5", width: "239", height: "319", rx: "15.5", fill: "white", stroke: "#E2E8F0" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 16C0 7.16344 7.16344 0 16 0H224C232.837 0 240 7.16344 240 16V100H0V16Z", fill: "url(#right-header-gradient)" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "right-header-gradient", x1: "0", y1: "0", x2: "240", y2: "100", gradientUnits: "userSpaceOnUse", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { stopColor: "#0F172A" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#1E293B" })
  ] }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "36", fill: "#94A3B8", fontSize: "10", fontWeight: "bold", letterSpacing: "1", fontFamily: "system-ui, sans-serif", children: "TARGET ROLE MATCH" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: "24", y: "76", fill: "white", fontSize: "42", fontWeight: "900", fontFamily: "system-ui, sans-serif", children: [
    "96",
    /* @__PURE__ */ jsxRuntimeExports.jsx("tspan", { fontSize: "24", fill: "#60A5FA", children: "%" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "24", y: "124", width: "24", height: "24", rx: "6", fill: "#F0FDF4" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M30 136L34 140L42 130", stroke: "#22C55E", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "56", y: "136", fill: "#0F172A", fontSize: "12", fontWeight: "bold", fontFamily: "system-ui, sans-serif", children: "Strong Match" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "56", y: "148", fill: "#64748B", fontSize: "9", fontFamily: "system-ui, sans-serif", children: "Ready to apply for Senior Dev" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "184", fill: "#64748B", fontSize: "9", fontWeight: "bold", letterSpacing: "1", fontFamily: "system-ui, sans-serif", children: "MATCH BREAKDOWN" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "206", fill: "#0F172A", fontSize: "10", fontWeight: "600", fontFamily: "system-ui, sans-serif", children: "Required Skills" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "206", fill: "#0F172A", fontSize: "10", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "100%" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 216 L216 216", stroke: "#F1F5F9", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 216 L216 216", stroke: "#22C55E", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "238", fill: "#0F172A", fontSize: "10", fontWeight: "600", fontFamily: "system-ui, sans-serif", children: "Experience Level" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "238", fill: "#0F172A", fontSize: "10", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "90%" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 248 L216 248", stroke: "#F1F5F9", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 248 L196 248", stroke: "#3B82F6", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "24", y: "270", fill: "#0F172A", fontSize: "10", fontWeight: "600", fontFamily: "system-ui, sans-serif", children: "Keywords" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: "216", y: "270", fill: "#0F172A", fontSize: "10", fontWeight: "bold", textAnchor: "end", fontFamily: "system-ui, sans-serif", children: "85%" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 280 L216 280", stroke: "#F1F5F9", strokeWidth: "6", strokeLinecap: "round" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M24 280 L180 280", stroke: "#F59E0B", strokeWidth: "6", strokeLinecap: "round" })
] });
function HeroCards() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full flex items-end justify-center -space-x-12 sm:space-x-0 sm:gap-5 transform scale-[0.8] sm:scale-100 origin-top", style: {
    height: 380
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 40,
      rotate: -4
    }, animate: {
      opacity: 1,
      y: 0,
      rotate: -4
    }, transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 70
    }, whileHover: {
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      },
      zIndex: 30
    }, className: "cursor-pointer", style: {
      width: 220,
      alignSelf: "flex-end",
      zIndex: 10
    }, id: "hero-card-profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeftCardSVG, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 80
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 55
    }, whileHover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }, className: "cursor-pointer", style: {
      width: 280,
      marginBottom: 48,
      zIndex: 20
    }, id: "hero-card-resume", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CenterCardSVG, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 40,
      rotate: 4
    }, animate: {
      opacity: 1,
      y: 0,
      rotate: 4
    }, transition: {
      delay: 0.62,
      type: "spring",
      stiffness: 70
    }, whileHover: {
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      },
      zIndex: 30
    }, className: "cursor-pointer", style: {
      width: 220,
      alignSelf: "flex-end",
      zIndex: 10
    }, id: "hero-card-match", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RightCardSVG, {}) })
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "app-frame px-4 sm:px-6 pt-6 pb-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-gradient relative overflow-hidden", style: {
    paddingBottom: 80
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-center pt-10 sm:pt-16 pb-4 px-4 sm:px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h1, { initial: {
        opacity: 0,
        y: 28
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, className: "font-bold text-white leading-[1.12] tracking-tight mx-auto text-4xl sm:text-5xl md:text-6xl", style: {
        maxWidth: 660
      }, children: [
        "Elevate Your Career",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", { className: "hidden sm:block" }),
        "Management with",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center align-middle mx-1.5 px-3 py-1 bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm rounded-full -translate-y-1 shadow-[0_0_15px_rgba(59,130,246,0.3)] mt-2 sm:mt-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 sm:w-7 sm:h-7 mr-1.5 sm:mr-2 text-blue-200" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#bfdbfe] text-3xl sm:text-4xl md:text-5xl", children: "MemoryCV" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.14,
        duration: 0.5
      }, className: "mt-5 mx-auto leading-relaxed", style: {
        color: "rgba(219,234,254,0.9)",
        fontSize: "0.97rem",
        maxWidth: 480
      }, children: "Streamline your job search with our intuitive AI platform. Designed for professionals, our solutions simplify complex processes." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.26,
        duration: 0.5
      }, className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", id: "hero-cta", className: "inline-flex items-center gap-2 rounded-full bg-white font-semibold text-sm px-8 py-3.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer", style: {
        color: "#1d4ed8"
      }, children: "Start now — It's Free" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto", style: {
      maxWidth: 720,
      height: 220,
      marginTop: 40
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCards, {}) })
  ] }) });
}
const stats = [{
  icon: Users,
  value: 2500,
  suffix: "+",
  label: "Partners & customers",
  id: "stat-partners"
}, {
  icon: TrendingUp,
  value: 2259,
  suffix: "+",
  label: "Base invest in 2024",
  id: "stat-invest"
}, {
  icon: Star,
  value: 49,
  suffix: "/5.0",
  label: "Customer review",
  id: "stat-rating"
}];
function StatsSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "app-frame px-4 sm:px-6 pb-16", style: {
    paddingTop: 120
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h2, { initial: {
        opacity: 0,
        x: -20
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.55
      }, className: "text-3xl sm:text-4xl font-bold text-slate-900 leading-tight", children: [
        "Unlock the Power of Your",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Business ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Data" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        x: 20
      }, whileInView: {
        opacity: 1,
        x: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.55
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/onboarding", id: "stats-free-trial", className: "primary-button px-6 py-3 text-sm cursor-pointer flex-shrink-0", children: "Free Trial" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { id: s.id, initial: {
      opacity: 0,
      y: 24
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.1,
      duration: 0.5
    }, whileHover: {
      y: -4,
      boxShadow: "0 12px 32px -8px rgba(37,99,235,0.18)",
      transition: {
        duration: 0.22
      }
    }, className: "stat-card cursor-pointer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon-badge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-5 h-5 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-slate-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Counter, { to: s.value, suffix: s.suffix }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-slate-500 mt-0.5", children: s.label })
      ] })
    ] }, s.id)) })
  ] });
}
function WorkflowSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-4 sm:px-6 pt-40 pb-24 bg-gradient-to-b from-blue-50/60 via-white to-[#f0f5ff] relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/4 w-[800px] h-[600px] bg-blue-100/40 rounded-full blur-[100px] opacity-70 mix-blend-multiply pointer-events-none -translate-y-1/2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 right-0 w-[600px] h-[500px] bg-sky-100/40 rounded-full blur-[100px] opacity-60 mix-blend-multiply pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.55
      }, className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl sm:text-5xl font-extrabold text-blue-950 tracking-tight leading-tight mb-4", children: [
          "The Ultimate ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700", children: "Resume Engine" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 text-lg max-w-2xl mx-auto", children: "Everything you need to turn scattered career memories into highly-targeted, ATS-beating resumes in seconds." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, className: "md:col-span-2 bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#eff6ff_100%)] rounded-3xl p-8 md:p-10 border border-blue-200 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)] hover:border-blue-300 hover:shadow-[inset_0_0_30px_rgba(37,99,235,0.1),0_8px_40px_rgba(37,99,235,0.12)] transition-all duration-700 overflow-hidden relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl -mr-20 -mt-20 opacity-0 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000 ease-out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -ml-20 -mb-20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 delay-100 ease-out" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-sm border border-blue-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-slate-900 mb-3 tracking-tight", children: "AI Memory Extraction" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 leading-relaxed max-w-md mb-8", children: "Dump your performance reviews, rough notes, or old cover letters. Our AI instantly categorizes it into a structured, queryable career database." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto relative h-32 bg-white/60 backdrop-blur-md rounded-2xl border border-blue-100 overflow-hidden p-4 group-hover:border-blue-200 group-hover:bg-white/80 transition-colors duration-700 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center h-full", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2.5 opacity-30 group-hover:opacity-100 transition-opacity duration-500", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-blue-200 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-5/6 bg-blue-200 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-4/6 bg-blue-200 rounded-full" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-blue-200 rounded-full" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5 text-blue-400 flex-shrink-0 group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-700" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-bold text-blue-700 shadow-sm translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 hover:bg-blue-100 hover:border-blue-300 cursor-default", children: "React.js" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-bold text-blue-700 shadow-sm translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 hover:bg-blue-100 hover:border-blue-300 cursor-default", children: "Product Lead" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-[10px] font-bold text-blue-700 shadow-sm translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-110 hover:bg-blue-100 hover:border-blue-300 cursor-default", children: "Q3 Metrics" })
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: 0.1
        }, className: "md:col-span-1 bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#eff6ff_100%)] rounded-3xl p-8 md:p-10 border border-blue-200 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)] hover:border-blue-300 hover:shadow-[inset_0_0_30px_rgba(37,99,235,0.1),0_8px_40px_rgba(37,99,235,0.12)] transition-all duration-700 overflow-hidden relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-white text-blue-600 shadow-sm border border-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-slate-900 mb-3 tracking-tight", children: "Role Tailoring" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 leading-relaxed mb-8", children: "Auto-align your resume to hit all the right keywords and beat the ATS." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-auto flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-700", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-32 h-32 flex items-center justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full transform -rotate-90 group-hover:rotate-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]", viewBox: "0 0 100 100", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "currentColor", strokeWidth: "8", fill: "transparent", className: "text-blue-100" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "currentColor", strokeWidth: "8", fill: "transparent", strokeDasharray: "251.2", strokeDashoffset: "251.2", className: "text-blue-500 transition-all duration-1500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:stroke-dashoffset-[10]" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-3xl font-black text-slate-900 group-hover:scale-110 transition-transform duration-500 delay-300", children: [
                  "96",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-blue-500", children: "%" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold text-blue-500 uppercase tracking-widest mt-1", children: "Match" })
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: 0.2
        }, className: "md:col-span-1 bg-[radial-gradient(ellipse_at_center,_#ffffff_0%,_#eff6ff_100%)] rounded-3xl p-8 md:p-10 border border-blue-200 shadow-[inset_0_0_20px_rgba(37,99,235,0.05)] hover:border-blue-300 hover:shadow-[inset_0_0_30px_rgba(37,99,235,0.1),0_8px_40px_rgba(37,99,235,0.12)] transition-all duration-700 overflow-hidden relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-blue-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-slate-900 mb-3 tracking-tight", children: "Smart Templates" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-slate-500 leading-relaxed mb-8", children: "Swap between premium, ATS-friendly designs without breaking formatting." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto relative h-32 flex justify-center items-end overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-0 w-3/4 h-28 bg-white border border-blue-100 rounded-t-xl p-3 transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-full group-hover:opacity-0 group-hover:scale-95 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/2 h-2 bg-blue-200 rounded-full mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-slate-100 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5/6 h-1.5 bg-slate-100 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/6 h-1.5 bg-slate-100 rounded-full" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 w-3/4 h-28 bg-white border border-blue-200 rounded-t-xl p-3 transform translate-y-full opacity-0 scale-95 transition-all duration-700 delay-75 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 shadow-[0_-8px_20px_rgba(37,99,235,0.08)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-1/3 bg-slate-50 rounded flex flex-col items-center py-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 bg-blue-200 rounded-full mb-1.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2/3 h-1 bg-slate-200 rounded-full" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-slate-100 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5/6 h-1.5 bg-slate-100 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1.5 bg-slate-100 rounded-full" })
                ] })
              ] }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          delay: 0.3
        }, className: "md:col-span-2 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 rounded-3xl p-8 md:p-10 border border-blue-400 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3),0_8px_40px_rgba(37,99,235,0.4)] transition-all duration-500 overflow-hidden relative group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-full h-full overflow-hidden opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 400 400", className: "absolute -right-20 -top-20 w-[500px] h-[500px] text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: "grid", width: "40", height: "40", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: "currentColor", strokeWidth: "1" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#grid)" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col md:flex-row gap-8 items-center h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:rotate-12 transition-transform duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold text-white mb-3 tracking-tight", children: "One-Click Export" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100 leading-relaxed", children: "Generate pixel-perfect PDFs ready for the recruiter's inbox. Manage unlimited tailored versions of your resume from a single source of truth." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-full flex flex-col gap-3", children: [{
              name: "Frontend_Engineer_Google.pdf",
              time: "Just now",
              initial: "translate-x-4",
              delay: "delay-0"
            }, {
              name: "Fullstack_Stripe_Draft.pdf",
              time: "2 hrs ago",
              initial: "translate-x-8",
              delay: "delay-75"
            }, {
              name: "UX_Designer_Apple.pdf",
              time: "Yesterday",
              initial: "translate-x-12",
              delay: "delay-150"
            }].map((file, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 flex items-center justify-between transform transition-all duration-500 ease-out group-hover:translate-x-0 ${file.initial} ${file.delay}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-blue-200" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-white", children: file.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-blue-200", children: file.time })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "w-7 h-7 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }) })
            ] }, i)) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 24
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      duration: 0.6
    }, className: "mt-16 rounded-2xl px-8 py-14 text-center relative overflow-hidden", style: {
      background: "linear-gradient(145deg,#1e40af 0%,#2563eb 55%,#3b82f6 100%)"
    }, id: "closing-cta", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-10 w-20 h-14 rounded-xl opacity-15 border border-white/20 bg-white/10 rotate-6 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-10 w-16 h-10 rounded-xl opacity-10 border border-white/15 bg-white/8 -rotate-3 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-bold text-white mb-3", children: "Build resumes with stronger signal and less waste." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-100/80 text-sm mb-8 max-w-[44ch] mx-auto", children: "Import memory, confirm your profile, generate for a role, and refine where it matters." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/onboarding", id: "closing-cta-btn", className: "inline-flex items-center gap-2 rounded-full bg-white text-blue-700 font-bold text-sm px-7 py-3.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer", children: [
          "Open the workflow ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/templates", id: "closing-templates-btn", className: "hero-outline-button px-7 py-3.5", children: "View Templates" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400", children: ["No credit card required", "Free 14-day trial", "Cancel anytime"].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-blue-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
    ] }, item)) })
  ] });
}
function Landing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-shell bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSection, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowSection, {})
    ] })
  ] });
}
export {
  Landing as component
};
