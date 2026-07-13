## ADDED Requirements

### Requirement: Gift catch slide as Slide 5

The Slideshow SHALL register a Gift catch slide as Slide 5 (index 4) — an interactive minigame where the user catches falling gift Lotties to reach a target count, then sees eight fixed adjectives revealed as a personal payoff.

#### Scenario: Slide mounts with hint phase

- **WHEN** the Gift catch slide becomes active
- **THEN** the user sees only the hint text from `HINT_TEXT` on the Fiesta background, with no falling gifts, counter, or adjectives visible yet

#### Scenario: Hint phase timing matches balloon game

- **WHEN** the Gift catch slide becomes active
- **THEN** the hint fades in over 0.5s, remains fully visible for 2s, then fades out over 0.5s (3s total hint phase)

### Requirement: Configurable hint text

The Gift catch slide hint text SHALL come from `HINT_TEXT` exported by `giftCatchCopy.ts`, not hardcoded in slide or hint components.

#### Scenario: Hint reads from gift catch copy

- **WHEN** the Gift catch slide becomes active
- **THEN** `SlideHint` displays the string exported as `HINT_TEXT` from gift catch copy

#### Scenario: Initial hint text

- **WHEN** the Gift catch slide becomes active with default copy
- **THEN** the hint reads "Catch the gifts to discover how I see you"

### Requirement: Interactive phase starts after hint

The falling-gift minigame SHALL begin only after the hint phase completes. Gifts SHALL NOT spawn and the counter SHALL NOT be shown during the hint phase.

#### Scenario: No spawn during hint

- **WHEN** the Gift catch slide is in the hint phase
- **THEN** no falling gifts are spawned and the catch counter is not shown

#### Scenario: Interactive unlock after hint

- **WHEN** the hint phase completes
- **THEN** the interactive phase begins, the catch counter becomes visible, and the gift spawn scheduler starts with an immediate first spawn

### Requirement: Falling gift spawn with editable tunables

While `caughtCount < GIFT_CATCH_TARGET` and the slide is in the interactive phase, the slide SHALL spawn falling gifts on a scheduler. Spawn timing, fall duration, and Lottie selection SHALL be driven by editable constants and `giftCatchCopy.ts` — not hardcoded in components.

Default constant values SHALL be:

| Constant | Default |
|----------|---------|
| `SPAWN_DELAY_MIN_MS` | `500` |
| `SPAWN_DELAY_MAX_MS` | `1000` |
| `FALL_DURATION_MIN_MS` | `1500` |
| `FALL_DURATION_MAX_MS` | `2000` |

There SHALL be no concurrent-gift cap constant; density is controlled only by these ranges.

#### Scenario: First spawn is immediate

- **WHEN** the interactive phase begins
- **THEN** the first falling gift spawns immediately with no spawn delay

#### Scenario: Later spawn delay within configured range

- **WHEN** the scheduler enqueues a gift after the first spawn during the interactive phase
- **THEN** the delay before that spawn is a random value between `SPAWN_DELAY_MIN_MS` and `SPAWN_DELAY_MAX_MS` inclusive

#### Scenario: Default spawn delay range

- **WHEN** default constants are used
- **THEN** `SPAWN_DELAY_MIN_MS` is 500 and `SPAWN_DELAY_MAX_MS` is 1000

#### Scenario: Random fall duration within configured range

- **WHEN** a gift spawns
- **THEN** its fall animation duration is a random value between `FALL_DURATION_MIN_MS` and `FALL_DURATION_MAX_MS` inclusive

#### Scenario: Default fall duration range

- **WHEN** default constants are used
- **THEN** `FALL_DURATION_MIN_MS` is 1500 and `FALL_DURATION_MAX_MS` is 2000

#### Scenario: Random Lottie from editable pool

- **WHEN** a gift spawns
- **THEN** its Lottie asset is chosen uniformly at random from `GIFT_LOTTIE_POOL` exported by `giftCatchCopy.ts`

#### Scenario: Lottie plays once

- **WHEN** a falling gift is on screen
- **THEN** its Lottie animation plays once and does not loop

#### Scenario: Random horizontal position

- **WHEN** a gift spawns
- **THEN** it appears at a random horizontal position within the playfield bounds

#### Scenario: Spawn continues until target caught

- **WHEN** `caughtCount` is less than `GIFT_CATCH_TARGET` and the slide remains in the interactive phase
- **THEN** the scheduler continues enqueueing gifts after each spawn delay

### Requirement: Catch interaction increments counter

Tapping or clicking a falling gift during the interactive phase SHALL increment `caughtCount` by one and remove that gift from the screen immediately.

#### Scenario: Counter increments on catch

- **WHEN** the user taps an active falling gift during the interactive phase
- **THEN** `caughtCount` increases by one and that gift is removed from the DOM

#### Scenario: Counter shows bare count during interactive only

- **WHEN** the interactive phase is active
- **THEN** the user sees a numeric catch counter showing only the current `caughtCount` (for example `3`), with no target suffix

#### Scenario: Counter hidden outside interactive

- **WHEN** the slide is in the hint, complete, or cta phase
- **THEN** the catch counter is not shown

#### Scenario: Target count is eight

