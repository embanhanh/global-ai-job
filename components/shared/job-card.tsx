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
      <Card className="group relative overflow-hidden bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-md hover:shadow-primary/5 h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/15 to-violet-500/10 flex items-center justify-center border border-border overflow-hidden">
                {job.company?.logo_url ? (
                  <Image
                    src={job.company.logo_url}
                    alt={job.company.name}
                    width={32}
                    height={32}
                    unoptimized
                    className="w-8 h-8 rounded-lg object-contain"
                  />
                ) : (
                  <Briefcase className="w-6 h-6 text-primary" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {job.title}
                </h3>
                <p className="text-sm text-muted-foreground">{job.company?.name}</p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="border-primary/30 text-primary bg-primary/5 whitespace-nowrap"
            >
              {job.job_type}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span>{job.salary_range}</span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
              <Clock className="w-3.5 h-3.5" />
              <span>{postedAt}</span>
            </div>
            <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              {t("viewDetails")} →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
