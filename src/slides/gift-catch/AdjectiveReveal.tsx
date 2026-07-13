import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { WaveText } from '@/slides/story/birth/WaveText'
import { ADJECTIVE_STAGGER_MS } from './constants'
import { GIFT_CATCH_ADJECTIVES } from './giftCatchCopy'

type AdjectiveLayoutItem = {
  text: string
  leftPercent: number
  topPercent: number
  rotateDeg: number
}

/** Staggered slots: long words on sides; short ones fill the center for wide viewports. */
const BASE_SLOTS: Array<{ left: number; top: number }> = [
  { left: 28, top: 22 }, // Empowering
  { left: 72, top: 28 }, // Imparable
  { left: 50, top: 38 }, // Brave (short — center)
  { left: 70, top: 48 }, // Carinhosa
  { left: 30, top: 54 }, // Graceful
  { left: 48, top: 62 }, // Smart (short — center)
  { left: 72, top: 74 }, // Inolvidable
  { left: 34, top: 80 }, // Brilliant
]

const MIN_LEFT_PERCENT = 26
const MAX_LEFT_PERCENT = 74
const MIN_TOP_PERCENT = 12
const MAX_TOP_PERCENT = 82

function buildLayout(): AdjectiveLayoutItem[] {
  return GIFT_CATCH_ADJECTIVES.map((text, index) => {
    const slot = BASE_SLOTS[index] ?? { left: 40, top: 40 }
    // Small jitter only — large drift collapses gaps on narrow viewports.
    const jitterX = (Math.random() - 0.5) * 2
    const jitterY = (Math.random() - 0.5) * 1.5
    return {
      text,
      leftPercent: Math.min(
        MAX_LEFT_PERCENT,
        Math.max(MIN_LEFT_PERCENT, slot.left + jitterX),
      ),
      topPercent: Math.min(
        MAX_TOP_PERCENT,
        Math.max(MIN_TOP_PERCENT, slot.top + jitterY),
      ),
      rotateDeg: (Math.random() * 12) - 6,
    }
  })
}

type AdjectiveRevealProps = {
  visible: boolean
}

export function AdjectiveReveal({ visible }: AdjectiveRevealProps) {
  const layout = useMemo(() => (visible ? buildLayout() : []), [visible])

  if (!visible) return null

  return (
    <div className="pointer-events-none absolute inset-6 z-20 overflow-hidden sm:inset-10">
      {layout.map((item, index) => (
        <motion.div
          key={`${item.text}-${index}`}
          className="absolute max-w-[34%] -translate-x-1/2 -translate-y-1/2 sm:max-w-[30%]"
          style={{
            left: `${item.leftPercent}%`,
            top: `${item.topPercent}%`,
            rotate: `${item.rotateDeg}deg`,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: [0, -4, 0] }}
          transition={{
            opacity: {
              duration: 0.35,
              delay: (ADJECTIVE_STAGGER_MS * index) / 1000,
              ease: 'easeOut',
            },
            y: {
              duration: 3.2,
              delay: (ADJECTIVE_STAGGER_MS * index) / 1000 + 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          <WaveText
            text={item.text}
            waveEnabled
            className="font-display text-2xl font-semibold text-fiesta-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-3xl md:text-4xl"
          />
        </motion.div>
      ))}
    </div>
  )
}
