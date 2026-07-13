## 1. Domain docs and constants

- [x] 1.1 Update `CONTEXT.md` — add Farewell slide glossary; update CTA / Gift catch Next target to Farewell; retire Placeholder as Slide 6
- [x] 1.2 Create `src/slides/farewell/constants.ts` with `FADE_IN_MS = 1000`, `FADE_OUT_MS = 1000`, `HOLD_MS = [1500, 3000, 1500, 3000]` (finale reuses `FADE_IN_MS`)
- [x] 1.3 Create `farewellCopy.ts` with the four locked beat strings + finale labels (`THE END`, `Watch again`)
- [x] 1.4 Create `farewellDecorSlots.ts` with five fixed slots (left/top/rotateDeg ±6 starters from design) — no random jitter

## 2. Phase machine and shell wiring

- [x] 2.1 Implement `useFarewellPhases` — auto `beatIndex` 0→3 (fade/hold/fade), then finale with `FADE_IN_MS`; reset to `beatIndex` 0 when `isActive` is false
- [x] 2.2 Create `FarewellSlide.tsx` shell with `FiestaBackground` and phase switch (beats vs finale)
- [x] 2.3 Register Farewell at index 5 in `slideRegistry.ts`; remove Placeholder entry
- [x] 2.4 Delete `src/slides/placeholder/` entirely
- [x] 2.5 Update `devConstants.ts` slide index comments for Farewell as slide 6

## 3. Beat visuals

- [x] 3.1 Beat 1 — `heart.lottie` (`clamp(4rem,18vw,7rem)`, loop, float OK) above `WaveText` (wave all beat phases; `font-display` `text-2xl sm:text-3xl md:text-4xl` centered); shared fade wrapper
- [x] 3.2 Beat 2 — `jumping_gift_boxes` (`clamp(5rem,22vw,8rem)`, play once) above + `parrot_dancing` (`clamp(4rem,18vw,7rem)`, loop) below + same WaveText typography
- [x] 3.3 Beat 3 — `BeatTwinkleText`: shrink-wrap wrapper, WaveText, looping `twinkle_stars_02` with `absolute inset-0`, higher z-index, `mix-blend-screen`, `pointer-events-none`, `aria-hidden` — **never** DateBeat fixed rem overlay
- [x] 3.4 Beat 4 hero — `BouncingText` + `colorCycle` for `HAPPY BIRTHDAY!` at Intro heading scale
- [x] 3.5 Beat 4 confetti — one-shot fullscreen `confetti_02` at **start of beat 4 fade-in** (not Intro burst schedule)
- [x] 3.6 Beat 4 scatter — five Lotties (`clamp(3.5rem,14vw,6rem)`, loop, gentle float, rotateDeg ±6) via `%` slots in inset container; no overlap with each other or hero; sufficient margin; never `happy_bday_cake_balloons_flags_`
- [x] 3.7 Ensure no emojis on any beat

## 4. Finale

- [x] 4.1 Create `FarewellFinale` — `THE END` opacity fade-in over `FADE_IN_MS` after beat 4 fade-out (no WaveText/BouncingText/Lottie) + discreet `Watch again`
- [x] 4.2 Wire Watch again to `window.location.reload()` only (no `goToIndex` / AudioProvider changes)

## 5. Manual verification

- [x] 5.1 Gift catch Next → Farewell beat 1 (`beatIndex` 0) starts automatically
- [x] 5.2 Timing: holds feel readable; retune constants only if needed
- [x] 5.3 Beat 3: twinkle covers text box exactly on mobile and desktop
- [x] 5.4 Beat 4: confetti at fade-in; BouncingText + five décor slots; no overlap / in-container / clear margins; tune slots if needed
- [x] 5.5 Finale: THE END 1s fade-in after beat 4; Watch again reloads to Kickoff with clean audio
- [x] 5.6 Mobile 320px + desktop: no overflow; Placeholder folder gone
