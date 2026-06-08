## 1. Project Setup

- [x] 1.1 Scaffold Vite + React + TypeScript project in repo root
- [x] 1.2 Install dependencies: Tailwind CSS, Framer Motion, `@lottiefiles/dotlottie-react`
- [x] 1.3 Configure Tailwind with Fiesta color tokens and Google Fonts (display + sans)
- [x] 1.4 Configure Vite alias for `assets/` (audios and animations)
- [x] 1.5 Set up base app shell: `main.tsx`, `App.tsx`, global styles (`min-h-dvh`, `overflow-hidden`)

## 2. Fiesta Theme

- [x] 2.1 Create `fiestaTokens.ts` with color, typography, and glow constants
- [x] 2.2 Implement `LottieDecoration` wrapper (responsive clamp sizing, position, delay, `pointer-events-none`)
- [x] 2.3 Implement premium dark radial gradient background component
- [x] 2.4 Curate and map Lottie assets per Intro phase (Kickoff, Prelude, Main) in a config file

## 3. Audio System

- [x] 3.1 Create `audio/constants.ts` with paths and timeline constants (3750ms, 50000ms, 52000ms, 1000ms fade)
- [x] 3.2 Implement `AudioProvider` with two persistent `HTMLAudioElement` refs
- [x] 3.3 Implement `playIntroSoundtrack()` triggered synchronously on Kickoff tap (t=0)
- [x] 3.4 Implement Intro soundtrack loop after first cycle (~52s)
- [x] 3.5 Implement `fadeOutIntroSoundtrack()` (~1s volume animation + pause)
- [x] 3.6 Implement `playSlideshowSoundtrack()` — only when Slide 2 enter completes, from time 0
- [x] 3.7 Implement global mute/unmute toggling active track
- [x] 3.8 Implement `AudioControl` fixed top-right with safe-area support

## 4. Slideshow Shell

- [x] 4.1 Define `SlideDefinition` types and `slideRegistry.ts` (Intro + Placeholder)
- [x] 4.2 Implement `SlideshowProvider` (`currentIndex`, `isTransitioning`, `goToNext()`, `onSlideActive`)
- [x] 4.3 Implement `SlideshowShell` with Framer Motion `AnimatePresence mode="wait"`
- [x] 4.4 Implement smooth fade + slide transition (~600–800ms) between Slides
- [x] 4.5 Implement minimal `PlaceholderSlide` (Slide 2) with neutral placeholder copy
- [x] 4.6 Wire `onSlide2Active` callback to trigger Slideshow soundtrack

## 5. Intro Slide

- [x] 5.1 Implement `useIntroTimeline` hook (phases driven by `elapsed = now - t0`)
- [x] 5.2 Implement `KickoffPhase` — welcome message, "Tap to begin" hint, festive decorations, tap-anywhere sets t=0
- [x] 5.3 Implement `PreludePhase` — 3750ms duration, "Preparando la fiesta…", thematic Lotties, no hero
- [x] 5.4 Implement `MainPhase` — hero stagger ("Happy Birthday, Cila! 🎉", subtext, "¡Feliz cumpleaños!"), continuous decorations
- [x] 5.5 Implement `IntroCta` — visible from MainPhase, blocked with countdown (`Start the Fiesta... N`), opacity boost at t≥50s, ready at t≥52s (glow, bounce, hover)
- [x] 5.6 Wire CTA click → `fadeOutIntroSoundtrack()` + `goToNext()` concurrently
- [x] 5.7 Compose `IntroSlide` orchestrating all phases and showing `AudioControl` after t=0

## 6. Integration & Verification

- [x] 6.1 Verify Kickoff → Prelude → Main → CTA locked → CTA ready timeline end-to-end
- [x] 6.2 Verify audio handoff: Intro fades during transition, Slideshow starts only when Slide 2 active
- [x] 6.3 Verify mute/unmute works for Intro soundtrack and Slideshow soundtrack respectively
- [x] 6.4 Test responsive layout at 320px, 375px, 768px, 1024px, 1440px — no overflow or broken phases
- [x] 6.5 Run production build (`npm run build`) and confirm assets resolve correctly
