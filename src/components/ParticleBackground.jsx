import { useEffect, useRef } from 'react'

/**
 * 3D Starfield Background
 * Uses perspective projection to create an immersive "cruising through space" effect.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationId
    let stars = []
    const STAR_COUNT = 800
    const SPEED = 0.5
    const FOV = 250 // Field of view / perspective factor

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initStars = () => {
      stars = []
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: (Math.random() - 0.5) * canvas.width * 2,
          y: (Math.random() - 0.5) * canvas.height * 2,
          z: Math.random() * canvas.width,
          size: Math.random() * 1.5 + 0.5,
          color: Math.random() > 0.8 ? (Math.random() > 0.5 ? '#96c8ff' : '#ffb464') : '#fff',
          alpha: Math.random() * 0.5 + 0.5
        })
      }
    }

    const draw = () => {
      // Clear with slight trailing effect or just solid black? 
      // Solid black looks better for FPS, but a slight trail can look cool.
      ctx.fillStyle = '#02060c' // Matches --bg-primary
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const currentMouse = mouseRef.current

      // Add a subtle nebula-like glow in the center or following the mouse
      const gradient = ctx.createRadialGradient(
        centerX + currentMouse.x * 0.1, 
        centerY + currentMouse.y * 0.1, 
        0, 
        centerX, 
        centerY, 
        canvas.width * 0.8
      )
      gradient.addColorStop(0, 'rgba(232, 160, 32, 0.03)') // Gold/Orange tint
      gradient.addColorStop(0.5, 'rgba(26, 58, 92, 0.05)') // Deep blue tint
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        
        // Move star closer
        star.z -= SPEED

        // If star passed the camera, reset to far distance
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * canvas.width * 2
          star.y = (Math.random() - 0.5) * canvas.height * 2
          star.z = canvas.width
        }

        // Perspective Projection
        // sx = (x * FOV) / z + centerX
        // sy = (y * FOV) / z + centerY
        const px = (star.x * FOV) / star.z + centerX
        const py = (star.y * FOV) / star.z + centerY
        
        // Parallax based on mouse
        const ox = px + (currentMouse.x * 0.05 * (1 - star.z / canvas.width))
        const oy = py + (currentMouse.y * 0.05 * (1 - star.z / canvas.width))

        // Size also scales with depth
        const radius = (star.size * FOV) / star.z

        // Only draw if on screen
        if (ox > 0 && ox < canvas.width && oy > 0 && oy < canvas.height) {
          const opacity = (1 - star.z / canvas.width) * star.alpha
          
          ctx.beginPath()
          ctx.arc(ox, oy, radius, 0, Math.PI * 2)
          ctx.fillStyle = star.color
          ctx.globalAlpha = opacity
          ctx.fill()
          
          // Subtle glow for closer stars
          if (star.z < canvas.width / 3) {
            ctx.shadowBlur = radius * 4
            ctx.shadowColor = star.color
            ctx.stroke()
            ctx.shadowBlur = 0
          }
        }
      }
      
      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e) => {
      // Normalize mouse 0,0 to center -1 to 1
      mouseRef.current = {
        x: e.clientX - canvas.width / 2,
        y: e.clientY - canvas.height / 2
      }
    }

    resize()
    initStars()
    draw()

    window.addEventListener('resize', () => {
      resize()
      initStars()
    })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="particle-canvas" 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1,
        pointerEvents: 'none'
      }} 
    />
  )
}
