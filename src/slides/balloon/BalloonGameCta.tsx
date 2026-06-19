import { motion } from 'framer-motion'

type BalloonGameCtaProps = {
  visible: boolean
  onClick: () => void
}

export function BalloonGameCta({ visible, onClick }: BalloonGameCtaProps) {
  if (!visible) return null

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
          onClick={onClick}
          className="w-full cursor-pointer rounded-full bg-fiesta-coral px-8 py-4 font-body text-base font-semibold text-fiesta-cream sm:text-lg"
          style={{ boxShadow: '0 0 28px rgba(244, 161, 39, 0.5)' }}
          animate={{
            scale: [1, 1.03, 1],
            boxShadow: [
              '0 0 28px rgba(244, 161, 39, 0.5)',
              '0 0 36px rgba(232, 72, 85, 0.5)',
              '0 0 28px rgba(244, 161, 39, 0.5)',
            ],
          }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          Next
        </motion.button>
      </motion.div>
    </div>
  )
}
