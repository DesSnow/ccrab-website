import { useState, useEffect } from 'react'

export default function GlitchText({ text, className = '', tag: Tag = 'span' }) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 800)
    }, 4000 + Math.random() * 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Tag className={`glitch-text ${glitching ? 'glitching' : ''} ${className}`} data-text={text}>
      {text}
    </Tag>
  )
}
