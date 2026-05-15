import { forwardRef } from "react";
import { CARD_H, CARD_W } from "./types";

/**
 * Landscape A4 SVG wrapper used by every Thank-You template.
 *
 * Every template is pure SVG so it can be exported as a true vector PDF
 * via svg2pdf.js — no rasterization, infinite print quality.
 */
export const CardShell = forwardRef<
  SVGSVGElement,
  {
    children: React.ReactNode;
    background?: string;
    style?: React.CSSProperties;
  }
>(function CardShell({ children, background = "#ffffff", style }, ref) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${CARD_W} ${CARD_H}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ display: "block", unicodeBidi: "plaintext", ...style }}
    >
      <rect x={0} y={0} width={CARD_W} height={CARD_H} fill={background} />
      {children}
    </svg>
  );
});
