# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # next dev — local at http://localhost:3000
npm run build        # next build — required before checking route map / SSG output
npm run start        # serve the production build
npm run screenshots  # Playwright capture of every route × {desktop,mobile} × {light,dark} → screenshots/<phase>/
npx eslint src       # lint (the package.json "lint" script is bare `eslint` with no path, which prints help; use this instead)
```

There is no test suite. Verification on UI changes is `npm run build` + `npm run screenshots` + manual smoke test in `npm run dev` (light + dark, mobile width 375px, keyboard nav, and `prefers-reduced-motion: reduce`). `next/image` is strict about string-`src` requiring explicit `width`/`height`: dev throws if you forget, while prod prerender is lenient — always smoke-test in `dev`, not just `build`. **Heads-up:** running `npm run build` while `npm run dev` is up can corrupt the `.next` cache for the dev server — if dev starts serving unstyled HTML or webpack module errors after a build, `rm -rf .next` and restart `npm run dev`.

## High-level architecture

Next.js 15 (App Router) + React 19. Live site: ronialtshuler.com. Deploys from `main` on Vercel. The current visual identity is the **v3 Linear redesign** — anchored to Linear's `DESIGN.md` (cached at [docs/linear-design.md](docs/linear-design.md)) with components in the spirit of the 21st.dev catalog. The shape is intentionally **resume-style** — Linear-themed cards and a bento projects grid; no MDX/case-study deep dives.

### Information architecture

Routes: `/`, `/education`, `/work-experience`, `/projects`, `/skills`, `/contact`. Plus API route `/api/github`. Custom `not-found.js` and `error.js`. `template.js` wraps every route in a Framer Motion fade-in for client-side transitions.

[next.config.mjs](next.config.mjs) carries 301 redirects from prior URLs (`/research`, `/experience`, `/build`, `/cv`) so existing inbound links keep resolving. Adding a new top-level route generally means: a folder under `src/app/`, a `layout.js` exporting `metadata` (canonical, OG, title — picked up by the title template in [src/app/layout.js](src/app/layout.js)), a `page.js`, and a Navbar entry in the `NAV_ITEMS` array of [src/components/Navbar.js](src/components/Navbar.js). There is no `/resume` route (the page and its PDF were removed for privacy).

### Data flow

Timeline data is the single source of truth — pages render filtered views, never their own hardcoded arrays. To add a job/degree/internship, edit [src/data/research.js](src/data/research.js): each entry has an `area` field (`'education'` or `'work'`), and the page-level helpers `educationEntries()` and `workEntries()` filter by it. Side projects live in [src/data/projects.js](src/data/projects.js) and skills in [src/data/skills.js](src/data/skills.js).

The `/projects` page client-fetches `/api/github` on mount to merge live stars/forks/language into the static defaults; failures are silent (the static defaults render). The home page is a single composed flow: `<V3Hero>` → affiliations marquee → about + profile photo → three-card "Pick where to start" teaser linking to /projects, /work-experience, /skills.

### Styling: dual system

CSS Modules and Tailwind both work, intentionally. [Card.module.css](src/styles/Card.module.css) (used by the timeline pages via `Card.js`) and [Navbar.module.css](src/styles/Navbar.module.css) are the remaining CSS Modules; everything else is Tailwind. **Tailwind preflight is disabled** in [tailwind.config.js](tailwind.config.js) so it doesn't reset what the CSS Modules established. Don't re-enable preflight. If you ever pull a shadcn / 21st.dev component via the CLI, audit the diff and revert any preflight reactivation — copy-paste the source instead.

#### Linear-anchored tokens

Colors, type, spacing, radius all derive from Linear's `DESIGN.md` (see [docs/linear-design.md](docs/linear-design.md)). Tokens live as CSS variables in [src/styles/globals.css](src/styles/globals.css). Dark mode = Linear's canonical near-black canvas (#010102) + lavender accent (#5e6ad2). Light mode = invented Linear-inverse (off-white canvas, darkened lavender for contrast). Linear itself is dark-only on marketing; the light theme is a deliberate departure to preserve the existing `ThemeToggle` UX.

| Token group | CSS var pattern | Tailwind class pattern | Notes |
|---|---|---|---|
| Surfaces | `--canvas`, `--surface-1..4` | `bg-canvas`, `bg-surface-1`, `bg-surface-2` | Linear's surface ladder; cards lift to surface-2 on hover |
| Hairlines | `--hairline`, `--hairline-strong`, `--hairline-tertiary` | `border-hairline`, `border-hairline-strong` | 1px borders; never use Tailwind's default border color |
| Ink | `--ink`, `--ink-muted`, `--ink-subtle`, `--ink-tertiary` | `text-ink`, `text-ink-muted`, `text-ink-subtle`, `text-ink-tertiary` | Display + body use `--ink`; secondary copy `--ink-muted`; meta `--ink-subtle` |
| Accent | `--linear-accent`, `--linear-accent-hover`, `--linear-accent-focus` | `text-linear-accent`, `bg-linear-accent`, `border-linear-accent-focus` | Used scarcely per Linear's discipline: brand mark, focus ring, primary CTA, link emphasis |
| Legacy aliases | `--background-color`, `--primary-color`, etc. | `bg-bg`, `text-primary`, `border-border` | Preserved for backward compat — they resolve to the Linear tokens above |

[ThemeToggle.js](src/components/ThemeToggle.js) persists choice to `localStorage`; an inline script in [layout.js](src/app/layout.js) reads it pre-paint to avoid a flash. Theme transitions cross-fade colors/borders/shadows site-wide (see the `html[data-theme] *` block in globals.css).

Fonts are loaded with `next/font/google`: Inter (display + body via the `--font-display` CSS variable) and JetBrains Mono (`--font-mono`). Linear's actual faces are proprietary; Inter is the recommended open-source substitute per Linear's own DESIGN.md note.

#### The Card / Modal pattern

[Card.js](src/components/Card.js) is the timeline primitive used on Education and Work Experience. Pass `lead={summary}` to surface a lead paragraph above the bullets, and `disableModal` to make the card static (bullets show inline, no click-to-open). Both Education and Work Experience currently pass `disableModal`, so [Modal.js](src/components/Modal.js) is effectively unreachable from any route — keep the file (ESC + click-outside + body-scroll-lock are non-trivial), but don't expect to debug a modal in normal usage. Card is a client component that uses Framer Motion `whileInView` for one-shot scroll-reveal.

The Linear re-skin (in [Card.module.css](src/styles/Card.module.css)) replaces the prior glow-on-hover with a hairline-to-accent border swap + surface lift (`surface-1` → `surface-2`). No 3D tilt — Linear's design language doesn't do it. Bullets render with an em-dash in the accent color. Logos still sit on a parchment-tile backplate (now `#f5f6f6` to match Linear's inverse-surface-1 tint).

