import { useState, useEffect } from 'react'
import { Plus, Bell, BellOff } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useNotifications } from '../hooks/useNotifications'
import ReminderCard from '../components/Reminders/ReminderCard'
import ReminderForm from '../components/Reminders/ReminderForm'
import SakuraBranch from '../components/SakuraBranch'

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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
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
          <SakuraBranch width={80} style={{ marginBottom: 8, opacity: 0.85 }} />
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
