import { getTranslations } from "next-intl/server";
import { KanbanBoard } from "@/components/dashboard/recruiter/applicants/kanban-board";
import { Applicant } from "@/components/dashboard/recruiter/applicants/kanban-card";
import { Search, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getApplicationsByRecruiter } from "@/actions/applications.actions";

export default async function ApplicantsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.recruiter.applicants",
  });

  const t_common = await getTranslations({
    locale,
    namespace: "Common",
  });

  const { data: applications = [], error } = await getApplicationsByRecruiter();

  if (error) {
    console.error("Failed to fetch applications:", error);
    throw new Error(error);
  }

  // Map database applications to UI format for KanbanBoard
  const mappedApplicants: Applicant[] = (applications || []).map((app) => ({
    id: app.id,
    name: app.profiles?.full_name || "Anonymous",
    role: app.jobs?.title || "Unknown position",
    fitScore: app.fit_score || 0,
    stage: app.stage,
    appliedDate: app.applied_date
      ? new Date(app.applied_date).toLocaleDateString()
      : "-",
    avatar: app.profiles?.avatar_url ?? undefined,
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {t("title")}
          </h1>
          <p className="text-white/50 mt-1">{t("subtitle")}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="border-white/10 text-white/70 hover:text-white h-11"
          >
            <Download className="w-4 h-4 mr-2" />
            {t_common("export")}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            placeholder={t("searchPlaceholder")}
            className="pl-10 bg-white/5 border-white/10 text-white h-11 focus:border-violet-500/50"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-white/10 text-white/70 hover:text-white h-11"
          >
            <Filter className="w-4 h-4 mr-2" />
            {t_common("filter")}
          </Button>
          <select className="bg-white/5 border border-white/10 text-white h-11 px-4 rounded-md focus:border-violet-500/50 outline-none text-sm">
            <option className="bg-[#0a0a14]">{t_common("allPositions")}</option>
          </select>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="relative -mx-4 md:-mx-8 px-4 md:px-8 overflow-hidden">
        <div className="max-w-full">
          {mappedApplicants.length > 0 ? (
            <KanbanBoard initialApplicants={mappedApplicants} />
          ) : (
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-2xl bg-white/5 text-center">
              <p className="text-white/50">
                {t("noApplicants") || "No applicants found."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
