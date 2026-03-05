export default function KanjiMark({ char = '集', size = 80, style }) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      aria-hidden="true"
      style={{ display: 'block', pointerEvents: 'none', ...style }}
    >
      <text
        x="40"
        y="68"
        textAnchor="middle"
        fontSize="80"
        fontFamily="'Hiragino Kaku Gothic Pro', 'Yu Gothic', 'MS Gothic', serif"
        fill="currentColor"
        opacity="0.055"
      >
        {char}
      </text>
    </svg>
  )
}
