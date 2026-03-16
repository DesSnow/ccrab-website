import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { hudAudio } from '../utils/AudioEngine'

export default function TransitionOverlay() {
  const location = useLocation()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isErrorMode, setIsErrorMode] = useState(false)
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const [lastNavTime, setLastNavTime] = useState(0)
  const [fastNavCount, setFastNavCount] = useState(0)

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false)
      return
    }

    const now = Date.now()
    const timeSinceLastNav = now - lastNavTime
    setLastNavTime(now)

    // Detect spamming (less than 500ms between navigations)
    if (timeSinceLastNav < 500) {
      const newCount = fastNavCount + 1
      setFastNavCount(newCount)

      if (newCount >= 2) {
        setIsErrorMode(true)
        setIsAnimating(true)
        hudAudio.playAlarm(10) 
        
        const errorTimeout = setTimeout(() => {
          setIsAnimating(false)
          setIsErrorMode(false)
          setFastNavCount(0)
        }, 10000)
        
        return () => clearTimeout(errorTimeout)
      }
    } else {
      setFastNavCount(0)
    }
    
    // Normal warp logic - only if not already in 10s error
    if (!isErrorMode) {
      setIsAnimating(true)
      hudAudio.playWarpSound()
      const normalTimeout = setTimeout(() => {
        setIsAnimating(prev => isErrorMode ? prev : false)
      }, 900)
      return () => clearTimeout(normalTimeout)
    }
  }, [location.pathname, isErrorMode])

  if (!isAnimating) return null

  return (
    <div className={`warp-transition ${isErrorMode ? 'warp-error' : ''}`}>
      <div className="warp-flash"></div>
      {isErrorMode && (
        <div className="warp-error-message">
          <div className="glitch-404" data-text="ERROR 404">ERROR 404</div>
          <div className="warp-error-sub">QUANTUM DRIVE OVERHEAT</div>
        </div>
      )}
      <div className="warp-lines">
        {Array.from({ length: isErrorMode ? 80 : 40 }).map((_, i) => (
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
