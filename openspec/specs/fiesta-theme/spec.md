# fiesta-theme

## Purpose

Visual system for the Cila birthday Slideshow: Fiesta Mexican party aesthetic, Lottie decorations, performance-conscious confetti bursts, and responsive layout.

## Requirements

### Requirement: Fiesta visual identity

The experience SHALL use a Fiesta theme inspired by traditional Mexican birthday celebrations — vibrant, premium, warm, and NOT cartoonish or childish.

#### Scenario: Vibrant color palette

- **WHEN** any Slide or Intro phase is displayed
- **THEN** the UI uses a vibrant Fiesta color palette (warm corals, golds, magentas, teal accents on rich dark/cream backgrounds)

#### Scenario: Premium aesthetic

- **WHEN** the user views the Intro
- **THEN** the visual presentation feels elegant and festive rather than cluttered or infantile

### Requirement: Fiesta design tokens

The system SHALL define reusable Fiesta design tokens for colors, typography, and glow/shadow effects applied consistently across components.

#### Scenario: Token-based colors

- **WHEN** components render CTA, hero text, or backgrounds
- **THEN** they use shared Fiesta color tokens (e.g., fiesta-coral, fiesta-gold, fiesta-indigo, fiesta-cream)

#### Scenario: Typography hierarchy

- **WHEN** hero and body text render
- **THEN** a display typeface is used for hero headings and a legible sans-serif for body/subtext

### Requirement: Lottie decoration system

The system SHALL render animated decorations from `.lottie` files in `assets/animations/` via `@lottiefiles/dotlottie-react`.

#### Scenario: Lottie wrapper component

- **WHEN** a decoration is placed in any Intro phase
- **THEN** it is rendered through a reusable responsive Lottie wrapper supporting position, size, and entrance delay

#### Scenario: Decorations do not block interaction

- **WHEN** Lottie decorations are displayed
- **THEN** they have `pointer-events: none` and do not intercept taps meant for Kickoff, CTA, or Audio control

#### Scenario: Phase-appropriate decorations

- **WHEN** Kickoff, Prelude, or main content phases are active
- **THEN** thematically appropriate Lottie assets from `assets/animations/` are displayed for that phase

### Requirement: Kickoff festive visuals

The Kickoff phase SHALL display subtle festive decorations around the welcome message.

#### Scenario: Kickoff decorations visible

- **WHEN** the Kickoff phase is active
- **THEN** at least two festive Lottie elements (e.g., garland, balloons) appear at reduced opacity near the edges

### Requirement: Prelude thematic decorations

The Prelude phase SHALL emphasize Mexican fiesta opening atmosphere with centered/top decorations supporting "Preparando la fiesta…".

#### Scenario: Prelude decoration focus

- **WHEN** the Prelude phase is active
- **THEN** thematic decorations (e.g., flag, confetti blower, garland) animate in with staggered entrance

### Requirement: Main phase hero decorations

The main content phase SHALL use rotating peripheral Lottie sets and timed confetti bursts without obscuring the centered hero content.

#### Scenario: Hero-centered layout

- **WHEN** the main content phase is active
- **THEN** birthday-themed Lottie elements frame the hero from the edges (corners and mid-sides) without overlapping the central text block

#### Scenario: Rotating decoration sets

- **WHEN** the main content phase is active
- **THEN** peripheral Lotties rotate through curated sets (~2 visible at a time), cross-fading on an interval

#### Scenario: Expressive hero motion

- **WHEN** the main content phase is active
- **THEN** the hero uses per-letter bounce/color animation and the subtexts use motion and color transitions

### Requirement: Fullscreen confetti bursts

The system SHALL render fullscreen confetti as short one-shot bursts, not as a continuous loop.

#### Scenario: Three bursts per Intro

- **WHEN** the main content phase runs from t=3750ms until 5s before CTA unlock
- **THEN** exactly 3 confetti bursts fire at evenly spaced intervals

#### Scenario: One Lottie at a time

- **WHEN** a confetti burst is active
- **THEN** only one fullscreen confetti Lottie is mounted, playing once (`loop=false`)

#### Scenario: GPU idle between bursts

- **WHEN** no confetti burst is active
- **THEN** the fullscreen confetti component is unmounted (no Lottie renderer in DOM)

#### Scenario: Confetti size

- **WHEN** a confetti burst is active
- **THEN** the animation renders at approximately 70% of the viewport, centered

### Requirement: CTA visual states reflect Fiesta theme

The CTA button SHALL visually distinguish blocked (with countdown) and ready states using Fiesta tokens.

#### Scenario: Blocked CTA appearance

- **WHEN** the CTA is blocked (t < 52000ms)
- **THEN** the button is visible with muted styling, countdown suffix, no hover/glow, and is not clickable

#### Scenario: Ready CTA appearance

- **WHEN** the CTA unlocks at t ≥ 52000ms
- **THEN** the button displays vibrant Fiesta colors, glow, micro-bounce animation, and active hover scaling

### Requirement: Responsive Fiesta layout

All Fiesta visual elements SHALL adapt across mobile, tablet, and desktop breakpoints without layout breakage.

#### Scenario: Reduced decorations on small screens

- **WHEN** the viewport width is below the `sm` breakpoint
- **THEN** lateral decorations are reduced or hidden while keeping 2–3 key decorative elements visible

#### Scenario: Responsive Lottie sizing

- **WHEN** Lottie decorations render on any viewport
- **THEN** their size uses responsive clamp-based scaling (not fixed pixel sizes that overflow small screens)

#### Scenario: Typography scales across breakpoints

- **WHEN** the viewport changes from 320px to 1440px
- **THEN** hero, subtext, and CTA typography scale using responsive size classes without clipping

#### Scenario: Safe area for fixed controls

- **WHEN** the Audio control is displayed on devices with notches or safe areas
- **THEN** the control respects top-right safe-area insets and remains accessible

### Requirement: Background atmosphere

The Slideshow SHALL use an elegant dark radial gradient background with subtle atmospheric detail supporting the Fiesta theme.

#### Scenario: Consistent background

- **WHEN** any Intro phase or Placeholder slide is visible
- **THEN** a premium dark gradient background is present behind all content and decorations
