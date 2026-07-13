# slide-farewell

## Purpose

Slide 6 of the Slideshow — timed farewell epilogue after Gift catch. Four auto-advanced beats with locked Lottie/copy treatments, then THE END (opacity fade-in) and Watch again via full page reload.

## Requirements

### Requirement: Farewell slide registration

The Slideshow SHALL register a Farewell slide as Slide 6 (index 5) — a timed epilogue that replaces Placeholder. Gift catch Next SHALL navigate to Farewell. The Placeholder slide module SHALL be removed from the registry and deleted from the codebase.

#### Scenario: Registry order includes farewell at index 5

- **WHEN** the Slideshow initializes
- **THEN** the ordered registry is Intro (index 0), Birth Story Slide (index 1), Balloon Game Slide (index 2), Gallery Slide (index 3), Gift catch slide (index 4), Farewell slide (index 5)

#### Scenario: Gift catch navigates to farewell

- **WHEN** the user completes the Gift catch slide and clicks Next
- **THEN** Slide 6 (Farewell) is fully mounted and marked active in the Slideshow state

#### Scenario: Placeholder removed

- **WHEN** Farewell is registered
- **THEN** Placeholder is not in `slideRegistry` and `src/slides/placeholder/` is deleted

### Requirement: Timed beat phase machine

While active, the Farewell slide SHALL advance four beats automatically (`beatIndex` 0–3, human beats 1–4). Each beat SHALL run fade-in for `FADE_IN_MS` (default 1000), hold for `HOLD_MS[beatIndex]` (editable; defaults in `constants.ts`), then fade-out for `FADE_OUT_MS` (default 1000), then advance. After beat 4 (`beatIndex === 3`) fade-out completes, the slide SHALL enter the finale phase and fade in finale content over `FADE_IN_MS`. Timing values SHALL be editable constants in `src/slides/farewell/constants.ts`. Beats SHALL NOT require a CTA or user click to advance. WaveText on beats 1–3 SHALL remain wave-enabled for the full beat (fade-in, hold, and fade-out).

#### Scenario: Beat cycle timing

- **WHEN** `beatIndex` `i` (0–3) is active
- **THEN** that beat fades in over `FADE_IN_MS`, remains fully visible for `HOLD_MS[i]`, fades out over `FADE_OUT_MS`, then the next beat starts (or finale if `i === 3`)

#### Scenario: Finale follows beat 4 fade-out

- **WHEN** beat 4 fade-out completes
- **THEN** the finale phase begins and THE END fades in over `FADE_IN_MS`

#### Scenario: No advance CTA during beats

- **WHEN** any of the four beats is playing
- **THEN** no Next or Continue CTA is shown to advance beats

#### Scenario: Reset on deactivate

- **WHEN** the Farewell slide becomes inactive
- **THEN** phase and `beatIndex` reset so the next activation starts at `beatIndex` 0 (beat 1)

### Requirement: Locked beat copy

The Farewell slide SHALL display the following copy, exported from `farewellCopy.ts`, in order:

1. `Did you enjoy your surprise?` (`beatIndex` 0)
2. `I bet it's the first time you've received a gift like this.` (`beatIndex` 1)
3. `A unique gift for a unique person.` (`beatIndex` 2)
4. `HAPPY BIRTHDAY!` (`beatIndex` 3)

#### Scenario: Copy order

- **WHEN** the four beats play in sequence
- **THEN** each beat shows exactly the corresponding locked string above

### Requirement: Shared beat presentation rules

During beats 1–4 the slide SHALL use `FiestaBackground` (not Intro animated background / rotating decorations / floating particles). Beats SHALL NOT render emojis. Lotties listed per beat SHALL fade in and out with their beat content. Beats 1–3 WaveText SHALL use project display typography: centered `font-display` cream text at Kickoff / Gift catch adjective scale (`text-2xl sm:text-3xl md:text-4xl`). WaveText tunables (`WAVE_AMPLITUDE_PX`, `WAVE_CYCLE_DURATION_S`, `WAVE_LETTER_STAGGER_S`) SHALL live in `farewell/constants.ts`.

#### Scenario: No emojis

- **WHEN** any farewell beat is visible
- **THEN** no emoji glyphs are rendered as beat decoration

#### Scenario: Background

- **WHEN** the Farewell slide is active
- **THEN** the background is `FiestaBackground` without Intro rotating decoration sets

#### Scenario: Beats 1–3 typography

- **WHEN** beats 1–3 render WaveText
- **THEN** the text uses centered `font-display` cream styling at `text-2xl sm:text-3xl md:text-4xl` scale

### Requirement: Beat 1 visuals

Beat 1 (`beatIndex` 0) SHALL show `heart.lottie` above the copy (size `clamp(4rem, 18vw, 7rem)`, loop, gentle float allowed) and render the copy with `WaveText`. Wave animation SHALL run for the full beat (fade-in, hold, and fade-out). No confetti and no second Lottie on beat 1.

#### Scenario: Heart above WaveText

- **WHEN** beat 1 is visible
- **THEN** looping `heart.lottie` appears above the WaveText copy at the locked clamp size and no other beat Lottie is shown

### Requirement: Beat 2 visuals

