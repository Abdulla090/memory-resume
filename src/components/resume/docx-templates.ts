import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  UnderlineType,
  convertInchesToTwip,
  ImageRun,
} from "docx";
import fileSaverPkg from "file-saver";
const { saveAs } = fileSaverPkg;
import type { ResumeData } from "@/lib/types";

const ACCENT = "1a56db"; // blue
const DARK = "111827";
const MUTED = "6b7280";
const LIGHT_BG = "f3f4f6";

// ─── shared helpers ──────────────────────────────────────────────────────────

function hr(color = "e5e7eb") {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color } },
    spacing: { before: 80, after: 80 },
    children: [],
  });
}

function sectionHeading(text: string, accent = ACCENT) {
  return new Paragraph({
    spacing: { before: 280, after: 100 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: accent } },
    children: [
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 20,
        color: DARK,
        characterSpacing: 60,
      }),
    ],
  });
}

function expBlock(title: string, company: string, duration: string, desc: string, achievements: string[]) {
  const paragraphs: Paragraph[] = [];
  paragraphs.push(
    new Paragraph({
      spacing: { before: 160, after: 30 },
      children: [
        new TextRun({ text: title, bold: true, size: 20, color: DARK }),
        new TextRun({ text: `  ·  ${company}  ·  ${duration}`, size: 18, color: MUTED }),
      ],
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
        children: [new TextRun({ text: a, size: 18, color: DARK })],
      })
    );
  }
  return paragraphs;
}

function skillPills(skills: string[]) {
  // Rendered as comma-separated bold tokens
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: skills.flatMap((s, i) => [
      new TextRun({ text: s, bold: true, size: 18, color: DARK }),
      ...(i < skills.length - 1 ? [new TextRun({ text: "  ·  ", size: 18, color: MUTED })] : []),
    ]),
  });
}

// ─── TEMPLATE: MINIMAL ───────────────────────────────────────────────────────

function buildMinimalDocx(data: ResumeData): Document {
  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      spacing: { after: 40 },
      children: [new TextRun({ text: data.name, bold: true, size: 52, color: DARK })],
    }),
    new Paragraph({
      spacing: { after: 60 },
      children: [new TextRun({ text: data.title, size: 22, color: MUTED })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      children: [
        ...(data.email ? [new TextRun({ text: data.email, size: 18, color: MUTED }), new TextRun({ text: "  |  ", size: 18, color: MUTED })] : []),
        ...(data.phone ? [new TextRun({ text: data.phone, size: 18, color: MUTED }), new TextRun({ text: "  |  ", size: 18, color: MUTED })] : []),
        ...(data.location ? [new TextRun({ text: data.location, size: 18, color: MUTED })] : []),
      ],
    }),
    hr(),
    new Paragraph({
      spacing: { before: 100, after: 100 },
      children: [new TextRun({ text: data.summary, size: 18, color: DARK, italics: true })],
    }),
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
        ...(p.impact ? [new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: `Impact: ${p.impact}`, size: 17, color: MUTED, italics: true })] })] : []),
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
          new TextRun({ text: `  ·  ${e.institution}  ·  ${e.year}`, size: 18, color: MUTED }),
        ],
      }));
    }
  }
  if (data.certifications.length > 0) {
    children.push(sectionHeading("Certifications"), skillPills(data.certifications));
  }

  return new Document({
    sections: [{ properties: { page: { margin: { top: convertInchesToTwip(0.75), bottom: convertInchesToTwip(0.75), left: convertInchesToTwip(0.9), right: convertInchesToTwip(0.9) } } }, children }],
  });
}

// ─── TEMPLATE: EXECUTIVE (dark sidebar via table) ────────────────────────────

function buildExecutiveDocx(data: ResumeData): Document {
  const sideContent: Paragraph[] = [
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: data.name, bold: true, size: 26, color: "ffffff" })] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: data.title, size: 18, color: "aaaaaa", italics: true })] }),
  ];
  if (data.email) sideContent.push(new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: data.email, size: 16, color: "cccccc" })] }));
  if (data.phone) sideContent.push(new Paragraph({ spacing: { after: 30 }, children: [new TextRun({ text: data.phone, size: 16, color: "cccccc" })] }));
  if (data.location) sideContent.push(new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: data.location, size: 16, color: "cccccc" })] }));
  if (data.skills.length > 0) {
    sideContent.push(new Paragraph({ spacing: { before: 120, after: 60 }, children: [new TextRun({ text: "SKILLS", bold: true, size: 16, color: "888888", characterSpacing: 80 })] }));
    for (const s of data.skills.slice(0, 10)) sideContent.push(new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: s, size: 16, color: "eeeeee" })] }));
  }

  const mainContent: Paragraph[] = [
    new Paragraph({ spacing: { before: 60, after: 80 }, children: [new TextRun({ text: data.summary, size: 18, color: DARK, italics: true })] }),
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
        new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: p.description, size: 18, color: DARK })] }),
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
            children: sideContent,
          }),
          new TableCell({
            width: { size: 68, type: WidthType.PERCENTAGE },
            margins: { top: convertInchesToTwip(0.25), bottom: convertInchesToTwip(0.25), left: convertInchesToTwip(0.3), right: convertInchesToTwip(0.25) },
            children: mainContent,
          }),
        ],
      }),
    ],
  });

  return new Document({
    sections: [{ properties: { page: { margin: { top: convertInchesToTwip(0), bottom: convertInchesToTwip(0.5), left: convertInchesToTwip(0), right: convertInchesToTwip(0) } } }, children: [table] }],
  });
}

