import { motion } from 'framer-motion'
import { CTA_UNLOCK_MS } from '@/audio/constants'
import type { IntroPhase } from './useIntroTimeline'

type IntroCtaProps = {
  phase: IntroPhase
  elapsedMs: number
  onClick: () => void
}

function getSecondsUntilUnlock(elapsedMs: number): number {
  return Math.ceil((CTA_UNLOCK_MS - elapsedMs) / 1000)
}

function getCtaLabel(elapsedMs: number, isReady: boolean): string {
  if (isReady) return 'Next'

  const secondsLeft = getSecondsUntilUnlock(elapsedMs)
  if (secondsLeft >= 1) {
    return `Next... ${secondsLeft}`
  }

  return 'Next'
}

export function IntroCta({ phase, elapsedMs, onClick }: IntroCtaProps) {
  const isReady = phase === 'cta-ready'
  const secondsLeft = getSecondsUntilUnlock(elapsedMs)
  const isCountdownActive = !isReady && secondsLeft >= 1

  const label = getCtaLabel(elapsedMs, isReady)

  return (
    <motion.div
      className="mt-4 flex w-full justify-center sm:mt-6"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: isReady ? 1 : isCountdownActive ? 0.75 : 0.35,
        scale: 1,
      }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.button
        type="button"
        disabled={!isReady}
        onClick={onClick}
        className={[
          'w-full max-w-xs rounded-full px-8 py-4 font-body text-base font-semibold sm:max-w-sm sm:text-lg',
          isReady
            ? 'cursor-pointer bg-fiesta-coral text-fiesta-cream'
            : 'cursor-default border-2 border-fiesta-cream/30 bg-fiesta-cream/15 text-fiesta-cream/70 backdrop-blur-sm',
        ].join(' ')}
        style={isReady ? { boxShadow: '0 0 28px rgba(244, 161, 39, 0.5)' } : undefined}
        animate={
          isReady
            ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 28px rgba(244, 161, 39, 0.5)',
                  '0 0 40px rgba(232, 72, 85, 0.6)',
                  '0 0 28px rgba(244, 161, 39, 0.5)',
                ],
              }
            : isCountdownActive
              ? { scale: [1, 1.02, 1] }
              : undefined
        }
        transition={
          isReady
            ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
            : isCountdownActive
              ? { duration: 1, repeat: Infinity, ease: 'easeInOut' }
              : undefined
        }
        whileHover={isReady ? { scale: 1.06 } : undefined}
        whileTap={isReady ? { scale: 0.96 } : undefined}
      >
        <motion.span
          key={label}
          initial={{ opacity: 0.6, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {label}
        </motion.span>
      </motion.button>
    </motion.div>
  )
}
