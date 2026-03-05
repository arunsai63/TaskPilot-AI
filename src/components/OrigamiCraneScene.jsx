export default function OrigamiCraneScene({ width = 160 }) {
  return (
    <svg
      viewBox="0 0 100 180"
      width={width}
      aria-hidden="true"
      style={{ display: 'block', pointerEvents: 'none' }}
    >
      {/* Bamboo stalk */}
      <line x1="50" y1="180" x2="50" y2="60" stroke="var(--long-break-color)" strokeWidth="4" strokeLinecap="round" opacity="0.7" />

      {/* Bamboo nodes (joints) */}
      <rect x="44" y="158" width="12" height="3" rx="1.5" fill="var(--long-break-color)" opacity="0.4" />
      <rect x="44" y="128" width="12" height="3" rx="1.5" fill="var(--long-break-color)" opacity="0.4" />
      <rect x="44" y="98" width="12" height="3" rx="1.5" fill="var(--long-break-color)" opacity="0.4" />

      {/* Bamboo leaves */}
      <path d="M50 144 C38 138 28 140 24 132" stroke="var(--long-break-color)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M50 118 C62 112 72 114 76 106" stroke="var(--long-break-color)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M50 106 C40 100 32 103 28 96" stroke="var(--long-break-color)" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.4" />

      {/* Crane group — floats */}
      <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'emptyFloat 4s ease-in-out infinite' }}>
        {/* Crane body */}
        <polygon points="50,45 36,62 64,62" fill="var(--text-primary)" opacity="0.12" />

        {/* Wings */}
        <polygon points="36,62 22,52 42,60" fill="var(--accent)" opacity="0.35" />
        <polygon points="64,62 78,52 58,60" fill="var(--accent)" opacity="0.35" />

        {/* Tail */}
        <polygon points="50,62 44,72 56,72" fill="var(--text-primary)" opacity="0.08" />

        {/* Neck */}
        <line x1="50" y1="45" x2="47" y2="36" stroke="var(--text-primary)" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />

        {/* Head */}
        <polygon points="47,36 43,32 51,32" fill="var(--text-primary)" opacity="0.3" />

        {/* Feet gripping stalk */}
        <line x1="46" y1="71" x2="50" y2="62" stroke="var(--text-primary)" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
        <line x1="54" y1="71" x2="50" y2="62" stroke="var(--text-primary)" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
      </g>
    </svg>
  )
}
