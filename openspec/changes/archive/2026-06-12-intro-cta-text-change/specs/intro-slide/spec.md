## MODIFIED Requirements

### Requirement: CTA visible with countdown while blocked

The Intro SHALL display the CTA from the start of the main content phase, blocked until t=52s, showing a countdown of seconds remaining until unlock.

#### Scenario: CTA visible from main phase

- **WHEN** the main content phase is active (t ≥ 3750ms) and the CTA is not yet unlocked
- **THEN** the CTA button is visible (not hidden) in a blocked, non-clickable state

#### Scenario: Countdown label while blocked

- **WHEN** the CTA is blocked and more than 0 seconds remain until t=52000ms
- **THEN** the button label reads `Continue... N` where N is the ceiling of seconds until unlock

#### Scenario: Final label when unlocked

- **WHEN** 52000ms have elapsed since t=0
- **THEN** the button label reads `Continue` without a countdown suffix

#### Scenario: CTA position in content stack

- **WHEN** the CTA is visible during main content
- **THEN** it is centered within the main content column below the hero and subtexts (not fixed to the viewport bottom)
