import { useState } from 'react'
import FocusSession from '../components/Focus/FocusSession'
import Timer from '../components/Timer/Timer'

export default function FocusPage() {
  const [mode, setMode] = useState('free')

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '24px 16px' }}>
      <h2 className="page-title" style={{ marginBottom: 16 }}>Focus Sessions</h2>

      <div className="mode-tabs" style={{ marginBottom: 24 }}>
        <button className={`mode-tab ${mode === 'free' ? 'active' : ''}`} onClick={() => setMode('free')}>
          Free Session
        </button>
        <button className={`mode-tab ${mode === 'pomodoro' ? 'active' : ''}`} onClick={() => setMode('pomodoro')}>
          Pomodoro
        </button>
      </div>

      {mode === 'free' ? <FocusSession /> : <Timer />}
    </div>
  )
}
