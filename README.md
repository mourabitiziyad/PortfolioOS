# mourabitiziyad.dev

Ziyad Mourabiti's personal site: a content-first portfolio with an optional
Merzouga-inspired desktop experience.

## Routes

- `/` - overview and selected work
- `/work` - featured case studies and project archive
- `/about` - background, journey, and capabilities
- `/now` - current work, research, and interests
- `/desktop/*` - the original PortfolioOS experience

## Development

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
pnpm lint
pnpm build
```

## Content

Shared profile, work, project, capability, and Now data lives in
`lib/portfolio.ts`. Update that file first when the underlying story changes.

The site is built with Next.js App Router, TypeScript, Tailwind CSS, and Framer
Motion. It deploys on Vercel and uses Vercel Analytics.
