## Context

Slide 3 is a Placeholder. This design implements the Balloon Game Slide — a one-shot interactive minigame for Cila that reveals personal EN copy through a 3×3 balloon grid. Explored and agreed: overlay model (text at opacity 1 under opaque balloon art), overlapping hint/game fades, manual color grid, random pop SFX, pin cursor, 2s reading delay before Next.

Stack unchanged: React, Framer Motion, DotLottieReact, existing Fiesta theme. AudioProvider handles soundtracks only — pop SFX stays local to the slide.

## Goals / Non-Goals

**Goals:**

- Phase state machine: hint → reveal (overlap) → interactive → complete → CTA
- 3×3 grid, 9 balloons, paragraph underneath, pop-to-reveal
- Pin cursor during interactive phase; random pop SFX (5 variants); respects mute
- Manual balloon color map (no adjacency algorithm)
- Random offsets per cell — chosen once when slide appears; fixed while playing (see **Balloon position offsets** below)
- **Next** CTA (shell-level forward nav) after 2s post-complete
- Registry: Intro (0) → Birth Story (1) → Balloon Game (2) → Placeholder (3)
- Copy in `balloonGameCopy.ts` — EN only, editable without touching components

**Non-Goals:**

- `prefers-reduced-motion` handling (single-user, one-time app)
- Persist/re-enter slide state
- Enforced pop order or reading-order mapping
- Extending AudioProvider for SFX
- Reusing `LottieDecoration` (pointer-events-none, float/spin not wanted)
- Balloon pop Lottie animation (balloon simply unmounts on pop)

## Decisions

### Slide registry order

Intro (0), Birth Story (1), **Balloon Game (2)**, Placeholder (3).

Birth Story final Continue → `goToNext()` → Balloon Game. Balloon Game Next → Placeholder.

### File layout under `src/slides/balloon/`

```
balloon/
  BalloonGameSlide.tsx       — shell: background, phases, CTA
  useBalloonGamePhases.ts    — phase state + timers
  BalloonGameHint.tsx        — hint text fade in/out
  BalloonGameBoard.tsx       — paragraph + 3×3 grid
  BalloonPopTarget.tsx       — single clickable Lottie balloon
  BalloonGameCta.tsx         — Next button (reuse BirthStoryCta pattern, label "Next")
  balloonGameCopy.ts         — HINT_TEXT + PARAGRAPH (EN, editable)
  balloonGameLayout.ts       — GRID_COLORS[9], BALLOON_ASSETS map, cell offsets
  constants.ts               — timing tunables
  playBalloonPopSfx.ts       — one-shot SFX helper
```

**Rationale:** mirrors birth story folder structure; keeps copy/layout/timing separate from UI.

### Phase timing (`constants.ts`)

```ts
export const HINT_FADE_MS = 500
export const HINT_HOLD_MS = 2000          // visible after fadeIn, before fadeOut
export const GAME_REVEAL_MS = 1000
export const CTA_DELAY_MS = 2000

/** Hint fadeOut starts at HINT_FADE_MS + HINT_HOLD_MS = 2500ms */
export const INTERACTIVE_UNLOCK_MS = HINT_FADE_MS + HINT_HOLD_MS + GAME_REVEAL_MS // 3500
```

Timeline:

```
0.0s  hint fadeIn (0.5s)
0.5s  hint hold (2s)
2.5s  hint fadeOut (0.5s) ║ game layer opacity 0→1 (1s)
3.5s  interactive unlock (pin + clicks)
...   pops (any order)
all   popped → 2s → Next visible
```

Implemented via `useEffect` timeouts on `isActive`, reset on deactivate.

### Overlay layout

```
┌─────────────────────────────────────┐
│  BalloonGameBoard (relative)        │
│  ┌───────────────────────────────┐  │
│  │  <p> paragraph (z-0, opacity 1) │
│  └───────────────────────────────┘  │
│  ┌─ 3×3 grid (z-10, absolute inset) │
│  │  each cell: relative             │
│  │    BalloonPopTarget absolute     │
│  │    + fixed random offset         │
│  └──────────────────────────────────│
└─────────────────────────────────────┘
```

