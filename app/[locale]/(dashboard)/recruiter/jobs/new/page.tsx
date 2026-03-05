import { getTranslations } from "next-intl/server";
import { JobForm } from "@/components/dashboard/recruiter/jobs/job-form";
import { ChevronLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getRecruiterCompany } from "@/services/companies.service";

export default async function NewJobPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.recruiter.jobs.form",
  });
  const t_common = await getTranslations({
    locale,
    namespace: "Common",
  });

  const companyResult = await getRecruiterCompany();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <Link
          href="/recruiter/jobs"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group px-1"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t_common("backToList")}
        </Link>
        <div className="pt-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {t("title")}
          </h1>
          <p className="text-white/50 mt-1">{t("subtitle")}</p>
        </div>
      </div>

      <JobForm company={companyResult.data} />
    </div>
  );
}
