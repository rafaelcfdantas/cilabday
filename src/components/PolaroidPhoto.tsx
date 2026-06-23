import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type PolaroidPhotoProps = {
  isCurrent: boolean
  angle?: number
  className?: string
  children: ReactNode
}

export function PolaroidPhoto({ isCurrent, angle = -3, className, children }: PolaroidPhotoProps) {
  return (
    <motion.div
      className={[
        'inline-block bg-fiesta-cream p-2 pb-8 shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:p-3 sm:pb-10',
        className ?? '',
      ].join(' ')}
      style={{ rotate: `${angle}deg` }}
      animate={isCurrent ? { y: [0, -4, 0] } : { y: 0 }}
      transition={
        isCurrent ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }
      }
    >
      {children}
    </motion.div>
  )
}
