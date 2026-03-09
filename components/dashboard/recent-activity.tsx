import { getTranslations } from "next-intl/server";
import { getUserActivities } from "@/services/activity.service";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi, enUS } from "date-fns/locale";

interface RecentActivityProps {
  locale: string;
  className?: string;
}

export async function RecentActivity({
  locale,
  className,
}: RecentActivityProps) {
  const t = await getTranslations({
    locale,
    namespace: "Common.activity",
  });

  const activities = await getUserActivities(5); // Fetch top 5

  const dateLocale = locale === "vi" ? vi : enUS;

  if (!activities || activities.length === 0) {
    const tRecruiter = await getTranslations({
      locale,
      namespace: "Dashboard.recruiter.overview",
    });
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-40">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
          <TrendingUp className="w-8 h-8 text-neutral-400" />
        </div>
        <div>
          <p className="text-white font-medium">{tRecruiter("noActivity")}</p>
          <p className="text-sm text-white/50">
            {tRecruiter("noActivityDesc")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-white/5 bg-[#0a0a14]/40 p-6 space-y-6",
        className,
      )}
    >
      {activities.map((item, index) => {
        const isApplied = item.activity_key === "JOB_APPLIED";
        const isFollowed = item.activity_key === "RECRUITER_FOLLOWED";
        const isUpdated =
          item.activity_key === "PROFILE_UPDATED" ||
          item.activity_key === "APPLICATION_UPDATED";
        const isJobPosted =
          item.activity_key === "JOB_POSTED" ||
          item.activity_key === "NEW_JOB_POSTED";
        const isJobUpdated = item.activity_key === "JOB_UPDATED";

        return (
          <div key={item.id} className="flex gap-4 relative">
            {index !== activities.length - 1 && (
              <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-white/5" />
            )}
            <div
              className={cn(
                "w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 z-10",
                isApplied
                  ? "bg-blue-500/20 border border-blue-500/30"
                  : isFollowed
                    ? "bg-emerald-500/20 border border-emerald-500/30"
                    : isJobPosted
                      ? "bg-violet-500/20 border border-violet-500/30"
                      : isJobUpdated || isUpdated
                        ? "bg-amber-500/20 border border-amber-500/30"
                        : "bg-slate-500/20 border border-slate-500/30",
              )}
            >
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full shadow-lg",
                  isApplied
                    ? "bg-blue-400 shadow-blue-500/50"
                    : isFollowed
                      ? "bg-emerald-400 shadow-emerald-500/50"
                      : isJobPosted
                        ? "bg-violet-400 shadow-violet-500/50"
                        : isJobUpdated || isUpdated
                          ? "bg-amber-400 shadow-amber-500/50"
                          : "bg-slate-400 shadow-slate-500/50",
                )}
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-white/80">
                {t(
                  item.activity_key as Parameters<typeof t>[0],
                  item.metadata as Record<string, string | number>,
                )}
              </p>
              <p className="text-xs text-white/30">
                {formatDistanceToNow(new Date(item.created_at), {
                  addSuffix: true,
                  locale: dateLocale,
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
