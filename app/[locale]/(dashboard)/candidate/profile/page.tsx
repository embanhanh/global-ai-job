import { getTranslations } from "next-intl/server";
import { ProfileClient } from "@/components/dashboard/candidate/profile/profile-client";
import { getProfile } from "@/services/profiles.service";

export default async function CandidateProfilePage() {
  const t = await getTranslations("Dashboard.candidate.profile");
  const result = await getProfile();

  // Transform snake_case from DB to camelCase for the form
  const profile =
    result.success && result.data
      ? {
          fullName: result.data.full_name || "",
          email: result.data.email || "",
          phone: result.data.phone || "",
          resumeUrl: result.data.resume_url || "",
          bio: result.data.bio || "",
          jobTitle: result.data.job_title || "",
          skills: result.data.skills || [],
          experience: result.data.experience || [],
          education: result.data.education || [],
        }
      : undefined;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
      </div>

      <ProfileClient initialData={profile} />
    </div>
  );
}
