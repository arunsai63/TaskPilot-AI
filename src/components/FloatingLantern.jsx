export default function FloatingLantern({ width = 60 }) {
  return (
    <div className="lantern-glow" style={{ display: 'inline-block', pointerEvents: 'none' }}>
      <svg
        viewBox="0 0 60 120"
        width={width}
        aria-hidden="true"
        style={{ display: 'block' }}
      >
        {/* Hanging string */}
        <line x1="30" y1="0" x2="30" y2="14" stroke="var(--warning)" strokeWidth="1" opacity="0.5" />

        {/* Top cap */}
        <polygon points="18,14 42,14 38,20 22,20" fill="var(--warning)" opacity="0.6" />

        {/* Body — nested rects for depth */}
        <rect x="16" y="20" width="28" height="68" rx="4" fill="var(--warning)" opacity="0.12" />
        <rect x="18" y="22" width="24" height="64" rx="3" fill="var(--warning)" opacity="0.18" />
        <rect x="21" y="24" width="18" height="60" rx="2" fill="var(--warning)" opacity="0.22" />

        {/* Inner light core */}
        <ellipse cx="30" cy="54" rx="8" ry="22" fill="rgba(255,240,180,0.8)" />

        {/* Vertical ribs */}
        <line x1="22" y1="20" x2="22" y2="88" stroke="var(--warning)" strokeWidth="0.8" opacity="0.3" />
        <line x1="30" y1="20" x2="30" y2="88" stroke="var(--warning)" strokeWidth="0.8" opacity="0.25" />
        <line x1="38" y1="20" x2="38" y2="88" stroke="var(--warning)" strokeWidth="0.8" opacity="0.3" />

        {/* Bottom cap */}
        <polygon points="22,88 38,88 42,94 18,94" fill="var(--warning)" opacity="0.6" />

        {/* Tassel */}
        <line x1="30" y1="94" x2="30" y2="108" stroke="var(--warning)" strokeWidth="1.2" opacity="0.5" />
        <line x1="30" y1="102" x2="26" y2="112" stroke="var(--warning)" strokeWidth="0.8" opacity="0.35" />
        <line x1="30" y1="102" x2="30" y2="114" stroke="var(--warning)" strokeWidth="0.8" opacity="0.35" />
        <line x1="30" y1="102" x2="34" y2="112" stroke="var(--warning)" strokeWidth="0.8" opacity="0.35" />
      </svg>
    </div>
  )
}
