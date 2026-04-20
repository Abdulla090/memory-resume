import type { ResumeData } from "@/lib/types";
import fileSaverPkg from "file-saver";
const { saveAs } = fileSaverPkg;

// ─── MARKDOWN EXPORT ──────────────────────────────────────────────────────────

export function exportResumeMarkdown(data: ResumeData, filename: string) {
  const lines: string[] = [];

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

// ─── PPTX EXPORT ─────────────────────────────────────────────────────────────

export async function exportResumePptx(data: ResumeData, filename: string) {
  // Dynamically import to avoid SSR issues
  const PptxGenJS = (await import("pptxgenjs")).default;
  const prs = new PptxGenJS();

  prs.layout = "LAYOUT_WIDE";
  prs.author = data.name;
  prs.title = `${data.name} — Resume`;

  const BLUE = "2563EB";
  const DARK = "0F172A";
  const MUTED = "64748B";
  const WHITE = "FFFFFF";
  const LIGHT_BG = "EFF6FF";

  // ── Slide 1: Title / Header ─────────────────────────────────────────────────
  const slide1 = prs.addSlide();
  slide1.background = { color: BLUE };

  slide1.addText(data.name, {
    x: 0.5, y: 1.5, w: "90%", h: 1.2,
    fontSize: 48, bold: true, color: WHITE, fontFace: "Calibri",
  });
  slide1.addText(data.title, {
    x: 0.5, y: 2.8, w: "90%", h: 0.6,
    fontSize: 22, color: "BFDBFE", fontFace: "Calibri",
  });
  const contactParts = [data.email, data.phone, data.location].filter(Boolean).join("   ·   ");
  if (contactParts) {
    slide1.addText(contactParts, {
      x: 0.5, y: 3.5, w: "90%", h: 0.4,
      fontSize: 14, color: "93C5FD", fontFace: "Calibri",
    });
  }

  // ── Slide 2: Summary ────────────────────────────────────────────────────────
  if (data.summary) {
    const slide2 = prs.addSlide();
    slide2.background = { color: "F8FAFC" };
    slide2.addText("Professional Summary", {
      x: 0.5, y: 0.3, w: "90%", h: 0.6,
      fontSize: 22, bold: true, color: BLUE, fontFace: "Calibri",
    });
    slide2.addShape("rect" as Parameters<typeof slide2.addShape>[0], {
      x: 0.5, y: 0.9, w: 12.5, h: 0.04, fill: { color: BLUE },
    });
    slide2.addText(data.summary, {
      x: 0.5, y: 1.1, w: "90%", h: 3.5,
      fontSize: 16, color: DARK, fontFace: "Calibri", valign: "top",
      wrap: true, lineSpacingMultiple: 1.5,
    });
  }

  // ── Slides 3+: Experience ───────────────────────────────────────────────────
  if (data.experience.length > 0) {
    const expSlide = prs.addSlide();
    expSlide.background = { color: WHITE };
    expSlide.addText("Experience", {
      x: 0.5, y: 0.3, w: "90%", h: 0.6,
      fontSize: 22, bold: true, color: BLUE, fontFace: "Calibri",
    });
    expSlide.addShape("rect" as Parameters<typeof expSlide.addShape>[0], {
      x: 0.5, y: 0.9, w: 12.5, h: 0.04, fill: { color: BLUE },
    });

    let yPos = 1.1;
    for (const e of data.experience.slice(0, 3)) {
      expSlide.addText(`${e.title}  ·  ${e.company}`, {
        x: 0.5, y: yPos, w: 9, h: 0.35,
        fontSize: 14, bold: true, color: DARK, fontFace: "Calibri",
      });
      expSlide.addText(e.duration, {
        x: 9.5, y: yPos, w: 3.5, h: 0.35,
        fontSize: 12, color: MUTED, align: "right", fontFace: "Calibri",
      });
      yPos += 0.38;
      for (const a of e.achievements.slice(0, 3)) {
        expSlide.addText(`• ${a}`, {
          x: 0.8, y: yPos, w: 12, h: 0.28,
          fontSize: 11, color: MUTED, fontFace: "Calibri", wrap: true,
        });
        yPos += 0.28;
      }
      yPos += 0.1;
      if (yPos > 6.5) break;
    }
  }

  // ── Slide: Skills ───────────────────────────────────────────────────────────
  if (data.skills.length > 0) {
    const skillSlide = prs.addSlide();
    skillSlide.background = { color: LIGHT_BG };
    skillSlide.addText("Skills", {
      x: 0.5, y: 0.3, w: "90%", h: 0.6,
      fontSize: 22, bold: true, color: BLUE, fontFace: "Calibri",
    });
    skillSlide.addShape("rect" as Parameters<typeof skillSlide.addShape>[0], {
      x: 0.5, y: 0.9, w: 12.5, h: 0.04, fill: { color: BLUE },
    });

    const cols = 4;
    const rows = Math.ceil(data.skills.length / cols);
    const colW = 3.0;
    const rowH = 0.5;
    data.skills.forEach((skill, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = 0.5 + col * colW;
      const y = 1.1 + row * rowH;
      skillSlide.addShape("roundRect" as Parameters<typeof skillSlide.addShape>[0], {
        x, y, w: 2.7, h: 0.38,
        fill: { color: WHITE },
        line: { color: BLUE, width: 1 },
        rectRadius: 0.05,
      });
      skillSlide.addText(skill, {
        x, y: y + 0.05, w: 2.7, h: 0.28,
        fontSize: 11, color: DARK, align: "center", fontFace: "Calibri",
      });
    });
  }

  // ── Slide: Education ────────────────────────────────────────────────────────
  if (data.education.length > 0) {
    const eduSlide = prs.addSlide();
    eduSlide.background = { color: WHITE };
    eduSlide.addText("Education", {
      x: 0.5, y: 0.3, w: "90%", h: 0.6,
      fontSize: 22, bold: true, color: BLUE, fontFace: "Calibri",
    });
    eduSlide.addShape("rect" as Parameters<typeof eduSlide.addShape>[0], {
      x: 0.5, y: 0.9, w: 12.5, h: 0.04, fill: { color: BLUE },
    });

    let yPos = 1.2;
    for (const e of data.education) {
      eduSlide.addText(e.degree, {
        x: 0.5, y: yPos, w: 9, h: 0.35,
        fontSize: 14, bold: true, color: DARK, fontFace: "Calibri",
      });
      eduSlide.addText(e.year, {
        x: 9.5, y: yPos, w: 3.5, h: 0.35,
        fontSize: 12, color: MUTED, align: "right", fontFace: "Calibri",
      });
      yPos += 0.38;
      eduSlide.addText(e.institution, {
        x: 0.5, y: yPos, w: 12, h: 0.28,
        fontSize: 12, color: MUTED, fontFace: "Calibri",
      });
      yPos += 0.45;
    }
  }

  const name = filename.endsWith(".pptx") ? filename : `${filename}.pptx`;
  prs.writeFile({ fileName: name });
}