Beat 2 (`beatIndex` 1) SHALL show `jumping_gift_boxes.lottie` above the copy (size `clamp(5rem, 22vw, 8rem)`, play once on enter, no loop) and `parrot_dancing.lottie` below the copy (size `clamp(4rem, 18vw, 7rem)`, loop), with copy as `WaveText` (wave for the full beat: fade-in, hold, and fade-out).

#### Scenario: Gifts and parrot

- **WHEN** beat 2 is visible
- **THEN** jumping gift boxes appear above the text (play once) and the dancing parrot appears below the text (looping)

### Requirement: Beat 3 twinkle glitter overlay

Beat 3 (`beatIndex` 2) SHALL render copy with `WaveText` and overlay `twinkle_stars_02.lottie` (loop) as a glitter effect on the letters. The text and overlay SHALL share one shrink-wrapping wrapper (`relative`, sized to the text). The overlay SHALL be `position: absolute; inset: 0` on that wrapper, with width and height equal to the text bounding box, a higher stacking order than the text (in front of the glyphs in a 3D sense), `mix-blend-screen`, `pointer-events: none`, and `aria-hidden`. The overlay MUST NOT use fixed rem width/height (e.g. DateBeat’s `w-[12rem] h-[2.5rem]` pattern), MUST NOT be positioned with independent percentage coordinates, and MUST NOT be sized independently of the text box.

#### Scenario: Overlay matches text box

- **WHEN** beat 3 is visible
- **THEN** `twinkle_stars_02` covers exactly the WaveText bounding box via `absolute inset-0` on the text wrapper and sits above the text in z-order

#### Scenario: No DateBeat-style fixed overlay size

- **WHEN** beat 3 glitter is implemented
- **THEN** the overlay does not use a fixed rem width/height independent of the text metrics

### Requirement: Beat 4 climax visuals

Beat 4 (`beatIndex` 3) SHALL render `HAPPY BIRTHDAY!` with `BouncingText` and `colorCycle` enabled (Intro hero bouncing-text behavior) using `font-display` heading scale consistent with Intro. At the **start of beat 4 fade-in**, the slide SHALL play a single one-shot fullscreen burst of `confetti_02.lottie` behind the hero (not the Intro multi-burst schedule). Beat 4 SHALL also show five scatter Lotties — `balloons`, `party_blower`, `bday_cupcake`, `bday_cake`, `party_cups` — each sized `clamp(3.5rem, 14vw, 6rem)`, looping, with gentle float, positioned via editable percentage slots (`leftPercent` / `topPercent`) and fixed `rotateDeg` within ±6°, absolute children inside an inset container (AdjectiveReveal method). Slots SHALL have no random jitter. Scatter Lotties SHALL remain fully inside the inset container, SHALL NOT overlap each other, SHALL NOT overlap the centered hero text bounding box, and SHALL maintain sufficient visual margin between Lottie boxes. The slide MUST NOT use `happy_bday_cake_balloons_flags_.lottie`. The hero text SHALL remain centered and MUST NOT be one of the scatter slot items.

#### Scenario: BouncingText with color cycle

- **WHEN** beat 4 is visible
- **THEN** `HAPPY BIRTHDAY!` uses `BouncingText` with `colorCycle`

#### Scenario: Confetti at fade-in start

- **WHEN** beat 4 fade-in begins
- **THEN** one `confetti_02` fullscreen one-shot burst starts behind the hero and does not follow Intro’s elapsed-time burst schedule

#### Scenario: Five scatter Lotties with editable slots

- **WHEN** beat 4 is visible
- **THEN** the five listed Lotties appear at editable percentage slots with `rotateDeg` in ±6°, gentle float, locked clamp size, and `happy_bday_cake_balloons_flags_` is not used

#### Scenario: Starter slot coordinates

- **WHEN** default décor slots are used
- **THEN** starter positions are balloons (22, 18, −4°), party_blower (78, 22, 5°), bday_cupcake (28, 72, −3°), bday_cake (72, 68, 4°), party_cups (50, 82, −2°) as left%/top%/rotateDeg (manually tunable)

#### Scenario: No overlap and in-container margin

- **WHEN** beat 4 scatter décor is displayed at any supported viewport width
- **THEN** every scatter Lottie stays inside the inset container, no two scatter Lotties overlap, none overlap the hero text, and gaps between Lotties remain visually sufficient

### Requirement: Finale THE END and Watch again

After beat 4 fade-out completes, the Farewell slide SHALL fade in static text `THE END` over `FADE_IN_MS` (opacity only — no WaveText, BouncingText, Lottie, bounce, or scale theatrics). Below it, a discreet text control labeled `Watch again` SHALL call `window.location.reload()` on activate. The finale SHALL NOT show a Next CTA. The slideshow soundtrack MAY continue until reload; no AudioProvider API change is required for Watch again.

#### Scenario: THE END fades in after beat 4

- **WHEN** beat 4 fade-out completes
- **THEN** `THE END` fades in over `FADE_IN_MS` without WaveText, BouncingText, or Lottie

#### Scenario: Watch again reloads

- **WHEN** the user activates Watch again
- **THEN** the browser performs a full page reload

#### Scenario: No Next on finale

- **WHEN** the finale phase is active
- **THEN** no Next CTA is shown
