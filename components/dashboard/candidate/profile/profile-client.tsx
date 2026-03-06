"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AiCvParser } from "@/components/dashboard/candidate/ai-cv-parser";
import { ProfileForm } from "@/components/dashboard/candidate/profile-form";
import { Sparkles } from "lucide-react";
import { type CandidateProfileValues } from "@/types/candidate";

interface ProfileClientProps {
  initialData?: Partial<CandidateProfileValues>;
}

export function ProfileClient({ initialData }: ProfileClientProps) {
  const t = useTranslations("Dashboard.candidate.profile");
  const [profileData, setProfileData] = useState<
    Partial<CandidateProfileValues> | undefined
  >(initialData);

  const handleParseComplete = (data: Partial<CandidateProfileValues>) => {
    // Preserve current data but override with parsed data
    setProfileData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
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
        <ProfileForm initialData={profileData} />
      </div>
    </div>
  );
}
