import StatsPanel from '../components/Stats/StatsPanel'
import KanjiMark from '../components/KanjiMark'

function WaveHeader() {
  return (
    <svg
      viewBox="0 0 600 50"
      width="100%"
      aria-hidden="true"
      style={{ display: 'block', marginBottom: 8, opacity: 0.07 }}
    >
      <path
        d="M0 50 L0 32 C60 14 120 44 180 24 C240 4 300 38 360 20 C420 2 480 36 540 18 L600 14 L600 50 Z"
        fill="var(--break-color)"
        opacity="0.6"
        className="wave-shift"
      />
      <path
        d="M0 32 C60 14 120 44 180 24 C240 4 300 38 360 20 C420 2 480 36 540 18 L600 14"
        stroke="var(--text-primary)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
        className="wave-shift"
      />
    </svg>
  )
}

export default function StatsPage() {
  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '24px 16px' }}>
      <WaveHeader />
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <h2 className="page-title">Stats</h2>
        <KanjiMark char="績" size={72} style={{ position: 'absolute', right: 0, top: 0, color: 'var(--text-muted)', opacity: 0.7 }} />
      </div>
      <StatsPanel />
    </div>
  )
}
