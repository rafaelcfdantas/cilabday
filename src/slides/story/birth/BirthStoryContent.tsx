import { BIRTH_STORY_BEATS } from './birthStoryCopy'
import { DateBeat } from './beats/DateBeat'
import { IdentityBlock } from './beats/IdentityBlock'
import { NarrativeBeat } from './beats/NarrativeBeat'

type BirthStoryContentProps = {
  beatIndex: number
}

function beatDimClass(index: number, beatIndex: number): string {
  return beatIndex > index ? 'opacity-55' : 'opacity-100'
}

function contentSpacingClass(beatIndex: number): string {
  if (beatIndex >= 2) {
    return [
      'gap-y-3 pt-4 sm:gap-y-4 sm:pt-5',
      beatIndex >= 3 ? 'max-sm:min-h-full max-sm:justify-evenly max-sm:gap-y-0 max-sm:pt-5 max-sm:pb-2' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }

  return 'gap-y-4 pt-5 sm:gap-y-5 sm:pt-7'
}

export function BirthStoryContent({ beatIndex }: BirthStoryContentProps) {
  const dateBeat = BIRTH_STORY_BEATS[0]
  const narrativeBeat = BIRTH_STORY_BEATS[1]
  const identityBeat = BIRTH_STORY_BEATS[2]
  const closingBeat = BIRTH_STORY_BEATS[3]

  return (
    <div
      className={[
        'mx-auto flex h-full w-full max-w-2xl flex-col items-center overflow-x-clip overflow-y-auto px-4',
        contentSpacingClass(beatIndex),
      ].join(' ')}
    >
      <div
        className={`w-full shrink-0 transition-opacity duration-300 ${beatDimClass(0, beatIndex)}`}
      >
        <DateBeat isCurrent={beatIndex === 0} text={dateBeat.lines[0]} />
      </div>

      {beatIndex >= 1 && (
        <div
          className={`w-full shrink-0 transition-opacity duration-300 ${beatDimClass(1, beatIndex)}`}
        >
          <NarrativeBeat isCurrent={beatIndex === 1} text={narrativeBeat.lines[0]} />
        </div>
      )}

      {beatIndex >= 2 && identityBeat.id === 'identity' && closingBeat.id === 'closing' && (
        <div className="w-full max-w-3xl shrink-0 transition-opacity duration-300">
          <IdentityBlock
            beatIndex={beatIndex}
            identityLine={identityBeat.lines[0]}
            photoSrc={identityBeat.photoSrc}
            closingLine={closingBeat.lines[0]}
            emojis={closingBeat.emojis}
            showClosing={beatIndex >= 3}
          />
        </div>
      )}
    </div>
  )
}
