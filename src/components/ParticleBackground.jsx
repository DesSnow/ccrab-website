import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationId
    let particles = []
    let nebulaClouds = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      // Multi-layer depth starfield
      const count = Math.floor((canvas.width * canvas.height) / 8000)
      for (let i = 0; i < count; i++) {
        const depth = Math.random() // 0 = far, 1 = near
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseX: 0,
          baseY: 0,
          size: depth * 2.2 + 0.2,
          depth,
          speedX: (Math.random() - 0.5) * 0.08 * (depth + 0.3),
          speedY: (Math.random() - 0.5) * 0.08 * (depth + 0.3),
          opacity: depth * 0.5 + 0.15,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.015 + 0.005,
          // Color variation: most white/gold, some blue, some orange
          colorType: Math.random() < 0.7 ? 'gold' : Math.random() < 0.5 ? 'blue' : 'orange',
        })
      }
      particles.forEach(p => { p.baseX = p.x; p.baseY = p.y })
    }

    // Create subtle nebula clouds
    const createNebulae = () => {
      nebulaClouds = []
      for (let i = 0; i < 5; i++) {
        nebulaClouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 250 + 150,
          color: i % 2 === 0 
            ? `rgba(232, 160, 32, ${Math.random() * 0.015 + 0.005})`
            : `rgba(26, 58, 92, ${Math.random() * 0.025 + 0.01})`,
          drift: Math.random() * 0.1 + 0.02,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    const getStarColor = (type, opacity) => {
      switch (type) {
        case 'gold': return `rgba(255, 230, 180, ${opacity})`
        case 'blue': return `rgba(150, 200, 255, ${opacity})`
        case 'orange': return `rgba(255, 180, 100, ${opacity})`
        default: return `rgba(255, 240, 220, ${opacity})`
      }
    }

    const getGlowColor = (type, opacity) => {
      switch (type) {
        case 'gold': return `rgba(232, 180, 80, ${opacity})`
        case 'blue': return `rgba(100, 160, 255, ${opacity})`
        case 'orange': return `rgba(255, 140, 50, ${opacity})`
        default: return `rgba(232, 180, 80, ${opacity})`
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const mouse = mouseRef.current

      // Draw nebula clouds
      nebulaClouds.forEach(cloud => {
        cloud.phase += 0.002
        const breathe = Math.sin(cloud.phase) * 0.3 + 0.7
        const gradient = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.radius * breathe
        )
        gradient.addColorStop(0, cloud.color)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.fillRect(cloud.x - cloud.radius, cloud.y - cloud.radius, cloud.radius * 2, cloud.radius * 2)
      })

      // Draw stars with mouse parallax
      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.pulse += p.pulseSpeed

        // Wrap around
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        // Mouse parallax effect — deeper stars move less
        let drawX = p.x
        let drawY = p.y
        if (mouse.x > 0 && mouse.y > 0) {
          const parallaxFactor = p.depth * 0.03
          drawX += (mouse.x - canvas.width / 2) * parallaxFactor
          drawY += (mouse.y - canvas.height / 2) * parallaxFactor
        }

        const currentOpacity = p.opacity * (0.5 + Math.sin(p.pulse) * 0.5)

        // Mouse proximity glow
        const dx = drawX - mouse.x
        const dy = drawY - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const mouseInfluence = dist < 200 ? (1 - dist / 200) : 0
        const boostedOpacity = currentOpacity + mouseInfluence * 0.6
        const boostedSize = p.size + mouseInfluence * 3

        // Glow
        if (boostedSize > 0.8) {
          const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, boostedSize * 4)
          gradient.addColorStop(0, getGlowColor(p.colorType, boostedOpacity * 0.5))
          gradient.addColorStop(0.5, getGlowColor(p.colorType, boostedOpacity * 0.1))
          gradient.addColorStop(1, 'transparent')
          ctx.beginPath()
          ctx.arc(drawX, drawY, boostedSize * 4, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
        }

        // Star core
        ctx.beginPath()
        ctx.arc(drawX, drawY, boostedSize * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = getStarColor(p.colorType, boostedOpacity)
        ctx.fill()

        // Cross flare on bright/near stars
        if (mouseInfluence > 0.3 && p.depth > 0.5) {
          const flareLen = boostedSize * 6 * mouseInfluence
          ctx.strokeStyle = getStarColor(p.colorType, mouseInfluence * 0.3)
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(drawX - flareLen, drawY)
          ctx.lineTo(drawX + flareLen, drawY)
          ctx.stroke()
          ctx.beginPath()
          ctx.moveTo(drawX, drawY - flareLen)
          ctx.lineTo(drawX, drawY + flareLen)
          ctx.stroke()
        }
      })

      // Mouse cursor glow orb
      if (mouse.x > 0 && mouse.y > 0) {
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180)
        cursorGlow.addColorStop(0, 'rgba(232, 160, 32, 0.06)')
        cursorGlow.addColorStop(0.5, 'rgba(232, 160, 32, 0.02)')
        cursorGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = cursorGlow
        ctx.fillRect(mouse.x - 180, mouse.y - 180, 360, 360)
      }

      animationId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    createParticles()
    createNebulae()
    draw()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
      createNebulae()
    })
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="particle-canvas" />
}
