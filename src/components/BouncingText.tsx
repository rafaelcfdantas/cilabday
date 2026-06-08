import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

type BouncingTextProps = {
  text: string
  className?: string
  delay?: number
  colorCycle?: boolean
}

const fiestaColors = ['#FFF8F0', '#F4A127', '#E84855', '#C5299D', '#1B998B']

const containerVariants: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay },
  }),
}

const charVariants = (colorCycle: boolean): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.3, rotate: -12 },
  visible: (i: number) => ({
    opacity: 1,
    y: [0, -10, 0, -5, 0],
    scale: [1, 1.08, 1, 1.04, 1],
    rotate: [0, -3, 3, -2, 0],
    ...(colorCycle ? { color: fiestaColors[i % fiestaColors.length] } : {}),
    transition: {
      y: { duration: 2.5, repeat: Infinity, repeatDelay: 0.5 + (i % 5) * 0.15, ease: 'easeInOut' },
      scale: { duration: 2.5, repeat: Infinity, repeatDelay: 0.5 + (i % 5) * 0.15, ease: 'easeInOut' },
      rotate: { duration: 2.5, repeat: Infinity, repeatDelay: 0.5 + (i % 5) * 0.15, ease: 'easeInOut' },
      opacity: { duration: 0.5 },
      ...(colorCycle ? { color: { duration: 0.5 } } : {}),
    },
  }),
})

export function BouncingText({ text, className = '', delay = 0, colorCycle = false }: BouncingTextProps) {
  const chars = text.split('')

  return (
    <motion.span
      className={`inline-flex flex-wrap justify-center gap-[0.02em] ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      aria-label={text}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block origin-bottom"
          variants={charVariants(colorCycle)}
          custom={i}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}
