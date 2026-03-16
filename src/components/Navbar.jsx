import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Volume2, VolumeX } from 'lucide-react'
import { hudAudio } from '../utils/AudioEngine'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    hudAudio.playUiBeep(440, 'sine', 0.1) // Subtle beep on page change if sound is on
  }, [location])

  const toggleSound = () => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    hudAudio.setEnabled(newState)
    if (newState) {
      hudAudio.playUiBeep(660)
    }
  }

  const handleLinkHover = () => {
    if (soundEnabled) hudAudio.playUiBeep(1200, 'square', 0.02)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <img src="/assets/logo.png" alt="CCRAB Logo" />
          CCRAB
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <Link
            to="/"
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            onMouseEnter={handleLinkHover}
          >
            Home
          </Link>
          <Link
            to="/events"
            className={`navbar-link ${location.pathname === '/events' ? 'active' : ''}`}
            onMouseEnter={handleLinkHover}
          >
            Events
          </Link>
          <Link
            to="/fleet"
            className={`navbar-link ${location.pathname === '/fleet' ? 'active' : ''}`}
            onMouseEnter={handleLinkHover}
          >
            Flotte
          </Link>
        </div>

        <div className="navbar-controls">
          <button 
            className={`nav-icon-btn ${soundEnabled ? 'active' : ''}`} 
            onClick={toggleSound}
            title={soundEnabled ? "Couper le son" : "Activer le son"}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>

        <div className="navbar-cta">
          <a
            href="https://discord.gg/TkXZqNeG82"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            id="navbar-join-btn"
            onMouseEnter={handleLinkHover}
          >
            Nous Rejoindre
          </a>
        </div>

        <button
          className={`navbar-burger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="navbar-burger"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
