'use client';

import React from 'react';
import { Mdx } from '@/components/doc/mdx-components';

interface ContentProps {
  code: string;
}
export default function DocsContent({ code }: ContentProps) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <Mdx code={code} />
    </div>
  );
}
