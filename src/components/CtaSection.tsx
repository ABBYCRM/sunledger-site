import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="bg-slate-900 text-white">
      <div className="container-content py-16 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Ready to learn whether solar makes sense for your home?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-300">
          Share a few details about your home and your electricity bill. We&apos;ll connect you with qualified installer partners in your area. No obligation, no cost, no spam.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/contact" className="btn-primary">Get My Free Assessment</Link>
          <Link href="/states" className="btn-secondary border-slate-700 bg-slate-800 text-white hover:bg-slate-700">Browse State Information</Link>
        </div>
        <p className="mt-6 text-xs text-slate-400">
          We are a lead-generation service. We do not install solar, lend money, or sell electricity. Quotes and final pricing are determined by the installer partners we connect you with.
        </p>
      </div>
    </section>
  );
}
