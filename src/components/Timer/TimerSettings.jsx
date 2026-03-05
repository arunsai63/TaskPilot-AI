import { useState } from 'react'
import { X, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { modalOverlayVariants, modalSheetVariants, modalCenterVariants } from '../../utils/animations'

export default function TimerSettings({ onClose }) {
  const { timerSettings, updateTimerSettings } = useApp()
  const [form, setForm] = useState({ ...timerSettings })

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }))

  const save = () => {
    updateTimerSettings(form)
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
            <Settings size={16} /> Timer Settings
          </span>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label className="form-label">Session Label</label>
            <input className="input" value={form.sessionLabel} onChange={e => set('sessionLabel', e.target.value)} placeholder="Focus Session" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { key: 'focusDuration', label: 'Focus (min)', min: 1, max: 120 },
              { key: 'shortBreakDuration', label: 'Short Break', min: 1, max: 30 },
              { key: 'longBreakDuration', label: 'Long Break', min: 1, max: 60 },
            ].map(({ key, label, min, max }) => (
              <div key={key}>
                <label className="form-label">{label}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button className="btn btn-secondary btn-sm btn-icon" onClick={() => set(key, Math.max(min, form[key] - 1))}>-</button>
                  <span style={{ minWidth: 36, textAlign: 'center', fontWeight: 600 }}>{form[key]}</span>
                  <button className="btn btn-secondary btn-sm btn-icon" onClick={() => set(key, Math.min(max, form[key] + 1))}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="form-label">Long break after (sessions)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button className="btn btn-secondary btn-sm btn-icon" onClick={() => set('sessionsBeforeLongBreak', Math.max(1, form.sessionsBeforeLongBreak - 1))}>-</button>
              <span style={{ minWidth: 36, textAlign: 'center', fontWeight: 600 }}>{form.sessionsBeforeLongBreak}</span>
              <button className="btn btn-secondary btn-sm btn-icon" onClick={() => set('sessionsBeforeLongBreak', Math.min(10, form.sessionsBeforeLongBreak + 1))}>+</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { key: 'autoStartBreaks', label: 'Auto-start breaks' },
              { key: 'autoStartFocus', label: 'Auto-start next focus session' },
              { key: 'soundEnabled', label: 'Sound alerts' },
              { key: 'notificationsEnabled', label: 'Browser notifications' },
            ].map(({ key, label }) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{label}</span>
                <div className={`toggle ${form[key] ? 'on' : ''}`} onClick={() => set(key, !form[key])} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={save}>Save Settings</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
