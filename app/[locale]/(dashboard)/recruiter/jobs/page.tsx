import { getTranslations } from "next-intl/server";
import { JobList } from "@/components/dashboard/recruiter/jobs/job-list";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Plus, Filter } from "lucide-react";
import { getJobs } from "@/actions/jobs.actions";
import { SearchInput } from "@/components/dashboard/recruiter/jobs/search-input";
import { Pagination } from "@/components/shared/pagination";

export default async function JobsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { locale } = await params;
  const { query, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const t = await getTranslations({
    locale,
    namespace: "Dashboard.recruiter.jobs",
  });

  const {
    data: jobs = [],
    error,
    pagination,
  } = await getJobs({
    query,
    page: currentPage,
    pageSize: 10,
  });

  if (error) {
    console.error("Failed to fetch jobs:", error);
    throw new Error(error);
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {t("title")}
          </h1>
          <p className="text-white/50 mt-1">{t("description")}</p>
        </div>
        <Button
          asChild
          className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl shadow-lg shadow-violet-500/20 px-6 h-12"
        >
          <Link href="/recruiter/jobs/new">
            <Plus className="w-5 h-5 mr-2" />
            {t("postJob")}
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <SearchInput
          placeholder={t("searchPlaceholder")}
          defaultValue={query}
          className="pl-10 bg-white/5 border-white/10 text-white h-11 focus:border-violet-500/50"
        />
        <Button
          variant="outline"
          className="border-white/10 hover:text-white hover:bg-white/5 h-11"
        >
          <Filter className="w-4 h-4 mr-2" />
          {t("filter")}
        </Button>
      </div>

      {jobs.length > 0 ? (
        <div className="space-y-6">
          <JobList jobs={jobs} />
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center pt-4">
              <Pagination
                totalPages={pagination.totalPages}
                currentPage={pagination.page}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed border-white/10 rounded-2xl bg-white/5 text-center">
          <p className="text-white/50 mb-4">
            {query
              ? t("noResults") || "No jobs found matching your search."
              : t("noJobs")}
          </p>
          {!query && (
            <Button asChild variant="outline">
              <Link href="/recruiter/jobs/new">{t("postJobNow")}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
