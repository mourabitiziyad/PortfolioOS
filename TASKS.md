# Portfolio Refresh Tasks

- [x] 1. Establish shared portfolio content and the public visual primitives.
  - Add typed profile, proof, case-study, project, capability, and Now data.
  - Add reusable public header, section, link, and card components.
  - Verify lint and build, then commit.

- [x] 2. Build the content-first public experience.
  - Replace the root lock screen with the new landing page.
  - Add `/work`, `/about`, and `/now` routes using the shared content.
  - Keep the existing CV, blog, email, GitHub, and LinkedIn destinations.
  - Verify responsive rendering, lint, and build, then commit.

- [x] 3. Preserve and harden PortfolioOS.
  - Scope the CRT/fixed viewport layout to `/desktop`.
  - Reuse shared project/capability data where practical.
  - Improve mobile navigation, window controls, focus behavior, motion settings,
    and unknown-folder handling.
  - Verify all existing desktop routes, lint, and build, then commit.

- [x] 4. Add discoverability and documentation.
  - Add canonical/Open Graph/Twitter metadata and a generated social card.
  - Add Person JSON-LD, `robots.ts`, and `sitemap.ts`.
  - Replace the starter README with project-specific documentation.
  - Run final lint/build and browser checks, then commit.

- [ ] 5. Integration review.
  - Review the result against the approved specification.
  - Run final regression checks at mobile and desktop sizes.
  - Confirm git status and summarize any deferred dependency upgrades.
