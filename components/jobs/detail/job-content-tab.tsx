import {
  Lightbulb,
  Star,
  TrendingUp,
  MapPin,
  Briefcase,
  DollarSign,
  CheckCircle2,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

interface JobContentTabProps {
  description: string | null;
  jobType: string | null;
  location: string | null;
  salaryRange: string | null;
  requirements: { value: string }[] | null;
  locale: string;
}

type Suggestion = {
  icon: "star" | "lightbulb" | "trending";
  text: string;
};

const ICON_MAP = {
  star: Star,
  lightbulb: Lightbulb,
  trending: TrendingUp,
};

// Placeholder JD score & suggestions
function getJdScore(description: string | null): number {
  if (!description) return 0;
  const len = description.length;
  if (len > 500) return 82;
  if (len > 200) return 65;
  return 40;
}

function getScoreColor(score: number) {
  if (score >= 70) return "text-emerald-400";
  if (score >= 50) return "text-amber-400";
  return "text-red-400";
}

export async function JobContentTab({
  description,
  jobType,
  location,
  salaryRange,
  requirements,
  locale,
}: JobContentTabProps) {
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.recruiter.jobs.detail.jobContent",
  });
  const score = getJdScore(description);

  const suggestions: Suggestion[] = [
    { icon: "star", text: t("suggestion1") },
    { icon: "lightbulb", text: t("suggestion2") },
    { icon: "trending", text: t("suggestion3") },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      {/* Main — Content */}
      <div className="space-y-6">
        {/* Quick Info Bar */}
        <div className="flex flex-wrap gap-3 p-4 bg-white/2 rounded-2xl border border-white/8">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
            <Briefcase className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-medium text-white/70">
              {jobType || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-white/70">
              {location || "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-medium text-white/70">
              {salaryRange || "Competitive"}
            </span>
          </div>
        </div>

        {/* Requirements Section */}
        {requirements && requirements.length > 0 && (
          <div className="bg-white/2 rounded-2xl border border-white/8 p-8">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-violet-400" />
              {t("requirements")}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requirements.map((req, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-violet-500/40 shrink-0" />
                  <span className="text-sm text-white/70">{req.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* JD Content */}
        <div className="bg-white/2 rounded-2xl border border-white/8 p-8">
          <h3 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-6">
            {t("jobDescription")}
          </h3>
          {description ? (
            <div className="prose prose-invert prose-sm max-w-none text-white/70 leading-relaxed whitespace-pre-wrap">
              {description}
            </div>
          ) : (
            <p className="text-white/30 text-sm italic">{t("noDescription")}</p>
          )}
        </div>
      </div>

      {/* Sidebar — AI Insights */}
      <div className="space-y-4">
        {/* JD Score Card */}
        <div className="bg-white/2 rounded-2xl border border-white/8 p-6">
          <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">
            {t("jdScore")}
          </h4>
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  className="text-white/5"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  className={getScoreColor(score)}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </span>
              </div>
            </div>
            <p className="text-xs text-white/40 text-center">
              {t("jdScoreDesc")}
            </p>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="bg-white/2 rounded-2xl border border-white/8 p-6">
          <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">
            {t("aiSuggestions")}
          </h4>
          <ul className="space-y-3">
            {suggestions.map((s, i) => {
              const Icon = ICON_MAP[s.icon];
              return (
                <li key={i} className="flex gap-3 items-start">
                  <div className="mt-0.5 p-1.5 rounded-lg bg-violet-500/10">
                    <Icon className="w-3.5 h-3.5 text-violet-400" />
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {s.text}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
