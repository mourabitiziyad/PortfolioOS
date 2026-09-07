# Section Landmark Continuity

## Overview

Carry the Munich–Morocco landmark language into the homepage's final two
sections without repeating the work-section morph or compromising readability.

## Requirements

- Use one uninterrupted canvas from the hero through “Say hello”; never overlap
  two landmark renderers.
- Morph Munich into Casablanca once across the full homepage story.
- Adapt that same geometry's line color to ink, acid, and warm paper as it crosses
  light, dark, and violet section backgrounds.
- Give each landmark its own crop, scale, and placement so it belongs to the
  section rather than reading as a repeated backdrop.
- Keep the section copy, links, and button fully legible and interactive.
- Preserve reduced-motion behavior and hide decorative labels in these sections.
- Keep the existing work-section scroll morph unchanged.

## Technical design

- Extend `LandmarkMorph` with section-aware color zones.
- Keep one sticky renderer above all homepage section backgrounds and below
  their content so neither the geometry nor its motion ever resets.

## Verification

- Check desktop and 390px mobile layouts.
- Confirm the work-section scroll morph still transitions correctly.
- Run `git diff --check`, lint, and a production build before approval.
