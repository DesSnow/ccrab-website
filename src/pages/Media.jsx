import { useState } from 'react'
import AnimatedOnScroll from '../components/AnimatedOnScroll'
import TiltCard from '../components/TiltCard'
import GlitchText from '../components/GlitchText'
import ScannerImage from '../components/ScannerImage'
import { Play, X } from 'lucide-react'

const ads = [
  {
    title: 'POV: Tu essaies de recruter un nouveau crustacé',
    category: 'Tiktok / Humour',
    thumbnail: '/assets/div_perdu.jpg',
    videoUrl: 'https://www.tiktok.com/@dessnow_/video/7175864752269315334',
    desc: 'Un format vertical parfait pour le recrutement rapide. Attention aux pinces !',
    isVertical: true
  },
  {
    title: 'Le Carrack : Pourquoi on est toujours en retard',
    category: 'YouTube / Sérieux',
    thumbnail: '/assets/carrack.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    desc: 'Un documentaire exclusif sur les pannes de moteur et les arrêts bière imprévus.'
  },
  {
    title: 'Tuto : Comment rater son atterrissage avec style',
    category: 'YouTube / Formation',
    thumbnail: '/assets/ares.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    desc: 'Apprenez avec les meilleurs (enfin, avec nous quoi).'
  },
  {
    title: 'Publicité : Cristaline, l\'eau des chevaliers',
    category: 'Commercial',
    thumbnail: '/assets/bottle_cristaline.png',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    desc: 'La boisson officielle de la CCRAB. Maintenant avec plus d\'hydrogène !'
  }
]

export default function Media() {
  const [selectedVideo, setSelectedVideo] = useState(null)

  const getEmbedUrl = (url) => {
    if (!url) return ''
    
    // YouTube Handling
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = ''
      if (url.includes('v=')) {
        videoId = url.split('v=')[1].split('&')[0]
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0]
      }
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    
    // TikTok Handling
    if (url.includes('tiktok.com')) {
      let videoId = ''
      const parts = url.split('/video/')
      if (parts.length > 1) {
        videoId = parts[1].split('?')[0]
      }
      // v2 embed is more reliable for direct iframe
      return `https://www.tiktok.com/embed/v2/${videoId}`
    }

    return url
  }

  const handleOpenVideo = (ad) => {
    setSelectedVideo(ad)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseVideo = () => {
    setSelectedVideo(null)
    document.body.style.overflow = 'auto'
  }

  return (
    <div className="page media-page">
      <section className="hero-compact">
        <div className="container">
          <AnimatedOnScroll>
            <GlitchText text="CATALOGUE PUB" tag="h1" className="page-title" />
            <p className="page-subtitle">Les pépites cinématographiques et TikToks de la CCRAB.</p>
          </AnimatedOnScroll>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="media-grid">
            {ads.map((ad, i) => (
              <AnimatedOnScroll key={i} delay={i + 1}>
                <div className="media-card-wrapper" onClick={() => handleOpenVideo(ad)}>
                  <TiltCard className="media-card">
                    <div className={`media-thumb-container ${ad.isVertical ? 'vertical' : ''}`}>
                      <ScannerImage src={ad.thumbnail} alt={ad.title} className="media-thumb" />
                      <div className="media-play-overlay">
                        <Play size={ad.isVertical ? 64 : 48} fill="currentColor" />
                      </div>
                    </div>
                    <div className="media-content">
                      <div className="media-category">{ad.category}</div>
                      <h3 className="media-title">{ad.title}</h3>
                      <p className="media-desc">{ad.desc}</p>
                    </div>
                  </TiltCard>
                </div>
              </AnimatedOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={handleCloseVideo}>
          <div className="video-modal-container" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={handleCloseVideo}>
              <X size={32} />
            </button>
            <div className={`video-player-wrapper ${selectedVideo.isVertical ? 'vertical' : ''}`}>
              {selectedVideo.videoUrl.match(/\.(mp4|webm|ogg|mov)$/i) ? (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="native-video-player"
                />
              ) : (
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="video-modal-info">
              <h3>{selectedVideo.title}</h3>
              <p>{selectedVideo.desc}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .media-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .media-card-wrapper {
          cursor: pointer;
        }
        .native-video-player {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: #000;
        }
        .media-thumb-container {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: #000;
        }
        .media-thumb-container.vertical {
          height: 450px;
        }
        .media-play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          color: var(--accent-orange);
        }
        .media-card-wrapper:hover .media-play-overlay {
          opacity: 1;
        }
        .media-thumb {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
          transition: transform 0.5s ease;
        }
        .media-card-wrapper:hover .media-thumb {
          transform: scale(1.05);
          opacity: 1;
        }
        .media-content {
          padding: 24px;
        }
        .media-category {
          font-family: var(--font-display);
          font-size: 0.7rem;
          color: var(--accent-orange);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 8px;
        }
        .media-title {
          font-size: 1.25rem;
          margin-bottom: 12px;
          color: var(--text-primary);
        }
        .media-desc {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* Modal Styles */
        .video-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(15px);
          z-index: 2000000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .video-modal-container {
          width: 100%;
          max-width: 900px;
          background: #0a0a0a;
          border: 1px solid var(--border-hud);
          border-radius: var(--radius-lg);
          position: relative;
          box-shadow: 0 0 100px rgba(232, 160, 32, 0.15);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
        }
        .video-player-wrapper {
          position: relative;
          padding-top: 56.25%; /* 16:9 Aspect Ratio */
          background: #000;
          flex-shrink: 0;
        }
        .video-player-wrapper.vertical {
          padding-top: 0;
          height: 600px; /* Fixed height for TikTok to avoid white gaps */
          max-width: 340px;
          margin: 0 auto;
          width: 100%;
        }
        .video-player-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
        }
        .video-player-wrapper.vertical iframe {
          position: relative;
          height: 100%;
        }
        .video-modal-info {
          padding: 20px 30px;
          background: linear-gradient(to bottom, #111, #0a0a0a);
          border-top: 1px solid var(--border-hud);
          overflow-y: auto;
        }
        .video-modal-info h3 {
          margin-bottom: 8px;
          color: var(--accent-orange);
          font-size: 1.4rem;
        }
        .video-modal-info p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }
        .video-modal-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
          z-index: 100;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .video-modal-close:hover {
          transform: rotate(90deg);
          background: var(--accent-orange);
          color: black;
          box-shadow: 0 0 15px var(--accent-orange);
        }

        @media (max-width: 968px) {
          .media-grid {
            grid-template-columns: 1fr;
          }
          .media-thumb-container.vertical {
            height: 400px;
          }
          .video-modal-overlay {
            padding: 20px;
          }
          .video-player-wrapper.vertical {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
