import { DocHeader } from '@/components/doc/doc-header';

interface DocLayoutProps {
  children: React.ReactNode;
}

export default function DocLayout({ children }: DocLayoutProps) {
  return (
    <div className="flex w-full min-h-screen bg-white dark:bg-black">
      <DocHeader />
      <main className="w-full flex-1 pt-16">{children}</main>
    </div>
  );
}
