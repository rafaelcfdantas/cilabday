import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import {
  FIRST_LOOP_DURATION_MS,
  INTRO_FADE_OUT_MS,
  INTRO_SOUNDTRACK,
  SLIDESHOW_SOUNDTRACK,
} from './constants'

export type ActiveTrack = 'intro' | 'slideshow' | null

type AudioContextValue = {
  isMuted: boolean
  activeTrack: ActiveTrack
  hasStarted: boolean
  toggleMute: () => void
  playIntroSoundtrack: () => void
  fadeOutIntroSoundtrack: () => Promise<void>
  playSlideshowSoundtrack: () => void
}

const AudioContext = createContext<AudioContextValue | null>(null)

function fadeVolume(
  audio: HTMLAudioElement,
  from: number,
  to: number,
  durationMs: number,
): Promise<void> {
  return new Promise((resolve) => {
    const start = performance.now()

    const step = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      audio.volume = from + (to - from) * progress
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        resolve()
      }
    }

    requestAnimationFrame(step)
  })
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const introRef = useRef<HTMLAudioElement | null>(null)
  const slideshowRef = useRef<HTMLAudioElement | null>(null)
  const fadeFrameRef = useRef<number | null>(null)

  const [isMuted, setIsMuted] = useState(false)
  const [activeTrack, setActiveTrack] = useState<ActiveTrack>(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [introLoopEnabled, setIntroLoopEnabled] = useState(false)

  useEffect(() => {
    const intro = new Audio(INTRO_SOUNDTRACK)
    intro.preload = 'auto'
    intro.volume = 1
    intro.loop = false

    const slideshow = new Audio(SLIDESHOW_SOUNDTRACK)
    slideshow.preload = 'auto'
    slideshow.volume = 1
    slideshow.loop = true

    introRef.current = intro
    slideshowRef.current = slideshow

    return () => {
      intro.pause()
      slideshow.pause()
      introRef.current = null
      slideshowRef.current = null
      if (fadeFrameRef.current !== null) {
        cancelAnimationFrame(fadeFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    introRef.current!.muted = isMuted
    slideshowRef.current!.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    if (!introLoopEnabled) return

    const timer = window.setTimeout(() => {
      const intro = introRef.current
      if (!intro || activeTrack !== 'intro') return
      intro.loop = true
    }, FIRST_LOOP_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [introLoopEnabled, activeTrack])

  const playIntroSoundtrack = useCallback(() => {
    const intro = introRef.current
    if (!intro) return

    intro.currentTime = 0
    intro.loop = false
    intro.volume = 1
    setIntroLoopEnabled(true)
    setHasStarted(true)
    setActiveTrack('intro')
    void intro.play()
  }, [])

  const fadeOutIntroSoundtrack = useCallback(async () => {
    const intro = introRef.current
    if (!intro) return

    setIntroLoopEnabled(false)
    await fadeVolume(intro, intro.volume, 0, INTRO_FADE_OUT_MS)
    intro.pause()
    intro.currentTime = 0
    intro.volume = 1
    intro.loop = false

    if (activeTrack === 'intro') {
      setActiveTrack(null)
    }
  }, [activeTrack])

  const playSlideshowSoundtrack = useCallback(() => {
    const slideshow = slideshowRef.current
    const intro = introRef.current
    if (!slideshow) return

    intro?.pause()

    slideshow.currentTime = 0
    slideshow.volume = 1
    slideshow.loop = true
    setActiveTrack('slideshow')
    void slideshow.play()
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const value = useMemo(
    () => ({
      isMuted,
      activeTrack,
      hasStarted,
      toggleMute,
      playIntroSoundtrack,
      fadeOutIntroSoundtrack,
      playSlideshowSoundtrack,
    }),
    [
      isMuted,
      activeTrack,
      hasStarted,
      toggleMute,
      playIntroSoundtrack,
      fadeOutIntroSoundtrack,
      playSlideshowSoundtrack,
    ],
  )

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}
