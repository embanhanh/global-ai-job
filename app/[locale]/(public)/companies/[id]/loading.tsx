import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 dark:bg-slate-950 pt-20">
      {/* Header Loading */}
      <div className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="container mx-auto px-4 py-8 md:py-12 md:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <Skeleton className="h-24 w-24 rounded-2xl" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-64 md:w-80" />
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-32 rounded-full" />
                  <Skeleton className="h-6 w-28 rounded-full" />
                </div>
              </div>
            </div>
            <Skeleton className="h-10 w-full md:w-32 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 space-y-12 md:px-6">
        {/* About Loading */}
        <section className="space-y-4">
          <Skeleton className="h-8 w-40" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </section>

        {/* Jobs Loading */}
        <section className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-2xl" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
