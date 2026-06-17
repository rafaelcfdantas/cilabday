import flagsGarland from '@assets/animations/flags_garland.lottie'
import pinkBalloon from '@assets/animations/pink_balloon.lottie'
import blueBalloon from '@assets/animations/blue_balloon.lottie'
import mexicoFlag from '@assets/animations/mexico_flag.lottie'
import confettiBlower from '@assets/animations/confetti_blower.lottie'
import happyBday from '@assets/animations/happy_bday_cake_balloons_flags_.lottie'
import balloons from '@assets/animations/balloons.lottie'
import mexicanMusician from '@assets/animations/mexican_musician.lottie'
import partyCups from '@assets/animations/party_cups.lottie'
import partyBlower from '@assets/animations/party_blower.lottie'
import woohoo from '@assets/animations/woohoo.lottie'
import jumpingGifts from '@assets/animations/jumping_gift_boxes.lottie'
import bdayCake from '@assets/animations/bday_cake.lottie'
import premiumGift from '@assets/animations/premium_gift_box.lottie'
import parrot from '@assets/animations/parrot_dancing.lottie'

export type LottiePlacement = {
  src: string
  position:
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'
    | 'mid-left'
    | 'mid-right'
    | 'top-center'
    | 'fullscreen'
  size: string
  delay?: number
  hideOnMobile?: boolean
  spin?: boolean
  float?: boolean
  loop?: boolean
}

export const kickoffDecorations: LottiePlacement[] = [
  { src: flagsGarland, position: 'top-center', size: 'clamp(6rem, 28vw, 12rem)', delay: 0 },
  { src: pinkBalloon, position: 'top-left', size: 'clamp(3rem, 14vw, 6rem)', delay: 0.2 },
  { src: blueBalloon, position: 'top-right', size: 'clamp(3rem, 14vw, 6rem)', delay: 0.3 },
]

export const preludeDecorations: LottiePlacement[] = [
  { src: mexicoFlag, position: 'top-center', size: 'clamp(5rem, 22vw, 9rem)', delay: 0 },
  { src: confettiBlower, position: 'mid-left', size: 'clamp(4rem, 18vw, 7rem)', delay: 0.15 },
  { src: flagsGarland, position: 'bottom-left', size: 'clamp(4rem, 16vw, 7rem)', delay: 0.25, hideOnMobile: true },
]

/** Peripheral sets only — never overlap center content area */
export const mainDecorationSets: LottiePlacement[][] = [
  [
    { src: balloons, position: 'top-left', size: 'clamp(4.5rem, 20vw, 9rem)', float: true },
    { src: jumpingGifts, position: 'top-right', size: 'clamp(4.5rem, 18vw, 8rem)', spin: true },
  ],
  [
    { src: mexicanMusician, position: 'mid-left', size: 'clamp(5rem, 22vw, 10rem)', float: true, hideOnMobile: true },
    { src: partyCups, position: 'mid-right', size: 'clamp(5rem, 22vw, 10rem)', float: true, hideOnMobile: true },
  ],
  [
    { src: partyBlower, position: 'bottom-left', size: 'clamp(4rem, 16vw, 7rem)', spin: true },
    { src: woohoo, position: 'bottom-right', size: 'clamp(4rem, 15vw, 6.5rem)', float: true },
  ],
  [
    { src: happyBday, position: 'top-left', size: 'clamp(5rem, 22vw, 9rem)', float: true, hideOnMobile: true },
    { src: bdayCake, position: 'bottom-right', size: 'clamp(4.5rem, 18vw, 8rem)', float: true },
  ],
  [
    { src: premiumGift, position: 'top-right', size: 'clamp(4rem, 16vw, 7rem)', spin: true },
    { src: parrot, position: 'bottom-left', size: 'clamp(5rem, 20vw, 9rem)', float: true, hideOnMobile: true },
  ],
]
