## MODIFIED Requirements

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
- **THEN** the Slideshow navigates to Slide 3 (Balloon Game Slide)
