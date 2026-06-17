## ADDED Requirements

### Requirement: Four-beat interactive birth story

The Birth Story Slide SHALL present a four-beat narrative about Cila's birth, advanced one beat at a time by user interaction.

#### Scenario: Initial beat on slide enter

- **WHEN** the Birth Story Slide becomes active
- **THEN** only beat 0 (date) is visible, the in-slide CTA reads "Continue", and the CTA is soft-locked for 1 second before it becomes clickable

#### Scenario: Beat progression on Continue

- **WHEN** the user clicks Continue before the final beat
- **THEN** the next beat is revealed while previously revealed beats remain visible

#### Scenario: Final beat advances slideshow

- **WHEN** the user clicks Continue on beat 3 (the fourth beat, index 3)
- **THEN** the Slideshow navigates to Slide 3 (Placeholder)

### Requirement: Canonical beat copy in English

The Birth Story Slide SHALL display the following copy across its four beats, in English with a subtle Spanish touch on beat 3 closing.

#### Scenario: Beat 0 date hero

- **WHEN** beat 0 is revealed
- **THEN** the user sees "July 13, 1999" as prominent date typography

#### Scenario: Beat 1 narrative line

- **WHEN** beat 1 is revealed
- **THEN** the user sees "On that day, the world gained someone truly special."

#### Scenario: Beat 2 photo and identity line

- **WHEN** beat 2 is revealed
- **THEN** the user sees the newborn photo in a polaroid-style frame and the line "And that little baby was you, Cila."

#### Scenario: Beat 3 playful closing

- **WHEN** beat 3 is revealed
- **THEN** the user sees "27 years already… time flies, ¿verdad?" with laughing and birthday emoji (😂🎂) below the beat 2 identity line in the right column

### Requirement: Animate.css full-bleed beat entrance

Each newly revealed beat block SHALL enter using Animate.css on a full viewport-width wrapper, with duration controlled by a tunable constant defaulting to 1 second.

#### Scenario: Entrance spans viewport width

- **WHEN** a beat becomes the current revealed beat
- **THEN** its entrance animation is applied to a wrapper that spans the full viewport width (not only the inner content column)

#### Scenario: Alternating entrance directions

- **WHEN** beats 0, 1, 2, or 3 become the current beat
- **THEN** beat 0 and beat 2 (identity block) use `fadeInLeftBig`, and beat 1 and beat 3 (closing) use `fadeInRightBig`

#### Scenario: No pre-animation flash

- **WHEN** a beat becomes the current beat and its entrance has not yet started
- **THEN** that beat's content is hidden until the entrance animation begins

#### Scenario: Entrance duration is tunable

- **WHEN** a developer adjusts the beat entrance duration constant
- **THEN** all beat entrance animations use the new duration without code changes elsewhere

#### Scenario: Default entrance duration

- **WHEN** no override is configured
- **THEN** beat entrance duration is 1 second (`BEAT_ENTER_DURATION_MS = 1000`)

### Requirement: Gentle infinite CSS wave on beat text

Each beat's primary text SHALL use a continuous gentle letter wave after entrance (current beat) or immediately (previously revealed beats), using the CSS letter-span pattern with word-level wrap boundaries.

#### Scenario: Wave starts when entrance ends on current beat

- **WHEN** the current beat's Animate.css entrance animation completes
- **THEN** the wave animation on that beat's text begins immediately with zero additional delay

#### Scenario: Wave is infinite and gentle

- **WHEN** a beat's wave is active
- **THEN** letters animate in a continuous wave with reduced amplitude (`WAVE_AMPLITUDE_PX = 4`) and longer cycle compared to tutorial defaults

#### Scenario: Wave on all visible beats

- **WHEN** multiple beats are visible (current and dimmed previous beats)
- **THEN** the primary copy line(s) for all visible beats use the wave animation simultaneously

#### Scenario: Word-boundary line breaks

- **WHEN** beat text wraps on narrow or constrained widths
- **THEN** line breaks occur only between words, not mid-word

### Requirement: Beat 0 date row with calendar and glitter

Beat 0 SHALL show an inline `calendar_flip` Lottie aligned with the date text, and `twinkle_stars_02` as a glitter effect on the date letters only.

