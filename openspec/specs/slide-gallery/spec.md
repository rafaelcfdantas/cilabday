# slide-gallery

## Purpose

Slide 4 of the Slideshow — meme gallery with configurable hint phase, seven beat-driven polaroids, optional titles and descriptions, and per-beat custom button actions. One gallery item visible at a time; final continue navigates to Placeholder Slide (Slide 5).

## Requirements

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

### Requirement: Configurable gallery hint text

The Gallery Slide hint text SHALL come from `GALLERY_HINT` exported by `galleryCopy.ts` (sourced from the gallery `hint` field in authoring data), not hardcoded in slide or hint components.

#### Scenario: Hint reads from gallery copy

- **WHEN** the Gallery Slide becomes active
- **THEN** `SlideHint` displays the string exported as `GALLERY_HINT` from gallery copy

#### Scenario: Hint text is editable via copy only

- **WHEN** a developer changes the gallery `hint` value in authoring data and updates `galleryCopy.ts`
- **THEN** the Gallery Slide hint displays the new string without editing `SlideHint` or `GallerySlide` component code

### Requirement: Seven sequential gallery beats

The Gallery Slide SHALL present exactly seven gallery items as internal beats, showing one item at a time.

#### Scenario: Single visible beat

- **WHEN** the gallery phase is active at beat index N
- **THEN** only the gallery item at index N is visible; previously viewed items are not shown on screen

#### Scenario: Beat section identity

- **WHEN** beat index N is active
- **THEN** the visible content is wrapped in a section element whose `id` matches the gallery item's canonical id (e.g. `pinata`, `working`, `drunk`, `gym`, `girly_girl`, `sleeping`, `seductive`)

#### Scenario: Beat transition animation

- **WHEN** the user advances from beat N to beat N+1 via a continue action
- **THEN** the current polaroid fades out completely before the next polaroid fades in

### Requirement: Polaroid layout per gallery item

Each gallery beat SHALL display its media inside a polaroid-style frame consistent with the Birth Story Slide newborn photo (cream frame, subtle float when current). Rotation SHALL come from the item's `angle` field in gallery copy (degrees), not a single global tilt.

#### Scenario: Per-item angle from copy

- **WHEN** a gallery beat is active
- **THEN** the polaroid frame is rotated by the item's `angle` value in degrees via CSS (e.g. `pinata` at 3°, `working` at -5°, `drunk` at -2°, `gym` at 2°, `girly_girl` at -3°, `sleeping` at 5°, `seductive` at -1°)

#### Scenario: Optional title and description

- **WHEN** a gallery item defines a title and/or description in copy
- **THEN** the title appears above the polaroid media and the description appears below the media within the polaroid card

#### Scenario: Media types

- **WHEN** a gallery item media type is `gif` or `image`
- **THEN** the polaroid displays the asset in an `<img>` with the provided alt text

#### Scenario: Video media without autoplay

- **WHEN** a gallery item media type is `video`
- **THEN** the polaroid displays a `<video>` with native controls, no autoplay, and the provided alt text applied appropriately for accessibility

### Requirement: Gallery action lock per beat

Each gallery beat SHALL lock button interactions for 2 seconds after the beat becomes active.

#### Scenario: Buttons disabled on beat enter

- **WHEN** a gallery beat becomes active (including beat 0 after hint reveal)
- **THEN** all gallery action buttons are disabled for 2 seconds before becoming clickable

#### Scenario: Lock resets on beat change

- **WHEN** the user advances to a new beat
- **THEN** the 2-second action lock applies again for the new beat

### Requirement: Gallery button layout

Gallery beats SHALL render at least one action button. Layout SHALL adapt to button count.

#### Scenario: Single button full width

- **WHEN** a gallery item has exactly one button
- **THEN** that button spans the full width of the polaroid action area

#### Scenario: Two buttons in two columns

- **WHEN** a gallery item has two buttons
- **THEN** the buttons are displayed side by side in two equal columns within the polaroid action area

### Requirement: Gallery button color hierarchy

Gallery action buttons SHALL use color to distinguish denial actions from primary/continue actions. This applies only to Gallery Slide polaroid action buttons.

#### Scenario: Denial buttons use coral styling

- **WHEN** a gallery action button triggers a dismissible modal (`modal` with `backdrop-and-x`), random SFX (`randomSfx`), or running evasive relocation (`runningButton`)
- **THEN** the enabled button uses Fiesta coral styling (`bg-fiesta-coral` with warm glow)

#### Scenario: Primary buttons use teal styling

- **WHEN** a gallery action button triggers beat advance (`advance`) or confirm-only modal advance (`modal-confirm`)
- **THEN** the enabled button uses Fiesta teal styling (`bg-fiesta-teal` with teal glow)

#### Scenario: Disabled buttons stay hidden during lock

- **WHEN** a gallery action button is disabled during the 2-second action lock
- **THEN** the button is fully hidden (including emoji in label text) and not interactive until the lock clears

### Requirement: Continue button advances beat or slideshow

