## Context

The Intro CTA (`IntroCta.tsx`) uses `getCtaLabel` to produce button text in three states: countdown while blocked (`... N` suffix), a brief pre-unlock moment without suffix, and the unlocked ready state. All three currently use "Start the Fiesta" as the base label. The fiesta theme is already conveyed by the Intro's visuals, audio, and hero copy; upcoming slides shift toward an interactive story tone.

## Goals / Non-Goals

**Goals:**

- Change CTA copy to "Continue" (and "Continue... N" during countdown) with no behavioral change to timing, styling, or interaction

**Non-Goals:**

- Changing CTA unlock timing, animations, positioning, or click handler
- Renaming fiesta theme tokens, colors, or other Intro copy
- Translating the label to Spanish

## Decisions

### Use "Continue" for all CTA label states

Replace every `Start the Fiesta` string in `getCtaLabel` with `Continue`. Countdown format stays `Continue... N`.

**Alternatives considered:**

- **"Begin the Story"** — clearer narrative framing but longer; may wrap awkwardly on small screens
- **"Let's Go"** — casual but less precise about progression
- **Keep "Start the Fiesta" on countdown only** — inconsistent; user already experiences the fiesta before the CTA unlocks

**Rationale:** "Continue" is short, universal in English UI, and signals forward motion into the next slide without re-stating the fiesta theme.

### Update CONTEXT.md alongside code

The domain glossary in `CONTEXT.md` documents CTA behavior including the old label. Update it in the same change to keep docs accurate.

## Risks / Trade-offs

- **[Risk] Tests or snapshots assert old copy** → Grep for `Start the Fiesta` before merging; update any assertions found
- **[Trade-off] "Continue" is generic** → Acceptable because the Intro context already sets tone; specificity belongs in story slides
