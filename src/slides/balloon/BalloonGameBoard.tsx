import { motion } from 'framer-motion'
import { WaveText } from '@/slides/story/birth/WaveText'
import { PARAGRAPH } from './balloonGameCopy'
import {
  BALLOON_ASSETS,
  BALLOON_COLORS,
  createAnimationOffsets,
  createCellOffsets,
  type CellOffset,
} from './balloonGameLayout'
import { BalloonPopTarget } from './BalloonPopTarget'
import {
  BALLOON_COUNT,
  GAME_REVEAL_MS,
  PIN_CURSOR,
  WAVE_AMPLITUDE_PX,
  WAVE_CYCLE_DURATION_S,
  WAVE_LETTER_STAGGER_S,
} from './constants'
import type { BalloonGamePhase } from './useBalloonGamePhases'
import { useMemo } from 'react'

type BalloonGameBoardProps = {
  phase: BalloonGamePhase
  poppedCells: Set<number>
  isInteractive: boolean
  onPop: (index: number) => void
}

export function BalloonGameBoard({
  phase,
  poppedCells,
  isInteractive,
  onPop,
}: BalloonGameBoardProps) {
  const cellOffsets = useMemo(() => createCellOffsets(BALLOON_COUNT), [])
  const animationOffsets = useMemo(() => createAnimationOffsets(BALLOON_COUNT), [])

  const showGameLayer = phase !== 'hint'
  const pinActive = phase === 'interactive'

  return (
    <motion.div
      className="relative mx-auto w-full max-w-md px-3 sm:max-w-lg sm:px-4"
      initial={false}
      animate={{ opacity: showGameLayer ? 1 : 0 }}
      transition={{ duration: GAME_REVEAL_MS / 1000, ease: 'easeInOut' }}
      style={pinActive ? { cursor: PIN_CURSOR } : undefined}
    >
      <div className="relative min-h-[min(72dvh,28rem)] rounded-2xl px-2 py-8 sm:min-h-[min(68dvh,32rem)] sm:px-4 sm:py-10">
        <p className="relative z-0 px-1 text-center font-body text-sm leading-relaxed text-fiesta-cream sm:text-base sm:leading-relaxed">
          <WaveText
            text={PARAGRAPH}
            waveEnabled={showGameLayer}
            waveAmplitudePx={WAVE_AMPLITUDE_PX}
            waveCycleDurationS={WAVE_CYCLE_DURATION_S}
            waveLetterStaggerS={WAVE_LETTER_STAGGER_S}
          />
        </p>

        <div
          className="absolute inset-0 z-10 grid grid-cols-3 grid-rows-3"
          aria-hidden={!showGameLayer}
        >
          {BALLOON_COLORS.map((color, index) => {
            const offset = cellOffsets[index] as CellOffset
            const isPopped = poppedCells.has(index)

            return (
              <div key={index} className="relative">
                {!isPopped ? (
                  <BalloonPopTarget
                    src={BALLOON_ASSETS[color]}
                    offsetXPercent={offset.xPercent}
                    offsetYPercent={offset.yPercent}
                    animationOffset={animationOffsets[index] ?? 0}
                    disabled={!isInteractive}
                    onPop={() => onPop(index)}
                  />
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
