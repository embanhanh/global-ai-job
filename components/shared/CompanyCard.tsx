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
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/50 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between gap-4">
        <Link
          href={`/companies/${company.id}`}
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-border bg-background p-2 shadow-sm"
        >
          {company.logo_url ? (
            <Image
              src={company.logo_url}
              alt={`${company.name} logo`}
              width={48}
              height={48}
              unoptimized
              className="h-full w-full object-contain"
            />
          ) : (
            <Building2 className="h-8 w-8 text-muted-foreground" />
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
          <h3 className="line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary">
            {company.name}
          </h3>
        </Link>

        {company.description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {company.description}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        {company.industry && (
          <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-medium text-foreground">
            <Building2 className="h-3.5 w-3.5" />
            {company.industry}
          </span>
        )}

        {company.location && (
          <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-medium text-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {company.location}
          </span>
        )}

        {company.active_jobs_count > 0 && (
          <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
            <Briefcase className="h-3.5 w-3.5" />
            {t("activeJobs", { count: company.active_jobs_count })}
          </span>
        )}
      </div>
    </motion.div>
  );
}
