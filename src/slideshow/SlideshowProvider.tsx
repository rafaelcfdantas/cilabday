import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type SlideshowContextValue = {
  currentIndex: number
  isTransitioning: boolean
  goToNext: () => void
  notifySlideEnterComplete: (index: number) => void
  onSlideActive: (callback: (index: number) => void) => () => void
}

const SlideshowContext = createContext<SlideshowContextValue | null>(null)

export function SlideshowProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const slideActiveListeners = useRef<Set<(index: number) => void>>(new Set())

  const goToNext = useCallback(() => {
    setIsTransitioning(true)
    setCurrentIndex((prev) => prev + 1)
  }, [])

  const notifySlideEnterComplete = useCallback((index: number) => {
    setIsTransitioning(false)
    slideActiveListeners.current.forEach((listener) => listener(index))
  }, [])

  const onSlideActive = useCallback((callback: (index: number) => void) => {
    slideActiveListeners.current.add(callback)
    return () => {
      slideActiveListeners.current.delete(callback)
    }
  }, [])

  const value = useMemo(
    () => ({
      currentIndex,
      isTransitioning,
      goToNext,
      notifySlideEnterComplete,
      onSlideActive,
    }),
    [currentIndex, isTransitioning, goToNext, notifySlideEnterComplete, onSlideActive],
  )

  return <SlideshowContext.Provider value={value}>{children}</SlideshowContext.Provider>
}

export function useSlideshow() {
  const context = useContext(SlideshowContext)
  if (!context) {
    throw new Error('useSlideshow must be used within SlideshowProvider')
  }
  return context
}
