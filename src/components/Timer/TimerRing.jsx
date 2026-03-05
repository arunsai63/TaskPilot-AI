export default function TimerRing({ progress, color, size = 260, strokeWidth = 10, running = false, glowColor }) {
  const radius = (size - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)
  const angle = (2 * Math.PI * (1 - progress)) - Math.PI / 2
  const dotX = size / 2 + radius * Math.cos(angle)
  const dotY = size / 2 + radius * Math.sin(angle)

  return (
    <div style={{
      filter: running ? `drop-shadow(0 0 18px ${glowColor || color})` : 'none',
      animation: running ? 'ringPulse 4s ease-in-out infinite' : 'none',
      transition: 'filter 600ms ease',
      lineHeight: 0,
    }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        style={{ transform: 'rotate(-90deg)', width: '100%', maxWidth: size, height: 'auto' }}
      >
        {/* Subtle outer ring for depth */}
        <circle
          cx={size / 2} cy={size / 2} r={radius + strokeWidth * 0.5}
          fill="none" stroke={color} strokeWidth={1} opacity={0.1}
        />
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
        {/* Leading dot */}
        {progress > 0.01 && progress < 0.99 && (
          <circle cx={dotX} cy={dotY} r={strokeWidth * 0.65} fill={color} opacity={running ? 1 : 0.7} />
        )}
      </svg>
    </div>
  )
}
