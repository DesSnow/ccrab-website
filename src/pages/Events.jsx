import { Calendar, MapPin, Clock } from 'lucide-react'
import AnimatedOnScroll from '../components/AnimatedOnScroll'

const events = [
  {
    id: 1,
    title: 'Watch Party 2955 – CitizenCon Direct',
    description: 'Soirée Watch Party pour le CitizenCon en direct ! Rejoignez-nous sur Discord pour suivre les annonces ensemble.',
    date: '2025-10-11',
    month: 'OCT',
    day: '11',
    year: '2025',
    location: 'Discord CCRAB',
    time: '20h00 CET',
    status: 'past',
  },
  {
    id: 2,
    title: 'Opération Crustacé Alpha',
    description: 'Raid massif multi-divisions dans le Stanton. Toutes les divisions sont mobilisées pour cette opération coordonnée.',
    date: '2026-04-12',
    month: 'AVR',
    day: '12',
    year: '2026',
    location: 'Stanton System',
    time: '21h00 CET',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Soirée Recrutement — Session ouverte',
    description: 'Venez découvrir la CCRAB lors de notre session de recrutement ouverte. Ambiance garantie, niveau pas requis.',
    date: '2026-04-25',
    month: 'AVR',
    day: '25',
    year: '2026',
    location: 'Discord CCRAB',
    time: '19h00 CET',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Soirée Recrutement — Session ouverte',
    description: 'Venez découvrir la CCRAB lors de notre session de recrutement ouverte. Ambiance garantie, niveau pas requis.',
    date: '2026-04-25',
    month: 'AVR',
    day: '25',
    year: '2026',
    location: 'Discord CCRAB',
    time: '19h00 CET',
    status: 'past',
  },
]

export default function Events() {
  const upcomingEvents = events.filter(e => e.status === 'upcoming')
  const pastEvents = events.filter(e => e.status === 'past')

  return (
    <div className="events-page" id="events-page">
      <div className="container">
        <AnimatedOnScroll>
          <div className="section-title-wrapper">
            <h1 className="section-title">Événements</h1>
            <p className="section-subtitle">
              Les rendez-vous de la CCRAB — passés, présents et futurs.
            </p>
            <div className="section-line" />
          </div>
        </AnimatedOnScroll>

        {upcomingEvents.length > 0 && (
          <>
            <AnimatedOnScroll>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--accent-orange)',
                letterSpacing: '0.1em',
                marginBottom: '24px',
                textTransform: 'uppercase',
              }}>
                À venir
              </h2>
            </AnimatedOnScroll>
            <div className="events-list" style={{ marginBottom: '64px' }}>
              {upcomingEvents.map((event, i) => (
                <AnimatedOnScroll key={event.id} delay={i + 1}>
                  <div className="glass-card event-card" id={`event-${event.id}`}>
                    <div className="event-date">
                      <div className="event-date-month">{event.month}</div>
                      <div className="event-date-day">{event.day}</div>
                    </div>
                    <div className="event-info">
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-description">{event.description}</p>
                      <div className="event-meta">
                        <span className="event-meta-item">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                        <span className="event-meta-item">
                          <Clock size={14} />
                          {event.time}
                        </span>
                      </div>
                    </div>
                    <span className={`event-status ${event.status}`}>
                      {event.status === 'upcoming' ? 'À venir' : 'Passé'}
                    </span>
                  </div>
                </AnimatedOnScroll>
              ))}
            </div>
          </>
        )}

        {pastEvents.length > 0 && (
          <>
            <AnimatedOnScroll>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.2rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                marginBottom: '24px',
                textTransform: 'uppercase',
              }}>
                Événements passés
              </h2>
            </AnimatedOnScroll>
            <div className="events-list">
              {pastEvents.map((event, i) => (
                <AnimatedOnScroll key={event.id} delay={i + 1}>
                  <div className="glass-card event-card" id={`event-${event.id}`}>
                    <div className="event-date">
                      <div className="event-date-month">{event.month}</div>
                      <div className="event-date-day">{event.day}</div>
                    </div>
                    <div className="event-info">
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-description">{event.description}</p>
                      <div className="event-meta">
                        <span className="event-meta-item">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                        <span className="event-meta-item">
                          <Clock size={14} />
                          {event.time}
                        </span>
                      </div>
                    </div>
                    <span className={`event-status ${event.status}`}>
                      Passé
                    </span>
                  </div>
                </AnimatedOnScroll>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
