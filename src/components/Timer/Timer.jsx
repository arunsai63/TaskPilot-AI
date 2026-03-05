import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, RotateCcw, SkipForward, Settings, ChevronDown } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { useNotifications } from '../../hooks/useNotifications'
import { formatTime } from '../../utils/format'
import TimerRing from './TimerRing'
import TimerSettings from './TimerSettings'
import IncenseWisps from '../IncenseWisps'

function MtFujiPausedScene() {
  return (
    <svg
      viewBox="0 0 520 152"
      width="100%"
      aria-hidden="true"
      style={{ display: 'block', marginTop: 28, opacity: 0.088 }}
    >
      <circle cx={438} cy={40} r={48} fill="var(--text-primary)" opacity={0.07} />
      <circle cx={438} cy={40} r={29} fill="var(--text-primary)" opacity={0.55} />
      <path d="M0 152 L0 112 Q42 88 86 110 Q128 130 158 124 L158 152Z" fill="var(--accent)" opacity="0.45" />
      <path d="M362 124 Q402 112 448 130 Q492 148 520 134 L520 152 L362 152Z" fill="var(--accent)" opacity="0.4" />
      <path d="M260 14 C252 32, 218 80, 160 152 L360 152 C302 80 268 32 260 14Z" fill="var(--accent)" />
      <path d="M260 14 C257 26, 249 43, 237 62 L283 62 C271 43 263 26 260 14Z" fill="rgba(255,255,255,0.82)" />
      <path d="M241 58 C249 39, 255 24, 260 14 C265 24, 271 39, 279 58" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="none" />
      <rect x="398" y="110" width="4.5" height="42" fill="var(--sakura)" opacity="0.78" />
      <rect x="419" y="110" width="4.5" height="42" fill="var(--sakura)" opacity="0.78" />
      <path d="M391 114 Q401 106 412 105 Q423 106 433 114" stroke="var(--sakura)" strokeWidth="4.5" fill="none" strokeLinecap="round" opacity="0.78" />
      <line x1="398" y1="124" x2="423" y2="124" stroke="var(--sakura)" strokeWidth="2.5" opacity="0.72" />
      <rect x="396" y="121" width="3" height="6" fill="var(--sakura)" opacity="0.6" />
      <rect x="423" y="121" width="3" height="6" fill="var(--sakura)" opacity="0.6" />
      <ellipse cx="260" cy="153" rx="72" ry="5" fill="var(--accent)" opacity="0.32" />
      <line x1="204" y1="149" x2="316" y2="149" stroke="var(--accent)" strokeWidth="1" opacity="0.2" />
      <line x1="218" y1="153" x2="302" y2="153" stroke="var(--accent)" strokeWidth="0.5" opacity="0.13" />
    </svg>
  )
}

function ToriiBreakScene() {
  return (
    <svg
      viewBox="0 0 320 120"
      width="100%"
      aria-hidden="true"
      style={{ display: 'block', marginTop: 28, opacity: 0.09 }}
    >
      {/* Misty mountain layers — receding planes */}
      <path d="M0 120 L0 90 Q80 60 160 80 Q240 100 320 70 L320 120Z" fill="var(--break-color)" opacity="0.35" />
      <path d="M0 120 L0 100 Q60 80 120 95 Q180 110 240 88 Q280 74 320 85 L320 120Z" fill="var(--break-color)" opacity="0.25" />

      {/* Mist band */}
      <rect x="0" y="82" width="320" height="12" fill="var(--text-primary)" opacity="0.04" className="mist-drift" />

      {/* Moon */}
      <circle cx="272" cy="28" r="22" fill="var(--text-primary)" opacity="0.06" />
      <circle cx="272" cy="28" r="14" fill="var(--text-primary)" opacity="0.45" />

      {/* Torii gate centered */}
      {/* Left pillar */}
      <rect x="130" y="52" width="5" height="68" fill="var(--sakura)" opacity="0.78" rx="1" />
      {/* Right pillar */}
      <rect x="185" y="52" width="5" height="68" fill="var(--sakura)" opacity="0.78" rx="1" />
      {/* Kasagi — curved top beam */}
      <path d="M120 60 Q132 48 160 46 Q188 48 200 60" stroke="var(--sakura)" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.78" />
      {/* Nuki — second horizontal beam */}
      <line x1="130" y1="74" x2="190" y2="74" stroke="var(--sakura)" strokeWidth="3" opacity="0.68" />
      {/* Shimagi connector tabs */}
      <rect x="127" y="70" width="4" height="8" fill="var(--sakura)" opacity="0.55" />
      <rect x="189" y="70" width="4" height="8" fill="var(--sakura)" opacity="0.55" />

      {/* Water shimmer lines below torii */}
      <line x1="110" y1="108" x2="210" y2="108" stroke="var(--break-color)" strokeWidth="1" opacity="0.3" />
      <line x1="125" y1="113" x2="195" y2="113" stroke="var(--break-color)" strokeWidth="0.7" opacity="0.2" />
    </svg>
  )
}

