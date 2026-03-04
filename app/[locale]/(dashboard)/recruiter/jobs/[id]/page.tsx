import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getJobById } from "@/actions/jobs.actions";
import { getApplicationsByJobId } from "@/actions/applications.actions";
import { DEFAULT_HIRING_STEPS, HiringStep, Application } from "@/types/jobs";
import { JobDetailHeader } from "@/components/jobs/detail/job-detail-header";
import { JobContentTab } from "@/components/jobs/detail/job-content-tab";
import { ApplicantTable } from "@/components/jobs/detail/applicant-table";
import { JobHiringWorkflowTab } from "@/components/jobs/detail/job-hiring-workflow-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, FileText, Workflow } from "lucide-react";

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{
    page?: string;
    query?: string;
    stage?: string;
  }>;
}

export default async function JobDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { locale, id } = await params;
  const { page = "1", query = "", stage = "all" } = await searchParams;

  const currentPage = parseInt(page);
  const pageSize = 10;

  const t = await getTranslations({
    locale,
    namespace: "Dashboard.recruiter.jobs.detail",
  });

  const [jobResult, appsResult] = await Promise.all([
    getJobById(id),
    getApplicationsByJobId(id, {
      query,
      stage,
      page: currentPage,
      pageSize,
    }),
  ]);

  if (!jobResult.success || !jobResult.data) {
    notFound();
  }

  const job = jobResult.data;
  const applications = (
    appsResult.success ? appsResult.data : []
  ) as Application[];
  const totalPages =
    appsResult.success && "totalPages" in appsResult
      ? (appsResult.totalPages as number)
      : 1;

  const hiringSteps: HiringStep[] =
    Array.isArray(job.hiring_steps) && job.hiring_steps.length > 0
      ? (job.hiring_steps as HiringStep[])
      : DEFAULT_HIRING_STEPS;

  const companyName =
    (job.companies as { name: string; logo_url: string | null } | null)?.name ??
    null;

  return (
    <div className="space-y-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Sticky Header */}
      <JobDetailHeader
        jobId={id}
        title={job.title}
        status={job.status ?? "active"}
        location={job.location}
        jobType={job.job_type}
        salaryRange={job.salary_range}
        applicantsCount={job.applicants_count ?? applications.length}
        companyName={companyName}
        locale={locale}
      />

      {/* Tabs */}
      <Tabs defaultValue="applicants" className="space-y-6">
        <TabsList className="bg-white/5 border border-white/8 rounded-xl p-1 gap-1">
          <TabsTrigger
            value="applicants"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 rounded-lg text-sm flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            {t("tabs.applicants")}
            {applications.length > 0 && (
              <span className="bg-violet-500/30 text-violet-300 text-xs px-1.5 py-0.5 rounded-full ml-1">
                {applications.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="content"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 rounded-lg text-sm flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            {t("tabs.content")}
          </TabsTrigger>
          <TabsTrigger
            value="workflow"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 rounded-lg text-sm flex items-center gap-2"
          >
            <Workflow className="w-4 h-4" />
            {t("tabs.workflow")}
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/50 rounded-lg text-sm flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            {t("tabs.analytics")}
          </TabsTrigger>
        </TabsList>

        {/* Tab: Applicants */}
        <TabsContent value="applicants" className="mt-0">
          <ApplicantTable
            applications={applications}
            totalPages={totalPages}
            currentPage={currentPage}
            hiringSteps={hiringSteps}
            currentQuery={query}
            currentStage={stage}
          />
        </TabsContent>

        {/* Tab: Job Content */}
        <TabsContent value="content" className="mt-0">
          <JobContentTab
            description={job.description}
            jobType={job.job_type}
            location={job.location}
            salaryRange={job.salary_range}
            requirements={job.requirements as { value: string }[] | null}
            locale={locale}
          />
        </TabsContent>

        {/* Tab: Hiring Workflow */}
        <TabsContent value="workflow" className="mt-0">
          <JobHiringWorkflowTab
            jobId={id}
            applications={applications}
            hiringSteps={hiringSteps}
          />
        </TabsContent>

        {/* Tab: Analytics */}
        <TabsContent value="analytics" className="mt-0">
          <AnalyticsTab applications={applications} t={t} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── Inline Analytics Tab (simple, avoids extra file) ─────────────────────
function AnalyticsTab({
  applications,
  t,
}: {
  applications: Application[];
  t: Awaited<ReturnType<typeof getTranslations>>;
}) {
  const stageGroups = applications.reduce(
    (acc, app) => {
      const stage = app.stage ?? "sourcing";
      acc[stage] = (acc[stage] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const total = applications.length || 1;

  const stages = [
    { id: "sourcing", label: "Sourcing", color: "bg-slate-500" },
    { id: "screening", label: "Screening", color: "bg-blue-500" },
    { id: "interview", label: "Interview", color: "bg-violet-500" },
    { id: "offer", label: "Offer", color: "bg-amber-500" },
    { id: "hired", label: "Hired", color: "bg-emerald-500" },
  ];

  return (
    <div className="bg-white/2 rounded-2xl border border-white/8 p-8 space-y-6">
      <h3 className="text-sm font-semibold text-white/80">
        {t("tabs.analytics")} — Pipeline Funnel
      </h3>
      <div className="space-y-4">
        {stages.map((stage) => {
          const count = stageGroups[stage.id] ?? 0;
          const pct = Math.round((count / total) * 100);
          return (
            <div key={stage.id} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/60">{stage.label}</span>
                <span className="text-white/40">
                  {count} ({pct}%)
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full ${stage.color} rounded-full transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
