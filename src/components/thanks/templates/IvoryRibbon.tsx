import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Ivory Ribbon.
 * Ivory stationery with a soft satin ribbon draped across the top
 * carrying the occasion, and a wax seal at the bottom.
 */
export function IvoryRibbon({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 74);
  const ink = "#2d2a24";
  const wine = "#7a2a3d";
  const deepWine = "#4c1827";
  const gold = "#caa74a";

  return (
    <CardShell ref={svgRef} background="#fbf6ea">
      {/* Hairline inner rectangle */}
      <rect
        x={60}
        y={60}
        width={CARD_W - 120}
        height={CARD_H - 120}
        fill="none"
        stroke={ink}
        strokeOpacity={0.14}
      />

      {/* Ribbon across top */}
      <g>
        <path
          d={`M 40 120 L ${CARD_W - 40} 120 L ${CARD_W - 60} 156 L ${CARD_W - 40} 192 L 40 192 L 60 156 Z`}
          fill={wine}
        />
        <path
          d={`M 40 120 L ${CARD_W - 40} 120 L ${CARD_W - 40} 128 L 40 128 Z`}
          fill={gold}
          opacity={0.9}
        />
        <path
          d={`M 40 184 L ${CARD_W - 40} 184 L ${CARD_W - 40} 192 L 40 192 Z`}
          fill={gold}
          opacity={0.9}
        />
        {/* Ribbon tails */}
        <path d="M 40 120 L 4 150 L 4 200 L 40 180 Z" fill={deepWine} />
        <path
          d={`M ${CARD_W - 40} 120 L ${CARD_W - 4} 150 L ${CARD_W - 4} 200 L ${CARD_W - 40} 180 Z`}
          fill={deepWine}
        />
        {/* Occasion text on ribbon */}
        <text
          x={cx}
          y={162}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
          letterSpacing={10}
          fontWeight={700}
          style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
        >
          {data.occasion.toUpperCase()}
        </text>
      </g>

      {/* Headline */}
      <text
        x={cx}
        y={380}
        textAnchor="middle"
        fill={ink}
        fontSize={150}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-2.5px",
        }}
      >
        {data.headline}
      </text>

      {/* Divider */}
      <g transform={`translate(${cx} 420)`}>
        <line x1={-60} y1={0} x2={-10} y2={0} stroke={gold} strokeWidth={1} />
        <circle cx={0} cy={0} r={3} fill={gold} />
        <line x1={10} y1={0} x2={60} y2={0} stroke={gold} strokeWidth={1} />
      </g>

      {/* Recipient */}
      <text
        x={cx}
        y={460}
        textAnchor="middle"
        fill={wine}
        fontSize={20}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      <MultilineText
        lines={messageLines}
        cx={cx}
        y={500}
        lineHeight={22}
        fill="#4a4238"
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Wax seal bottom center */}
      <g transform={`translate(${cx} ${CARD_H - 130})`}>
        <circle cx={0} cy={0} r={40} fill={wine} />
        <circle cx={0} cy={0} r={34} fill="none" stroke={gold} strokeWidth={1} />
        <text
          x={0}
          y={6}
          textAnchor="middle"
          fill={gold}
          fontSize={30}
          fontStyle="italic"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {data.monogram || "✦"}
        </text>
        {/* Wax drip */}
        <path d="M -16 32 Q -18 46 -12 54 Q -6 46 -6 32 Z" fill={wine} opacity={0.85} />
        <path d="M 16 32 Q 18 46 12 54 Q 6 46 6 32 Z" fill={wine} opacity={0.85} />
      </g>

      {/* Signature */}
      <text
        x={cx}
        y={CARD_H - 60}
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
