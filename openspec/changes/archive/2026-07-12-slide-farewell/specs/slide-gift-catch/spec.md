## MODIFIED Requirements

### Requirement: Next CTA after reading delay

After the last adjective entrance begins, the slide SHALL wait `CTA_DELAY_MS` (default 1000ms), then show a shell-level **Next** CTA that navigates to Farewell Slide (Slide 6).

#### Scenario: CTA delay after last adjective entrance

- **WHEN** the eighth adjective (index 7) begins its entrance
- **THEN** the Next CTA becomes visible after `CTA_DELAY_MS` (default 1000ms)

#### Scenario: Next navigates to farewell

- **WHEN** the user clicks Next in the CTA phase
- **THEN** the Slideshow calls `goToNext()` and navigates to Slide 6 (Farewell)

#### Scenario: CTA label

- **WHEN** the Next CTA is visible
- **THEN** the button label reads "Next"
