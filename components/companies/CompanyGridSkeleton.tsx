import { Skeleton } from "@/components/ui/skeleton";

export function CompanyGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div 
          key={i} 
          className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/50 p-6 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="h-16 w-16 rounded-xl bg-muted" />
            <Skeleton className="h-9 w-24 rounded-lg bg-muted" />
          </div>
          
          <div className="mt-5 space-y-3">
            <Skeleton className="h-6 w-3/4 bg-muted" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-muted" />
              <Skeleton className="h-4 w-5/6 bg-muted" />
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full bg-muted" />
            <Skeleton className="h-6 w-24 rounded-full bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
