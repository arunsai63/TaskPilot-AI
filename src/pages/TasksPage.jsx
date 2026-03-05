import { useState } from 'react'
import { Plus, Search, Filter, CheckCircle, Circle, Loader } from 'lucide-react'
import { useApp } from '../context/AppContext'
import TaskCard from '../components/Tasks/TaskCard'
import TaskForm from '../components/Tasks/TaskForm'

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
  if (sortBy === 'priority') filtered = [...filtered].sort((a,b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
  else if (sortBy === 'due') filtered = [...filtered].sort((a,b) => {
    if (!a.dueDate) return 1; if (!b.dueDate) return -1
    return new Date(a.dueDate) - new Date(b.dueDate)
  })

  const counts = {
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length
  }

  return (
    <div style={{ maxWidth:720, margin:'0 auto', padding:'24px 16px' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
        <div>
          <h2 style={{ fontSize:18, fontWeight:600 }}>Tasks</h2>
          <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>
            {counts.todo} todo · {counts.in_progress} active · {counts.done} done
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={15} /> New Task
        </button>
      </div>

      {/* Search + sort */}
      <div style={{ display:'flex', gap:8, marginBottom:14, flexWrap:'wrap' }}>
        <div style={{ flex:1, minWidth:160, position:'relative' }}>
          <Search size={14} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)', pointerEvents:'none' }} />
          <input className="input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks..." style={{ paddingLeft:30 }} />
        </div>
        <select className="input" style={{ width:'auto' }} value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="created">Newest</option>
          <option value="priority">Priority</option>
          <option value="due">Due date</option>
        </select>
      </div>

      {/* Filter tabs */}
      <div className="tabs" style={{ marginBottom:16 }}>
        {FILTERS.map(f => (
          <button key={f.key} className={`tab ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Task list */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <CheckCircle size={36} />
          <div style={{ fontWeight:500 }}>{tasks.length === 0 ? 'No tasks yet' : 'No matching tasks'}</div>
          <div style={{ fontSize:13 }}>
            {tasks.length === 0 ? 'Create your first task to get started.' : 'Try adjusting your search or filter.'}
          </div>
          {tasks.length === 0 && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              <Plus size={14} /> Add First Task
            </button>
          )}
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {filtered.map(task => <TaskCard key={task.id} task={task} />)}
        </div>
      )}

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </div>
  )
}
