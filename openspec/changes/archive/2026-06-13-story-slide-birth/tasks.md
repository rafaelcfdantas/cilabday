## 0. v2 rework — reset impl (keep shell)

- [x] 0.1 Strip v1 UI from birth slide — remove `LineCascadeText`, v1 `BirthStoryContent` Lottie wiring; keep `useBirthStoryBeats`, `birthStoryCopy`, `BirthStoryCta`, `BirthStorySlide` shell, registry
- [x] 0.2 Add `animate.css` dependency and import in app entry

## 1. Animation foundation

- [x] 1.1 Extend `constants.ts` — `BEAT_ENTER_DURATION_MS = 1000`, `WAVE_START_DELAY_MS = 0`, `WAVE_AMPLITUDE_PX`, `WAVE_CYCLE_DURATION_S`, `WAVE_LETTER_STAGGER_S`
- [x] 1.2 Create `WaveText.tsx` — letter spans, CSS keyframes (Madras pattern), infinite loop, tunable amplitude/cycle/stagger; word-boundary wrap; wave active on all visible beats
- [x] 1.3 Create `BeatEntrance.tsx` (or hook) — full-width Animate.css wrapper, `animationend` → enable wave on child text with 0 ms delay

## 2. Beat 0 — date

- [x] 2.1 Create `DateBeat.tsx` — inline flex row: `calendar_flip` + date, vertically aligned
- [x] 2.2 Apply `twinkle_stars_02` as glitter masked/clipped to date glyphs only (no `twinkle_stars_01`)
- [x] 2.3 Wire `WaveText` + full-bleed Animate.css entrance on beat 0 reveal

## 3. Beat 1 — narrative

- [x] 3.1 Create `NarrativeBeat.tsx` — centered, full-bleed entrance, `WaveText`, no Lotties

## 4. Beats 2–3 — identity block

- [x] 4.1 Add `birthStoryLayout.ts` — `BIRTH_PHOTO_LAYOUT: 'two-column' | 'stack'` (default `'two-column'`)
- [x] 4.2 Create `PolaroidPhoto.tsx` — white/cream frame, wide bottom border, ~−3° tilt, soft shadow; optional subtle float
- [x] 4.3 Create `IdentityBlock.tsx` — two-column (`sm+`) or stack per layout constant; photo left, right column stacks identity then closing
- [x] 4.4 Beat 2: identity line + `cat_feeling_love` on **right** with gentle float; **no** calendar, heart, or candles
- [x] 4.5 Beat 3: closing line + emoji brief bounce below identity in right column; **no** candles
- [x] 4.6 `WaveText` on identity and closing lines; wave on all visible beats (current after entrance, previous immediately)

## 5. Orchestration

- [x] 5.1 Rewrite `BirthStoryContent.tsx` — compose `DateBeat`, `NarrativeBeat`, `IdentityBlock`; dim previous beats ~0.55
- [x] 5.2 Delete obsolete files: `LineCascadeText.tsx`, unused `birthStoryLayout` direction map if replaced

## 6. Already done (v1 — do not redo)

- [x] 6.1 Intro CTA `Next` / `Next... N` + `CONTEXT.md`
- [x] 6.2 `slideRegistry` — Birth Story Slide index 1, Placeholder index 2
- [x] 6.3 `SlideshowShell` audio on index 1 + global `AudioControl`
- [x] 6.4 `useBirthStoryBeats` + `BirthStoryCta` soft 1s lock

## 7. Verification

- [x] 7.1 Beat 0: calendar inline left, glitter on letters only, wave gentle + infinite after 1s fadeIn
- [x] 7.2 Beat 1: centered wave after entrance; no stray Lotties
- [x] 7.3 Beat 2–3: polaroid left, texts right, cat right with float, closing below identity, no calendar/candles
- [x] 7.4 Entrance feels full-width; tweak `BEAT_ENTER_DURATION_MS` if needed
- [x] 7.5 Test `BIRTH_PHOTO_LAYOUT = 'stack'` on 320px — one constant flip only
- [x] 7.6 Full flow Intro → 4 beats → Placeholder; CTA lock + audio handoff

## 8. Polish (post-v2 — layout + UX)

- [x] 8.1 Calendar Lottie sharp render (`renderConfig.devicePixelRatio`) at 4em
- [x] 8.2 Beat entrance: no copy flash (`opacity-0` pre-animation); `overflow-x-clip` (no nested scroll / polaroid clip)
- [x] 8.3 Spacing: mobile beat 3 `justify-evenly`; desktop top-aligned beats 2–3; identity right column vertical rhythm
- [x] 8.4 `WaveText` word-boundary wrap; wave on all visible beats (not only current)
- [x] 8.5 Fix desktop layout jump beat 2 → 3 (`justify-evenly` mobile-only on main stack)
