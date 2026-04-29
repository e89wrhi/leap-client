import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

const defaultComputedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc.slug || doc._raw.flattenedPath.split('/').pop() || '',
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => {
      const parts = doc._raw.flattenedPath.split('/');
      return parts[parts.length - 1] || '';
    },
  },
};

export const Docs = defineDocumentType(() => ({
  name: 'Docs',
  filePathPattern: 'docs/**/*.{md,mdx}',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    date: { type: 'date', required: true },
    cover: { type: 'string', required: false },
    image: { type: 'string', required: false },
    description: { type: 'string', required: false },
    excerpt: { type: 'string', required: false },
    category: { type: 'string', required: false },
    order: { type: 'number', required: false },
    tags: { type: 'list', of: { type: 'string' } },
    authors: { type: 'list', of: { type: 'string' } },
    draft: { type: 'boolean' },
    version: { type: 'string', required: false },
    status: { type: 'string', required: false },
    startDate: { type: 'date', required: false },
    video: { type: 'string', required: false },
  },
  computedFields: defaultComputedFields,
}));

export const Page = defineDocumentType(() => ({
  name: 'Page',
  filePathPattern: 'pages/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
  },
  computedFields: defaultComputedFields,
}));

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Docs, Page],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeAutolinkHeadings,
      [rehypePrettyCode, { theme: 'github-dark', keepBackground: false }],
    ],
  },
});
