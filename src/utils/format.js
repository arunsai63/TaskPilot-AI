export function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function formatDateTime(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function isToday(dateStr) {
  const d = new Date(dateStr)
  const now = new Date()
  return d.toDateString() === now.toDateString()
}

export function isOverdue(dateStr) {
  if (!dateStr) return false
  return new Date(dateStr) < new Date() && !isToday(dateStr)
}

export function getDayKey(date = new Date()) {
  return date.toISOString().split('T')[0]
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}