#### Scenario: Calendar inline on date beat

- **WHEN** beat 0 is visible
- **THEN** `calendar_flip` appears inline to the left of "July 13, 1999", vertically aligned with the date typography

#### Scenario: Calendar renders sharply on high-DPI screens

- **WHEN** beat 0 is visible on a retina display
- **THEN** the calendar Lottie uses `devicePixelRatio` in its render config

#### Scenario: Single twinkle on date letters

- **WHEN** beat 0 is visible
- **THEN** only `twinkle_stars_02` decorates the date text as a glitter overlay on the glyphs

#### Scenario: No heart on date beat

- **WHEN** beat 0 is visible
- **THEN** no heart Lottie is displayed

### Requirement: Previous beats dim when advancing

When a new beat is revealed, earlier beat content SHALL remain visible at reduced opacity to preserve narrative context.

#### Scenario: Earlier beats fade back

- **WHEN** the user advances from beat N to beat N+1 (N < 3)
- **THEN** beats 0 through N display at reduced opacity while beat N+1 is at full opacity

### Requirement: Polaroid photo on beat 2

Beat 2 SHALL display `assets/gallery/newborn_cila.png` inside a polaroid-style frame in the left column of the identity block.

#### Scenario: Polaroid visual treatment

- **WHEN** beat 2 is revealed
- **THEN** the photo appears in a white/cream frame with a wider bottom border, slight rotation, and soft drop shadow

#### Scenario: Photo has no caption

- **WHEN** the newborn photo is displayed
- **THEN** there is no caption overlay

#### Scenario: No extra vintage filters

- **WHEN** the newborn photo is displayed
- **THEN** the UI does not add extra vintage filters beyond the asset's existing appearance

### Requirement: Two-column identity block with stack fallback

Beats 2 and 3 SHALL share a two-column layout by default (polaroid left, text right), with a single layout constant to switch to vertical stack without structural refactor.

#### Scenario: Two-column default from sm breakpoint

- **WHEN** beat 2 is revealed on a viewport at or above the `sm` breakpoint and layout mode is `two-column`
- **THEN** the polaroid photo is on the left and the identity text is on the right

#### Scenario: Stack fallback via constant

- **WHEN** layout mode is set to `stack`
- **THEN** the polaroid, identity line, and closing line render in a single vertical column regardless of breakpoint

#### Scenario: Beat 3 below beat 2 text in right column

- **WHEN** beat 3 is revealed in two-column mode
- **THEN** the closing copy and emojis appear below the beat 2 identity line in the right column

#### Scenario: Right column vertical rhythm on desktop

- **WHEN** beat 2 is the current beat in two-column desktop layout
- **THEN** the identity line and cat accent are vertically centered relative to the polaroid height

#### Scenario: Right column distributes on beat 3 desktop

- **WHEN** beat 3 is revealed in two-column desktop layout
- **THEN** identity, closing text, and emojis distribute vertically alongside the polaroid without shifting beats 0–1

### Requirement: Cat accent on identity beat

Beat 2 SHALL display the cat feeling love Lottie to the right of the identity text with a gentle floating animation.

#### Scenario: Cat on the right

- **WHEN** beat 2 is visible
- **THEN** the cat Lottie appears to the right of the identity line

#### Scenario: Cat floats gently

- **WHEN** beat 2 is the current beat
- **THEN** the cat Lottie has a subtle continuous float motion

#### Scenario: No calendar on identity block

- **WHEN** beat 2 or beat 3 is visible
- **THEN** no calendar flip Lottie is displayed in the identity block

#### Scenario: No candles on closing beat

- **WHEN** beat 3 is visible
- **THEN** no birthday candles Lottie is displayed

### Requirement: Beat 3 playful emoji animation

Beat 3 SHALL include a light playful animation on the emoji elements that runs briefly and then stops.

#### Scenario: Emoji bounce is short-lived

- **WHEN** beat 3 becomes the current beat
- **THEN** the emoji animate with a brief bounce and then remain still

### Requirement: Calmer visual atmosphere than Intro

The Birth Story Slide SHALL use Fiesta theming with a calmer atmosphere than the Intro MainPhase.

