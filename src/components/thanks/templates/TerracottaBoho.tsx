import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";
import { Bloom, Leaf, Sprig } from "../botanicals";

/**
 * Template — Terracotta Boho.
 * Warm sunset-desert palette with dried pampas grass and a sun arch.
 */
export function TerracottaBoho({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 74);
  const ink = "#3c231b";
  const terra = "#b85a3a";
  const peach = "#e9b290";
  const cream = "#f7e9d7";
  const olive = "#6d6b3a";

  return (
    <CardShell ref={svgRef} background="#f5ead7">
      {/* Big sun arch behind center */}
      <g transform={`translate(${cx} ${CARD_H / 2 + 40})`}>
        <circle cx={0} cy={0} r={260} fill={peach} opacity={0.5} />
        <circle cx={0} cy={0} r={200} fill={terra} opacity={0.35} />
        <circle cx={0} cy={0} r={140} fill={cream} opacity={0.85} />
      </g>

      {/* Pampas grass sprays */}
      <g transform="translate(100 160)">
        {[...Array(7)].map((_, i) => (
          <g key={i} transform={`rotate(${-30 + i * 8})`}>
            <path
              d="M 0 0 Q 4 -50 0 -140"
              stroke={olive}
              strokeWidth={1}
              fill="none"
            />
            {[...Array(14)].map((_, j) => {
              const y = -10 - j * 9;
              return (
                <ellipse
                  key={j}
                  cx={0}
                  cy={y}
                  rx={6}
                  ry={1.5}
                  fill={olive}
                  opacity={0.7}
                />
              );
            })}
          </g>
        ))}
      </g>
      <g transform={`translate(${CARD_W - 100} 160) scale(-1 1)`}>
        {[...Array(7)].map((_, i) => (
          <g key={i} transform={`rotate(${-30 + i * 8})`}>
            <path
              d="M 0 0 Q 4 -50 0 -140"
              stroke={olive}
              strokeWidth={1}
              fill="none"
            />
            {[...Array(14)].map((_, j) => {
              const y = -10 - j * 9;
              return (
                <ellipse
                  key={j}
                  cx={0}
                  cy={y}
                  rx={6}
                  ry={1.5}
                  fill={olive}
                  opacity={0.7}
                />
              );
            })}
          </g>
        ))}
      </g>

      {/* Terracotta accent blooms */}
      <g transform="translate(130 620)">
        <Sprig length={100} rotation={-30} color={olive} vein="#3a3a20" />
        <Bloom size={42} color={terra} petalDark="#822f19" center="#f5e03e" />
        <Leaf x={50} y={20} size={28} color={olive} vein="#3a3a20" rotation={50} />
      </g>
      <g transform={`translate(${CARD_W - 130} 620) scale(-1 1)`}>
        <Sprig length={100} rotation={-30} color={olive} vein="#3a3a20" />
        <Bloom size={42} color={terra} petalDark="#822f19" center="#f5e03e" />
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={200}
        textAnchor="middle"
        fill={terra}
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
        y={CARD_H / 2 + 10}
        textAnchor="middle"
        fill={ink}
        fontSize={128}
        fontStyle="italic"
        fontWeight={500}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-2px",
        }}
      >
        {data.headline}
      </text>

      {/* Recipient */}
      <text
        x={cx}
        y={CARD_H / 2 + 54}
        textAnchor="middle"
        fill={terra}
        fontSize={18}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      <MultilineText
        lines={messageLines}
        cx={cx}
        y={CARD_H / 2 + 88}
        lineHeight={22}
        fill="#5a3b2a"
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Signature */}
      <text
        x={cx}
        y={CARD_H - 70}
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
