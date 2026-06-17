import { BeatEntrance } from '../BeatEntrance'
import { WaveText } from '../WaveText'

const BODY_CLASS = 'font-body text-base text-fiesta-cream/90 sm:text-lg md:text-xl'

type NarrativeBeatProps = {
  isCurrent: boolean
  text: string
}

export function NarrativeBeat({ isCurrent, text }: NarrativeBeatProps) {
  return (
    <BeatEntrance isCurrent={isCurrent} entranceClass="animate__fadeInRightBig">
      {(waveEnabled) => (
        <div className="flex w-full justify-center">
          <p className="max-w-md px-2 text-center">
            <WaveText text={text} waveEnabled={waveEnabled} className={BODY_CLASS} />
          </p>
        </div>
      )}
    </BeatEntrance>
  )
}
