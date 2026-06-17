import { useCallback } from 'react'
import { useSlideshow } from '@/slideshow/SlideshowProvider'
import { FiestaBackground } from '@/theme/FiestaBackground'
import { BirthStoryContent } from './BirthStoryContent'
import { BirthStoryCta } from './BirthStoryCta'
import { useBirthStoryBeats } from './useBirthStoryBeats'

export function BirthStorySlide({ isActive }: { isActive: boolean }) {
  const { goToNext } = useSlideshow()
  const { beatIndex, advanceBeat, isFinalBeat, isCtaLocked } = useBirthStoryBeats(isActive)

  const handleContinue = useCallback(() => {
    if (isCtaLocked) return

    if (isFinalBeat) {
      goToNext()
      return
    }

    advanceBeat()
  }, [advanceBeat, goToNext, isCtaLocked, isFinalBeat])

  if (!isActive) return null

  return (
    <div className="relative h-full w-full overflow-hidden">
      <FiestaBackground />

      <div className="relative z-10 h-full pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] pt-2 sm:pt-4">
        <BirthStoryContent beatIndex={beatIndex} />
      </div>

      <BirthStoryCta isLocked={isCtaLocked} onClick={handleContinue} />
    </div>
  )
}
