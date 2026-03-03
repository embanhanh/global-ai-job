"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreVertical,
  Users,
  Eye,
  Calendar,
  Briefcase,
  Pencil,
} from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

type TFunction = (
  key: string,
  values?: Record<string, string | number | boolean | Date>,
) => string;

import { Job } from "@/types/jobs";

interface JobCardProps {
  job: Job;
  t: TFunction;
}

export function JobCard({ job, t }: JobCardProps) {
  const router = useRouter();
  const statusMap = {
    active: {
      label: t("active"),
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    draft: {
      label: t("draft"),
      className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    },
    closed: {
      label: t("closed"),
      className: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    },
  };

  return (
    <Card className="bg-[#0a0a14]/60 backdrop-blur-xl border-white/5 p-5 group hover:border-violet-500/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-violet-600/10 border border-violet-500/20">
            <Briefcase className="w-6 h-6 text-violet-400" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-white group-hover:text-violet-400 transition-colors">
                {job.title}
              </h3>
              <Badge
                variant="outline"
                className={
                  statusMap[job.status as keyof typeof statusMap].className
                }
              >
                {statusMap[job.status as keyof typeof statusMap].label}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date(job.created_at).toLocaleDateString()}
              </div>
              <span>•</span>
              <div>{job.location || "Remote"}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            <div className="text-center">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <Users className="w-4 h-4 text-violet-400" />
                {job.applicants_count || 0}
              </div>
              <p className="text-[10px] text-white/30 uppercase tracking-tighter font-bold">
                {t("applicants")}
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1.5 text-white font-medium">
                <Eye className="w-4 h-4 text-blue-400" />
                {job.views_count || 0}
              </div>
              <p className="text-[10px] text-white/30 uppercase tracking-tighter font-bold">
                {t("views")}
              </p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/40 hover:text-white rounded-xl"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#0a0a14] border-white/10 text-white"
            >
              <DropdownMenuItem
                onClick={() => router.push(`/recruiter/jobs/${job.id}/edit`)}
                className="focus:bg-white/5 focus:text-white cursor-pointer"
              >
                <Pencil className="w-4 h-4 mr-2" />
                {t("actions.edit")}
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
                {t("actions.viewApplicants")}
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuItem className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer text-red-400">
                {job.status === "closed"
                  ? t("actions.reopen")
                  : t("actions.close")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
