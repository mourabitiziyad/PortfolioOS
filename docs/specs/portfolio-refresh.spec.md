# Portfolio Refresh Specification

## Overview

Refresh mourabitiziyad.dev into a content-first personal site that communicates
Ziyad's current work and strongest evidence immediately, while preserving the
Merzouga-inspired PortfolioOS as an optional, memorable alternate experience.

The primary audience is hiring managers and technical peers. SAP material must
remain public-safe and avoid invented scale or outcome claims. Public research
and project evidence may be linked directly.

## Goals

- Explain who Ziyad is, what he builds, and why his work matters above the fold.
- Lead with evidence from SAP platform work, the TUM photovoltaic research, and
  selected product projects.
- Preserve the existing `/desktop` experience and its bookmarked routes.
- Make the primary site semantic, responsive, indexable, and keyboard friendly.
- Establish one typed content source that both experiences can reuse.

## Non-goals

- No Next.js, React, Framer Motion, or Tailwind major-version migration.
- No invented SAP metrics, confidential details, testimonials, or project art.
- No CMS, contact form, analytics migration, or blog rebuild.
- No removal of the existing PortfolioOS routes.

## Experience

### Public site

The root route becomes a server-rendered editorial landing page with:

1. A compact sticky header linking to Work, About, Now, CV, contact, and
   `Open PortfolioOS`.
2. A hero with the positioning: reliable, data-intensive products spanning
   enterprise platforms and applied AI.
3. A proof strip for SAP Built-In Support, TUM MSc 2025, and ACDSA 2026.
4. Two featured stories:
   - SAP Built-In Support: end-to-end ownership, planning, secure-by-design
     implementation, reliability, and maintainability.
   - Photovoltaic super-resolution research: problem, approach, public
     artifacts, conference outcome, and verified research results.
5. A selected-work archive for DelayBahn, Plato 2.0, NoMaze, Jury, and the chess
   engine, emphasizing contribution and evidence rather than a skills list.
6. An About section covering Morocco, teaching, TUM, SAP, and personal interests.
7. A dated Now section that is easy to update.
8. A direct email call-to-action and footer with social links and photo credit.

Add standalone `/work`, `/about`, and `/now` routes so important content has
shareable, indexable destinations. The root page may preview those sections.

### Visual direction

- Keep Merzouga imagery, warm sand tones, sunset orange, and the violet accent.
- Use an editorial layout with large display type, generous spacing, fine rules,
  and restrained window/terminal details.
- Treat PortfolioOS as a secondary mode/easter egg rather than the navigation
  requirement.
- Use native document scrolling on the public site.
- On narrow screens, stack content and keep controls at least 44px tall.
- Let a restrained architectural line study move behind the work cards,
  transitioning with scroll from Munich's Frauenkirche to Casablanca's Hassan
  II Mosque. It should feel atmospheric rather than like a separate 3D viewer,
  preserve card readability, and fall back to a static state for reduced motion.

### PortfolioOS compatibility

- Move the CRT wrapper and fixed viewport behavior from the global layout into
  `/desktop` only.
- Keep `/desktop/about`, `/desktop/skills`, `/desktop/projects`, `/desktop/CV`,
  and `/desktop/blog` working.
- Hide the desktop icon rail from assistive technology and view on narrow
  screens when the mobile menu is present.
- Give the functional window close control an accessible name and make the
  other traffic-light dots decorative.
- Return a real 404 for unknown desktop folders.

## Content model

Create typed shared data for profile facts, proof points, featured work, selected
projects, capabilities, social links, and current-status entries. Existing
desktop views should consume the shared project and capability data where
practical so the two experiences do not drift.

## SEO and discoverability

- Set `metadataBase`, title template, canonical URL, Open Graph, and Twitter
  metadata.
- Add a generated social card consistent with the new visual system.
- Add `robots.ts` and `sitemap.ts` for public routes.
- Include Person JSON-LD on the root page.
- Keep the CV as a direct PDF link, but do not make the PDF the only indexable
  description of experience.

## Accessibility

- Use landmarks, one clear page heading, a skip link, visible focus styles, and
  meaningful link names.
- Respect `prefers-reduced-motion`.
- Mark decorative imagery appropriately and keep the image credit available.
- Ensure color contrast and readable body sizing.
- Avoid drag, hidden-scrollbar, or PDF-only interactions on the public site.

## Affected areas

- `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- New public route files under `app/about`, `app/work`, and `app/now`
- `app/desktop/layout.tsx` and desktop accessibility/routing components
- New shared content and public-site components
- Metadata, Open Graph image, robots, sitemap, README

## Edge cases

- Mobile widths from 320px must not horizontally scroll or obscure content.
- Long project titles and multiple artifact links must wrap cleanly.
- External links must identify that they leave the site where useful.
- The public site must remain useful with JavaScript unavailable.
- Motion reduction must not hide content or prevent navigation.
- Existing CV and conference PDF URLs must remain stable.

## Verification

- `pnpm build` completes with no new warnings or type errors.
- `pnpm lint` completes; fix the existing folder hook dependency warning.
- Check `/`, `/work`, `/about`, `/now`, and existing `/desktop/*` routes.
- Verify desktop and mobile layouts at 390px and 1280px in the browser.
- Verify keyboard navigation, focus visibility, reduced-motion CSS, link targets,
  canonical metadata, JSON-LD, robots, sitemap, and real 404 behavior.
- Confirm the worktree contains no unrelated changes.
