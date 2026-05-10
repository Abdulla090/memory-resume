import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template — Royal Diploma.
 * Traditional university diploma. Engraved border pattern, double-lined
 * frame, centered crest with university-style shield, gold seal bottom-center.
 */
export function RoyalDiploma({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 84);
  const navy = "#1a2d5c";
  const deepNavy = "#0c1a3b";
  const gold = "#c6a24a";
  const paper = "#fbf7ee";

  return (
    <CardShell ref={svgRef} background={paper}>
      {/* Engraved pattern border — repeating diamonds */}
      <rect
        x={40}
        y={40}
        width={CARD_W - 80}
        height={CARD_H - 80}
        fill="none"
        stroke={navy}
        strokeWidth={2}
      />
      <rect
        x={54}
        y={54}
        width={CARD_W - 108}
        height={CARD_H - 108}
        fill="none"
        stroke={gold}
        strokeWidth={0.8}
      />

      {/* Diamond pattern along frame */}
      {Array.from({ length: Math.floor((CARD_W - 160) / 24) }).map((_, i) => {
        const x = 80 + i * 24;
        return (
          <g key={`top-${i}`}>
            <rect
              x={x - 3}
              y={45}
              width={6}
              height={6}
              fill={gold}
              transform={`rotate(45 ${x} 48)`}
            />
            <rect
              x={x - 3}
              y={CARD_H - 51}
              width={6}
              height={6}
              fill={gold}
              transform={`rotate(45 ${x} ${CARD_H - 48})`}
            />
          </g>
        );
      })}

      {/* Crest at top */}
      <g transform={`translate(${cx} 140)`}>
        {/* Shield */}
        <path
          d="M 0 -45 L 40 -45 L 40 5 Q 40 40 0 55 Q -40 40 -40 5 L -40 -45 Z"
          fill={navy}
        />
        <path
          d="M 0 -45 L 40 -45 L 40 5 Q 40 40 0 55 Q -40 40 -40 5 L -40 -45 Z"
          fill="none"
          stroke={gold}
          strokeWidth={1.5}
        />
        {/* Shield chevron */}
        <path d="M -30 -20 L 0 -5 L 30 -20 L 30 -10 L 0 5 L -30 -10 Z" fill={gold} />
        {/* Star */}
        <polygon
          points="0,22 3.5,32 14,32 5.5,38 9,48 0,42 -9,48 -5.5,38 -14,32 -3.5,32"
          fill={gold}
        />
        {/* Ribbons on either side */}
        <path
          d="M -40 10 L -75 4 L -80 16 L -52 22 L -40 18 Z"
          fill={navy}
          opacity={0.85}
        />
        <path
          d="M 40 10 L 75 4 L 80 16 L 52 22 L 40 18 Z"
          fill={navy}
          opacity={0.85}
        />
      </g>

      {/* Occasion */}
      <text
        x={cx}
        y={240}
        textAnchor="middle"
        fill={navy}
        fontSize={13}
        letterSpacing={8}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Eyebrow */}
      <text
        x={cx}
        y={290}
        textAnchor="middle"
        fill={deepNavy}
        fontSize={15}
        fontStyle="italic"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        — presented to —
      </text>

      {/* Recipient big */}
      <text
        x={cx}
        y={370}
        textAnchor="middle"
        fill={deepNavy}
        fontSize={74}
        fontStyle="italic"
        fontWeight={500}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-1px",
        }}
      >
        {data.recipient}
      </text>

      {/* Underline */}
      <line
        x1={cx - 200}
        y1={388}
        x2={cx + 200}
        y2={388}
        stroke={gold}
        strokeWidth={1.5}
      />
      <circle cx={cx} cy={388} r={3} fill={gold} />

      {/* Headline */}
      <text
        x={cx}
        y={450}
        textAnchor="middle"
        fill={navy}
        fontSize={38}
        fontWeight={800}
        letterSpacing={12}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.headline.toUpperCase()}
      </text>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={500}
        lineHeight={23}
        fill="#404a68"
        fontSize={14.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Wax seal + ribbons bottom-left */}
      <g transform={`translate(190 ${CARD_H - 130})`}>
        {/* Ribbons behind */}
        <path
          d="M -30 -8 L -38 40 L -22 32 L -18 46 L -10 30 Z"
          fill={navy}
        />
        <path
          d="M 30 -8 L 38 40 L 22 32 L 18 46 L 10 30 Z"
          fill={navy}
          opacity={0.9}
        />
        {/* Seal */}
        <circle cx={0} cy={0} r={38} fill={gold} />
        <circle cx={0} cy={0} r={32} fill="none" stroke={deepNavy} strokeWidth={1} />
        <circle
          cx={0}
          cy={0}
          r={28}
          fill="none"
          stroke={deepNavy}
          strokeWidth={0.6}
          strokeDasharray="2 2"
        />
        {/* Center star */}
        <polygon
          points="0,-16 4,-5 15,-5 6,2 9,13 0,7 -9,13 -6,2 -15,-5 -4,-5"
          fill={deepNavy}
        />
      </g>

      {/* Signature line right */}
      <g>
        <line
          x1={CARD_W - 380}
          y1={CARD_H - 110}
          x2={CARD_W - 140}
          y2={CARD_H - 110}
          stroke={deepNavy}
          strokeOpacity={0.6}
          strokeWidth={1}
        />
        <text
          x={CARD_W - 260}
          y={CARD_H - 90}
          textAnchor="middle"
          fill={deepNavy}
          fontSize={13}
          fontStyle="italic"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {data.sender}
        </text>
        <text
          x={CARD_W - 260}
          y={CARD_H - 72}
          textAnchor="middle"
          fill={deepNavy}
          fontOpacity={0.55}
          fontSize={9}
          letterSpacing={3}
          fontWeight={700}
          style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
        >
          Authorized Signature
        </text>
        {data.date && (
          <text
            x={CARD_W - 260}
            y={CARD_H - 54}
            textAnchor="middle"
            fill={deepNavy}
            fontOpacity={0.55}
            fontSize={10}
            fontStyle="italic"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {data.date}
          </text>
        )}
      </g>
    </CardShell>
  );
}
