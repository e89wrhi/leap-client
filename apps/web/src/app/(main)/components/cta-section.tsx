import Link from 'next/link';
import { Github } from 'lucide-react';

const FOOTER_COLUMNS = [
  {
    heading: 'GET STARTED',
    links: [
      { label: 'Installation', href: '/docs/getting-started/installation' },
      { label: 'Quick Start', href: '/docs/getting-started/quick-start' },
      {
        label: 'NuGet Packages',
        href: 'https://www.nuget.org/packages/LeapAi.Sdk',
      },
    ],
  },
  {
    heading: 'CONCEPTS',
    links: [
      {
        label: 'Text Generation',
        href: '/docs/core-concepts/chat-and-streaming',
      },
      { label: 'Streaming', href: '/docs/core-concepts/chat-and-streaming' },
      { label: 'Structured Data', href: '/docs/core-concepts/structured-data' },
    ],
  },
  {
    heading: 'PROVIDERS',
    links: [
      { label: 'OpenAI', href: '/docs/integrations/providers' },
      { label: 'Anthropic', href: '/docs/integrations/providers' },
      { label: 'Google Gemini', href: '/docs/integrations/providers' },
    ],
  },
  {
    heading: 'RESOURCES',
    links: [
      { label: 'GitHub', href: 'https://github.com/e89wrhi/leap-ai-sdk' },
      { label: 'Contributing', href: '/docs/community/contributing' },
    ],
  },
];

export function CtaSection() {
  return (
    <>
      {/* CTA Banner */}
      <section className="border-t border-neutral-200 dark:border-neutral-800/60 py-24 px-4 text-center bg-neutral-950 dark:bg-black relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[700px] rounded-full bg-blue-600/10 blur-3xl" />
        </div>
        <h2 className="relative text-4xl font-bold tracking-tight text-white sm:text-5xl max-w-2xl mx-auto">
          Start building AI apps in .NET today
        </h2>
        <p className="relative mt-4 text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Install the Leap AI SDK from NuGet and connect to any LLM provider in
          minutes.
        </p>
        <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="https://www.nuget.org/packages/LeapAi.Sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-neutral-950 shadow hover:bg-neutral-100 transition-colors"
          >
            Get started for free
          </Link>
          <Link
            href="https://github.com/e89wrhi/leap-ai-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-neutral-700 px-6 text-sm font-semibold text-white hover:border-neutral-500 hover:bg-white/5 transition-colors"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800/60">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="mb-3 text-[10px] font-semibold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                      >
                        {col.heading === 'GET STARTED' &&
                        link.label !== 'NuGet Packages' ? (
                          <span className="flex items-center gap-1">
                            {link.label}
                            <span className="text-[10px] bg-blue-500/10 text-blue-500 px-1 rounded">
                              New
                            </span>
                          </span>
                        ) : (
                          link.label
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200 dark:border-neutral-800/60 pt-8 text-sm text-neutral-400 dark:text-neutral-500">
            <p>
              © {new Date().getFullYear()} Leap AI SDK. Open source under the
              MIT license.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
