import { useEffect, useRef } from 'react'

export default function AnimatedOnScroll({ children, className = '', delay = 0 }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const delayClass = delay ? `delay-${delay}` : ''

  return (
    <div ref={ref} className={`animate-on-scroll ${delayClass} ${className}`}>
      {children}
    </div>
  )
}
