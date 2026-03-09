import { getTranslations } from "next-intl/server";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  Briefcase,
  Users,
  Target,
  TrendingUp,
  Clock,
  MoreHorizontal,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export default async function RecruiterDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.recruiter.overview",
  });

  // Mock data for initial UI
  const stats = [
    {
      title: t("jobsCount"),
      value: 12,
      icon: Briefcase,
      trend: { value: 8, isPositive: true },
      description: t("activeJobsDesc"),
    },
    {
      title: t("applicantsCount"),
      value: 48,
      icon: Users,
      trend: { value: 12, isPositive: true },
      description: t("newApplicantsDesc"),
    },
    {
      title: t("avgFitScore"),
      value: "84%",
      icon: Target,
      trend: { value: 5, isPositive: true },
      description: t("matchRateDesc"),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {t("title")}
          </h1>
          <p className="text-white/50 mt-1">{t("welcome")}</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl shadow-lg shadow-violet-500/20 px-6 h-12 font-medium">
          {t("postJob")}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed Placeholder */}
        <Card className="lg:col-span-2 bg-[#0a0a14]/60 backdrop-blur-xl border-white/5 p-6 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-violet-400" />
              {t("activityFeed")}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/40 hover:text-white"
            >
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            <Suspense
              fallback={
                <div className="h-full flex flex-col items-center justify-center space-y-4">
                  <Skeleton className="w-[100px] h-[100px] rounded-full" />
                </div>
              }
            >
              <RecentActivity
                locale={locale}
                className="border-0 bg-transparent p-0"
              />
            </Suspense>
          </div>
        </Card>

        {/* Quick Tips or AI Recommendations Placeholder */}
        <Card className="bg-linear-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-xl border border-violet-500/20 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">
              {t("optimizeTitle")}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {t("optimizeDesc")}
            </p>
          </div>
          <Button className="w-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white border border-white/10 rounded-xl mt-6">
            {t("tryNow")}
          </Button>
        </Card>
      </div>
    </div>
  );
}
