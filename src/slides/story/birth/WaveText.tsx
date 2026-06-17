import type { CSSProperties } from 'react'
import {
  WAVE_AMPLITUDE_PX,
  WAVE_CYCLE_DURATION_S,
  WAVE_LETTER_STAGGER_S,
} from './constants'

type WaveTextProps = {
  text: string
  waveEnabled: boolean
  className?: string
}

export function WaveText({ text, waveEnabled, className = '' }: WaveTextProps) {
  const style = {
    '--wave-amplitude': `${WAVE_AMPLITUDE_PX}px`,
    '--wave-cycle': `${WAVE_CYCLE_DURATION_S}s`,
    '--wave-stagger': `${WAVE_LETTER_STAGGER_S}s`,
  } as CSSProperties

  const words = text.trim().split(/\s+/)
  let charIndex = 0

  return (
    <span
      className={[
        'birth-wave-text inline',
        waveEnabled ? 'birth-wave-text--active' : 'birth-wave-text--paused',
        className,
      ].join(' ')}
      style={style}
    >
      {words.map((word, wordIndex) => (
        <span key={`${wordIndex}-${word}`}>
          {wordIndex > 0 ? ' ' : null}
          <span className="birth-wave-word inline-block whitespace-nowrap">
            {[...word].map((char) => {
              const index = charIndex++
              return (
                <span
                  key={index}
                  className="birth-wave-char"
                  style={{ '--i': index } as CSSProperties}
                >
                  {char}
                </span>
              )
            })}
          </span>
        </span>
      ))}
    </span>
  )
}
