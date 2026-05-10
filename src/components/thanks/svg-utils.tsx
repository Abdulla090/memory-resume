/**
 * Tiny helpers shared by all SVG-based thank-you templates.
 */

/**
 * Greedy word-wrap that returns an array of lines for a given max character width.
 * We keep it char-based (not pixel-measured) so it's deterministic between live
 * preview and PDF output — both render with the same split points.
 */
export function wrapByChars(text: string, maxChars: number): string[] {
  const words = (text ?? "").replace(/\s+/g, " ").trim().split(" ");
  const out: string[] = [];
  let line = "";
  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w;
    if (candidate.length > maxChars && line) {
      out.push(line);
      line = w;
    } else {
      line = candidate;
    }
  }
  if (line) out.push(line);
  return out;
}

/**
 * Render multi-line text centered on (cx, y) with a given line height.
 * Produces `<tspan>` children. Works correctly in both HTML preview and
 * svg2pdf PDF output.
 */
export function MultilineText({
  lines,
  cx,
  y,
  lineHeight,
  ...rest
}: {
  lines: string[];
  cx: number;
  y: number;
  lineHeight: number;
} & React.SVGProps<SVGTextElement>) {
  return (
    <text x={cx} y={y} textAnchor="middle" {...rest}>
      {lines.map((ln, i) => (
        <tspan key={i} x={cx} dy={i === 0 ? 0 : lineHeight}>
          {ln}
        </tspan>
      ))}
    </text>
  );
}
