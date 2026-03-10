import Image from "next/image";
import { Building2, MapPin, Globe } from "lucide-react";
import { Database } from "@/types/database";
import { FollowButton } from "@/components/shared/follow-button";
import { getTranslations } from "next-intl/server";

interface CompanyHeaderProps {
  company: Database["public"]["Tables"]["companies"]["Row"];
  isFollowing: boolean;
}

export async function CompanyHeader({
  company,
  isFollowing,
}: CompanyHeaderProps) {
  const t = await getTranslations("CompanyDetail");

  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
          {company.logo_url ? (
            <Image
              src={company.logo_url}
              alt={`${company.name} logo`}
              width={80}
              height={80}
              className="h-full w-full object-contain"
            />
          ) : (
            <Building2 className="h-12 w-12 text-slate-400" />
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            {company.name}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
            {company.industry && (
              <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium dark:bg-slate-800 dark:text-slate-300">
                <Building2 className="h-4 w-4" />
                {company.industry}
              </span>
            )}
            {company.location && (
              <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium dark:bg-slate-800 dark:text-slate-300">
                <MapPin className="h-4 w-4" />
                {company.location}
              </span>
            )}
            {company.website && (
              <a
                href={
                  company.website.startsWith("http")
                    ? company.website
                    : `https://${company.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Globe className="h-4 w-4" />
                {t("website")}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="shrink-0">
        <FollowButton
          companyId={company.id}
          initialIsFollowing={isFollowing}
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
}
