import { HeroSection } from './components/hero-section';
import { InteractionSection } from './components/interaction-section';
import { BenitoSection } from './components/benito-section';
import { CtaSection } from './components/cta-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {/* Centered max-width container for hero */}
      <div className="mx-auto max-w-5xl">
        <HeroSection />
      </div>

      {/* Full-width bordered sections */}
      <div className="mx-auto max-w-5xl border-x border-neutral-200 dark:border-neutral-800/60">
        <InteractionSection />
        <BenitoSection />
      </div>

      {/* Full-width CTA + Footer */}
      <CtaSection />
    </div>
  );
}
