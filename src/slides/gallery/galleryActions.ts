import type { GalleryButtonEffect } from './galleryTypes'

export type GalleryModalState = {
  variant: 'backdrop-and-x' | 'confirm-only'
  message: string
  confirmLabel?: string
}

type GalleryActionHandlers = {
  isFinalBeat: boolean
  openModal: (modal: GalleryModalState) => void
  playRandomSfx: () => void
  advanceBeat: () => void
  goToNext: () => void
}

export function handleGalleryAction(effect: GalleryButtonEffect, handlers: GalleryActionHandlers) {
  switch (effect.type) {
    case 'advance':
      if (handlers.isFinalBeat) {
        handlers.goToNext()
        return
      }
      handlers.advanceBeat()
      return

    case 'modal':
      handlers.openModal({
        variant: effect.variant,
        message: effect.message,
      })
      return

    case 'modal-confirm':
      handlers.openModal({
        variant: 'confirm-only',
        message: effect.message,
        confirmLabel: effect.confirmLabel,
      })
      return

    case 'randomSfx':
      handlers.playRandomSfx()
      return

    case 'runningButton':
      return
  }
}
