"use client";

import { CompanyPublic } from "@/services/companies-public.service";
import { AnimeReveal } from "@/components/shared/anime-reveal";
import { Building2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface TopEmployersProps {
  companies: CompanyPublic[];
}

export function TopEmployers({ companies }: TopEmployersProps) {
  const t = useTranslations("Landing.topEmployers");

  return (
    <section className="px-6 py-20 relative overflow-hidden bg-background">
      {/* Background glow — theme-aware */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none blur-[120px]"
        style={{ background: "var(--hero-glow)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              {t("title")}{" "}
              <span className="text-primary">{t("titleHighlight")}</span>
            </h2>
            <p className="text-muted-foreground max-w-lg">
              {t("description")}
            </p>
          </div>
          <Link
            href="/companies"
            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2 group"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <AnimeReveal
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          stagger={80}
        >
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/companies/${company.id}`}
              className="group relative rounded-3xl border border-border bg-card/60 backdrop-blur-xl p-8 hover:border-primary/30 hover:bg-card transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-primary" />
                </div>
              </div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-muted/50 border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-muted transition-all duration-500 overflow-hidden">
                  {company.logo_url ? (
                    <Image
                      src={company.logo_url}
                      alt={company.name || "Company"}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Building2 className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                  {company.name}
                </h3>

                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-muted/50 border border-border">
                    {company.industry || t("defaultIndustry")}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{t("jobsCount", { count: company.active_jobs_count })}</span>
                </div>
              </div>
            </Link>
          ))}
        </AnimeReveal>
      </div>
    </section>
  );
}
