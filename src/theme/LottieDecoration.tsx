import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { LottiePlacement } from './lottieConfig'

const positionClasses: Record<Exclude<LottiePlacement['position'], 'fullscreen'>, string> = {
  'top-left': 'top-[5%] left-[3%] sm:left-[5%]',
  'top-right': 'top-[5%] right-[3%] sm:right-[5%]',
  'bottom-left': 'bottom-[10%] left-[2%] sm:left-[4%]',
  'bottom-right': 'bottom-[10%] right-[2%] sm:right-[4%]',
  'mid-left': 'top-1/2 left-[2%] -translate-y-1/2 sm:left-[4%]',
  'mid-right': 'top-1/2 right-[2%] -translate-y-1/2 sm:right-[4%]',
  'top-center': 'top-[5%] left-1/2 -translate-x-1/2',
}

type LottieDecorationProps = LottiePlacement & {
  className?: string
}

export function LottieDecoration({
  src,
  position,
  size,
  delay = 0,
  hideOnMobile = false,
  className = '',
  float = false,
  spin = false,
  loop = true,
}: LottieDecorationProps) {
  const visibility = hideOnMobile ? 'hidden sm:block' : 'block'

  if (position === 'fullscreen') {
    return (
      <motion.div
        className={`pointer-events-none absolute inset-0 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.8, delay }}
      >
        <DotLottieReact src={src} loop={loop} autoplay className="h-full w-full object-cover" />
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`pointer-events-none absolute ${positionClasses[position]} ${visibility} ${className}`}
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.5, rotate: spin ? -20 : 0 }}
      animate={{
        opacity: 0.92,
        scale: [1, 1.06, 1, 1.03, 1],
        y: float ? [0, -14, 0, -8, 0] : 0,
        rotate: spin ? [0, 8, -6, 4, 0] : float ? [0, -2, 2, 0] : 0,
      }}
      transition={{
        opacity: { duration: 0.7, delay },
        scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.7 },
        y: float ? { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.7 } : undefined,
        rotate: spin
          ? { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.7 }
          : float
            ? { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.7 }
            : undefined,
      }}
    >
      <DotLottieReact src={src} loop={loop} autoplay className="h-full w-full" />
    </motion.div>
  )
}

type LottieGroupProps = {
  items: LottiePlacement[]
  className?: string
}

export function LottieGroup({ items, className = '' }: LottieGroupProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {items.map((item) => (
        <LottieDecoration key={`${item.src}-${item.position}`} {...item} />
      ))}
    </div>
  )
}

const ROTATE_MS = 7000

type RotatingDecorationsProps = {
  sets: LottiePlacement[][]
  className?: string
}

export function RotatingDecorations({ sets, className = '' }: RotatingDecorationsProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (sets.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % sets.length)
    }, ROTATE_MS)
    return () => window.clearInterval(id)
  }, [sets.length])

  const currentSet = sets[index] ?? []

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          {currentSet.map((item) => (
            <LottieDecoration key={`${index}-${item.src}-${item.position}`} {...item} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
