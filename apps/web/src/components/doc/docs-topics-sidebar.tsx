import Link from 'next/link';
import { cn } from '@/lib/utils';

interface DocsTopicsSidebarProps {
  topics: string[];
  activeTopic?: string;
}

export function DocsTopicsSidebar({
  topics,
  activeTopic,
}: DocsTopicsSidebarProps) {
  return (
    <aside className="sticky top-24 hidden h-fit w-64 shrink-0 md:block">
      <div className="rounded-2xl p-4">
        <h3 className="mb-3 text-sm font-bold">Topics</h3>

        <nav className="flex flex-col gap-1">
          {topics.map((topic) => {
            const isActive = topic === activeTopic;

            return (
              <Link
                key={topic}
                href={{
                  pathname: '/docs',
                  query: { topic },
                }}
                className={cn(
                  'rounded-md px-3 py-2 rounded-2xl text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-white dark:text-black font-medium'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {topic.replace(/-/g, ' ')}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
