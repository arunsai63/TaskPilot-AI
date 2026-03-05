import Timer from '../components/Timer/Timer'

export default function TimerPage() {
  return (
    <div style={{ maxWidth:520, margin:'0 auto', padding:'24px 16px' }}>
      <h2 style={{ fontSize:18, fontWeight:600, marginBottom:24, color:'var(--text-primary)' }}>Pomodoro Timer</h2>
      <div className="card" style={{ padding:32 }}>
        <Timer />
      </div>
    </div>
  )
}
