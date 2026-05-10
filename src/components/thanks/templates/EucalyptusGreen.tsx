import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";
import { Leaf, Sprig } from "../botanicals";

/**
 * Template — Eucalyptus Green.
 * Airy sage palette with overlapping eucalyptus branches framing the
 * headline. Lush, fresh, modern. Weddings, baby showers, garden parties.
 */
export function EucalyptusGreen({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 74);
  const ink = "#2a3d2e";
  const leaf = "#7ea37e";
  const leafDark = "#4c6146";
  const vein = "#2a3d2e";

  const branch = (x: number, y: number, rot: number, flip: boolean, scale = 1) => (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${scale})`}>
      <path
        d="M 0 0 Q 40 -4 80 0 Q 120 4 160 -2"
        stroke={vein}
        strokeWidth={1}
        fill="none"
        opacity={0.6}
      />
      {[...Array(10)].map((_, i) => {
        const t = (i + 1) / 11;
        const px = 160 * t;
        const py = (flip ? 1 : -1) * (8 + Math.sin(t * 2) * 4);
        return (
          <g key={i} transform={`translate(${px} ${py})`}>
            <Leaf color={leaf} vein={vein} size={28} rotation={(flip ? -1 : 1) * (40 - i * 5)} />
            <Leaf color={leafDark} vein={vein} size={20} rotation={(flip ? -1 : 1) * (-20 + i * 4)} opacity={0.7} />
          </g>
        );
      })}
    </g>
  );

  return (
    <CardShell ref={svgRef} background="#f3efe5">
      {/* Top cluster */}
      {branch(120, 120, 0, false, 1)}
      {branch(500, 90, -5, true, 1.1)}
      {branch(760, 130, 5, false, 0.95)}
      {branch(CARD_W - 200, 110, 12, true, 0.9)}

      {/* Bottom cluster */}
      {branch(80, CARD_H - 110, -8, true, 1)}
      {branch(440, CARD_H - 150, 8, false, 1.15)}
      {branch(820, CARD_H - 120, -10, true, 0.95)}

      {/* Side sprigs */}
      <Sprig x={40} y={380} length={150} rotation={90} color={leafDark} vein={vein} />
      <Sprig x={CARD_W - 40} y={380} length={150} rotation={-90} color={leafDark} vein={vein} flip />

      {/* Occasion */}
      <text
        x={cx}
        y={300}
        textAnchor="middle"
        fill={leafDark}
        fontSize={13}
        letterSpacing={10}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Headline */}
      <text
        x={cx}
        y={430}
        textAnchor="middle"
        fill={ink}
        fontSize={132}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-2px",
        }}
      >
        {data.headline}
      </text>

      {/* Divider */}
      <g transform={`translate(${cx} 470)`}>
        <line x1={-60} y1={0} x2={-10} y2={0} stroke={leafDark} strokeWidth={1} />
        <circle cx={0} cy={0} r={3} fill={leafDark} />
        <line x1={10} y1={0} x2={60} y2={0} stroke={leafDark} strokeWidth={1} />
      </g>

      {/* Recipient */}
      <text
        x={cx}
        y={510}
        textAnchor="middle"
        fill={leafDark}
        fontSize={18}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      <MultilineText
        lines={messageLines}
        cx={cx}
        y={CARD_H - 200}
        lineHeight={22}
        fill="#4c5a4d"
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      <text
        x={cx}
        y={CARD_H - 80}
        textAnchor="middle"
        fill={ink}
        fontSize={12}
        letterSpacing={6}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.sender.toUpperCase()}
        {data.date ? `  ·  ${data.date.toUpperCase()}` : ""}
      </text>
    </CardShell>
  );
}
