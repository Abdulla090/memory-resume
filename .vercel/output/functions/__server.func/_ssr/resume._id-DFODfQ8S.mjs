import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn, c as chatEditResume, i as improveBullet, t as tailorToJob } from "./ai.functions-DfTJ5cB6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { R as ResumePreview, a as exportResumePDF, e as exportResumeDocx } from "./docx-templates-CqdonCGY.mjs";
import { f as fileSaverPkg } from "../_libs/file-saver.mjs";
import { a as Route$8, u as useAppStore } from "./router-BXFogTK1.mjs";
import "./index.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react-pdf__renderer.mjs";
import "../_libs/docx.mjs";
import { A as ArrowLeft, a as Sparkles, q as PenLine, r as Target, s as LoaderCircle, D as Download, t as ChevronDown, F as FileText, u as FileType, v as Presentation, w as FileCode, x as Bot, y as Clock, R as RotateCcw, z as Send, X, J as Trash2, n as Plus, W as WandSparkles } from "../_libs/lucide-react.mjs";
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
import "./resume-utils-BBQwWAqL.mjs";
import "../_libs/react-pdf__primitives.mjs";
import "../_libs/zustand.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
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
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium leading-tight", children: "Best Quality" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-slate-400 leading-tight", children: "Matches preview exactly" })
              ] })
            ] }),
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
