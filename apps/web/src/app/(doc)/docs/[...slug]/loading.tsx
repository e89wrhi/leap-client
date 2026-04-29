import { Spinner } from '@/components/ui/spinner';
import React from 'react';

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Spinner className="h-10 w-10" />
    </div>
  );
}
