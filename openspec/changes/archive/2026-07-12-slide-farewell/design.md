## Context

Gift catch (Slide 5) ends with a Next CTA into Placeholder (Slide 6). Placeholder exists only to keep forward navigation testable while the farewell chapter was undefined. Discovery locked a timed epilogue: four auto-advanced beats (not CTA-driven like Birth Story), then THE END (1s fade-in) + Watch again via full reload.

Prior chapters already establish patterns this design reuses:
- Phase machines with timers (`useBalloonGamePhases`, `useGiftCatchPhases`)
- `WaveText` (Birth / Gift catch), `BouncingText` + `colorCycle` (Intro)
- Scatter `%` slots (`AdjectiveReveal` on Gift catch)
- `FiestaBackground` on narrative/game slides (Intro alone uses `AnimatedFiestaBackground` + rotating decorations)

**Beat numbering:** Human-facing copy says beats **1–4**. Code indexes are **0–3**. Specs use “beat 1…4” in prose and `beatIndex` 0–3 in technical scenarios.

## Goals / Non-Goals

**Goals:**
- Replace Placeholder with Farewell as Slide 6 (index 5); **delete** `src/slides/placeholder/`
- Auto-timed 4-beat epilogue with editable timing constants
- Locked per-beat Lottie treatments (no emojis); beat 4 climaxes with Intro-style text + confetti + scatter décor
- Finale: THE END fades in over 1s after beat 4 fade-out; discreet "Watch again" → `window.location.reload()`
- Update shell registry, Gift catch Next target language, and CONTEXT.md

**Non-Goals:**
- CTA / Continue advance between beats
- Replay via `setCurrentIndex(0)` or AudioProvider changes
- Intro-level atmosphere (`AnimatedFiestaBackground`, `RotatingDecorations`, `FloatingParticles`, continuous confetti schedule)
- Emojis on any beat
- `happy_bday_cake_balloons_flags_.lottie` on beat 4
- Soundtrack fade-out on THE END (slideshow track continues until reload)
- New SFX
- Leaving Placeholder module in the tree after Farewell ships

## Decisions

### 1. Phase machine (not Birth Story beats)

**Choice:** `useFarewellPhases` driven by timeouts: `beats` (`beatIndex` 0–3) → `finale`. Each beat runs fade-in → hold → fade-out using constants, then advances. After beat 4 (`beatIndex === 3`) fade-out, wait then fade in finale over `FADE_IN_MS`.

**Why over CTA-driven:** After four interactive chapters, a passive epilogue is intentional. Matches balloon/gift-catch timer style, not Birth Story.

### 2. Timing constants

| Constant | Default | Notes |
|----------|---------|-------|
| `FADE_IN_MS` | `1000` | All beats **and** finale THE END entrance |
| `FADE_OUT_MS` | `1000` | All beats |
| `HOLD_MS` | `[1500, 3000, 1500, 3000]` | Per `beatIndex` 0–3 |

Editable in `src/slides/farewell/constants.ts`. Spec locks defaults; retuning constants later does not require a new change if behavior stays the same.

Beat duration = `FADE_IN_MS + HOLD_MS[i] + FADE_OUT_MS` → ~4s / 5s / 4s / 5s ≈ 18s, then +1s finale fade-in.

### 3. Copy (locked)

| Beat (human) | `beatIndex` | Copy |
|--------------|-------------|------|
| 1 | 0 | Did you enjoy your surprise? |
| 2 | 1 | I bet it's the first time you've received a gift like this. |
| 3 | 2 | A unique gift for a unique person. |
| 4 | 3 | HAPPY BIRTHDAY! |
| finale | — | THE END |

CTA label: `Watch again` (not Replay). Exported from `farewellCopy.ts`.

### 4. Visual baseline

**Choice:** `FiestaBackground` only. No rotating peripheral sets, no floating particles, no Intro confetti schedule.

### 5. No emojis

Lotties only.

### 6. Typography (project patterns)

| Surface | Pattern |
|---------|---------|
| Beats 1–3 WaveText | `font-display`, centered, cream — Kickoff / Gift catch adjective scale: `text-2xl sm:text-3xl md:text-4xl`, `font-semibold` optional; `max-w` ~md, `text-center` |
| Beat 4 hero | `BouncingText` + `colorCycle` inside `font-display` heading scale like Intro (`text-3xl` … `md:text-5xl` / `lg:text-6xl` as fits) |
| THE END | `font-display`, wide tracking, muted cream (`text-fiesta-cream/50`), no wave/bounce |
| Watch again | Discreet `font-body` / small display, low opacity link-button |

### 7. Lottie sizes (locked clamps)

| Role | Clamp |
|------|-------|
| Beat 1 heart (above text) | `clamp(4rem, 18vw, 7rem)` |
| Beat 2 jumping gifts (above) | `clamp(5rem, 22vw, 8rem)` |
| Beat 2 parrot (below) | `clamp(4rem, 18vw, 7rem)` |
| Beat 4 scatter décor | `clamp(3.5rem, 14vw, 6rem)` |
| Beat 4 confetti | fullscreen layer (~0.7 viewport, same spirit as Intro `CONFETTI_SIZE`) |

### 8. Playback rules (locked)

