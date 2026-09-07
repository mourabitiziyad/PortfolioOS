# Hero Proof Deck

## Overview

Replace the homepage's single decorative side image with a manually controlled
deck of evidence-backed cards. Each card should reveal a distinct part of
Ziyad's work while keeping the current warm editorial and window-inspired
visual language.

## Requirements

- Show four highlights: photovoltaic super-resolution research, the SAP d-com
  Mannheim talk, the IEEE-published ACDSA 2026 research, and DelayBahn's 2M+ trip
  pipeline.
- Make the research comparison a draggable and keyboard-operable before/after
  slider using the original Sentinel-2 and S2DR3 outputs.
- Provide previous/next controls and direct numbered controls for the card deck.
- Do not autoplay; users control when content changes.
- Keep the active card usable at desktop and mobile widths with no horizontal
  overflow and 44px minimum navigation controls.
- Respect reduced-motion preferences.
- Link each card to a relevant public case study or artifact.
- Do not publish internal D-COM slide screenshots or unapproved SAP metrics.
- Keep all work local until the user approves a push.

## Technical design

- Add a client-side `HeroCardDeck` component with local card and comparison state.
- Keep card content in semantic articles with an accessible carousel label and
  live region.
- Render the comparison with two aligned optimized images and a transparent
  native range input over the full visual.
- Use CSS-only transitions and disable them under `prefers-reduced-motion`.

## Verification

- Verify every deck control and the comparison range with mouse and keyboard.
- Check desktop and 390px mobile layouts.
- Run `git diff --check`, lint, and a production build.
