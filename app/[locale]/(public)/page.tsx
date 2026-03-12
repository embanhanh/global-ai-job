import { getTranslations } from "next-intl/server";
import { Briefcase, Users, Building2, TrendingUp } from "lucide-react";
import { HomeHero } from "@/components/home/hero";
import { JobCard } from "@/components/shared/job-card";
import { getJobs } from "@/services/jobs.service";
import { TopEmployers } from "@/components/home/top-employers";
import { getPublicCompanies } from "@/services/companies-public.service";
import { AnimeReveal } from "@/components/shared/anime-reveal";

export default async function HomePage() {
  const t = await getTranslations("Landing");
  const { data: jobs } = await getJobs();
  const featuredJobs = jobs.slice(0, 6);

  const { data: companies } = await getPublicCompanies({ page: "1" });
  const topCompanies = (companies || []).slice(0, 8);

  const stats = [
    { value: t("stats.valueJobs"), label: "stats.jobs", icon: Briefcase },
    { value: t("stats.valueCompanies"), label: "stats.companies", icon: Building2 },
    { value: t("stats.valueCandidates"), label: "stats.candidates", icon: Users },
    { value: t("stats.valueHiredMonthly"), label: "stats.hiredMonthly", icon: TrendingUp },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <HomeHero />

      {/* Stats Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <AnimeReveal 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            stagger={100}
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="relative group rounded-3xl border border-border bg-card/50 backdrop-blur-sm p-8 hover:border-primary/30 hover:bg-card transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest opacity-70">
                  {t(stat.label)}
                </div>
              </div>
            ))}
          </AnimeReveal>
        </div>
      </section>

      {/* Top Employers Section */}
      <TopEmployers companies={topCompanies} />

      {/* Featured Jobs Section */}
      <section className="px-6 py-20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                {t("featuredJobs.title")}{" "}
                <span className="text-primary">{t("featuredJobs.titleHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-lg">
                {t("featuredJobs.description")}
              </p>
            </div>
            <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
              {t("featuredJobs.viewAll")} →
            </button>
          </div>

          <AnimeReveal 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            stagger={120}
          >
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </AnimeReveal>
        </div>
      </section>
    </div>
  );
}
