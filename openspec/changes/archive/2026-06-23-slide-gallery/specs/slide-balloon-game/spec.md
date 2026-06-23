# slide-balloon-game

## MODIFIED Requirements

### Requirement: Next CTA after all balloons popped

After all balloons are popped, the slide SHALL wait 2 seconds before showing an unlocked **Next** CTA that navigates to Slide 4 (Gallery Slide).

#### Scenario: CTA appears after delay

- **WHEN** all 9 balloons have been popped
- **THEN** the Next CTA appears after 2 seconds of reading time

#### Scenario: CTA label and style

- **WHEN** the Next CTA is visible and unlocked
- **THEN** the button label reads "Next" with live color, glow, and full interactivity consistent with other slideshow CTAs

#### Scenario: Next navigates to gallery slide

- **WHEN** the user clicks the unlocked Next CTA
- **THEN** the Slideshow navigates to Slide 4 (Gallery Slide)
