import { TrendingUp, Clock, Zap, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../../context/AppContext'
import { formatDuration, getDayKey } from '../../utils/format'
import { useCountUp } from '../../hooks/useCountUp'
import { statCardVariants } from '../../utils/animations'

function StatCard({ icon, label, value, rawValue, color, index }) {
  const counted = useCountUp(typeof rawValue === 'number' ? rawValue : 0)
  const displayValue = typeof rawValue === 'number' ? counted + (value.replace(String(rawValue), '') || '') : value

  return (
    <motion.div
      className="card card-sm"
      variants={statCardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div style={{
        padding: 8,
        borderRadius: 'var(--radius-sm)',
        background: `color-mix(in srgb, ${color} 15%, transparent)`,
        color,
        width: 'fit-content'
      }}>
        {icon}
      </div>
      <div>
        <div className="stat-value" style={{ color }}>{displayValue}</div>
        <div className="section-label" style={{ marginTop: 4 }}>{label}</div>
      </div>
    </motion.div>
  )
}

function MtFuji() {
  return (
    <svg
      viewBox="0 0 500 120"
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        opacity: 0.055,
        pointerEvents: 'none',
        color: 'var(--accent)',
      }}
    >
      {/* Background peaks */}
      <path d="M0 120 L90 120 L132 70 L174 120 Z" fill="currentColor" opacity="0.5" />
      <path d="M355 120 L402 62 L450 120 Z" fill="currentColor" opacity="0.4" />
      {/* Mt. Fuji main body */}
      <path d="M250 6 C244 22, 212 60, 148 120 L352 120 C288 60, 256 22, 250 6Z" fill="currentColor" />
      {/* Snow cap */}
      <path d="M250 6 C247 18, 239 34, 226 54 L274 54 C261 34, 253 18, 250 6Z" fill="rgba(255,255,255,0.75)" />
      {/* Snow ridgeline detail */}
      <path d="M232 50 C240 34, 246 20, 250 6 C254 20, 260 34, 268 50" stroke="rgba(255,255,255,0.25)" strokeWidth="1" fill="none" />
    </svg>
  )
}

function WeekHeatmap({ workLog }) {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = getDayKey(d)
    const minutes = workLog[key] || 0
    days.push({ key, minutes, label: d.toLocaleDateString('en-US', { weekday: 'short' }), isToday: i === 0 })
  }
  const max = Math.max(...days.map(d => d.minutes), 1)

  return (
    <div>
      <div className="section-label" style={{ marginBottom: 10 }}>Last 7 Days</div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 60 }}>
        {days.map((day, i) => (
          <div key={day.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: '100%', height: 48, display: 'flex', alignItems: 'flex-end' }}>
              <div
                className={`heatmap-bar ${day.isToday ? 'today' : ''}`}
                style={{
                  height: day.minutes > 0 ? `${Math.max(8, (day.minutes / max) * 48)}px` : '4px',
                  background: day.minutes > 0 && !day.isToday ? 'var(--accent)' : day.minutes === 0 ? 'var(--border)' : undefined,
                  opacity: day.isToday ? 1 : 0.7,
                  animationDelay: `${i * 60}ms`,
                }}
              />
            </div>
            <span style={{ fontSize: 10, color: day.isToday ? 'var(--accent)' : 'var(--text-muted)', fontWeight: day.isToday ? 600 : 400 }}>
              {day.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StatsPanel() {
  const { stats, sessions, workLog } = useApp()
  const today = getDayKey()
  const todayMinutes = workLog[today] || 0
  const todaySessions = sessions.filter(s => s.completedAt?.startsWith(today) && s.type === 'focus').length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <StatCard
          icon={<Clock size={18} />}
          label="Today's Focus"
          value={formatDuration(todayMinutes)}
          rawValue={todayMinutes}
          color="var(--focus-color)"
          index={0}
        />
        <StatCard
          icon={<Zap size={18} />}
          label="Today's Sessions"
          value={String(todaySessions)}
          rawValue={todaySessions}
          color="var(--break-color)"
          index={1}
        />
        <StatCard
          icon={<Flame size={18} />}
          label="Streak"
          value={`${stats.streak}d`}
          rawValue={stats.streak}
          color="var(--warning)"
          index={2}
        />
        <StatCard
          icon={<TrendingUp size={18} />}
          label="Total Focus"
          value={formatDuration(stats.totalFocusMinutes)}
          rawValue={stats.totalFocusMinutes}
          color="var(--success)"
          index={3}
        />
      </div>

      <div className="card" style={{ position: 'relative', overflow: 'hidden' }}>
        <MtFuji />
        <WeekHeatmap workLog={workLog} />
      </div>

      <div className="card">
        <div className="section-label" style={{ marginBottom: 12 }}>Recent Sessions</div>
        {sessions.length === 0 ? (
          <div style={{ color: 'var(--text-muted)', fontSize: 13, textAlign: 'center', padding: '16px 0' }}>No sessions yet</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {sessions.slice(0, 8).map(s => (
              <div key={s.id} className="session-row">
                <div style={{
                  width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                  background: s.type === 'focus' ? 'var(--focus-color)' : s.type === 'short_break' ? 'var(--break-color)' : 'var(--long-break-color)',
                  boxShadow: s.type === 'focus' ? '0 0 0 2px rgba(167,139,250,0.3)' : 'none',
                }} />
                <span style={{ color: 'var(--text-secondary)', flex: 1 }}>
                  {s.type === 'focus' ? (s.label || 'Focus Session') : s.type === 'short_break' ? 'Short Break' : 'Long Break'}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{s.duration}m</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                  {new Date(s.completedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
