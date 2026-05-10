import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Minimalist Line.
 * Ultra-quiet editorial card. One continuous hairline rectangle framing
 * an enormous italic serif. Absolutely nothing else. The luxury of restraint.
 */
export function MinimalistLine({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 68);
  const ink = "#111115";
  const muted = "#6b6b72";

  return (
    <CardShell ref={svgRef} background="#f8f7f3">
      {/* Single continuous hairline frame */}
      <rect
        x={50}
        y={50}
        width={CARD_W - 100}
        height={CARD_H - 100}
        fill="none"
        stroke={ink}
        strokeWidth={1}
      />

      {/* Top tiny centered kicker */}
      <text
        x={cx}
        y={110}
        textAnchor="middle"
        fill={ink}
        fontSize={10}
        letterSpacing={9}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Single 40px centered rule */}
      <line
        x1={cx - 20}
        y1={130}
        x2={cx + 20}
        y2={130}
        stroke={ink}
        strokeWidth={1}
      />

      {/* Huge italic headline */}
      <text
        x={cx}
        y={CARD_H / 2 + 10}
        textAnchor="middle"
        fill={ink}
        fontSize={168}
        fontStyle="italic"
        fontWeight={300}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-3px",
        }}
      >
        {data.headline}
      </text>

      {/* Recipient */}
      <text
        x={cx}
        y={CARD_H / 2 + 60}
        textAnchor="middle"
        fill={ink}
        fontSize={20}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={CARD_H / 2 + 100}
        lineHeight={24}
        fill={muted}
        fontSize={14}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Bottom signature — edge aligned within frame */}
      <text
        x={70}
        y={CARD_H - 70}
        fill={ink}
        fontSize={11}
        letterSpacing={4}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.sender.toUpperCase()}
      </text>
      {data.date && (
        <text
          x={CARD_W - 70}
          y={CARD_H - 70}
          textAnchor="end"
          fill={muted}
          fontSize={11}
          letterSpacing={4}
          fontWeight={700}
          style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
        >
          {data.date.toUpperCase()}
        </text>
      )}
    </CardShell>
  );
}
