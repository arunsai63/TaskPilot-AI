import { TrendingUp, Clock, Zap, Flame } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { formatDuration, getDayKey } from '../../utils/format'

function StatCard({ icon, label, value, color = 'var(--accent)' }) {
  return (
    <div className="card card-sm" style={{ display:'flex', alignItems:'center', gap:12 }}>
      <div style={{ padding:10, borderRadius:'var(--radius-sm)', background:`color-mix(in srgb, ${color} 15%, transparent)`, color, flexShrink:0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize:20, fontWeight:700, lineHeight:1 }}>{value}</div>
        <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>{label}</div>
      </div>
    </div>
  )
}

function WeekHeatmap({ workLog }) {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = getDayKey(d)
    const minutes = workLog[key] || 0
    days.push({ key, minutes, label: d.toLocaleDateString('en-US', { weekday:'short' }), isToday: i === 0 })
  }
  const max = Math.max(...days.map(d => d.minutes), 1)

  return (
    <div>
      <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.5px' }}>Last 7 Days</div>
      <div style={{ display:'flex', gap:6, alignItems:'flex-end', height:60 }}>
        {days.map(day => (
          <div key={day.key} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
            <div style={{ position:'relative', width:'100%' }}>
              <div style={{ height:48, display:'flex', alignItems:'flex-end' }}>
                <div style={{
                  width:'100%',
                  height: day.minutes > 0 ? `${Math.max(8, (day.minutes / max) * 48)}px` : '4px',
                  background: day.minutes > 0 ? 'var(--accent)' : 'var(--border)',
                  borderRadius:'3px 3px 0 0',
                  opacity: day.isToday ? 1 : 0.7,
                  transition:'height 300ms ease'
                }} />
              </div>
            </div>
            <span style={{ fontSize:10, color: day.isToday ? 'var(--accent)' : 'var(--text-muted)', fontWeight: day.isToday ? 600 : 400 }}>
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
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        <StatCard icon={<Clock size={18} />} label="Today's Focus" value={formatDuration(todayMinutes)} color="var(--focus-color)" />
        <StatCard icon={<Zap size={18} />} label="Today's Sessions" value={todaySessions} color="var(--break-color)" />
        <StatCard icon={<Flame size={18} />} label="Streak" value={`${stats.streak}d`} color="var(--warning)" />
        <StatCard icon={<TrendingUp size={18} />} label="Total Focus" value={formatDuration(stats.totalFocusMinutes)} color="var(--success)" />
      </div>
      <div className="card">
        <WeekHeatmap workLog={workLog} />
      </div>
      <div className="card">
        <div style={{ fontSize:12, color:'var(--text-muted)', marginBottom:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Recent Sessions</div>
        {sessions.length === 0 ? (
          <div style={{ color:'var(--text-muted)', fontSize:13, textAlign:'center', padding:'16px 0' }}>No sessions yet</div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            {sessions.slice(0, 8).map(s => (
              <div key={s.id} style={{ display:'flex', alignItems:'center', gap:8, fontSize:13 }}>
                <div style={{
                  width:8, height:8, borderRadius:'50%', flexShrink:0,
                  background: s.type === 'focus' ? 'var(--focus-color)' : s.type === 'short_break' ? 'var(--break-color)' : 'var(--long-break-color)'
                }} />
                <span style={{ color:'var(--text-secondary)', flex:1 }}>
                  {s.type === 'focus' ? (s.label || 'Focus Session') : s.type === 'short_break' ? 'Short Break' : 'Long Break'}
                </span>
                <span style={{ color:'var(--text-muted)', fontSize:12 }}>{s.duration}m</span>
                <span style={{ color:'var(--text-muted)', fontSize:11 }}>
                  {new Date(s.completedAt).toLocaleTimeString('en-US', { hour:'2-digit', minute:'2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
