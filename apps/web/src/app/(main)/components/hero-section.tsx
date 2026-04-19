'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Copy } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('dotnet add package LeapAi.Sdk');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex flex-col items-center justify-center text-center px-4 pt-40 pb-20">
      {/* Background gradient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-blue-100/40 blur-3xl dark:bg-blue-950/20" />
      </div>

      <h1 className="relative max-w-3xl text-5xl font-bold tracking-tight text-neutral-950 dark:text-white sm:text-6xl leading-[1.08]">
        Provider-agnostic AI layer for .NET apps and agents
      </h1>

      <p className="relative mt-6 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
        A unified .NET SDK for building AI-powered apps with streaming, tool calling, and structured output—powered by OpenAI, Anthropic, and Google Gemini.
      </p>

      {/* CTA links */}
      <div className="relative mt-8 flex items-center gap-6 text-sm font-semibold">
        <Link
          href="https://github.com/e89wrhi/leap-ai-sdk"
          className="text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          Get Started
        </Link>
        <span className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
        <Link
          href="#features"
          className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          View Docs
        </Link>
      </div>

      {/* Install command */}
      <button
        onClick={handleCopy}
        className="relative mt-8 group flex items-center gap-3 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-6 py-3 text-sm font-mono text-neutral-700 dark:text-neutral-300 shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 transition-all backdrop-blur-sm"
        aria-label="Copy install command"
      >
        <span className="text-neutral-400 dark:text-neutral-600">$</span>
        <span>dotnet add package LeapAi.Sdk</span>
        <span className="ml-2 text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </span>
      </button>
    </section>
  );
}
