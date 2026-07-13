import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FALL_DURATION_MAX_MS,
  FALL_DURATION_MIN_MS,
  GIFT_CATCH_TARGET,
  PLAYFIELD_X_PADDING_PERCENT,
  SPAWN_DELAY_MAX_MS,
  SPAWN_DELAY_MIN_MS,
} from './constants'
import { GIFT_LOTTIE_POOL } from './giftCatchCopy'

export type ActiveGift = {
  id: string
  src: string
  xPercent: number
  fallDurationMs: number
}

function randomIntInclusive(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pickLottie() {
  const index = Math.floor(Math.random() * GIFT_LOTTIE_POOL.length)
  return GIFT_LOTTIE_POOL[index] ?? GIFT_LOTTIE_POOL[0]
}

function randomXPercent() {
  const min = PLAYFIELD_X_PADDING_PERCENT
  const max = 100 - PLAYFIELD_X_PADDING_PERCENT
  return randomIntInclusive(min, max)
}

let giftIdCounter = 0

function createGift(): ActiveGift {
  giftIdCounter += 1
  return {
    id: `gift-${giftIdCounter}`,
    src: pickLottie(),
    xPercent: randomXPercent(),
    fallDurationMs: randomIntInclusive(FALL_DURATION_MIN_MS, FALL_DURATION_MAX_MS),
  }
}

export function useGiftSpawn(isActive: boolean, spawning: boolean) {
  const [gifts, setGifts] = useState<ActiveGift[]>([])
  const [caughtCount, setCaughtCount] = useState(0)
  const caughtCountRef = useRef(0)
  const spawningRef = useRef(spawning)
  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    caughtCountRef.current = caughtCount
  }, [caughtCount])

  useEffect(() => {
    spawningRef.current = spawning
  }, [spawning])

  const clearSpawnTimer = useCallback(() => {
    if (timerRef.current !== undefined) {
      window.clearTimeout(timerRef.current)
      timerRef.current = undefined
    }
  }, [])

  const reset = useCallback(() => {
    clearSpawnTimer()
    setGifts([])
    setCaughtCount(0)
    caughtCountRef.current = 0
  }, [clearSpawnTimer])

  useEffect(() => {
    if (!isActive) {
      reset()
    }
  }, [isActive, reset])

  const scheduleNext = useCallback(
    (immediate: boolean) => {
      clearSpawnTimer()
      if (!spawningRef.current || caughtCountRef.current >= GIFT_CATCH_TARGET) return

      const delay = immediate
        ? 0
        : randomIntInclusive(SPAWN_DELAY_MIN_MS, SPAWN_DELAY_MAX_MS)

      timerRef.current = window.setTimeout(() => {
        if (!spawningRef.current || caughtCountRef.current >= GIFT_CATCH_TARGET) return
        setGifts((prev) => [...prev, createGift()])
        scheduleNext(false)
      }, delay)
    },
    [clearSpawnTimer],
  )

  useEffect(() => {
    if (!isActive || !spawning) {
      clearSpawnTimer()
      return
    }

    scheduleNext(true)
    return () => clearSpawnTimer()
  }, [isActive, spawning, scheduleNext, clearSpawnTimer])

  const catchGift = useCallback((id: string) => {
    if (caughtCountRef.current >= GIFT_CATCH_TARGET) return

    setGifts((prev) => prev.filter((gift) => gift.id !== id))
    setCaughtCount((prev) => {
      const next = Math.min(prev + 1, GIFT_CATCH_TARGET)
      caughtCountRef.current = next
      if (next >= GIFT_CATCH_TARGET) {
        clearSpawnTimer()
      }
      return next
    })
  }, [clearSpawnTimer])

  const missGift = useCallback((id: string) => {
    setGifts((prev) => prev.filter((gift) => gift.id !== id))
  }, [])

  const clearGifts = useCallback(() => {
    setGifts([])
  }, [])

  return { gifts, caughtCount, catchGift, missGift, clearGifts }
}
