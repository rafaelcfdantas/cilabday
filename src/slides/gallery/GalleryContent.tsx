import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { GALLERY_BEAT_FADE_MS } from './constants'
import { GALLERY_ITEMS } from './galleryCopy'
import { GalleryModal } from './GalleryModal'
import { handleGalleryAction, type GalleryModalState } from './galleryActions'
import { MemePolaroid } from './MemePolaroid'
import { galleryActionButtonClasses } from './galleryButtonStyles'
import { RunningGalleryButton } from './RunningGalleryButton'
import { playGalleryRandomSfx } from './playGalleryRandomSfx'
import type { GalleryButton } from './galleryTypes'

type GalleryContentProps = {
  beatIndex: number
  isActionLocked: boolean
  isMuted: boolean
  advanceBeat: () => void
  goToNext: () => void
}

function ActionButton({
  button,
  disabled,
  onClick,
}: {
  button: GalleryButton
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={galleryActionButtonClasses(button, disabled)}
    >
      {button.label}
    </button>
  )
}

export function GalleryContent({
  beatIndex,
  isActionLocked,
  isMuted,
  advanceBeat,
  goToNext,
}: GalleryContentProps) {
  const [modal, setModal] = useState<GalleryModalState | null>(null)
  const item = GALLERY_ITEMS[beatIndex]

  const isFinalBeat = beatIndex === GALLERY_ITEMS.length - 1

  useEffect(() => {
    setModal(null)
  }, [beatIndex])

  const handleButton = useCallback(
    (button: GalleryButton) => {
      if (isActionLocked) return

      handleGalleryAction(button.effect, {
        isFinalBeat,
        openModal: setModal,
        playRandomSfx: () => playGalleryRandomSfx(isMuted),
        advanceBeat,
        goToNext,
      })
    },
    [advanceBeat, goToNext, isActionLocked, isFinalBeat, isMuted],
  )

  const closeModal = useCallback(() => setModal(null), [])

  const confirmModal = useCallback(() => {
    setModal(null)
    if (isFinalBeat) {
      goToNext()
      return
    }
    advanceBeat()
  }, [advanceBeat, goToNext, isFinalBeat])

  const actionArea = useMemo(() => {
    const runningButton = item.buttons.find((button) => button.effect.type === 'runningButton')
    const continueButton = item.buttons.find((button) => button.effect.type === 'advance')

    if (runningButton && continueButton) {
      return (
        <RunningGalleryButton
          runningLabel={runningButton.label}
          continueButton={continueButton}
          disabled={isActionLocked}
          onContinue={() => handleButton(continueButton)}
        />
      )
    }

    return (
      <div className={item.buttons.length === 1 ? 'space-y-2' : 'grid grid-cols-2 gap-2'}>
        {item.buttons.map((button) => (
          <ActionButton
            key={button.id}
            button={button}
            disabled={isActionLocked}
            onClick={() => handleButton(button)}
          />
        ))}
      </div>
    )
  }, [handleButton, isActionLocked, item.buttons])

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.section
          id={item.id}
          key={item.id}
          className="w-full px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: GALLERY_BEAT_FADE_MS / 1000, ease: 'easeInOut' }}
        >
          <MemePolaroid item={item} isCurrent actionArea={actionArea} />
        </motion.section>
      </AnimatePresence>

      <GalleryModal
        isOpen={modal !== null}
        message={modal?.message ?? ''}
        variant={modal?.variant ?? 'backdrop-and-x'}
        confirmLabel={modal?.confirmLabel}
        onClose={closeModal}
        onConfirm={confirmModal}
      />
    </>
  )
}
