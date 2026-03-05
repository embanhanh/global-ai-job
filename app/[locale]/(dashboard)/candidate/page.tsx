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
import { cn } from "@/lib/utils";
// Mock data
const mockStats = {
  totalApplications: 12,
  activeInterviews: 3,
  avgMatchScore: 84,
};
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
const mockActivity = [
  {
    id: "1",
    type: "applied",
    job: "Senior AI Engineer",
    company: "Google DeepMind",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "interview",
    job: "Machine Learning Researcher",
    company: "OpenAI",
    timestamp: "1 day ago",
  },
  {
    id: "3",
    type: "statusChange",
    job: "Computer Vision Engineer",
    company: "Tesla",
    status: "In Review",
    timestamp: "2 days ago",
  },
];
export default async function CandidateOverviewPage() {
  const t = await getTranslations("Dashboard.candidate.overview");
  return (
    <div className="space-y-8">
      {/* Header & Welcome */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-white/50">{t("welcome")}</p>
      </div>
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title={t("stats.totalApplications")}
          value={mockStats.totalApplications}
          icon={FileText}
          trend={{ value: 20, isPositive: true }}
        />
        <StatsCard
          title={t("stats.activeInterviews")}
          value={mockStats.activeInterviews}
          icon={Calendar}
          trend={{ value: 50, isPositive: true }}
        />
        <StatsCard
          title={t("stats.avgMatchScore")}
          value={`${mockStats.avgMatchScore}%`}
          icon={BarChart}
          className="border-violet-500/20 bg-violet-600/5"
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
                    className="min-w-[350px] h-[200px] rounded-2xl bg-white/5"
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
        <div className="rounded-2xl border border-white/5 bg-[#0a0a14]/40 p-6 space-y-6">
          {mockActivity.map((item, index) => (
            <div key={item.id} className="flex gap-4 relative">
              {index !== mockActivity.length - 1 && (
                <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-white/5" />
              )}
              <div
                className={cn(
                  "w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 z-10",
                  item.type === "applied"
                    ? "bg-blue-500/20 border border-blue-500/30"
                    : item.type === "interview"
                      ? "bg-emerald-500/20 border border-emerald-500/30"
                      : "bg-amber-500/20 border border-amber-500/30",
                )}
              >
                <div
                  className={cn(
                    "w-1.5 h-1.5 rounded-full shadow-lg",
                    item.type === "applied"
                      ? "bg-blue-400 shadow-blue-500/50"
                      : item.type === "interview"
                        ? "bg-emerald-400 shadow-emerald-500/50"
                        : "bg-amber-400 shadow-amber-500/50",
                  )}
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-white/80">
                  {item.type === "applied" &&
                    t("activity.applied", {
                      job: item.job,
                      company: item.company,
                    })}
                  {item.type === "interview" &&
                    t("activity.interview", { job: item.job })}
                  {item.type === "statusChange" &&
                    t("activity.statusChange", {
                      job: item.job,
                      status: item.status || "",
                    })}
                </p>
                <p className="text-xs text-white/30">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
