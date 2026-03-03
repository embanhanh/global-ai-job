import { getTranslations } from "next-intl/server";
import {
  Briefcase,
  Brain,
  Globe2,
  Sparkles,
  ArrowRight,
  Users,
  Building2,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const t = await getTranslations("Landing");
  const tNav = await getTranslations("Nav");
  const tCommon = await getTranslations("Common");

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              {tCommon("brand")}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {t("hero.ctaSecondary")}
            </a>
            <Link
              href="/login"
              className="text-sm text-white/60 hover:text-white transition-colors"
            >
              {tNav("login")}
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-violet-600 hover:bg-violet-500 text-white border-0 rounded-full px-5"
              >
                {tNav("register")}
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-6">
        {/* Ambient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Mesh gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-700/20 blur-[120px] animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-700/20 blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-purple-800/15 blur-[80px] animate-pulse"
            style={{ animationDelay: "2s" }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300">{t("hero.badge")}</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[1.05] tracking-tight mb-8">
            <span className="text-white">{t("hero.title")} </span>
            <span className="relative inline-block">
              <span className="bg-linear-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                {t("hero.titleHighlight")}
              </span>
            </span>
            <br />
            <span className="text-white/40">{t("hero.titleSuffix")}</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed mb-12">
            {t("hero.description")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-20">
            <Link href="/register">
              <button className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-violet-600 px-8 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]">
                {t("hero.ctaPrimary")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-8 text-sm font-semibold text-white/70 transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/20">
              {t("hero.ctaSecondary")}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                value: "12,500+",
                label: t("stats.jobs"),
                icon: Briefcase,
              },
              {
                value: "3,200+",
                label: t("stats.companies"),
                icon: Building2,
              },
              {
                value: "89,000+",
                label: t("stats.candidates"),
                icon: Users,
              },
              {
                value: "1,400+",
                label: t("stats.hiredMonthly"),
                icon: TrendingUp,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative group rounded-2xl border border-white/5 bg-white/3 backdrop-blur-sm p-6 hover:border-violet-500/30 hover:bg-white/6 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 text-violet-400 mb-3 mx-auto" />
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-4 border-violet-500/30 text-violet-400 bg-violet-500/10"
            >
              {t("features.title")}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("features.title")}
            </h2>
            <p className="text-lg text-white/40 max-w-xl mx-auto">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: t("features.ai.title"),
                description: t("features.ai.description"),
                gradient: "from-violet-600 to-purple-600",
                glow: "violet",
              },
              {
                icon: Globe2,
                title: t("features.multilingual.title"),
                description: t("features.multilingual.description"),
                gradient: "from-indigo-600 to-blue-600",
                glow: "indigo",
              },
              {
                icon: Sparkles,
                title: t("features.smart.title"),
                description: t("features.smart.description"),
                gradient: "from-purple-600 to-pink-600",
                glow: "purple",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-3xl border border-white/5 bg-white/2 p-8 hover:border-white/10 transition-all duration-500 overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className={`absolute -inset-1 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 rounded-3xl`}
                />

                <div
                  className={`relative w-12 h-12 rounded-2xl bg-linear-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="relative text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="relative text-white/40 leading-relaxed text-sm">
                  {feature.description}
                </p>

                <div className="relative mt-6 flex items-center gap-2 text-xs text-violet-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t("features.ready")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl border border-violet-500/20 bg-linear-to-br from-violet-900/20 to-indigo-900/20 backdrop-blur-sm p-16 text-center overflow-hidden">
            {/* Ambient Light */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-violet-600/20 blur-[80px] pointer-events-none" />

            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto">
                {t("cta.description")}
              </p>
              <Link href="/register">
                <button className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-linear-to-r from-violet-600 to-indigo-600 px-10 text-base font-semibold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] hover:scale-105">
                  <Sparkles className="w-5 h-5" />
                  {t("cta.button")}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Briefcase className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-white/60">
              {tCommon("brand")}
            </span>
          </div>
          <p className="text-xs text-white/20">
            © 2026 {tCommon("brandFull")}. Built with Next.js 16 + AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
