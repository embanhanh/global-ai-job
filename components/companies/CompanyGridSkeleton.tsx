import { Skeleton } from "@/components/ui/skeleton";

export function CompanyGridSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/50 p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50"
          >
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-16 w-16 rounded-xl" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
            <div className="mt-5 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="mt-6 flex gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
