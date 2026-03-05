import { useState } from 'react'
import { X, Bell } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { modalOverlayVariants, modalSheetVariants, modalCenterVariants } from '../../utils/animations'

export default function ReminderForm({ onClose, reminder }) {
  const { addReminder, updateReminder } = useApp()
  const isEdit = !!reminder
  const [form, setForm] = useState({
    title: reminder?.title || '',
    time: reminder?.time || '',
    repeat: reminder?.repeat || 'none',
    note: reminder?.note || ''
  })

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.time) return
    if (isEdit) updateReminder(reminder.id, { ...form })
    else addReminder(form)
    onClose()
  }

  const isMobile = window.innerWidth < 768
  const sheetVariants = isMobile ? modalSheetVariants : modalCenterVariants

  return (
    <motion.div
      className="modal-overlay"
      variants={modalOverlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="modal"
        variants={sheetVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-handle" />
        <div className="modal-header">
          <span className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={16} /> {isEdit ? 'Edit Reminder' : 'New Reminder'}
          </span>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={16} /></button>
        </div>
        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label className="form-label">Title *</label>
            <input className="input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Reminder title..." autoFocus required />
          </div>
          <div>
            <label className="form-label">Time *</label>
            <input className="input" type="datetime-local" value={form.time} onChange={e => set('time', e.target.value)} required />
          </div>
          <div>
            <label className="form-label">Repeat</label>
            <select className="input" value={form.repeat} onChange={e => set('repeat', e.target.value)}>
              <option value="none">No repeat</option>
              <option value="daily">Daily</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
          <div>
            <label className="form-label">Note (optional)</label>
            <textarea className="input" value={form.note} onChange={e => set('note', e.target.value)} placeholder="Additional details..." rows={2} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
            <button type="submit" className="btn btn-primary btn-lg w-full">
              <Bell size={14} /> {isEdit ? 'Save' : 'Set Reminder'}
            </button>
            <button type="button" className="btn btn-ghost w-full" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
