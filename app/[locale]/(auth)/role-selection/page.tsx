import { getTranslations } from "next-intl/server";
import { AuthCard } from "@/components/shared/auth-card";
import { Briefcase, Users, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default async function RoleSelectionPage() {
  const t = await getTranslations("Auth.role");
  const tCommon = await getTranslations("Common");

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          {t("title")}
        </h1>
        <p className="text-white/50 text-lg max-w-xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
        {/* Candidate Card */}
        <Link href="/register?role=candidate" className="group">
          <AuthCard className="h-full border-white/5 hover:border-violet-500/30 transition-all duration-500 hover:bg-white/4">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {t("candidate.title")}
              </h2>
              <p className="text-white/40 leading-relaxed mb-8">
                {t("candidate.description")}
              </p>
              <div className="inline-flex items-center gap-2 text-violet-400 font-semibold group-hover:gap-4 transition-all">
                {t("cta")} <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </AuthCard>
        </Link>

        {/* Recruiter Card */}
        <Link href="/register?role=recruiter" className="group">
          <AuthCard className="h-full border-white/5 hover:border-indigo-500/30 transition-all duration-500 hover:bg-white/4">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                {t("recruiter.title")}
              </h2>
              <p className="text-white/40 leading-relaxed mb-8">
                {t("recruiter.description")}
              </p>
              <div className="inline-flex items-center gap-2 text-indigo-400 font-semibold group-hover:gap-4 transition-all">
                {t("cta")} <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </AuthCard>
        </Link>
      </div>

      <div className="mt-12 text-white/20 text-sm">
        {tCommon("brandFull")} — {t("footer")}
      </div>
    </div>
  );
}
