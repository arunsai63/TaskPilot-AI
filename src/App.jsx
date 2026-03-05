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

const PETAL_PATH = 'M6,14 C2,10 0,7 0,5 C0,2 2,0 5,0 C5.5,0 6,0.3 6,0.3 C6,0.3 6.5,0 7,0 C10,0 12,2 12,5 C12,7 10,10 6,14 Z'

function SakuraPetals() {
  const petals = [
    { left: '4%',  delay: '0s',    dur: '16s', w: 10, h: 13, color: 'var(--sakura)',  tumbleDelay: '0s'    },
    { left: '11%', delay: '6.5s',  dur: '21s', w: 7,  h: 9,  color: 'var(--sakura)', tumbleDelay: '1.8s'  },
    { left: '19%', delay: '4.2s',  dur: '19s', w: 8,  h: 11, color: 'var(--hagi)',   tumbleDelay: '1.2s'  },
    { left: '26%', delay: '11s',   dur: '14s', w: 9,  h: 12, color: 'var(--sakura)', tumbleDelay: '0.5s'  },
    { left: '33%', delay: '7.8s',  dur: '13s', w: 11, h: 14, color: 'var(--sakura)', tumbleDelay: '0.6s'  },
    { left: '40%', delay: '3s',    dur: '22s', w: 7,  h: 9,  color: 'var(--hagi)',   tumbleDelay: '2.4s'  },
    { left: '44%', delay: '2.5s',  dur: '18s', w: 9,  h: 12, color: 'var(--sakura)', tumbleDelay: '2.1s'  },
    { left: '51%', delay: '1.8s',  dur: '17s', w: 8,  h: 10, color: 'var(--hagi)',   tumbleDelay: '0.9s'  },
    { left: '57%', delay: '14s',   dur: '12s', w: 10, h: 13, color: 'var(--sakura)', tumbleDelay: '1.1s'  },
    { left: '60%', delay: '9s',    dur: '15s', w: 10, h: 13, color: 'var(--sakura)', tumbleDelay: '1.8s'  },
    { left: '65%', delay: '10s',   dur: '15s', w: 9,  h: 12, color: 'var(--sakura)', tumbleDelay: '0.3s'  },
    { left: '72%', delay: '0.5s',  dur: '20s', w: 8,  h: 10, color: 'var(--hagi)',   tumbleDelay: '2.9s'  },
    { left: '79%', delay: '5.5s',  dur: '20s', w: 7,  h: 10, color: 'var(--sakura)', tumbleDelay: '2.7s'  },
    { left: '84%', delay: '8s',    dur: '13s', w: 10, h: 13, color: 'var(--sakura)', tumbleDelay: '0.8s'  },
    { left: '87%', delay: '13.5s', dur: '16s', w: 9,  h: 12, color: 'var(--hagi)',   tumbleDelay: '1.5s'  },
    { left: '93%', delay: '12.5s', dur: '14s', w: 10, h: 13, color: 'var(--sakura)', tumbleDelay: '0.4s'  },
  ]
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {petals.map((p, i) => (
        <svg
          key={i}
          viewBox="0 0 12 14"
          width={p.w}
          height={p.h}
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-20px',
            left: p.left,
            fill: p.color,
            animation: `sakuraFall ${p.dur} ${p.delay} infinite linear, sakuraTumble 5s ${p.tumbleDelay} ease-in-out infinite`,
            willChange: 'transform, opacity',
          }}
        >
          <path d={PETAL_PATH} />
        </svg>
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
