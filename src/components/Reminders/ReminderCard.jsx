import { useState } from 'react'
import { Edit2, Trash2, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { formatDateTime } from '../../utils/format'
import { listItemVariants } from '../../utils/animations'
import ReminderForm from './ReminderForm'

export default function ReminderCard({ reminder, index = 0 }) {
  const { updateReminder, deleteReminder } = useApp()
  const [editing, setEditing] = useState(false)

  const isPast = reminder.time && new Date(reminder.time) < new Date()
  const toggle = () => updateReminder(reminder.id, { enabled: !reminder.enabled })

  return (
    <>
      <motion.div
        className="card card-sm"
        variants={listItemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        custom={index}
        style={{
          '--reminder-accent': reminder.enabled && !isPast ? 'var(--warning)' : 'var(--border)',
          borderLeft: '4px solid var(--reminder-accent)',
          filter: isPast ? 'grayscale(0.4)' : 'none',
          opacity: reminder.enabled ? 1 : 0.7,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 500, fontSize: 14 }}>{reminder.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span>{formatDateTime(reminder.time)}</span>
              {reminder.repeat !== 'none' && (
                <span className="badge badge-muted"><RotateCcw size={9} /> {reminder.repeat}</span>
              )}
              {isPast && <span className="badge badge-muted">Past</span>}
            </div>
            {reminder.note && <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{reminder.note}</p>}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
            <div
              className={`toggle ${reminder.enabled ? 'on' : ''}`}
              style={{ '--toggle-accent': 'var(--warning)' }}
              onClick={toggle}
            />
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setEditing(true)} style={{ padding: 4 }}>
              <Edit2 size={13} />
            </button>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => deleteReminder(reminder.id)} style={{ padding: 4, color: 'var(--danger)' }}>
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {editing && <ReminderForm reminder={reminder} onClose={() => setEditing(false)} />}
      </AnimatePresence>
    </>
  )
}
