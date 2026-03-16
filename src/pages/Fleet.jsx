import AnimatedOnScroll from '../components/AnimatedOnScroll'
import TiltCard from '../components/TiltCard'
import GlitchText from '../components/GlitchText'
import ScannerImage from '../components/ScannerImage'
import { Rocket, Shield, Crosshair, Target } from 'lucide-react'

const ships = [
  {
    name: 'Cristaline "Classic"',
    model: 'Source de Vie',
    role: 'Hydratation Basique',
    image: '/assets/bottle_cristaline.png',
    stats: { hydration: 'High', style: 'Low', rarity: 'Common' },
    desc: 'L\'alliée indispensable du gamer. Simple, efficace, et surtout oubliée à moitié vide sur le bureau depuis 3 jours.'
  },
  {
    name: 'Tactical Hydro-Crab',
    model: 'CCRAB Industries',
    role: 'Survie en Milieu Hostile',
    image: '/assets/bottle_tactical.png',
    stats: { hydration: 'Maximum', style: 'Extreme', rarity: 'Legendary' },
    desc: 'En titane noir mat avec le logo CCRAB. Capable de résister à une explosion nucléaire ou à une chute du haut du Carrack.'
  },
  {
    name: 'Quantum Glitch Water',
    model: 'CyberSource',
    role: 'Énergie Bio-Digitale',
    image: '/assets/bottle_glitch.png',
    stats: { hydration: 'Glitchy', style: 'Cyberpunk', rarity: 'Epic' },
    desc: 'Boire ce liquide vous permet de voir le code source de l\'univers. Attention : peut provoquer des déconnexions soudaines.'
  },
  {
    name: 'L\'Arist eau cratie',
    model: 'Brachyura Luxury',
    role: 'Dégustation Premium',
    image: '/assets/bottle_luxury.png',
    stats: { hydration: 'Bof', style: 'Infinite', rarity: 'Unique' },
    desc: 'Une carafe en cristal pur pour les chevaliers qui refusent de boire dans du plastique. Le goût est le même, mais le prix est décuplé.'
  }
]

export default function Fleet() {
  return (
    <div className="page fleet-page">
      <section className="hero-compact">
        <div className="container">
          <AnimatedOnScroll>
            <GlitchText text="NOTRE FLOTTE D'EAU" tag="h1" className="page-title" />
            <p className="page-subtitle">Parce qu'un bon chevalier est un chevalier hydraté.</p>
          </AnimatedOnScroll>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="fleet-grid">
            {ships.map((ship, i) => (
              <AnimatedOnScroll key={i} delay={i + 1}>
                <TiltCard className="ship-card">
                  <ScannerImage src={ship.image} alt={ship.name} className="ship-image" />
                  <div className="ship-content">
                    <div className="ship-header">
                      <span className="ship-model">{ship.model}</span>
                      <h3 className="ship-title">{ship.name}</h3>
                    </div>
                    <div className="ship-role">
                      <Rocket size={14} className="text-orange" />
                      <span>{ship.role}</span>
                    </div>
                    <p className="ship-desc">{ship.desc}</p>
                    <div className="ship-stats">
                      <div className="ship-stat">
                        <span>💧 Hydration: {ship.stats.hydration}</span>
                      </div>
                      <div className="ship-stat">
                        <span>✨ Style: {ship.stats.style}</span>
                      </div>
                      <div className="ship-stat">
                        <span>💎 Rarity: {ship.stats.rarity}</span>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </AnimatedOnScroll>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
