import { JobCard } from "@/components/shared/job-card";
import { getTranslations } from "next-intl/server";
import { JobWithCompany } from "@/types/database";

export async function CompanyJobsList({ jobs }: { jobs: JobWithCompany[] }) {
  const t = await getTranslations("CompanyDetail");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
        {t("openRoles")}
      </h2>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center dark:border-slate-800 dark:bg-slate-900/50">
          <p className="text-slate-500 dark:text-slate-400">
            {t("noActiveJobs")}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
