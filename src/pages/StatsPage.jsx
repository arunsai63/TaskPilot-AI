import StatsPanel from '../components/Stats/StatsPanel'

export default function StatsPage() {
  return (
    <div style={{ maxWidth:620, margin:'0 auto', padding:'24px 16px' }}>
      <h2 style={{ fontSize:18, fontWeight:600, marginBottom:20 }}>Stats & Work Log</h2>
      <StatsPanel />
    </div>
  )
}
