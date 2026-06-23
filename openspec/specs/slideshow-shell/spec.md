# slideshow-shell

## Purpose

Fullscreen Slideshow container that displays one Slide at a time, supports modular slide registration, smooth transitions, Intro → Birth Story → Balloon Game → Gallery → Placeholder flow, and shell-level audio control.

## Requirements

### Requirement: Fullscreen viewport shell

The Slideshow SHALL occupy the entire browser viewport at all times, with no page scroll or overflow outside the Slide area.

#### Scenario: Viewport fills screen on load

- **WHEN** the application loads on any supported device
- **THEN** the Slideshow shell fills `100dvh` width and height with `overflow-hidden`

#### Scenario: No scroll during slide display

- **WHEN** any Slide is active
- **THEN** the document body does not scroll vertically or horizontally

### Requirement: One Slide visible at a time

The Slideshow SHALL display exactly one Slide at a time within the shell.

#### Scenario: Single active slide

- **WHEN** the Slideshow is running
- **THEN** only the Slide at the current index is visible to the user

#### Scenario: Initial slide is Intro

- **WHEN** the application loads and the user has not yet navigated
- **THEN** Slide 1 (Intro) is the active Slide

### Requirement: Modular slide registry

The system SHALL register Slides via a declarative ordered registry so new Slides can be added without modifying the shell navigation logic.

#### Scenario: Registry defines slide order

- **WHEN** the Slideshow initializes
- **THEN** it reads an ordered list of Slide definitions (id + component) to determine available Slides and their sequence

#### Scenario: Adding a future slide

- **WHEN** a developer adds a new entry to the slide registry
- **THEN** the Slideshow can navigate to that Slide without changing `SlideshowShell` transition logic

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

### Requirement: Global audio mute control

The Slideshow shell SHALL render the audio mute/unmute control once at shell level so it persists across all slides.

#### Scenario: Mute control visible on birth story slide

- **WHEN** the Birth Story Slide is active
- **THEN** the mute/unmute control remains visible and functional

#### Scenario: Mute state persists across navigation

- **WHEN** the user toggles mute on one slide and navigates to another
- **THEN** the mute state is preserved

### Requirement: Slideshow navigation API

The Slideshow provider SHALL expose `currentIndex`, `isTransitioning`, and a `goToNext()` method for programmatic forward navigation.

#### Scenario: CTA triggers forward navigation

- **WHEN** the Intro CTA is clicked and the Slideshow receives a `goToNext()` call
- **THEN** `currentIndex` advances from 0 to 1 and `isTransitioning` reflects the in-flight transition state

#### Scenario: Slide receives active state

- **WHEN** a Slide's index matches `currentIndex` and the transition has completed
- **THEN** that Slide receives `isActive=true`

### Requirement: Responsive shell at all breakpoints

The Slideshow shell SHALL remain functional and visually intact from 320px mobile widths through large desktop viewports.

#### Scenario: Mobile viewport

- **WHEN** the viewport width is 320px
- **THEN** the shell remains fullscreen with no layout breakage or horizontal overflow

#### Scenario: Desktop viewport

- **WHEN** the viewport width is 1440px or larger
- **THEN** the shell remains fullscreen and centered content scales appropriately
