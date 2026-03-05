import { useState, useEffect } from 'react'
import { Timer, CheckSquare, Zap, Bell, BarChart2, Download } from 'lucide-react'
import { AppProvider } from './context/AppContext'
import TimerPage from './pages/TimerPage'
import TasksPage from './pages/TasksPage'
import FocusPage from './pages/FocusPage'
import RemindersPage from './pages/RemindersPage'
import StatsPage from './pages/StatsPage'

const NAV = [
  { key: 'timer', label: 'Timer', icon: Timer, page: TimerPage },
  { key: 'tasks', label: 'Tasks', icon: CheckSquare, page: TasksPage },
  { key: 'focus', label: 'Focus', icon: Zap, page: FocusPage },
  { key: 'reminders', label: 'Reminders', icon: Bell, page: RemindersPage },
  { key: 'stats', label: 'Stats', icon: BarChart2, page: StatsPage },
]

function InstallPrompt() {
  const [prompt, setPrompt] = useState(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setPrompt(e); setShown(true) }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!shown || !prompt) return null

  return (
    <div className="install-prompt">
      <Download size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
      <span style={{ fontSize: 13, flex: 1 }}>Install TaskPilot for offline access</span>
      <button className="btn btn-primary btn-sm" onClick={() => { prompt.prompt(); setShown(false) }}>Install</button>
      <button className="btn btn-ghost btn-sm" onClick={() => setShown(false)}>Later</button>
    </div>
  )
}

function SakuraPetals() {
  const petals = [
    { left: '7%',  delay: '0s',    dur: '16s', size: 10 },
    { left: '19%', delay: '4.2s',  dur: '19s', size: 7  },
    { left: '33%', delay: '7.8s',  dur: '13s', size: 11 },
    { left: '51%', delay: '1.8s',  dur: '17s', size: 8  },
    { left: '65%', delay: '10s',   dur: '15s', size: 9  },
    { left: '79%', delay: '5.5s',  dur: '20s', size: 7  },
    { left: '93%', delay: '12.5s', dur: '14s', size: 10 },
  ]
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {petals.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-20px',
            left: p.left,
            width: p.size,
            height: p.size * 1.3,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            background: 'var(--sakura)',
            animation: `sakuraFall ${p.dur} ${p.delay} infinite linear`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  )
}

function AppShell() {
  const [active, setActive] = useState('timer')
  const ActivePage = NAV.find(n => n.key === active)?.page || TimerPage

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <SakuraPetals />
      {/* Header */}
      <header style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0 16px',
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: 'var(--gradient-accent)',
            boxShadow: '0 2px 8px var(--accent-glow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Timer size={15} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '-0.3px' }}>TaskPilot</span>
        </div>
        {/* Desktop nav */}
        <nav className="desktop-nav">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              className={`nav-btn ${active === key ? 'active' : ''}`}
              onClick={() => setActive(key)}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main key={active} className="main-content page-enter">
        <ActivePage />
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="bottom-nav">
        {NAV.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`bottom-nav-btn ${active === key ? 'active' : ''}`}
            onClick={() => setActive(key)}
          >
            {active === key && <span className="nav-indicator" />}
            <Icon size={18} strokeWidth={active === key ? 2.5 : 2} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <InstallPrompt />
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}
