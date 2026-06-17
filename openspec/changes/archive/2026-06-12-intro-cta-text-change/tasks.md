## 1. CTA Label Update

- [x] 1.1 In `src/slides/intro/IntroCta.tsx`, replace all `Start the Fiesta` strings in `getCtaLabel` with `Continue` (ready, countdown `Continue... N`, and fallback states)

## 2. Documentation Sync

- [x] 2.1 Update `CONTEXT.md` CTA glossary entry to reference `Continue` and `Continue... N` instead of `Start the Fiesta`

## 3. Verification

- [x] 3.1 Grep repo for remaining `Start the Fiesta` references outside archived changes; confirm none remain in active code or main specs (delta will merge on archive)
- [x] 3.2 Manually verify Intro CTA shows `Continue... N` while blocked and `Continue` when unlocked
