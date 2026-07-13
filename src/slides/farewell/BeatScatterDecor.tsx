import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from 'framer-motion'
import { FAREWELL_DECOR_SLOTS } from './farewellDecorSlots'
import { SCATTER_SIZE } from './constants'

export function BeatScatterDecor() {
  return (
    <div className="pointer-events-none absolute inset-6 z-0 overflow-hidden sm:inset-10">
      {FAREWELL_DECOR_SLOTS.map((slot) => (
        <motion.div
          key={slot.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${slot.leftPercent}%`,
            top: `${slot.topPercent}%`,
            width: SCATTER_SIZE,
            height: SCATTER_SIZE,
            rotate: `${slot.rotateDeg}deg`,
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <DotLottieReact src={slot.src} loop autoplay className="h-full w-full" />
        </motion.div>
      ))}
    </div>
  )
}
