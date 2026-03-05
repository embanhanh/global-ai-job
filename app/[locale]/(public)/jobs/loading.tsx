"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        {/* Sidebar Skeleton */}
        <aside className="w-full lg:w-72 space-y-8">
          <Skeleton className="h-10 w-full bg-white/5" />
          <div className="space-y-6">
            <Skeleton className="h-20 w-full bg-white/5" />
            <Skeleton className="h-20 w-full bg-white/5" />
            <Skeleton className="h-20 w-full bg-white/5" />
          </div>
        </aside>

        {/* List Skeleton */}
        <main className="flex-1 space-y-6">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-6 w-32 bg-white/5" />
            <Skeleton className="h-6 w-48 bg-white/5" />
          </div>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 w-full bg-white/5 rounded-3xl" />
          ))}
        </main>
      </div>
    </div>
  );
}
