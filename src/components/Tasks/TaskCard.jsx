import { useState } from 'react'
import { Edit2, Trash2, Check, Clock, ChevronDown, ChevronUp, Flag } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatDate, isOverdue } from '../../utils/format'
import TaskForm from './TaskForm'

const PRIORITY_COLOR = { high: 'var(--danger)', medium: 'var(--warning)', low: 'var(--success)' }
const STATUS_OPTS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
]

export default function TaskCard({ task }) {
  const { updateTask, deleteTask } = useApp()
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)

  const toggleDone = () => updateTask(task.id, { status: task.status === 'done' ? 'todo' : 'done' })
  const overdue = isOverdue(task.dueDate) && task.status !== 'done'

  return (
    <>
      <div className="card card-sm" style={{
        borderLeft: `3px solid ${PRIORITY_COLOR[task.priority]}`,
        opacity: task.status === 'done' ? 0.6 : 1,
        animation: 'fadeIn 200ms ease',
        transition: 'opacity 150ms'
      }}>
        <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
          {/* Checkbox */}
          <button
            onClick={toggleDone}
            style={{
              width:20, height:20, borderRadius:4, border:`2px solid ${task.status === 'done' ? 'var(--success)' : 'var(--border)'}`,
              background: task.status === 'done' ? 'var(--success)' : 'transparent',
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
              flexShrink:0, marginTop:1, transition:'all 150ms'
            }}
          >
            {task.status === 'done' && <Check size={12} color="#fff" />}
          </button>

          {/* Content */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
              <span style={{
                fontWeight:500, fontSize:14,
                textDecoration: task.status === 'done' ? 'line-through' : 'none',
                color: task.status === 'done' ? 'var(--text-muted)' : 'var(--text-primary)'
              }}>
                {task.title}
              </span>
              {task.status === 'in_progress' && (
                <span className="badge badge-accent">In Progress</span>
              )}
              {overdue && <span className="badge badge-danger">Overdue</span>}
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:4, flexWrap:'wrap' }}>
              {task.dueDate && (
                <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color: overdue ? 'var(--danger)' : 'var(--text-muted)' }}>
                  <Clock size={10} /> {formatDate(task.dueDate)}
                </span>
              )}
              <span style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:'var(--text-muted)' }}>
                🍅 {task.completedPomodoros}/{task.estimatedPomodoros}
              </span>
              {task.tags?.slice(0,3).map(tag => (
                <span key={tag} className="badge badge-muted">{tag}</span>
              ))}
            </div>

            {expanded && task.description && (
              <p style={{ marginTop:8, fontSize:13, color:'var(--text-secondary)', lineHeight:1.6 }}>
                {task.description}
              </p>
            )}

            {expanded && (
              <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:10 }}>
                <select
                  className="input" style={{ width:'auto', fontSize:12, padding:'3px 8px' }}
                  value={task.status}
                  onChange={e => updateTask(task.id, { status: e.target.value })}
                >
                  {STATUS_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display:'flex', gap:4, flexShrink:0 }}>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setExpanded(e => !e)} style={{ padding:4 }}>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setEditing(true)} style={{ padding:4 }}>
              <Edit2 size={13} />
            </button>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => deleteTask(task.id)} style={{ padding:4, color:'var(--danger)' }}>
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>

      {editing && <TaskForm task={task} onClose={() => setEditing(false)} />}
    </>
  )
}
