"use client";
import { useTranslations } from "next-intl";
import { TalentSearchCard, type TalentResult } from "./talent-search-card";


interface TalentSearchResultsProps {
  results: TalentResult[];
}

export function TalentSearchResults({ results }: TalentSearchResultsProps) {
  const t = useTranslations("Dashboard.recruiter.search");

  return (
    <div className="lg:col-span-3 space-y-4">
      <div className="flex items-center justify-between pb-2">
        <p className="text-sm text-white/40">
          {t("foundCount", { count: results.length })}
        </p>
      </div>

      {results.map((result) => (
        <TalentSearchCard key={result.id} result={result} />
      ))}
    </div>
  );
}
