import { useEffect, useState } from 'react'
import {
  CTA_APPEAR_MS,
  CTA_UNLOCK_MS,
  PRELUDE_DURATION_MS,
} from '@/audio/constants'

export type IntroPhase =
  | 'kickoff'
  | 'prelude'
  | 'main'
  | 'cta-locked'
  | 'cta-ready'

function phaseFromElapsed(elapsedMs: number, started: boolean): IntroPhase {
  if (!started) return 'kickoff'
  if (elapsedMs < PRELUDE_DURATION_MS) return 'prelude'
  if (elapsedMs < CTA_APPEAR_MS) return 'main'
  if (elapsedMs < CTA_UNLOCK_MS) return 'cta-locked'
  return 'cta-ready'
}

export function useIntroTimeline() {
  const [t0, setT0] = useState<number | null>(null)
  const [elapsedMs, setElapsedMs] = useState(0)

  const phase = phaseFromElapsed(elapsedMs, t0 !== null)

  useEffect(() => {
    if (t0 === null) return

    let frame = 0
    const tick = () => {
      setElapsedMs(performance.now() - t0)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [t0])

  const startTimeline = () => {
    setT0(performance.now())
    setElapsedMs(0)
  }

  return {
    phase,
    elapsedMs,
    hasStarted: t0 !== null,
    startTimeline,
  }
}
