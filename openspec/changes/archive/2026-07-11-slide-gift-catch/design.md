## Context

Slide 5 is `PlaceholderSlide` in `slideRegistry` today (index 4). This change inserts Gift catch slide at index 4 and keeps Placeholder at index 5 (Slide 6).

Slide 3 (Balloon Game) established hint timing (`HINT_FADE_MS`, `HINT_HOLD_MS`) and a phase machine (`hint → reveal → interactive → complete → cta`). Slide 4 (Gallery) reuses hint via shared `SlideHint`. Gift catch reuses hint timing but **does not** spawn gifts during hint — interactive phase starts after hint ends (simpler than balloon overlap; avoids clickable gifts falling before unlock).

Exploration decisions are locked: fake adjective gimmick (any eight gifts reveal the same fixed eight words); spawn model **B** (remove gift on miss at bottom of fall); no SFX; Next CTA to Placeholder; model **C** (fixed slot pool) documented below as future alternative only.

## Goals / Non-Goals

**Goals:**

- Ship Gift catch slide as Slide 5 with hint → catch 8 gifts → adjective reveal → Next to Placeholder (Slide 6)
- Reuse Fiesta background, `SlideHint`, balloon hint timings, `WaveText`, Birth Story CTA / Balloon Game CTA patterns
- Editable copy (`giftCatchCopy.ts`) and tunables (`constants.ts`) — Lottie pool, spawn/fall ranges, tap target size
- Eight fixed adjectives in language order EN → ES → EN → PT → EN → EN → ES → EN (concrete strings; editable later)
- Respect global mute (no slide SFX anyway)

**Non-Goals:**

- Slide 6 farewell slide (separate future change)
- Real per-gift adjective mapping (collection is cosmetic only)
- Balloon-style game layer overlap during hint fade
- SFX on catch
- Concurrent gift cap (`MAX_CONCURRENT_GIFTS`) — spawn/fall ranges alone control density
- Model C fixed slot pool implementation (documented alternative only)
- `prefers-reduced-motion` handling
- Fixed adjective coordinate presets (layout must only satisfy: in-viewport, no overlap, light random tilt, WaveText, floating feel)

## Decisions

### 1. Registry layout

**Choice:** Register `{ id: 'gift-catch', component: GiftCatchSlide }` at index 4. Keep `{ id: 'placeholder', component: PlaceholderSlide }` at index 5.

Registry order: Intro → Birth Story → Balloon Game → Gallery → **Gift catch** → Placeholder.

Gallery final continue → `goToNext()` → Gift catch. Gift catch Next → Placeholder.

### 2. Phase machine

**Choice:** `useGiftCatchPhases` manages `phase: 'hint' | 'interactive' | 'complete' | 'cta'`.

```
hint (3s, SlideHint only)
  → interactive (spawn + catch until caughtCount === 8; counter visible)
  → complete (fade out remaining gifts, then stagger adjectives)
  → cta (CTA_DELAY_MS after last adjective entrance → Next visible)
```

No separate `reveal` phase. Game UI (counter + fall area) fades in when `interactive` starts (~400ms fade acceptable). Counter is hidden outside `interactive`.

Reset all state when `isActive` becomes false.

### 3. Fake adjective gimmick

**Choice:** Gifts carry no real adjective data. `caughtCount` is the only gameplay metric. On `caughtCount === 8`, reveal `GIFT_CATCH_ADJECTIVES` — fixed ordered array of eight strings from `giftCatchCopy.ts`. Hint copy sells the illusion; implementation never branches on which gift was caught.

Language order (index → language): EN, ES, EN, PT, EN, EN, ES, EN.

Initial concrete strings (editable later without spec change):

| Index | Lang | String |
|-------|------|--------|
| 0 | EN | Empowering |
| 1 | ES | Imparable |
| 2 | EN | Brave |
| 3 | PT | Carinhosa |
| 4 | EN | Graceful |
| 5 | EN | Smart |
| 6 | ES | Inolvidable |
| 7 | EN | Brilliant |

### 4. Spawn model B — remove on miss

**Choice:** Each active gift is a React child with unique `id`. Scheduler runs while `caughtCount < 8` and `phase === 'interactive'`.

- **First spawn:** immediate when interactive begins (no initial delay)
- **Later spawns:** after each enqueue, wait a random delay in `[SPAWN_DELAY_MIN_MS, SPAWN_DELAY_MAX_MS]`, then spawn the next gift (while still interactive and under target)
- **Catch:** increment `caughtCount`, unmount gift immediately
- **Miss:** gift reaches bottom of fall area without tap → unmount gift, `caughtCount` unchanged
- **Complete:** stop scheduler; gifts still falling lose `pointer-events`, play fadeOut over `GIFT_EXIT_FADE_MS`, then unmount; adjective reveal starts only after remaining gifts have finished fading out

**Why not loop:** looping fall animation never frees a slot on miss. Remove-on-miss self-balances concurrency (~2–3 gifts on screen at steady state with default spawn/fall ranges). No separate concurrent cap.

**Lottie remount:** unmount + new mount reuses browser HTTP cache per asset URL; no repeated network fetch for the same `.lottie` file.

**Lottie playback:** each falling gift plays its Lottie **once** (no loop) while falling.

### 5. Spawn and fall tunables (`constants.ts`)

**Choice:** Export editable constants. Spec locks names and default values; author may retune later in code without a new change.

