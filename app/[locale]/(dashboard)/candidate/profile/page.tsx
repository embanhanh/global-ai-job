"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { AiCvParser } from "@/components/dashboard/candidate/ai-cv-parser";
import { ProfileForm } from "@/components/dashboard/candidate/profile-form";
import { Sparkles } from "lucide-react";
import { type CandidateProfileValues } from "@/types/candidate";
export default function CandidateProfilePage() {
  const t = useTranslations("Dashboard.candidate.profile");
  const [profileData, setProfileData] =
    useState<Partial<CandidateProfileValues> | null>(null);

  const handleParseComplete = (data: Partial<CandidateProfileValues>) => {
    setProfileData(data);
  };
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Left: CV Parser Area */}
        <div className="xl:col-span-4 space-y-6">
          <div className="sticky top-8">
            <div className="p-1.5 rounded-2xl bg-linear-to-br from-violet-600/20 via-indigo-600/10 to-transparent border border-violet-500/20 mb-8">
              <AiCvParser onParseComplete={handleParseComplete} />
            </div>

            {/* AI Info Card */}
            <div className="flex items-center gap-2 text-violet-400">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold">{t("aiInfo.title")}</span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              {t("aiInfo.description")}
            </p>
          </div>
        </div>
        <div className="xl:col-span-8">
          <ProfileForm initialData={profileData || undefined} />
        </div>
      </div>
    </div>
  );
}
