import { useCallback, useEffect, useState } from 'react'
import { BALLOON_COUNT, CTA_DELAY_MS, INTERACTIVE_UNLOCK_MS, REVEAL_START_MS } from './constants'

export type BalloonGamePhase = 'hint' | 'reveal' | 'interactive' | 'complete' | 'cta'

export function useBalloonGamePhases(isActive: boolean) {
  const [phase, setPhase] = useState<BalloonGamePhase>('hint')
  const [poppedCells, setPoppedCells] = useState<Set<number>>(() => new Set())

  const allPopped = poppedCells.size >= BALLOON_COUNT

  useEffect(() => {
    if (!isActive) {
      setPhase('hint')
      setPoppedCells(new Set())
      return
    }

    setPhase('hint')
    setPoppedCells(new Set())

    const revealTimer = window.setTimeout(() => setPhase('reveal'), REVEAL_START_MS)
    const interactiveTimer = window.setTimeout(() => setPhase('interactive'), INTERACTIVE_UNLOCK_MS)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(interactiveTimer)
    }
  }, [isActive])

  useEffect(() => {
    if (!isActive || !allPopped) return

    setPhase('complete')

    const ctaTimer = window.setTimeout(() => setPhase('cta'), CTA_DELAY_MS)
    return () => window.clearTimeout(ctaTimer)
  }, [isActive, allPopped])

  const popCell = useCallback((index: number) => {
    setPoppedCells((prev) => {
      if (prev.has(index)) return prev
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }, [])

  const isInteractive = phase === 'interactive'

  return { phase, poppedCells, allPopped, popCell, isInteractive }
}