#### Scenario: No Intro confetti bursts

- **WHEN** the Birth Story Slide is active
- **THEN** fullscreen confetti Lottie bursts are not displayed

#### Scenario: No rotating Lottie decoration sets

- **WHEN** the Birth Story Slide is active
- **THEN** rotating peripheral Lottie decoration sets from the Intro MainPhase are not displayed

#### Scenario: Fiesta background present

- **WHEN** the Birth Story Slide is active
- **THEN** a Fiesta-themed background is visible

### Requirement: Stacked beats without overlap

The Birth Story Slide SHALL render beats 0–1 centered above the identity block; beats 2–3 share the two-column (or stack) block without overlapping each other.

#### Scenario: Beat 0 visible on slide enter

- **WHEN** the Birth Story Slide becomes active
- **THEN** beat 0 date text is visible

#### Scenario: Scroll on small viewports when all beats visible

- **WHEN** all four beats are revealed on a short viewport
- **THEN** content remains readable via vertical scroll without horizontal overflow

#### Scenario: No horizontal overflow during entrance

- **WHEN** a beat plays its Animate.css entrance animation
- **THEN** horizontal overflow is clipped without nested vertical scrollbars on beat wrappers

#### Scenario: Mobile beat 3 vertical distribution

- **WHEN** all four beats are visible below the `sm` breakpoint
- **THEN** beat sections distribute vertically to fill the viewport when possible

#### Scenario: Desktop beat 2–3 stable top alignment

- **WHEN** the user advances from beat 2 to beat 3 at or above the `sm` breakpoint
- **THEN** beats 0, 1, and the polaroid retain their vertical position

### Requirement: Fixed in-slide CTA at viewport bottom

The Birth Story Slide in-slide Continue CTA SHALL remain fixed at the bottom of the viewport across beat changes.

#### Scenario: CTA does not move with beat content

- **WHEN** the user advances between beats
- **THEN** the Continue CTA stays anchored to the viewport bottom

### Requirement: In-slide Continue CTA with soft lock

The Birth Story Slide SHALL provide a "Continue" button to advance beats, with a soft 1-second lock after slide enter and after each beat advance.

#### Scenario: Continue label on story slide

- **WHEN** the Birth Story Slide is active at any beat
- **THEN** the in-slide CTA label reads "Continue"

#### Scenario: CTA locked for 1s after slide enter

- **WHEN** the Birth Story Slide becomes active and beat 0 is shown
- **THEN** the in-slide CTA is non-clickable for 1 second

#### Scenario: CTA locked for 1s after each beat advance

- **WHEN** the user clicks Continue and a new beat is revealed
- **THEN** the in-slide CTA becomes non-clickable for 1 second

#### Scenario: Locked CTA ignores clicks

- **WHEN** the user attempts to click Continue while the soft lock is active
- **THEN** no beat advance or slide navigation occurs

### Requirement: Birth story slide responsive across breakpoints

The Birth Story Slide SHALL adapt layout, typography, photo sizing, and spacing without breaking on small screens.

#### Scenario: Readable on mobile

- **WHEN** the viewport width is 320px
- **THEN** beat text, photo, and Continue CTA remain readable and tappable without horizontal overflow

#### Scenario: Scales on desktop

- **WHEN** the viewport width is 1024px or larger
- **THEN** date hero and content column scale appropriately without clipping

## REMOVED Requirements

### Requirement: Line cascade text animation

**Reason**: Replaced by Animate.css full-bleed entrance + gentle infinite CSS wave on letters.

**Migration**: Remove `LineCascadeText`; implement `WaveText` and Animate.css beat wrappers.

### Requirement: Inline beat-anchored Lottie accents (v1)

**Reason**: v1 scattered Lotties replaced by explicit beat 0 calendar+glitter and beat 2 cat-only rules.

**Migration**: Follow "Beat 0 date row" and "Cat accent on identity beat" requirements.

### Requirement: Wave stops when beat is dimmed

**Reason**: Product decision — wave runs on all visible beats for a cohesive living story stack.

**Migration**: `BeatEntrance` passes wave enabled for non-current revealed beats.
