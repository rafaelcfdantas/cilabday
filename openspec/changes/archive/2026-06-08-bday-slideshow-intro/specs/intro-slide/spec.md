## ADDED Requirements

### Requirement: Kickoff phase before t=0

The Intro SHALL begin in a Kickoff phase that requires a user tap before any audio plays or the timeline starts.

#### Scenario: Kickoff displays welcome message

- **WHEN** the Intro Slide loads
- **THEN** the user sees the message "I hope you love this surprise. You're so special!" and the hint "Tap to begin"

#### Scenario: Kickoff has festive visuals

- **WHEN** the Kickoff phase is displayed
- **THEN** festive decorative elements are visible around the message

#### Scenario: No audio before tap

- **WHEN** the user has not yet tapped during Kickoff
- **THEN** no soundtrack plays and elapsed timeline time remains at pre-t=0

#### Scenario: Tap anywhere starts experience

- **WHEN** the user taps anywhere on the Kickoff overlay
- **THEN** the system records t=0, starts the Intro soundtrack, and enters the Prelude phase

### Requirement: Prelude phase synchronized to audio delay

The Intro SHALL display a Prelude phase lasting exactly 3750ms from t=0, synchronized with the Intro soundtrack's internal initial silence.

#### Scenario: Prelude starts with audio

- **WHEN** t=0 is recorded on Kickoff tap
- **THEN** the Intro soundtrack begins playing and the Prelude phase starts simultaneously

#### Scenario: Prelude displays thematic message

- **WHEN** the Prelude phase is active
- **THEN** the user sees animated decorations and the phrase "Preparando la fiesta…"

#### Scenario: No hero during Prelude

- **WHEN** the Prelude phase is active (t < 3750ms)
- **THEN** the birthday hero text ("Happy Birthday, Cila!") is not visible

#### Scenario: Prelude ends at 3750ms

- **WHEN** 3750ms have elapsed since t=0
- **THEN** the Prelude phase ends and the main content phase begins

### Requirement: Main content phase with hero and decorations

After the Prelude, the Intro SHALL reveal hero text and decorations together in a smooth staggered entrance.

#### Scenario: Hero text displayed

- **WHEN** the main content phase is active (t ≥ 3750ms)
- **THEN** the user sees the hero "Happy Birthday, Cila! 🎉"

#### Scenario: Subtext displayed

- **WHEN** the main content phase is active
- **THEN** the user sees the subtext "A little birthday surprise made especially for you."

#### Scenario: Spanish touch in subtext area

- **WHEN** the main content phase is active
- **THEN** the user sees "¡Feliz cumpleaños!" in smaller typography below the subtext

#### Scenario: Continuous festive animations

- **WHEN** the main content phase is active
- **THEN** the user sees bouncing hero letters, color-cycling text, floating peripheral Lotties, CSS particles, and an animated Fiesta background

#### Scenario: Confetti bursts without continuous GPU load

- **WHEN** the main content phase is active
- **THEN** fullscreen confetti plays as 3 one-shot Lottie bursts (not looped), alternating assets, at ~70% viewport size, with the component unmounted between bursts

### Requirement: CTA visible with countdown while blocked

The Intro SHALL display the CTA from the start of the main content phase, blocked until t=52s, showing a countdown of seconds remaining until unlock.

#### Scenario: CTA visible from main phase

- **WHEN** the main content phase is active (t ≥ 3750ms) and the CTA is not yet unlocked
- **THEN** the CTA button is visible (not hidden) in a blocked, non-clickable state

#### Scenario: Countdown label while blocked

- **WHEN** the CTA is blocked and more than 0 seconds remain until t=52000ms
- **THEN** the button label reads `Start the Fiesta... N` where N is the ceiling of seconds until unlock

#### Scenario: Final label when unlocked

- **WHEN** 52000ms have elapsed since t=0
- **THEN** the button label reads `Start the Fiesta` without a countdown suffix

#### Scenario: CTA position in content stack

- **WHEN** the CTA is visible during main content
- **THEN** it is centered within the main content column below the hero and subtexts (not fixed to the viewport bottom)

### Requirement: CTA locked emphasis at t=50s

The Intro SHALL reinforce the locked CTA appearance when entering the cta-locked phase at t=50s.

#### Scenario: Increased opacity at t=50s

- **WHEN** 50000ms have elapsed since t=0
- **THEN** the blocked CTA increases visibility (higher opacity) while remaining non-clickable and showing the countdown

#### Scenario: CTA unlocks at t=52s

- **WHEN** 52000ms have elapsed since t=0
- **THEN** the CTA becomes clickable with vibrant color, glow, micro-bounce, and active hover states

#### Scenario: Audio loops while CTA waits

- **WHEN** t ≥ 52000ms and the user has not clicked the CTA
- **THEN** the Intro soundtrack continues looping

### Requirement: CTA click triggers slide transition

Clicking the unlocked CTA SHALL initiate the transition from Intro to Slide 2.

#### Scenario: CTA click advances slideshow

- **WHEN** the user clicks the CTA while it is in the unlocked (ready) state
- **THEN** the Slideshow begins transitioning to Slide 2 (Placeholder)

#### Scenario: Locked CTA ignores clicks

- **WHEN** the user attempts to click the CTA while it is in the locked state (t < 52000ms)
- **THEN** no navigation occurs

### Requirement: Intro timeline driven by t=0

The Intro phase state machine SHALL compute elapsed time as `now - t0` where `t0` is set on Kickoff tap, not primarily from audio `currentTime`.

#### Scenario: Phase transitions use elapsed time

- **WHEN** the Intro timeline updates
- **THEN** phase transitions (Prelude → main → CTA locked → CTA ready) are determined by elapsed milliseconds since t=0

### Requirement: Intro responsive across breakpoints

All Intro phases (Kickoff, Prelude, main content, CTA) SHALL adapt layout, typography, spacing, and animations without breaking on small screens.

#### Scenario: Kickoff readable on mobile

- **WHEN** the viewport width is 375px during Kickoff
- **THEN** welcome message and hint remain readable with adequate touch target for tap-anywhere

#### Scenario: Hero scales on desktop

- **WHEN** the viewport width is 1024px or larger during main content
- **THEN** hero typography scales up appropriately without clipping or overflow

#### Scenario: CTA usable on mobile

- **WHEN** the CTA is visible on a 320px viewport
- **THEN** the button remains tappable with minimum 44px touch target and does not overflow horizontally
