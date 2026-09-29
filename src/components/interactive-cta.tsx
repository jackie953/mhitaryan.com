import { useTranslations } from 'next-intl';
import Link from 'next/link';

export function InteractiveCta() {
  const t = useTranslations('HomePage');

  return (
    <section
      className="w-full"
      style={{ paddingTop: 30, paddingBottom: 30 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95 px-6 py-12 shadow-2xl sm:px-12 sm:py-16">
          {/* Decorative background blur blobs */}
          <div
            className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t('cta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              {t('cta.description')}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/#contact" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="group relative w-full overflow-hidden rounded-lg bg-white px-6 py-3 text-base font-medium text-slate-900 transition-colors hover:bg-slate-100 sm:w-auto"
                >
                  <span className="flex items-center justify-center gap-2">
                    {t('cta.primaryButton')}
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </button>
              </Link>
              <Link href="/services" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full rounded-lg border border-slate-600 bg-transparent px-6 py-3 text-base font-medium text-white transition-colors hover:bg-slate-800 sm:w-auto"
                >
                  {t('cta.secondaryButton')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
