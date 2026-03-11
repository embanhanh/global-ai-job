import { getTranslations } from "next-intl/server";
import { searchCandidatesAction } from "@/actions/search.actions";
import { TalentSearchResults } from "./talent-search-results";
import { createClient } from "@/lib/supabase/server";


export async function TalentSearchList({
  query,
  locale,
}: {
  query: string;
  locale: string;
}) {
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.recruiter.search",
  });

  if (!query) {
    return (
      <div className="lg:col-span-3 flex flex-col items-center justify-center py-20 text-white/50 space-y-4">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <p>{t("emptyQuery")}</p>
      </div>
    );
  }

  const { success, data: matches, error } = await searchCandidatesAction(query);

  if (!success || !matches || error) {
    return (
      <div className="lg:col-span-3 text-red-400 p-4 bg-red-500/10 rounded-xl border border-red-500/20">
        {t("errorSearch", { error: error || "Unknown error" })}
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="lg:col-span-3 flex flex-col items-center justify-center py-20 text-white/50 space-y-4">
        <p>{t("noMatches")}</p>
        <p className="text-sm">{t("tryDifferentKeywords")}</p>
      </div>
    );
  }

  // Fetch missing fields like skills and experience from profiles
  const supabase = await createClient();
  const profileIds = matches.map((m) => m.id);
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, skills, experience")
    .in("id", profileIds);

  const profileMap = new Map(profiles?.map((p) => [p.id, p]) || []);

  const results = matches.map((match) => {
    const profile = profileMap.get(match.id);
    const skills = Array.isArray(profile?.skills) ? profile.skills : [];

    // Format experience string safely
    let expString = t("expNotUpdated");
    if (Array.isArray(profile?.experience) && profile.experience.length > 0) {
      const latestExp = profile.experience[0] as Record<string, unknown>;
      expString =
        latestExp?.jobTitle && latestExp?.company
          ? t("experienceAt", {
              title: latestExp.jobTitle as string,
              company: latestExp.company as string,
            })
          : t("hasExperience");
    }

    return {
      id: match.id,
      name: match.full_name || t("anonymousCandidate"),
      role: match.job_title || t("roleNotUpdated"),
      fitScore: Math.round(match.similarity * 100),
      skills: skills as string[],
      experience: expString,
      explanation: match.bio || t("defaultExplanation"),
    };
  });

  return <TalentSearchResults results={results} />;
}
