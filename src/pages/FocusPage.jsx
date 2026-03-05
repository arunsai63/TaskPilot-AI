import { useState } from 'react'
import FocusSession from '../components/Focus/FocusSession'
import Timer from '../components/Timer/Timer'

function EnsoWatermark() {
  return (
    <svg
      viewBox="0 0 340 340"
      width={340}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <circle
        cx="170" cy="170" r="155"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray="850 120"
        strokeDashoffset="80"
        opacity="0.45"
        className="enso-breathe"
      />
    </svg>
  )
}

export default function FocusPage() {
  const [mode, setMode] = useState('free')

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '24px 16px', position: 'relative' }}>
      <EnsoWatermark />
      <h2 className="page-title" style={{ marginBottom: 16, position: 'relative', zIndex: 1 }}>Focus Sessions</h2>

      <div className="mode-tabs" style={{ marginBottom: 24, position: 'relative', zIndex: 1 }}>
        <button className={`mode-tab ${mode === 'free' ? 'active' : ''}`} onClick={() => setMode('free')}>
          Free Session
        </button>
        <button className={`mode-tab ${mode === 'pomodoro' ? 'active' : ''}`} onClick={() => setMode('pomodoro')}>
          Pomodoro
        </button>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {mode === 'free' ? <FocusSession /> : <Timer />}
      </div>
    </div>
  )
}
