import Timer from '../components/Timer/Timer'

function MtFujiScene() {
  return (
    <svg
      viewBox="0 0 520 152"
      width="100%"
      aria-hidden="true"
      style={{ display: 'block', marginTop: 28, opacity: 0.088 }}
    >
      {/* Moon — outer glow halo */}
      <circle cx={438} cy={40} r={48} fill="var(--text-primary)" opacity={0.07} />
      {/* Moon — solid disc */}
      <circle cx={438} cy={40} r={29} fill="var(--text-primary)" opacity={0.55} />

      {/* Distant hills — left */}
      <path d="M0 152 L0 112 Q42 88 86 110 Q128 130 158 124 L158 152Z"
        fill="var(--accent)" opacity="0.45" />

      {/* Distant hills — right */}
      <path d="M362 124 Q402 112 448 130 Q492 148 520 134 L520 152 L362 152Z"
        fill="var(--accent)" opacity="0.4" />

      {/* Mt. Fuji body */}
      <path d="M260 14 C252 32, 218 80, 160 152 L360 152 C302 80 268 32 260 14Z"
        fill="var(--accent)" />

      {/* Snow cap */}
      <path d="M260 14 C257 26, 249 43, 237 62 L283 62 C271 43 263 26 260 14Z"
        fill="rgba(255,255,255,0.82)" />

      {/* Snow ridgeline detail */}
      <path d="M241 58 C249 39, 255 24, 260 14 C265 24, 271 39, 279 58"
        stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="none" />

      {/* Torii gate — right foreground (桜色 / sakura pink) */}
      {/* Left pillar */}
      <rect x="398" y="110" width="4.5" height="42" fill="var(--sakura)" opacity="0.78" />
      {/* Right pillar */}
      <rect x="419" y="110" width="4.5" height="42" fill="var(--sakura)" opacity="0.78" />
      {/* Kasagi — top curved beam */}
      <path d="M391 114 Q401 106 412 105 Q423 106 433 114"
        stroke="var(--sakura)" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.78" />
      {/* Nuki — second horizontal beam */}
      <line x1="398" y1="124" x2="423" y2="124"
        stroke="var(--sakura)" strokeWidth="2.5" opacity="0.72" />
      {/* Shimagi — small connecting piece on pillars */}
      <rect x="396" y="121" width="3" height="6" fill="var(--sakura)" opacity="0.6" />
      <rect x="423" y="121" width="3" height="6" fill="var(--sakura)" opacity="0.6" />

      {/* Water / lake reflection */}
      <ellipse cx="260" cy="153" rx="72" ry="5" fill="var(--accent)" opacity="0.32" />
      <line x1="204" y1="149" x2="316" y2="149"
        stroke="var(--accent)" strokeWidth="1" opacity="0.2" />
      <line x1="218" y1="153" x2="302" y2="153"
        stroke="var(--accent)" strokeWidth="0.5" opacity="0.13" />
    </svg>
  )
}

export default function TimerPage() {
  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '24px 16px 0' }}>
      <Timer />
      <MtFujiScene />
    </div>
  )
}
