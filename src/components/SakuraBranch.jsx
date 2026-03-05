export default function SakuraBranch({ width = 120, style }) {
  const flowers = [
    { x: 108, y: 16, s: 0.9  },
    { x: 80,  y: 28, s: 0.78 },
    { x: 64,  y: 44, s: 1.0  },
    { x: 45,  y: 60, s: 0.72 },
    { x: 96,  y: 50, s: 0.82 },
  ]

  return (
    <svg
      viewBox="0 0 140 112"
      width={width}
      height={Math.round(width * 112 / 140)}
      style={{ color: 'var(--sakura)', display: 'block', ...style }}
      aria-hidden="true"
    >
      {/* Main branch */}
      <path d="M10 110 C28 88, 50 68, 64 44" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.45" />
      {/* Sub-branch to upper right */}
      <path d="M64 44 C78 32, 92 22, 108 16" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.4" />
      {/* Short upper branch */}
      <path d="M86 30 C88 20, 92 12, 96 6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.35" />

      {/* Sakura flowers — 5 petals each */}
      {flowers.map((f, fi) =>
        Array.from({ length: 5 }, (_, i) => {
          const a = (i * 72 - 90) * Math.PI / 180
          const d = 6.5 * f.s
          return (
            <circle
              key={`${fi}-${i}`}
              cx={f.x + d * Math.cos(a)}
              cy={f.y + d * Math.sin(a)}
              r={5 * f.s}
              fill="currentColor"
              opacity={0.6}
            />
          )
        })
      )}

      {/* Flower centers — warm gold */}
      {flowers.map((f, i) => (
        <circle key={`c${i}`} cx={f.x} cy={f.y} r={2.5 * f.s} fill="var(--warning)" opacity={0.75} />
      ))}

      {/* Scattered fallen petals */}
      <ellipse cx="130" cy="40" rx="3.5" ry="5.5" transform="rotate(28,130,40)"  fill="currentColor" opacity="0.3" />
      <ellipse cx="22"  cy="78" rx="3"   ry="4.5" transform="rotate(-18,22,78)"  fill="currentColor" opacity="0.25" />
      <ellipse cx="118" cy="70" rx="3"   ry="5"   transform="rotate(52,118,70)"  fill="currentColor" opacity="0.2" />
    </svg>
  )
}
