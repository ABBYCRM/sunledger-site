import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { pillars } from '@/content/pillars';
import { guides } from '@/content/guides';
import { states } from '@/content/states';
import { faqClusterSlugs } from '@/content/faqs';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain;
  const now = site.lastUpdated;

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${base}/about/`, lastModified: now, priority: 0.6, changeFrequency: 'yearly' },
    { url: `${base}/contact/`, lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${base}/thank-you/`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/privacy/`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/terms/`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/tcpa/`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/disclaimers/`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/attributions/`, lastModified: now, priority: 0.3, changeFrequency: 'yearly' },
    { url: `${base}/states/`, lastModified: now, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${base}/guides/`, lastModified: now, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${base}/faq/`, lastModified: now, priority: 0.6, changeFrequency: 'monthly' },
  ];

  const pillarUrls: MetadataRoute.Sitemap = pillars.map((p) => ({
    url: `${base}/topics/${p.slug}/`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: 'monthly',
  }));

  const guideUrls: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${base}/guides/${g.slug}/`,
    lastModified: g.datePublished,
    priority: 0.7,
    changeFrequency: 'monthly',
  }));

  const stateUrls: MetadataRoute.Sitemap = states.map((s) => ({
    url: `${base}/states/${s.slug}/`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: 'monthly',
  }));

  const stateFaqUrls: MetadataRoute.Sitemap = faqClusterSlugs().map((s) => ({
    url: `${base}/faq/${s}/`,
    lastModified: now,
    priority: 0.5,
    changeFrequency: 'monthly',
  }));

  return [
    ...staticUrls,
    ...pillarUrls,
    ...guideUrls,
    ...stateUrls,
    ...stateFaqUrls,
  ];
}
