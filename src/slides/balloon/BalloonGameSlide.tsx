import { useCallback } from 'react'
import { useAudio } from '@/audio/useAudio'
import { useSlideshow } from '@/slideshow/SlideshowProvider'
import { FiestaBackground } from '@/theme/FiestaBackground'
import { BalloonGameBoard } from './BalloonGameBoard'
import { BalloonGameCta } from './BalloonGameCta'
import { BalloonGameHint } from './BalloonGameHint'
import { playBalloonPopSfx } from './playBalloonPopSfx'
import { useBalloonGamePhases } from './useBalloonGamePhases'

export function BalloonGameSlide({ isActive }: { isActive: boolean }) {
  const { goToNext } = useSlideshow()
  const { isMuted } = useAudio()
  const { phase, poppedCells, popCell, isInteractive } = useBalloonGamePhases(isActive)

  const handlePop = useCallback(
    (index: number) => {
      if (!isInteractive || poppedCells.has(index)) return
      playBalloonPopSfx(isMuted)
      popCell(index)
    },
    [isInteractive, isMuted, popCell, poppedCells],
  )

  const handleNext = useCallback(() => {
    if (phase !== 'cta') return
    goToNext()
  }, [goToNext, phase])

  if (!isActive) return null

  const showHint = phase === 'hint' || phase === 'reveal'

  return (
    <div className="relative h-full w-full overflow-hidden">
      <FiestaBackground />

      <div className="relative z-10 flex h-full flex-col items-center justify-center pb-[calc(5.75rem+env(safe-area-inset-bottom,0px))] pt-4 sm:pt-6">
        <BalloonGameHint visible={showHint} />
        <BalloonGameBoard
          phase={phase}
          poppedCells={poppedCells}
          isInteractive={isInteractive}
          onPop={handlePop}
        />
      </div>

      <BalloonGameCta visible={phase === 'cta'} onClick={handleNext} />
    </div>
  )
}
