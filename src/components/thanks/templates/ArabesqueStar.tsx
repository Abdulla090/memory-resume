import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Arabesque Star.
 * Geometric Islamic-art inspired border with 8-point stars and interlaced
 * motifs. Respectful, timeless, appropriate for Kurdish/Middle-Eastern
 * weddings, graduations, and religious ceremonies.
 */
export function ArabesqueStar({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 78);
  const teal = "#134e4a";
  const deepTeal = "#0a2e2c";
  const gold = "#caa24a";
  const paper = "#f8f3e8";

  return (
    <CardShell ref={svgRef} background={paper}>
      {/* Outer gold line */}
      <rect
        x={56}
        y={56}
        width={CARD_W - 112}
        height={CARD_H - 112}
        fill="none"
        stroke={gold}
        strokeWidth={1.5}
      />

      {/* Star pattern strip along top and bottom */}
      {[{ y: 44 }, { y: CARD_H - 44 }].map(({ y }, row) => (
        <g key={row}>
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 110 + i * ((CARD_W - 220) / 11);
            return (
              <g key={i} transform={`translate(${x} ${y})`}>
                <EightPointStar color={gold} size={10} />
              </g>
            );
          })}
        </g>
      ))}

      {/* Geometric corner ornaments */}
      {[
        { x: 74, y: 74, rot: 0 },
        { x: CARD_W - 74, y: 74, rot: 90 },
        { x: CARD_W - 74, y: CARD_H - 74, rot: 180 },
        { x: 74, y: CARD_H - 74, rot: 270 },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.rot})`}>
          {/* Interlaced rhombus */}
          <path
            d="M 0 0 L 30 30 L 60 0 L 30 -30 Z"
            fill="none"
            stroke={gold}
            strokeWidth={1.2}
          />
          <path
            d="M 15 0 L 30 15 L 45 0 L 30 -15 Z"
            fill={gold}
            opacity={0.85}
          />
          <circle cx={30} cy={0} r={3} fill={teal} />
        </g>
      ))}

      {/* Central medallion */}
      <g transform={`translate(${cx} 170)`}>
        {/* Outer ring */}
        <circle cx={0} cy={0} r={60} fill="none" stroke={gold} strokeWidth={1.4} />
        <circle cx={0} cy={0} r={54} fill={teal} />
        {/* 8-star inside */}
        <EightPointStar color={gold} size={34} center />
        <EightPointStar color={paper} size={20} center opacity={0.95} />
        <circle cx={0} cy={0} r={4} fill={gold} />
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={275}
        textAnchor="middle"
        fill={deepTeal}
        fontSize={12}
        letterSpacing={9}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Headline */}
      <text
        x={cx}
        y={410}
        textAnchor="middle"
        fill={deepTeal}
        fontSize={122}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-1.5px",
        }}
      >
        {data.headline}
      </text>

      {/* Divider with mini star */}
      <g transform={`translate(${cx} 450)`}>
        <line x1={-100} y1={0} x2={-14} y2={0} stroke={gold} strokeWidth={1} />
        <g transform="translate(0 0)">
          <EightPointStar color={gold} size={8} center />
        </g>
        <line x1={14} y1={0} x2={100} y2={0} stroke={gold} strokeWidth={1} />
      </g>

      {/* Recipient */}
      <text
        x={cx}
        y={498}
        textAnchor="middle"
        fill={teal}
        fontSize={22}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={535}
        lineHeight={24}
        fill="#2d3f3d"
        fontSize={14.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Signature */}
      <text
        x={cx}
        y={CARD_H - 110}
        textAnchor="middle"
        fill={deepTeal}
        fontSize={12}
        letterSpacing={6}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.sender.toUpperCase()}
      </text>
      {data.date && (
        <text
          x={cx}
          y={CARD_H - 86}
          textAnchor="middle"
          fill={teal}
          fontSize={12}
          fontStyle="italic"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {data.date}
        </text>
      )}
    </CardShell>
  );
}

function EightPointStar({
  color,
  size,
  center,
  opacity = 1,
}: {
  color: string;
  size: number;
  center?: boolean;
  opacity?: number;
}) {
  // Two overlapping squares rotated 45° to form an 8-point star.
  // When used with `center`, centered on (0,0); otherwise same.
  const s = size;
  return (
    <g opacity={opacity}>
      <rect x={-s} y={-s} width={s * 2} height={s * 2} fill={color} />
      <rect
        x={-s}
        y={-s}
        width={s * 2}
        height={s * 2}
        fill={color}
        transform="rotate(45)"
      />
      {/* center mark */}
      {center && <circle cx={0} cy={0} r={s * 0.14} fill="#fff0" />}
    </g>
  );
}
