import Link from 'next/link';

const STATS = [
  { value: '3', label: 'AI Providers' },
  { value: '100+', label: 'Models supported' },
  { value: '5', label: 'NuGet Packages' },
  { value: '.NET 10', label: 'Native support' },
];

const FEATURES = [
  {
    title: 'Multi-provider support.',
    description: 'Switch between OpenAI, Anthropic & Google with one line of code.',
  },
  {
    title: 'Streaming that just works.',
    description: 'Real-time SSE responses without custom parsing or provider adapters.',
  },
  {
    title: 'Built-in retries & fallbacks.',
    description: 'Jittered exponential backoff and automatic failover out of the box.',
  },
];

const PACKAGES = [
  {
    name: 'Leap.AI.Core',
    description:
      'Bare-metal abstractions, unified models, and the middleware pipeline architecture.',
    href: 'https://www.nuget.org/packages/Leap.AI.Core',
  },
  {
    name: 'Leap.AI.Providers.*',
    description:
      'Provider adapters for OpenAI, Anthropic, and Google Gemini — install only what you need.',
    href: 'https://www.nuget.org/packages/LeapAi.Sdk',
  },
];

const FRAMEWORK_LOGOS = [
  { label: 'ASP.NET Core', abbr: 'ASP' },
  { label: 'Blazor', abbr: 'BLZ' },
  { label: 'MAUI', abbr: 'MAU' },
  { label: 'Worker Service', abbr: 'SVC' },
  { label: 'Console App', abbr: 'CLI' },
  { label: 'Azure Functions', abbr: 'AZF' },
];

export function BenitoSection() {
  return (
    <>
      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 border-t border-neutral-200 dark:border-neutral-800/60">
        {STATS.map((stat, i) => (
          <div
            key={i}
            className={`p-8 sm:p-10 ${
              i < STATS.length - 1
                ? 'border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800/60'
                : ''
            } ${i === 1 ? 'border-r border-neutral-200 dark:border-neutral-800/60 lg:border-r' : ''}`}
          >
            <p className="text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* The Framework Agnostic Section */}
      <section
        id="features"
        className="border-t border-neutral-200 dark:border-neutral-800/60 py-20 text-center px-4"
      >
        <h2 className="text-4xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
          The Provider-Agnostic .NET AI Toolkit
        </h2>
      </section>

      {/* Framework logos row */}
      <div className="border-t border-neutral-200 dark:border-neutral-800/60 py-10 overflow-hidden">
        <div className="flex justify-center gap-6 flex-wrap px-6">
          {FRAMEWORK_LOGOS.map((fw) => (
            <div
              key={fw.label}
              title={fw.label}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs font-mono font-bold text-neutral-600 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-default"
            >
              {fw.abbr}
            </div>
          ))}
        </div>
      </div>

      {/* 3-column feature grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-neutral-200 dark:border-neutral-800/60">
        {FEATURES.map((feat, i) => (
          <div
            key={i}
            className={`p-8 sm:p-10 ${
              i < FEATURES.length - 1
                ? 'border-b sm:border-b-0 sm:border-r border-neutral-200 dark:border-neutral-800/60'
                : ''
            }`}
          >
            <p className="font-bold text-neutral-950 dark:text-white leading-snug">
              {feat.title}
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {feat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Package cards with code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-neutral-200 dark:border-neutral-800/60">
        {/* Leap Core */}
        <div className="border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800/60 p-8 sm:p-10 flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white">Leap AI Core</h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
              A unified API for generating text, structured objects, tool calls, and building agents with any LLM.
            </p>
          </div>
          <InstallSnippet command="dotnet add package Leap.AI.Core" />
        </div>

        {/* DI Extension */}
        <div className="p-8 sm:p-10 flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white opacity-60">
              Leap AI DI Extensions
            </h3>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
              Official ASP.NET Core IServiceCollection integrations using a fluent builder pipeline pattern.
            </p>
          </div>
          <InstallSnippet command="dotnet add package Leap.AI.Extensions.DependencyInjection" />
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-neutral-200 dark:border-neutral-800/60">
        <Testimonial
          quote="Leap AI handles streaming, tool-call loops, and structured output in a single, clean pipeline. Every hard problem just disappears."
          name="Alex M."
          role="Senior Backend Engineer"
          company="FinTech Co."
          border
        />
        <Testimonial
          quote="We swapped providers in 30 seconds. No code changes outside the builder. That's the kind of abstraction you never want to live without."
          name="Priya S."
          role="CTO & Founder"
          company="AI-Start"
        />
      </div>
    </>
  );
}

function InstallSnippet({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 px-4 py-3 font-mono text-sm text-neutral-700 dark:text-neutral-300">
      <span className="text-neutral-400 dark:text-neutral-600">$</span>
      <span className="truncate">{command}</span>
    </div>
  );
}

function Testimonial({
  quote,
  name,
  role,
  company,
  border,
}: {
  quote: string;
  name: string;
  role: string;
  company: string;
  border?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between gap-10 p-8 sm:p-10 ${border ? 'border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800/60' : ''}`}
    >
      {/* Decorative bars */}
      <div className="flex gap-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-5 w-1.5 rounded-sm bg-neutral-200 dark:bg-neutral-700"
            style={{ opacity: 1 - i * 0.2 }}
          />
        ))}
      </div>
      <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">"{quote}"</p>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-semibold text-neutral-950 dark:text-white">{name}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{role}</p>
        </div>
        <p className="text-sm font-semibold text-neutral-400 dark:text-neutral-600 tracking-widest uppercase">
          {company}
        </p>
      </div>
    </div>
  );
}
