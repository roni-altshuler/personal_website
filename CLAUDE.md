# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # next dev — local at http://localhost:3000
npm run build        # next build — required before checking route map / SSG output
npm run start        # serve the production build
npx eslint src       # lint (the package.json "lint" script is bare `eslint` with no path, which prints help; use this instead)
```

There is no test suite. Verification on UI changes is `npm run build` + manual smoke test in `npm run dev` (light + dark, mobile width 375px, keyboard nav, and `prefers-reduced-motion: reduce`). `next/image` is strict about string-`src` requiring explicit `width`/`height`: dev throws if you forget, while prod prerender is lenient — always smoke-test in `dev`, not just `build`.

## High-level architecture

Next.js 15 (App Router) + React 19. Live site: ronialtshuler.com. Deploys from `main` on Vercel. The codebase has been through a multi-phase v2 redesign; the current shape is intentionally **resume-style** — modal-on-click cards + skills grid, no MDX/case-study deep dives.

### Information architecture

Routes: `/`, `/education`, `/work-experience`, `/projects`, `/skills`, `/resume`, `/contact`. Plus API route `/api/github`. Custom `not-found.js` and `error.js`. `template.js` wraps every route in a Framer Motion fade-in for client-side transitions.

[next.config.mjs](next.config.mjs) carries 301 redirects from prior URLs (`/research`, `/experience`, `/build`, `/cv`) so existing inbound links keep resolving. Adding a new top-level route generally means: a folder under `src/app/`, a `layout.js` exporting `metadata` (canonical, OG, title — picked up by the title template in [src/app/layout.js](src/app/layout.js)), a `page.js`, and a Navbar entry in the `NAV_ITEMS` array of [src/components/Navbar.js](src/components/Navbar.js).

### Data flow

Timeline data is the single source of truth — pages render filtered views, never their own hardcoded arrays. To add a job/degree/internship, edit [src/data/research.js](src/data/research.js): each entry has an `area` field (`'education'` or `'work'`), and the page-level helpers `educationEntries()` and `workEntries()` filter by it. Side projects live in [src/data/projects.js](src/data/projects.js) and skills in [src/data/skills.js](src/data/skills.js).

The `/projects` page client-fetches `/api/github` on mount to merge live stars/forks/language into the static defaults; failures are silent (the static defaults render). The home page is intentionally minimal — KineticHero + profile section only; deeper sections (work, projects, contact) live on their own routes.

### Styling: dual system

CSS Modules and Tailwind both work, intentionally. The older route pages (Education, Work Experience, Resume) use CSS Modules; newer components (hero, contact, skills) use Tailwind. **Tailwind preflight is disabled** in [tailwind.config.js](tailwind.config.js) so it doesn't reset what the CSS Modules established. Don't re-enable preflight — it will visually regress every existing page.

Tailwind colors are mapped to CSS variables (`text-text`, `bg-card`, `border-border`, `text-primary`, etc.) defined in [src/styles/globals.css](src/styles/globals.css). That keeps dark mode working: theme switching just flips the variables on `html[data-theme="dark"]`. The Tailwind `darkMode` config is wired to the same attribute. Anything you build in Tailwind should use these token classes rather than literal Tailwind colors so dark mode keeps working.

The standard card hover treatment is `hover:border-primary hover:shadow-glow` — `shadow-glow` is a custom Tailwind boxShadow token in [tailwind.config.js](tailwind.config.js) that layers the lift shadow + a 1 px violet ring + a 36 px accent glow. Project, timeline, Skills, and Contact cards all use it for visual consistency. CSS Module cards (Card.module.css, projects.module.css) replicate the same shadow stack by hand.

[ThemeToggle.js](src/components/ThemeToggle.js) persists choice to `localStorage`; an inline script in [layout.js](src/app/layout.js) reads it pre-paint to avoid a flash. Theme transitions cross-fade colors/borders/shadows site-wide (see the `html[data-theme] *` block in globals.css).

The navbar is a "frosted glass" element: `var(--navbar-bg)` (translucent slate) + `backdrop-filter: blur(18px) saturate(160%)`. The translucency lets the ParticleField wave bleed through. Heads-up — Chromium/Safari sometimes refuse to capture a sibling `position: fixed; z-index: -1` `<canvas>` in `backdrop-filter` due to compositor layer separation; the navbar's low alpha is what guarantees the wave is visible even when the blur fails to sample it.

### The Card / Modal pattern

[Card.js](src/components/Card.js) is the timeline primitive used on Education and Work Experience. Pass `lead={summary}` to surface a lead paragraph above the bullets, and `disableModal` to make the card static (bullets show inline, no click-to-open). Both Education and Work Experience currently pass `disableModal`, so [Modal.js](src/components/Modal.js) is effectively unreachable from any route — keep the file (ESC + click-outside + body-scroll-lock are non-trivial), but don't expect to debug a modal in normal usage. Card is a client component that uses Framer Motion `whileInView` for one-shot scroll-reveal, and both static and modal-enabled cards shift their border to `--primary-color` on hover (handled in [Card.module.css](src/styles/Card.module.css)).

Logos in Cards sit inside a deliberate parchment-tile backplate (`#f5f5f0` with border + padding, defined on `.logo` / `.modalLogo`). This is intentional — the org logos (UCSC, CRISPR Therapeutics, Technion shield) have light backgrounds baked into the source files, and the backplate keeps them from floating as white rectangles on the dark slate card.

### The card "pop" — TiltCard + useCardTilt

