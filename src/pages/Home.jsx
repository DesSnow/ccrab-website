import { Swords, Compass, HeartPulse, Anchor, Users, Handshake, Skull, ShieldPlus } from 'lucide-react'
import AnimatedOnScroll from '../components/AnimatedOnScroll'
import GlitchText from '../components/GlitchText'
import TypeWriter from '../components/TypeWriter'
import TiltCard from '../components/TiltCard'
import HudCorners from '../components/HudCorners'

const divisions = [
  {
    id: 'crab',
    acronym: 'CRAB',
    name: 'Chevaliers Rayonnants de l\'Aristocratie Brachyura',
    desc: 'La division principale. Les forces vives de la CCRAB, toujours en première ligne pour défendre l\'honneur des crustacés dans le verse.',
    icon: Swords,
    className: 'division-crab',
    image: '/assets/div_crab.jpg',
    glowColor: 'rgba(232, 160, 32, 0.12)',
  },
  {
    id: 'perdu',
    acronym: 'PERDU',
    name: 'Peloton d\'Exploration et de Recherche Dardanus Undulatus',
    desc: 'Les explorateurs intrépides qui se perdent volontairement dans les confins de la galaxie pour en rapporter des trésors (ou des excuses).',
    icon: Compass,
    className: 'division-perdu',
    image: '/assets/div_perdu.jpg',
    glowColor: 'rgba(0, 212, 255, 0.12)',
  },
  {
    id: 'morg',
    acronym: 'MORG',
    name: 'Médecine Opérationnelle du Régiment Geosesarma',
    desc: 'L\'unité médicale d\'élite. Ils vous soignent avec autant de dévouement qu\'ils mettent à vous rappeler que c\'était votre faute.',
    icon: HeartPulse,
    className: 'division-morg',
    image: '/assets/div_morg.jpg',
    glowColor: 'rgba(76, 175, 80, 0.12)',
  },
  {
    id: 'blac',
    acronym: 'BLAC',
    name: 'Blue Lobster Army Corp',
    desc: 'Le corps armé le plus rare et le plus prestigieux. Comme le homard bleu, ils sont exceptionnels et légèrement terrifiants.',
    icon: Anchor,
    className: 'division-blac',
    image: '/assets/div_blac.jpg',
    glowColor: 'rgba(66, 133, 244, 0.12)',
  },
]

