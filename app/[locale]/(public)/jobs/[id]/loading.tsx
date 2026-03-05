"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Skeleton for Header */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-24 bg-white/5" />
          <Skeleton className="h-12 w-3/4 bg-white/5" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-32 bg-white/5" />
            <Skeleton className="h-6 w-32 bg-white/5" />
            <Skeleton className="h-6 w-32 bg-white/5" />
          </div>
        </div>

        {/* Skeleton for Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-64 w-full bg-white/5 rounded-3xl" />
            <Skeleton className="h-64 w-full bg-white/5 rounded-3xl" />
          </div>
          <aside>
            <Skeleton className="h-96 w-full bg-white/5 rounded-3xl" />
          </aside>
        </div>
      </div>
    </div>
  );
}
