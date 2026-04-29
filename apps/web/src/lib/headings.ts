import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';

export interface TOCHeading {
  depth: number;
  text: string;
  slug: string;
}

export function extractHeadings(raw: string): TOCHeading[] {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(raw);
  const headings: TOCHeading[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getText(node: any): string {
    if (!node) return '';
    if (node.type === 'text') return node.value ?? '';
    if (Array.isArray(node.children))
      return node.children.map(getText).join('');
    return '';
  }

  visit(tree, 'heading', (node) => {
    const text = getText(node).trim();
    if (!text) return;

    const slug = text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    headings.push({ depth: node.depth, text, slug });
  });

  return headings;
}
