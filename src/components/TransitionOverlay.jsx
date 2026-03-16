import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { hudAudio } from '../utils/AudioEngine'

export default function TransitionOverlay() {
  const location = useLocation()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false)
      return
    }
    
    setIsAnimating(true)
    hudAudio.playWarpSound()
    // The CSS animation lasts for 800ms
    const timeout = setTimeout(() => setIsAnimating(false), 900)
    
    return () => clearTimeout(timeout)
  }, [location.pathname])

  if (!isAnimating) return null

  return (
    <div className="warp-transition">
      <div className="warp-flash"></div>
      <div className="warp-lines">
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} className="warp-line" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 0.2}s`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}></div>
        ))}
      </div>
    </div>
  )
}
