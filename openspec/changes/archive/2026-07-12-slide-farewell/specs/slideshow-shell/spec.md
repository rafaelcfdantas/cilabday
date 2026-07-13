## MODIFIED Requirements

### Requirement: Birth story slide as Slide 2

The Slideshow SHALL register a Birth Story Slide as Slide 2 (index 1), replacing the previous Slide 2 Placeholder.

#### Scenario: Registry order after change

- **WHEN** the Slideshow initializes
- **THEN** the ordered registry is Intro (index 0), Birth Story Slide (index 1), Balloon Game Slide (index 2), Gallery Slide (index 3), Gift catch slide (index 4), Farewell slide (index 5)

#### Scenario: Intro navigates to birth story

- **WHEN** the user clicks the unlocked Intro CTA
- **THEN** the Slideshow transitions to the Birth Story Slide (index 1)

### Requirement: Balloon game slide as Slide 3

The Slideshow SHALL register a Balloon Game Slide as Slide 3 (index 2), replacing the previous Slide 3 Placeholder.

#### Scenario: Registry order after change

- **WHEN** the Slideshow initializes
- **THEN** the ordered registry is Intro (index 0), Birth Story Slide (index 1), Balloon Game Slide (index 2), Gallery Slide (index 3), Gift catch slide (index 4), Farewell slide (index 5)

#### Scenario: Birth story navigates to balloon game

- **WHEN** the user completes the final birth story beat and clicks Continue
- **THEN** the Slideshow transitions to the Balloon Game Slide (index 2)

### Requirement: Gallery slide as Slide 4

The Slideshow SHALL register a Gallery Slide as Slide 4 (index 3).

#### Scenario: Registry order includes gallery at index 3

- **WHEN** the Slideshow initializes
- **THEN** the ordered registry is Intro (index 0), Birth Story Slide (index 1), Balloon Game Slide (index 2), Gallery Slide (index 3), Gift catch slide (index 4), Farewell slide (index 5)

#### Scenario: Gallery confirms navigation from balloon game

- **WHEN** the user completes the balloon game and clicks Next
- **THEN** Slide 4 (Gallery Slide) is fully mounted and marked active in the Slideshow state

#### Scenario: Gallery navigates to gift catch slide

- **WHEN** the user completes the final gallery beat and clicks continue
- **THEN** Slide 5 (Gift catch slide) is fully mounted and marked active in the Slideshow state

### Requirement: Gift catch slide as Slide 5

The Slideshow SHALL register a Gift catch slide as Slide 5 (index 4).

#### Scenario: Registry order includes gift catch at index 4

- **WHEN** the Slideshow initializes
- **THEN** the ordered registry is Intro (index 0), Birth Story Slide (index 1), Balloon Game Slide (index 2), Gallery Slide (index 3), Gift catch slide (index 4), Farewell slide (index 5)

#### Scenario: Gift catch confirms navigation from gallery

- **WHEN** the user completes the Gallery Slide final beat and clicks continue
- **THEN** Slide 5 (Gift catch slide) is fully mounted and marked active in the Slideshow state

#### Scenario: Gift catch navigates to farewell

- **WHEN** the user completes the Gift catch slide and clicks Next
- **THEN** Slide 6 (Farewell) is fully mounted and marked active in the Slideshow state

## ADDED Requirements

### Requirement: Farewell slide as Slide 6

The Slideshow SHALL register a Farewell slide as Slide 6 (index 5), replacing Placeholder.

#### Scenario: Registry order includes farewell at index 5

- **WHEN** the Slideshow initializes
- **THEN** the ordered registry ends with Farewell at index 5 (Intro, Birth Story, Balloon Game, Gallery, Gift catch, Farewell)

#### Scenario: Farewell confirms navigation from gift catch

- **WHEN** the user completes the Gift catch slide and clicks Next
- **THEN** Slide 6 (Farewell) is fully mounted and marked active in the Slideshow state

## REMOVED Requirements

### Requirement: Placeholder slide as Slide 6

**Reason**: Farewell slide is the final chapter; Placeholder is no longer needed for forward-navigation validation.

**Migration**: Register Farewell at index 5; remove Placeholder from `slideRegistry`; delete `src/slides/placeholder/`; update CONTEXT.md.
