# Roni Altshuler — personal website

Research, experience, open-source projects, and personal background at [www.ronialtshuler.com](https://www.ronialtshuler.com).

## Development

Use Node.js 22+. Run `npm ci` and `npm run dev`. The site uses Next.js App Router, React, local Inter fonts, and a guided research portfolio with a single light theme, crisp white surfaces, near black typography, cool gray borders, and electric blue accents. The page background stays still. Research and project cards follow the mouse with bounded 3D tilt and a neutral shadow. Clickable affiliation and contact tiles share subtler feedback. Keyboard focus receives a static highlight, and reduced motion disables the transform and transitions. The original lion favicon is served at a distinct URL for browser cache refresh.

## Pages and content

- `/`: introduction and selected contributions
- `/research`: current PhD and previous research experience
- `/projects`: public software projects with real demo screenshots
- `/about`: biography, education, and methods linked to work
- `/contact`: email, clipboard action, LinkedIn, GitHub

Publications are intentionally absent. Education, skills, and experience URLs redirect to their current destinations. There is no public CV or resume download.

Content lives in `src/data/`. Shared visual styles are in `src/styles/globals.css`. Public demo screenshots and provenance are in `public/projects/`. Research source limitations and editorial decisions are documented in `docs/content-sources.md`; no private research data or PDFs are served.

## Verification

Run `npm run lint`, `npm run build`, then `npm run test:e2e`. Browser tests start a production server on port 3100. Do not build into `.next` while a development server uses it.

With a server on port 3000, `npm run screenshots` captures all pages at desktop and mobile sizes. `npm run check:links` validates internal links and fragments; add `-- --external` to check external destinations. See [maintenance](docs/maintenance.md) for configuration and ongoing checks.

## Deployment and configuration

The site is configured for Vercel. No environment variables are required. An optional server-only `GITHUB_TOKEN` improves rate limits for the retained `/api/github` endpoint; the project showcase uses static, curated content and does not depend on that endpoint. Vercel Analytics and Speed Insights remain enabled.

GitHub Actions runs lint, build and browser checks. Dependabot proposes dependency updates. Changes must pass checks before publication.
