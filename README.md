# Sunledger

A residential solar lead-generation site built with Next.js 14 App Router, TypeScript, Tailwind, and a static export.

This is a **lead-generation service**, not an installer, lender, or utility. We never fabricate savings, testimonials, urgency, or incentive dollar amounts. All numbers we publish point to authoritative public sources (DSIRE, state agencies, utility tariffs).

## Architecture

- **Framework**: Next.js 14 App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Output**: Static export (`output: 'export'`) — produces a fully static `out/` directory
- **Routing**:
  - `app/page.tsx` — homepage
  - `app/topics/[pillar]/page.tsx` — 6 pillar pages (How solar works, Costs, Incentives, Equipment, Battery, Going solar)
  - `app/guides/page.tsx` + `app/guides/[slug]/page.tsx` — 20 in-depth guides
  - `app/states/page.tsx` + `app/states/[slug]/page.tsx` — all 50 U.S. states
  - `app/faq/page.tsx` + `app/faq/[state]/page.tsx` — general + 6 state FAQ clusters
  - Utility pages: `/about`, `/contact`, `/thank-you`, `/privacy`, `/terms`, `/tcpa`, `/disclaimers`, `/attributions`
- **SEO**: per-page `generateMetadata`, JSON-LD (`Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`, `Article`, `ContactPage`, `AboutPage`), sitemap via `app/sitemap.ts`, robots via `app/robots.ts`
- **AI discoverability**: `/llms.txt` and `/llms-full.txt` are static files in `public/`
- **Forms**: native HTML form posted to `NEXT_PUBLIC_CONTACT_ENDPOINT` (e.g. Formspree); falls back to `mailto:` when unset
- **Imagery**: SVG hero compositions, registered in `src/content/images.ts`, attribution page at `/attributions`
- **Verification**: Playwright suite under `tests/e2e/`

## Getting Started

### Prerequisites
- Node.js 22+ (matches `.nvmrc`)
- npm 10+

### Install
```bash
npm install
```

### Develop
```bash
npm run dev    # http://localhost:3000
```

### Build
```bash
npm run build  # outputs to ./out
```

### Serve the built site locally
```bash
npm run start  # serves ./out on http://localhost:3000
```

### Type-check and lint
```bash
npm run typecheck
npm run lint
```

### Test (Playwright)
```bash
npx playwright install    # one-time
npm test                  # runs the Playwright suite against the built site
```

## Environment Variables

Create `.env.local` (or set in your hosting platform) to override defaults:

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_BRAND_NAME` | `Sunledger` | Brand displayed in header/footer/metadata |
| `NEXT_PUBLIC_SITE_URL` | `https://sunledger-site.onrender.com` | Canonical domain for absolute URLs, sitemap, robots |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | *(empty)* | Formspree-shaped endpoint for the intake form; leave empty to fall back to `mailto:` |

Copy `.env.example` to `.env.local` and edit.

## Deployment

This site is a fully static `out/` directory once built. Drop it into any static host:

- **Render Static Site**: create a new Static Site on Render, point it at this repo, build command `npm run build`, publish directory `out`.
- **Cloudflare Pages**: connect the repo; build command `npm run build`; output directory `out`.
- **Netlify**: connect the repo; build command `npm run build`; publish directory `out`.

After deploy, set the environment variables in the host's environment to lock in the brand name, domain, and contact endpoint.

## Content Model

All copy lives under `src/content/`:

- `pillars.ts` — 6 pillar hubs (each ~700–1000 words)
- `guides.ts` — 20 in-depth guides (each ≥1200 words, multiple H2 sections)
- `states.ts` — 50 state pages (factual context, policy posture, DSIRE out-link, common questions)
- `faqs.ts` — general FAQ + 6 state FAQ clusters
- `images.ts` — image registry (attribution data)

To change a fact, edit the file in `src/content/` and rebuild. **Do not invent dollar amounts**; if a state changes its incentives, link to DSIRE rather than quoting a now-wrong number.

## Compliance Notes

Every page carries the disclosure: *"Sunledger is a lead-generation service. We are not a solar installer, lender, or utility."* Forms require a TCPA consent checkbox. Disclosures appear under the form and in the footer.

If you go to production with this site:

1. Replace the placeholder Privacy Policy, Terms, and TCPA disclosure with lawyer-reviewed versions.
2. Wire the intake form to a real endpoint (Formspree or similar) and confirm the path from intake to installer CRM works end-to-end.
3. Verify each state page references a still-valid DSIRE URL.
4. Update `NEXT_PUBLIC_SITE_URL` to your actual production domain.

## Content Standard

Per the site prompt engine:

- One `<h1>` per page, descriptive and unique.
- Heading hierarchy H1 → H2 → H3 (no skipping levels).
- No fake testimonials, ratings, urgency, or savings claims.
- No invented incentive dollar amounts. We link to authoritative sources instead.
- Internal linking: every public page is reachable from the home in three clicks or fewer.

The Playwright suite enforces these rules and produces the PASS / PARTIAL / BLOCKED evidence trail.
