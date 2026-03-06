import { Skeleton } from "@/components/ui/skeleton";

export function SavedJobsLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4"
          >
            <div className="flex items-start gap-4">
              <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
              <div className="space-y-2 grow">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
            <div className="pt-4 flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
