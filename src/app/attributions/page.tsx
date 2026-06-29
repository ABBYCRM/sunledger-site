import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Section } from '@/components/Section';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumb, webpage } from '@/lib/schema';
import { images } from '@/content/images';

export const metadata = buildMetadata({
  title: 'Image attributions',
  description: 'All imagery on Sunledger is original work produced for this site. Every photograph is registered below with the page where it appears.',
  path: '/attributions',
});

export default function AttributionsPage() {
  return (
    <>
      <JsonLd
        data={[
          webpage('Image attributions', 'Original imagery used across Sunledger.', '/attributions'),
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
          <p>
            All imagery on Sunledger is original work created specifically for this site. No third-party photographs are used. Every image is registered below with the page where it appears, and the same image is used at multiple responsive sizes via the <code>/img/optimized/</code> directory.
          </p>
          <p>
            Imagery is original work commissioned by Sunledger for use on this site. The full set is also available as higher-resolution masters if a partner needs source files.
          </p>

          <h2>Image registry</h2>
          <ul>
            {images.map((img) => (
              <li key={img.id}>
                <strong>{img.alt}</strong> — used for: <em>{img.topic}</em>. Source file: <code>{img.src}</code>.
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}