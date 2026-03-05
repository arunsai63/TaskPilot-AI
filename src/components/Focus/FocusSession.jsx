import { useState, useEffect, useRef } from 'react'
import { Play, Square, Clock, Target } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatDuration, formatTime, getDayKey } from '../../utils/format'

export default function FocusSession() {
  const { tasks, addSession, workLog } = useApp()
  const [running, setRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const [label, setLabel] = useState('Deep Work Session')
  const [goal, setGoal] = useState('')
  const intervalRef = useRef(null)
  const startRef = useRef(null)

  const todoTasks = tasks.filter(t => t.status !== 'done')
  const todayMinutes = workLog[getDayKey()] || 0

  useEffect(() => {
    if (running) {
      startRef.current = Date.now() - elapsed * 1000
      intervalRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000))
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const start = () => {
    setElapsed(0)
    setRunning(true)
  }

  const stop = () => {
    setRunning(false)
    if (elapsed >= 60) {
      const minutes = Math.floor(elapsed / 60)
      addSession({ type: 'focus', duration: minutes, taskId: selectedTaskId || null, label })
    }
    setElapsed(0)
  }

  const hours = Math.floor(elapsed / 3600)
  const mins = Math.floor((elapsed % 3600) / 60)
  const secs = elapsed % 60
  const display = hours > 0
    ? `${String(hours).padStart(2,'0')}:${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`
    : `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <div className="card" style={{ textAlign:'center' }}>
        <div style={{ fontSize:11, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:16 }}>
          Free-form Focus Session
        </div>
        <div style={{
          fontFamily:"'JetBrains Mono', monospace",
          fontSize: 56,
          fontWeight: 500,
          color: running ? 'var(--focus-color)' : 'var(--text-primary)',
          letterSpacing: '-2px',
          lineHeight: 1,
          marginBottom: 8,
          transition: 'color 300ms'
        }}>
          {display}
        </div>
        {running && <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:16 }}>Session in progress...</div>}
        {!running && elapsed === 0 && (
          <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:16 }}>Ready to start</div>
        )}
        {!running && elapsed > 0 && (
          <div style={{ fontSize:12, color:'var(--success)', marginBottom:16 }}>
            Session saved! {Math.floor(elapsed / 60)}m logged.
          </div>
        )}
      </div>

      {!running && (
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <input
            className="input"
            value={label}
            onChange={e => setLabel(e.target.value)}
            placeholder="Session label..."
          />
          <select className="input" value={selectedTaskId} onChange={e => setSelectedTaskId(e.target.value)}>
            <option value="">No task linked</option>
            {todoTasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
          </select>
          <input
            className="input"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="Session goal (optional)..."
          />
        </div>
      )}

      <div style={{ display:'flex', gap:10 }}>
        {!running ? (
          <button className="btn btn-primary btn-lg w-full" onClick={start}>
            <Play size={18} /> Start Session
          </button>
        ) : (
          <button
            className="btn btn-lg w-full"
            style={{ background:'var(--danger-subtle)', color:'var(--danger)', borderColor:'var(--danger)' }}
            onClick={stop}
          >
            <Square size={18} /> Stop & Save
          </button>
        )}
      </div>

      <div className="card card-sm" style={{ display:'flex', alignItems:'center', gap:12 }}>
        <Clock size={16} style={{ color:'var(--text-muted)', flexShrink:0 }} />
        <div>
          <div style={{ fontSize:13, fontWeight:500 }}>Today's total: {formatDuration(todayMinutes)}</div>
          <div style={{ fontSize:12, color:'var(--text-muted)' }}>across all sessions</div>
        </div>
      </div>
    </div>
  )
}