A gallery button without a custom action (no `description` in source copy) SHALL act as continue: advance to the next beat, or exit the slide on the final beat.

#### Scenario: Continue advances beat

- **WHEN** the user clicks a continue button on beat index less than 6
- **THEN** the Gallery Slide advances to the next beat with fade out then fade in

#### Scenario: Final beat continue exits to placeholder

- **WHEN** the user clicks a continue button on beat index 6 (`seductive`)
- **THEN** the Slideshow calls `goToNext()` and navigates to Slide 5 (Placeholder)

### Requirement: Dismissible modal custom action

Gallery items MAY define a custom button that opens a modal with a message. For `pinata`, `drunk`, and `seductive` denial buttons, the modal SHALL be dismissible via an X control with an accessible close label and via clicking outside the modal (backdrop).

#### Scenario: Modal opens on custom button click

- **WHEN** the user clicks a denial button on `pinata`, `drunk`, or `seductive` after the action lock
- **THEN** a modal displays the configured message text

#### Scenario: Modal dismiss without beat advance

- **WHEN** the user dismisses the modal via X or backdrop on `pinata`, `drunk`, or `seductive`
- **THEN** the modal closes and the user remains on the same gallery beat

### Requirement: Confirm-only modal advances beat

The `gym` gallery item SHALL use a single custom button that opens a modal dismissible only by a confirmation button, which advances to the next beat.

#### Scenario: Gym modal cannot dismiss via backdrop

- **WHEN** the gym beat modal is open
- **THEN** clicking outside the modal does not close it

#### Scenario: Gym confirm advances

- **WHEN** the user clicks the gym modal confirmation button
- **THEN** the modal closes and the Gallery Slide advances to beat index 4 (`girly_girl`)

### Requirement: Random SFX custom action

The `girly_girl` denial button SHALL play a random sound effect from the fart (`fart_01`–`fart_03`) and burp (`burp_01`–`burp_03`) pools on each click, without advancing the beat.

#### Scenario: Random sfx per click

- **WHEN** the user clicks the `girly_girl` denial button after the action lock
- **THEN** one randomly selected fart or burp SFX plays (respecting global mute state)

#### Scenario: Sfx does not advance beat

- **WHEN** the user clicks the `girly_girl` denial button
- **THEN** the gallery beat index does not change

### Requirement: Running evasive button custom action

The `sleeping` beat SHALL include a running button that relocates within a bounded container on hover and click, without overlapping the continue button.

#### Scenario: Button jumps to another flee slot

- **WHEN** the user hovers or clicks the `running_button` on the `sleeping` beat after the action lock
- **THEN** the button moves randomly to one of the other two fixed slots (`top-left` or `top-right` when starting from `bottom-left`)

#### Scenario: Running button does not overlap continue

- **WHEN** the running button is in any flee slot
- **THEN** it does not overlap the continue button's bounding box within the shared action container

#### Scenario: Running beat uses two-column initial layout

- **WHEN** the `sleeping` beat action area renders
- **THEN** the running button starts in the left half and the continue button stays in the right half, matching the two-column layout of other gallery beats with two buttons

#### Scenario: Running button does not advance beat

- **WHEN** the user interacts with the running button
- **THEN** the gallery beat index does not change unless the user clicks the continue button

### Requirement: Canonical gallery copy

Gallery content SHALL be defined in `src/slides/gallery/galleryCopy.ts` with Vite asset imports for all seven items matching the authored gallery JSON. Each item SHALL include a required numeric `angle` field (degrees). Gallery hint text SHALL be exported as `GALLERY_HINT` from the authored `hint` field.

#### Scenario: Canonical hint value

- **WHEN** gallery copy is loaded
- **THEN** `GALLERY_HINT` is `"Cila Core Gallery"` (current authored value)

#### Scenario: Seven items in order

- **WHEN** the Gallery Slide loads copy
- **THEN** the ordered items are `pinata`, `working`, `drunk`, `gym`, `girly_girl`, `sleeping`, `seductive` with media, `angle`, titles, descriptions, and buttons as specified in the gallery authoring document

#### Scenario: Working single continue

- **WHEN** beat `working` is active
- **THEN** the user sees one full-width continue button labeled "I will be richer than Elon Musk!!!"

### Requirement: Gallery slide reset on deactivate

The Gallery Slide SHALL reset hint phase and beat index when it becomes inactive.

#### Scenario: Re-enter starts from hint

- **WHEN** the Gallery Slide becomes active again after having been deactivated
- **THEN** the hint phase runs again and beat index resets to 0

### Requirement: Responsive gallery layout

The Gallery Slide SHALL remain usable from 320px mobile through large desktop viewports.

#### Scenario: Mobile polaroid and buttons

- **WHEN** the viewport width is 320px
- **THEN** the polaroid, media, and buttons fit within the slide without horizontal overflow

#### Scenario: Safe area padding

- **WHEN** the Gallery Slide is active on a device with safe-area insets
- **THEN** bottom content respects safe-area padding consistent with other narrative slides
