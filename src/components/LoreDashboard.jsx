import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AnimatedOnScroll from './AnimatedOnScroll'
import GlitchText from './GlitchText'
import ScannerImage from './ScannerImage'
import { hudAudio } from '../utils/AudioEngine'

function Counter({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const increment = end / (duration / 16)
          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [end, duration, hasAnimated])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function LoreDashboard() {
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState([
    'Initialisation des protocoles de combat...',
    'Connexion au serveur RSI... OK',
    'Avertissement : Pilotes bourrés détectés.'
  ])
  const navigate = useNavigate()
  const logContainerRef = useRef(null)

  const scrollToBottom = () => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [logs])

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      
      const cmd = input.trim().toLowerCase()
      const newLogs = [...logs, `> ${input}`]
      
      hudAudio.playUiBeep(800, 'sine', 0.05)

      switch (cmd) {
        case '/help':
          newLogs.push('Commandes disponibles : /help, /whoami, /status, /fleet, /clear')
          break
        case '/whoami':
          newLogs.push('Utilisateur : [REDACTED]. Grade : Crustacé de Première Classe.')
          break
        case '/status':
          newLogs.push('Vaisseaux : En feu. Munitions : Vides. Bières : 0. Tout est normal.')
          break
        case '/fleet':
          newLogs.push('Accès sécurisé à la flotte... Redirection en cours...')
          setTimeout(() => navigate('/fleet'), 1500)
          break
        case '/clear':
          setLogs([])
          setInput('')
          return
        case '/selfdestruct':
          newLogs.push('ALERTE : Séquence d\'autodestruction activée ! T-minus 3 seconds...')
          document.body.classList.add('self-destruct-active')
          hudAudio.playAlarm()
          setTimeout(() => {
            document.body.classList.remove('self-destruct-active')
            setLogs(['SYSTÈME RÉINITIALISÉ. TOUT VA BIEN.'])
          }, 3000)
          break
        case '/dance':
          newLogs.push('Activation du mode Dance Floor... 🦀🕺')
          window.dispatchEvent(new CustomEvent('toggle-party-mode'))
          break
        case '/crab':
          newLogs.push('Curseur crabe activé ! 🦀')
          document.body.classList.toggle('crab-mode-active')
          break
        case '':
          break
        default:
          newLogs.push(`Commande inconnue : ${cmd}. Tapez /help pour la liste.`)
      }

      setLogs(newLogs)
      setInput('')
    }
  }

  return (
    <section className="section dashboard" id="dashboard">
      <div className="container">
        <AnimatedOnScroll>
          <div className="dashboard-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="terminal-title">CRUSTACEAN COMMAND CENTER v1.0.4</div>
            </div>
            <div className="terminal-body" onClick={() => document.getElementById('term-input').focus()}>
              <div className="dashboard-grid">
                
                <div className="stat-box">
                  <div className="stat-label">SYSTÈMES EXPLORÉS</div>
                  <div className="stat-value text-cyan">
                    <Counter end={42} />
                  </div>
                  <div className="stat-desc">Majeure partie par erreur.</div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">VAISSEAUX CRASHÉS (CE MOIS)</div>
                  <div className="stat-value text-orange">
                    <Counter end={17} />
                  </div>
                  <div className="stat-desc">Dégâts collatéraux acceptables.</div>
                </div>

                <div className="stat-box">
                  <div className="stat-label">TAUX DE SEL ORBITAL</div>
                  <div className="stat-value text-red blink">
                    CRITIQUE (<Counter end={98} suffix="%" />)
                  </div>
                  <div className="stat-desc">
                    <GlitchText text="SYSTÈME INSTABLE" className="warning-text" />
                  </div>
                </div>

              </div>
              <div className="terminal-logs" ref={logContainerRef}>
                {logs.map((log, i) => (
                  <p key={i}>&gt; {log}</p>
                ))}
                <div className="terminal-input-wrapper">
                  <span className="terminal-prompt">&gt;</span>
                  <input
                    id="term-input"
                    type="text"
                    className="terminal-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <span className="terminal-cursor">_</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedOnScroll>
      </div>
    </section>
  )
}

