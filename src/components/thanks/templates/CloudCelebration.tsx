import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template #2 — Graduation Seal.
 * Centered composition built around a deep-navy seal with a graduation cap
 * and laurel wreath. Perfect for university/school graduations and academic
 * certificates. All vector — exports as a true PDF.
 */
export function CloudCelebration({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 80);
  const navy = "#0b2e57";
  const gold = "#c9a44c";
  const ink = "#1a2540";

  return (
    <CardShell ref={svgRef} background="#f6f3ec">
      {/* Ornate double hairline frame */}
      <rect
        x={42}
        y={42}
        width={CARD_W - 84}
        height={CARD_H - 84}
        fill="none"
        stroke={navy}
        strokeOpacity={0.75}
        strokeWidth={1.5}
      />
      <rect
        x={58}
        y={58}
        width={CARD_W - 116}
        height={CARD_H - 116}
        fill="none"
        stroke={gold}
        strokeOpacity={0.7}
        strokeWidth={1}
      />

      {/* Corner flourishes */}
      {[
        { x: 60, y: 60, rot: 0 },
        { x: CARD_W - 60, y: 60, rot: 90 },
        { x: CARD_W - 60, y: CARD_H - 60, rot: 180 },
        { x: 60, y: CARD_H - 60, rot: 270 },
      ].map((c, i) => (
        <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.rot})`}>
          <path
            d="M 0 0 L 60 0 L 60 4 L 4 4 L 4 60 L 0 60 Z"
            fill={gold}
            opacity={0.8}
          />
          <circle cx={10} cy={10} r={3} fill={navy} />
        </g>
      ))}

      {/* Top seal: cap + laurel */}
      <g transform={`translate(${cx} 150)`}>
        {/* Outer seal ring */}
        <circle cx={0} cy={0} r={62} fill="none" stroke={gold} strokeWidth={1.5} />
        <circle cx={0} cy={0} r={54} fill={navy} />
        <circle
          cx={0}
          cy={0}
          r={54}
          fill="none"
          stroke={gold}
          strokeWidth={0.8}
          strokeDasharray="2 3"
          opacity={0.6}
        />

        {/* Graduation cap */}
        <g transform="translate(0 -4)">
          {/* Mortarboard top */}
          <path
            d="M -38 -10 L 0 -24 L 38 -10 L 0 4 Z"
            fill={gold}
          />
          <path
            d="M -38 -10 L 0 -24 L 38 -10 L 0 4 Z"
            fill="none"
            stroke="#f6f3ec"
            strokeWidth={0.8}
          />
          {/* Cap base */}
          <path
            d="M -20 0 L 20 0 L 20 10 C 20 16 -20 16 -20 10 Z"
            fill={gold}
          />
          {/* Button */}
          <circle cx={0} cy={-3} r={2.5} fill="#f6f3ec" />
          {/* Tassel */}
          <path
            d="M 0 -3 L 22 -3 L 22 18"
            stroke="#f6f3ec"
            strokeWidth={1.2}
            fill="none"
          />
          <circle cx={22} cy={20} r={2.5} fill="#f6f3ec" />
        </g>
      </g>

      {/* Laurel branches flanking the seal */}
      <Laurel x={cx - 140} y={150} flip={false} color={navy} />
      <Laurel x={cx + 140} y={150} flip color={navy} />

      {/* Occasion kicker */}
      <text
        x={cx}
        y={260}
        textAnchor="middle"
        fill={navy}
        fontSize={13}
        letterSpacing={6}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Huge italic headline */}
      <text
        x={cx}
        y={400}
        textAnchor="middle"
        fill={ink}
        fontSize={120}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-1.5px",
        }}
      >
        {data.headline}
      </text>

      {/* Swirl divider */}
      <g transform={`translate(${cx} 440)`}>
        <line x1={-100} y1={0} x2={-10} y2={0} stroke={gold} strokeWidth={1} />
        <line x1={10} y1={0} x2={100} y2={0} stroke={gold} strokeWidth={1} />
        <circle cx={0} cy={0} r={3.5} fill={gold} />
      </g>

      {/* Recipient */}
      <text
        x={cx}
        y={485}
        textAnchor="middle"
        fill={navy}
        fontSize={22}
        fontStyle="italic"
        fontWeight={500}
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={525}
        lineHeight={24}
        fill="#44506b"
        fontSize={15}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Signature bottom */}
      <line
        x1={cx - 220}
        y1={CARD_H - 110}
        x2={cx + 220}
        y2={CARD_H - 110}
        stroke={navy}
        strokeOpacity={0.3}
        strokeWidth={1}
      />
      <text
        x={cx}
        y={CARD_H - 82}
        textAnchor="middle"
        fill={navy}
        fontSize={12}
        fontWeight={700}
        letterSpacing={5}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.sender.toUpperCase()}
      </text>
      {data.date && (
        <text
          x={cx}
          y={CARD_H - 62}
          textAnchor="middle"
          fill="#6b7a94"
          fontSize={11}
          fontStyle="italic"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {data.date}
        </text>
      )}
    </CardShell>
  );
}

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
    <g transform={`translate(${x} ${y})`} opacity={0.7}>
      <path
        d={`M 0 0 Q ${dir * 70} -30 ${dir * 130} 0`}
        fill="none"
        stroke={color}
        strokeWidth={1.2}
      />
      {[...Array(8)].map((_, i) => {
        const t = (i + 0.5) / 8;
        const px = dir * 130 * t;
        const py = -Math.sin(t * Math.PI) * 26;
        const angle = dir * (1 - 2 * t) * 45 + (flip ? 180 : 0);
        return (
          <g key={`u-${i}`} transform={`translate(${px} ${py}) rotate(${angle})`}>
            <ellipse cx={0} cy={-4} rx={4} ry={10} fill={color} opacity={0.85} />
            <ellipse cx={0} cy={4} rx={4} ry={10} fill={color} opacity={0.65} />
          </g>
        );
      })}
    </g>
  );
}
