import { getSavedJobsByCandidate } from "@/services/jobs.service";
import { createClient } from "@/lib/supabase/server";
import { getTranslations } from "next-intl/server";
import { SavedJobsClient } from "@/components/dashboard/candidate/saved-jobs-client";
import { redirect } from "next/navigation";

export default async function SavedJobsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const t = await getTranslations("Dashboard.candidate.savedJobs");

  if (!user) {
    redirect("/login");
  }

  const { data: jobs } = await getSavedJobsByCandidate(user.id);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          {t("title")}
        </h1>
      </div>

      <SavedJobsClient initialJobs={jobs} />
    </div>
  );
}
