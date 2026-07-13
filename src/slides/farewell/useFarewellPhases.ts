import { useEffect, useState } from 'react'
import { BEAT_COUNT, FADE_IN_MS, FADE_OUT_MS, HOLD_MS } from './constants'

export type FarewellPhase = 'beat' | 'finale'

export type BeatSegment = 'fadeIn' | 'hold' | 'fadeOut'

export function useFarewellPhases(isActive: boolean) {
  const [phase, setPhase] = useState<FarewellPhase>('beat')
  const [beatIndex, setBeatIndex] = useState(0)
  const [segment, setSegment] = useState<BeatSegment>('fadeIn')

  useEffect(() => {
    if (!isActive) {
      setPhase('beat')
      setBeatIndex(0)
      setSegment('fadeIn')
      return
    }

    setPhase('beat')
    setBeatIndex(0)
    setSegment('fadeIn')
  }, [isActive])

  useEffect(() => {
    if (!isActive || phase !== 'beat') return

    const holdMs = HOLD_MS[beatIndex] ?? HOLD_MS[0]
    let timer: number

    if (segment === 'fadeIn') {
      timer = window.setTimeout(() => setSegment('hold'), FADE_IN_MS)
    } else if (segment === 'hold') {
      timer = window.setTimeout(() => setSegment('fadeOut'), holdMs)
    } else {
      timer = window.setTimeout(() => {
        if (beatIndex >= BEAT_COUNT - 1) {
          setPhase('finale')
          return
        }
        setBeatIndex((prev) => prev + 1)
        setSegment('fadeIn')
      }, FADE_OUT_MS)
    }

    return () => window.clearTimeout(timer)
  }, [isActive, phase, beatIndex, segment])

  return {
    phase,
    beatIndex,
    segment,
    waveEnabled: phase === 'beat',
  }
}
