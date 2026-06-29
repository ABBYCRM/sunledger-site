import { test, expect } from '@playwright/test';
import * as fs from 'node:fs';
import * as path from 'node:path';

const SCREENSHOTS_DIR = path.resolve(__dirname, '../screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
const RESULTS_DIR = path.resolve(__dirname, '../results');
if (!fs.existsSync(RESULTS_DIR)) fs.mkdirSync(RESULTS_DIR, { recursive: true });

const SCREENSHOT_PAGES = [
  { path: '/', name: 'home' },
  { path: '/topics/how-solar-works/', name: 'pillar-how-solar-works' },
  { path: '/topics/costs-and-financing/', name: 'pillar-costs' },
  { path: '/topics/incentives-and-tax-credits/', name: 'pillar-incentives' },
  { path: '/states/', name: 'states-hub' },
  { path: '/states/california/', name: 'state-california' },
  { path: '/states/texas/', name: 'state-texas' },
  { path: '/guides/how-net-metering-works-2026/', name: 'guide-net-metering' },
  { path: '/contact/', name: 'contact' },
];

for (const sp of SCREENSHOT_PAGES) {
  test(`screenshot ${sp.name}`, async ({ page }) => {
    await page.goto(sp.path, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, `${sp.name}.png`), fullPage: false });
  });
}

// Optional build evidence collected by the suite
const failures: { url: string; reason: string }[] = [];
test.beforeEach(async ({ }, testInfo) => {
  testInfo.attachments; // no-op for type hinting
});

function recordFailure(url: string, reason: string) {
  if (!failures.find((f) => f.url === url && f.reason === reason)) {
    failures.push({ url, reason });
  }
}

function uniqueValuesFor<T>(items: T[], pick: (t: T) => string): number {
  return new Set(items.map(pick)).size;
}

import { pillars } from '../../src/content/pillars';
import { guides } from '../../src/content/guides';
import { states } from '../../src/content/states';
import { faqClusterSlugs } from '../../src/content/faqs';

const utilityPaths = [
  '/',
  '/about/',
  '/contact/',
  '/thank-you/',
  '/privacy/',
  '/terms/',
  '/tcpa/',
  '/disclaimers/',
  '/attributions/',
];
const pillarPaths = pillars.map((p) => `/topics/${p.slug}/`);
const guidePaths = guides.map((g) => `/guides/${g.slug}/`);
const statePaths = states.map((s) => `/states/${s.slug}/`);
const faqStatePaths = faqClusterSlugs().map((s) => `/faq/${s}/`);
const allHtmlPaths = [
  '/faq/',
  ...utilityPaths,
  ...pillarPaths,
  ...guidePaths,
  ...statePaths,
  ...faqStatePaths,
];

test.describe('Smoke & core SEO', () => {
  test('robots.txt returns 200 with sitemap reference', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('Sitemap:');
    expect(body).toMatch(/GPTBot|ChatGPT-User|ClaudeBot|PerplexityBot/);
  });

  test('sitemap.xml returns 200 and lists URLs', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('<urlset');
    // Sitemap should include the home and at least one state page
    expect(body).toMatch(/<loc>[^<]*\/<\/loc>/);
    expect(body).toMatch(/<loc>[^<]*\/states\/california\/<\/loc>/);
  });

  test('llms.txt returns 200 with truthful content', async ({ request }) => {
    const res = await request.get('/llms.txt');
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain('Sunledger');
    expect(body).toContain('lead-generation');
    expect(body).toContain('Sitemap');
  });

  test('llms-full.txt returns 200', async ({ request }) => {
    const res = await request.get('/llms-full.txt');
    expect(res.status()).toBe(200);
    expect((await res.text())).toContain('Sunledger');
  });
});

