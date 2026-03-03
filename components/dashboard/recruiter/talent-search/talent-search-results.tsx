import { TalentSearchCard, type TalentResult } from "./talent-search-card";

type TFunction = (
  key: string,
  values?: Record<string, string | number | boolean | Date>,
) => string;

interface TalentSearchResultsProps {
  results: TalentResult[];
  t: TFunction;
}

export function TalentSearchResults({ results, t }: TalentSearchResultsProps) {
  return (
    <div className="lg:col-span-3 space-y-4">
      <div className="flex items-center justify-between pb-2">
        <p className="text-sm text-white/40">
          {t("foundCount", { count: results.length })}
        </p>
      </div>

      {results.map((result) => (
        <TalentSearchCard key={result.id} result={result} t={t} />
      ))}
    </div>
  );
}
