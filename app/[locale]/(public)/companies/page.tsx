import { CompanyGrid } from "@/components/companies/CompanyGrid";
import { CompanyGridSkeleton } from "@/components/companies/CompanyGridSkeleton";
import { CompanySearchHeader } from "@/components/companies/CompanySearchHeader";
import { CompanyFilters } from "@/components/companies/CompanyFilters";
import { getFollowingCompanyIds } from "@/services/follows.service";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Companies" });

  return {
    title: `${t("title")} | Global AI Job Board`,
    description: t("subtitle"),
  };
}

export default async function CompaniesPage({
  searchParams,
}: {
  searchParams: {
    q?: string;
    industry?: string;
    page?: string;
  };
}) {
  const t = await getTranslations("Companies");
  const followingIds = await getFollowingCompanyIds();

  // Organization Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("title"),
    description: t("subtitle"),
    publisher: {
      "@type": "Organization",
      name: "Global AI Job Board",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-slate-50 min-h-screen pb-20 dark:bg-slate-950 pt-20">
        <div className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
          <div className="container mx-auto px-4 py-12 md:py-16 md:px-6">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-slate-50">
              {t("title")}
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8 flex flex-col items-start gap-8 md:px-6 lg:flex-row">
          {/* Left Sidebar (Filters) */}
          <aside className="w-full shrink-0 lg:w-64 lg:sticky lg:top-24">
            <CompanyFilters />
          </aside>

          {/* Right Content */}
          <main className="flex-1 w-full space-y-6 min-w-0">
            <CompanySearchHeader />

            <Suspense
              key={JSON.stringify(searchParams)}
              fallback={<CompanyGridSkeleton />}
            >
              <CompanyGrid
                searchParams={searchParams}
                followingIds={followingIds}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}