#### The Linear card primitive — LinearCard

[src/components/cards/LinearCard.js](src/components/cards/LinearCard.js) is the canonical card primitive for Skills, Contact, Projects (via `BentoProjects`), and the home page teaser. It's a thin wrapper around a Tailwind-styled `<div>`/`<a>`: hairline border, surface-1 fill, rounded-lg, optional `whileHover={{ y: -2 }}` lift. Pass `interactive={false}` for static cards (Skills pillars). Compose inside `<FadeUp whileInView>` for entry stagger.

### Background

[V3Background.js](src/components/background/V3Background.js) renders a site-wide fixed div at `z-index: -10` with a 28px dot grid. Per Linear's discipline ("no atmospheric gradients, no spotlight cards"), there is no canvas animation, no particles, no shader. A linear-gradient mask softens the dots toward the bottom of the viewport. Reduced-motion friendly by default (nothing animates).

### Motion conventions

Framer Motion is used for the kinetic hero (`V3Hero`'s rotating focus phrase), page transitions, scroll reveals (via `FadeUp` / `Card`), and the marquee. Every motion-using component calls `useReducedMotion()` and degrades to a static/instant variant when the user prefers reduced motion. The site-wide ease is `cubic-bezier(0.16, 1, 0.3, 1)` (Tailwind: `ease-out-expo`). Keep new motion under ~350ms.

[Reveal.js](src/components/anim/Reveal.js) exports `FadeUp` (block-level fade + 16 px lift) and `TypeIn` (word-by-word stagger that preserves line-wrapping). Both respect `useReducedMotion()`. `FadeUp` defaults to firing on mount; pass `whileInView` to switch it to scroll-trigger (used for staggering Skills pillars and Projects cards, ~60–80 ms apart). Use `FadeUp` for new page titles + intro paragraphs so the whole site has consistent entry motion.

### API routes

[/api/github](src/app/api/github/route.js) is a small public-GitHub passthrough with server-side caching. There is no contact-form API — `/contact` is a static Linear card stack with three channel rows (email, LinkedIn, GitHub).

### Analytics

`@vercel/analytics` is mounted in [layout.js](src/app/layout.js). No custom events currently wired (the resume download event was removed when the resume route was removed for privacy).

### Screenshots & visual verification

[scripts/screenshot.mjs](scripts/screenshot.mjs) drives Playwright Chromium across every route × {desktop 1440×900, mobile 390×844} × {light, dark}. Output goes to `screenshots/<SCREENSHOT_PHASE>/` (gitignored). The script scrolls every page top-to-bottom before capturing so framer-motion `whileInView` reveals fire — otherwise content below the initial 900px viewport would render as `opacity: 0`. Use `SCREENSHOT_PHASE=99-final npm run screenshots` to write to a named bucket. The baseline (pre-v3) lives at `screenshots/00-baseline/` for before/after comparison.

Playwright's bundled Chromium needs `libnspr4`/`libnss3`/`libatk` on Linux; install via `sudo npx playwright install-deps chromium` if `npm run screenshots` fails with a shared-library error.

### Path aliases

`@/*` → `src/*` (jsconfig.json). Some older imports still use `../../` relative paths — both work; prefer `@/` for new code.

## Environment variables

No required environment variables. Optional: `GITHUB_TOKEN` raises the unauthenticated rate limit on `/api/github`.
