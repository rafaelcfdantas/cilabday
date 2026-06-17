import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import calendarFlip from '@assets/animations/calendar_flip.lottie'
import twinkleStars2 from '@assets/animations/twinkle_stars_02.lottie'
import { BeatEntrance } from '../BeatEntrance'
import { WaveText } from '../WaveText'

const DATE_CLASS =
  'block text-center font-display text-3xl font-bold text-fiesta-cream sm:text-4xl md:text-5xl'

const CALENDAR_RENDER_CONFIG = {
  autoResize: true,
  devicePixelRatio: typeof devicePixelRatio === 'number' ? devicePixelRatio : 2,
}

type DateBeatProps = {
  isCurrent: boolean
  text: string
}

export function DateBeat({ isCurrent, text }: DateBeatProps) {
  return (
    <BeatEntrance isCurrent={isCurrent} entranceClass="animate__fadeInLeftBig">
      {(waveEnabled) => (
        <div className="flex w-full items-center justify-center px-2">
          <div className="inline-flex items-center gap-2 text-3xl sm:gap-3 sm:text-4xl md:text-5xl">
            <div className="flex h-[4em] w-[4em] shrink-0 items-center justify-center">
              <DotLottieReact
                src={calendarFlip}
                loop
                autoplay
                className="h-full w-full"
                renderConfig={CALENDAR_RENDER_CONFIG}
              />
            </div>

            <div className="relative inline-block">
              <WaveText text={text} waveEnabled={waveEnabled} className={DATE_CLASS} />
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[2.5rem] w-[12rem] -translate-x-1/2 -translate-y-1/2 mix-blend-screen opacity-90 sm:h-[3rem] sm:w-[14rem]"
              >
                <DotLottieReact src={twinkleStars2} loop autoplay className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      )}
    </BeatEntrance>
  )
}
