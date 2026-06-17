import { useCallback, useEffect, useState } from 'react'
import { BEAT_CTA_LOCK_MS } from './constants'
import { FINAL_BEAT_INDEX } from './birthStoryCopy'

export function useBirthStoryBeats(isActive: boolean) {
  const [beatIndex, setBeatIndex] = useState(0)
  const [isCtaLocked, setIsCtaLocked] = useState(true)

  useEffect(() => {
    if (!isActive) {
      setBeatIndex(0)
      setIsCtaLocked(true)
      return
    }

    setIsCtaLocked(true)
    const timeoutId = window.setTimeout(() => setIsCtaLocked(false), BEAT_CTA_LOCK_MS)
    return () => window.clearTimeout(timeoutId)
  }, [isActive, beatIndex])

  const advanceBeat = useCallback(() => {
    setBeatIndex((prev) => Math.min(prev + 1, FINAL_BEAT_INDEX))
  }, [])

  const isFinalBeat = beatIndex === FINAL_BEAT_INDEX

  return { beatIndex, advanceBeat, isFinalBeat, isCtaLocked }
}
