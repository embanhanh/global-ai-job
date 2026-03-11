import { Suspense } from "react";
import { TalentSearchHeader } from "@/components/dashboard/recruiter/talent-search/talent-search-header";
import { TalentSearchFilters } from "@/components/dashboard/recruiter/talent-search/talent-search-filters";
import { TalentSearchList } from "@/components/dashboard/recruiter/talent-search/talent-search-list";
import { TalentSearchSkeleton } from "@/components/dashboard/recruiter/talent-search/talent-search-skeleton";


export default async function TalentSearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query?.toString() || "";


  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <TalentSearchHeader />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          <TalentSearchFilters />
        </div>

        <Suspense key={query} fallback={<TalentSearchSkeleton />}>
          <TalentSearchList query={query} locale={locale} />
        </Suspense>
      </div>
    </div>
  );
}
