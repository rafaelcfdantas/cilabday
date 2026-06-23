import { useCallback, useEffect, useState } from 'react'
import {
  GALLERY_ACTION_LOCK_MS,
  GALLERY_HINT_TOTAL_MS,
  GALLERY_REVEAL_START_MS,
} from './constants'

export type GalleryPhase = 'hint' | 'gallery'

export function useGalleryPhases(isActive: boolean) {
  const [phase, setPhase] = useState<GalleryPhase>('hint')
  const [showHint, setShowHint] = useState(true)
  const [beatIndex, setBeatIndex] = useState(0)
  const [isActionLocked, setIsActionLocked] = useState(true)

  useEffect(() => {
    if (!isActive) {
      setPhase('hint')
      setShowHint(true)
      setBeatIndex(0)
      setIsActionLocked(true)
      return
    }

    setPhase('hint')
    setShowHint(true)
    setBeatIndex(0)
    setIsActionLocked(true)

    const revealTimer = window.setTimeout(() => setPhase('gallery'), GALLERY_REVEAL_START_MS)
    const hideHintTimer = window.setTimeout(() => setShowHint(false), GALLERY_HINT_TOTAL_MS)

    return () => {
      window.clearTimeout(revealTimer)
      window.clearTimeout(hideHintTimer)
    }
  }, [isActive])

  useEffect(() => {
    if (!isActive || phase !== 'gallery') return

    setIsActionLocked(true)
    const lockTimer = window.setTimeout(() => setIsActionLocked(false), GALLERY_ACTION_LOCK_MS)
    return () => window.clearTimeout(lockTimer)
  }, [isActive, phase, beatIndex])

  const advanceBeat = useCallback(() => {
    setBeatIndex((prev) => prev + 1)
  }, [])

  return {
    phase,
    showHint,
    beatIndex,
    isActionLocked,
    advanceBeat,
  }
}
