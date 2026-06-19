## 1. Foundation

- [x] 1.1 Create `src/slides/balloon/constants.ts` — `HINT_FADE_MS`, `HINT_HOLD_MS`, `GAME_REVEAL_MS`, `CTA_DELAY_MS`, `INTERACTIVE_UNLOCK_MS`
- [x] 1.2 Create `balloonGameCopy.ts` — `HINT_TEXT = 'Pop the balloons!'`, `PARAGRAPH` (EN draft copy)
- [x] 1.3 Create `balloonGameLayout.ts` — manual `BALLOON_COLORS[9]`, Lottie asset map, random offset per cell (generate once on slide enter; do not recalculate on pop or phase change)

## 2. Audio helper

- [x] 2.1 Create `playBalloonPopSfx.ts` — import 5 pop MP3s, random pick, respect `isMuted`, one-shot `new Audio().play()`

## 3. Phase state machine

- [x] 3.1 Create `useBalloonGamePhases.ts` — phases: `hint` → `reveal` → `interactive` → `complete` → `cta`; timer chain on `isActive`; reset on deactivate
- [x] 3.2 Track popped balloons (`Set<number>`) and derive `allPopped`; trigger 2s CTA delay when complete

## 4. UI components

- [x] 4.1 Create `BalloonGameHint.tsx` — Framer Motion fade in/hold/fade out for hint text
- [x] 4.2 Create `BalloonPopTarget.tsx` — clickable DotLottieReact, generous hit area, no float/spin
- [x] 4.3 Create `BalloonGameBoard.tsx` — paragraph (opacity 1) + 3×3 absolute grid overlay, game layer opacity transition, pin cursor when interactive
- [x] 4.4 Create `BalloonGameCta.tsx` — Next button (BirthStoryCta visual pattern, label "Next"), visible only in `cta` phase
- [x] 4.5 Create `BalloonGameSlide.tsx` — compose FiestaBackground, hint, board, CTA; wire pop handler + SFX

## 5. Registry and navigation

- [x] 5.1 Register `BalloonGameSlide` at index 2 in `slideRegistry.ts`; Placeholder moves to index 3
- [x] 5.2 Update `PlaceholderSlide.tsx` copy — Slide 4 coming soon

## 6. Verification

- [x] 6.1 Hint timing: 0.5s fadeIn, 2s hold, 0.5s fadeOut; game fade starts with hint fadeOut, interactive at 3.5s
- [x] 6.2 Pop any order — balloon removes, random SFX, text region visible; mute silences SFX
- [x] 6.3 All 9 popped → default cursor → 2s → Next → Placeholder (Slide 4)
- [x] 6.4 Full flow: Intro → Birth Story (4 beats) → Balloon Game → Placeholder
- [x] 6.5 Mobile 320px — no overflow, tappable balloons, readable paragraph when revealed
