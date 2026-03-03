import { Skeleton } from "@/components/ui/skeleton";
import { AuthCard } from "@/components/shared/auth-card";

export default function AuthLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <AuthCard>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-48 mx-auto bg-white/5" />
            <Skeleton className="h-4 w-64 mx-auto bg-white/5" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 bg-white/5" />
            <Skeleton className="h-10 bg-white/5" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full bg-white/5" />
            <Skeleton className="h-10 w-full bg-white/5" />
            <Skeleton className="h-11 w-full bg-white/10" />
          </div>
        </div>
      </AuthCard>
    </div>
  );
}
