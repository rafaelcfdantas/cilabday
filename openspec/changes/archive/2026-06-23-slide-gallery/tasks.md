## 1. Shared components

- [x] 1.1 Move `PolaroidPhoto` to `src/components/PolaroidPhoto.tsx` with optional `angle` prop (default `-3` for Birth Story) and update Birth Story imports
- [x] 1.2 Create `SlideHint` in `src/components/` with Balloon Game hint motion and configurable text
- [x] 1.3 Refactor `BalloonGameHint` to use `SlideHint` (or equivalent shared hint)

## 2. Gallery data layer

- [x] 2.1 Create `src/slides/gallery/galleryTypes.ts` with media, item (required `angle`), button, and effect types
- [x] 2.2 Create `galleryCopy.ts` from `gallery.json` with `GALLERY_HINT`, Vite asset imports, and typed effects for all seven items
- [x] 2.3 Add gallery constants (`GALLERY_ACTION_LOCK_MS`, beat fade durations, hint timing reuse)
- [x] 2.4 Remove `src/components/gallery.json` after copy migration

## 3. Gallery UI components

- [x] 3.1 Create `GalleryModal` with `backdrop-and-x` and `confirm-only` variants
- [x] 3.2 Create `MemePolaroid` (per-item `angle` rotation, title, media img/gif/video, description, button row layout with denial=coral / primary=teal color hierarchy)
- [x] 3.3 Create `RunningGalleryButton` with bounded relocate on hover/click and padding-bottom reserve
- [x] 3.4 Create `playGalleryRandomSfx` for fart/burp pool (respect `isMuted`)

## 4. Gallery slide logic

- [x] 4.1 Implement `useGalleryPhases` (hint phase, beatIndex, action lock, reset on deactivate)
- [x] 4.2 Implement beat transition state (fade out → fade in) with Framer Motion `AnimatePresence`
- [x] 4.3 Implement `galleryActions` handler mapping effects to modal, sfx, running button, advance, `goToNext`
- [x] 4.4 Create `GalleryContent` rendering one `<section id={item.id}>` per active beat
- [x] 4.5 Create `GallerySlide` shell (FiestaBackground, `SlideHint` with `GALLERY_HINT`, content, safe-area padding)

## 5. Slideshow integration

- [x] 5.1 Register `GallerySlide` at index 3 and `PlaceholderSlide` at index 4 in `slideRegistry`
- [x] 5.2 Verify Balloon Game Next → Gallery hint phase and final beat `goToNext` → Placeholder Slide 5

## 6. Documentation

- [x] 6.1 Update `CONTEXT.md` — Gallery Slide as Slide 4, configurable `GALLERY_HINT`, Placeholder as Slide 5, gallery beats, polaroid actions, Balloon Game → Gallery → Placeholder flow

## 7. Verification

- [x] 7.1 Manual pass: all seven beats, per-item polaroid angles, each custom action, 2s lock, mobile 320px layout
- [x] 7.2 Manual pass: gym confirm-only modal, sleeping running button overlap check, video controls without autoplay