- **WHEN** default constants are used
- **THEN** `GIFT_CATCH_TARGET` is 8

#### Scenario: Minimum tap target size

- **WHEN** a falling gift is interactive
- **THEN** its clickable area is at least `MIN_TAP_TARGET_PX` in both width and height

### Requirement: Miss removes gift without incrementing counter

A gift that completes its fall to the bottom of the playfield without being caught SHALL be removed from the DOM without incrementing `caughtCount`.

#### Scenario: Gift removed on miss

- **WHEN** a falling gift reaches the bottom of the playfield without being caught
- **THEN** that gift is removed from the screen and `caughtCount` is unchanged

#### Scenario: No fall loop on miss

- **WHEN** a gift reaches the bottom without being caught
- **THEN** the gift does not reset to the top for another fall — it is removed and may be replaced by a later scheduler spawn

### Requirement: No sound effects on catch

The Gift catch slide SHALL NOT play sound effects on catch or miss. Only the global slideshow soundtrack continues (subject to mute).

#### Scenario: Silent catch

- **WHEN** the user catches a gift
- **THEN** no catch SFX plays regardless of mute state

### Requirement: Fake adjective collection with fixed reveal

Gifts SHALL NOT carry real per-gift adjective data. Regardless of which gifts are caught, the slide SHALL always reveal the same eight fixed adjectives from `GIFT_CATCH_ADJECTIVES` in copy order when `caughtCount` reaches `GIFT_CATCH_TARGET`.

#### Scenario: Adjectives are not tied to caught gifts

- **WHEN** the user catches any combination of falling gifts to reach the target
- **THEN** the revealed adjectives are always the eight strings in `GIFT_CATCH_ADJECTIVES` in array order

#### Scenario: Adjective language order and defaults

- **WHEN** default copy is used
- **THEN** `GIFT_CATCH_ADJECTIVES` is exactly, in order: `"Empowering"` (EN), `"Imparable"` (ES), `"Brave"` (EN), `"Carinhosa"` (PT), `"Graceful"` (EN), `"Smart"` (EN), `"Inolvidable"` (ES), `"Brilliant"` (EN)

### Requirement: Complete phase clears gifts then reveals adjectives

When `caughtCount` reaches `GIFT_CATCH_TARGET`, the slide SHALL enter the complete phase: stop spawning, disable interaction on remaining gifts, fade them out over `GIFT_EXIT_FADE_MS`, and only after that fade completes, reveal the adjectives.

#### Scenario: Spawn stops at target

- **WHEN** `caughtCount` reaches `GIFT_CATCH_TARGET`
- **THEN** the spawn scheduler stops and no new gifts appear

#### Scenario: Remaining gifts fade out

- **WHEN** the complete phase begins
- **THEN** any remaining falling gifts lose click interaction and fade out over `GIFT_EXIT_FADE_MS`

#### Scenario: Adjectives appear after gift fade completes

- **WHEN** remaining gifts have finished fading out
- **THEN** adjective reveal begins

### Requirement: Floating adjective reveal with WaveText

The eight adjectives SHALL appear with a floating feel inside the viewport. Layout SHALL keep every adjective fully inside the viewport and SHALL prevent adjectives from overlapping each other. Each adjective SHALL use `WaveText` with wave animation enabled and a light random rotation tilt relative to the others.

#### Scenario: Staggered adjective entrance

- **WHEN** adjectives are revealed
- **THEN** each adjective fades in with a stagger of `ADJECTIVE_STAGGER_MS` between successive items (default 150ms)

#### Scenario: WaveText on each adjective

- **WHEN** an adjective is visible after its entrance
- **THEN** it is rendered with `WaveText` and continuous wave animation enabled

#### Scenario: Light random tilt

- **WHEN** adjectives are displayed
- **THEN** each adjective has a light random rotation tilt, and tilts differ across the set

#### Scenario: In viewport without overlap

- **WHEN** adjectives are displayed at any supported viewport width
- **THEN** every adjective remains fully inside the viewport and no two adjectives overlap

### Requirement: Next CTA after reading delay

After the last adjective entrance begins, the slide SHALL wait `CTA_DELAY_MS` (default 1000ms), then show a shell-level **Next** CTA that navigates to Placeholder Slide (Slide 6).

#### Scenario: CTA delay after last adjective entrance

- **WHEN** the eighth adjective (index 7) begins its entrance
- **THEN** the Next CTA becomes visible after `CTA_DELAY_MS` (default 1000ms)

#### Scenario: Next navigates to placeholder

- **WHEN** the user clicks Next in the CTA phase
- **THEN** the Slideshow calls `goToNext()` and navigates to Slide 6 (Placeholder)

#### Scenario: CTA label

- **WHEN** the Next CTA is visible
- **THEN** the button label reads "Next"

### Requirement: State reset on slide deactivate

When the Gift catch slide becomes inactive, all phase state, active gifts, caught count, and adjective reveal state SHALL reset so a re-entry starts from the hint phase.

#### Scenario: Reset on leave

- **WHEN** the user navigates away from the Gift catch slide
- **THEN** phase, `caughtCount`, active gifts, and adjective visibility reset to initial values on next activation
