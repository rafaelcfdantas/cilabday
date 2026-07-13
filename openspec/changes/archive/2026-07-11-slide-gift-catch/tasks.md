## 1. Gift catch data layer

- [x] 1.1 Create `src/slides/gift-catch/constants.ts` with editable tunables (`GIFT_CATCH_TARGET` = 8; `SPAWN_DELAY_MIN_MS` = 500; `SPAWN_DELAY_MAX_MS` = 1000; `FALL_DURATION_MIN_MS` = 1500; `FALL_DURATION_MAX_MS` = 2000; `GIFT_EXIT_FADE_MS`; `ADJECTIVE_STAGGER_MS` = 150; `CTA_DELAY_MS` = 1000; `MIN_TAP_TARGET_PX`; hint timing reuse from balloon). No `MAX_CONCURRENT_GIFTS`.
- [x] 1.2 Create `giftCatchCopy.ts` with `HINT_TEXT`, `GIFT_CATCH_ADJECTIVES` (`Empowering`, `Imparable`, `Brave`, `Carinhosa`, `Graceful`, `Smart`, `Inolvidable`, `Brilliant`), and `GIFT_LOTTIE_POOL` (editable Vite imports; filenames not locked by spec)

## 2. Gift catch UI components

- [x] 2.1 Create `FallingGiftTarget.tsx` — clickable `DotLottieReact` gift (play once) with min tap target, fall animation, catch and miss callbacks
- [x] 2.2 Create `GiftCatchBoard.tsx` — playfield, bare numeric counter (interactive only), renders active falling gifts
- [x] 2.3 Create `AdjectiveReveal.tsx` — floating layout (in-viewport, no overlap), staggered entrance, `WaveText` per adjective, light random tilt
- [x] 2.4 Create `GiftCatchCta.tsx` — shell-level Next button (reuse Balloon Game CTA pattern)

## 3. Gift catch slide logic

- [x] 3.1 Implement `useGiftCatchPhases` (`hint` → `interactive` → `complete` → `cta`; reset on deactivate; `CTA_DELAY_MS` starts at last adjective entrance)
- [x] 3.2 Implement `useGiftSpawn` — immediate first spawn; later spawns use random delay range; active gifts array; catch (increment + unmount); miss (unmount at bottom); stop at target
- [x] 3.3 Implement complete-phase behavior — disable clicks on remaining gifts, fade out, start adjective reveal only after fade completes
- [x] 3.4 Create `GiftCatchSlide` shell — `FiestaBackground`, `SlideHint` with `HINT_TEXT`, board, adjective reveal, CTA, safe-area padding

## 4. Slideshow integration

- [x] 4.1 Register `GiftCatchSlide` at index 4 and `PlaceholderSlide` at index 5 in `slideRegistry`
- [x] 4.2 Verify Gallery final beat → Gift catch hint phase
- [x] 4.3 Verify Gift catch Next → Placeholder Slide 6

## 5. Documentation

- [x] 5.1 Update `CONTEXT.md` — Gift catch slide as Slide 5, fake adjective gimmick, Placeholder as Slide 6, Gallery → Gift catch → Placeholder flow, phase and CTA semantics

## 6. Verification

- [x] 6.1 Manual pass: hint timing, immediate first spawn, spawn/catch/miss loop, bare counter to 8 then hidden, gift fade then adjective stagger + WaveText + tilt, 1s CTA after last adjective, Next → Placeholder
- [x] 6.2 Manual pass: mobile 320px — tap targets, adjectives in-viewport without overlap, spawn/fall density feel
- [x] 6.3 Manual pass: no SFX on catch; Lottie play-once; state resets if slide re-entered (linear app — unlikely)
