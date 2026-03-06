import { Skeleton } from "@/components/ui/skeleton";

export function SettingsLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-48 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-8 rounded-3xl border border-white/5 bg-[#0a0a14]/40 flex flex-col h-full"
          >
            <div className="flex items-start gap-4 mb-4">
              <Skeleton className="w-12 h-12 rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <div className="flex-1 space-y-4 pt-4">
              <Skeleton className="h-12 w-full rounded-xl" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
