import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Black & Gold Modern.
 * High-contrast luxe with single gold rings and refined serif.
 * Perfect for formal thank-you notes, galas, milestones.
 */
export function BlackGoldModern({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 80);
  const gold = "#d4b26a";
  const deepGold = "#a08343";
  const ink = "#f4ecd6";

  return (
    <CardShell ref={svgRef} background="#0b0b0e">
      {/* Gold inner frame */}
      <rect
        x={54}
        y={54}
        width={CARD_W - 108}
        height={CARD_H - 108}
        fill="none"
        stroke={gold}
        strokeWidth={1}
      />

      {/* Concentric gold rings at top */}
      <g transform={`translate(${cx} 150)`}>
        <circle cx={0} cy={0} r={50} fill="none" stroke={gold} strokeWidth={1.2} />
        <circle cx={0} cy={0} r={42} fill="none" stroke={gold} strokeWidth={0.8} opacity={0.7} />
        <circle cx={0} cy={0} r={34} fill="none" stroke={gold} strokeWidth={0.5} opacity={0.45} />
        {data.monogram && (
          <text
            x={0}
            y={10}
            textAnchor="middle"
            fill={gold}
            fontSize={28}
            fontStyle="italic"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {data.monogram}
          </text>
        )}
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={230}
        textAnchor="middle"
        fill={gold}
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
        y={400}
        textAnchor="middle"
        fill={ink}
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
      <g transform={`translate(${cx} 440)`}>
        <line x1={-60} y1={0} x2={-8} y2={0} stroke={gold} strokeWidth={1} />
        <circle cx={0} cy={0} r={3} fill={gold} />
        <line x1={8} y1={0} x2={60} y2={0} stroke={gold} strokeWidth={1} />
      </g>

      {/* Recipient */}
      <text
        x={cx}
        y={475}
        textAnchor="middle"
        fill={gold}
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
        y={515}
        lineHeight={22}
        fill="#cfc2a3"
        fontSize={13.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Signature */}
      <text
        x={cx}
        y={CARD_H - 100}
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
          y={CARD_H - 76}
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
