import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CtaSection } from '@/components/CtaSection';
import { JsonLd } from '@/components/JsonLd';
import { Section } from '@/components/Section';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';
import { pillarBySlug, pillars } from '@/content/pillars';
import { guides } from '@/content/guides';

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: slug } = await params;
  const p = pillarBySlug(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.name,
    description: p.metaDescription,
    path: `/topics/${p.slug}`,
  });
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar: slug } = await params;
  const p = pillarBySlug(slug);
  if (!p) return notFound();

  const related = guides.filter((g) => g.pillar === p.slug).slice(0, 4);

  return (
    <>
      <JsonLd
        data={[
          webpage(p.h1, p.description, `/topics/${p.slug}`),
          breadcrumb([
            { name: 'Home', url: '/' },
            { name: p.name, url: `/topics/${p.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: p.name }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{p.h1}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">{p.intro}</p>
        </div>
      </header>

      <Section eyebrow="What you&apos;ll learn" title="Pillar overview">
        <div className="prose-content">
          {p.sections.map((s) => (
            <div key={s.id} id={s.id}>
              <h2>{s.heading}</h2>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {related.length > 0 && (
        <Section eyebrow="From the library" title="Related guides">
          <div className="grid gap-5 sm:grid-cols-2">
            {related.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="card flex flex-col">
                <h3 className="text-lg font-semibold text-slate-900">{g.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{g.description}</p>
                <span className="mt-4 text-sm font-medium text-solar-700">Read the guide →</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CtaSection />
    </>
  );
}
