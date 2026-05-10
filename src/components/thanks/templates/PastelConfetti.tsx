import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Pastel Confetti.
 * Cheerful birthday-party palette with a confetti rain cascading from
 * the top and soft gradient background. Ideal for birthdays + kids’ events.
 */
export function PastelConfetti({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 72);
  const ink = "#2d2840";
  const colors = ["#ff9ebb", "#ffc97a", "#85d2d0", "#b69cf7", "#ffe066"];

  const confetti = Array.from({ length: 80 }).map((_, i) => {
    const x = ((i * 89) % (CARD_W - 120)) + 60;
    const y = ((i * 37) % (CARD_H - 120)) + 60;
    const size = 6 + (i % 7);
    const rot = (i * 23) % 360;
    const color = colors[i % colors.length];
    const shape = i % 4;
    return { x, y, size, rot, color, shape };
  });

  return (
    <CardShell ref={svgRef} background="#fdfbf5">
      {/* Soft gradient wash from top */}
      <defs>
        <linearGradient id="pc-grad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffe0eb" stopOpacity={0.8} />
          <stop offset="60%" stopColor="#fff8e6" stopOpacity={0.5} />
          <stop offset="100%" stopColor="#e6f5f3" stopOpacity={0.5} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={CARD_W} height={CARD_H} fill="url(#pc-grad)" />

      {/* Confetti scatter */}
      {confetti.map((c, i) => {
        const common = { fill: c.color, opacity: 0.85 };
        if (c.shape === 0) {
          return (
            <rect
              key={i}
              x={c.x - c.size / 2}
              y={c.y - c.size / 2}
              width={c.size}
              height={c.size * 0.4}
              transform={`rotate(${c.rot} ${c.x} ${c.y})`}
              {...common}
            />
          );
        }
        if (c.shape === 1) {
          return <circle key={i} cx={c.x} cy={c.y} r={c.size / 2} {...common} />;
        }
        if (c.shape === 2) {
          // triangle
          const h = c.size * 0.9;
          const pts = `${c.x},${c.y - h / 2} ${c.x - h / 2},${c.y + h / 2} ${c.x + h / 2},${c.y + h / 2}`;
          return (
            <polygon key={i} points={pts} transform={`rotate(${c.rot} ${c.x} ${c.y})`} {...common} />
          );
        }
        // squiggle line
        return (
          <path
            key={i}
            d={`M ${c.x - c.size} ${c.y} q ${c.size / 3} -${c.size / 2} ${c.size * 0.6} 0 q ${c.size / 3} ${c.size / 2} ${c.size * 0.8} 0`}
            stroke={c.color}
            strokeWidth={1.5}
            fill="none"
            transform={`rotate(${c.rot} ${c.x} ${c.y})`}
            opacity={0.85}
          />
        );
      })}

      {/* Dashed frame */}
      <rect
        x={60}
        y={60}
        width={CARD_W - 120}
        height={CARD_H - 120}
        fill="none"
        stroke={ink}
        strokeWidth={1.2}
        strokeDasharray="5 4"
        opacity={0.55}
      />

      {/* Occasion */}
      <text
        x={cx}
        y={220}
        textAnchor="middle"
        fill={ink}
        fontSize={14}
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
        fontSize={146}
        fontStyle="italic"
        fontWeight={500}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-2.5px",
        }}
      >
        {data.headline}
      </text>

      {/* Recipient */}
      <text
        x={cx}
        y={450}
        textAnchor="middle"
        fill={ink}
        fontSize={20}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      <MultilineText
        lines={messageLines}
        cx={cx}
        y={490}
        lineHeight={22}
        fill="#514a62"
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      <text
        x={cx}
        y={CARD_H - 100}
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
