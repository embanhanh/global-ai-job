import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TalentSearchSkeleton() {
  return (
    <div className="lg:col-span-3 space-y-4">
      <div className="flex items-center justify-between pb-2">
        <Skeleton className="h-4 w-32 bg-white/5" />
      </div>

      {[1, 2, 3].map((i) => (
        <Card
          key={i}
          className="bg-[#0a0a14]/60 backdrop-blur-xl border-white/5 p-6 animate-pulse"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full border border-white/10 bg-white/5" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40 bg-white/5" />
                    <Skeleton className="h-4 w-32 bg-white/5" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Skeleton className="h-6 w-24 rounded-full bg-white/5" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {[1, 2, 3, 4].map((s) => (
                  <Skeleton key={s} className="h-6 w-16 bg-white/5" />
                ))}
              </div>

              <div className="p-4 rounded-xl border border-white/5 bg-white/5 mt-4 space-y-2">
                <Skeleton className="h-3 w-20 bg-white/5" />
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-4 w-3/4 bg-white/5" />
              </div>
            </div>

            <div className="flex md:flex-col justify-end gap-2 md:w-40 mt-4 md:mt-0">
              <Skeleton className="flex-1 md:flex-none h-11 rounded-xl bg-white/5" />
              <Skeleton className="flex-1 md:flex-none h-11 rounded-xl bg-white/5" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
