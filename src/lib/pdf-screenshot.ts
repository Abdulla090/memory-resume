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

  const fullHeight = previewElement.scrollHeight;
  // html-to-image allows us to pass a style object that it applies to the clone,
  // preventing layout thrashing and correctly capturing it at 1x scale!
  const canvas = await toCanvas(previewElement, {
    pixelRatio: 2,           // 2× for retina-quality sharpness
    backgroundColor: undefined,
    width: 794,
    height: fullHeight,
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
      width: "794px",
      height: `${fullHeight}px`,
      maxHeight: "none",
      maxWidth: "none",
    }
  });
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
