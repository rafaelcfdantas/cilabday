## ADDED Requirements

### Requirement: Birth story slide as Slide 2

The Slideshow SHALL register a Birth Story Slide as Slide 2 (index 1), replacing the previous Slide 2 Placeholder.

#### Scenario: Registry order after change

- **WHEN** the Slideshow initializes
- **THEN** the ordered registry is Intro (index 0), Birth Story Slide (index 1), Placeholder (index 2)

#### Scenario: Intro navigates to birth story

- **WHEN** the user clicks the unlocked Intro CTA
- **THEN** the Slideshow transitions to the Birth Story Slide (index 1)

### Requirement: Placeholder slide as Slide 3

The Slideshow SHALL include a minimal Placeholder slide as Slide 3 (index 2) to validate forward navigation after the birth story chapter.

#### Scenario: Placeholder content is minimal

- **WHEN** Slide 3 is active
- **THEN** the user sees only minimal neutral placeholder content indicating Slide 3 is coming soon (no narrative story content)

#### Scenario: Placeholder confirms navigation from birth story

- **WHEN** the user completes the final birth story beat and clicks Continue
- **THEN** Slide 3 is fully mounted and marked active in the Slideshow state

#### Scenario: Slideshow soundtrack starts on birth story enter

- **WHEN** the Birth Story Slide (index 1) enter animation completes
- **THEN** the Slideshow soundtrack begins playing

### Requirement: Smooth transitions include birth story

The Slideshow SHALL animate transitions into and out of the Birth Story Slide using the same smooth fade/slide motion as other Slides (~600–800ms).

#### Scenario: Intro to birth story transition

- **WHEN** navigation from Intro to Birth Story Slide is triggered
- **THEN** the Intro exits with a smooth animation before the Birth Story Slide enters

#### Scenario: Birth story to placeholder transition

- **WHEN** navigation from Birth Story Slide to Slide 3 Placeholder is triggered
- **THEN** the Birth Story Slide exits with a smooth animation before the Placeholder enters

## REMOVED Requirements

### Requirement: Placeholder slide for navigation validation

**Reason**: Slide 2 is now the Birth Story Slide; Placeholder moves to Slide 3 with updated scenarios above.

**Migration**: Forward navigation after Intro now lands on Birth Story Slide; Placeholder validates navigation from birth story chapter onward.

## MODIFIED Requirements

### Requirement: Smooth slide transitions

The Slideshow SHALL animate transitions between Slides using smooth fade and/or slide motion lasting approximately 600–800ms.

#### Scenario: Intro to Placeholder transition

- **WHEN** navigation from Slide 1 (Intro) to Slide 2 (Birth Story) is triggered
- **THEN** the Intro exits with a smooth animation before the Birth Story Slide enters

#### Scenario: Wait mode between slides

- **WHEN** a transition from one Slide to the next begins
- **THEN** the outgoing Slide completes its exit animation before the incoming Slide mounts

### Requirement: Global audio mute control

The Slideshow shell SHALL render the audio mute/unmute control once at shell level so it persists across all slides.

#### Scenario: Mute control visible on birth story slide

- **WHEN** the Birth Story Slide is active
- **THEN** the mute/unmute control remains visible and functional

#### Scenario: Mute state persists across navigation

- **WHEN** the user toggles mute on one slide and navigates to another
- **THEN** the mute state is preserved
