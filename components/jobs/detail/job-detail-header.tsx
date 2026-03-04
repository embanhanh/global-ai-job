"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Edit,
  XCircle,
  RefreshCw,
  Users,
  MapPin,
  Banknote,
} from "lucide-react";
import { updateJobStatus } from "@/actions/jobs.actions";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface JobDetailHeaderProps {
  jobId: string;
  title: string;
  status: string;
  location: string | null;
  jobType: string | null;
  salaryRange: string | null;
  applicantsCount: number;
  companyName: string | null;
  locale: string;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  active: {
    label: "active",
    className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  },
  draft: {
    label: "draft",
    className: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  },
  closed: {
    label: "closed",
    className: "bg-red-500/20 text-red-400 border-red-500/30",
  },
};

export function JobDetailHeader({
  jobId,
  title,
  status: initialStatus,
  location,
  jobType,
  salaryRange,
  applicantsCount,
  companyName,
  locale,
}: JobDetailHeaderProps) {
  const t = useTranslations("Dashboard.recruiter.jobs.detail.header");
  const tStatus = useTranslations("Dashboard.recruiter.jobs.detail.status");
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const config = STATUS_CONFIG[currentStatus] ?? STATUS_CONFIG.active;

  const handleToggleStatus = () => {
    const newStatus = currentStatus === "active" ? "closed" : "active";

    // Optimistic update
    setCurrentStatus(newStatus);

    startTransition(async () => {
      const { success } = await updateJobStatus(
        jobId,
        newStatus as "active" | "closed",
      );
      if (!success) {
        // Revert nếu thất bại
        setCurrentStatus(currentStatus);
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-30 bg-[#080810]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 -mx-6 -mt-2 mb-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h1 className="text-xl md:text-2xl font-bold text-white truncate">
              {title}
            </h1>
            <Badge
              className={cn(
                "text-xs border shrink-0 capitalize",
                config.className,
              )}
            >
              {tStatus(currentStatus as "active" | "draft" | "closed")}
            </Badge>
          </div>

          <div className="flex items-center gap-4 flex-wrap text-xs text-white/40">
            {companyName && (
              <span className="font-medium text-white/60">{companyName}</span>
            )}
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location}
              </span>
            )}
            {jobType && (
              <span className="bg-white/5 px-2 py-0.5 rounded-full">
                {jobType}
              </span>
            )}
            {salaryRange && (
              <span className="flex items-center gap-1">
                <Banknote className="w-3 h-3" />
                {salaryRange}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {t("applicantsCount", { count: applicantsCount })}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-white/10 hover:bg-white/5 text-white/60 hover:text-white"
          >
            <Link href={`/${locale}/recruiter/jobs/${jobId}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              {t("edit")}
            </Link>
          </Button>

          <Button
            size="sm"
            onClick={handleToggleStatus}
            disabled={isPending}
            className={cn(
              "transition-all",
              currentStatus === "active"
                ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"
                : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
            )}
          >
            {currentStatus === "active" ? (
              <>
                <XCircle className="w-4 h-4 mr-2" />
                {t("closeJob")}
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                {t("reopenJob")}
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
