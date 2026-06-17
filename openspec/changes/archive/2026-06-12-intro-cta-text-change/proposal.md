## Why

The Intro already communicates the fiesta atmosphere through visuals, audio, and copy. "Start the Fiesta" on the CTA feels redundant and sets the wrong expectation for what follows — an interactive story experience rather than kicking off a party. "Continue" better signals progression into the narrative without repeating the theme the user already feels.

## What Changes

- Replace CTA label `Start the Fiesta` with `Continue` when unlocked (t ≥ 52s)
- Replace countdown label `Start the Fiesta... N` with `Continue... N` while blocked
- Update spec requirements and project context docs that reference the old copy

## Capabilities

### New Capabilities

_None — no new capabilities introduced._

### Modified Capabilities

- `intro-slide`: CTA button label text changes from "Start the Fiesta" to "Continue" (countdown and unlocked states)

## Impact

- `src/slides/intro/IntroCta.tsx` — `getCtaLabel` string literals
- `openspec/specs/intro-slide/spec.md` — CTA label scenarios (via delta spec)
- `CONTEXT.md` — CTA description in domain glossary
