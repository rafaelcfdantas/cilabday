import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from 'framer-motion'
import confetti1 from '@assets/animations/01_confetti.lottie'
import confetti2 from '@assets/animations/02_confetti.lottie'
import confetti3 from '@assets/animations/03_confetti.lottie'
import { getActiveConfettiBurst } from '@/audio/constants'

const confettiSources = [confetti1, confetti2, confetti3]
const CONFETTI_SIZE = 0.7

type FullscreenConfettiProps = {
  elapsedMs: number
}

/**
 * One-shot confetti bursts (no loop). Component unmounts between bursts
 * so the Lottie renderer is not kept alive on the GPU.
 */
export function FullscreenConfetti({ elapsedMs }: FullscreenConfettiProps) {
  const activeBurst = getActiveConfettiBurst(elapsedMs)

  if (activeBurst === null) return null

  const src = confettiSources[activeBurst % confettiSources.length]!

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        key={activeBurst}
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ width: `${CONFETTI_SIZE * 100}%`, height: `${CONFETTI_SIZE * 100}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.48 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <DotLottieReact
          src={src}
          loop={false}
          autoplay
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  )
}
