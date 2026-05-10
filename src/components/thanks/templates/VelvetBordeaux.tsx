import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Velvet Bordeaux.
 * Deep burgundy with champagne gold foil. Baroque ornament at top and
 * bottom, exquisite for weddings, galas, and milestone anniversaries.
 */
export function VelvetBordeaux({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 78);
  const burgundy = "#5a1a2b";
  const deepBurgundy = "#2a0a12";
  const gold = "#d9b673";
  const lightGold = "#f0dfae";

  return (
    <CardShell ref={svgRef} background={burgundy}>
      {/* Vignette overlay */}
      <defs>
        <radialGradient id="velvet-vig" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor={burgundy} stopOpacity={0} />
          <stop offset="100%" stopColor={deepBurgundy} stopOpacity={0.55} />
        </radialGradient>
      </defs>
      <rect x={0} y={0} width={CARD_W} height={CARD_H} fill="url(#velvet-vig)" />

      {/* Gold double frame */}
      <rect
        x={50}
        y={50}
        width={CARD_W - 100}
        height={CARD_H - 100}
        fill="none"
        stroke={gold}
        strokeWidth={1.5}
      />
      <rect
        x={64}
        y={64}
        width={CARD_W - 128}
        height={CARD_H - 128}
        fill="none"
        stroke={gold}
        strokeOpacity={0.45}
        strokeWidth={0.8}
      />

      {/* Top ornamental crest */}
      <g transform={`translate(${cx} 130)`}>
        {/* Central fleur */}
        <path
          d="M 0 -30 Q -8 -20 -14 -8 Q -20 4 -10 10 Q -4 14 0 10 Q 4 14 10 10 Q 20 4 14 -8 Q 8 -20 0 -30 Z"
          fill={gold}
        />
        {/* Wings */}
        <path
          d="M 0 0 Q -30 -6 -60 0 Q -70 2 -76 -2 Q -70 8 -60 6 Q -30 8 0 6 Z"
          fill={gold}
          opacity={0.85}
        />
        <path
          d="M 0 0 Q 30 -6 60 0 Q 70 2 76 -2 Q 70 8 60 6 Q 30 8 0 6 Z"
          fill={gold}
          opacity={0.85}
        />
        {/* Dots */}
        <circle cx={-90} cy={2} r={3} fill={gold} />
        <circle cx={90} cy={2} r={3} fill={gold} />
        {/* Under sweep */}
        <path
          d="M -140 18 Q 0 30 140 18"
          fill="none"
          stroke={gold}
          strokeWidth={1}
          opacity={0.6}
        />
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={220}
        textAnchor="middle"
        fill={lightGold}
        fontSize={12}
        letterSpacing={9}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Headline */}
      <text
        x={cx}
        y={380}
        textAnchor="middle"
        fill={lightGold}
        fontSize={126}
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
        y={430}
        textAnchor="middle"
        fill={gold}
        fontSize={22}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Divider */}
      <g transform={`translate(${cx} 465)`}>
        <line x1={-80} y1={0} x2={-10} y2={0} stroke={gold} strokeWidth={1} opacity={0.7} />
        <circle cx={0} cy={0} r={3} fill={gold} />
        <line x1={10} y1={0} x2={80} y2={0} stroke={gold} strokeWidth={1} opacity={0.7} />
      </g>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={505}
        lineHeight={24}
        fill="#e8d8b4"
        fontSize={14.5}
        style={{ fontFamily: '"DM Sans", sans-serif', opacity: 0.9 }}
      />

      {/* Bottom mirror crest */}
      <g transform={`translate(${cx} ${CARD_H - 140}) scale(1 -1)`}>
        <path
          d="M 0 -20 Q -8 -10 -14 2 Q -20 14 -10 20 Q -4 24 0 20 Q 4 24 10 20 Q 20 14 14 2 Q 8 -10 0 -20 Z"
          fill={gold}
          opacity={0.85}
        />
        <path
          d="M -120 12 Q 0 22 120 12"
          fill="none"
          stroke={gold}
          strokeWidth={1}
          opacity={0.55}
        />
      </g>

      {/* Signature */}
      <text
        x={cx}
        y={CARD_H - 86}
        textAnchor="middle"
        fill={lightGold}
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
          y={CARD_H - 62}
          textAnchor="middle"
          fill={gold}
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
