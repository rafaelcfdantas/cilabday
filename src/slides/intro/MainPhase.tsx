import { motion } from 'framer-motion'
import { BouncingText } from '@/components/BouncingText'
import { RotatingDecorations } from '@/theme/LottieDecoration'
import { mainDecorationSets } from '@/theme/lottieConfig'
import { AnimatedFiestaBackground } from '@/theme/AnimatedFiestaBackground'
import { FullscreenConfetti } from '@/theme/FullscreenConfetti'
import { FloatingParticles } from '@/theme/FloatingParticles'
import { IntroCta } from './IntroCta'
import type { IntroPhase } from './useIntroTimeline'

type MainPhaseProps = {
  phase: IntroPhase
  elapsedMs: number
  onCtaClick: () => void
}

export function MainPhase({ phase, elapsedMs, onCtaClick }: MainPhaseProps) {
  const showCta = phase === 'main' || phase === 'cta-locked' || phase === 'cta-ready'

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 sm:px-8">
      <AnimatedFiestaBackground />
      <FullscreenConfetti elapsedMs={elapsedMs} />
      <FloatingParticles />
      <RotatingDecorations sets={mainDecorationSets} />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-5 text-center sm:gap-6">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
        >
          <motion.span
            className="mb-1 inline-block text-4xl sm:text-5xl"
            animate={{ rotate: [0, 12, -8, 10, 0], scale: [1, 1.15, 1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎉
          </motion.span>

          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            <BouncingText text="Happy Birthday, Cila!" colorCycle delay={0.2} />
          </h1>
        </motion.div>

        <motion.p
          className="max-w-md font-body text-base text-fiesta-cream/90 sm:text-lg md:text-xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 120 }}
        >
          <motion.span
            animate={{ color: ['#FFF8F0', '#F4A127', '#FFF8F0'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            A little birthday surprise made especially for you.
          </motion.span>
        </motion.p>

        <motion.p
          className="font-display text-lg italic sm:text-xl md:text-2xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: [1, 1.05, 1],
            color: ['#F4A127', '#E84855', '#C5299D', '#F4A127'],
          }}
          transition={{
            opacity: { duration: 0.5, delay: 0.7 },
            scale: { duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.7 },
            color: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 },
          }}
        >
          ¡Feliz cumpleaños!
        </motion.p>

        {showCta && <IntroCta phase={phase} elapsedMs={elapsedMs} onClick={onCtaClick} />}
      </div>
    </div>
  )
}
