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
          <h1 className="text-3xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-1">{t("welcome")}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-lg shadow-primary/20 px-6 h-12 font-medium">
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
        <Card className="lg:col-span-2 bg-card/60 backdrop-blur-xl border-border p-6 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              {t("activityFeed")}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
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
        <Card className="bg-linear-to-br from-primary/20 to-indigo-500/20 backdrop-blur-xl border border-primary/20 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold">
              {t("optimizeTitle")}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("optimizeDesc")}
            </p>
          </div>
          <Button className="w-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary transition-colors border border-primary/20 rounded-xl mt-6">
            {t("tryNow")}
          </Button>
        </Card>
      </div>
    </div>
  );
}