const advantages = [
  {
    icon: Users,
    title: 'Communauté accueillante',
    desc: 'Rencontrez des passionnés dans une ambiance conviviale qui favorise le plaisir du jeu (surtout quand ça fait boom).',
  },
  {
    icon: Handshake,
    title: 'L\'entraide',
    desc: 'Chacun d\'entre nous vous aidera comme il le peut, surtout quand le fun est au rendez-vous.',
  },
  {
    icon: Skull,
    title: 'Les gros *****',
    desc: 'À vous de comprendre ce que vous voulez, mais le contraire de cette information est faux. 🙂',
  },
  {
    icon: ShieldPlus,
    title: 'Abonnement krok\'mort©',
    desc: 'Découvrez notre formule krok\'mort© ultra avantageuse. Satisfaction garantie ou remboursé (non).',
  },
]

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero" id="hero">
        <div className="hero-bg-image" />
        <div className="hero-bg-overlay" />
        <div className="hero-grid" />
        <div className="hero-content">
          <img src="/assets/holo_crab.png" alt="CCRAB Hologram" className="hero-logo" />
          <div className="hero-title-wrapper">
            <GlitchText text="CCRAB" tag="h1" className="hero-title" />
            <div className="hero-title-glow" />
          </div>
          <p className="hero-full-name">
            Confrérie des Chevaliers Rayonnants de l'Aristocratie Brachyura
          </p>
          <p className="hero-subtitle">
            <TypeWriter
              text="Une communauté de débiles prête à tout pour propager la CCRAB et s'amuser !"
              speed={35}
              delay={1200}
            />
          </p>
          <div className="hero-cta">
            <a
              href="https://discord.gg/TkXZqNeG82"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              id="hero-join-btn"
            >
              Nous Rejoindre
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/>
              </svg>
            </a>
            <a href="#divisions" className="btn btn-outline" id="hero-discover-btn">
              Découvrir nos divisions
            </a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <span>SCROLL</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ===== QUI SOMMES-NOUS ===== */}
      <section className="section about" id="about">
        <div className="container">
          <div className="about-grid">
            <AnimatedOnScroll>
              <div className="about-image-wrapper">
                <HudCorners>
                  <img
                    src="/assets/crab_face_jaune.jpg"
                    alt="CCRAB Mascotte"
                    className="about-image"
                  />
                </HudCorners>
                <div className="about-image-glow" />
              </div>
            </AnimatedOnScroll>

            <AnimatedOnScroll delay={2}>
              <div className="about-content">
                <h2>Qui sommes-nous ? Nan c'est vous, vous êtes qui ?</h2>
                <p>
                  Une communauté de fières personnes, toutes plus débiles les unes que les autres,
                  dirigée par les saints crustacés de la Crustableronde.
                </p>
                <p>Notre seul défaut ? Notre intelligence.</p>
                <div className="about-stats">
                  <div className="about-stat">
                    <div className="about-stat-number">4</div>
                    <div className="about-stat-label">Divisions</div>
                  </div>
                  <div className="about-stat">
                    <div className="about-stat-number">∞</div>
                    <div className="about-stat-label">Fun garanti</div>
                  </div>
                  <div className="about-stat">
                    <div className="about-stat-number">0</div>
                    <div className="about-stat-label">Regrets</div>
                  </div>
                </div>
              </div>
            </AnimatedOnScroll>
          </div>
        </div>
      </section>

      {/* ===== DIVISIONS ===== */}
      <section className="section divisions" id="divisions">
        <div className="container">
          <AnimatedOnScroll>
            <div className="section-title-wrapper">
              <h2 className="section-title">Nos Divisions</h2>
              <p className="section-subtitle">
                Quatre branches, un seul objectif : la domination crustacée du verse.
              </p>
              <div className="section-line" />
            </div>
          </AnimatedOnScroll>

          <div className="divisions-grid">
            {divisions.map((div, i) => (
              <AnimatedOnScroll key={div.id} delay={i + 1}>
                <TiltCard
                  className={`division-card ${div.className}`}
                  id={`division-${div.id}`}
                  glowColor={div.glowColor}
                >
                  <div className="division-card-bg">
                    <img src={div.image} alt={div.acronym} />
                  </div>
                  <div className="division-card-inner">
                    <div className="division-card-icon">
                      <div.icon size={26} />
                    </div>
                    <GlitchText text={div.acronym} tag="div" className="division-card-acronym" />
                    <div className="division-card-name">{div.name}</div>
                    <p className="division-card-desc">{div.desc}</p>
                  </div>
                </TiltCard>
              </AnimatedOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== POURQUOI NOUS CHOISIR ===== */}
      <section className="section advantages" id="advantages">
        <div className="advantages-bg-image" />
        <div className="container">
          <AnimatedOnScroll>
            <div className="section-title-wrapper">
              <h2 className="section-title">Pourquoi nous choisir</h2>
              <p className="section-subtitle">
                Des raisons plus ou moins valables de nous rejoindre.
              </p>
              <div className="section-line" />
            </div>
          </AnimatedOnScroll>

          <div className="advantages-grid">
            {advantages.map((adv, i) => (
              <AnimatedOnScroll key={i} delay={i + 1}>
                <TiltCard className="advantage-card" id={`advantage-${i}`}>
                  <div className="advantage-card-inner">
                    <div className="advantage-icon">
                      <adv.icon size={24} />
                    </div>
                    <h3 className="advantage-title">{adv.title}</h3>
                    <p className="advantage-desc">{adv.desc}</p>
                  </div>
                </TiltCard>
              </AnimatedOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PARTENAIRES ===== */}
      <section className="section partners" id="partners">
        <div className="container">
          <AnimatedOnScroll>
            <div className="section-title-wrapper">
              <h2 className="section-title">Ils nous ont fait confiance</h2>
              <div className="section-line" />
            </div>
          </AnimatedOnScroll>

          <AnimatedOnScroll delay={1}>
            <div className="partners-logos">
              <a
                href="https://rei-jyun.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-item"
                id="partner-rei"
              >
                <img src="/assets/rei.webp" alt="Rei Jyun" className="partner-logo" />
                <span className="partner-name">Rei Jyun</span>
              </a>
              <a
                href="https://rei-jyun.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-item"
                id="partner-raccoon"
              >
                <img src="/assets/logo.png" alt="Raccoon Corporation" className="partner-logo" />
                <span className="partner-name">Raccoon Corporation</span>
              </a>
            </div>
          </AnimatedOnScroll>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="section cta-section" id="cta">
        <div className="container">
          <AnimatedOnScroll>
            <div className="cta-inner">
              <GlitchText text="Rejoignez-nous, vous ne serez pas déçus !" tag="h2" className="cta-title" />
              <p className="cta-text">Fin normalement.</p>
              <a
                href="https://discord.gg/TkXZqNeG82"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                id="cta-discord-btn"
              >
                Rejoindre le Discord
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z"/>
                </svg>
              </a>
            </div>
          </AnimatedOnScroll>
        </div>
      </section>
    </>
  )
}
