import { JobCard } from "@/components/shared/job-card";
import { getTranslations } from "next-intl/server";
import { JobWithCompany } from "@/types/database";

export async function CompanyJobsList({ jobs }: { jobs: JobWithCompany[] }) {
  const t = await getTranslations("CompanyDetail");

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground">
        {t("openRoles")}
      </h2>

      {jobs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-8 text-center">
          <p className="text-muted-foreground">
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
