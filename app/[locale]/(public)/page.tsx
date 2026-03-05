import { getTranslations } from "next-intl/server";
import { Briefcase, Users, Building2, TrendingUp } from "lucide-react";
import { HomeHero } from "@/components/home/hero";
import { JobCard } from "@/components/shared/job-card";
import { getJobs } from "@/services/jobs.service";

export default async function HomePage() {
  const t = await getTranslations("Landing");
  const { data: jobs } = await getJobs();
  const featuredJobs = jobs.slice(0, 6);

  const stats = [
    {
      value: "10,000+",
      label: "stats.jobs",
      icon: Briefcase,
    },
    {
      value: "5,000+",
      label: "stats.companies",
      icon: Building2,
    },
    {
      value: "2,000,000+",
      label: "stats.candidates",
      icon: Users,
    },
    {
      value: "1,500+",
      label: "stats.hiredMonthly",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <HomeHero />

      {/* Stats Section */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="relative group rounded-3xl border border-white/5 bg-white/2 backdrop-blur-sm p-8 hover:border-violet-500/30 hover:bg-white/5 transition-all duration-300 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-500/10 text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-white/40 uppercase tracking-widest">
                  {t(stat.label)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="px-6 py-20 bg-linear-to-b from-transparent via-white/2 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Featured <span className="text-violet-400">AI Jobs</span>
              </h2>
              <p className="text-white/40 max-w-lg">
                Explore the latest opportunities from leading AI companies
                around the globe.
              </p>
            </div>
            <button className="text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors">
              View All Jobs →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
