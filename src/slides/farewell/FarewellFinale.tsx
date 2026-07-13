import { motion } from 'framer-motion'
import { FADE_IN_MS } from './constants'
import { THE_END_TEXT, WATCH_AGAIN_LABEL } from './farewellCopy'

export function FarewellFinale() {
  return (
    <motion.div
      className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-8 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: FADE_IN_MS / 1000, ease: 'easeOut' }}
    >
      <p className="font-display text-2xl tracking-[0.35em] text-fiesta-cream/50 sm:text-3xl md:text-4xl">
        {THE_END_TEXT}
      </p>
      <button
        type="button"
        onClick={() => {
          window.location.reload()
        }}
        className="font-body text-sm text-fiesta-cream/40 underline-offset-4 transition-colors hover:text-fiesta-cream/70 hover:underline sm:text-base"
      >
        {WATCH_AGAIN_LABEL}
      </button>
    </motion.div>
  )
}
