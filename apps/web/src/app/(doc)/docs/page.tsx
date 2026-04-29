import DocCard from '@/components/doc/doc-card';
import Breadcrumbs from '@/components/doc/breadcrum';
import ContentWidthWrapper from '@/components/layout/content-width-wrapper';
import PaginationComponent from '@/components/doc/pagination';
import {
  getAllDocs,
  getDocsByTopic,
  getDocsTopics,
  getPostReadingTime,
} from '@/lib/contentlayer';
import { BookCopy, LibraryBig } from 'lucide-react';
import React from 'react';
import { DocsTopicsSidebar } from '@/components/doc/docs-topics-sidebar';

interface DocsPageProps {
  searchParams: Promise<{
    topic?: string;
    page?: string;
  }>;
}
export default async function DocsPage({ searchParams }: DocsPageProps) {
  const { topic } = await searchParams;
  // 1. Fetch all posts (sorted, non-draft)
  const allPosts = getAllDocs();
  const publishedPosts = allPosts.filter((post) => !post.draft);

  // 2. Mock Pagination logic (for page 1)
  const pageSize = 10;
  const currentPage = 1;
  const totalPages = Math.ceil(publishedPosts.length / pageSize);

  // 3. Group by year
  const topics = getDocsTopics();
  const activeTopic = topic && topics.includes(topic) ? topic : topics[0];
  const postsByTopic = getDocsByTopic(activeTopic ?? '');

  return (
    <ContentWidthWrapper className="max-w-6xl">
      {/* PageHead logic handled by returning metadata object in Next.js */}
      <Breadcrumbs
        items={[
          { href: '/docs', label: 'Documentation', icon: LibraryBig },
          { label: `Page ${currentPage}`, icon: BookCopy },
        ]}
      />

      <div className="flex gap-8">
        <DocsTopicsSidebar topics={topics} activeTopic={activeTopic} />
        <div className="flex min-h-[calc(100vh-18rem)] flex-1 flex-col gap-y-8">
          <div className="flex flex-col gap-4">
            {postsByTopic.map((post) => {
              const readTime = getPostReadingTime(post);
              return (
                <DocCard key={post.slug} item={post} readTime={readTime} />
              );
            })}
          </div>
        </div>
      </div>

      <PaginationComponent
        currentPage={currentPage}
        totalPages={totalPages}
        baseUrl="/docs/"
      />
    </ContentWidthWrapper>
  );
}
