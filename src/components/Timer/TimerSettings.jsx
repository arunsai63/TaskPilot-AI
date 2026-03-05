import { useState } from 'react'
import { X, Settings } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function TimerSettings({ onClose }) {
  const { timerSettings, updateTimerSettings } = useApp()
  const [form, setForm] = useState({ ...timerSettings })

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const save = () => {
    updateTimerSettings(form)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title" style={{ display:'flex', alignItems:'center', gap:8 }}>
            <Settings size={16} /> Timer Settings
          </span>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          <div>
            <label style={{ display:'block', marginBottom:6, fontSize:12, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.5px' }}>Session Label</label>
            <input className="input" value={form.sessionLabel} onChange={e => set('sessionLabel', e.target.value)} placeholder="Focus Session" />
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
            {[
              { key: 'focusDuration', label: 'Focus (min)', min: 1, max: 120 },
              { key: 'shortBreakDuration', label: 'Short Break', min: 1, max: 30 },
              { key: 'longBreakDuration', label: 'Long Break', min: 1, max: 60 },
            ].map(({ key, label, min, max }) => (
              <div key={key}>
                <label style={{ display:'block', marginBottom:6, fontSize:12, color:'var(--text-muted)' }}>{label}</label>
                <input
                  className="input"
                  type="number"
                  min={min} max={max}
                  value={form[key]}
                  onChange={e => set(key, Math.max(min, Math.min(max, +e.target.value)))}
                />
              </div>
            ))}
          </div>

          <div>
            <label style={{ display:'block', marginBottom:6, fontSize:12, color:'var(--text-muted)' }}>Long break after (sessions)</label>
            <input
              className="input"
              type="number" min={1} max={10}
              value={form.sessionsBeforeLongBreak}
              onChange={e => set('sessionsBeforeLongBreak', Math.max(1, Math.min(10, +e.target.value)))}
            />
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { key: 'autoStartBreaks', label: 'Auto-start breaks' },
              { key: 'autoStartFocus', label: 'Auto-start next focus session' },
              { key: 'soundEnabled', label: 'Sound alerts' },
              { key: 'notificationsEnabled', label: 'Browser notifications' },
            ].map(({ key, label }) => (
              <label key={key} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                <div
                  style={{
                    width:36, height:20, borderRadius:10, background: form[key] ? 'var(--accent)' : 'var(--border)',
                    position:'relative', transition:'background 150ms', flexShrink:0, cursor:'pointer'
                  }}
                  onClick={() => set(key, !form[key])}
                >
                  <div style={{
                    position:'absolute', top:2, left: form[key] ? 18 : 2,
                    width:16, height:16, borderRadius:'50%', background:'#fff',
                    transition:'left 150ms', boxShadow:'0 1px 3px rgba(0,0,0,0.3)'
                  }} />
                </div>
                <span style={{ color:'var(--text-secondary)', fontSize:13 }}>{label}</span>
              </label>
            ))}
          </div>

          <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:4 }}>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  )
}
