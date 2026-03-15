import { useRef, useState } from 'react'

export default function TiltCard({ children, className = '', id = '', glowColor = 'rgba(232, 160, 32, 0.15)' }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 })

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    const glowX = (x / rect.width) * 100
    const glowY = (y / rect.height) * 100
    setTilt({ rotateX, rotateY, glowX, glowY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 })
  }

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${className}`}
      id={id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: tilt.rotateX === 0 ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
      }}
    >
      {/* Dynamic light reflection */}
      <div
        className="tilt-card-glow"
        style={{
          background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, ${glowColor}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  )
}
