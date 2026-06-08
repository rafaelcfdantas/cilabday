# audio-system

## Purpose

Dual-track audio for the birthday Slideshow: Intro soundtrack during Slide 1, Slideshow soundtrack from Slide 2 onward, with mute/unmute control and timed handoff on CTA click.

## Requirements

### Requirement: Dual soundtrack architecture

The system SHALL manage two separate audio tracks: Intro soundtrack (`feliz_cumpleanos.mp3`) and Slideshow soundtrack (`cila_bday.mp3`).

#### Scenario: Intro soundtrack file

- **WHEN** the Intro soundtrack plays
- **THEN** the audio source is `assets/audios/feliz_cumpleanos.mp3`

#### Scenario: Slideshow soundtrack file

- **WHEN** the Slideshow soundtrack plays
- **THEN** the audio source is `assets/audios/cila_bday.mp3`

#### Scenario: Persistent audio elements

- **WHEN** the user navigates between Slides
- **THEN** both audio elements remain mounted and are not recreated on slide change

### Requirement: Intro soundtrack lifecycle

The Intro soundtrack SHALL play from t=0, loop continuously after the first complete cycle (~52s), and fade out on CTA click.

#### Scenario: First play at Kickoff tap

- **WHEN** the user taps during Kickoff (t=0)
- **THEN** the Intro soundtrack begins playing in the same user-gesture handler

#### Scenario: Internal audio delays respected

- **WHEN** the Intro soundtrack plays from the start
- **THEN** the audio file's internal initial silence (~3.75s) and final silence (~3s) are preserved as part of the file playback

#### Scenario: Loop after first cycle

- **WHEN** the first complete loop (~52s) finishes and the user has not clicked the CTA
- **THEN** the Intro soundtrack continues playing in a loop

#### Scenario: Fade out on CTA click

- **WHEN** the user clicks the unlocked CTA
- **THEN** the Intro soundtrack volume fades to zero over approximately 1000ms and playback stops

### Requirement: Slideshow soundtrack start conditions

The Slideshow soundtrack SHALL only begin when Slide 2 is fully active and SHALL start with immediate musical content (no internal delay).

#### Scenario: No playback during Intro

- **WHEN** Slide 1 (Intro) is active or the user is in Kickoff/Prelude/main/CTA phases
- **THEN** the Slideshow soundtrack does not play

#### Scenario: No playback during transition

- **WHEN** a visual transition from Intro to Slide 2 is in progress
- **THEN** the Slideshow soundtrack does not play

#### Scenario: Immediate start when Slide 2 active

- **WHEN** Slide 2 (Placeholder) is fully mounted and marked active after transition completes
- **THEN** the Slideshow soundtrack begins playing immediately from the beginning with no intentional delay

#### Scenario: Persists on future slides

- **WHEN** Slide 2 is active and the user remains in the Slideshow
- **THEN** the Slideshow soundtrack continues playing (looping) as the global slideshow music

### Requirement: Audio handoff sequence on CTA click

The system SHALL orchestrate Intro fade-out, visual transition, and Slideshow soundtrack start in the correct order.

#### Scenario: Parallel fade and transition

- **WHEN** the user clicks the unlocked CTA
- **THEN** the Intro soundtrack fade-out (~1s) and the visual slide transition begin concurrently

#### Scenario: Slideshow audio after slide 2 enter

- **WHEN** the Placeholder Slide enter animation completes
- **THEN** the Slideshow soundtrack starts from time 0 while the Intro soundtrack is silent or stopped

### Requirement: Audio control mute and unmute

The system SHALL provide a fixed Audio control in the top-right corner that toggles mute/unmute for the currently active track.

#### Scenario: Control visible after Kickoff

- **WHEN** t=0 has been reached (after Kickoff tap)
- **THEN** the Audio control is visible in the top-right corner

#### Scenario: Control persists across slides

- **WHEN** the user navigates from Intro to Slide 2 or beyond
- **THEN** the Audio control remains visible in the same fixed position

#### Scenario: Mute active track on Intro

- **WHEN** the user mutes audio while on Slide 1 (Intro)
- **THEN** the Intro soundtrack is silenced

#### Scenario: Mute active track on Slide 2

- **WHEN** the user mutes audio while on Slide 2 or later
- **THEN** the Slideshow soundtrack is silenced

#### Scenario: Unmute restores active track

- **WHEN** the user unmutes while a soundtrack should be playing
- **THEN** the currently active track resumes audible playback

#### Scenario: No volume slider

- **WHEN** the user interacts with the Audio control
- **THEN** only mute/unmute toggle is available (no volume level adjustment)

### Requirement: Browser autoplay policy compliance

The system SHALL not attempt to play audio before a user gesture during Kickoff.

#### Scenario: Silent Kickoff

- **WHEN** the Kickoff phase is displayed and the user has not tapped
- **THEN** neither soundtrack autoplays

#### Scenario: Gesture-unlocked playback

- **WHEN** the user taps during Kickoff
- **THEN** `play()` is invoked on the Intro soundtrack within the tap event handler
