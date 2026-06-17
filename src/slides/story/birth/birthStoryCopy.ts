import newbornPhoto from '@assets/gallery/newborn_cila.png'

export type BirthStoryBeat =
  | { id: 'date'; lines: [string] }
  | { id: 'narrative'; lines: [string] }
  | { id: 'identity'; lines: [string]; photoSrc: string }
  | { id: 'closing'; lines: [string]; emojis: [string, string] }

export const BIRTH_STORY_BEATS: BirthStoryBeat[] = [
  { id: 'date', lines: ['July 13, 1999'] },
  { id: 'narrative', lines: ['On that day, the world gained someone truly special.'] },
  {
    id: 'identity',
    lines: ['And that little baby was you, Cila.'],
    photoSrc: newbornPhoto,
  },
  {
    id: 'closing',
    lines: ['27 years already… time flies, ¿verdad?'],
    emojis: ['😂', '🎂'],
  },
]

export const FINAL_BEAT_INDEX = BIRTH_STORY_BEATS.length - 1
