import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useKonamiCode } from './hooks/useKonamiCode'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import CustomCursor from './components/CustomCursor'
import TransitionOverlay from './components/TransitionOverlay'
import Home from './pages/Home'
import Events from './pages/Events'
import Fleet from './pages/Fleet'
import CrabRavePlayer from './components/CrabRavePlayer'

export default function App() {
  const [isPartyMode, setIsPartyMode] = useState(false)

  useKonamiCode(() => {
    toggleParty()
  })

  const toggleParty = () => {
    setIsPartyMode(prev => {
      const newState = !prev
      if (newState) console.log('PARTY MODE ACTIVATED! 🦀🕺')
      return newState
    })
  }

  useEffect(() => {
    const handleToggle = () => toggleParty()
    window.addEventListener('toggle-party-mode', handleToggle)
    return () => window.removeEventListener('toggle-party-mode', handleToggle)
  }, [])

  return (
    <div className={isPartyMode ? 'party-mode-active' : ''}>
      <CrabRavePlayer play={isPartyMode} />
      <CustomCursor />
      <TransitionOverlay />
      <div className="nebula-overlay" />
      <ParticleBackground />
      <div className="hud-scanlines" />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/fleet" element={<Fleet />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
