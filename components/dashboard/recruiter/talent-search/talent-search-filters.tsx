import { Filter } from "lucide-react";

type TFunction = (
  key: string,
  values?: Record<string, string | number | boolean | Date>,
) => string;

interface TalentSearchFiltersProps {
  t: TFunction;
  t_common: TFunction;
}

export function TalentSearchFilters({ t, t_common }: TalentSearchFiltersProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Filter className="w-4 h-4 text-violet-400" />
          {t("advancedFilters")}
        </h3>
        <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors uppercase font-bold tracking-wider">
          {t_common("reset")}
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-white/30 uppercase">
            {t("experience")}
          </label>
          <div className="space-y-2">
            {["1-3 năm", "3-5 năm", "5-8 năm", "8+ năm"].map((label) => (
              <label
                key={label}
                className="flex items-center gap-3 text-sm text-white/60 hover:text-white cursor-pointer group"
              >
                <div className="w-4 h-4 rounded border border-white/10 group-hover:border-violet-500/50" />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="h-px bg-white/5" />

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/30 uppercase">
            {t("fitScore")}
          </label>
          <div className="pt-2">
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div className="h-full w-[80%] bg-violet-600 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-white/30 font-bold">
              <span>0%</span>
              <span>{t("minScore")}: 80%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
