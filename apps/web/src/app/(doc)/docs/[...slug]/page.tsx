import React from 'react';
import { cn, formatDate } from '@/lib/utils';
import { BookOpenText, LibraryBig } from 'lucide-react';
import Breadcrumbs, { BreadcrumbItemProps } from '@/components/doc/breadcrum';
import {
  getCombinedReadingTime,
  getDocsTOCSections,
  getPostReadingTime,
} from '@/lib/contentlayer';
import ContentWidthWrapper from '@/components/layout/content-width-wrapper';
import TOCHeader from '@/components/doc/toc-header';
import ScrollToTopButton from '@/components/doc/scroll-to-top-button';
import DocsContent from '@/components/doc/docs-content';
import { DOCTOCSidebar } from '@/components/doc/doc-toc-sidebar';
import { allDocs } from '.contentlayer/generated';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function DocPage({ params }: PostPageProps) {
  const par = await params;
  const currentSlug = Array.isArray(par.slug) ? par.slug.join('/') : par.slug;
  const post = allDocs.find((i) => i.slug == currentSlug);
  if (!post) {
    return (
      <ContentWidthWrapper className="max-w-5xl">
        <h1 className="text-3xl text-center pt-20">404 - Post Not Found</h1>
      </ContentWidthWrapper>
    );
  }

  const data = post;
  const postReadingTime = getPostReadingTime(post);
  const combinedReadingTime = getCombinedReadingTime(data);
  const tocSections = await getDocsTOCSections(data.slugAsParams);
  const breadcrumbItems: BreadcrumbItemProps[] = [
    { href: '/docs', label: 'Docs', icon: LibraryBig },
  ];
  breadcrumbItems.push({
    href: `/docs/${currentSlug}`,
    label: data.title,
    icon: BookOpenText,
  });

  const mainContentStart = 'lg:col-start-2';

  return (
    <>
      <ContentWidthWrapper className="max-w-7xl">
        {tocSections.length > 0 && <TOCHeader headings={tocSections} />}

        {/* Breadcrumbs */}
        <div className={mainContentStart}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div
          className={cn(
            mainContentStart,
            'grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8'
          )}
        >
          {/* Sidebar */}
          {tocSections.length > 0 && (
            <div className="relative">
              <DOCTOCSidebar sections={tocSections} />
            </div>
          )}

          {/* Main content */}
          <article className="prose max-w-none">
            <DocsContent code={post.body.code} />
          </article>
        </div>

        {/* Scroll-to-top Button */}
        <ScrollToTopButton />
        <div className="text-muted-foreground divide-border mb-4 flex flex-col items-center justify-start divide-y text-xs sm:flex-row sm:flex-wrap sm:divide-x sm:divide-y-0 sm:text-sm">
          {/* Date */}
          <div className="flex w-full items-center justify-center gap-2 py-2 sm:w-auto sm:px-3 sm:py-0">
            <span>{formatDate(new Date(post.date))}</span>
          </div>

          {/* Reading Time */}
          <div className="flex w-full items-center justify-center gap-2 py-2 sm:w-auto sm:px-3 sm:py-0">
            <span>
              {postReadingTime}
              {combinedReadingTime &&
                combinedReadingTime !== postReadingTime && (
                  <span className="text-muted-foreground">
                    {' '}
                    ({combinedReadingTime} total)
                  </span>
                )}
            </span>
          </div>
        </div>
      </ContentWidthWrapper>
    </>
  );
}
