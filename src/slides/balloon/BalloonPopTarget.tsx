import { DotLottieReact, type DotLottie } from '@lottiefiles/dotlottie-react'
import { useCallback } from 'react'
import { PIN_CURSOR } from './constants'

type BalloonPopTargetProps = {
  src: string
  offsetXPercent: number
  offsetYPercent: number
  animationOffset: number
  disabled: boolean
  onPop: () => void
}

export function BalloonPopTarget({
  src,
  offsetXPercent,
  offsetYPercent,
  animationOffset,
  disabled,
  onPop,
}: BalloonPopTargetProps) {
  const dotLottieRefCallback = useCallback(
    (instance: DotLottie | null) => {
      if (!instance) return

      const startAtOffset = () => {
        const totalFrames = instance.totalFrames
        if (totalFrames <= 0) return
        instance.setFrame(animationOffset * totalFrames)
        instance.play()
      }

      if (instance.isLoaded) {
        startAtOffset()
        return
      }

      instance.addEventListener('load', startAtOffset)
    },
    [animationOffset],
  )

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label="Pop balloon"
      onClick={onPop}
      className="absolute flex min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center p-2 disabled:cursor-default"
      style={{
        left: `calc(50% + ${offsetXPercent}%)`,
        top: `calc(50% + ${offsetYPercent}%)`,
        cursor: disabled ? undefined : PIN_CURSOR,
      }}
    >
      <DotLottieReact
        src={src}
        loop
        autoplay={false}
        dotLottieRefCallback={dotLottieRefCallback}
        className="h-[clamp(5.5rem,14vw,7.5rem)] w-[clamp(5.5rem,14vw,7.5rem)]"
      />
    </button>
  )
}
