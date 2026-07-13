import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { motion } from 'framer-motion'
import heart from '@assets/animations/heart.lottie'
import jumpingGifts from '@assets/animations/jumping_gift_boxes.lottie'
import parrot from '@assets/animations/parrot_dancing.lottie'
import { BouncingText } from '@/components/BouncingText'
import { WaveText } from '@/slides/story/birth/WaveText'
import { BeatConfettiBurst } from './BeatConfettiBurst'
import { BeatScatterDecor } from './BeatScatterDecor'
import { BeatTwinkleText } from './BeatTwinkleText'
import {
  FADE_IN_MS,
  FADE_OUT_MS,
  HEART_SIZE,
  JUMPING_GIFTS_SIZE,
  PARROT_SIZE,
  WAVE_AMPLITUDE_PX,
  WAVE_CYCLE_DURATION_S,
  WAVE_LETTER_STAGGER_S,
  WAVE_TEXT_CLASS,
} from './constants'
import { FAREWELL_BEATS } from './farewellCopy'
import type { BeatSegment } from './useFarewellPhases'

type FarewellBeatProps = {
  beatIndex: number
  segment: BeatSegment
  waveEnabled: boolean
}

export function FarewellBeat({ beatIndex, segment, waveEnabled }: FarewellBeatProps) {
  const text = FAREWELL_BEATS[beatIndex] ?? FAREWELL_BEATS[0]
  const isFadeIn = segment === 'fadeIn'
  const isFadeOut = segment === 'fadeOut'
  const fadeDurationMs = isFadeOut ? FADE_OUT_MS : isFadeIn ? FADE_IN_MS : 0

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden px-4">
      {beatIndex === 3 && <BeatConfettiBurst active />}

      <motion.div
        key={beatIndex}
        className="absolute inset-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFadeOut ? 0 : 1 }}
        transition={{
          duration: fadeDurationMs / 1000,
          ease: 'easeInOut',
        }}
      >
        {beatIndex === 3 && <BeatScatterDecor />}

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-4 text-center sm:gap-5">
          {beatIndex === 0 && (
            <>
              <motion.div
                className="flex items-center justify-center"
                style={{ width: HEART_SIZE, height: HEART_SIZE }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <DotLottieReact src={heart} loop autoplay className="h-full w-full" />
              </motion.div>
              <WaveText
                text={text}
                waveEnabled={waveEnabled}
                className={WAVE_TEXT_CLASS}
                waveAmplitudePx={WAVE_AMPLITUDE_PX}
                waveCycleDurationS={WAVE_CYCLE_DURATION_S}
                waveLetterStaggerS={WAVE_LETTER_STAGGER_S}
              />
            </>
          )}

          {beatIndex === 1 && (
            <>
              <div
                className="flex items-center justify-center"
                style={{ width: JUMPING_GIFTS_SIZE, height: JUMPING_GIFTS_SIZE }}
              >
                <DotLottieReact
                  key="jumping-gifts-beat-2"
                  src={jumpingGifts}
                  loop={false}
                  autoplay
                  className="h-full w-full"
                />
              </div>
              <WaveText
                text={text}
                waveEnabled={waveEnabled}
                className={WAVE_TEXT_CLASS}
                waveAmplitudePx={WAVE_AMPLITUDE_PX}
                waveCycleDurationS={WAVE_CYCLE_DURATION_S}
                waveLetterStaggerS={WAVE_LETTER_STAGGER_S}
              />
              <div
                className="flex items-center justify-center"
                style={{ width: PARROT_SIZE, height: PARROT_SIZE }}
              >
                <DotLottieReact src={parrot} loop autoplay className="h-full w-full" />
              </div>
            </>
          )}

          {beatIndex === 2 && <BeatTwinkleText text={text} waveEnabled={waveEnabled} />}

          {beatIndex === 3 && (
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
              <BouncingText text={text} colorCycle delay={0.15} />
            </h1>
          )}
        </div>
      </motion.div>
    </div>
  )
}