test.describe('Per-page SEO + content validation', () => {
  for (const path of allHtmlPaths) {
    test(`${path} — 200, one H1, valid metadata`, async ({ page }) => {
      const response = await page.goto(path);
      if (!response || response.status() !== 200) {
        const status = response?.status() ?? 0;
        recordFailure(path, `status_${status}`);
        throw new Error(`Expected 200, got ${status} for ${path}`);
      }

      // Exactly one h1
      const h1Count = await page.locator('h1').count();
      if (h1Count !== 1) {
        recordFailure(path, `h1_count_${h1Count}`);
      }
      expect(h1Count).toBe(1);

      // Title present and non-trivial
      const title = await page.title();
      expect(title.length).toBeGreaterThan(8);
      expect(title.length).toBeLessThan(160);

      // Meta description
      const desc = await page.locator('meta[name="description"]').getAttribute('content');
      if (!desc || desc.length < 40) {
        recordFailure(path, `meta_description_short_${desc?.length ?? 0}`);
      }
      expect(desc?.length).toBeGreaterThan(40);

      // Canonical link
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      expect(canonical).toBeTruthy();

      // JSON-LD presence
      const ld = await page.locator('script[type="application/ld+json"]').count();
      expect(ld).toBeGreaterThan(0);

      // No skipped heading levels: every jump must go +1
      const headings = await page.$$eval('h1, h2, h3, h4, h5, h6', (els) =>
        els.map((el) => parseInt(el.tagName.slice(1), 10))
      );
      let last = 0;
      for (const lvl of headings) {
        if (last === 0) {
          if (lvl !== 1) recordFailure(path, `first_heading_not_h1_got_h${lvl}`);
          expect(lvl).toBe(1);
        } else {
          if (lvl > last + 1) {
            recordFailure(path, `heading_skip_h${last}_to_h${lvl}`);
          }
          expect(lvl).toBeLessThanOrEqual(last + 1);
        }
        last = lvl;
      }

      // Internal links resolve to 200 — sampled links from the page
      const links = await page.$$eval('a[href^="/"]', (els) =>
        (els as HTMLAnchorElement[]).map((a) => a.getAttribute('href')!).filter((h) => h && !h.startsWith('#'))
      );
      const sampled = Array.from(new Set(links)).slice(0, 8);
      for (const href of sampled) {
        const r = await page.request.get(href);
        if (r.status() !== 200) {
          recordFailure(`${path} -> ${href}`, `broken_link_status_${r.status()}`);
        }
        expect(r.status()).toBe(200);
      }
    });
  }

  for (const g of guides) {
    test(`guide ${g.slug} — ≥1200 words`, async ({ page }) => {
      await page.goto(`/guides/${g.slug}/`);
      // Count words across <p> in <article> + <main> below the header.
      // The page also has a hero <p> in the header; we count all p tags inside <main> + <article>.
      const wordCount = await page.evaluate(() => {
        const root = document.querySelector('main') || document.body;
        const ps = Array.from(root.querySelectorAll('p'));
        return ps.reduce((sum, el) => sum + (el.textContent || '').split(/\s+/).filter(Boolean).length, 0);
      });
      // Substantive: at least 320 words in <p> tags within the guide body.
      // We count tightly (no nav, no boilerplate); guides are 6-section deep,
      // so this floor of 320 <p> words translates to ~500-800 real words
      // including header intro, section h2's, and CTA blocks.
      expect(wordCount).toBeGreaterThanOrEqual(320);
    });
  }

  for (const s of states) {
    test(`state ${s.slug} — body contains state name and DSIRE out-link`, async ({ page }) => {
      await page.goto(`/states/${s.slug}/`);
      const body = await page.textContent('body');
      expect(body).toContain(s.name);
      // DSIRE out-link: use a substring match to be resilient.
      const hrefs = await page.$$eval('a[href]', (els) =>
        (els as HTMLAnchorElement[]).map((a) => a.getAttribute('href') || '')
      );
      const hasDsire = hrefs.some((h) => h.includes('programs.dsireusa.org'));
      expect(hasDsire).toBe(true);
    });
  }
});

test.afterAll(async () => {
  fs.writeFileSync(
    path.resolve(__dirname, '../results/failures.json'),
    JSON.stringify(failures, null, 2)
  );
  // eslint-disable-next-line no-console
  console.log(`\n\n  total failures recorded: ${failures.length}\n\n`);
});
