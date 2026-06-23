# slideshow-shell

## MODIFIED Requirements

### Requirement: Birth story slide as Slide 2

The Slideshow SHALL register a Birth Story Slide as Slide 2 (index 1), replacing the previous Slide 2 Placeholder.

#### Scenario: Registry order after change

- **WHEN** the Slideshow initializes
- **THEN** the ordered registry is Intro (index 0), Birth Story Slide (index 1), Balloon Game Slide (index 2), Gallery Slide (index 3), Placeholder (index 4)

#### Scenario: Intro navigates to birth story

- **WHEN** the user clicks the unlocked Intro CTA
- **THEN** the Slideshow transitions to the Birth Story Slide (index 1)

### Requirement: Balloon game slide as Slide 3

The Slideshow SHALL register a Balloon Game Slide as Slide 3 (index 2), replacing the previous Slide 3 Placeholder.

#### Scenario: Registry order after change

- **WHEN** the Slideshow initializes
- **THEN** the ordered registry is Intro (index 0), Birth Story Slide (index 1), Balloon Game Slide (index 2), Gallery Slide (index 3), Placeholder (index 4)

#### Scenario: Birth story navigates to balloon game

- **WHEN** the user completes the final birth story beat and clicks Continue
- **THEN** the Slideshow transitions to the Balloon Game Slide (index 2)

### Requirement: Smooth slide transitions

The Slideshow SHALL animate transitions between Slides using smooth fade and/or slide motion lasting approximately 600–800ms.

#### Scenario: Intro to birth story transition

- **WHEN** navigation from Slide 1 (Intro) to Slide 2 (Birth Story) is triggered
- **THEN** the Intro exits with a smooth animation before the Birth Story Slide enters

#### Scenario: Birth story to balloon game transition

- **WHEN** navigation from Birth Story Slide to Balloon Game Slide is triggered
- **THEN** the Birth Story Slide exits with a smooth animation before the Balloon Game Slide enters

#### Scenario: Balloon game to gallery transition

- **WHEN** navigation from Balloon Game Slide to Slide 4 Gallery Slide is triggered
- **THEN** the Balloon Game Slide exits with a smooth animation before the Gallery Slide enters

#### Scenario: Gallery to placeholder transition

- **WHEN** navigation from Gallery Slide to Slide 5 Placeholder is triggered
- **THEN** the Gallery Slide exits with a smooth animation before the Placeholder enters

#### Scenario: Wait mode between slides

- **WHEN** a transition from one Slide to the next begins
- **THEN** the outgoing Slide completes its exit animation before the incoming Slide mounts

## REMOVED Requirements

### Requirement: Placeholder slide as Slide 4

**Reason**: Gallery Slide occupies Slide 4 (index 3); Placeholder moves to Slide 5.

**Migration**: Register Gallery Slide at index 3; keep Placeholder at index 4 in `slideRegistry`.

## ADDED Requirements

### Requirement: Gallery slide as Slide 4

The Slideshow SHALL register a Gallery Slide as Slide 4 (index 3).

#### Scenario: Registry order includes gallery at index 3

- **WHEN** the Slideshow initializes
- **THEN** the ordered registry is Intro (index 0), Birth Story Slide (index 1), Balloon Game Slide (index 2), Gallery Slide (index 3), Placeholder (index 4)

#### Scenario: Gallery confirms navigation from balloon game

- **WHEN** the user completes the balloon game and clicks Next
- **THEN** Slide 4 (Gallery Slide) is fully mounted and marked active in the Slideshow state

#### Scenario: Gallery navigates to placeholder

- **WHEN** the user completes the final gallery beat and clicks continue
- **THEN** Slide 5 (Placeholder) is fully mounted and marked active in the Slideshow state

### Requirement: Placeholder slide as Slide 5

The Slideshow SHALL include a minimal Placeholder slide as Slide 5 (index 4) to validate forward navigation after the Gallery chapter while later content is still in progress.

#### Scenario: Placeholder content is minimal

- **WHEN** Slide 5 is active
- **THEN** the user sees only minimal neutral placeholder content indicating the next chapter is coming soon (no narrative story content)

#### Scenario: Placeholder confirms navigation from gallery

- **WHEN** the user completes the Gallery Slide final beat and clicks continue
- **THEN** Slide 5 (Placeholder) is fully mounted and marked active in the Slideshow state

#### Scenario: Slideshow soundtrack starts on birth story enter

- **WHEN** the Birth Story Slide (index 1) enter animation completes
- **THEN** the Slideshow soundtrack begins playing
