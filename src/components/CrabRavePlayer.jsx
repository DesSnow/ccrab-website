export default function CrabRavePlayer({ play }) {
  if (!play) return null

  return (
    <div style={{ position: 'fixed', top: -1000, left: -1000, opacity: 0, pointerEvents: 'none' }}>
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/cE0wfjsybIQ?autoplay=1&controls=0" 
        title="Crab Rave" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      />
    </div>
  )
}