const MODES = [
  { key: 'focus', label: 'Focus', settingKey: 'focusDuration', color: 'var(--focus-color)' },
  { key: 'short', label: 'Short Break', settingKey: 'shortBreakDuration', color: 'var(--break-color)' },
  { key: 'long', label: 'Long Break', settingKey: 'longBreakDuration', color: 'var(--long-break-color)' },
]

// Hardcoded rgba — CSS vars don't resolve inside SVG filter strings
const MODE_GLOW = {
  focus: 'rgba(196,158,216,0.32)',
  short: 'rgba(128,184,200,0.25)',
  long:  'rgba(144,196,160,0.25)',
}
const MODE_DARK = {
  focus: '#6b3d8a',
  short: '#1a5c6e',
  long:  '#2d6e3e',
}

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
  const [justFilledIdx, setJustFilledIdx] = useState(-1)

  const intervalRef = useRef(null)
  const prevCompleted = useRef(0)
  const mode = MODES[modeIdx]
  const totalSeconds = timerSettings[mode.settingKey] * 60
  const progress = secondsLeft / totalSeconds

  const todoTasks = tasks.filter(t => t.status !== 'done')

  useEffect(() => {
    if (!running) {
      setSecondsLeft(timerSettings[MODES[modeIdx].settingKey] * 60)
    }
  }, [timerSettings, modeIdx, running])

  useEffect(() => {
    document.title = running
      ? `${formatTime(secondsLeft)} — ${mode.label} | TaskPilot`
      : 'TaskPilot AI'
    return () => { document.title = 'TaskPilot AI' }
  }, [secondsLeft, running, mode.label])

  // Animate newly completed session dot
  useEffect(() => {
    if (completedFocusSessions > prevCompleted.current) {
      const cycleTotal = completedFocusSessions % timerSettings.sessionsBeforeLongBreak
      const idx = cycleTotal === 0 ? timerSettings.sessionsBeforeLongBreak - 1 : cycleTotal - 1
      setJustFilledIdx(idx)
      const t = setTimeout(() => setJustFilledIdx(-1), 400)
      prevCompleted.current = completedFocusSessions
      return () => clearTimeout(t)
    }
    prevCompleted.current = completedFocusSessions
  }, [completedFocusSessions, timerSettings.sessionsBeforeLongBreak])

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

  const completedInCycle = completedFocusSessions % timerSettings.sessionsBeforeLongBreak ||
    (completedFocusSessions > 0 && completedFocusSessions % timerSettings.sessionsBeforeLongBreak === 0
      ? timerSettings.sessionsBeforeLongBreak
      : 0)

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, paddingTop: 8 }}>
        {/* Mode tabs + settings in one row */}
        <div style={{ display: 'flex', alignItems: 'stretch', maxWidth: 400, width: '100%' }}>
          <div className="mode-tabs" role="tablist" style={{ flex: 1 }}>
            {MODES.map((m, i) => (
              <button
                key={m.key}
                role="tab"
                aria-selected={i === modeIdx}
                className={`mode-tab ${i === modeIdx ? 'active' : ''}`}
                style={i === modeIdx ? { color: m.color } : {}}
                onClick={() => switchMode(i)}
              >
                {m.label}
              </button>
            ))}
          </div>
          <button
            className="btn btn-ghost btn-icon"
            aria-label="Timer settings"
            style={{ flexShrink: 0, alignSelf: 'center', marginLeft: 4 }}
            onClick={() => setShowSettings(true)}
          >
            <Settings size={16} />
          </button>
        </div>

        {/* Task selector */}
        <div style={{ width: '100%', maxWidth: 400 }}>
          <label className="form-label" htmlFor="timer-task-select">Linked task</label>
          <div style={{ position: 'relative' }}>
            <select
              id="timer-task-select"
              className="input"
              value={selectedTaskId}
              onChange={e => setSelectedTaskId(e.target.value)}
              style={{ paddingRight: 32 }}
            >
              <option value="">No task linked</option>
              {todoTasks.map(t => (
                <option key={t.id} value={t.id}>{t.title}</option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          </div>
        </div>

        {/* Ring + time */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 260 }}>
          <TimerRing
            progress={progress}
            color={mode.color}
            size={260}
            strokeWidth={12}
            running={running}
            glowColor={MODE_GLOW[mode.key]}
          />
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <div style={{
              fontFamily: "'DM Mono', 'JetBrains Mono', monospace",
              fontSize: 64,
              fontWeight: 500,
              color: 'var(--text-primary)',
              letterSpacing: '-2px',
              lineHeight: 1,
              fontVariantNumeric: 'tabular-nums',
            }}>
              {formatTime(secondsLeft)}
            </div>
            <div style={{ color: mode.color, fontSize: 12, marginTop: 6, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {mode.label}
            </div>
            {completedFocusSessions > 0 && (
              <div style={{ color: 'var(--text-muted)', fontSize: 11, marginTop: 4 }}>
                {completedFocusSessions} session{completedFocusSessions > 1 ? 's' : ''} done
              </div>
            )}
          </div>
        </div>

        {/* Session dots */}
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: timerSettings.sessionsBeforeLongBreak }).map((_, i) => (
            <div
              key={i}
              style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i < completedInCycle ? 'var(--focus-color)' : 'var(--border)',
                animation: justFilledIdx === i ? 'dotPop 300ms var(--transition-bounce) both' : 'none',
                transition: 'background 300ms',
              }}
            />
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="btn btn-ghost btn-icon" aria-label="Reset timer" onClick={reset} title="Reset">
            <RotateCcw size={18} />
          </button>
          <button
            className="timer-play-btn"
            aria-label={running ? 'Pause timer' : 'Start timer'}
            style={{
              width: 72,
              height: 72,
              background: running
                ? 'var(--bg-elevated)'
                : `linear-gradient(135deg, ${mode.color} 0%, ${MODE_DARK[mode.key]} 100%)`,
              boxShadow: running ? 'var(--shadow-md)' : `0 4px 20px ${MODE_GLOW[mode.key]}`,
              border: running ? '1px solid var(--border)' : 'none',
              color: running ? 'var(--text-primary)' : '#fff',
            }}
            onClick={toggleRunning}
          >
            {running
              ? <Pause size={26} />
              : <Play size={26} style={{ marginLeft: 3 }} />
            }
          </button>
          <button className="btn btn-ghost btn-icon" aria-label="Skip to next session" onClick={skip} title="Skip">
            <SkipForward size={18} />
          </button>
        </div>

        <AnimatePresence>
          {showSettings && <TimerSettings onClose={() => setShowSettings(false)} />}
        </AnimatePresence>
      </div>

      {/* Japanese scene — reactive to timer state */}
      <div style={{ width: '100%', maxWidth: 520 }}>
        {mode.key !== 'focus' ? (
          <ToriiBreakScene />
        ) : running ? (
          <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
            <IncenseWisps running />
          </div>
        ) : (
          <MtFujiPausedScene />
        )}
      </div>
    </div>
  )
}
