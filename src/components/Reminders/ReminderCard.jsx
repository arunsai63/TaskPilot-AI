import { useState, useEffect } from 'react'
import { Edit2, Trash2, Bell, BellOff, RotateCcw } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatDateTime } from '../../utils/format'
import ReminderForm from './ReminderForm'

export default function ReminderCard({ reminder }) {
  const { updateReminder, deleteReminder } = useApp()
  const [editing, setEditing] = useState(false)

  const isPast = reminder.time && new Date(reminder.time) < new Date()
  const toggle = () => updateReminder(reminder.id, { enabled: !reminder.enabled })

  return (
    <>
      <div className="card card-sm" style={{
        borderLeft: `3px solid ${reminder.enabled ? (isPast ? 'var(--text-muted)' : 'var(--warning)') : 'var(--border)'}`,
        opacity: (!reminder.enabled || isPast) ? 0.6 : 1,
        animation: 'fadeIn 200ms ease'
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ color: reminder.enabled && !isPast ? 'var(--warning)' : 'var(--text-muted)', flexShrink:0 }}>
            {reminder.enabled ? <Bell size={16} /> : <BellOff size={16} />}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontWeight:500, fontSize:14 }}>{reminder.title}</div>
            <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2, display:'flex', gap:8, flexWrap:'wrap' }}>
              <span>{formatDateTime(reminder.time)}</span>
              {reminder.repeat !== 'none' && <span className="badge badge-muted"><RotateCcw size={9} /> {reminder.repeat}</span>}
              {isPast && <span className="badge badge-muted">Past</span>}
            </div>
            {reminder.note && <p style={{ fontSize:12, color:'var(--text-secondary)', marginTop:4 }}>{reminder.note}</p>}
          </div>
          <div style={{ display:'flex', gap:4, flexShrink:0 }}>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={toggle} style={{ padding:4 }}>
              {reminder.enabled ? <BellOff size={13} /> : <Bell size={13} />}
            </button>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setEditing(true)} style={{ padding:4 }}>
              <Edit2 size={13} />
            </button>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => deleteReminder(reminder.id)} style={{ padding:4, color:'var(--danger)' }}>
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
      {editing && <ReminderForm reminder={reminder} onClose={() => setEditing(false)} />}
    </>
  )
}
