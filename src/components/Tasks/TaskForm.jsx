import { useState } from 'react'
import { X, Plus } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export default function TaskForm({ onClose, task }) {
  const { addTask, updateTask } = useApp()
  const isEdit = !!task
  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    dueDate: task?.dueDate || '',
    estimatedPomodoros: task?.estimatedPomodoros || 1,
    tags: task?.tags?.join(', ') || ''
  })

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    const data = {
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      dueDate: form.dueDate || null,
      estimatedPomodoros: +form.estimatedPomodoros
    }
    if (isEdit) updateTask(task.id, data)
    else addTask(data)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{isEdit ? 'Edit Task' : 'New Task'}</span>
          <button className="btn btn-ghost btn-icon" onClick={onClose}><X size={16} /></button>
        </div>
        <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <div>
            <label style={{ display:'block', marginBottom:5, fontSize:12, color:'var(--text-muted)' }}>Title *</label>
            <input className="input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="What needs to be done?" autoFocus required />
          </div>
          <div>
            <label style={{ display:'block', marginBottom:5, fontSize:12, color:'var(--text-muted)' }}>Description</label>
            <textarea className="input" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Add details..." rows={3} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div>
              <label style={{ display:'block', marginBottom:5, fontSize:12, color:'var(--text-muted)' }}>Priority</label>
              <select className="input" value={form.priority} onChange={e => set('priority', e.target.value)}>
                <option value="high">🔴 High</option>
                <option value="medium">🟡 Medium</option>
                <option value="low">🟢 Low</option>
              </select>
            </div>
            <div>
              <label style={{ display:'block', marginBottom:5, fontSize:12, color:'var(--text-muted)' }}>Pomodoros</label>
              <input className="input" type="number" min={1} max={20} value={form.estimatedPomodoros} onChange={e => set('estimatedPomodoros', e.target.value)} />
            </div>
          </div>
          <div>
            <label style={{ display:'block', marginBottom:5, fontSize:12, color:'var(--text-muted)' }}>Due Date</label>
            <input className="input" type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)} />
          </div>
          <div>
            <label style={{ display:'block', marginBottom:5, fontSize:12, color:'var(--text-muted)' }}>Tags (comma-separated)</label>
            <input className="input" value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="work, personal, urgent" />
          </div>
          <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:4 }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary"><Plus size={14} /> {isEdit ? 'Save Changes' : 'Add Task'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
