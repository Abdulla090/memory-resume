import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";

/**
 * Template #5 — Garden Bloom.
 * Soft blush wedding / graduation invitation with botanical floral
 * corners and a centered italic headline. All vector — exports as PDF.
 */
export function BotanicalSky({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 76);
  const ink = "#2a3d2e";
  const leaf = "#5f7a5a";
  const petal = "#d9a5ab";
  const petalLight = "#f3c8ca";
  const cream = "#fdfaf4";

  return (
    <CardShell ref={svgRef} background={cream}>
      {/* Inner hairline frame */}
      <rect
        x={60}
        y={60}
        width={CARD_W - 120}
        height={CARD_H - 120}
        fill="none"
        stroke={ink}
        strokeOpacity={0.18}
        strokeWidth={1}
      />

      {/* Floral clusters in four corners */}
      <g transform="translate(60 60)">
        <FloralCluster leaf={leaf} petal={petal} petalLight={petalLight} />
      </g>
      <g transform={`translate(${CARD_W - 60} 60) rotate(90)`}>
        <FloralCluster leaf={leaf} petal={petal} petalLight={petalLight} />
      </g>
      <g transform={`translate(${CARD_W - 60} ${CARD_H - 60}) rotate(180)`}>
        <FloralCluster leaf={leaf} petal={petal} petalLight={petalLight} />
      </g>
      <g transform={`translate(60 ${CARD_H - 60}) rotate(270)`}>
        <FloralCluster leaf={leaf} petal={petal} petalLight={petalLight} />
      </g>

      {/* Occasion kicker */}
      <text
        x={cx}
        y={200}
        textAnchor="middle"
        fill={leaf}
        fontSize={12}
        letterSpacing={7}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      {/* Divider dot */}
      <circle cx={cx} cy={222} r={2.5} fill={leaf} opacity={0.7} />

      {/* Headline */}
      <text
        x={cx}
        y={370}
        textAnchor="middle"
        fill={ink}
        fontSize={132}
        fontStyle="italic"
        fontWeight={400}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-1.5px",
        }}
      >
        {data.headline}
      </text>

      {/* Swirl divider */}
      <g transform={`translate(${cx} 410)`}>
        <path
          d="M -60 0 Q -30 -8 0 0 Q 30 8 60 0"
          fill="none"
          stroke={leaf}
          strokeWidth={1.2}
        />
        <circle cx={0} cy={0} r={2.5} fill={petal} />
      </g>

      {/* Recipient */}
      <text
        x={cx}
        y={460}
        textAnchor="middle"
        fill={ink}
        fontSize={22}
        fontStyle="italic"
        fontWeight={500}
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {data.recipient}
      </text>

      {/* Message */}
      <MultilineText
        lines={messageLines}
        cx={cx}
        y={500}
        lineHeight={24}
        fill="#4a5a4d"
        fontSize={15}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      {/* Bottom signature */}
      <text
        x={cx}
        y={CARD_H - 120}
        textAnchor="middle"
        fill={leaf}
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
          y={CARD_H - 95}
          textAnchor="middle"
          fill="#6d7d6f"
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

function FloralCluster({
  leaf,
  petal,
  petalLight,
}: {
  leaf: string;
  petal: string;
  petalLight: string;
}) {
  // A small botanical arrangement anchored at (0,0), extending into +x / +y.
  return (
    <g>
      {/* Stems */}
      <path
        d="M 8 8 Q 40 20 70 12"
        fill="none"
        stroke={leaf}
        strokeWidth={1.2}
        opacity={0.85}
      />
      <path
        d="M 8 8 Q 22 38 14 70"
        fill="none"
        stroke={leaf}
        strokeWidth={1.2}
        opacity={0.85}
      />
      <path
        d="M 8 8 Q 52 48 90 58"
        fill="none"
        stroke={leaf}
        strokeWidth={1}
        opacity={0.6}
      />

      {/* Leaves along each stem */}
      {[
        { x: 28, y: 18, rot: 15 },
        { x: 50, y: 22, rot: -10 },
        { x: 18, y: 32, rot: 80 },
        { x: 20, y: 54, rot: 95 },
        { x: 48, y: 42, rot: 35 },
        { x: 66, y: 52, rot: 25 },
      ].map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot})`}>
          <ellipse cx={0} cy={0} rx={10} ry={4} fill={leaf} opacity={0.85} />
          <ellipse cx={0} cy={0} rx={6} ry={2.5} fill={leaf} opacity={1} />
        </g>
      ))}

      {/* Hero flower */}
      <g transform="translate(78 16)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <ellipse
            key={a}
            cx={0}
            cy={-10}
            rx={7}
            ry={12}
            fill={a % 90 === 0 ? petal : petalLight}
            transform={`rotate(${a})`}
            opacity={0.9}
          />
        ))}
        <circle cx={0} cy={0} r={4.5} fill="#e8b964" />
        <circle cx={0} cy={0} r={2} fill="#8a6420" />
      </g>

      {/* Small bud */}
      <g transform="translate(18 74)">
        {[0, 120, 240].map((a) => (
          <ellipse
            key={a}
            cx={0}
            cy={-6}
            rx={4}
            ry={7}
            fill={petal}
            transform={`rotate(${a})`}
            opacity={0.85}
          />
        ))}
        <circle cx={0} cy={0} r={2.2} fill="#8a6420" />
      </g>
    </g>
  );
}
