import balloons from '@assets/animations/balloons.lottie'
import partyBlower from '@assets/animations/party_blower.lottie'
import bdayCupcake from '@assets/animations/bday_cupcake.lottie'
import bdayCake from '@assets/animations/bday_cake.lottie'
import partyCups from '@assets/animations/party_cups.lottie'

export type FarewellDecorSlot = {
  id: string
  src: string
  leftPercent: number
  topPercent: number
  rotateDeg: number
}

/** Fixed starter slots — tune manually; no random jitter. */
export const FAREWELL_DECOR_SLOTS: FarewellDecorSlot[] = [
  { id: 'balloons', src: balloons, leftPercent: 22, topPercent: 18, rotateDeg: -4 },
  { id: 'party_blower', src: partyBlower, leftPercent: 78, topPercent: 22, rotateDeg: 5 },
  { id: 'bday_cupcake', src: bdayCupcake, leftPercent: 28, topPercent: 72, rotateDeg: -3 },
  { id: 'bday_cake', src: bdayCake, leftPercent: 72, topPercent: 68, rotateDeg: 4 },
  { id: 'party_cups', src: partyCups, leftPercent: 50, topPercent: 82, rotateDeg: -2 },
]