// ─── TEMPLATE: FORGE (bold header rule, left bar emphasis) ──────────────────

function buildForgeDocx(data: ResumeData): Document {
  const children: Paragraph[] = [
    new Paragraph({
      spacing: { after: 20 },
      border: { bottom: { style: BorderStyle.THICK, size: 12, color: DARK } },
      children: [
        new TextRun({ text: data.name, bold: true, size: 56, color: DARK }),
        new TextRun({ text: `    ${data.title.toUpperCase()}`, size: 20, color: MUTED, characterSpacing: 80 }),
      ],
    }),
    new Paragraph({
      spacing: { before: 60, after: 120 },
      alignment: AlignmentType.RIGHT,
      children: [
        ...(data.location ? [new TextRun({ text: `${data.location}  `, size: 17, color: MUTED })] : []),
        ...(data.email ? [new TextRun({ text: `${data.email}  `, size: 17, color: MUTED })] : []),
        ...(data.phone ? [new TextRun({ text: data.phone, size: 17, color: MUTED })] : []),
      ],
    }),
    new Paragraph({ spacing: { after: 100 }, children: [new TextRun({ text: data.summary, size: 18, color: DARK, italics: true })] }),
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
        new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: p.description, size: 18, color: MUTED })] }),
      );
    }
  }
  if (data.education.length > 0) {
    children.push(sectionHeading("Education", DARK));
    for (const e of data.education) children.push(new Paragraph({ spacing: { before: 80, after: 20 }, children: [new TextRun({ text: e.degree, bold: true, size: 19 }), new TextRun({ text: `  ·  ${e.institution}  ·  ${e.year}`, size: 18, color: MUTED })] }));
  }

  return new Document({
    sections: [{ properties: { page: { margin: { top: convertInchesToTwip(0.75), bottom: convertInchesToTwip(0.75), left: convertInchesToTwip(0.85), right: convertInchesToTwip(0.85) } } }, children }],
  });
}

// ─── TEMPLATE: ZENITH (centered, gold luxury) ────────────────────────────────

function buildZenithDocx(data: ResumeData): Document {
  const GOLD = "b8952e";
  const children: Paragraph[] = [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 30 }, children: [new TextRun({ text: data.name, bold: true, size: 56, color: DARK, characterSpacing: 100 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: data.title.toUpperCase(), size: 18, color: MUTED, characterSpacing: 120 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 30 }, children: [new TextRun({ text: "——————", size: 20, color: GOLD })] }),
    new Paragraph({
      alignment: AlignmentType.CENTER, spacing: { after: 100 },
      children: [
        ...(data.location ? [new TextRun({ text: `${data.location}  `, size: 17, color: MUTED })] : []),
        ...(data.email ? [new TextRun({ text: `${data.email}  `, size: 17, color: MUTED })] : []),
        ...(data.phone ? [new TextRun({ text: data.phone, size: 17, color: MUTED })] : []),
      ],
    }),
    new Paragraph({ spacing: { after: 100 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: data.summary, size: 18, color: DARK, italics: true })] }),
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
        new Paragraph({ spacing: { after: 20 }, children: [new TextRun({ text: p.description, size: 18, color: MUTED })] }),
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

  return new Document({
    sections: [{ properties: { page: { margin: { top: convertInchesToTwip(0.8), bottom: convertInchesToTwip(0.8), left: convertInchesToTwip(1.0), right: convertInchesToTwip(1.0) } } }, children }],
  });
}

// ─── EXPORT FUNCTIONS ────────────────────────────────────────────────────────

const DOCX_BUILDERS: Record<string, (data: ResumeData) => Document> = {
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
  "ref-alvarado": buildExecutiveDocx,
  "ref-sanchez": buildExecutiveDocx,
  gallego: buildExecutiveDocx,
  leroy: buildExecutiveDocx,
  dubois: buildExecutiveDocx,
};

export async function exportResumeDocx(data: ResumeData, template: string, filename: string) {
  const builder = DOCX_BUILDERS[template] ?? buildMinimalDocx;
  const doc = builder(data);
  const blob = await Packer.toBlob(doc);
  const name = filename.endsWith(".docx") ? filename : `${filename}.docx`;
  saveAs(blob, name);
}
