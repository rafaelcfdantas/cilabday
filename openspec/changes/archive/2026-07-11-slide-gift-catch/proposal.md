## Why

Slide 5 is still a minimal Placeholder with no interactive payoff after the Gallery chapter. A **Gift catch slide** gives Cila a playful minigame — catch falling gift Lotties to "discover" how she is seen — then reveals eight fixed adjectives in a floating wave-text finale. The illusion that each gift carries a unique adjective makes the reveal personal; the copy is always the same eight words. Placeholder moves to Slide 6 so forward navigation stays testable while the farewell slide is still in progress.

## What Changes

- Add **Gift catch slide** as Slide 5 (index 4) — falling-gift minigame with fake adjective collection and fixed reveal
- Relocate **Placeholder slide** to Slide 6 (index 5)
- **Hint phase** — `"Catch the gifts to discover how I see you"`; same timing as Balloon Game / Gallery hint (0.5s fade in, 2s hold, 0.5s fade out)
- **Interactive phase** — first gift spawns immediately; later spawns use editable delay range 0.5–1s; fall duration editable range 1.5–2s; random horizontal position; random Lottie from editable pool (play once); tap increments bare counter; miss removes gift without incrementing
- **No SFX** — slideshow soundtrack only
- **Complete phase** — at 8 caught: stop spawn; remaining gifts lose click and fade out; after fade completes, eight fixed adjectives appear with 150ms stagger, light random tilt, floating layout (in-viewport, no overlap), and `WaveText`
- **CTA** — shell-level **Next** after 1s from the last adjective entrance; navigates to Placeholder (Slide 6)
- Copy and tunables in `src/slides/gift-catch/` (`giftCatchCopy.ts` with `HINT_TEXT`, `GIFT_CATCH_ADJECTIVES`, `GIFT_LOTTIE_POOL`; `constants.ts`)
- Eight adjectives in order EN → ES → EN → PT → EN → EN → ES → EN: Empowering, Imparable, Brave, Carinhosa, Graceful, Smart, Inolvidable, Brilliant
- Update `CONTEXT.md` — Gift catch slide, Placeholder as Slide 6, Gallery → Gift catch → Placeholder flow

## Capabilities

### New Capabilities

- `slide-gift-catch`: Gift catch slide as Slide 5 — hint, falling-gift minigame, fake adjective collection, fixed adjective reveal, Next CTA to Placeholder (Slide 6)

### Modified Capabilities

- `slideshow-shell`: Insert Gift catch slide at Slide 5, relocate Placeholder to Slide 6, update registry order and transition scenarios
- `slide-gallery`: Final beat continue navigates to Gift catch slide (Slide 5) instead of Placeholder

## Impact

- `src/slideshow/slideRegistry.ts` — insert `GiftCatchSlide` at index 4; keep `PlaceholderSlide` at index 5
- `src/slides/gift-catch/` — new slide module (phases hook, spawn scheduler, falling targets, adjective reveal, copy, constants)
- `src/slides/gallery/` — final beat `goToNext()` targets Gift catch slide
- `src/slides/placeholder/PlaceholderSlide.tsx` — remains registered as Slide 6
- `assets/animations/` — gift Lotties referenced via editable pool in `giftCatchCopy.ts` (no spec lock to asset filenames)
- `CONTEXT.md` — glossary and flow updates
