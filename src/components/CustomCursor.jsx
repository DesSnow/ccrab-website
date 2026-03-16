import { useEffect, useState } from 'react'
import '../index.css' // Ensure global styles are applied

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseenter', onMouseEnter)
      document.addEventListener('mouseleave', onMouseLeave)
      document.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mouseup', onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, input').forEach((el) => {
        el.addEventListener('mouseover', () => setLinkHovered(true))
        el.addEventListener('mouseout', () => setLinkHovered(false))
      })
    }

    addEventListeners()
    handleLinkHoverEvents()

    // Re-check elements on mutation (for dynamic content like React)
    const observer = new MutationObserver(handleLinkHoverEvents)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      removeEventListeners()
      observer.disconnect()
    }
  }, [])

  // If on a touch device, don't render the custom cursor
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  const cursorClasses = `custom-cursor 
    ${clicked ? 'cursor-clicked' : ''} 
    ${hidden ? 'cursor-hidden' : ''} 
    ${linkHovered ? 'cursor-hover' : ''}`

  return (
    <>
      <div 
        className={`${cursorClasses} cursor-dot`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className={`${cursorClasses} cursor-outline`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      <div 
        className="cursor-crab"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  )
}
