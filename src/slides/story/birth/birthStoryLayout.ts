export type BirthPhotoLayout = 'two-column' | 'stack'

/** Flip to `'stack'` after human test if two-column fails on mobile */
export const BIRTH_PHOTO_LAYOUT: BirthPhotoLayout = 'two-column'

export function getIdentityBlockLayoutClass(): string {
  if (BIRTH_PHOTO_LAYOUT === 'stack') {
    return 'flex flex-col items-center gap-5'
  }

  return 'grid grid-cols-1 items-start gap-4 sm:grid-cols-[auto_1fr] sm:items-stretch sm:gap-5'
}

export function getIdentityPhotoColumnClass(): string {
  return BIRTH_PHOTO_LAYOUT === 'stack'
    ? 'flex w-full justify-center py-1.5'
    : 'flex justify-center py-2 sm:justify-end sm:self-start'
}

export function getIdentityTextColumnClass(showClosing: boolean): string {
  const desktopLayout = showClosing ? 'sm:justify-between' : 'sm:justify-center'

  return [
    'flex min-w-0 flex-col gap-3 text-center sm:min-h-full sm:gap-0 sm:text-left',
    desktopLayout,
  ].join(' ')
}
