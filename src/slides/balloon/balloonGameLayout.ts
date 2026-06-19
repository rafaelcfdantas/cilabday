import pinkBalloon from '@assets/animations/pink_balloon.lottie'
import blueBalloon from '@assets/animations/blue_balloon.lottie'
import greenBalloon from '@assets/animations/green_balloon.lottie'
import yellowBalloon from '@assets/animations/yellow_balloon.lottie'
import redBalloon from '@assets/animations/red_balloon.lottie'

export type BalloonColor = 'pink' | 'blue' | 'green' | 'yellow' | 'red'

export const BALLOON_ASSETS: Record<BalloonColor, string> = {
  pink: pinkBalloon,
  blue: blueBalloon,
  green: greenBalloon,
  yellow: yellowBalloon,
  red: redBalloon,
}

/** Row-major 3×3 — no orthogonally adjacent duplicate colors */
export const BALLOON_COLORS: BalloonColor[] = [
  'blue',
  'red',
  'green',
  'yellow',
  'pink',
  'blue',
  'red',
  'green',
  'yellow',
]

export type CellOffset = {
  xPercent: number
  yPercent: number
}

const OFFSET_RANGE_PERCENT = 28

export function createCellOffsets(count: number): CellOffset[] {
  return Array.from({ length: count }, () => ({
    xPercent: (Math.random() - 0.5) * OFFSET_RANGE_PERCENT,
    yPercent: (Math.random() - 0.5) * OFFSET_RANGE_PERCENT,
  }))
}

/** Random point in loop timeline (0–1), stable per mount */
export function createAnimationOffsets(count: number): number[] {
  return Array.from({ length: count }, () => Math.random())
}
