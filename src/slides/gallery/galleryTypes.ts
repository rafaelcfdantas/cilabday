export type GalleryMedia =
  | { type: 'gif' | 'image'; src: string; alt: string }
  | { type: 'video'; src: string; alt: string }

export type GalleryModalVariant = 'backdrop-and-x' | 'confirm-only'

export type GalleryButtonEffect =
  | { type: 'advance' }
  | { type: 'modal'; message: string; variant: 'backdrop-and-x' }
  | { type: 'modal-confirm'; message: string; confirmLabel: string }
  | { type: 'randomSfx'; pool: 'fart-burp' }
  | { type: 'runningButton' }

export type GalleryButton = {
  id: string
  label: string
  effect: GalleryButtonEffect
}

export type GalleryItem = {
  id: string
  angle: number
  media: GalleryMedia
  title?: string
  description?: string
  buttons: readonly GalleryButton[]
}
