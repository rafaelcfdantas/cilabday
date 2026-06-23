import { motion } from 'framer-motion'

type SlideHintProps = {
  visible: boolean
  text: string
  fadeMs: number
  holdMs: number
  className?: string
}

export function SlideHint({ visible, text, fadeMs, holdMs, className }: SlideHintProps) {
  if (!visible) return null

  const totalMs = fadeMs + holdMs + fadeMs
  const fadeInEnd = fadeMs / totalMs
  const holdEnd = (fadeMs + holdMs) / totalMs

  return (
    <motion.p
      className={[
        'pointer-events-none absolute inset-x-0 top-[18%] z-30 px-6 text-center font-body text-xl font-semibold text-fiesta-cream sm:top-[20%] sm:text-2xl',
        className ?? '',
      ].join(' ')}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{
        duration: totalMs / 1000,
        times: [0, fadeInEnd, holdEnd, 1],
        ease: 'easeInOut',
      }}
    >
      {text}
    </motion.p>
  )
}
