import { useAudio } from '@/audio/useAudio'
import { SlideHint } from '@/components/SlideHint'
import { useSlideshow } from '@/slideshow/SlideshowProvider'
import { FiestaBackground } from '@/theme/FiestaBackground'
import { GALLERY_HINT } from './galleryCopy'
import { GalleryContent } from './GalleryContent'
import { GALLERY_HINT_FADE_MS, GALLERY_HINT_HOLD_MS } from './constants'
import { useGalleryPhases } from './useGalleryPhases'

export function GallerySlide({ isActive }: { isActive: boolean }) {
  const { goToNext } = useSlideshow()
  const { isMuted } = useAudio()
  const { phase, showHint, beatIndex, isActionLocked, advanceBeat } = useGalleryPhases(isActive)

  if (!isActive) return null

  return (
    <div className="relative h-full w-full overflow-hidden">
      <FiestaBackground />

      <div className="relative z-10 flex h-full items-center justify-center pb-[calc(1rem+env(safe-area-inset-bottom,0px))] pt-4 sm:pt-6">
        <SlideHint
          visible={showHint}
          text={GALLERY_HINT}
          fadeMs={GALLERY_HINT_FADE_MS}
          holdMs={GALLERY_HINT_HOLD_MS}
        />

        {phase === 'gallery' && (
          <GalleryContent
            beatIndex={beatIndex}
            isActionLocked={isActionLocked}
            isMuted={isMuted}
            advanceBeat={advanceBeat}
            goToNext={goToNext}
          />
        )}
      </div>
    </div>
  )
}
