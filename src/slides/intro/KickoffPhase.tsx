import { motion } from 'framer-motion'
import { LottieGroup } from '@/theme/LottieDecoration'
import { kickoffDecorations } from '@/theme/lottieConfig'
import { FiestaBackground } from '@/theme/FiestaBackground'

type KickoffPhaseProps = {
  onStart: () => void
}

export function KickoffPhase({ onStart }: KickoffPhaseProps) {
  return (
    <button
      type="button"
      onClick={onStart}
      className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center px-6 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-fiesta-gold/60"
      aria-label="Tap to begin the birthday surprise"
    >
      <FiestaBackground />
      <LottieGroup items={kickoffDecorations} className="opacity-60" />

      <motion.div
        className="relative z-10 max-w-md space-y-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="font-display text-2xl leading-snug text-fiesta-cream sm:text-3xl md:text-4xl">
          I hope you love this surprise. You&apos;re so special!
        </p>
        <motion.p
          className="font-body text-sm tracking-wide text-fiesta-gold/90 sm:text-base"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Tap to begin
        </motion.p>
      </motion.div>
    </button>
  )
}
