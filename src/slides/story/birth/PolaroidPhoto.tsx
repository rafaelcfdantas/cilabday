import { motion } from 'framer-motion'

type PolaroidPhotoProps = {
  src: string
  isCurrent: boolean
}

export function PolaroidPhoto({ src, isCurrent }: PolaroidPhotoProps) {
  return (
    <motion.div
      className="inline-block bg-fiesta-cream p-2 pb-8 shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:p-3 sm:pb-10"
      style={{ rotate: '-3deg' }}
      animate={isCurrent ? { y: [0, -4, 0] } : { y: 0 }}
      transition={
        isCurrent ? { duration: 4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }
      }
    >
      <img
        src={src}
        alt=""
        className="block max-w-44 object-cover sm:max-w-xs"
        draggable={false}
      />
    </motion.div>
  )
}
