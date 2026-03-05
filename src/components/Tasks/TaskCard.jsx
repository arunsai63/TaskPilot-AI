import { useState } from 'react'
import { Edit2, Trash2, Check, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { formatDate, isOverdue } from '../../utils/format'
import { listItemVariants } from '../../utils/animations'
import TaskForm from './TaskForm'

const PRIORITY_COLOR = { high: 'var(--danger)', medium: 'var(--warning)', low: 'var(--success)' }
const PRIORITY_GLOW  = { high: '248,113,113', medium: '251,191,36', low: '52,211,153' }
const STATUS_OPTS = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
]

export default function TaskCard({ task, index = 0 }) {
  const { updateTask, deleteTask } = useApp()
  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)

  const toggleDone = () => updateTask(task.id, { status: task.status === 'done' ? 'todo' : 'done' })
  const overdue = isOverdue(task.dueDate) && task.status !== 'done'

  return (
    <>
      <motion.div
        className="card card-sm task-card"
        variants={listItemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        custom={index}
        style={{
          borderLeft: `4px solid ${PRIORITY_COLOR[task.priority]}`,
          boxShadow: `inset 4px 0 16px rgba(${PRIORITY_GLOW[task.priority]}, 0.10), var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.07)`,
          opacity: task.status === 'done' ? 0.6 : 1,
          transition: 'opacity 150ms',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          {/* Checkbox */}
          <button
            onClick={toggleDone}
            className={`task-check ${task.status === 'done' ? 'done' : ''}`}
          >
            {task.status === 'done' && <Check size={12} color="#fff" />}
          </button>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{
                fontWeight: 500,
                fontSize: 14,
                textDecoration: task.status === 'done' ? 'line-through' : 'none',
                color: task.status === 'done' ? 'var(--text-muted)' : 'var(--text-primary)'
              }}>
                {task.title}
              </span>
              {task.status === 'in_progress' && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--accent)' }}>
                  <span className="status-dot-pulse" />
                  In Progress
                </span>
              )}
              {overdue && <span className="badge badge-danger">Overdue</span>}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, flexWrap: 'wrap' }}>
              {task.dueDate && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: overdue ? 'var(--danger)' : 'var(--text-muted)' }}>
                  <Clock size={10} /> {formatDate(task.dueDate)}
                </span>
              )}
              {/* Pomodoro dots */}
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                {Array.from({ length: Math.min(task.estimatedPomodoros, 12) }).map((_, i) => (
                  <span key={i} style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: i < task.completedPomodoros ? 'var(--focus-color)' : 'var(--border)',
                    transition: 'background 300ms',
                  }} />
                ))}
              </span>
              {task.tags?.slice(0, 3).map(tag => (
                <span key={tag} className="badge badge-muted">{tag}</span>
              ))}
            </div>

            {expanded && task.description && (
              <p style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {task.description}
              </p>
            )}

            {expanded && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                <select
                  className="input" style={{ width: 'auto', fontSize: 12, padding: '3px 8px' }}
                  value={task.status}
                  onChange={e => updateTask(task.id, { status: e.target.value })}
                >
                  {STATUS_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setExpanded(e => !e)} style={{ padding: 4 }}>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => setEditing(true)} style={{ padding: 4 }}>
              <Edit2 size={13} />
            </button>
            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => deleteTask(task.id)} style={{ padding: 4, color: 'var(--danger)' }}>
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {editing && <TaskForm task={task} onClose={() => setEditing(false)} />}
      </AnimatePresence>
    </>
  )
}
