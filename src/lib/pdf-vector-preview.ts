/**
 * True-vector PDF export from the live HTML resume preview.
 *
 * Pipeline: DOM → SVG (dom-to-svg, real text paths) → PDF (svg2pdf.js).
 * Works for every template that renders in the editor preview.
 */

import { elementToSVG, inlineResources } from "dom-to-svg";
import {
  createResumePageSlice,
  preparePreviewExportClone,
  repairSvgTextForExport,
  RESUME_PAGE_HEIGHT_PX,
  sanitizeExportClone,
} from "@/lib/pdf-export-clone";

const A4_W_MM = 210;
const A4_H_MM = 297;

async function layoutExportClone(clone: HTMLElement): Promise<number> {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
  return Math.max(clone.scrollHeight, RESUME_PAGE_HEIGHT_PX);
}

export async function exportPreviewAsVectorPDF(
  previewElement: HTMLElement,
  filename: string,
): Promise<void> {
  const [{ default: jsPDF }, { svg2pdf }] = await Promise.all([
    import("jspdf"),
    import("svg2pdf.js"),
  ]);

  const { container, clone } = preparePreviewExportClone(previewElement);
  document.body.appendChild(container);

  try {
    await sanitizeExportClone(clone);
    const fullHeight = await layoutExportClone(clone);
    const numPages = Math.ceil(fullHeight / RESUME_PAGE_HEIGHT_PX);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    for (let page = 0; page < numPages; page++) {
      const sliceTop = page * RESUME_PAGE_HEIGHT_PX;
      const sliceHeight = Math.min(RESUME_PAGE_HEIGHT_PX, fullHeight - sliceTop);
      const pageHost = createResumePageSlice(clone, sliceTop, sliceHeight);
      container.appendChild(pageHost);

      try {
        const svgDocument = elementToSVG(pageHost, { keepLinks: false });
        const svgRoot = svgDocument.documentElement;

        svgRoot.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        // Keep dom-to-svg viewBox (viewport coords) — do not reset to 0 0 or content vanishes.
        svgRoot.setAttribute("width", `${A4_W_MM}mm`);
        svgRoot.setAttribute("height", `${A4_H_MM}mm`);

        repairSvgTextForExport(svgRoot);

        try {
          await inlineResources(svgRoot);
        } catch {
          // Continue without some remote assets (e.g. blocked CORS images)
        }

        repairSvgTextForExport(svgRoot);

        const host = document.createElement("div");
        host.style.cssText = "position:fixed;left:-10000px;top:0;pointer-events:none";
        const svgForPdf = svgRoot.cloneNode(true) as SVGSVGElement;
        host.appendChild(svgForPdf);
        document.body.appendChild(host);

        try {
          if (page > 0) pdf.addPage();
          await svg2pdf(svgForPdf, pdf, {
            x: 0,
            y: 0,
            width: A4_W_MM,
            height: A4_H_MM,
          });
        } finally {
          document.body.removeChild(host);
        }
      } finally {
        container.removeChild(pageHost);
      }
    }

    if (numPages === 0) {
      throw new Error("Vector export produced no pages");
    }

    pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}
