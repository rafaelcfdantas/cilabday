import { motion } from 'framer-motion'

type BirthStoryCtaProps = {
  isLocked: boolean
  onClick: () => void
}

export function BirthStoryCta({ isLocked, onClick }: BirthStoryCtaProps) {
  const isReady = !isLocked

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <motion.div
        className="pointer-events-auto w-full max-w-xs sm:max-w-sm"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <motion.button
          type="button"
          disabled={!isReady}
          onClick={onClick}
          className={[
            'w-full rounded-full px-8 py-4 font-body text-base font-semibold sm:text-lg',
            isReady
              ? 'cursor-pointer bg-fiesta-coral text-fiesta-cream'
              : 'cursor-default border-2 border-fiesta-cream/30 bg-fiesta-cream/15 text-fiesta-cream/70 backdrop-blur-sm',
          ].join(' ')}
          style={isReady ? { boxShadow: '0 0 28px rgba(244, 161, 39, 0.5)' } : undefined}
          animate={
            isReady
              ? {
                  scale: [1, 1.03, 1],
                  boxShadow: [
                    '0 0 28px rgba(244, 161, 39, 0.5)',
                    '0 0 36px rgba(232, 72, 85, 0.5)',
                    '0 0 28px rgba(244, 161, 39, 0.5)',
                  ],
                }
              : undefined
          }
          transition={isReady ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } : undefined}
          whileHover={isReady ? { scale: 1.05 } : undefined}
          whileTap={isReady ? { scale: 0.96 } : undefined}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  )
}
