"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CompanyPublic } from "@/services/companies-public.service";
import { motion } from "framer-motion";
import { Building2, MapPin, Briefcase } from "lucide-react";
import { FollowButton } from "./follow-button";
import { useTranslations } from "next-intl";

interface CompanyCardProps {
  company: CompanyPublic;
  isFollowing?: boolean;
}

export function CompanyCard({
  company,
  isFollowing = false,
}: CompanyCardProps) {
  const t = useTranslations("Companies.card");

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/50 bg-white/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-violet-500/30 hover:shadow-md hover:shadow-violet-500/5 dark:border-slate-800/50 dark:bg-slate-900/50"
    >
      <div className="flex items-start justify-between gap-4">
        <Link
          href={`/companies/${company.id}`} // Even if this route doesn't exist yet, it's a good practice
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-950"
        >
          {company.logo_url ? (
            <Image
              src={company.logo_url}
              alt={`${company.name} logo`}
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          ) : (
            <Building2 className="h-8 w-8 text-slate-400" />
          )}
        </Link>
        <FollowButton
          companyId={company.id}
          initialIsFollowing={isFollowing}
          className="shrink-0"
        />
      </div>

      <div className="mt-5 flex-1">
        <Link href={`/companies/${company.id}`} className="block">
          <h3 className="line-clamp-1 font-semibold text-slate-900 transition-colors group-hover:text-violet-600 dark:text-slate-50 dark:group-hover:text-violet-400">
            {company.name}
          </h3>
        </Link>

        {company.description && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
            {company.description}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        {company.industry && (
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Building2 className="h-3.5 w-3.5" />
            {company.industry}
          </span>
        )}

        {company.location && (
          <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <MapPin className="h-3.5 w-3.5" />
            {company.location}
          </span>
        )}

        {company.active_jobs_count > 0 && (
          <span className="flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
            <Briefcase className="h-3.5 w-3.5" />
            {t("activeJobs", { count: company.active_jobs_count })}
          </span>
        )}
      </div>
    </motion.div>
  );
}
