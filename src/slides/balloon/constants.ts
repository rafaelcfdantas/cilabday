import pinCursor from '@assets/img/pin.png'

export const PIN_CURSOR = `url(${pinCursor}) 12 4, pointer`

export const HINT_FADE_MS = 500
export const HINT_HOLD_MS = 2000
export const GAME_REVEAL_MS = 1000
export const CTA_DELAY_MS = 2000

export const HINT_TOTAL_MS = HINT_FADE_MS + HINT_HOLD_MS + HINT_FADE_MS
export const REVEAL_START_MS = HINT_FADE_MS + HINT_HOLD_MS
export const INTERACTIVE_UNLOCK_MS = REVEAL_START_MS + GAME_REVEAL_MS

export const BALLOON_COUNT = 9
export const GRID_SIZE = 3

/** Gentler wave for long paragraph copy */
export const WAVE_AMPLITUDE_PX = 1
export const WAVE_CYCLE_DURATION_S = 1.5
export const WAVE_LETTER_STAGGER_S = 0.01
