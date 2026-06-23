## Context

Slide 4 is `PlaceholderSlide` in `slideRegistry` today. This change inserts Gallery Slide at index 3 and keeps Placeholder at index 4 (Slide 5).

Slide 2 (Birth Story) uses a polaroid frame (`PolaroidPhoto`) and in-slide beat progression (`useBirthStoryBeats`). Slide 3 (Balloon Game) establishes the hint pattern (`BalloonGameHint` + `HINT_FADE_MS` / `HINT_HOLD_MS` timings). Gallery content is authored in `src/components/gallery.json` with seven items and heterogeneous button behaviors.

Exploration decisions are locked: beatIndex drives visibility (one `<section id={item.id}>` at a time), not seven simultaneous DOM sections; Vite imports in `galleryCopy.ts` instead of raw asset path strings; modal dismiss (simple vs confirm-only); running button uses three fixed flee slots.

## Goals / Non-Goals

**Goals:**

- Ship Gallery Slide as Slide 4 with hint → 7 beats → `goToNext()` to Placeholder Slide (Slide 5)
- Reuse visual language: Fiesta background, polaroid frame, Balloon Game hint motion
- Data-driven beats and hint from typed copy with explicit `effect` union (not runtime parsing of free-text `description`)
- Shared `PolaroidPhoto` and `SlideHint` in `src/components/`
- Respect global mute for SFX custom actions

**Non-Goals:**

- Swipe/gesture navigation between gallery beats
- Autoplay video; user controls native `<video>` player
- Persisting gallery progress if user navigates backward (slideshow has no back nav today)
- New soundtrack or slide-level audio changes

## Decisions

### 1. Beat engine: `beatIndex` + single mounted section

**Choice:** `useGalleryPhases` manages `phase: 'hint' | 'gallery'` and `beatIndex: 0..6`; render `GALLERY_ITEMS[beatIndex]` inside `<section id={item.id}>`.

**Alternatives:** Seven sibling sections always in DOM with visibility toggles — more DOM nodes, same UX.

**Rationale:** JSON is an ordered array; index is the natural key; fade transitions pair cleanly with `AnimatePresence mode="wait"`.

### 2. Copy layer: `galleryCopy.ts` with typed effects

**Choice:** Transform `gallery.json` content into `galleryCopy.ts` exporting `GALLERY_HINT`, `GALLERY_ITEMS`, and per-button `GalleryButtonEffect`:

```ts
type GalleryButtonEffect =
  | { type: 'advance' }
  | { type: 'modal'; message: string; dismiss: 'backdrop-and-x' }
  | { type: 'modal-confirm'; message: string; confirmLabel: string }
  | { type: 'randomSfx'; pool: readonly string[] }
  | { type: 'runningButton' }
```

Buttons without JSON `description` map to `{ type: 'advance' }`. Last beat advance calls `goToNext()` instead of incrementing index. Each item includes required numeric `angle` (degrees) for polaroid rotation.

**Alternatives:** Import JSON at runtime with string asset paths — breaks Vite bundling.

### 3. Hint timing and configurable text

**Choice:** Import `HINT_FADE_MS`, `HINT_HOLD_MS`, `REVEAL_START_MS` from balloon `constants.ts` (or duplicate in gallery `constants.ts` if import creates awkward coupling). Shared `SlideHint` receives `text` prop — no hardcoded hint strings in components. Gallery passes `GALLERY_HINT` from `galleryCopy.ts`; Balloon Game passes its hint from `balloonGameCopy.ts`.

**Alternatives:** Duplicate `BalloonGameHint` with gallery-specific hardcoded string — risks visual drift and doc/code mismatch when copy changes.

### 4. Polaroid component split

**Choice:** Move visual shell to `src/components/PolaroidPhoto.tsx` (image + cream frame + subtle float). Accept optional `angle` prop (degrees) for CSS `rotate`; Birth Story keeps default `-3`. Gallery-specific `MemePolaroid` in `src/slides/gallery/` adds title, description, media variants, button row, and passes each item's `angle` from copy.

Birth Story `IdentityBlock` imports shared `PolaroidPhoto` without overriding angle (default `-3`).

### 5. Beat transition

**Choice:** Framer Motion `AnimatePresence` with `mode="wait"`: outgoing polaroid opacity 0 (~400ms), then incoming opacity 0→1 (~400ms). Total ~800ms aligned with slide transition feel.

### 6. Action lock

**Choice:** `GALLERY_ACTION_LOCK_MS = 2000` on each beat enter (and on slide re-enter reset). Buttons `disabled` until lock clears.

### 7. Button layout and color hierarchy

**Choice:** Tailwind — one button `w-full`; two buttons `grid grid-cols-2 gap-2`. Fiesta-styled pill buttons with role-based color:

- **Denial** (`modal` dismiss, `randomSfx`): `bg-fiesta-coral` + gold glow (same warm accent as Birth Story CTA)
- **Primary / continue** (`advance`, `modal-confirm`): `bg-fiesta-teal` + teal glow — visually distinct from denial so the affirmative path reads as the main action

Running button uses the same denial styling (coral); only behavior differs (relocate on hover/click). Gallery-only scope; other slides unchanged.

### 8. Modals

**Choice:** `GalleryModal` component with variants:

- `backdrop-and-x`: message, X button with `aria-label="Close"`, backdrop click dismisses; user stays on beat
- `confirm-only`: no backdrop dismiss, no X; confirm button closes and advances beat (gym item)

### 9. Running button (sleeping beat)

**Choice:** Single `relative` action container with both buttons as direct children. Initial layout matches other two-button beats: running in the left half, continue in the right half (`w-[calc(50%-4px)]`). Running uses `position: absolute` with three fixed slots — `bottom-left` (initial), `top-left`, `top-right` — measured once from container/continue layout. On hover/click, running jumps randomly to one of the other two slots. Container gets extra min-height for flee room above the button row.

### 10. SFX (girly_girl beat)

**Choice:** `playGalleryRandomSfx(isMuted)` mirroring `playBalloonPopSfx` — pool of six imported MP3s, random per click.

### 11. Registry layout

**Choice:** Register `{ id: 'gallery', component: GallerySlide }` at index 3. Keep `{ id: 'placeholder', component: PlaceholderSlide }` at index 4 (Slide 5). Registry order: Intro → Birth Story → Balloon Game → Gallery → Placeholder.

## Risks / Trade-offs

- **[Risk] Video polaroid height on small screens** → Use `max-h` constraint and `object-contain`; test 320px width
- **[Risk] Running button still overlaps continue on very short viewports** → padding-bottom tied to measured or fixed button height; min-height on action area
- **[Risk] Long button labels in 2-column grid** → `text-sm` on mobile, allow line wrap
- **[Risk] Modal open during beat transition** → Close modal on beat change; disable advance while transitioning
- **[Trade-off] Duplicated hint constants vs cross-slide import** → Prefer shared constants file or `SlideHint` co-located with timing exports if balloon import feels wrong

## Migration Plan

1. Add shared components and gallery module
2. Insert `GallerySlide` at index 3 in `slideRegistry`; keep `PlaceholderSlide` at index 4
3. Verify Balloon Game → Gallery → Placeholder navigation chain
4. Remove `src/components/gallery.json` after copy migrates to `galleryCopy.ts`
5. Update `CONTEXT.md`

Rollback: remove Gallery entry from registry; restore Placeholder at index 3.

## Open Questions

- None.