| Asset | Loop | Notes |
|-------|------|-------|
| `heart` | yes | gentle float OK |
| `jumping_gift_boxes` | **no** | play once on beat enter |
| `parrot_dancing` | yes | |
| `twinkle_stars_02` | yes | |
| Beat 4 scatter (5) | yes | **gentle float yes** (AdjectiveReveal-like) |
| `confetti_02` | **no** | one-shot; unmount after play |

### 9. Beat visuals (locked)

#### Beat 1 (`beatIndex` 0) — heart + WaveText

```
        [heart.lottie]   ← above text, clamp above, float OK
        WaveText copy
```

- Wave active for the full beat (fade-in, hold, fade-out)
- No confetti, no second Lottie

#### Beat 2 (`beatIndex` 1) — gifts above + parrot below

```
     [jumping_gift_boxes]  ← above, play once
           WaveText
       [parrot_dancing]    ← below, loop
```

#### Beat 3 (`beatIndex` 2) — WaveText + twinkle glitter (**anti-DateBeat**)

```
┌─ relative inline-block (shrink-wraps text only) ─────────┐
│  WaveText                          z-index lower         │
│  overlay: absolute inset-0         z-index higher        │
│    DotLottie twinkle_stars_02                            │
│    h-full w-full, mix-blend-screen, pointer-events-none  │
│    aria-hidden                                           │
└──────────────────────────────────────────────────────────┘
```

MUST NOT use DateBeat fixed rem overlay (`w-[12rem] h-[2.5rem]`). Overlay = text bounding box via `inset-0`.

#### Beat 4 (`beatIndex` 3) — climax

**Hero (center, not a scatter slot):** `BouncingText` + `colorCycle`, copy `HAPPY BIRTHDAY!`

**Confetti:** Fire **at the start of beat 4 fade-in** (same moment the beat content begins fading in). Single one-shot `confetti_02`, fullscreen behind hero; not Intro burst schedule; unmount after play.

**Scatter Lotties** (AdjectiveReveal method):
- Five absolute items: `leftPercent`, `topPercent`, `rotateDeg` in **±6°** (fixed per slot in const array — no random jitter each mount)
- Container with real inset (e.g. `inset-6` / `sm:inset-10`)
- Gentle float: **yes**
- **Layout constraints (SHALL):** every Lottie fully inside the inset container; **no overlap** between any two scatter Lotties; **no overlap** with the centered hero text bounding box; **sufficient gap** between Lottie boxes (tune starters / sizes until gaps are clearly readable — prefer ≥ ~8% of container on the nearer axis, or equivalent visual margin)
- Assets only: `balloons`, `party_blower`, `bday_cupcake`, `bday_cake`, `party_cups` — never `happy_bday_cake_balloons_flags_`

| Asset | Starter left% | Starter top% | Starter rotateDeg |
|-------|---------------|--------------|-------------------|
| `balloons` | 22 | 18 | -4 |
| `party_blower` | 78 | 22 | 5 |
| `bday_cupcake` | 28 | 72 | -3 |
| `bday_cake` | 72 | 68 | 4 |
| `party_cups` | 50 | 82 | -2 |

Slots in `farewellDecorSlots.ts` (or `farewellCopy.ts`). Manual tuning expected if overlap appears on a breakpoint.

### 10. Finale — THE END + Watch again

**Sequence:** beat 4 fade-out completes → THE END (+ Watch again) **fade in over `FADE_IN_MS` (1000ms)**.

**THE END:**
- Opacity fade-in only (no WaveText, BouncingText, Lottie, bounce, or scale theatrics)
- `font-display`, wide tracking, muted cream

**Watch again:**
- Discreet control below, label `"Watch again"`
- `window.location.reload()` only (no `goToIndex` / AudioProvider API)

### 11. Registry / navigation

Replace Placeholder at index 5 with Farewell. Gift catch keeps `goToNext()`. **Delete** `src/slides/placeholder/` after registry swap.

### 12. File layout

```
src/slides/farewell/
  FarewellSlide.tsx
  useFarewellPhases.ts
  FarewellBeat.tsx
  FarewellFinale.tsx
  BeatTwinkleText.tsx
  BeatScatterDecor.tsx
  farewellCopy.ts
  farewellDecorSlots.ts
  constants.ts
```

### 13. CONTEXT.md

Farewell glossary (done in propose); keep in sync if finale fade-in / Watch again wording needs a touch-up.

## Risks / Trade-offs

- **[Risk] Twinkle like DateBeat** → Spec forbids fixed rem; tasks verify inset-0
- **[Risk] Beat 4 overlap** → Spec requires no overlap + margin; tune slots/clamps
- **[Risk] Hold too short** → Editable `HOLD_MS`
- **[Risk] Reload heavy** → Accepted v1
- **[Risk] Mobile Lottie density** → Scatter clamp; no hide-on-mobile by default

## Migration Plan

1. Implement Farewell; register at index 5
2. Delete Placeholder from registry and filesystem
3. Manual pass: timings, twinkle, beat 4 layout/overlap, finale fade-in, Watch again reload
4. Rollback: reintroduce Placeholder only if Farewell blocked (unlikely)

## Open Questions

None — ambiguities from review closed (confetti at fade-in start; indexing; delete Placeholder; ±6 rotate; clamps; playback; finale 1s fade-in; typography patterns; no-overlap + margin; float yes). WaveText runs for the full beat (validated).
