import { useState, useEffect } from 'react'
import { Plus, Bell, BellOff } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useNotifications } from '../hooks/useNotifications'
import ReminderCard from '../components/Reminders/ReminderCard'
import ReminderForm from '../components/Reminders/ReminderForm'
import FloatingLantern from '../components/FloatingLantern'

export default function RemindersPage() {
  const { reminders } = useApp()
  const { permission, request, notify } = useNotifications()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (permission !== 'granted') return
    const interval = setInterval(() => {
      const now = new Date()
      reminders.forEach(r => {
        if (!r.enabled || !r.time) return
        const t = new Date(r.time)
        const diff = Math.abs(now - t) / 1000
        if (diff < 30) notify(r.title, { body: r.note || 'Reminder!' })
      })
    }, 30000)
    return () => clearInterval(interval)
  }, [reminders, permission, notify])

  const upcoming = reminders.filter(r => r.time && new Date(r.time) >= new Date()).sort((a, b) => new Date(a.time) - new Date(b.time))
  const past = reminders.filter(r => !r.time || new Date(r.time) < new Date())

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, overflow: 'hidden' }}>
        {/* Torii gate watermark */}
        <svg
          viewBox="0 0 120 90"
          width={120}
          aria-hidden="true"
          style={{ position: 'absolute', right: 0, top: -10, opacity: 0.11, pointerEvents: 'none' }}
        >
          {/* Left pillar */}
          <rect x="26" y="38" width="5" height="52" fill="var(--sakura)" rx="1" opacity="0.9" />
          {/* Right pillar */}
          <rect x="89" y="38" width="5" height="52" fill="var(--sakura)" rx="1" opacity="0.9" />
          {/* Kasagi — curved top beam */}
          <path d="M14 46 Q28 34 60 32 Q92 34 106 46" stroke="var(--sakura)" strokeWidth="5.5" fill="none" strokeLinecap="round" opacity="0.9" />
          {/* Shimagi — extra top cap */}
          <path d="M10 38 Q60 22 110 38" stroke="var(--sakura)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
          {/* Nuki — second horizontal beam */}
          <line x1="26" y1="58" x2="94" y2="58" stroke="var(--sakura)" strokeWidth="3.5" opacity="0.8" />
          {/* Connector tabs */}
          <rect x="23" y="54" width="5" height="8" fill="var(--sakura)" opacity="0.55" />
          <rect x="92" y="54" width="5" height="8" fill="var(--sakura)" opacity="0.55" />
          {/* Moon above torii */}
          <circle cx="60" cy="16" r="10" fill="none" stroke="var(--text-primary)" strokeWidth="1.5" opacity="0.5" />
          <circle cx="60" cy="16" r="7" fill="var(--text-primary)" opacity="0.3" />
        </svg>
        <div>
          <h2 className="page-title">Reminders</h2>
          <p className="page-subtitle">{upcoming.length} upcoming</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {permission !== 'granted' && (
            <button className="btn btn-secondary btn-sm" onClick={request}>
              <Bell size={13} /> Enable Notifications
            </button>
          )}
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={15} /> New Reminder
          </button>
        </div>
      </div>

      {permission === 'denied' && (
        <div className="card card-sm" style={{ borderColor: 'var(--warning)', background: 'var(--warning-subtle)', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--warning)', fontSize: 13 }}>
            <BellOff size={14} />
            Notifications are blocked. Enable them in your browser settings for reminders to work.
          </div>
        </div>
      )}

      {reminders.length === 0 ? (
        <div className="empty-state">
          <FloatingLantern width={60} />
          <div style={{ fontWeight: 500 }}>No reminders yet</div>
          <div style={{ fontSize: 13 }}>Set reminders to stay on track.</div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={14} /> Add Reminder
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {upcoming.length > 0 && (
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>Upcoming</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <AnimatePresence>
                  {upcoming.map((r, i) => <ReminderCard key={r.id} reminder={r} index={i} />)}
                </AnimatePresence>
              </div>
            </div>
          )}
          {past.length > 0 && (
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}>Past</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <AnimatePresence>
                  {past.map((r, i) => <ReminderCard key={r.id} reminder={r} index={i} />)}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {showForm && <ReminderForm onClose={() => setShowForm(false)} />}
      </AnimatePresence>
    </div>
  )
}
