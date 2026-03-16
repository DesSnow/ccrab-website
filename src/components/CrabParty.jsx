import { useEffect, useState } from 'react'

export default function CrabParty({ active }) {
  const [crabs, setCrabs] = useState([])

  useEffect(() => {
    if (!active) {
      setCrabs([])
      return
    }

    const interval = setInterval(() => {
      setCrabs(prev => {
        const directions = ['bottom', 'top', 'left', 'right']
        const dir = directions[Math.floor(Math.random() * directions.length)]
        
        const newCrab = {
          id: Date.now() + Math.random(),
          direction: dir,
          pos: Math.random() * 100 + '%',
          delay: Math.random() * 0.2 + 's',
          duration: 1 + Math.random() * 1.5 + 's',
          size: 40 + Math.random() * 70 + 'px'
        }
        return [...prev.slice(-150), newCrab]
      })
    }, 150)

    return () => clearInterval(interval)
  }, [active])

  if (!active) return null

  return (
    <div className="crab-party-container">
      {crabs.map(crab => (
        <img
          key={crab.id}
          src="https://img.icons8.com/color/96/000000/crab.png"
          className={`dancing-crab crab-from-${crab.direction}`}
          style={{
            [crab.direction === 'left' || crab.direction === 'right' ? 'top' : 'left']: crab.pos,
            width: crab.size,
            animationDelay: crab.delay,
            animationDuration: crab.duration
          }}
          alt="Crab"
        />
      ))}
    </div>
  )
}
