import type { GalleryButton } from './galleryTypes'

export function isDenialButton(button: GalleryButton): boolean {
  return (
    button.effect.type === 'modal' ||
    button.effect.type === 'randomSfx' ||
    button.effect.type === 'runningButton'
  )
}

export const GALLERY_BUTTON_DISABLED =
  'pointer-events-none cursor-default opacity-0'

export const GALLERY_DENIAL_ENABLED =
  'cursor-pointer bg-fiesta-coral shadow-[0_0_24px_rgba(244,161,39,0.45)] hover:brightness-110'

export const GALLERY_PRIMARY_ENABLED =
  'cursor-pointer bg-fiesta-teal shadow-[0_0_24px_rgba(27,153,139,0.45)] hover:brightness-110'

export function galleryActionButtonClasses(
  button: GalleryButton,
  disabled: boolean,
  width: 'full' | 'half' = 'full',
): string {
  return [
    width === 'full' ? 'w-full' : 'w-[calc(50%-4px)]',
    'rounded-full px-4 py-3 font-body text-sm font-semibold text-fiesta-cream transition-all sm:text-base',
    disabled ? GALLERY_BUTTON_DISABLED : isDenialButton(button) ? GALLERY_DENIAL_ENABLED : GALLERY_PRIMARY_ENABLED,
  ].join(' ')
}
