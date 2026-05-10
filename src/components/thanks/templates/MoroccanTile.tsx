import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Moroccan Tile.
 * Zellige-inspired geometric pattern header & footer with a bold
 * centered composition. Rich terracotta + teal + gold.
 */
export function MoroccanTile({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 78);
  const ink = "#162029";
  const terra = "#b85a3a";
  const teal = "#195e67";
  const gold = "#caa34a";
  const cream = "#f6ecd4";

  // Build repeating Moroccan tile motif row
  const tileSize = 70;
  const row = Math.ceil(CARD_W / tileSize) + 2;

  return (
    <CardShell ref={svgRef} background={cream}>
      {/* Top tile band */}
      <g transform="translate(0 0)">
        <rect x={0} y={0} width={CARD_W} height={90} fill={terra} />
        {Array.from({ length: row }).map((_, i) => (
          <g key={i} transform={`translate(${i * tileSize - 20} 10)`}>
            <ZelligeMotif teal={teal} gold={gold} cream={cream} size={tileSize} />
          </g>
        ))}
      </g>

      {/* Bottom tile band */}
      <g transform={`translate(0 ${CARD_H - 90})`}>
        <rect x={0} y={0} width={CARD_W} height={90} fill={terra} />
        {Array.from({ length: row }).map((_, i) => (
          <g key={i} transform={`translate(${i * tileSize - 20} 10)`}>
            <ZelligeMotif teal={teal} gold={gold} cream={cream} size={tileSize} />
          </g>
        ))}
      </g>

      {/* Gold hairlines */}
      <line x1={0} y1={90} x2={CARD_W} y2={90} stroke={gold} strokeWidth={1.5} />
      <line
        x1={0}
        y1={CARD_H - 90}
        x2={CARD_W}
        y2={CARD_H - 90}
        stroke={gold}
        strokeWidth={1.5}
      />

      {/* Inner ornament frame */}
      <rect
        x={70}
        y={120}
        width={CARD_W - 140}
        height={CARD_H - 240}
        fill="none"
        stroke={teal}
        strokeWidth={1.2}
      />
      <rect
        x={82}
        y={132}
        width={CARD_W - 164}
        height={CARD_H - 264}
        fill="none"
        stroke={gold}
        strokeWidth={0.6}
      />

      {/* Eight-pointed star centerpiece at top */}
      <g transform={`translate(${cx} 170)`}>
        <rect x={-20} y={-20} width={40} height={40} fill={teal} />
        <rect x={-20} y={-20} width={40} height={40} fill={teal} transform="rotate(45)" />
        <rect x={-10} y={-10} width={20} height={20} fill={gold} transform="rotate(22.5)" />
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={240}
        textAnchor="middle"
        fill={teal}
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
        y={400}
        textAnchor="middle"
        fill={ink}
        fontSize={124}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-1.5px",
        }}
      >
        {data.headline}
      </text>

      {/* Divider */}
      <g transform={`translate(${cx} 445)`}>
        <line x1={-100} y1={0} x2={-14} y2={0} stroke={gold} strokeWidth={1} />
        <g>
          <rect x={-6} y={-6} width={12} height={12} fill={teal} transform="rotate(45)" />
        </g>
        <line x1={14} y1={0} x2={100} y2={0} stroke={gold} strokeWidth={1} />
      </g>

      {/* Recipient */}
      <text
        x={cx}
        y={485}
        textAnchor="middle"
        fill={teal}
        fontSize={20}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      <MultilineText
        lines={messageLines}
        cx={cx}
        y={525}
        lineHeight={22}
        fill="#3a4050"
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      <text
        x={cx}
        y={CARD_H - 120}
        textAnchor="middle"
        fill={teal}
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

function ZelligeMotif({
  teal,
  gold,
  cream,
  size,
}: {
  teal: string;
  gold: string;
  cream: string;
  size: number;
}) {
  const s = size / 2;
  return (
    <g>
      {/* 8-point star */}
      <rect x={-s * 0.35} y={-s * 0.35} width={s * 0.7} height={s * 0.7} fill={teal} transform="translate(35 35)" />
      <rect
        x={-s * 0.35}
        y={-s * 0.35}
        width={s * 0.7}
        height={s * 0.7}
        fill={teal}
        transform="translate(35 35) rotate(45)"
      />
      {/* Inner gold dot */}
      <circle cx={35} cy={35} r={s * 0.12} fill={gold} />
      {/* Cream diamonds between stars */}
      <rect x={-s * 0.15} y={-s * 0.15} width={s * 0.3} height={s * 0.3} fill={cream} transform="translate(0 35) rotate(45)" />
      <rect x={-s * 0.15} y={-s * 0.15} width={s * 0.3} height={s * 0.3} fill={cream} transform="translate(70 35) rotate(45)" />
    </g>
  );
}
