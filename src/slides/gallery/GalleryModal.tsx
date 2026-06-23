import { AnimatePresence, motion } from 'framer-motion'
import type { GalleryModalVariant } from './galleryTypes'

type GalleryModalProps = {
  isOpen: boolean
  message: string
  variant: GalleryModalVariant
  confirmLabel?: string
  onClose: () => void
  onConfirm?: () => void
}

export function GalleryModal({
  isOpen,
  message,
  variant,
  confirmLabel = 'Continue',
  onClose,
  onConfirm,
}: GalleryModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/55 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={variant === 'backdrop-and-x' ? onClose : undefined}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-fiesta-cream/25 bg-fiesta-indigo/95 p-5 text-fiesta-cream shadow-2xl"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(event) => event.stopPropagation()}
          >
            {variant === 'backdrop-and-x' && (
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  className="rounded-full border border-fiesta-cream/30 px-3 py-1 text-sm font-semibold text-fiesta-cream/85 hover:text-fiesta-cream"
                  aria-label="Close"
                  onClick={onClose}
                >
                  X
                </button>
              </div>
            )}

            <p className="text-center font-body text-base leading-relaxed sm:text-lg">{message}</p>

            {variant === 'confirm-only' && (
              <div className="mt-5">
                <button
                  type="button"
                  className="w-full rounded-full bg-fiesta-coral px-5 py-3 font-body text-base font-semibold text-fiesta-cream shadow-[0_0_24px_rgba(244,161,39,0.45)] hover:brightness-110"
                  onClick={onConfirm}
                >
                  {confirmLabel}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
