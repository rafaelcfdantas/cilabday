## MODIFIED Requirements

### Requirement: Gallery slide as Slide 4

The Slideshow SHALL register a Gallery Slide as Slide 4 (index 3).

#### Scenario: Slide mounts with hint phase

- **WHEN** the Gallery Slide becomes active
- **THEN** the user sees only the gallery hint text from `GALLERY_HINT` on the Fiesta background, with no polaroid or gallery buttons visible yet

#### Scenario: Hint phase timing matches balloon game

- **WHEN** the Gallery Slide becomes active
- **THEN** the hint fades in over 0.5s, remains fully visible for 2s, then fades out over 0.5s (3s total hint phase)

#### Scenario: First beat appears on hint fade out

- **WHEN** the hint fade out begins at t=2.5s after slide enter
- **THEN** the first gallery beat (index 0) begins fading in and becomes visible to the user

### Requirement: Final beat navigates to Gift catch slide

The final gallery beat advance action SHALL call `goToNext()` to navigate to the Gift catch slide (Slide 5), not directly to Placeholder.

#### Scenario: Last beat exits to gift catch

- **WHEN** the user completes the seventh gallery beat (index 6) and clicks the advance button
- **THEN** the Slideshow calls `goToNext()` and navigates to Slide 5 (Gift catch slide)

#### Scenario: Non-final beats stay in gallery

- **WHEN** the user advances from a gallery beat before index 6
- **THEN** the Gallery Slide shows the next beat and does not call `goToNext()`
