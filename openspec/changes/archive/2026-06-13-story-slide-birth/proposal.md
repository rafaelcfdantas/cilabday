## Why

The Intro establishes the fiesta celebration, but the experience promises an interactive story — Slide 2 is still a neutral placeholder with no narrative. This change delivers the first story chapter (Cila's birth on July 13, 1999) with beat-by-beat interactivity, and renames the Intro CTA to "Next" so it contrasts semantically with the in-slide "Continue" that advances story beats.

## What Changes

- Replace Slide 2 Placeholder with **Birth Story Slide** — first narrative chapter, English copy with subtle Spanish touches
- **Four interactive beats** advanced by an in-slide "Continue" CTA:
  1. Date hero: "July 13, 1999"
  2. Narrative line: "On that day, the world gained someone truly special."
  3. Newborn photo (`assets/gallery/newborn_cila.png`) + "And that little baby was you, Cila."
  4. Playful closing: "27 years already… time flies, ¿verdad?" with light laughing emoji animation
- **Animate.css entrance** (~1s, tunable) on full-viewport beat wrappers; **gentle infinite CSS wave** on beat text (starts immediately when entrance ends); previous beats remain visible at reduced opacity
- **Beat 0:** inline `calendar_flip` + `twinkle_stars_02` glitter on date letters
- **Beats 2–3:** polaroid photo (left) + text column (right); cat Lottie floats on the right of identity line; closing line below identity; two-column with single-constant stack fallback
- **Soft 1s CTA lock** on the in-slide Continue after slide enter and each beat advance — prevents double-click and gives a brief beat-reading window (no countdown label; not audio-synced)
- **Calmer visual tone** than Intro — Fiesta background without heavy confetti/Lottie bursts
- Rename Intro CTA copy from **Continue** to **Next** (and `Next... N` during countdown) — bundled in this change because the distinction only matters once the story slide has its own Continue
- Add **Placeholder Slide 3** for forward navigation validation after the final story beat
- Update `CONTEXT.md` glossary for CTA labels and new story slide terms

## Capabilities

### New Capabilities

- `story-slide-birth`: First narrative Slide — four-beat interactive story, Animate.css entrance + CSS wave text, newborn polaroid on beat 2, in-slide Continue CTA, and transition to Slide 3

### Modified Capabilities

- `intro-slide`: Intro CTA label changes from `Continue` / `Continue... N` to `Next` / `Next... N`
- `slideshow-shell`: Slide registry replaces Slide 2 Placeholder with Birth Story Slide; adds Slide 3 Placeholder; navigation scenarios updated for three-slide flow

## Impact

- **Code:** new `src/slides/story/` (or similar) components; `slideRegistry.ts` updated; `IntroCta.tsx` label strings; optional shared text-reveal component
- **Assets:** `assets/gallery/newborn_cila.png` consumed on beat 3
- **Specs:** delta updates to `intro-slide`, `slideshow-shell`; new `story-slide-birth` capability spec
- **Docs:** `CONTEXT.md` CTA and story slide glossary entries
- **Audio:** no change — Slideshow soundtrack still starts when Slide 2 (Birth Story) becomes active; handoff sequence unchanged
