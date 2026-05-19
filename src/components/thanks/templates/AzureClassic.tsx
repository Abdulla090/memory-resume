import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template #1 — Editorial.
 * Classic centered certificate composition. Hairline frame, laurel sprays,
 * towering italic serif headline. Ideal for graduation and certificates.
 *
 * Pure SVG — exports as a true vector PDF.
 */
export function AzureClassic({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const cy = CARD_H / 2;
  const messageLines = wrapByChars(data.message, 72);

  return (
    <CardShell ref={svgRef} background="#fbfcfd">
      {/* Outer + inner hairline frame */}
      <rect
        x={40}
        y={40}
        width={CARD_W - 80}
        height={CARD_H - 80}
        fill="none"
        stroke="#0b1220"
        strokeOpacity={0.12}
        strokeWidth={1}
      />
      <rect
        x={56}
        y={56}
        width={CARD_W - 112}
        height={CARD_H - 112}
        fill="none"
        stroke="#0b1220"
        strokeOpacity={0.06}
        strokeWidth={1}
      />

      {/* Laurel sprays, left & right of headline */}
      <Laurel x={cx - 260} y={cy - 10} flip={false} color="#1f2a44" />
      <Laurel x={cx + 260} y={cy - 10} flip color="#1f2a44" />

      {/* Top-center occasion kicker */}
      <text
        x={cx}
        y={150}
        textAnchor="middle"
        fill="#1f2a44"
        fontSize={13}
        letterSpacing={6}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Divider under kicker */}
      <line
        x1={cx - 40}
        y1={176}
        x2={cx + 40}
        y2={176}
        stroke="#1f2a44"
        strokeOpacity={0.4}
        strokeWidth={1}
      />

      {/* Headline */}
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        fill="#0b1220"
        fontSize={148}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-2px",
        }}
      >
        {data.headline}
      </text>

      {/* Recipient (italic subtitle) */}
      <text
        x={cx}
        y={cy + 80}
        textAnchor="middle"
        fill="#2d3a59"
        fontSize={22}
        fontStyle="italic"
        fontWeight={500}
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Message body (wrapped) */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={cy + 130}
        lineHeight={24}
        fill="#4a5570"
        fontSize={15}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Bottom signature rail */}
      <line
        x1={120}
        y1={CARD_H - 110}
        x2={CARD_W - 120}
        y2={CARD_H - 110}
        stroke="#0b1220"
        strokeOpacity={0.15}
        strokeWidth={1}
      />
      <text
        x={120}
        y={CARD_H - 80}
        fill="#0b1220"
        fontSize={11}
        fontWeight={700}
        letterSpacing={4}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.sender.toUpperCase()}
      </text>
      {data.date && (
        <text
          x={CARD_W - 120}
          y={CARD_H - 80}
          textAnchor="end"
          fill="#0b1220"
          opacity={0.6}
          fontSize={11}
          fontWeight={700}
          letterSpacing={4}
          style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
        >
          {data.date.toUpperCase()}
        </text>
      )}
    </CardShell>
  );
}

/** Small decorative laurel built from coded ellipses (scales perfectly in PDF). */
function Laurel({
  x,
  y,
  flip,
  color,
}: {
  x: number;
  y: number;
  flip: boolean;
  color: string;
}) {
  const dir = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y})`} opacity={0.55}>
      <path
        d={`M 0 0 Q ${dir * 60} -70 ${dir * 120} 0 Q ${dir * 60} 70 0 0 Z`}
        fill="none"
        stroke={color}
        strokeWidth={1}
      />
      {[...Array(7)].map((_, i) => {
        const t = (i + 1) / 8;
        const px = dir * 120 * t;
        const py = -Math.sin(t * Math.PI) * 55;
        const angle = (dir * (1 - 2 * t) * 40) + (flip ? 180 : 0);
        return (
          <ellipse
            key={`t-${i}`}
            cx={px}
            cy={py}
            rx={12}
            ry={4}
            fill={color}
            opacity={0.75}
            transform={`rotate(${angle} ${px} ${py})`}
          />
        );
      })}
      {[...Array(7)].map((_, i) => {
        const t = (i + 1) / 8;
        const px = dir * 120 * t;
        const py = Math.sin(t * Math.PI) * 55;
        const angle = (-dir * (1 - 2 * t) * 40) + (flip ? 180 : 0);
        return (
          <ellipse
            key={`b-${i}`}
            cx={px}
            cy={py}
            rx={12}
            ry={4}
            fill={color}
            opacity={0.75}
            transform={`rotate(${angle} ${px} ${py})`}
          />
        );
      })}
    </g>
  );
}
