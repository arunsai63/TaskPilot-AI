import StatsPanel from '../components/Stats/StatsPanel'

export default function StatsPage() {
  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '24px 16px' }}>
      <h2 className="page-title" style={{ marginBottom: 20 }}>Stats</h2>
      <StatsPanel />
    </div>
  )
}
