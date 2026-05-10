import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Champagne Flutes.
 * Elegant blush with two crossed champagne flutes at top and a shimmering
 * confetti dot pattern. Perfect for wedding + anniversary + NYE.
 */
export function ChampagneFlutes({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 76);
  const ink = "#3e2a2c";
  const gold = "#c9a24a";
  const deepGold = "#8e6f28";
  const blush = "#f4d6d2";

  // Confetti dots
  const dots = Array.from({ length: 50 }).map((_, i) => ({
    x: ((i * 83) % (CARD_W - 160)) + 80,
    y: ((i * 47) % (CARD_H - 160)) + 80,
    r: (i % 5 === 0 ? 4 : i % 3 === 0 ? 3 : 2),
    color: i % 4 === 0 ? gold : i % 4 === 1 ? blush : i % 4 === 2 ? deepGold : "#d6bcb3",
  }));

  return (
    <CardShell ref={svgRef} background="#fcf3ef">
      {/* Confetti */}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.color} opacity={0.55} />
      ))}

      {/* Gold hairline frame */}
      <rect
        x={52}
        y={52}
        width={CARD_W - 104}
        height={CARD_H - 104}
        fill="none"
        stroke={gold}
        strokeWidth={0.8}
      />

      {/* Two crossed champagne flutes */}
      <g transform={`translate(${cx} 180)`}>
        {/* Left flute */}
        <g transform="rotate(-18)">
          <path
            d="M -16 -60 L 16 -60 L 10 0 L -10 0 Z"
            fill={gold}
            opacity={0.9}
          />
          <path
            d="M -16 -60 L 16 -60 L 10 0 L -10 0 Z"
            fill="none"
            stroke={deepGold}
            strokeWidth={1}
          />
          <path d="M -1 0 L -1 40" stroke={deepGold} strokeWidth={1.5} />
          <ellipse cx={0} cy={44} rx={12} ry={2.5} fill={deepGold} />
          {/* Bubbles */}
          <circle cx={-4} cy={-52} r={2} fill="#fff" opacity={0.7} />
          <circle cx={6} cy={-38} r={1.5} fill="#fff" opacity={0.7} />
          <circle cx={-2} cy={-22} r={1.5} fill="#fff" opacity={0.7} />
        </g>
        {/* Right flute */}
        <g transform="rotate(18)">
          <path d="M -16 -60 L 16 -60 L 10 0 L -10 0 Z" fill={gold} opacity={0.9} />
          <path
            d="M -16 -60 L 16 -60 L 10 0 L -10 0 Z"
            fill="none"
            stroke={deepGold}
            strokeWidth={1}
          />
          <path d="M 1 0 L 1 40" stroke={deepGold} strokeWidth={1.5} />
          <ellipse cx={0} cy={44} rx={12} ry={2.5} fill={deepGold} />
          <circle cx={4} cy={-52} r={2} fill="#fff" opacity={0.7} />
          <circle cx={-6} cy={-38} r={1.5} fill="#fff" opacity={0.7} />
          <circle cx={2} cy={-22} r={1.5} fill="#fff" opacity={0.7} />
        </g>
        {/* Bubbles rising from glasses */}
        {[...Array(6)].map((_, i) => (
          <circle
            key={i}
            cx={-20 + i * 8}
            cy={-90 - (i % 3) * 10}
            r={1.6 + (i % 2)}
            fill={gold}
            opacity={0.75}
          />
        ))}
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={280}
        textAnchor="middle"
        fill={deepGold}
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
        fontSize={130}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-1.5px",
        }}
      >
        {data.headline}
      </text>

      {/* Recipient */}
      <text
        x={cx}
        y={478}
        textAnchor="middle"
        fill={deepGold}
        fontSize={20}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      <MultilineText
        lines={messageLines}
        cx={cx}
        y={516}
        lineHeight={22}
        fill="#5c4340"
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      <text
        x={cx}
        y={CARD_H - 90}
        textAnchor="middle"
        fill={ink}
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
          y={CARD_H - 70}
          textAnchor="middle"
          fill={deepGold}
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
