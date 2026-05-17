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

  // Create an off-screen container to prevent parent clipping (overflow: hidden, etc.)
  const container = document.createElement("div");
  container.style.position = "absolute";
  container.style.top = "-10000px";
  container.style.left = "-10000px";
  container.style.width = "794px";
  container.style.overflow = "visible";
  
  // Clone the preview element to modify safely
  const clone = previewElement.cloneNode(true) as HTMLElement;
  
  // Override clone styles to be 1:1 scale
  clone.style.transform = "scale(1)";
  clone.style.transformOrigin = "top left";
  clone.style.width = "794px";
  clone.style.height = "auto";
  clone.style.maxHeight = "none";
  clone.style.maxWidth = "none";
  clone.style.overflow = "visible";
  clone.style.borderRadius = "0";
  clone.style.boxShadow = "none";
  clone.style.margin = "0";

  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    // Wait a brief moment to allow the browser to layout the newly inserted node
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    const fullHeight = clone.scrollHeight;

    const canvas = await toCanvas(clone, {
      pixelRatio,
      // skipFonts prevents the CORS SecurityError from Google Fonts.
      // Fonts are already loaded in the browser so they render fine.
      skipFonts: true,
      backgroundColor: "#ffffff",
      width: 794,
      height: fullHeight,
      // Also apply style overrides to html-to-image directly just in case
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
        margin: "0",
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
  } finally {
    // Always clean up the off-screen container
    document.body.removeChild(container);
  }
}
