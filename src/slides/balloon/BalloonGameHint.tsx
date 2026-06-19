import { motion } from 'framer-motion'
import { HINT_TEXT } from './balloonGameCopy'
import { HINT_FADE_MS, HINT_HOLD_MS, HINT_TOTAL_MS } from './constants'

type BalloonGameHintProps = {
  visible: boolean
}

export function BalloonGameHint({ visible }: BalloonGameHintProps) {
  if (!visible) return null

  const fadeInEnd = HINT_FADE_MS / HINT_TOTAL_MS
  const holdEnd = (HINT_FADE_MS + HINT_HOLD_MS) / HINT_TOTAL_MS

  return (
    <motion.p
      className="pointer-events-none absolute inset-x-0 top-[18%] z-30 px-6 text-center font-body text-xl font-semibold text-fiesta-cream sm:top-[20%] sm:text-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: HINT_TOTAL_MS / 1000,
        times: [0, fadeInEnd, holdEnd, 1],
        ease: 'easeInOut',
      }}
    >
      {HINT_TEXT}
    </motion.p>
  )
}
