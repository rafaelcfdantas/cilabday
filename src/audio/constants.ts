import introSoundtrack from '@assets/audios/feliz_cumpleanos.mp3'
import slideshowSoundtrack from '@assets/audios/cila_bday.mp3'

export const INTRO_SOUNDTRACK = introSoundtrack
export const SLIDESHOW_SOUNDTRACK = slideshowSoundtrack

export const PRELUDE_DURATION_MS = 3750
export const MAIN_PHASE_START_MS = PRELUDE_DURATION_MS
export const CTA_APPEAR_MS = 50000
export const CTA_UNLOCK_MS = 52000
export const INTRO_FADE_OUT_MS = 1000
export const FIRST_LOOP_DURATION_MS = 52000

/** HTMLAudio volume floor/ceiling for intro + slideshow (0–1). Fades animate between these. */
export const SOUNDTRACK_VOLUME_MIN = 0
export const SOUNDTRACK_VOLUME = 0.1

export const SLIDE_TRANSITION_MS = 700

/** Confetti: 3 one-shot bursts during main phase, quiet 5s before CTA unlock */
export const CONFETTI_BURST_COUNT = 3
export const CONFETTI_QUIET_BEFORE_CTA_MS = 5000
export const CONFETTI_BURST_DURATION_MS = 3500

const confettiWindowMs =
  CTA_UNLOCK_MS - MAIN_PHASE_START_MS - CONFETTI_QUIET_BEFORE_CTA_MS

export const CONFETTI_BURST_INTERVAL_MS = confettiWindowMs / CONFETTI_BURST_COUNT

export function getConfettiBurstStartMs(burstIndex: number): number {
  return MAIN_PHASE_START_MS + burstIndex * CONFETTI_BURST_INTERVAL_MS
}

export function getActiveConfettiBurst(elapsedMs: number): number | null {
  if (elapsedMs < MAIN_PHASE_START_MS) return null

  for (let i = 0; i < CONFETTI_BURST_COUNT; i++) {
    const start = getConfettiBurstStartMs(i)
    const end = start + CONFETTI_BURST_DURATION_MS
    if (elapsedMs >= start && elapsedMs < end) return i
  }

  return null
}

