import foxGiftBox from '@assets/animations/fox_gift_box.lottie'
import giftBox from '@assets/animations/gift_box.lottie'
import premiumGiftBox from '@assets/animations/premium_gift_box.lottie'
import giftMoney from '@assets/animations/gift_money.lottie'
import giftBear from '@assets/animations/gift_bear.lottie'

export const HINT_TEXT = 'Catch the gifts to discover how I see you'

/** Language order: EN, ES, EN, PT, EN, EN, ES, EN */
export const GIFT_CATCH_ADJECTIVES = [
  'Empowering',
  'Imparable',
  'Brave',
  'Carinhosa',
  'Graceful',
  'Smart',
  'Inolvidable',
  'Brilliant',
] as const

export const GIFT_LOTTIE_POOL = [premiumGiftBox, foxGiftBox, giftBox, giftMoney, giftBear] as const
