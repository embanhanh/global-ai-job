"use client";

import { ChevronLeft, Share2, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import Image from "next/image";
import { ApplyJobDialog } from "./apply-job-dialog";

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
}

export function JobDetailHeader({
  jobId,
  title,
  company,
  hasApplied = false,
  profileData,
}: JobDetailHeaderProps) {
  const t = useTranslations("Landing.jobs.detail");
  const [showApplyDialog, setShowApplyDialog] = useState(false);

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
