import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Midnight Stars.
 * Deep indigo night sky with gold star constellations. Magical for
 * celestial-themed weddings & milestone birthdays.
 */
export function MidnightStars({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 78);
  const night = "#0c1939";
  const deepNight = "#060c20";
  const gold = "#d4b26a";
  const silver = "#c9d5ef";

  // Random-seeded constellation positions
  const stars = [
    // Top cluster
    { x: 160, y: 100, size: 8 },
    { x: 220, y: 130, size: 5 },
    { x: 270, y: 95, size: 10 },
    { x: 330, y: 145, size: 4 },
    { x: 400, y: 100, size: 7 },
    // Top-right
    { x: 800, y: 110, size: 6 },
    { x: 870, y: 85, size: 9 },
    { x: 930, y: 145, size: 4 },
    { x: 1000, y: 100, size: 7 },
    // Left side
    { x: 90, y: 300, size: 4 },
    { x: 130, y: 400, size: 5 },
    { x: 95, y: 500, size: 7 },
    { x: 150, y: 600, size: 4 },
    // Right side
    { x: 1040, y: 300, size: 5 },
    { x: 990, y: 400, size: 4 },
    { x: 1050, y: 500, size: 6 },
    // Bottom
    { x: 200, y: 690, size: 4 },
    { x: 300, y: 720, size: 6 },
    { x: 400, y: 680, size: 4 },
    { x: 700, y: 700, size: 5 },
    { x: 820, y: 680, size: 6 },
    { x: 920, y: 720, size: 4 },
  ];

  return (
    <CardShell ref={svgRef} background={night}>
      {/* Vignette */}
      <defs>
        <radialGradient id="mn-vig" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stopColor={night} stopOpacity={0} />
          <stop offset="100%" stopColor={deepNight} stopOpacity={0.8} />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={CARD_W} height={CARD_H} fill="url(#mn-vig)" />

      {/* Tiny silver dust */}
      {Array.from({ length: 80 }).map((_, i) => {
        const x = (i * 137) % CARD_W;
        const y = (i * 211) % CARD_H;
        return <circle key={i} cx={x} cy={y} r={1} fill={silver} opacity={0.35} />;
      })}

      {/* Constellation dots + connecting lines */}
      <g>
        {stars.map((s, i) => (
          <g key={i}>
            <Star x={s.x} y={s.y} size={s.size} color={gold} />
          </g>
        ))}
        {/* Connect some with thin lines */}
        <path
          d="M 160 100 L 220 130 L 270 95 L 330 145 L 400 100"
          stroke={gold}
          strokeWidth={0.6}
          fill="none"
          opacity={0.45}
        />
        <path
          d="M 800 110 L 870 85 L 930 145 L 1000 100"
          stroke={gold}
          strokeWidth={0.6}
          fill="none"
          opacity={0.45}
        />
        <path
          d="M 90 300 L 130 400 L 95 500 L 150 600"
          stroke={gold}
          strokeWidth={0.6}
          fill="none"
          opacity={0.45}
        />
      </g>

      {/* Gold hairline frame */}
      <rect
        x={60}
        y={60}
        width={CARD_W - 120}
        height={CARD_H - 120}
        fill="none"
        stroke={gold}
        strokeWidth={0.8}
        opacity={0.65}
      />

      {/* Occasion */}
      <text
        x={cx}
        y={250}
        textAnchor="middle"
        fill={gold}
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
        y={410}
        textAnchor="middle"
        fill="#f5eed2"
        fontSize={140}
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
      <g transform={`translate(${cx} 450)`}>
        <line x1={-70} y1={0} x2={-10} y2={0} stroke={gold} strokeWidth={0.8} />
        <Star x={0} y={0} size={6} color={gold} />
        <line x1={10} y1={0} x2={70} y2={0} stroke={gold} strokeWidth={0.8} />
      </g>

      {/* Recipient */}
      <text
        x={cx}
        y={490}
        textAnchor="middle"
        fill={gold}
        fontSize={20}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      <MultilineText
        lines={messageLines}
        cx={cx}
        y={530}
        lineHeight={22}
        fill="#d3d8ea"
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      <text
        x={cx}
        y={CARD_H - 110}
        textAnchor="middle"
        fill={gold}
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
          fill="#a79356"
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

function Star({ x, y, size, color }: { x: number; y: number; size: number; color: string }) {
  const s = size;
  const pts = [
    [0, -s],
    [s * 0.3, -s * 0.3],
    [s, 0],
    [s * 0.3, s * 0.3],
    [0, s],
    [-s * 0.3, s * 0.3],
    [-s, 0],
    [-s * 0.3, -s * 0.3],
  ]
    .map((p) => p.join(","))
    .join(" ");
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points={pts} fill={color} />
      <circle cx={0} cy={0} r={s * 0.3} fill="#fff" opacity={0.4} />
    </g>
  );
}
