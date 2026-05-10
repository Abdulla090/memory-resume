import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Japandi Zen.
 * Japanese-Scandinavian minimalism. A single large ink-brush circle (enso)
 * behind the composition. Calm, confident, deeply elegant.
 */
export function JapandiZen({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 68);
  const ink = "#1b1b1f";
  const muted = "#6b6b70";
  const paper = "#f6f1e7";
  const red = "#c44b3a";

  // Enso circle as an SVG path — an uneven open brush stroke
  return (
    <CardShell ref={svgRef} background={paper}>
      {/* Horizontal zen rule top */}
      <line
        x1={120}
        y1={110}
        x2={CARD_W - 120}
        y2={110}
        stroke={ink}
        strokeOpacity={0.22}
      />

      {/* Enso brush circle */}
      <g transform={`translate(${cx} ${CARD_H / 2 + 10})`}>
        <path
          d="M 0 -220 A 220 220 0 1 0 160 -150"
          stroke={ink}
          strokeWidth={16}
          fill="none"
          strokeLinecap="round"
          opacity={0.92}
        />
        <path
          d="M 0 -225 A 225 225 0 1 0 156 -158"
          stroke={ink}
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
          opacity={0.4}
        />
      </g>

      {/* Red chop seal */}
      <g transform={`translate(${CARD_W - 180} ${CARD_H - 170})`}>
        <rect x={-22} y={-22} width={44} height={44} fill={red} />
        <text
          x={0}
          y={-2}
          textAnchor="middle"
          fill={paper}
          fontSize={11}
          fontWeight={800}
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          謝
        </text>
        <text
          x={0}
          y={12}
          textAnchor="middle"
          fill={paper}
          fontSize={11}
          fontWeight={800}
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          意
        </text>
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={155}
        textAnchor="middle"
        fill={muted}
        fontSize={12}
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
        fontSize={146}
        fontStyle="italic"
        fontWeight={300}
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
        y={CARD_H / 2 + 58}
        textAnchor="middle"
        fill={muted}
        fontSize={17}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      <MultilineText
        lines={messageLines}
        cx={cx}
        y={CARD_H / 2 + 96}
        lineHeight={22}
        fill={muted}
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      <line
        x1={120}
        y1={CARD_H - 110}
        x2={CARD_W - 120}
        y2={CARD_H - 110}
        stroke={ink}
        strokeOpacity={0.22}
      />
      <text
        x={cx}
        y={CARD_H - 80}
        textAnchor="middle"
        fill={ink}
        fontSize={11}
        letterSpacing={8}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.sender.toUpperCase()}
        {data.date ? `   ·   ${data.date.toUpperCase()}` : ""}
      </text>
    </CardShell>
  );
}
