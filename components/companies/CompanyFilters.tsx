"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Mocked list of industries for filtering
const INDUSTRIES = [
  "Technology",
  "Fintech",
  "E-commerce",
  "Healthcare",
  "Education",
  "Blockchain",
];

export function CompanyFilters() {
  const t = useTranslations("Companies.filters");
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentIndustry = searchParams.get("industry") || "all";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page"); // Reset pagination
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-900 dark:text-slate-50">
            {t("industry")}
          </h3>
          {currentIndustry !== "all" && (
            <button
              onClick={() => updateParams("industry", "all")}
              className="text-xs font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
            >
              {t("reset")}
            </button>
          )}
        </div>
        <RadioGroup
          value={currentIndustry}
          onValueChange={(value) => updateParams("industry", value)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="all"
              id="ind-all"
              className="border-slate-300 text-violet-600"
            />
            <Label
              htmlFor="ind-all"
              className="text-slate-700 font-medium cursor-pointer dark:text-slate-300"
            >
              {t("allIndustries")}
            </Label>
          </div>
          {INDUSTRIES.map((industry) => (
            <div key={industry} className="flex items-center space-x-2">
              <RadioGroupItem
                value={industry}
                id={`ind-${industry}`}
                className="border-slate-300 text-violet-600"
              />
              <Label
                htmlFor={`ind-${industry}`}
                className="text-slate-600 cursor-pointer hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              >
                {industry}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Placeholder for future Size/Rating filters if added to Database */}
    </div>
  );
}
