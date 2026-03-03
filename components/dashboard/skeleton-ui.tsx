"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 bg-white/5" />
          <Skeleton className="h-4 w-48 bg-white/5" />
        </div>
        <Skeleton className="h-11 w-32 bg-white/5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="bg-[#0a0a14]/60 border-white/5 p-6 space-y-4"
          >
            <Skeleton className="h-4 w-24 bg-white/5" />
            <Skeleton className="h-8 w-16 bg-white/5" />
            <Skeleton className="h-3 w-32 bg-white/5" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-[#0a0a14]/60 border-white/5 p-8">
              <div className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded-full bg-white/5" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-1/3 bg-white/5" />
                  <Skeleton className="h-4 w-full bg-white/5" />
                  <Skeleton className="h-4 w-2/3 bg-white/5" />
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          <Card className="bg-[#0a0a14]/60 border-white/5 p-6 space-y-4">
            <Skeleton className="h-6 w-32 bg-white/5" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-3/4 bg-white/5" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
