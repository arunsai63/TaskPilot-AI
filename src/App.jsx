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
    <div style={{
      position:'fixed', bottom:76, left:'50%', transform:'translateX(-50%)',
      background:'var(--bg-card)', border:'1px solid var(--border)',
      borderRadius:'var(--radius-lg)', padding:'12px 16px',
      display:'flex', alignItems:'center', gap:10, zIndex:500,
      boxShadow:'var(--shadow-lg)', maxWidth:360, width:'calc(100% - 32px)',
      animation:'fadeIn 300ms ease'
    }}>
      <Download size={16} style={{ color:'var(--accent)', flexShrink:0 }} />
      <span style={{ fontSize:13, flex:1 }}>Install TaskPilot for offline access</span>
      <button className="btn btn-primary btn-sm" onClick={() => { prompt.prompt(); setShown(false) }}>Install</button>
      <button className="btn btn-ghost btn-sm" onClick={() => setShown(false)}>Later</button>
    </div>
  )
}

function AppShell() {
  const [active, setActive] = useState('timer')
  const ActivePage = NAV.find(n => n.key === active)?.page || TimerPage

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
      {/* Header */}
      <header style={{
        background:'var(--bg-secondary)', borderBottom:'1px solid var(--border)',
        padding:'0 16px', height:52, display:'flex', alignItems:'center',
        justifyContent:'space-between', position:'sticky', top:0, zIndex:100
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{
            width:28, height:28, borderRadius:7, background:'var(--accent)',
            display:'flex', alignItems:'center', justifyContent:'center'
          }}>
            <Timer size={15} color="#fff" />
          </div>
          <span style={{ fontWeight:700, fontSize:15, letterSpacing:'-0.3px' }}>TaskPilot</span>
        </div>
        {/* Desktop nav */}
        <nav style={{ display:'flex', gap:2 }} className="desktop-nav">
          {NAV.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              style={{
                padding:'6px 12px', borderRadius:'var(--radius-sm)', border:'none',
                background: active === key ? 'var(--accent-subtle)' : 'transparent',
                color: active === key ? 'var(--accent)' : 'var(--text-muted)',
                fontFamily:'inherit', fontSize:13, fontWeight:500, cursor:'pointer',
                display:'flex', alignItems:'center', gap:6, transition:'all 150ms'
              }}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main content */}
      <main style={{ flex:1, overflowY:'auto', paddingBottom:72 }}>
        <ActivePage />
      </main>

      {/* Bottom nav (mobile) */}
      <nav style={{
        position:'fixed', bottom:0, left:0, right:0,
        background:'var(--bg-secondary)', borderTop:'1px solid var(--border)',
        display:'flex', zIndex:100
      }}>
        {NAV.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            style={{
              flex:1, padding:'8px 4px', border:'none',
              background:'transparent', color: active === key ? 'var(--accent)' : 'var(--text-muted)',
              fontFamily:'inherit', fontSize:10, fontWeight:500, cursor:'pointer',
              display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              transition:'color 150ms'
            }}
          >
            <Icon size={18} strokeWidth={active === key ? 2.5 : 2} />
            {label}
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
