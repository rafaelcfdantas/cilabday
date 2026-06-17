import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { AudioControl } from '@/components/AudioControl'
import { useAudio } from '@/audio/useAudio'
import { SLIDE_TRANSITION_MS } from '@/audio/constants'
import { slideRegistry } from './slideRegistry'
import { useSlideshow } from './SlideshowProvider'

const slideVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
}

export function SlideshowShell() {
  const { currentIndex, notifySlideEnterComplete, onSlideActive } = useSlideshow()
  const { playSlideshowSoundtrack } = useAudio()

  useEffect(() => {
    return onSlideActive((index) => {
      if (index === 1) {
        playSlideshowSoundtrack()
      }
    })
  }, [onSlideActive, playSlideshowSoundtrack])

  const currentSlide = slideRegistry[currentIndex]
  if (!currentSlide) return null

  const SlideComponent = currentSlide.component

  return (
    <div className="relative h-dvh w-full overflow-hidden">
      <AudioControl />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          className="absolute inset-0"
          variants={slideVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: SLIDE_TRANSITION_MS / 1000, ease: 'easeInOut' }}
          onAnimationComplete={(definition) => {
            if (definition === 'animate') {
              notifySlideEnterComplete(currentIndex)
            }
          }}
        >
          <SlideComponent isActive={true} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
