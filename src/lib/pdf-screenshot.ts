/**
 * Screenshot-based PDF export using html-to-image + jsPDF.
 *
 * WHY html-to-image instead of html2canvas:
 *   html-to-image uses the browser's native SVG foreignObject rendering —
 *   the browser resolves all colors (including oklch from Tailwind v4),
 *   so we get pixel-perfect output without any color-parsing issues.
 */

export async function exportPreviewAsPDF(
  previewElement: HTMLElement,
  filename: string,
): Promise<void> {
  const [{ toCanvas }, { default: jsPDF }] = await Promise.all([
    import("html-to-image"),
    import("jspdf"),
  ]);

  // Snapshot original styles in one read pass
  const originalCssText = previewElement.style.cssText;

  // Force desktop A4 width for the screenshot so mobile captures aren't squashed
  previewElement.style.cssText +=
    ";width:794px;max-width:none;transform:none;zoom:1";

  const fullHeight = previewElement.scrollHeight;

  // Batch all remaining overrides in one write
  previewElement.style.cssText +=
    `;height:${fullHeight}px;max-height:none;overflow:visible`;

  let canvas: HTMLCanvasElement;
  try {
    canvas = await toCanvas(previewElement, {
      pixelRatio: 2,           // 2× for retina-quality sharpness
      backgroundColor: undefined,   // preserve dark/custom template backgrounds
      width: 794,
      height: fullHeight,
    });
  } finally {
    // Restore everything in one write
    previewElement.style.cssText = originalCssText;
  }
  // ── PDF generation ────────────────────────────────────────────────────────

  const A4_W = 210;  // mm
  const A4_H = 297;  // mm

  const canvasW = canvas.width;
  const canvasH = canvas.height;
  const mmPerPx = A4_W / canvasW;
  const totalHeightMm = canvasH * mmPerPx;
  const numPages = Math.ceil(totalHeightMm / A4_H);

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  for (let page = 0; page < numPages; page++) {
    if (page > 0) pdf.addPage();

    const srcYPx = (page * A4_H) / mmPerPx;
    const srcHPx = Math.min(A4_H / mmPerPx, canvasH - srcYPx);

    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvasW;
    pageCanvas.height = Math.ceil(srcHPx);

    const ctx = pageCanvas.getContext("2d")!;
    ctx.drawImage(canvas, 0, -srcYPx);

    const pageImg = pageCanvas.toDataURL("image/jpeg", 0.97);
    pdf.addImage(pageImg, "JPEG", 0, 0, A4_W, srcHPx * mmPerPx);
  }

  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}
