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

- [x] 5. Integration review.
  - Review the result against the approved specification.
  - Run final regression checks at mobile and desktop sizes.
  - Confirm git status and summarize any deferred dependency upgrades.

- [x] 6. Add the Munich-to-Morocco architectural backdrop.
  - Use sourced landmark geometry and scroll progress to transition behind the
    homepage work cards.
  - Tune the mesh, silhouettes, card contrast, mobile layout, and reduced-motion
    behavior to match the warm editorial visual system.
  - Run final lint/build and browser checks, then commit.

- [x] 7. Replace the homepage side image with an interactive proof-card deck.
  - Add four evidence-backed cards and accessible manual navigation.
  - Add a draggable Sentinel-2 to S2DR3 comparison.
  - Verify responsive behavior, keyboard use, lint, and production build.
  - Show the local result before committing or pushing.

- [x] 8. Extend the landmark language into the final homepage sections.
  - Use one canvas from the hero through Contact, morphing Munich into Casablanca
    while adapting the same geometry's color to each section background.
  - Verify section readability, responsive crops, reduced motion, and the
    existing work-section morph.
  - Show the local result before committing or pushing.

- [x] 9. Refresh the PortfolioOS desktop experience.
  - Expand and restyle the desktop shell, menu bar, wallpaper treatment, and
    navigation icons.
  - Add a useful desktop welcome panel backed by current portfolio data.
  - Simplify and restyle windows, mobile navigation, About, Work, Now, and CV.
  - Preserve bounded desktop window dragging and resizing without exposing
    those interactions on mobile.
  - Verify desktop and mobile routes, lint, and production build.
  - Show the local result before committing or pushing.
