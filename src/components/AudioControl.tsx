import { motion } from 'framer-motion'
import { useAudio } from '@/audio/useAudio'

export function AudioControl() {
  const { isMuted, toggleMute, hasStarted } = useAudio()

  if (!hasStarted) return null

  return (
    <motion.button
      type="button"
      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
      onClick={toggleMute}
      className="fixed top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-fiesta-indigo/70 text-fiesta-cream backdrop-blur-sm transition hover:border-fiesta-gold/50 hover:bg-fiesta-indigo/90"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileTap={{ scale: 0.95 }}
    >
      {isMuted ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <line x1="22" x2="16" y1="9" y2="15" />
          <line x1="16" x2="22" y1="9" y2="15" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
          <path d="M11 5 6 9H3v6h3l5 4V5Z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </motion.button>
  )
}
