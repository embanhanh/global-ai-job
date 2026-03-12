import { getPublicCompanies } from "@/services/companies-public.service";
import { CompanyCard } from "@/components/shared/CompanyCard";
import { getTranslations } from "next-intl/server";
import { Building2 } from "lucide-react";
import { Pagination } from "@/components/shared/pagination";

interface CompanyGridProps {
  searchParams: {
    q?: string;
    industry?: string;
    page?: string;
  };
  followingIds: string[];
}

export async function CompanyGrid({
  searchParams,
  followingIds,
}: CompanyGridProps) {
  const result = await getPublicCompanies(searchParams);
  const t = await getTranslations("Companies.search");

  if (!result.success || !result.data || result.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 py-24 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Building2 className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          {t("noResults")}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {t("tryChangingFilters")}
        </p>
      </div>
    );
  }

  const { data: companies, count } = result;
  // Calculate total pages based on ITEMS_PER_PAGE set in service (12)
  const totalPages = Math.ceil(count / 12);
  const currentPage = parseInt(searchParams.page || "1", 10);

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            isFollowing={followingIds.includes(company.id)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      )}
    </div>
  );
}
