'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { TOCSection } from '@/lib/contentlayer';

interface Props {
  sections: TOCSection[];
}

export function DOCTOCSidebar({ sections }: Props) {
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const tocContainerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const HEADER_OFFSET = 180;

  const buildRegions = useCallback(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>(
        '.prose h2, .prose h3, .prose h4, .prose h5, .prose h6'
      )
    );
    const regions = headings.map((heading, idx) => {
      const next = headings[idx + 1];
      return {
        id: heading.id,
        start: heading.offsetTop,
        end: next ? next.offsetTop : document.body.scrollHeight,
      };
    });
    return { headings, regions };
  }, []);

  const getVisibleIds = useCallback(
    (regions: { id: string; start: number; end: number }[]) => {
      const viewportTop = window.scrollY + HEADER_OFFSET;
      const visible = regions
        .filter((r) => r.start <= viewportTop && r.end > viewportTop)
        .map((r) => r.id);
      return visible.length
        ? visible
        : regions.length
          ? [regions[regions.length - 1]!.id]
          : [];
    },
    []
  );

  const scrollToActive = useCallback((ids: string[]) => {
    if (!scrollAreaRef.current || !ids.length) return;
    const activeLink = scrollAreaRef.current.querySelector<HTMLElement>(
      `[data-heading-link="${ids[0]}"]`
    );
    if (!activeLink) return;

    const { top: areaTop, height: areaHeight } =
      scrollAreaRef.current.getBoundingClientRect();
    const { top: linkTop, height: linkHeight } =
      activeLink.getBoundingClientRect();
    const targetScroll = Math.max(
      0,
      Math.min(
        linkTop -
          areaTop +
          scrollAreaRef.current.scrollTop -
          (areaHeight - linkHeight) / 2,
        scrollAreaRef.current.scrollHeight - scrollAreaRef.current.clientHeight
      )
    );
    if (Math.abs(targetScroll - scrollAreaRef.current.scrollTop) > 5) {
      scrollAreaRef.current.scrollTop = targetScroll;
    }
  }, []);

  const handleScroll = useCallback(() => {
    const { regions } = buildRegions();
    const newActive = getVisibleIds(regions);
    if (JSON.stringify(newActive) !== JSON.stringify(activeIds)) {
      setActiveIds(newActive);
      scrollToActive(newActive);
    }
  }, [activeIds, buildRegions, getVisibleIds, scrollToActive]);

  useEffect(() => {
    handleScroll();
    const options = { passive: true } as const;
    window.addEventListener('scroll', handleScroll, options);
    window.addEventListener('resize', handleScroll, options);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  if (!sections.length) return null;

  return (
    <div
      ref={tocContainerRef}
      id="toc-sidebar-container"
      className="sticky top-24 w-64 hidden md:block"
    >
      <div
        ref={scrollAreaRef}
        data-toc-scroll-area
        className="flex max-h-[calc(100vh-8rem)] flex-col overflow-y-auto"
      >
        <span className="text-lg font-semibold mb-3">Table of Contents</span>
        <ul className="flex flex-col gap-2 list-none">
          {sections.map((section) =>
            section.headings.map((h) => (
              <li
                key={h.slug}
                className={cn(
                  'text-sm transition-colors duration-200',
                  activeIds.includes(h.slug)
                    ? 'text-gray-900 dark:text-gray-100 font-semibold'
                    : 'text-gray-600 dark:text-gray-400'
                )}
              >
                <a
                  href={`#${h.slug}`}
                  data-heading-link={h.slug}
                  className="underline decoration-transparent underline-offset-[3px] transition-colors duration-200 hover:decoration-indigo-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  {h.text}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
