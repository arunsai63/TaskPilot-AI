import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, Square, Clock } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatDuration, getDayKey } from '../../utils/format'
import EnsoRipple from '../EnsoRipple'
import KanjiMark from '../KanjiMark'

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
    ? `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    : `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div className="card" style={{ textAlign: 'center', padding: '32px 20px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div className="section-label">Free-form Focus Session</div>
          <KanjiMark char="禅" size={48} style={{ color: 'var(--text-muted)', opacity: 0.7 }} />
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <EnsoRipple active={running} />
          <div style={{
            fontFamily: "'DM Mono', 'JetBrains Mono', monospace",
            fontSize: 80,
            fontWeight: 500,
            color: running ? 'var(--focus-color)' : 'var(--text-primary)',
            letterSpacing: '-3px',
            lineHeight: 1,
            marginBottom: 16,
            fontVariantNumeric: 'tabular-nums',
            transition: 'color 300ms',
            textShadow: running ? '0 0 40px var(--focus-glow)' : 'none',
            position: 'relative',
            zIndex: 1,
          }}>
            {display}
          </div>
        </div>
        {running && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
            <span className="status-dot-pulse" />
            Session in progress
          </div>
        )}
        {!running && elapsed === 0 && (
          <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Ready to start</div>
        )}
        {!running && elapsed > 0 && (
          <div style={{ fontSize: 12, color: 'var(--success)', marginBottom: 8 }}>
            Session saved! {Math.floor(elapsed / 60)}m logged.
          </div>
        )}
      </div>

      <AnimatePresence>
        {!running && (
          <motion.div
            className="card card-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="section-label" style={{ marginBottom: 12 }}>Session Setup</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
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
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', gap: 10 }}>
        {!running ? (
          <button
            className="btn btn-lg w-full"
            style={{
              borderRadius: 'var(--radius-lg)',
              height: 56,
              background: 'linear-gradient(135deg, var(--focus-color) 0%, var(--focus-dark) 100%)',
              boxShadow: '0 4px 24px var(--focus-glow)',
              border: 'none',
              color: '#fff',
            }}
            onClick={start}
          >
            <Play size={18} /> Start Session
          </button>
        ) : (
          <button
            className="btn btn-lg w-full"
            style={{ background: 'var(--danger-subtle)', color: 'var(--danger)', borderColor: 'var(--danger)' }}
            onClick={stop}
          >
            <Square size={18} /> Stop & Save
          </button>
        )}
      </div>

      <div className="card card-sm" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ padding: 8, borderRadius: 'var(--radius-sm)', background: 'var(--accent-subtle)', color: 'var(--accent)', flexShrink: 0 }}>
          <Clock size={16} />
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{formatDuration(todayMinutes)}</div>
          <div className="section-label" style={{ marginTop: 4 }}>Today's total</div>
        </div>
      </div>
    </div>
  )
}
