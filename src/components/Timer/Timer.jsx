import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, SkipForward, Settings, ChevronDown } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useNotifications } from '../../hooks/useNotifications'
import { formatTime } from '../../utils/format'
import TimerRing from './TimerRing'
import TimerSettings from './TimerSettings'

const MODES = [
  { key: 'focus', label: 'Focus', settingKey: 'focusDuration', color: 'var(--focus-color)' },
  { key: 'short', label: 'Short Break', settingKey: 'shortBreakDuration', color: 'var(--break-color)' },
  { key: 'long', label: 'Long Break', settingKey: 'longBreakDuration', color: 'var(--long-break-color)' },
]

function playBeep(type = 'end') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = type === 'end' ? 880 : 440
    osc.type = 'sine'
    gain.gain.setValueAtTime(0.3, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
    osc.start()
    osc.stop(ctx.currentTime + 0.8)
  } catch {}
}

export default function Timer() {
  const { timerSettings, addSession, tasks } = useApp()
  const { notify, request: requestNotif } = useNotifications()

  const [modeIdx, setModeIdx] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(timerSettings.focusDuration * 60)
  const [running, setRunning] = useState(false)
  const [completedFocusSessions, setCompletedFocusSessions] = useState(0)
  const [showSettings, setShowSettings] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState('')
  const [sessionStartTime, setSessionStartTime] = useState(null)

  const intervalRef = useRef(null)
  const mode = MODES[modeIdx]
  const totalSeconds = timerSettings[mode.settingKey] * 60
  const progress = secondsLeft / totalSeconds

  const todoTasks = tasks.filter(t => t.status !== 'done')

  // Reset timer when settings or mode changes
  useEffect(() => {
    if (!running) {
      setSecondsLeft(timerSettings[MODES[modeIdx].settingKey] * 60)
    }
  }, [timerSettings, modeIdx, running])

  // Update document title
  useEffect(() => {
    document.title = running
      ? `${formatTime(secondsLeft)} — ${mode.label} | TaskPilot`
      : 'TaskPilot AI'
    return () => { document.title = 'TaskPilot AI' }
  }, [secondsLeft, running, mode.label])

  const handleSessionComplete = useCallback(() => {
    const isFocus = mode.key === 'focus'
    if (timerSettings.soundEnabled) playBeep('end')
    if (timerSettings.notificationsEnabled) {
      const msg = isFocus ? 'Focus session complete! Take a break.' : 'Break over! Time to focus.'
      notify('TaskPilot', { body: msg })
    }

    if (isFocus) {
      const duration = timerSettings.focusDuration
      addSession({ type: 'focus', duration, taskId: selectedTaskId || null, label: timerSettings.sessionLabel })
      if (selectedTaskId) {
        // Increment task pomodoro counter handled via context
      }
      const newCount = completedFocusSessions + 1
      setCompletedFocusSessions(newCount)

      const isLongBreak = newCount % timerSettings.sessionsBeforeLongBreak === 0
      const nextModeIdx = isLongBreak ? 2 : 1
      setModeIdx(nextModeIdx)
      setSecondsLeft(timerSettings[MODES[nextModeIdx].settingKey] * 60)
      setRunning(timerSettings.autoStartBreaks)
    } else {
      addSession({ type: mode.key === 'short' ? 'short_break' : 'long_break', duration: timerSettings[mode.settingKey] })
      setModeIdx(0)
      setSecondsLeft(timerSettings.focusDuration * 60)
      setRunning(timerSettings.autoStartFocus)
    }
    setSessionStartTime(null)
  }, [mode, timerSettings, completedFocusSessions, selectedTaskId, addSession, notify])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current)
            setRunning(false)
            handleSessionComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, handleSessionComplete])

  const toggleRunning = () => {
    if (!running && Notification.permission === 'default' && timerSettings.notificationsEnabled) {
      requestNotif()
    }
    if (!running && !sessionStartTime) setSessionStartTime(new Date())
    setRunning(r => !r)
  }

  const reset = () => {
    setRunning(false)
    setSecondsLeft(timerSettings[mode.settingKey] * 60)
    setSessionStartTime(null)
  }

  const skip = () => {
    setRunning(false)
    handleSessionComplete()
  }

  const switchMode = (idx) => {
    setRunning(false)
    setModeIdx(idx)
    setSecondsLeft(timerSettings[MODES[idx].settingKey] * 60)
    setSessionStartTime(null)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:24 }}>
      {/* Mode tabs */}
      <div className="tabs" style={{ width:'100%', maxWidth:400 }}>
        {MODES.map((m, i) => (
          <button key={m.key} className={`tab ${i === modeIdx ? 'active' : ''}`} onClick={() => switchMode(i)}>
            {m.label}
          </button>
        ))}
      </div>

      {/* Task selector */}
      <div style={{ width:'100%', maxWidth:400 }}>
        <div style={{ position:'relative' }}>
          <select
            className="input"
            value={selectedTaskId}
            onChange={e => setSelectedTaskId(e.target.value)}
            style={{ paddingRight:32 }}
          >
            <option value="">No task linked</option>
            {todoTasks.map(t => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
          <ChevronDown size={14} style={{ position:'absolute', right:10, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', pointerEvents:'none' }} />
        </div>
      </div>

      {/* Ring + time */}
      <div style={{ position:'relative', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
        <TimerRing progress={progress} color={mode.color} size={260} strokeWidth={10} />
        <div style={{ position:'absolute', textAlign:'center' }}>
          <div style={{
            fontFamily:"'JetBrains Mono', monospace",
            fontSize: 54,
            fontWeight: 500,
            color: 'var(--text-primary)',
            letterSpacing: '-2px',
            lineHeight: 1
          }}>
            {formatTime(secondsLeft)}
          </div>
          <div style={{ color: mode.color, fontSize: 12, marginTop: 6, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            {mode.label}
          </div>
          {completedFocusSessions > 0 && (
            <div style={{ color:'var(--text-muted)', fontSize:11, marginTop:4 }}>
              {completedFocusSessions} session{completedFocusSessions > 1 ? 's' : ''} done
            </div>
          )}
        </div>
      </div>

      {/* Session dots */}
      <div style={{ display:'flex', gap:6 }}>
        {Array.from({ length: timerSettings.sessionsBeforeLongBreak }).map((_, i) => (
          <div key={i} style={{
            width: 8, height: 8, borderRadius:'50%',
            background: i < (completedFocusSessions % timerSettings.sessionsBeforeLongBreak || (completedFocusSessions > 0 && completedFocusSessions % timerSettings.sessionsBeforeLongBreak === 0 ? timerSettings.sessionsBeforeLongBreak : 0))
              ? 'var(--focus-color)' : 'var(--border)'
          }} />
        ))}
      </div>

      {/* Controls */}
      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        <button className="btn btn-ghost btn-icon" onClick={reset} title="Reset">
          <RotateCcw size={18} />
        </button>
        <button
          className="btn btn-primary btn-lg"
          style={{
            background: running ? 'var(--bg-secondary)' : mode.color,
            borderColor: running ? 'var(--border)' : mode.color,
            minWidth: 120,
            fontSize: 15,
            fontWeight: 600
          }}
          onClick={toggleRunning}
        >
          {running ? <><Pause size={18} /> Pause</> : <><Play size={18} /> {secondsLeft === totalSeconds ? 'Start' : 'Resume'}</>}
        </button>
        <button className="btn btn-ghost btn-icon" onClick={skip} title="Skip">
          <SkipForward size={18} />
        </button>
      </div>

      {/* Settings button */}
      <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(true)} style={{ color:'var(--text-muted)' }}>
        <Settings size={13} /> Customize Timer
      </button>

      {showSettings && <TimerSettings onClose={() => setShowSettings(false)} />}
    </div>
  )
}
