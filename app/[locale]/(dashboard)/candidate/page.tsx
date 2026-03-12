import { getTranslations } from "next-intl/server";
import { StatsCard } from "@/components/dashboard/stats-card";
import {
  FileText,
  Calendar,
  BarChart,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { JobCard } from "@/components/shared/job-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { getCandidateDashboardStats } from "@/services/applications.service";
const mockRecommendedJobs = [
  {
    id: "1",
    title: "Senior AI Engineer",
    company: { name: "Google DeepMind", logo: null },
    location: "London, UK",
    type: "Full-time",
    salary: "$120k - $180k",
    postedAt: "2 days ago",
    matchScore: 95,
  },
  {
    id: "2",
    title: "Machine Learning Researcher",
    company: { name: "OpenAI", logo: null },
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$150k - $220k",
    postedAt: "1 day ago",
    matchScore: 92,
  },
  {
    id: "3",
    title: "Computer Vision Engineer",
    company: { name: "Tesla", logo: null },
    location: "Palo Alto, CA",
    type: "Full-time",
    salary: "$130k - $190k",
    postedAt: "3 days ago",
    matchScore: 88,
  },
];

export default async function CandidateOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.candidate.overview",
  });
  const { data: stats } = await getCandidateDashboardStats();

  return (
    <div className="space-y-8">
      {/* Header & Welcome */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("welcome")}</p>
      </div>
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/candidate/applications">
          <StatsCard
            title={t("stats.totalApplications")}
            value={stats?.totalApplications || 0}
            icon={FileText}
            className="hover:border-violet-500/50 cursor-pointer transition-colors"
          />
        </Link>
        <Link href="/candidate/applications?stage=interview">
          <StatsCard
            title={t("stats.activeInterviews")}
            value={stats?.activeInterviews || 0}
            icon={Calendar}
            className="hover:border-violet-500/50 cursor-pointer transition-colors"
          />
        </Link>
        <StatsCard
          title={t("stats.avgMatchScore")}
          value={"--%"}
          icon={BarChart}
          className="border-primary/20 bg-primary/5"
        />
      </div>
      {/* AI Recommendations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            <h2 className="text-xl font-bold">{t("recommendations.title")}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-violet-400 hover:text-violet-300"
          >
            <Link href="/jobs" className="flex items-center gap-2">
              {t("recommendations.viewAll")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
          <Suspense
            fallback={
              <div className="flex gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton
                    key={i}
                    className="min-w-[350px] h-[200px] rounded-2xl bg-muted"
                  />
                ))}
              </div>
            }
          >
            {mockRecommendedJobs.map((job) => (
              <div key={job.id} className="min-w-[350px] relative group">
                <div className="absolute top-4 right-4 z-10 px-2 py-1 rounded-full bg-violet-600/20 border border-violet-500/30 text-[10px] font-bold text-violet-400">
                  {t("recommendations.match", { score: job.matchScore })}
                </div>
                <JobCard
                  job={{
                    id: job.id,
                    title: job.title,
                    location: job.location,
                    job_type: job.type,
                    salary_range: job.salary,
                    created_at: new Date().toISOString(),
                    company_id: "",
                    recruiter_id: "",
                    status: "active",
                    views_count: 0,
                    company: {
                      id: "",
                      name: job.company.name,
                      logo_url: job.company.logo,
                      website: null,
                      description: null,
                      location: null,
                      industry: null,
                      created_at: new Date().toISOString(),
                    },
                    description: null,
                    requirements: null,
                    benefits: null,
                    hiring_steps: null,
                    category: null,
                    level: null,
                    updated_at: new Date().toISOString(),
                  }}
                />
              </div>
            ))}
          </Suspense>
        </div>
      </section>
      {/* Recent Activity */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">{t("activity.title")}</h2>
        <Suspense
          fallback={
            <div className="h-[300px] flex items-center justify-center">
              <Skeleton className="w-[100px] h-[100px] rounded-full" />
            </div>
          }
        >
          <RecentActivity locale={locale} />
        </Suspense>
      </section>
    </div>
  );
}
