import { useCallback, useEffect, useState } from 'react'
import { SlideHint } from '@/components/SlideHint'
import { useSlideshow } from '@/slideshow/SlideshowProvider'
import { FiestaBackground } from '@/theme/FiestaBackground'
import { AdjectiveReveal } from './AdjectiveReveal'
import { HINT_FADE_MS, HINT_HOLD_MS } from './constants'
import { GiftCatchBoard } from './GiftCatchBoard'
import { GiftCatchCta } from './GiftCatchCta'
import { HINT_TEXT } from './giftCatchCopy'
import { useGiftCatchPhases } from './useGiftCatchPhases'
import { useGiftSpawn } from './useGiftSpawn'

export function GiftCatchSlide({ isActive }: { isActive: boolean }) {
  const { goToNext } = useSlideshow()
  const [spawning, setSpawning] = useState(false)
  const { gifts, caughtCount, catchGift, missGift, clearGifts } = useGiftSpawn(
    isActive,
    spawning,
  )
  const { phase, showAdjectives } = useGiftCatchPhases(isActive, caughtCount)

  useEffect(() => {
    setSpawning(isActive && phase === 'interactive')
  }, [isActive, phase])

  useEffect(() => {
    if (showAdjectives) clearGifts()
  }, [showAdjectives, clearGifts])

  const handleNext = useCallback(() => {
    if (phase !== 'cta') return
    goToNext()
  }, [goToNext, phase])

  if (!isActive) return null

  const showBoard = phase === 'interactive' || phase === 'complete'
  const giftsExiting = phase === 'complete'

  return (
    <div className="relative h-full w-full overflow-hidden">
      <FiestaBackground />

      <div className="relative z-10 flex h-full min-h-0 flex-col items-center pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] pt-4 sm:pt-6">
        <SlideHint
          visible={phase === 'hint'}
          text={HINT_TEXT}
          fadeMs={HINT_FADE_MS}
          holdMs={HINT_HOLD_MS}
        />

        <GiftCatchBoard
          visible={showBoard}
          showCounter={phase === 'interactive'}
          caughtCount={caughtCount}
          gifts={gifts}
          interactive={phase === 'interactive'}
          exiting={giftsExiting}
          onCatch={catchGift}
          onMiss={missGift}
        />
      </div>

      <AdjectiveReveal visible={showAdjectives} />
      <GiftCatchCta visible={phase === 'cta'} onClick={handleNext} />
    </div>
  )
}
