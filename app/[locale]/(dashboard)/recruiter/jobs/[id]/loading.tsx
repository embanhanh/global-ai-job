import { Skeleton } from "@/components/ui/skeleton";

export default function JobDetailLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Sticky Header Skeleton */}
      <div className="border-b border-white/5 pb-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-64 bg-white/5 rounded-lg" />
              <Skeleton className="h-5 w-16 bg-white/5 rounded-full" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-4 w-24 bg-white/5 rounded" />
              <Skeleton className="h-4 w-20 bg-white/5 rounded" />
              <Skeleton className="h-4 w-28 bg-white/5 rounded" />
            </div>
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28 bg-white/5 rounded-lg" />
            <Skeleton className="h-9 w-28 bg-white/5 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <Skeleton className="h-12 w-full bg-white/5 rounded-xl" />

      {/* Table Skeleton */}
      <div className="rounded-2xl border border-white/8 overflow-hidden bg-white/2">
        <div className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-2">
              <Skeleton className="h-8 w-8 rounded-full bg-white/5" />
              <Skeleton className="h-4 w-40 bg-white/5 rounded" />
              <Skeleton className="h-4 w-24 bg-white/5 rounded ml-auto" />
              <Skeleton className="h-5 w-20 bg-white/5 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
