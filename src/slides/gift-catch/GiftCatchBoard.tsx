import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BOARD_FADE_MS } from './constants'
import { FallingGiftTarget } from './FallingGiftTarget'
import type { ActiveGift } from './useGiftSpawn'

type GiftCatchBoardProps = {
  visible: boolean
  showCounter: boolean
  caughtCount: number
  gifts: ActiveGift[]
  interactive: boolean
  exiting: boolean
  onCatch: (id: string) => void
  onMiss: (id: string) => void
}

export function GiftCatchBoard({
  visible,
  showCounter,
  caughtCount,
  gifts,
  interactive,
  exiting,
  onCatch,
  onMiss,
}: GiftCatchBoardProps) {
  const playfieldRef = useRef<HTMLDivElement>(null)
  const [playfieldHeightPx, setPlayfieldHeightPx] = useState(0)

  useEffect(() => {
    if (!visible) {
      setPlayfieldHeightPx(0)
      return
    }

    const el = playfieldRef.current
    if (!el) return

    const updateHeight = () => setPlayfieldHeightPx(el.clientHeight)
    updateHeight()

    const observer = new ResizeObserver(updateHeight)
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  if (!visible) return null

  return (
    <motion.div
      className="relative z-10 flex min-h-0 w-full flex-1 flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: BOARD_FADE_MS / 1000, ease: 'easeOut' }}
    >
      {showCounter ? (
        <p
          className="pointer-events-none shrink-0 pt-2 font-display text-4xl font-semibold text-fiesta-cream sm:text-5xl"
          aria-live="polite"
        >
          {caughtCount}
        </p>
      ) : (
        <div className="h-12 shrink-0 sm:h-14" aria-hidden />
      )}

      <div
        ref={playfieldRef}
        className="relative mt-2 min-h-[65dvh] w-full flex-1 overflow-hidden px-2 sm:min-h-[70dvh]"
      >
        {playfieldHeightPx > 0 &&
          gifts.map((gift) => (
            <FallingGiftTarget
              key={gift.id}
              id={gift.id}
              src={gift.src}
              xPercent={gift.xPercent}
              fallDurationMs={gift.fallDurationMs}
              playfieldHeightPx={playfieldHeightPx}
              interactive={interactive}
              exiting={exiting}
              onCatch={onCatch}
              onMiss={onMiss}
            />
          ))}
      </div>
    </motion.div>
  )
}
