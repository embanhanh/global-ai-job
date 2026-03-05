import { Link } from "@/i18n/navigation";
import { JobWithCompany } from "@/types/database";
import { formatDistanceToNow } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { MapPin, DollarSign, Clock, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface JobCardProps {
  job: JobWithCompany;
  locale?: string;
}

export function JobCard({ job }: JobCardProps) {
  const t = useTranslations("Landing.jobs.detail");
  const currentLocale = useLocale();
  const dateLocale = currentLocale === "vi" ? vi : enUS;

  const postedAt = formatDistanceToNow(new Date(job.created_at), {
    addSuffix: true,
    locale: dateLocale,
  });

  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="group relative overflow-hidden bg-white/5 border-white/5 hover:border-violet-500/30 transition-all duration-300 hover:bg-white/10 h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center border border-white/10 overflow-hidden">
                {job.company?.logo_url ? (
                  <Image
                    src={job.company.logo_url}
                    alt={job.company.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-lg object-contain"
                  />
                ) : (
                  <Briefcase className="w-6 h-6 text-violet-400" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-white group-hover:text-violet-400 transition-colors line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-sm text-white/40">{job.company?.name}</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="border-violet-500/30 text-violet-400 bg-violet-500/5 whitespace-nowrap"
            >
              {job.job_type}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-white/40">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/40">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary_range}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-white/20">
              <Clock className="w-3.5 h-3.5" />
              <span>{postedAt}</span>
            </div>
            <span className="text-xs font-semibold text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
              {t("viewDetails")} →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
