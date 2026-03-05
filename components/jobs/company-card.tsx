import { Building2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface CompanyCardProps {
  company: string;
  industry: string;
  description: string;
  website: string;
  employees: string;
}

export function CompanyCard({
  company,
  industry,
  description,
  website,
  employees,
}: CompanyCardProps) {
  const t = useTranslations("Landing.jobs.detail.company");

  return (
    <div className="p-8 rounded-3xl bg-white/2 border border-white/5 space-y-6 sticky top-40">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center border border-white/10">
          <Building2 className="w-8 h-8 text-violet-400" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-white">{company}</h4>
          <p className="text-sm text-white/40">{industry}</p>
        </div>
      </div>

      <p className="text-sm text-white/50 leading-relaxed">{description}</p>

      <div className="space-y-4 pt-6 border-t border-white/5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/20">{t("website")}</span>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-violet-400 hover:text-violet-300 flex items-center gap-1"
          >
            {t("visitSite")} <Globe className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-white/20">{t("employees")}</span>
          <span className="text-white/60">{employees}</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full border-white/10 text-white hover:bg-white/5 rounded-xl h-12"
      >
        {t("viewProfile")}
      </Button>
    </div>
  );
}
