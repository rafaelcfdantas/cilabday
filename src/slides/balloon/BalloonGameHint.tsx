import { SlideHint } from '@/components/SlideHint'
import { HINT_TEXT } from './balloonGameCopy'
import { HINT_FADE_MS, HINT_HOLD_MS } from './constants'

type BalloonGameHintProps = {
  visible: boolean
}

export function BalloonGameHint({ visible }: BalloonGameHintProps) {
  return <SlideHint visible={visible} text={HINT_TEXT} fadeMs={HINT_FADE_MS} holdMs={HINT_HOLD_MS} />
}
