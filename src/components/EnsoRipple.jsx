export default function EnsoRipple({ active }) {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 200,
      height: 200,
      pointerEvents: 'none',
      opacity: active ? 1 : 0,
      transition: 'opacity 600ms ease',
    }}>
      <svg
        key={active}
        viewBox="0 0 200 200"
        width="200"
        height="200"
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        {/* Outer ripple ring */}
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="var(--focus-color)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.08"
          className="enso-ripple"
        />

        {/* Enso main circle — brush stroke opening at top */}
        <circle
          cx="100"
          cy="100"
          r="72"
          stroke="var(--focus-color)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="88 12"
          transform="rotate(-100 100 100)"
          className={active ? 'enso-draw' : ''}
        />

        {/* Inner glow ring */}
        <circle
          cx="100"
          cy="100"
          r="55"
          stroke="var(--focus-color)"
          strokeWidth="1"
          fill="none"
          opacity="0.06"
        />
      </svg>
    </div>
  )
}
