import { getJobs } from "@/services/jobs.service";
import { JobCard } from "@/components/shared/job-card";
import { Pagination } from "@/components/shared/pagination";
import { JobSearchParams } from "@/types/jobs";
import { JobSearchHeader } from "@/components/jobs/listing/job-search-header";
import { JobFilters } from "@/components/jobs/listing/job-filters";
import { JobListHeader } from "@/components/jobs/listing/job-list-header";
import { JobListEmpty } from "@/components/jobs/listing/job-list-empty";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<JobSearchParams>;
}

export default async function JobListingPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const page = Number(resolvedSearchParams.page) || 1;
  const limit = 10;

  const { data: jobs, count } = await getJobs({
    ...resolvedSearchParams,
    page,
    pageSize: limit,
  });

  const totalPages = Math.ceil((count || 0) / limit);

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 relative z-10">
        <JobSearchHeader
          key={JSON.stringify(resolvedSearchParams)}
          initialParams={resolvedSearchParams}
        />

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <JobFilters searchParams={resolvedSearchParams} />

          {/* Jobs List */}
          <div className="flex-1">
            <JobListHeader
              count={count || 0}
              searchParams={resolvedSearchParams}
            />

            <div className="space-y-4">
              {jobs.length > 0 ? (
                <>
                  <div className="flex flex-col gap-3">
                    {jobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        locale={resolvedParams.locale}
                      />
                    ))}
                  </div>

                  <div className="mt-12 flex justify-center">
                    <Pagination totalPages={totalPages} currentPage={page} />
                  </div>
                </>
              ) : (
                <JobListEmpty />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
