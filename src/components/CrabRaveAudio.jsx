import { useEffect, useRef } from 'react'

export default function CrabRaveAudio({ play }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (play) {
      if (audioRef.current) {
        audioRef.current.currentTime = 25 // Start at 25 seconds
        audioRef.current.play().catch(err => console.log("Autoplay blocked:", err))
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [play])

  return (
    <audio 
      ref={audioRef} 
      src="/assets/dance_rave.m4a"
      loop
    />
  )
}
