import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import twinkleSrc from '@assets/animations/twinkle_stars_02.lottie'
import { WaveText } from '@/slides/story/birth/WaveText'
import {
  WAVE_AMPLITUDE_PX,
  WAVE_CYCLE_DURATION_S,
  WAVE_LETTER_STAGGER_S,
  WAVE_TEXT_CLASS,
} from './constants'

type BeatTwinkleTextProps = {
  text: string
  waveEnabled: boolean
}

/** Glitter overlay must match text box via inset-0 — never DateBeat fixed rem sizes. */
export function BeatTwinkleText({ text, waveEnabled }: BeatTwinkleTextProps) {
  return (
    <div className="relative inline-block max-w-[min(100%,28rem)] px-2 text-center">
      <WaveText
        text={text}
        waveEnabled={waveEnabled}
        className={WAVE_TEXT_CLASS}
        waveAmplitudePx={WAVE_AMPLITUDE_PX}
        waveCycleDurationS={WAVE_CYCLE_DURATION_S}
        waveLetterStaggerS={WAVE_LETTER_STAGGER_S}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 mix-blend-screen opacity-90"
      >
        <DotLottieReact src={twinkleSrc} loop autoplay className="h-full w-full" />
      </div>
    </div>
  )
}
