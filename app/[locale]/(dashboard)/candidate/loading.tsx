import { Skeleton } from "@/components/ui/skeleton";
export default function CandidateLoading() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-10 w-64 bg-white/5" />
        <Skeleton className="h-5 w-48 bg-white/5" />
      </div>
      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton className="h-32 rounded-2xl bg-white/5" />
        <Skeleton className="h-32 rounded-2xl bg-white/5" />
        <Skeleton className="h-32 rounded-2xl bg-white/5" />
      </div>
      {/* Recommendations Skeleton */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-7 w-48 bg-white/5" />
          <Skeleton className="h-5 w-20 bg-white/5" />
        </div>
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="min-w-[350px] h-[200px] rounded-2xl bg-white/5"
            />
          ))}
        </div>
      </div>
      {/* Activity Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-7 w-40 bg-white/5" />
        <div className="rounded-2xl border border-white/5 bg-[#0a0a14]/40 p-6 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="w-6 h-6 rounded-full bg-white/5" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-full bg-white/5" />
                <Skeleton className="h-3 w-24 bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
