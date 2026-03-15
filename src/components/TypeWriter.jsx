import { useState, useEffect, useRef } from 'react'

export default function TypeWriter({ text, speed = 40, delay = 0, className = '' }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const idx = useRef(0)

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (idx.current >= text.length) {
      // Blink cursor then hide
      const cursorTimeout = setTimeout(() => setShowCursor(false), 2000)
      return () => clearTimeout(cursorTimeout)
    }
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, idx.current + 1))
      idx.current++
    }, speed)
    return () => clearTimeout(timeout)
  }, [started, displayed, text, speed])

  return (
    <span className={`typewriter ${className}`}>
      {displayed}
      {showCursor && <span className="typewriter-cursor">|</span>}
    </span>
  )
}
