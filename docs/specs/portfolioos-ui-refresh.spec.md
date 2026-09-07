# PortfolioOS UI refresh

## Overview

Refresh the optional `/desktop` experience so it feels like a deliberate,
current companion to the public portfolio rather than an older demo. Preserve
the desktop metaphor and Merzouga setting while applying the public site's warm
editorial palette, tighter typography, and current portfolio content.

## Requirements

- Expand the desktop to use the available viewport with a restrained outer
  frame instead of a small monitor floating in empty space.
- Replace the old `Dune` chrome with a clear PortfolioOS identity, a link back
  to the main site, and concise contact destinations.
- Give the desktop root a useful welcome panel with current role, education,
  research, and direct links to Work and CV.
- Restyle desktop icons, windows, title bars, cards, and mobile navigation into
  one consistent warm, high-contrast system.
- Remove unfinished copy, excessive borders, and animation that does not
  improve comprehension. Preserve meaningful desktop behavior: windows can be
  moved by their title bar and resized from a clear corner handle.
- Reuse the shared portfolio data so About, Stack, and Work stay aligned with
  the public site.
- Preserve the Merzouga image credit and accessible labels, focus states, and
  reduced-motion behavior.
- Keep all changes local until the user approves a push.

## Technical design

- Scope new CSS under `.portfolio-os-shell` and dedicated `os-*` classes so the
  public portfolio remains unchanged.
- Keep window drag and resize state bounded to the desktop workspace, with
  stable initial sizing, a minimum usable size, and a reset on narrow screens.
- Use `navigation.tsx` as the single source for desktop labels and destinations.
- Build the desktop home and About, Work, and Now folder views from
  `lib/portfolio.ts` data. Keep the existing Skills route available as a legacy
  deep link while surfacing capabilities inside About.
- Keep the existing `/desktop/*` routes and external redirects intact.

## Responsive and interaction behavior

- Desktop: persistent icon rail, spacious welcome/window surface, compact menu
  bar, and visible wallpaper context.
- Mobile: horizontally scrollable app dock, full-width window, touch-friendly
  targets, and no drag or resize behavior.
- Respect `prefers-reduced-motion` through the existing MotionConfig and CSS.

## Verification

- Check `/desktop`, `/desktop/about`, `/desktop/skills`,
  `/desktop/projects`, and `/desktop/CV` at desktop and narrow widths.
- Verify keyboard-visible focus and navigation labels.
- Run `git diff --check`, lint, and a production build.
- Present the local preview before committing or pushing.