Paragraph is a single block centered in the board. Grid covers the same area. Popping removes only the balloon — the grid cell stays in place so remaining balloons do not shift. Text shows through. No text splitting.

### Balloon colors — manual map

`balloonGameLayout.ts` exports a fixed 9-element array, e.g.:

```ts
// row-major 3×3 — no orthogonal duplicates
export const BALLOON_COLORS = [
  'blue', 'red', 'green',
  'yellow', 'pink', 'blue',
  'red', 'green', 'yellow',
] as const
```

Maps to `{ pink, blue, green, yellow, red }_balloon.lottie` imports.

### BalloonPopTarget component

- `DotLottieReact` loop autoplay, no float/spin
- Wrapper: `absolute`, `pointer-events-auto`, generous padding for hit area (~44px min tap)
- `onClick` → callback with cell index
- Balloon unmounts when popped; its grid cell remains in the 3×3 layout (parent tracks `Set<number>`)

Do **not** extend `LottieDecoration`.

### Pin cursor

Apply to game board container when phase === `'interactive'`:

```css
cursor: url('@assets/img/pin.png') <hotspotX> <hotspotY>, pointer;
```

Hotspot tuned to pin tip (manual tweak during impl). Restore default when phase === `'complete'` or `'cta'`.

### Pop SFX — local one-shot

```ts
// playBalloonPopSfx.ts
const POP_SFX = [pop01, pop02, pop03, pop04, pop05]

export function playBalloonPopSfx(isMuted: boolean) {
  if (isMuted) return
  const url = POP_SFX[Math.floor(Math.random() * POP_SFX.length)]
  new Audio(url).play()
}
```

Reads `isMuted` from `useAudio()`. No AudioProvider changes.

### CTA

Reuse visual pattern from `BirthStoryCta` but label **Next** (forward nav semantics per CONTEXT.md). Show only when phase === `'cta'`. No lock animation needed beyond hidden → visible fade.

### Initial copy (`balloonGameCopy.ts`)

```ts
export const HINT_TEXT = 'Pop the balloons!'

export const PARAGRAPH =
  'I hope your day is filled with the love and joy you spread so effortlessly. ' +
  'Your resilience, your intelligence, and your one-of-a-kind energy make you someone truly admirable. ' +
  'May the universe give back twice over all the beauty you carry in your soul. ' +
  'Happy birthday for being exactly who you are.'
```

Developer edits this file freely; spec treats it as the copy source of truth.

### Placeholder slide update

Change label from "Slide 3 — coming soon" to "Slide 4 — coming soon" (or generic "coming soon").

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| 9 simultaneous Lotties heavy on mobile | Static loop only, no float; reduce balloon size on sm if needed |
| Pin cursor unsupported on touch | Larger tap targets; cursor is desktop-only enhancement |
| Random pop order → chaotic partial read | By design; 2s full-text reading window after last pop |
| Paragraph too long for small grid cells | Tune font-size/padding in board; copy editable in constants |
| Offset randomness shifts on re-render | Generate offsets once when slide enters; store in state or `useMemo` with empty deps so pops/phases do not recalculate positions |

### Balloon position offsets (plain-language rule)

**What the user should see:** each balloon sits at a slightly random spot inside its grid cell. When they pop one balloon, the others do **not** jump to new spots.

**When positions are chosen:** once, the first time the Balloon Game Slide appears.

**When positions must NOT change:** after each pop, after phase changes (hint → interactive → CTA), or on any other re-render while the slide is still on screen.

**If the slide appears again:** new random positions are allowed (unlikely in this linear one-time app).

**Implementation note (React):** compute offsets in `useMemo(() => …, [])` or equivalent one-shot initialization when `isActive` becomes true — do not call `Math.random()` inline in JSX on every render.

## Migration Plan

1. Add balloon slide components and registry entry at index 2
2. Placeholder moves to index 3 — no shell logic change beyond registry order
3. Birth story already calls `goToNext()` on final beat — no code change if registry order is correct
4. Update Placeholder copy string

Rollback: revert registry to three slides (remove balloon entry).

## Open Questions

- Pin PNG hotspot coordinates — tune during visual QA
- Final paragraph font-size on 320px — tune during visual QA
- Balloon size relative to cell — tune during visual QA

None block implementation.
