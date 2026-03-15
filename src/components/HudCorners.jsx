export default function HudCorners({ children, className = '', color = 'var(--accent-orange)' }) {
  return (
    <div className={`hud-frame ${className}`}>
      <svg className="hud-corner hud-corner-tl" width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 20 L0 4 Q0 0 4 0 L20 0" stroke={color} fill="none" strokeWidth="1.5" />
      </svg>
      <svg className="hud-corner hud-corner-tr" width="24" height="24" viewBox="0 0 24 24">
        <path d="M4 0 L20 0 Q24 0 24 4 L24 20" stroke={color} fill="none" strokeWidth="1.5" />
      </svg>
      <svg className="hud-corner hud-corner-bl" width="24" height="24" viewBox="0 0 24 24">
        <path d="M0 4 L0 20 Q0 24 4 24 L20 24" stroke={color} fill="none" strokeWidth="1.5" />
      </svg>
      <svg className="hud-corner hud-corner-br" width="24" height="24" viewBox="0 0 24 24">
        <path d="M4 24 L20 24 Q24 24 24 20 L24 4" stroke={color} fill="none" strokeWidth="1.5" />
      </svg>
      {children}
    </div>
  )
}