| Constant | Default | Role |
|----------|---------|------|
| `GIFT_CATCH_TARGET` | `8` | gifts required |
| `SPAWN_DELAY_MIN_MS` | `500` | min delay between spawns after the first |
| `SPAWN_DELAY_MAX_MS` | `1000` | max delay between spawns after the first |
| `FALL_DURATION_MIN_MS` | `1500` | min fall duration per gift |
| `FALL_DURATION_MAX_MS` | `2000` | max fall duration per gift |
| `GIFT_EXIT_FADE_MS` | (editable) | fade when complete phase clears remaining gifts |
| `ADJECTIVE_STAGGER_MS` | `150` | delay between adjective entrances |
| `CTA_DELAY_MS` | `1000` | delay after last adjective entrance before Next |
| `MIN_TAP_TARGET_PX` | (e.g. 48) | minimum hit area |

Hint timings: import or re-export `HINT_FADE_MS`, `HINT_HOLD_MS` from balloon `constants.ts` (same as gallery).

No `MAX_CONCURRENT_GIFTS` — density is controlled only by spawn delay and fall duration ranges.

### 6. Lottie pool

**Choice:** `GIFT_LOTTIE_POOL` in `giftCatchCopy.ts` — `readonly string[]` of Vite-imported `.lottie` URLs. Each spawn picks `pool[random]`. Pool is editable without spec change. Spec does not mandate asset filenames (assets may still be incomplete).

Each falling gift: `DotLottieReact` (play once) inside absolutely positioned tap target sized to at least `MIN_TAP_TARGET_PX`.

Fall motion: CSS `transform: translateY` or Framer Motion `animate` from top to bottom of a dedicated `relative` playfield (not full viewport — leave room for counter during interactive and CTA safe area).

### 7. Counter UI

**Choice:** During `interactive` only, show the current `caughtCount` as a bare number (e.g. `3`). No `/ 8`, no thematic label. Hidden during `hint`, `complete`, and `cta`.

### 8. Adjective reveal layout

**Choice:** After remaining gifts finish fading out, render eight adjective labels scattered in the viewport with a floating feel. No fixed coordinate presets required. Layout constraints:

- Stay inside the viewport (no clipping off-screen)
- Do not overlap each other
- Light random rotation tilt between items (not a fixed authored tilt table)
- Each item uses `WaveText` with `waveEnabled={true}` after entrance
- Framer Motion entrance: opacity 0→1 with `ADJECTIVE_STAGGER_MS * index` delay (`150` default)

Adjectives remain visible until user leaves slide. No shuffle — order matches `GIFT_CATCH_ADJECTIVES` array.

### 9. CTA

**Choice:** Reuse shell-level fixed CTA pattern from `BalloonGameCta` — label `"Next"`, visible only in `cta` phase, calls `goToNext()` → Placeholder.

**CTA timing anchor (D):** start `CTA_DELAY_MS` (`1000`) when the **last** adjective entrance begins (index 7), then enter `cta` and show Next.

### 10. File layout under `src/slides/gift-catch/`

```
gift-catch/
  GiftCatchSlide.tsx          — shell: background, hint, board, adjectives, CTA
  useGiftCatchPhases.ts       — phase state + timers
  useGiftSpawn.ts             — scheduler, active gifts array, catch/miss handlers
  GiftCatchBoard.tsx          — playfield + counter + falling gifts
  FallingGiftTarget.tsx       — single clickable falling Lottie gift (play once)
  AdjectiveReveal.tsx         — floating WaveText adjectives (no-overlap / in-viewport)
  GiftCatchCta.tsx            — Next button
  giftCatchCopy.ts            — HINT_TEXT, GIFT_CATCH_ADJECTIVES, GIFT_LOTTIE_POOL
  constants.ts                — timing and gameplay tunables
```

### 11. WaveText location

**Choice:** Import existing `WaveText` from birth story path (as balloon does). Optional follow-up: move to `src/components/WaveText.tsx` — not required for this change.

## Alternative considered: Model C — fixed slot pool

**Not implemented.** Documented for future perf tuning.

| | Model B (chosen) | Model C (alternative) |
|---|---|---|
| DOM | mount/unmount per gift | N fixed slots, Lottie always mounted |
| On miss | unmount | slot → `idle`, reset transform |
| Concurrency | self-balanced via spawn/fall ranges | pool size is the cap |
| Complexity | lower | scheduler + per-slot state machine |
| When to adopt | default | if mobile profiling shows jank from repeated DotLottie remounts |

No tasks for model C in this change.

## Risks / Trade-offs

- **[Risk] Too many concurrent Lotties on slow devices** → retune spawn/fall ranges and pool size; model C documented as escape hatch
- **[Risk] Adjective scatter overlaps or clips on narrow screens** → layout algorithm must enforce in-viewport + no-overlap; reduce spread on small widths if needed
- **[Risk] Gifts spawn under counter or CTA** → constrain random X within playfield padding; keep CTA in shell overlay outside playfield
- **[Trade-off] No SFX on catch** → quieter moment before emotional adjectives; matches user preference

## Migration Plan

1. Add `src/slides/gift-catch/` module
2. Insert `GiftCatchSlide` at index 4; keep `PlaceholderSlide` at index 5
3. Update Gallery final beat to navigate to Gift catch
4. Verify Gallery → Gift catch → Placeholder chain
5. Update `CONTEXT.md`

Rollback: remove Gift catch from registry; restore Gallery → Placeholder direct navigation.

## Open Questions

- None for Gift catch slide behavior. Slideshow-shell delta discussion pending separately (soundtrack scenario placement).
