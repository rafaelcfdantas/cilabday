export const FADE_IN_MS = 1000
export const FADE_OUT_MS = 1000

/** Hold duration per beatIndex 0–3 (beats 1–4). */
export const HOLD_MS = [2000, 3500, 2000, 5000] as const

export const BEAT_COUNT = HOLD_MS.length

export const WAVE_TEXT_CLASS =
  'font-display text-2xl font-semibold text-fiesta-cream sm:text-3xl md:text-4xl'

/** WaveText tunables (beats 1–3) — override birth defaults when passed as props */
export const WAVE_AMPLITUDE_PX = 4
export const WAVE_CYCLE_DURATION_S = 1
export const WAVE_LETTER_STAGGER_S = 0.035

export const HEART_SIZE = 'clamp(4rem, 18vw, 7rem)'
export const JUMPING_GIFTS_SIZE = 'clamp(5rem, 22vw, 8rem)'
export const PARROT_SIZE = 'clamp(4rem, 18vw, 7rem)'
export const SCATTER_SIZE = 'clamp(3.5rem, 14vw, 6rem)'
