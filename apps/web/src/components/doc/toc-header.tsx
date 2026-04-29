'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { TOCSection } from '@/lib/contentlayer';

interface MobileTOCProps {
  headings: TOCSection[];
}

export default function MobileTOC({ headings }: MobileTOCProps) {
  const INITIAL_OVERVIEW_TEXT = 'Overview';
  const HEADER_OFFSET = 102 + 36;
  const PROGRESS_CIRCLE_RADIUS = 10;
  const PROGRESS_CIRCLE_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_CIRCLE_RADIUS;

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(INITIAL_OVERVIEW_TEXT);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + HEADER_OFFSET;
      let currentHeading = headings[0];

      for (const heading of headings) {
        const firstHeading = heading.headings?.[0];
        if (firstHeading) {
          const el = document.getElementById(firstHeading.slug);
          if (el && el.offsetTop <= scrollPosition) {
            currentHeading = heading;
          }
        } else {
          const titleSlug = heading.title.toLowerCase().replace(/\s+/g, '-');
          const el = document.getElementById(titleSlug);
          if (el && el.offsetTop <= scrollPosition) {
            currentHeading = heading;
          }
        }
      }

      setActiveSection(currentHeading?.title || INITIAL_OVERVIEW_TEXT);

      if (progressRef.current) {
        const scrollableDistance =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress =
          scrollableDistance > 0
            ? Math.min(Math.max(window.scrollY / scrollableDistance, 0), 1)
            : 0;

        progressRef.current.style.strokeDashoffset = (
          PROGRESS_CIRCLE_CIRCUMFERENCE *
          (1 - scrollProgress)
        ).toString();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, HEADER_OFFSET, PROGRESS_CIRCLE_CIRCUMFERENCE]);

  if (!headings || headings.length === 0) return null;

  return (
    <div className="fixed top-24 z-40 inset-x-4 w-auto md:hidden bg-background/95 backdrop-blur-md border border-border shadow-xl rounded-2xl overflow-hidden">
      {/* Header */}
      <div
        className="flex w-full cursor-pointer items-center justify-between px-4 py-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative flex items-center">
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
            <circle
              className="text-primary/20"
              cx="12"
              cy="12"
              r={PROGRESS_CIRCLE_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            />
            <circle
              ref={progressRef}
              className="text-primary"
              cx="12"
              cy="12"
              r={PROGRESS_CIRCLE_RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeDasharray={PROGRESS_CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={PROGRESS_CIRCLE_CIRCUMFERENCE}
              transform="rotate(-90 12 12)"
            />
          </svg>
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
            {activeSection}
          </span>
        </div>
        <ChevronDown
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </div>

      {/* Collapsible content */}
      <div
        className={cn(
          'transition-max-h duration-300 overflow-hidden',
          isOpen ? 'max-h-[80vh]' : 'max-h-0'
        )}
      >
        <ScrollArea
          ref={scrollAreaRef}
          className="max-h-[80vh] overflow-y-auto px-4 pb-4"
        >
          <ul className="flex list-none flex-col gap-y-2">
            {headings.map((heading, idx) => {
              const firstHeading = heading.headings?.[0];
              const href = firstHeading
                ? `#${firstHeading.slug}`
                : heading.subpostId
                  ? `/news/${heading.subpostId}`
                  : '#';

              return (
                <li key={heading.subpostId || `section-${idx}`}>
                  <a
                    href={href}
                    className={cn(
                      'block px-2 text-sm underline decoration-transparent underline-offset-[3px] transition-colors duration-200',
                      activeSection === heading.title
                        ? 'text-gray-900 dark:text-gray-100 font-semibold'
                        : 'text-gray-700 dark:text-gray-300'
                    )}
                    onClick={(e) => {
                      if (firstHeading) {
                        e.preventDefault();
                        const el = document.getElementById(firstHeading.slug);
                        if (el) {
                          el.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          });
                        }
                      }
                      setIsOpen(false); // collapse on click
                    }}
                  >
                    {heading.title}
                  </a>

                  {/* Nested headings */}
                  {heading.headings && heading.headings.length > 1 && (
                    <ul className="ml-4 mt-1 flex list-none flex-col gap-y-1">
                      {heading.headings.slice(1).map((h) => (
                        <li key={h.slug}>
                          <a
                            href={`#${h.slug}`}
                            className="text-xs text-gray-500 dark:text-gray-400 underline decoration-transparent underline-offset-[3px] transition-colors duration-200 hover:decoration-inherit"
                            onClick={(e) => {
                              e.preventDefault();
                              const el = document.getElementById(h.slug);
                              if (el) {
                                el.scrollIntoView({
                                  behavior: 'smooth',
                                  block: 'start',
                                });
                              }
                              setIsOpen(false);
                            }}
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
}
