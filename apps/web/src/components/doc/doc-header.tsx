'use client';

import Link from 'next/link';
import { ChevronLeft, Sun, Moon, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function DocHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-neutral-200/60 bg-white/80 backdrop-blur-md dark:border-neutral-800/60 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="group flex items-center gap-1 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span className="hidden sm:inline">Back to home</span>
            </Button>
          </Link>

          <div className="h-6 w-[1px] bg-neutral-200 dark:bg-neutral-800 hidden sm:block" />

          <Link href="/docs/introduction" className="flex items-center gap-2">
            <div className="relative h-7 w-7">
              <Image
                src="/logo.png"
                alt="Leap Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Leap Docs
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/e89wrhi/leap-ai-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full text-neutral-500 dark:text-neutral-400"
            >
              <Github className="h-4 w-4" />
            </Button>
          </Link>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9 rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 animate-in zoom-in duration-300" />
              ) : (
                <Moon className="h-4 w-4 animate-in zoom-in duration-300" />
              )}
            </Button>
          )}

          <Link href="/docs" className="hidden md:block">
            <Button size="sm" className="rounded-full h-8 px-4 text-xs">
              Explore All Docs
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
