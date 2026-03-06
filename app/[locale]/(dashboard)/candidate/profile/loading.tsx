import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column: AI Parser & Info */}
        <div className="lg:col-span-1 space-y-8">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <Skeleton className="h-[150px] w-full rounded-xl" />
        </div>

        {/* Right column: Form */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border p-8 space-y-10">
            {/* Form Sections */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="h-7 w-40" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
            <div className="pt-6 border-t flex justify-end">
              <Skeleton className="h-11 w-32" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
