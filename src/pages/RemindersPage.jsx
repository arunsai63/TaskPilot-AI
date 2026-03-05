import { useState, useEffect } from 'react'
import { Plus, Bell, BellOff } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { useNotifications } from '../hooks/useNotifications'
import ReminderCard from '../components/Reminders/ReminderCard'
import ReminderForm from '../components/Reminders/ReminderForm'

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

  const upcoming = reminders.filter(r => r.time && new Date(r.time) >= new Date()).sort((a,b) => new Date(a.time) - new Date(b.time))
  const past = reminders.filter(r => !r.time || new Date(r.time) < new Date())

  return (
    <div style={{ maxWidth:620, margin:'0 auto', padding:'24px 16px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:18, fontWeight:600 }}>Reminders</h2>
          <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>
            {upcoming.length} upcoming
          </div>
        </div>
        <div style={{ display:'flex', gap:8 }}>
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
        <div className="card card-sm" style={{ borderColor:'var(--warning)', background:'var(--warning-subtle)', marginBottom:16 }}>
          <div style={{ display:'flex', gap:8, alignItems:'center', color:'var(--warning)', fontSize:13 }}>
            <BellOff size={14} />
            Notifications are blocked. Enable them in your browser settings for reminders to work.
          </div>
        </div>
      )}

      {reminders.length === 0 ? (
        <div className="empty-state">
          <Bell size={36} />
          <div style={{ fontWeight:500 }}>No reminders yet</div>
          <div style={{ fontSize:13 }}>Set reminders to stay on track.</div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={14} /> Add Reminder
          </button>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {upcoming.length > 0 && (
            <div>
              <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' }}>Upcoming</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {upcoming.map(r => <ReminderCard key={r.id} reminder={r} />)}
              </div>
            </div>
          )}
          {past.length > 0 && (
            <div>
              <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:8, textTransform:'uppercase', letterSpacing:'0.5px' }}>Past</div>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {past.map(r => <ReminderCard key={r.id} reminder={r} />)}
              </div>
            </div>
          )}
        </div>
      )}

      {showForm && <ReminderForm onClose={() => setShowForm(false)} />}
    </div>
  )
}
