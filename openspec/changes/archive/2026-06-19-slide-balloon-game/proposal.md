## Why

Slide 3 is still a neutral Placeholder with no interactive content. This change delivers an intimate balloon-popping minigame that progressively reveals a personal birthday message — a playful break from the linear birth story beats while staying in the Fiesta atmosphere.

## What Changes

- Replace Slide 3 Placeholder with **Balloon Game Slide** — interactive 3×3 grid minigame that reveals hidden English paragraph copy
- **Phase timeline:** short EN hint ("Pop the balloons!") with 0.5s fade in, 2s hold, 0.5s fade out (3s total); game layer fades in over 1s **starting together with** hint fade out; pin cursor and balloon clicks unlock when game fade completes
- **9 balloons** (one per grid cell) overlay the paragraph at opacity 1 underneath; transparent cell backgrounds; popping removes the balloon and plays a random pop SFX (5 variants), revealing that region of text
- **Manual color assignment** per cell — five balloon Lottie colors, no adjacent duplicate colors
- **Random per-cell position offsets** within each grid cell — chosen once when the slide appears; positions stay fixed while the user plays (no jumping between pops)
- After all balloons popped: restore default cursor, **2s reading delay**, then shell-level **Next** CTA navigates to Slide 4 Placeholder
- Move existing Placeholder to **Slide 4** (index 3)
- Update Birth Story final beat navigation target from Placeholder to Balloon Game Slide
- Update `CONTEXT.md` glossary — Balloon game slide, Placeholder as Slide 4, CTA semantics

## Capabilities

### New Capabilities

- `slide-balloon-game`: Slide 3 interactive balloon minigame — hint phase, overlay reveal, pin cursor, pop SFX, paragraph reveal, Next CTA handoff to Slide 4

### Modified Capabilities

- `slideshow-shell`: Registry order becomes Intro → Birth Story → Balloon Game → Placeholder; navigation and transition scenarios updated for four-slide flow
- `story-slide-birth`: Final beat Continue navigates to Balloon Game Slide (index 2) instead of Placeholder

## Impact

- **Code:** new `src/slides/balloon/` (or similar) components; `slideRegistry.ts` updated; `PlaceholderSlide` label updated for Slide 4
- **Assets:** `pink/blue/green/yellow/red_balloon.lottie`, `balloon_pop_01–05.mp3`, `assets/img/pin.png`
- **Audio:** lightweight one-shot SFX on pop (respects existing mute state); no soundtrack changes
- **Specs:** delta updates to `slideshow-shell`, `story-slide-birth`; new `slide-balloon-game` capability spec
- **Docs:** `CONTEXT.md` glossary — Balloon game slide entry, Placeholder as Slide 4, Birth story handoff, CTA Next/Continue semantics
