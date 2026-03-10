import { Skeleton } from "@/components/ui/skeleton";
import { CompanyGridSkeleton } from "@/components/companies/CompanyGridSkeleton";

export default function Loading() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20 dark:bg-slate-950 pt-20">
      <div className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
        <div className="container mx-auto px-4 py-12 md:py-16 md:px-6">
          <Skeleton className="h-10 w-64 md:h-12 md:w-96" />
          <Skeleton className="mt-4 h-6 w-full max-w-2xl" />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 flex flex-col items-start gap-8 md:px-6 lg:flex-row">
        {/* Left Sidebar Skeleton */}
        <aside className="w-full shrink-0 lg:w-64">
          <div className="space-y-6">
            <div>
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-5 w-32" />
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Right Content Skeleton */}
        <main className="flex-1 w-full space-y-6 min-w-0">
          <Skeleton className="h-12 w-full rounded-xl" />
          <CompanyGridSkeleton />
        </main>
      </div>
    </div>
  );
}
