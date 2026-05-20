# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # next dev — local at http://localhost:3000
npm run build    # next build — required before checking route map / SSG output
npm run start    # serve the production build
npm run lint     # eslint (next/core-web-vitals)
```

There is no test suite. Verification on UI changes is `npm run build` + manual smoke test in `npm run dev` (light + dark, mobile width 375px, keyboard nav, and `prefers-reduced-motion: reduce`).

## High-level architecture

Next.js 15 (App Router) + React 19. Live site: ronialtshuler.com. Deploys from `main` on Vercel. The codebase has been through a multi-phase v2 redesign; the current shape is intentionally **resume-style** — modal-on-click cards + skills grid, no MDX/case-study deep dives.

### Information architecture

Routes: `/`, `/education`, `/work-experience`, `/projects`, `/skills`, `/resume`, `/contact`. Plus API route `/api/github`. Custom `not-found.js` and `error.js`. `template.js` wraps every route in a Framer Motion fade-in for client-side transitions.

[next.config.mjs](next.config.mjs) carries 301 redirects from prior URLs (`/research`, `/experience`, `/build`, `/cv`) so existing inbound links keep resolving. Adding a new top-level route generally means: a folder under `src/app/`, a `layout.js` exporting `metadata` (canonical, OG, title — picked up by the title template in [src/app/layout.js](src/app/layout.js)), a `page.js`, and a Navbar entry in the `NAV_ITEMS` array of [src/components/Navbar.js](src/components/Navbar.js).

### Data flow

Timeline data is the single source of truth — pages render filtered views, never their own hardcoded arrays. To add a job/degree/internship, edit [src/data/research.js](src/data/research.js): each entry has an `area` field (`'education'` or `'work'`), and the page-level helpers `educationEntries()` and `workEntries()` filter by it. Side projects live in [src/data/projects.js](src/data/projects.js) and skills in [src/data/skills.js](src/data/skills.js).

The `/projects` page client-fetches `/api/github` on mount to merge live stars/forks/language into the static defaults; failures are silent (the static defaults render). The home page `<SelectedWork>` and `<SelectedProjects>` blocks reuse those same data files filtered by `FEATURED_WORK_IDS` / by full list.

### Styling: dual system

CSS Modules and Tailwind both work, intentionally. The older route pages (Education, Work Experience, Resume) use CSS Modules; new components (hero, home blocks, magnetic button) use Tailwind. **Tailwind preflight is disabled** in [tailwind.config.js](tailwind.config.js) so it doesn't reset what the CSS Modules established. Don't re-enable preflight — it will visually regress every existing page.

Tailwind colors are mapped to CSS variables (`text-text`, `bg-card`, `border-border`, `text-primary`, etc.) defined in [src/styles/globals.css](src/styles/globals.css). That keeps dark mode working: theme switching just flips the variables on `html[data-theme="dark"]`. The Tailwind `darkMode` config is wired to the same attribute. Anything you build in Tailwind should use these token classes rather than literal Tailwind colors so dark mode keeps working.

[ThemeToggle.js](src/components/ThemeToggle.js) persists choice to `localStorage`; an inline script in [layout.js](src/app/layout.js) reads it pre-paint to avoid a flash. Theme transitions cross-fade colors/borders/shadows site-wide (see the `html[data-theme] *` block in globals.css).

### The Card / Modal pattern

[Card.js](src/components/Card.js) is the timeline primitive used on Education, Work Experience, and the home page's Selected Work. Pass `lead={summary}` to surface a lead paragraph above the bullets, and `disableModal` to make the card static (used on Education and Work Experience — bullets show inline, no click-to-open). The home page's Selected Projects keeps the modal. Card is a client component that uses Framer Motion `whileInView` for one-shot scroll-reveal. [Modal.js](src/components/Modal.js) handles ESC + click-outside + body-scroll-lock.

### Background

[ParticleField.js](src/components/background/ParticleField.js) renders a site-wide interactive node-network canvas fixed at `z-index: -1`. It reads `--particle-color` and `--particle-line-color` from CSS variables, watches `data-theme` via `MutationObserver` for theme switches without remount, falls back to a single static frame under `prefers-reduced-motion: reduce`, and reduces particle count + skips line drawing under 768px. Mounted via [ParticleFieldLoader.js](src/components/background/ParticleFieldLoader.js) with `dynamic(..., { ssr: false })`.

### Motion conventions

Framer Motion is used for the kinetic hero, page transitions, scroll reveals (via Card), magnetic CTAs ([MagneticButton.js](src/components/MagneticButton.js)), and smooth theme toggling. Every motion-using component calls `useReducedMotion()` and degrades to a static/instant variant when the user prefers reduced motion. The site-wide ease is `cubic-bezier(0.16, 1, 0.3, 1)` (Tailwind: `ease-out-expo`). Keep new motion under ~300ms.

### API routes

[/api/github](src/app/api/github/route.js) is a small public-GitHub passthrough with server-side caching. There is no contact-form API — `/contact` is a static card with direct channels (email, LinkedIn, GitHub).

### Analytics

`@vercel/analytics` is mounted in [layout.js](src/app/layout.js). One custom event is wired:
- `resume_download` — fires on the Download PDF click via [ResumeDownloadLink.js](src/components/analytics/ResumeDownloadLink.js).

### Resume PDF

The CV PDF lives at `public/RoniAltshulerCurrent.pdf` (gitignored top-level `*.pdf` excludes other PDFs but this one under `public/` is tracked). `/resume` auto-detects the file at build time via `fs.existsSync` and falls back to a "PDF coming soon" stub if it's missing.

### Path aliases

`@/*` → `src/*` (jsconfig.json). Some older imports still use `../../` relative paths — both work; prefer `@/` for new code.

## Environment variables

No required environment variables. Optional: `GITHUB_TOKEN` raises the unauthenticated rate limit on `/api/github`.
