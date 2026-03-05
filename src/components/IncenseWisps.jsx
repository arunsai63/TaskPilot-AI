export default function IncenseWisps({ running }) {
  if (!running) return null

  return (
    <svg
      viewBox="0 0 100 140"
      width="80"
      aria-hidden="true"
      style={{ display: 'block', margin: '0 auto', pointerEvents: 'none' }}
    >
      {/* Incense stick */}
      <line x1="50" y1="140" x2="50" y2="100" stroke="var(--warning)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

      {/* Ash tip glow */}
      <circle cx="50" cy="100" r="2.5" fill="var(--warning)" opacity="0.9" />
      <circle cx="50" cy="100" r="5" fill="var(--warning)" opacity="0.08" />

      {/* Wisp 1 — left-curling */}
      <path
        d="M50,100 C48,88 52,78 46,66 C40,54 54,44 50,28"
        stroke="var(--accent)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        pathLength="100"
        className="smoke-wisp smoke-wisp-1"
      />

      {/* Wisp 2 — right-curling */}
      <path
        d="M50,100 C54,86 48,74 56,62 C64,50 48,40 52,24"
        stroke="var(--accent)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
        pathLength="100"
        className="smoke-wisp smoke-wisp-2"
      />

      {/* Wisp 3 — center vertical */}
      <path
        d="M50,100 C51,86 49,74 50,60 C51,46 50,34 50,20"
        stroke="var(--text-secondary)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.25"
        pathLength="100"
        className="smoke-wisp smoke-wisp-3"
      />
    </svg>
  )
}
