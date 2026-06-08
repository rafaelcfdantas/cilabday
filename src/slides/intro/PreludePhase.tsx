import { motion } from 'framer-motion'
import { LottieGroup } from '@/theme/LottieDecoration'
import { preludeDecorations } from '@/theme/lottieConfig'
import { FiestaBackground } from '@/theme/FiestaBackground'

export function PreludePhase() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6">
      <FiestaBackground />
      <LottieGroup items={preludeDecorations} />

      <motion.p
        className="relative z-10 font-display text-xl italic text-fiesta-cream sm:text-2xl md:text-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        Preparando la fiesta…
      </motion.p>
    </div>
  )
}
