"use client";

import { ChevronLeft, Share2, Send, Check, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState, useOptimistic, useTransition, useCallback } from "react";
import Image from "next/image";
import { ApplyJobDialog } from "./apply-job-dialog";
import { toggleSaveJobAction } from "@/actions/jobs.actions";
import { toast } from "sonner";

interface JobDetailHeaderProps {
  jobId: string;
  title: string;
  company: {
    name: string;
    logo_url: string | null;
  } | null;
  hasApplied?: boolean;
  profileData?: {
    fullName: string;
    email: string;
    phone: string;
    resumeUrl: string | null;
  } | null;
  initialIsSaved?: boolean;
  isCandidate?: boolean;
}

export function JobDetailHeader({
  jobId,
  title,
  company,
  hasApplied = false,
  profileData,
  initialIsSaved = false,
  isCandidate = false,
}: JobDetailHeaderProps) {
  const t = useTranslations("Landing.jobs.detail");
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [, startTransition] = useTransition();

  const [optimisticIsSaved, addOptimisticIsSaved] = useOptimistic(
    initialIsSaved,
    (state, newState: boolean) => newState,
  );

  const handleToggleSave = useCallback(async () => {
    const newState = !optimisticIsSaved;

    startTransition(async () => {
      addOptimisticIsSaved(newState);
      const result = await toggleSaveJobAction(jobId);

      if (result.success) {
        toast.success(
          newState
            ? t("saveSuccess") || "Đã lưu việc làm"
            : t("unsaveSuccess") || "Đã bỏ lưu việc làm",
        );
      } else {
        toast.error(result.error || "Có lỗi xảy ra");
      }
    });
  }, [jobId, optimisticIsSaved, addOptimisticIsSaved, t]);

  return (
    <div className="bg-slate-900 border-b border-white/5 py-8">
      <div className="container mx-auto px-4">
        <Link
          href="/jobs"
          className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-6 group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
          {t("backToList")}
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
              {company?.logo_url ? (
                <Image
                  src={company.logo_url}
                  alt={company.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-2xl font-bold text-slate-500">
                  {company?.name?.[0] || "C"}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="font-medium text-slate-300">
                  {company?.name}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span>{t("location")}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="lg"
              className="border-white/10 text-white hover:bg-white/5"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {t("share")}
            </Button>

            {isCandidate && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleToggleSave}
                className={`border-white/10 hover:bg-white/5 transition-all duration-300 ${
                  optimisticIsSaved
                    ? "text-rose-500 border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10"
                    : "text-white"
                }`}
              >
                <Heart
                  className={`w-4 h-4 mr-2 transition-transform duration-300 ${
                    optimisticIsSaved ? "fill-current scale-110" : "scale-100"
                  }`}
                />
                {optimisticIsSaved ? t("saved") : t("save")}
              </Button>
            )}
            <Button
              size="lg"
              className={`${
                hasApplied
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 cursor-default hover:bg-emerald-500/20"
                  : "bg-violet-600 hover:bg-violet-500 text-white"
              } px-8 font-bold transition-all duration-200`}
              onClick={() => !hasApplied && setShowApplyDialog(true)}
              disabled={hasApplied}
            >
              {hasApplied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  {t("applied")}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t("applyNow")}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <ApplyJobDialog
        jobId={jobId}
        jobTitle={title}
        open={showApplyDialog}
        onOpenChange={setShowApplyDialog}
        profileData={profileData}
      />
    </div>
  );
}