Every card-like surface on the site (project cards, timeline cards, Skills pillars, Contact box) shares a mouse-tracked 3D tilt + lift + glow on hover. The interaction is implemented once in [src/components/cards/useCardTilt.js](src/components/cards/useCardTilt.js): Framer Motion springs drive `rotateX`, `rotateY`, `scale`, and `z` from a normalized pointer offset within the element. The hook returns `{ reduced, onMouseMove, onMouseEnter, onMouseLeave, style }`; consumers spread the handlers + `style` onto a `motion.<tag>` and pass `reduced` through to a static fallback.

There are two wiring patterns:
- **`<TiltCard as="...">` wrapper** ([src/components/cards/TiltCard.js](src/components/cards/TiltCard.js)) — picks `motion[as]`, applies the hook, returns the static element when `reduced` is true. Used by `/projects`, `/skills`, `/contact`. Compose inside `<FadeUp>` so the entry stagger still works: `<FadeUp whileInView delay={i*0.06}><TiltCard ...>…</TiltCard></FadeUp>`.
- **Direct hook usage** — [Card.js](src/components/Card.js) calls `useCardTilt()` itself because it already owns a `motion.div` for the scroll-reveal. Spread the handlers/style onto that same div; the scroll-reveal `animate.y` and the tilt's motion-value `z` don't collide.

Two gotchas worth knowing:
- **Do NOT set `transformStyle: 'preserve-3d'` in the hook's style.** Inner clickable elements (e.g. the icon `<a>`s inside the Contact card) become unreliable to click when the parent uses `preserve-3d`. The card is meant to rotate as a flat plane in 3D perspective — children should hit-test against the rotated plane, not get their own 3D context.
- **Do NOT add CSS hover `transform: translateY(...)` (or any transform) to card classes that use the hook.** It fights the Framer Motion spring on the same transform property. The pre-tilt site used `translateY(-3px)` etc.; those were removed when the tilt landed. CSS hover should change `border-color` and `box-shadow` only — JS owns transform.

### Background

[ParticleField.js](src/components/background/ParticleField.js) renders a site-wide canvas fixed at `z-index: -1` as an "ocean swell" of dots. Layout: a 32 px (26 px on mobile) lattice covering the viewport, recomputed via `ResizeObserver`. One `Math.sin(now * PULSE_SPEED + phase)` per dot drives three things simultaneously so they crest together — radius (between `BASE_RADIUS` and `BASE_RADIUS + RADIUS_RANGE`), a vertical bob (`±BOB_AMP` px on the y axis), and the dot's color. `phase = col * WAVE_K_X + row * WAVE_K_Y + jitter[i]` — `WAVE_K_X = 0.45` and `WAVE_K_Y = 0.16` keep the crest near-horizontal and traveling right-to-left; `PHASE_JITTER = 0.08` adds just enough organic noise.

Color is a theme-aware HSL palette built once at mount (and rebuilt on `data-theme` change via `MutationObserver`): `HUE_BASE = 260°` (violet) ±`HUE_RANGE = 40°`, quantized to `PALETTE_SIZE = 64` `hsla()` strings. The draw loop maps the sine bucket to a palette index, so the gradient bands travel with the wave. Light vs dark mode shift saturation/lightness/alpha to stay readable on each bg. The legacy `--particle-color` CSS variable still exists in `globals.css` but is no longer read — color comes from `buildPalette()` instead.

Reduced-motion: renders a single static frame (no time advance, no bob); the static frame still shows the gradient because each dot's color depends on its phase, not on time. Mounted via [ParticleFieldLoader.js](src/components/background/ParticleFieldLoader.js) with `dynamic(..., { ssr: false })`. No cursor interaction.

### Motion conventions

Framer Motion is used for the kinetic hero, page transitions, scroll reveals (via Card), and smooth theme toggling. Every motion-using component calls `useReducedMotion()` and degrades to a static/instant variant when the user prefers reduced motion. The site-wide ease is `cubic-bezier(0.16, 1, 0.3, 1)` (Tailwind: `ease-out-expo`). Keep new motion under ~300ms.

[Reveal.js](src/components/anim/Reveal.js) exports `FadeUp` (block-level fade + 16 px lift) and `TypeIn` (word-by-word stagger that preserves line-wrapping). Both respect `useReducedMotion()`. `FadeUp` defaults to firing on mount; pass `whileInView` to switch it to scroll-trigger (used for staggering Skills pillars and Projects cards, ~60–80 ms apart). Use `FadeUp` for new page titles + intro paragraphs so the whole site has consistent entry motion.

### API routes

[/api/github](src/app/api/github/route.js) is a small public-GitHub passthrough with server-side caching. There is no contact-form API — `/contact` is a static TiltCard with three icon-only links (envelope, LinkedIn, GitHub). The `CHANNELS` array at the top of [src/app/contact/page.js](src/app/contact/page.js) is the source of truth for `href` + `aria-label`; the labels aren't rendered as visible text, only as `aria-label` and `title`.

### Analytics

`@vercel/analytics` is mounted in [layout.js](src/app/layout.js). One custom event is wired:
- `resume_download` — fires on the Download PDF click via [ResumeDownloadLink.js](src/components/analytics/ResumeDownloadLink.js).

### Resume PDF

The CV PDF lives at `public/RoniAltshulerCurrent.pdf` (gitignored top-level `*.pdf` excludes other PDFs but this one under `public/` is tracked). `/resume` auto-detects the file at build time via `fs.existsSync` and falls back to a "PDF coming soon" stub if it's missing.

### Path aliases

`@/*` → `src/*` (jsconfig.json). Some older imports still use `../../` relative paths — both work; prefer `@/` for new code.

## Environment variables

No required environment variables. Optional: `GITHUB_TOKEN` raises the unauthenticated rate limit on `/api/github`.
