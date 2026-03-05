import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import TaskCard from '../components/Tasks/TaskCard'
import TaskForm from '../components/Tasks/TaskForm'
import OrigamiCraneScene from '../components/OrigamiCraneScene'
import KanjiMark from '../components/KanjiMark'

function BambooGrove() {
  const stalks = [
    { x: 18,  h: 130, nodes: [100, 72, 44], leafDir: 1,  delay: '0s',    dur: '5s'   },
    { x: 52,  h: 150, nodes: [118, 86, 54], leafDir: -1, delay: '1.3s',  dur: '4.2s' },
    { x: 86,  h: 120, nodes: [92,  64, 38], leafDir: 1,  delay: '0.7s',  dur: '5.8s' },
    { x: 116, h: 140, nodes: [108, 78, 48], leafDir: -1, delay: '2.1s',  dur: '4.8s' },
  ]
  return (
    <svg
      viewBox="0 0 140 160"
      width={140}
      aria-hidden="true"
      style={{ position: 'absolute', right: 56, top: -10, opacity: 0.10, pointerEvents: 'none' }}
    >
      {stalks.map((s, si) => (
        <g key={si} className="bamboo-leaf" style={{ animationDuration: s.dur, animationDelay: s.delay }}>
          {/* Stalk */}
          <line x1={s.x} y1={160} x2={s.x} y2={160 - s.h} stroke="var(--long-break-color)" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
          {/* Nodes */}
          {s.nodes.map((ny, ni) => (
            <rect key={ni} x={s.x - 4} y={ny} width="8" height="3" rx="1.5" fill="var(--long-break-color)" opacity="0.5" />
          ))}
          {/* Leaves */}
          <path
            d={`M${s.x} ${s.nodes[0] - 2} C${s.x + s.leafDir * 18} ${s.nodes[0] - 14}, ${s.x + s.leafDir * 32} ${s.nodes[0] - 8}, ${s.x + s.leafDir * 36} ${s.nodes[0] - 18}`}
            stroke="var(--long-break-color)" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.6"
          />
          <path
            d={`M${s.x} ${s.nodes[1] - 2} C${s.x - s.leafDir * 14} ${s.nodes[1] - 10}, ${s.x - s.leafDir * 28} ${s.nodes[1] - 6}, ${s.x - s.leafDir * 30} ${s.nodes[1] - 16}`}
            stroke="var(--long-break-color)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"
          />
        </g>
      ))}
    </svg>
  )
}

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'todo', label: 'To Do' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'done', label: 'Done' }
]

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

export default function TasksPage() {
  const { tasks } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('created')

  let filtered = tasks
  if (filter !== 'all') filtered = filtered.filter(t => t.status === filter)
  if (search) filtered = filtered.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.description?.toLowerCase().includes(search.toLowerCase()) ||
    t.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  )
  if (sortBy === 'priority') filtered = [...filtered].sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  else if (sortBy === 'due') filtered = [...filtered].sort((a, b) => {
    if (!a.dueDate) return 1; if (!b.dueDate) return -1
    return new Date(a.dueDate) - new Date(b.dueDate)
  })

  const counts = {
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, overflow: 'hidden' }}>
        <div>
          <h2 className="page-title">Tasks</h2>
          <p className="page-subtitle">{counts.todo} todo · {counts.in_progress} active · {counts.done} done</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={15} /> New Task
        </button>
        <BambooGrove />
        <KanjiMark char="務" size={72} style={{ position: 'absolute', right: 0, top: 0, color: 'var(--text-muted)', opacity: 0.7 }} />
      </div>

      {/* Search + sort */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 160, position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." style={{ paddingLeft: 30 }} />
        </div>
        <select className="input" style={{ width: 'auto' }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="created">Newest</option>
          <option value="priority">Priority</option>
          <option value="due">Due date</option>
        </select>
      </div>

      {/* Filter tabs */}
      <div className="mode-tabs" style={{ marginBottom: 16 }}>
        {FILTERS.map(f => (
          <button key={f.key} className={`mode-tab ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
            {f.label}
            {f.key !== 'all' && counts[f.key] > 0 && (
              <span style={{ marginLeft: 4, fontSize: 11, background: 'var(--bg-elevated)', borderRadius: 'var(--radius-full)', padding: '1px 6px' }}>
                {counts[f.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Task list */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <OrigamiCraneScene width={160} />
          <div style={{ fontWeight: 500 }}>{tasks.length === 0 ? 'No tasks yet' : 'No matching tasks'}</div>
          <div style={{ fontSize: 13 }}>
            {tasks.length === 0 ? 'Create your first task to get started.' : 'Try adjusting your search or filter.'}
          </div>
          {tasks.length === 0 && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              <Plus size={14} /> Add First Task
            </button>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <AnimatePresence>
            {filtered.map((task, i) => (
              <TaskCard key={task.id} task={task} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {showForm && <TaskForm onClose={() => setShowForm(false)} />}
      </AnimatePresence>
    </div>
  )
}
