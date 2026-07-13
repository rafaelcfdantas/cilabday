import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from 'framer-motion'
import confetti02 from '@assets/animations/confetti_02.lottie'
import { useEffect, useState } from 'react'

const CONFETTI_SIZE = 0.7
/** Keep mounted briefly after one-shot play, then unmount for GPU hygiene. */
const CONFETTI_UNMOUNT_MS = 3500

type BeatConfettiBurstProps = {
  active: boolean
}

export function BeatConfettiBurst({ active }: BeatConfettiBurstProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!active) {
      setVisible(false)
      return
    }

    setVisible(true)
    const timer = window.setTimeout(() => setVisible(false), CONFETTI_UNMOUNT_MS)
    return () => window.clearTimeout(timer)
  }, [active])

  if (!visible) return null

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        style={{ width: `${CONFETTI_SIZE * 100}%`, height: `${CONFETTI_SIZE * 100}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.48 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <DotLottieReact
          src={confetti02}
          loop={false}
          autoplay
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  )
}
