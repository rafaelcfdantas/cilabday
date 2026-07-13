import { useEffect, useState } from 'react'
import {
  ADJECTIVE_STAGGER_MS,
  CTA_DELAY_MS,
  GIFT_CATCH_TARGET,
  GIFT_EXIT_FADE_MS,
  HINT_TOTAL_MS,
} from './constants'

export type GiftCatchPhase = 'hint' | 'interactive' | 'complete' | 'cta'

export function useGiftCatchPhases(isActive: boolean, caughtCount: number) {
  const [phase, setPhase] = useState<GiftCatchPhase>('hint')
  const [showAdjectives, setShowAdjectives] = useState(false)

  useEffect(() => {
    if (!isActive) {
      setPhase('hint')
      setShowAdjectives(false)
      return
    }

    setPhase('hint')
    setShowAdjectives(false)

    const interactiveTimer = window.setTimeout(() => setPhase('interactive'), HINT_TOTAL_MS)
    return () => window.clearTimeout(interactiveTimer)
  }, [isActive])

  useEffect(() => {
    if (!isActive || phase !== 'interactive') return
    if (caughtCount < GIFT_CATCH_TARGET) return
    setPhase('complete')
  }, [isActive, phase, caughtCount])

  useEffect(() => {
    if (!isActive || phase !== 'complete') return

    setShowAdjectives(false)

    let ctaTimer: number | undefined
    const fadeTimer = window.setTimeout(() => {
      setShowAdjectives(true)
      const ctaDelay =
        (GIFT_CATCH_TARGET - 1) * ADJECTIVE_STAGGER_MS + CTA_DELAY_MS
      ctaTimer = window.setTimeout(() => setPhase('cta'), ctaDelay)
    }, GIFT_EXIT_FADE_MS)

    return () => {
      window.clearTimeout(fadeTimer)
      if (ctaTimer !== undefined) window.clearTimeout(ctaTimer)
    }
  }, [isActive, phase])

  return { phase, showAdjectives }
}
