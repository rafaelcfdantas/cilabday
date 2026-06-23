import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import {
  GALLERY_BUTTON_DISABLED,
  GALLERY_DENIAL_ENABLED,
  galleryActionButtonClasses,
} from './galleryButtonStyles'
import type { GalleryButton } from './galleryTypes'

type RunningGalleryButtonProps = {
  runningLabel: string
  continueButton: GalleryButton
  disabled: boolean
  onContinue: () => void
}

type RunningSlot = 'bottom-left' | 'top-left' | 'top-right'

type SlotPosition = { left: number; top: number }

const PAD = 8
const FLEE_EXTRA_PX = 96
const INITIAL_SLOT: RunningSlot = 'bottom-left'

const OTHER_SLOTS: Record<RunningSlot, RunningSlot[]> = {
  'bottom-left': ['top-left', 'top-right'],
  'top-left': ['bottom-left', 'top-right'],
  'top-right': ['bottom-left', 'top-left'],
}

function pickOtherSlot(current: RunningSlot): RunningSlot {
  const options = OTHER_SLOTS[current]
  return options[Math.floor(Math.random() * options.length)]
}

function computeSlotPositions(
  container: HTMLElement,
  runningEl: HTMLElement,
): Record<RunningSlot, SlotPosition> {
  const buttonWidth = runningEl.offsetWidth
  const buttonHeight = runningEl.offsetHeight

  return {
    'bottom-left': { left: PAD, top: container.clientHeight - buttonHeight },
    'top-left': { left: PAD, top: PAD },
    'top-right': {
      left: Math.max(PAD, container.clientWidth - buttonWidth - PAD),
      top: PAD,
    },
  }
}

export function RunningGalleryButton({
  runningLabel,
  continueButton,
  disabled,
  onContinue,
}: RunningGalleryButtonProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const runningRef = useRef<HTMLButtonElement | null>(null)
  const continueRef = useRef<HTMLButtonElement | null>(null)
  const [slot, setSlot] = useState<RunningSlot>(INITIAL_SLOT)
  const [slotPositions, setSlotPositions] = useState<Record<RunningSlot, SlotPosition>>({
    'bottom-left': { left: PAD, top: 0 },
    'top-left': { left: PAD, top: PAD },
    'top-right': { left: PAD, top: PAD },
  })
  const [containerMinHeight, setContainerMinHeight] = useState<number>()

  const syncLayout = useCallback(() => {
    const container = containerRef.current
    const runningEl = runningRef.current
    const continueEl = continueRef.current
    if (!container || !runningEl || !continueEl) return

    const minHeight = continueEl.offsetHeight + FLEE_EXTRA_PX
    container.style.minHeight = `${minHeight}px`
    setContainerMinHeight(minHeight)
    setSlotPositions(computeSlotPositions(container, runningEl))
    setSlot(INITIAL_SLOT)
  }, [])

  const fleeToOtherSlot = useCallback(() => {
    if (disabled) return
    setSlot((current) => pickOtherSlot(current))
  }, [disabled])

  useLayoutEffect(() => {
    syncLayout()
  }, [runningLabel, disabled, syncLayout])

  const position = slotPositions[slot]

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={containerMinHeight ? { minHeight: `${containerMinHeight}px` } : undefined}
    >
      <button
        ref={continueRef}
        type="button"
        disabled={disabled}
        onClick={onContinue}
        className={[
          galleryActionButtonClasses(continueButton, disabled, 'half'),
          'absolute right-0 bottom-0 z-0 text-center leading-snug',
        ].join(' ')}
      >
        {continueButton.label}
      </button>

      <button
        ref={runningRef}
        type="button"
        disabled={disabled}
        className={[
          'absolute z-10 w-[calc(50%-4px)] text-center leading-snug',
          'rounded-full px-4 py-3 font-body text-sm font-semibold text-fiesta-cream transition-all sm:text-base',
          disabled ? GALLERY_BUTTON_DISABLED : GALLERY_DENIAL_ENABLED,
        ].join(' ')}
        style={
          slot === 'bottom-left'
            ? { left: `${PAD}px`, bottom: 0, top: 'auto' }
            : { top: `${position.top}px`, left: `${position.left}px`, bottom: 'auto' }
        }
        onMouseEnter={fleeToOtherSlot}
        onClick={fleeToOtherSlot}
      >
        {runningLabel}
      </button>
    </div>
  )
}
