## Why

Slide 6 is still a minimal Placeholder used only to validate forward navigation after Gift catch. The slideshow needs a real farewell chapter — a timed, cinematic epilogue that closes the arc opened at Kickoff ("I hope you love this surprise") without asking Cila for more interaction after four active chapters.

## What Changes

- Replace Placeholder (Slide 6) with a **Farewell slide**: four auto-timed beats (fade in → hold → fade out), then "THE END" fades in over 1s with a discreet "Watch again" control that calls `window.location.reload()`
- Beat timing defaults (editable constants): fade in/out 1000ms; holds 1500 / 3000 / 1500 / 3000 ms; finale uses same fade-in
- Per-beat visuals locked in design/spec (sizes, loop rules, ±6° scatter tilt, no-overlap): heart; jumping gifts + parrot; WaveText + twinkle inset-0 glitter; BouncingText + colorCycle + confetti at fade-in start + five scatter Lotties with float — **no emojis**
- Update Gift catch Next target from Placeholder to Farewell
- **Delete** Placeholder from registry and `src/slides/placeholder/`
- Update `CONTEXT.md` with Farewell slide terminology and flow

## Capabilities

### New Capabilities

- `slide-farewell`: Timed farewell epilogue — four auto-advanced beats with locked Lottie/copy treatments, static THE END finale, Watch again via full page reload

### Modified Capabilities

- `slideshow-shell`: Registry order ends with Farewell (index 5) instead of Placeholder; Gift catch Next → Farewell; remove Placeholder-as-Slide-6 requirement
- `slide-gift-catch`: Next CTA navigates to Farewell (Slide 6), not Placeholder

## Impact

- `src/slideshow/slideRegistry.ts` — swap Placeholder for Farewell at index 5
- `src/slides/placeholder/` — deleted after Farewell ships
- `src/slides/farewell/` — new module (phases hook, beat views, copy, constants, decor slots)
- `src/slides/gift-catch/` — Next CTA target remains `goToNext()` (registry order change is enough)
- `CONTEXT.md` — Farewell slide glossary; Placeholder retired
- Reuses existing assets: `heart`, `jumping_gift_boxes`, `parrot_dancing`, `twinkle_stars_02`, `confetti_02`, `balloons`, `party_blower`, `bday_cupcake`, `bday_cake`, `party_cups`; components `WaveText`, `BouncingText`, `FiestaBackground`
- No AudioProvider API changes (reload resets audio/state)
