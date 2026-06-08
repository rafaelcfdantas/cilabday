import { useCallback } from 'react'
import { useAudio } from '@/audio/useAudio'
import { useSlideshow } from '@/slideshow/SlideshowProvider'
import { AudioControl } from '@/components/AudioControl'
import { KickoffPhase } from './KickoffPhase'
import { PreludePhase } from './PreludePhase'
import { MainPhase } from './MainPhase'
import { useIntroTimeline } from './useIntroTimeline'

export function IntroSlide({ isActive }: { isActive: boolean }) {
  const { phase, elapsedMs, startTimeline } = useIntroTimeline()
  const { playIntroSoundtrack, fadeOutIntroSoundtrack } = useAudio()
  const { goToNext } = useSlideshow()

  const handleKickoff = useCallback(() => {
    startTimeline()
    playIntroSoundtrack()
  }, [startTimeline, playIntroSoundtrack])

  const handleCtaClick = useCallback(() => {
    if (phase !== 'cta-ready') return
    void fadeOutIntroSoundtrack()
    goToNext()
  }, [phase, fadeOutIntroSoundtrack, goToNext])

  if (!isActive) return null

  const showMainContent = phase === 'main' || phase === 'cta-locked' || phase === 'cta-ready'

  return (
    <div className="relative h-full w-full">
      {phase === 'kickoff' && <KickoffPhase onStart={handleKickoff} />}
      {phase === 'prelude' && <PreludePhase />}
      {showMainContent && (
        <MainPhase phase={phase} elapsedMs={elapsedMs} onCtaClick={handleCtaClick} />
      )}
      <AudioControl />
    </div>
  )
}
