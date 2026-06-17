import { useEffect, useState, type AnimationEvent, type CSSProperties, type ReactNode } from 'react'
import { BEAT_ENTER_DURATION_MS, WAVE_START_DELAY_MS } from './constants'

type BeatEntranceProps = {
  isCurrent: boolean
  entranceClass?: string
  className?: string
  children: (waveEnabled: boolean) => ReactNode
}

export function BeatEntrance({
  isCurrent,
  entranceClass = 'animate__fadeIn',
  className = '',
  children,
}: BeatEntranceProps) {
  const [waveEnabled, setWaveEnabled] = useState(false)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    if (!isCurrent) {
      setWaveEnabled(false)
      setShouldAnimate(false)
      return
    }

    setWaveEnabled(false)
    setShouldAnimate(false)

    let cancelled = false

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!cancelled) setShouldAnimate(true)
      })
    })

    const timeoutId = window.setTimeout(() => {
      if (!cancelled) setWaveEnabled(true)
    }, BEAT_ENTER_DURATION_MS + WAVE_START_DELAY_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [isCurrent])

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
    if (!isCurrent) return
    if (event.target !== event.currentTarget) return
    setWaveEnabled(true)
  }

  const hideUntilEntrance = isCurrent && !shouldAnimate

  return (
    <div
      className={[
        'flex w-full justify-center overflow-x-clip',
        hideUntilEntrance ? 'opacity-0' : '',
        shouldAnimate ? `animate__animated ${entranceClass}` : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--animate-duration': `${BEAT_ENTER_DURATION_MS}ms` } as CSSProperties}
      onAnimationEnd={handleAnimationEnd}
    >
      {children(isCurrent ? waveEnabled : true)}
    </div>
  )
}
