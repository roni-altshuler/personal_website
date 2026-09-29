# Project guidance

See README.md for setup and docs/maintenance.md for required verification. The current design is a modern research portfolio with editorial spacing; docs/linear-design.md and unused legacy components describe the previous design only.

## Current architecture

Next.js App Router and React. Routes: `/`, `/research`, `/projects`, `/about`, `/contact`. Old education/skills/experience/build URLs redirect in next.config.mjs; keep those inbound links working. Publications are intentionally absent. No public CV/resume download.

Content source of truth: src/data/site.js, research.js, skills.js, projects.js. Read docs/content-sources.md before changing scientific claims. Do not reintroduce historical segmentation metrics without validating their evaluation context. Do not publish private source datasets, research outputs, or local PDFs.

## UI

Shared semantic CSS lives in src/styles/globals.css. The website uses one light theme with fixed CSS tokens and a server-rendered light theme attribute. No theme or motion initialization script is needed. Inter is served locally via next/font/local for body text and headings. Tailwind preflight stays disabled; the global border reset supplies border-style explicitly.

Pages are server-rendered and readable without JavaScript. Native dialog handles mobile navigation; Navbar manages focus, Escape/backdrop, resize and scroll lock. CopyEmail is a small client component. The page background remains still. Motion is limited to brief hover transitions on links, buttons, and project cards. Research, experience, education, skill, and project cards use CardInteractions to follow the mouse with bounded 3D tilt and a neutral shadow. Clickable affiliation and contact tiles use smaller motion. Reduced motion and touch disable pointer tracking; keyboard focus receives a static highlight. Do not reintroduce animated page backgrounds, page-wide cursor glows, letter reveals, or scroll reveals. Do not add pointer-following color glows inside cards. HeroHeadline displays the owner's name as ordinary accessible text. ResearchMethods uses decorative schematic icons to describe methods; these are not experimental data. The homepage uses genuine project screenshots and links to anchored descriptions on the projects page. All text stays readable without JavaScript. No rotating live regions or external icon fonts are mounted. Use inline SVG for small icons. Project cards remain semantic articles with individual links; do not add button roles or extra tab stops to their decorative hover effect.

## Checks

`npm run lint`, `npm run build`, `npm run test:e2e`. Test desktop and 390/320px widths, light mode under both device color preferences, no-JS, reduced motion, keyboard focus and contact copying. Also smoke-test in dev: next/image requires explicit width/height and appropriate sizes. Never run build against the same .next directory while dev is running. `npm run screenshots` and `npm run check:links` use an already-running server; environment overrides are documented in docs/maintenance.md.

No required env vars; GITHUB_TOKEN is optional and server-only. Do not read or expose .env files. /api/github is retained as an optional cached endpoint, not used by current project cards.

## Editorial style

Use direct, personal language appropriate to a research and career profile. Use Title Case for headings and omit terminal periods. Do not use numbered section labels or dash punctuation in prose. Preserve the spelling of official names such as Ron-Harel and CRISPR-X. Display original institutional logos without cropping or recoloring. Publications remain intentionally absent.
