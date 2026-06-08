## ADDED Requirements

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

### Requirement: Smooth slide transitions

The Slideshow SHALL animate transitions between Slides using smooth fade and/or slide motion lasting approximately 600–800ms.

#### Scenario: Intro to Placeholder transition

- **WHEN** navigation from Slide 1 to Slide 2 is triggered
- **THEN** the Intro exits with a smooth animation before the Placeholder Slide enters

#### Scenario: Wait mode between slides

- **WHEN** a transition from one Slide to the next begins
- **THEN** the outgoing Slide completes its exit animation before the incoming Slide mounts

### Requirement: Placeholder slide for navigation validation

The Slideshow SHALL include a minimal Placeholder slide as Slide 2 to validate navigation and downstream handoff behavior.

#### Scenario: Placeholder content is minimal

- **WHEN** Slide 2 is active
- **THEN** the user sees only minimal neutral placeholder content (no narrative story content)

#### Scenario: Placeholder confirms navigation

- **WHEN** the user arrives at Slide 2 after clicking the Intro CTA
- **THEN** Slide 2 is fully mounted and marked active in the Slideshow state

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
