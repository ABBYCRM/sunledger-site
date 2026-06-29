import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';
import { images } from '@/content/images';

export const metadata = buildMetadata({
  title: 'Image attributions',
  description: 'Photographers and licenses for the imagery used across Sunledger.',
  path: '/attributions',
});

export default function AttributionsPage() {
  return (
    <>
      <JsonLd
        data={[
          webpage('Image attributions', 'Photographers and licenses for imagery on Sunledger.', '/attributions'),
          breadcrumb([{ name: 'Home', url: '/' }, { name: 'Attributions', url: '/attributions' }]),
        ]}
      />
      <Breadcrumbs items={[{ href: '/', label: 'Home' }, { label: 'Attributions' }]} />

      <header className="bg-sand-100">
        <div className="container-content py-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Image attributions</h1>
          <p className="mt-2 text-xs text-slate-500">Last updated: 2026-06-29</p>
        </div>
      </header>

      <Section>
        <div className="prose-content max-w-3xl">
          <p>Imagery on Sunledger uses the Unsplash License, which permits free use in commercial and non-commercial contexts without attribution. We list every photo below for transparency.</p>

          <ul>
            {images.map((img) => (
              <li key={img.id}>
                <strong>{img.alt}</strong> — licensed under{' '}
                <a href={img.licenseUrl} rel="noopener noreferrer">{img.licenseName}</a>.{' '}
                Source: <a href={img.remoteUrl} rel="noopener noreferrer">{img.remoteUrl}</a>.
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
