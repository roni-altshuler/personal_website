# Website maintenance

## Before publishing a change

Use Node.js 22 or newer. Install dependencies with `npm ci`, then run:

```sh
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Playwright starts the production server on `http://127.0.0.1:3100`. To test an already running instance, set `PLAYWRIGHT_BASE_URL` to its origin. Tests cover all five public pages at desktop, 390px and 320px widths, fixed light styling regardless of device color preference, automated accessibility on every desktop page and representative narrow home/contact pages, keyboard navigation, focus restoration, reduced motion, no-JavaScript content, contact copying, and legacy redirects. Motion checks cover the absence of animated backgrounds and controls, a stable introduction during pointer movement and scrolling, and reduced motion preferences for brief hover transitions. Research and software cards, plus clickable affiliation and contact surfaces, follow fine-pointer movement with bounded tilt and light. Keyboard focus is highlighted without movement. Interaction tests cover direction changes, pointer exit, live preference changes, and touch navigation. Content checks cover heading punctuation and loading institutional logos. Automated checks complement manual keyboard and screen-reader testing; they do not establish complete accessibility compliance.

For visual review, start the site with `npm start`, then run `npm run screenshots`. Captures include all five pages in light mode at three widths and are saved under `screenshots/current/`. Set `SCREENSHOT_BASE_URL` and `SCREENSHOT_PHASE` to override the origin or output subdirectory. Review text wrapping, image crops, reading order, focus states, and small-screen contact/navigation controls.

With the server running, `npm run check:links` checks internal destinations and section anchors. `npm run check:links -- --external` additionally checks external HTTP links. Set `LINK_CHECK_BASE_URL` to test a preview or production site. An external timeout or bot restriction requires manual verification; it is not proof that a destination is broken.

## Quarterly content review

- Confirm the current academic role, dates, institution names, and preferred contact address.
- Review research descriptions and metrics against their supporting sources. Describe individual contributions accurately and confirm permission before sharing unpublished findings, slides, data, or third-party figures.
- Verify demos, repository links, collaborators, and institutional destinations. Remove stale project metadata and broken links.
- Add publications only when there are actual entries to show. No placeholder publication page is required.
- Keep skills attached to concrete examples; remove tools that no longer represent current experience.
- Review social previews, canonical URLs, sitemap routes, and search snippets after page changes.

## Dependencies and security

Dependabot checks npm weekly and GitHub Actions monthly. Review update pull requests promptly and run the complete checks before merging. Next.js and its ESLint configuration are grouped, as are React and React DOM. Major updates to Next.js, its ESLint configuration, and ESLint require a coordinated migration and are excluded from automatic version proposals. Minor and patch proposals remain enabled. Revisit these exclusions during framework upgrades. See the [Dependabot ignore option](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-options-reference#ignore) for the update policy. Read upstream advisories and prioritize security updates; a clean dependency audit alone does not establish that the application is secure. Keep the lockfile committed and never place tokens or private source material in public assets.

## Performance review

Use Vercel Speed Insights or another real-user monitoring source to assess Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS). Compare the 75th percentile by mobile/desktop segment over a meaningful date range and record sample size. If traffic is too low, report insufficient field data rather than inventing a score. Supplement field data with repeatable local Lighthouse or browser traces when diagnosing regressions, recording device, network profile, route, and commit. Review image sizes, font loading, third-party scripts, and JavaScript cost when measurements justify changes.

## Continuous integration

The Website checks workflow runs install, lint, production build, and Chromium regression tests for pull requests and pushes to main/master. Browser reports are retained as artifacts for 14 days. Deployment remains separate from these checks.

## Dependency overrides

The root `postcss` override reuses the patched direct PostCSS dependency for Next.js as well. Next.js 15.5 otherwise pins an older nested PostCSS release. Keep the override until upstream's dependency is patched; review it when upgrading the framework, and verify production builds after changes.


## Local Editor Preview

The localhost preview permits same-origin frames and VS Code webview origins. Public hostnames continue to send `frame-ancestors 'none'`. The layout adapts to narrow desktop editor panes. The page background remains still. Card pointer effects are limited to fine pointers, and device reduced motion preferences disable their transforms and transitions. CardInteractions performs one update per movement frame, reads bounds on entry, and resets on scrolling, route changes, selection, focus navigation, and preference changes.
