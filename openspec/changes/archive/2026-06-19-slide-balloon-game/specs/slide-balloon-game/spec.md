## ADDED Requirements

### Requirement: Balloon game slide as Slide 3

The Slideshow SHALL register a Balloon Game Slide as Slide 3 (index 2) — an interactive minigame where the user pops balloons to reveal a hidden English paragraph.

#### Scenario: Slide mounts with hint phase

- **WHEN** the Balloon Game Slide becomes active
- **THEN** the user sees only the hint text "Pop the balloons!" on the Fiesta background, with no balloons or paragraph visible yet

#### Scenario: Hint phase timing

- **WHEN** the Balloon Game Slide becomes active
- **THEN** the hint fades in over 0.5s, remains fully visible for 2s, then fades out over 0.5s (3s total hint phase)

### Requirement: Game layer reveal overlaps hint fade out

The game layer (paragraph + balloon grid) SHALL be mounted from slide enter but hidden at opacity 0 until the hint fade out begins, then fade to opacity 1 over 1s starting at the same moment as hint fade out.

#### Scenario: Overlapping fade timing

- **WHEN** the hint fade out starts at t=2.5s after slide enter
- **THEN** the game layer opacity transition from 0 to 1 begins simultaneously and completes at t=3.5s

#### Scenario: Game layer pre-mounted

- **WHEN** the Balloon Game Slide is active during the hint phase
- **THEN** the paragraph and balloon grid exist in the DOM but are not visible to the user

### Requirement: Paragraph visible underneath balloon overlays

The paragraph SHALL render at full opacity from mount, positioned beneath a 3×3 grid of balloon overlays that visually obscure corresponding regions of the text.

#### Scenario: Text always at opacity 1

- **WHEN** the game layer is visible
- **THEN** the paragraph text is rendered at opacity 1 beneath the balloon grid

#### Scenario: Partial reveal on pop

- **WHEN** the user pops a balloon
- **THEN** the region of paragraph text previously covered by that balloon becomes visible to the user

#### Scenario: Full reveal when all popped

- **WHEN** all 9 balloons have been popped
- **THEN** the entire paragraph is unobstructed and fully readable

### Requirement: Three-by-three balloon grid with manual colors

The Balloon Game Slide SHALL display exactly 9 balloons arranged in a 3×3 CSS grid, one balloon per cell, with manually assigned Lottie colors (pink, blue, green, yellow, red) such that no orthogonally adjacent cells share the same color.

#### Scenario: Balloon count and layout

- **WHEN** the game layer is visible
- **THEN** the user sees 9 clickable balloon Lotties arranged in a 3×3 grid over the paragraph

#### Scenario: Per-cell random offset assigned once

- **WHEN** the Balloon Game Slide appears on screen for the first time
- **THEN** each balloon is placed at a random position within its grid cell

#### Scenario: Balloon positions stay fixed while playing

- **WHEN** the user pops a balloon or the slide moves to another phase (hint → game → CTA)
- **THEN** every remaining balloon stays at the same position — positions are not recalculated after each click or animation step

#### Scenario: Grid cells remain after pop

- **WHEN** the user pops a balloon
- **THEN** that balloon is removed but its grid cell remains in the 3×3 layout so other balloons do not reorder

#### Scenario: New positions only if the slide appears again

- **WHEN** the user leaves the Balloon Game Slide and it appears again later
- **THEN** new random positions may be assigned (in normal use this app is linear and one-time, so this is unlikely)

#### Scenario: Transparent cell backgrounds

- **WHEN** the game layer is visible
- **THEN** grid cells and Lottie backgrounds are transparent so only the balloon artwork obscures text

### Requirement: Pop interaction with random SFX

Each balloon SHALL be poppable by click or tap. Popping removes the balloon from the screen and plays one randomly selected pop SFX from five available variants.

#### Scenario: Balloon disappears on pop

- **WHEN** the user clicks an unpopped balloon during the interactive phase
- **THEN** that balloon is removed from the screen immediately while its grid cell stays in place

#### Scenario: Random pop SFX

- **WHEN** the user pops a balloon and audio is not muted
- **THEN** one of the five balloon pop sound effects plays, chosen at random per pop

#### Scenario: Pop order is free

- **WHEN** the user pops balloons during the interactive phase
- **THEN** balloons may be popped in any order with no enforced sequence

#### Scenario: SFX respects mute

- **WHEN** the user pops a balloon while audio is muted
- **THEN** no pop sound plays

### Requirement: Pin cursor during interactive phase

During the interactive phase (after game layer fade completes until all balloons are popped), the slide SHALL display a pin PNG as the cursor over the game area.

#### Scenario: Pin cursor active

- **WHEN** the interactive phase is active and balloons remain
- **THEN** the cursor over the game area uses the pin PNG with a pointer fallback

#### Scenario: Default cursor restored

- **WHEN** all balloons have been popped
- **THEN** the cursor returns to the system default

### Requirement: Interactive phase unlock timing

Balloon clicks and pin cursor SHALL remain disabled until the game layer opacity fade completes.

#### Scenario: No interaction during hint

- **WHEN** the hint phase is active
- **THEN** balloons are not clickable and the pin cursor is not shown

#### Scenario: Interaction unlocks at fade end

- **WHEN** the game layer opacity reaches 1 at t=3.5s after slide enter
- **THEN** balloon click handlers and pin cursor become active

### Requirement: Next CTA after reading delay

After all balloons are popped, the slide SHALL wait 2 seconds before showing an unlocked **Next** CTA that navigates to Slide 4 (Placeholder).

#### Scenario: CTA hidden during gameplay

- **WHEN** one or more balloons remain unpopped
- **THEN** no Next CTA is visible

#### Scenario: Two-second reading window

- **WHEN** the last balloon is popped
- **THEN** the Next CTA appears after a 2s delay, giving the user time to read the full paragraph

#### Scenario: Next advances slideshow

- **WHEN** the user clicks the unlocked Next CTA
- **THEN** the Slideshow navigates to Slide 4 (Placeholder)

### Requirement: English paragraph copy in constants file

The revealed paragraph SHALL be English-only copy stored in a dedicated constants/copy module so it can be edited without changing component logic.

#### Scenario: Initial placeholder copy

- **WHEN** the paragraph is fully revealed
- **THEN** the user reads English birthday message copy defined in the slide's copy module (editable by developer without UI changes)

### Requirement: Responsive balloon game layout

The Balloon Game Slide SHALL remain functional and readable from 320px mobile through large desktop viewports.

#### Scenario: Mobile viewport

- **WHEN** the viewport width is 320px
- **THEN** the hint, paragraph, balloon grid, and Next CTA render without horizontal overflow or unusably small tap targets

#### Scenario: Desktop viewport

- **WHEN** the viewport width is 1440px or larger
- **THEN** the paragraph and grid scale appropriately within the Fiesta layout
