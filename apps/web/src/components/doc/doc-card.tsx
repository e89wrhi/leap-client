import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Docs } from '.contentlayer/generated';
import { formatDate } from '@/lib/utils';

interface DocCardProps {
  item: Docs;
  readTime: string;
}

export default function DocCard({ item, readTime }: DocCardProps) {
  const postUrl = `/docs/${item.slug}`;

  return (
    <div className="hover:bg-muted/50 p-4 rounded-2xl duration-300 ease-in-out">
      <Link href={postUrl} className="flex flex-col gap-6 sm:flex-row group">
        <div className="flex items-center h-30 w-30 justify-center bg-black dark:bg-white rounded-2xl">
          <Image
            src={'/logo.png'}
            alt={item.title}
            height={100}
            width={100}
            className="h-15 w-15 object-cover duration-300 group-hover:scale-[1.02]"
          // The original component used explicit width/height which is less common with Next/Image fill
          />
        </div>

        {/* Content Area */}
        <div className="grow">
          <h3 className="mb-1 mt-2 text-lg font-medium group-hover:text-primary transition-colors">
            {item.title}
          </h3>
          <p className="text-muted-foreground mb-2 text-sm">
            {item.description}
          </p>

          {/* Metadata Section */}
          <div className="text-muted-foreground mb-2 flex flex-wrap items-center gap-x-2 text-xs">
            {/* Date and Read Time */}
            <span>{formatDate(new Date(item.date))}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
