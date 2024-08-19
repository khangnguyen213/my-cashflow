import React from 'react';
import { Skeleton } from './ui/skeleton';

function PageSkeleton() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-full h-14" />
      <Skeleton className="w-1/2 h-14" />
      <Skeleton className="w-1/2 h-14" />
    </div>
  );
}

export default PageSkeleton;
