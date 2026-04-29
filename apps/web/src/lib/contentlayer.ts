import { allDocs, type Docs } from '.contentlayer/generated';
import { calculateWordCountFromHtml, readingTime } from './data';
import { extractHeadings } from './headings';

interface DocsNavigation {
  newer?: Docs | null;
  older?: Docs | null;
}

// docs
export async function getAdjacentDocs(
  currentPostId: string
): Promise<DocsNavigation> {
  const currentPost = await getDocById(currentPostId);
  if (!currentPost) return { newer: null, older: null };

  // Fetch all posts (you can scope to the same category if needed)
  const allPosts = await getAllDocs(); // Implement to return Post[]

  // Sort by date ascending (oldest first)
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const currentIndex = sortedPosts.findIndex((p) => p.slug === currentPostId);
  const older = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const newer =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  return { newer, older };
}

export function getAllDocs(): Docs[] {
  return allDocs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getDocById(id: string): Docs | null {
  return (
    getAllDocs().find(
      (p) => p.slugAsParams === id || p.slugAsParams.split('/').pop() === id // fallback to file name
    ) || null
  );
}

export function getDocsTopics(): string[] {
  return Array.from(
    new Set(
      allDocs
        .map((doc) => doc.category)
        .filter((category): category is string => Boolean(category))
    )
  ).sort();
}

export function getDocsByTopic(topic: string): Docs[] {
  return getAllDocs().filter((doc) => doc.category === topic);
}

// common
export function getPostReadingTime(post: Docs): string {
  const words = calculateWordCountFromHtml(post.body.raw);
  return readingTime(words);
}

export function getCombinedReadingTime(post: Docs): string {
  let total = calculateWordCountFromHtml(post.body.raw);
  return readingTime(total);
}

export interface TOCHeading {
  slug: string;
  text: string;
  depth: number;
  isSubpostTitle?: boolean;
}

export interface TOCSection {
  type: 'parent' | 'subpost';
  title: string;
  headings: TOCHeading[];
  subpostId?: string;
}

export async function getDocsTOCSections(slug: string): Promise<TOCSection[]> {
  const post = await getDocById(slug);
  if (!post) return [];

  const currentPostHeadings = extractHeadings(post.body.raw);
  if (currentPostHeadings.length === 0) return [];

  return [
    {
      type: 'parent',
      title: 'Table of Contents',
      headings: currentPostHeadings.map((h) => ({
        slug: h.slug,
        text: h.text,
        depth: h.depth,
      })),
    },
  ];
}
