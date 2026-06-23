## Why

Slide 4 is still a minimal Placeholder with no narrative payoff after the Balloon Game Slide. A meme gallery chapter turns assets in `assets/gallery/` into an interactive beat-driven polaroid gallery. The existing Placeholder remains in the slideshow as Slide 5 so forward navigation stays testable while later chapters are still in progress.

## What Changes

- Add a **Gallery Slide** as Slide 4 (index 3) — seven internal beats, one meme polaroid visible at a time
- Relocate **Placeholder Slide** to Slide 5 (index 4) to preserve forward navigation scaffolding
- Hint phase — text from gallery copy (`hint` → `GALLERY_HINT`); same timing and motion as Balloon Game hint (0.5s fade in, 2s hold, 0.5s fade out)
- On hint fade out, first gallery beat fades in using shared polaroid visual from Birth Story Slide
- Each beat: required `angle` (degrees for polaroid CSS rotation), optional title, media (gif/image/video), optional description, 1–2 action buttons with color hierarchy — denial actions coral, continue/confirm actions teal
- Button without custom `description` advances to next beat; final beat advance calls `goToNext()` to Placeholder Slide (Slide 5)
- Custom button behaviors: dismissible modal (X + backdrop), confirm-only modal (gym beat), random fart/burp SFX, running evasive button
- Move `PolaroidPhoto` shell to `src/components/`; add shared `SlideHint` component
- Typed gallery data in `src/slides/gallery/galleryCopy.ts` (`GALLERY_HINT` + items with Vite asset imports); remove `src/components/gallery.json` after migration
- 2s action lock on each beat enter (same intent as Birth Story CTA lock)
- Beat transitions: fade out current polaroid, then fade in next
- Update `CONTEXT.md` with Gallery Slide, gallery beats, polaroid actions, and Balloon Game → Gallery navigation

## Capabilities

### New Capabilities

- `slide-gallery`: Gallery Slide as Slide 4 — configurable hint, seven meme beats, per-item polaroid `angle`, button actions, exit to Placeholder Slide (Slide 5)

### Modified Capabilities

- `slideshow-shell`: Insert Gallery Slide at Slide 4, relocate Placeholder to Slide 5, and add Gallery → Placeholder transition scenarios
- `slide-balloon-game`: Next CTA navigates to Gallery Slide (Slide 4) instead of Placeholder

## Impact

- `src/slideshow/slideRegistry.ts` — insert `GallerySlide` at index 3; keep `PlaceholderSlide` at index 4
- `src/slides/gallery/` — new slide module (hook, content, actions, copy)
- `src/components/` — `PolaroidPhoto.tsx`, `SlideHint.tsx`, `GalleryModal.tsx` (or equivalent)
- `src/slides/story/birth/` — import polaroid from shared component
- `src/slides/balloon/BalloonGameHint.tsx` — may adopt shared `SlideHint`
- `assets/gallery/`, `assets/audios/` (fart/burp SFX) — already present
- `CONTEXT.md` — glossary and flow updates
- `src/slides/placeholder/PlaceholderSlide.tsx` — remains registered as Slide 5
