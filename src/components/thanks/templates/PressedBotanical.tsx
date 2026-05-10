import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Pressed Botanical.
 * Apothecary-style pressed-leaf composition. A single elegant leaf sprig
 * above and below the centered composition. Feels like a journal plate.
 */
export function PressedBotanical({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 72);
  const sage = "#4c6146";
  const deepSage = "#2f3d2b";
  const ink = "#1e2a1a";
  const paper = "#f6f3ea";

  return (
    <CardShell ref={svgRef} background={paper}>
      {/* Paper grain frame */}
      <rect
        x={56}
        y={56}
        width={CARD_W - 112}
        height={CARD_H - 112}
        fill="none"
        stroke={ink}
        strokeOpacity={0.14}
        strokeWidth={1}
      />

      {/* Top pressed leaf sprig */}
      <g transform={`translate(${cx} 150)`}>
        <LeafSprig color={sage} />
      </g>

      {/* Bottom mirrored sprig */}
      <g transform={`translate(${cx} ${CARD_H - 160}) scale(1 -1)`}>
        <LeafSprig color={sage} />
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={230}
        textAnchor="middle"
        fill={deepSage}
        fontSize={12}
        letterSpacing={8}
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
        fontSize={128}
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
        y={448}
        textAnchor="middle"
        fill={deepSage}
        fontSize={22}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Divider */}
      <g transform={`translate(${cx} 478)`}>
        <line x1={-70} y1={0} x2={-12} y2={0} stroke={sage} strokeWidth={1} />
        <g>
          <ellipse cx={0} cy={0} rx={6} ry={2} fill={sage} transform="rotate(-20)" />
          <ellipse cx={0} cy={0} rx={6} ry={2} fill={sage} transform="rotate(20)" />
        </g>
        <line x1={12} y1={0} x2={70} y2={0} stroke={sage} strokeWidth={1} />
      </g>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={515}
        lineHeight={24}
        fill="#4b574a"
        fontSize={14.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Signature */}
      <text
        x={cx}
        y={CARD_H - 80}
        textAnchor="middle"
        fill={deepSage}
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

function LeafSprig({ color }: { color: string }) {
  // Horizontal sprig with 5 pairs of opposing leaves, length ~220
  return (
    <g>
      <line x1={-110} y1={0} x2={110} y2={0} stroke={color} strokeWidth={1} />
      {[...Array(5)].map((_, i) => {
        const x = -100 + i * 50;
        return (
          <g key={i} transform={`translate(${x} 0)`}>
            <ellipse
              cx={0}
              cy={-9}
              rx={20}
              ry={6}
              fill={color}
              opacity={0.85}
              transform="rotate(-20)"
            />
            <ellipse
              cx={0}
              cy={9}
              rx={20}
              ry={6}
              fill={color}
              opacity={0.85}
              transform="rotate(20)"
            />
            <ellipse
              cx={0}
              cy={-9}
              rx={14}
              ry={3.2}
              fill={color}
              opacity={0.4}
              transform="rotate(-20)"
            />
            <ellipse
              cx={0}
              cy={9}
              rx={14}
              ry={3.2}
              fill={color}
              opacity={0.4}
              transform="rotate(20)"
            />
          </g>
        );
      })}
      {/* End accent */}
      <circle cx={-112} cy={0} r={3} fill={color} />
      <circle cx={112} cy={0} r={3} fill={color} />
    </g>
  );
}
