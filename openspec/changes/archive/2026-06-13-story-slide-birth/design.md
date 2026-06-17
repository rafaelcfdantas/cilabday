## Context

Slide 2 is the Birth Story Slide — four interactive beats, softer than Intro, semantic split: Intro CTA = **Next**, story CTA = **Continue**. The first implementation (line cascade + scattered Lotties) did not match the intended visual. **This design (v2)** replaces animation and layout decisions while keeping beat copy, state machine, registry, and CTA lock behavior.

## Goals / Non-Goals

**Goals:**

- Four beats with canonical English copy; previous beats dimmed at ~0.55 opacity
- **Beat entrance:** Animate.css on a **full-viewport-width** wrapper (~1s, tunable constant)
- **Text motion:** infinite CSS letter wave ([Madras Academy pattern](https://www.madrasacademy.com/wave-text-animation-with-html-and-css/)) — **gentle** amplitude and **longer** cycle (not aggressive)
- Wave starts **immediately when fadeIn ends** (0 ms gap)
- Beat 0 (date): inline `calendar_flip` aligned with date; `twinkle_stars_02` only as glitter on letters
- Beats 2–3 block: **two-column** layout — polaroid photo left, text stack right; beat 3 closing line below beat 2 identity text in the right column
- Cat Lottie on the **right** of identity text with light floating loop
- Mobile **stack fallback** via a single layout constant (easy human-test toggle)
- Intro `Next` rename, Slide 3 placeholder, shell-level mute — unchanged from v1

**Non-Goals:**

- Reinventing Animate.css entrance animations in Framer Motion
- Candles, heart, or calendar on beats 2–3
- `twinkle_stars_01`
- Auto-advance between beats

## Decisions

### Slide registry order

Unchanged — Intro (0), Birth Story (1), Placeholder (2).

### File layout under `src/slides/story/birth/`

```
birth/
  BirthStorySlide.tsx
  useBirthStoryBeats.ts
  BirthStoryContent.tsx       — orchestrates beat sections
  BirthStoryCta.tsx
  birthStoryCopy.ts
  constants.ts                — animation + layout tunables
  birthStoryLayout.ts         — BIRTH_PHOTO_LAYOUT: 'two-column' | 'stack'
  WaveText.tsx                — letter spans + CSS wave keyframes
  PolaroidPhoto.tsx           — frame, tilt, shadow, optional float
  beats/
    DateBeat.tsx              — beat 0
    NarrativeBeat.tsx         — beat 1
    IdentityBlock.tsx         — beats 2+3 two-column / stack block
```

**Rationale:** v1 god-component failed; one file per visual beat region keeps agent scope narrow.

### Animation constants (`constants.ts`)

All tunable in one place:

```ts
/** Animate.css beat block entrance (fadeIn*, slideIn*, etc.) */
export const BEAT_ENTER_DURATION_MS = 1000

/** Gap between entrance end and wave start — MUST stay 0 */
export const WAVE_START_DELAY_MS = 0

/** CSS wave — infinite loop, gentle */
export const WAVE_AMPLITUDE_PX = 4           // tutorial default 20 — too aggressive
export const WAVE_CYCLE_DURATION_S = 3.8
export const WAVE_LETTER_STAGGER_S = 0.14
```

Wave uses Madras pattern: each letter in `<span style="--i: n">`, `@keyframes` `translateY(0 → -WAVE_AMPLITUDE_PX → 0)`, `animation: wave … infinite`, `animation-delay: calc(var(--i) * WAVE_LETTER_STAGGER_S)`.

**Sequence on beat reveal:**

1. Full-bleed wrapper gets Animate.css entrance class for `BEAT_ENTER_DURATION_MS` (`fadeInLeftBig` / `fadeInRightBig` alternating by beat)
2. On `animationend`, apply wave class to text — **no extra delay**
3. Wave runs **infinite** on all visible beats: current beat after entrance; previously revealed beats immediately (`BeatEntrance` passes `waveEnabled` when `!isCurrent`)
4. Pre-entrance flash prevented: `opacity-0` until double-rAF starts animation
5. Horizontal clip via `overflow-x-clip` on entrance wrappers (avoids nested scroll from `overflow-x-hidden`)

**Entrance wrapper:** beat section root is `w-full` (not `max-w-2xl`). Inner content may constrain width; Animate.css runs on outer full-width layer so motion reads from viewport edges.

**Dependency:** add `animate.css`; import once in app entry.

### Beat 0 — date hero

```
     ┌──────────────────────────────────────┐  ← full-width entrance wrapper
     │   [calendar_flip]  July 13, 1999     │  ← inline flex row, align center
     │        ↑ twinkle_stars_02 masked     │     on glyph area only (glitter)
     └──────────────────────────────────────┘
```

- `calendar_flip`: inline left of date, ~4em, `renderConfig.devicePixelRatio` for sharp retina render
- Only `twinkle_stars_02.lottie` — overlay clipped to text bounds, not side decorations
- `WaveText` on date string
- **No** heart, **no** `twinkle_stars_01`

### Beat 1 — narrative

Centered block, full-width entrance, `WaveText` on the line. No Lotties.

### Beats 2–3 — identity block (two-column default)

```
┌─────────────────────────────────────────────────────────┐
│  ┌─────────────┐    And that little baby was you, Cila. │  ← beat 2
│  │   photo     │                              [cat ↗]   │
│  │  polaroid   │    27 years already… 😂 🎂             │  ← beat 3 below
│  │  ~rotate(-3°)│                                        │
│  └─────────────┘                                        │
└─────────────────────────────────────────────────────────┘
     ↑ left col              ↑ right col (stacked text)
```

**Polaroid (`PolaroidPhoto.tsx`):**

- White/cream frame, **wider bottom border** (classic polaroid), slight clockwise or counter-clockwise tilt (~−3°)
- Soft drop shadow
- Single photo only (inspiration mockup shows two — we use one)
- Photo enters with same Animate.css beat entrance as the block (or polaroid-specific fadeInLeft on full-bleed layer)
- Optional very subtle float on polaroid (~±4px, ~4s loop) — lighter than cat

**Right column:**

- Beat 2 identity line + cat Lottie **to the right** of text (not left)
- Cat: gentle float loop (~±6px, ~3.5s)
- Beat 3 closing line + emoji row **directly below** identity line when beat 3 is revealed
- **No** calendar, **No** candles, **No** heart Lottie
- Both lines use `WaveText`; wave active on all visible beats
- Desktop right column: `justify-center` on beat 2; `justify-between` on beat 3 (identity top, closing middle, emojis bottom) via `sm:contents` split — polaroid height is reference
- Beat 3 mobile: `justify-evenly` on main content stack; desktop beats 2–3 share top-aligned gaps so beats 0–1 do not shift when beat 3 appears

### Layout fallback (mobile / human test)

```ts
// birthStoryLayout.ts
export type BirthPhotoLayout = 'two-column' | 'stack'
export const BIRTH_PHOTO_LAYOUT: BirthPhotoLayout = 'two-column'
```

- `'two-column'`: `grid grid-cols-1 sm:grid-cols-[minmax(0,auto)_1fr]` — photo left, text right from `sm` up
- `'stack'`: single column — polaroid → identity → closing (flip constant only; no structural rewrite)

Human test fails on mobile → set `BIRTH_PHOTO_LAYOUT = 'stack'`.

### Beat state machine

Unchanged: `beatIndex` 0–3, 1s CTA lock, final beat → `goToNext()`.

### WaveText word boundaries

Letters grouped per word with `whitespace-nowrap` on word spans — line breaks only between words (fixes mid-word wrap on desktop).

### Previous beats dimming

Unchanged: earlier beats at ~0.55 opacity; current at 1.0. **Wave continues on dimmed beats.**

### Beat copy (canonical)

| Index | Content |
|-------|---------|
| 0 | **July 13, 1999** |
| 1 | On that day, the world gained someone truly special. |
| 2 | Photo + And that little baby was you, Cila. |
| 3 | 27 years already… time flies, ¿verdad? 😂🎂 |

### Visual atmosphere

- `FiestaBackground` only — no confetti, no Intro rotating decoration sets
- Lotties allowed: beat 0 `calendar_flip` + `twinkle_stars_02`; beat 2 block `cat_feeling_love` only

### Removed from v1 (do not re-implement)

- `LineCascadeText` and lateral entry directions
- `twinkle_stars_01`, heart, candles, calendar on identity block
- Absolute-position Lottie clutter around text
- Beat entrance confined to `max-w-2xl` inner container only

## Risks / Trade-offs

- **Animate.css + CSS wave timing sync** — use `animationend` on entrance element to add wave class; test reduced-motion
- **Glitter mask on text** — may need `background-clip` / overlay div; spike in task list if first approach fails
- **Two-column on narrow phones** — default stack below `sm`; human test may require `'stack'` constant

## Migration Plan (v2 rework)

1. Reset birth slide UI files (keep `useBirthStoryBeats`, `birthStoryCopy`, registry, CTA shell)
2. Add `animate.css` + `WaveText` + `PolaroidPhoto` + beat components per tasks.md
3. Remove `LineCascadeText` / obsolete Lottie wiring
4. Manual test all beats at 320px and desktop; try `'stack'` if needed

## Open Questions

- None blocking — animation timings tunable via `constants.ts`.
