import AnimatedOnScroll from '../components/AnimatedOnScroll'
import TiltCard from '../components/TiltCard'
import GlitchText from '../components/GlitchText'
import ScannerImage from '../components/ScannerImage'
import { Rocket, Shield, Crosshair, Target } from 'lucide-react'

const ships = [
  {
    name: 'Idris-M',
    model: 'Aegis Dynamics',
    role: 'Frégate de Combat',
    image: '/assets/idris.jpg',
    stats: { armament: 'Heavy', shields: 'Max', speed: 'Low' },
    desc: 'Le fleuron de notre flotte. Capable d\'annihiler des flottes entières tout en servant de bar à bières mobile.'
  },
  {
    name: 'Carrack',
    model: 'Anvil Aerospace',
    role: 'Exploration Longue Portée',
    image: '/assets/carrack.jpg',
    stats: { armament: 'Medium', shields: 'High', speed: 'Medium' },
    desc: 'Celui qui nous permet de nous perdre avec style dans les confins du Verse.'
  },
  {
    name: 'Ares Ion',
    model: 'Crusader Industries',
    role: 'Intercepteur de Capital Ships',
    image: '/assets/ares.jpg',
    stats: { armament: 'Extreme', shields: 'Medium', speed: 'High' },
    desc: 'Un gros canon avec des moteurs autour. Idéal pour percer des trous dans ce qui ne nous plaît pas.'
  },
  {
    name: 'C8X Pisces',
    model: 'Anvil Aerospace',
    role: 'Navette Médicale / Transport',
    image: '/assets/pisces.jpg',
    stats: { armament: 'Low', shields: 'Low', speed: 'Very High' },
    desc: 'Petit, discret, et surtout indispensable pour ramasser les débris après une soirée trop arrosée.'
  }
]

export default function Fleet() {
  return (
    <div className="page fleet-page">
      <section className="hero-compact">
        <div className="container">
          <AnimatedOnScroll>
            <GlitchText text="NOTRE FLOTTE" tag="h1" className="page-title" />
            <p className="page-subtitle">La puissance de feu crustacée, de la navette à la frégate.</p>
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
                        <Shield size={12} />
                        <span>Shields: {ship.stats.shields}</span>
                      </div>
                      <div className="ship-stat">
                        <Crosshair size={12} />
                        <span>Armament: {ship.stats.armament}</span>
                      </div>
                      <div className="ship-stat">
                        <Target size={12} />
                        <span>Speed: {ship.stats.speed}</span>
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
