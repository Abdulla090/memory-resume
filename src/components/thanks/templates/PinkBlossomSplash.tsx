import { CardShell } from "../CardShell";
import { CARD_H, CARD_W, type TemplateProps } from "../types";
import { MultilineText, wrapByChars } from "../svg-utils";
import { Bloom, Leaf, Splash, Sprig } from "../botanicals";

/**
 * Template — Pink Blossom Splash.
 * Watercolor pink splash behind a big italic "Thank You", with two
 * tropical pink blooms on opposite corners. Casual & warm for thanks.
 */
export function PinkBlossomSplash({ data, svgRef }: TemplateProps) {
  const cx = CARD_W / 2;
  const messageLines = wrapByChars(data.message, 74);
  const ink = "#1a1a22";
  const muted = "#4a4450";
  const petal = "#e3568b";
  const petalDark = "#b93668";
  const petalLight = "#f5c0d4";
  const leaf = "#6a8a55";
  const vein = "#34502a";

  return (
    <CardShell ref={svgRef} background="#fdf9ee">
      {/* Big pink splash behind center */}
      <Splash
        color="#eeb8cc"
        x={cx}
        y={CARD_H / 2 - 10}
        size={300}
        opacity={0.45}
        seed={3}
      />
      <Splash
        color="#f5d0dd"
        x={cx}
        y={CARD_H / 2 - 10}
        size={200}
        opacity={0.55}
        seed={4}
      />

      {/* Top-left pink blossom */}
      <g transform="translate(60 110)">
        <Sprig length={130} rotation={-15} color={leaf} vein={vein} />
        <Sprig length={90} rotation={-60} color={leaf} vein={vein} />
        <Bloom size={60} color={petal} petalDark={petalDark} center="#ffd84a" />
        <Bloom x={44} y={-38} size={36} color={petalLight} petalDark={petal} center="#ffd84a" petals={6} />
        <Leaf x={-20} y={60} size={36} color={leaf} vein={vein} rotation={-40} />
        <Leaf x={90} y={10} size={34} color={leaf} vein={vein} rotation={80} />
      </g>

      {/* Bottom-right pink blossom */}
      <g transform={`translate(${CARD_W - 60} ${CARD_H - 110}) scale(-1 -1)`}>
        <Sprig length={130} rotation={-20} color={leaf} vein={vein} />
        <Bloom size={54} color={petal} petalDark={petalDark} center="#ffd84a" />
        <Bloom x={40} y={-30} size={32} color={petalLight} petalDark={petal} center="#ffd84a" petals={6} />
        <Leaf x={80} y={0} size={32} color={leaf} vein={vein} rotation={80} />
      </g>

      {/* Small hearts */}
      <g fill={petalDark} opacity={0.7}>
        <path
          d="M 200 200 C 195 193 186 193 186 201 C 186 207 193 212 200 216 C 207 212 214 207 214 201 C 214 193 205 193 200 200 Z"
        />
        <path
          d="M 880 560 C 876 554 869 554 869 561 C 869 566 875 570 880 574 C 885 570 891 566 891 561 C 891 554 884 554 880 560 Z"
          fill={ink}
        />
      </g>

      {/* Headline — brush italic */}
      <text
        x={cx}
        y={CARD_H / 2 - 10}
        textAnchor="middle"
        fill={ink}
        fontSize={140}
        fontStyle="italic"
        fontWeight={500}
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", serif',
          letterSpacing: "-2px",
        }}
      >
        {data.headline}
      </text>

      {/* Sub kicker */}
      <text
        x={cx}
        y={CARD_H / 2 + 32}
        textAnchor="middle"
        fill={muted}
        fontSize={14}
        letterSpacing={10}
        fontWeight={700}
        style={{ textTransform: "uppercase", fontFamily: '"DM Sans", sans-serif' }}
      >
        {data.occasion.toUpperCase()}
      </text>

      <text
        x={cx}
        y={CARD_H / 2 + 70}
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
        y={CARD_H / 2 + 100}
        lineHeight={22}
        fill={muted}
        fontSize={13.5}
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      />

      <text
        x={cx}
        y={CARD_H - 50}
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
