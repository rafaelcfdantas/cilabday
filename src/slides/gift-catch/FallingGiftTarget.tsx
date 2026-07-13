import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import {
  GIFT_EXIT_FADE_MS,
  GIFT_VISUAL_MAX_PX,
  MIN_TAP_TARGET_PX,
} from './constants'

type FallingGiftTargetProps = {
  id: string
  src: string
  xPercent: number
  fallDurationMs: number
  /** Playfield height in px — fall travels this distance (duration = speed across playfield). */
  playfieldHeightPx: number
  interactive: boolean
  exiting: boolean
  onCatch: (id: string) => void
  onMiss: (id: string) => void
}

export function FallingGiftTarget({
  id,
  src,
  xPercent,
  fallDurationMs,
  playfieldHeightPx,
  interactive,
  exiting,
  onCatch,
  onMiss,
}: FallingGiftTargetProps) {
  const exitingRef = useRef(exiting)
  const caughtRef = useRef(false)

  useEffect(() => {
    exitingRef.current = exiting
  }, [exiting])

  // Start fully above the playfield; end fully past the bottom edge.
  const startY = -GIFT_VISUAL_MAX_PX
  const endY = playfieldHeightPx

  return (
    <motion.button
      type="button"
      aria-label="Catch gift"
      disabled={!interactive || exiting}
      onClick={() => {
        if (!interactive || exiting || caughtRef.current) return
        caughtRef.current = true
        onCatch(id)
      }}
      className="absolute top-0 flex -translate-x-1/2 cursor-pointer items-center justify-center p-1 disabled:cursor-default"
      style={{
        left: `${xPercent}%`,
        minWidth: MIN_TAP_TARGET_PX,
        minHeight: MIN_TAP_TARGET_PX,
        pointerEvents: exiting || !interactive ? 'none' : 'auto',
      }}
      initial={{ y: startY, opacity: 1 }}
      animate={{ y: endY, opacity: exiting ? 0 : 1 }}
      transition={{
        y: { duration: fallDurationMs / 1000, ease: 'linear' },
        opacity: {
          duration: exiting ? GIFT_EXIT_FADE_MS / 1000 : 0,
          ease: 'easeOut',
        },
      }}
      onAnimationComplete={() => {
        if (caughtRef.current || exitingRef.current) return
        onMiss(id)
      }}
    >
      <DotLottieReact
        src={src}
        loop={false}
        autoplay
        className="pointer-events-none h-[clamp(5rem,18vw,8rem)] w-[clamp(5rem,18vw,8rem)]"
      />
    </motion.button>
  )
}
