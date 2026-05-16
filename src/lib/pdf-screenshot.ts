/**
 * Screenshot-based PDF export using html-to-image + jsPDF.
 *
 * KEY POINTS:
 * - `skipFonts: true` avoids CORS SecurityError from Google Fonts stylesheets
 *   (fonts are already loaded in the browser, so they still render correctly)
 * - The `style` override on toCanvas resets transform:scale() and overflow:hidden
 *   so html-to-image captures the full document at 1:1 scale
 * - pixelRatio=2 → standard retina quality, pixelRatio=3 → print quality
 */
export async function exportPreviewAsPDF(
  previewElement: HTMLElement,
  filename: string,
  pixelRatio = 2,
): Promise<void> {
  const [{ toCanvas }, { default: jsPDF }] = await Promise.all([
    import("html-to-image"),
    import("jspdf"),
  ]);

  const fullHeight = previewElement.scrollHeight;

  const canvas = await toCanvas(previewElement, {
    pixelRatio,
    // skipFonts prevents the CORS SecurityError from Google Fonts.
    // Fonts are already loaded in the browser so they render fine.
    skipFonts: true,
    backgroundColor: "#ffffff",
    width: 794,
    height: fullHeight,
    // Override the element's CSS so html-to-image captures at 1:1 scale,
    // undoing the transform:scale(zoom) and overflow:hidden from the live preview.
    style: {
      transform: "scale(1)",
      transformOrigin: "top left",
      width: "794px",
      height: `${fullHeight}px`,
      maxHeight: "none",
      maxWidth: "none",
      overflow: "visible",
      borderRadius: "0",
      boxShadow: "none",
    },
  });

  // ── Slice canvas into A4 pages ────────────────────────────────────────────
  const A4_W_MM = 210;
  const A4_H_MM = 297;

  const canvasW = canvas.width;
  const canvasH = canvas.height;
  const mmPerPx = A4_W_MM / canvasW;
  const totalHeightMm = canvasH * mmPerPx;
  const numPages = Math.ceil(totalHeightMm / A4_H_MM);

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  for (let page = 0; page < numPages; page++) {
    if (page > 0) pdf.addPage();

    const srcYPx = (page * A4_H_MM) / mmPerPx;
    const srcHPx = Math.min(A4_H_MM / mmPerPx, canvasH - srcYPx);

    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvasW;
    pageCanvas.height = Math.ceil(srcHPx);

    const ctx = pageCanvas.getContext("2d")!;
    ctx.drawImage(canvas, 0, -srcYPx);

    const quality = pixelRatio >= 3 ? 0.99 : 0.97;
    const pageImg = pageCanvas.toDataURL("image/jpeg", quality);
    pdf.addImage(pageImg, "JPEG", 0, 0, A4_W_MM, srcHPx * mmPerPx);
  }

  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}
