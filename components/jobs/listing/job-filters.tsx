"use client";

import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { JobSearchParams } from "@/types/jobs";

interface JobFiltersProps {
  searchParams: JobSearchParams;
}

export function JobFilters({ searchParams }: JobFiltersProps) {
  const t = useTranslations("Landing.jobs");

  const createQueryString = (params: Record<string, string | null>) => {
    const newParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) newParams.set(key, value);
    });
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    return newParams.toString();
  };

  const filterSections = [
    {
      id: "type",
      label: t("filters.type"),
      options: ["Full-time", "Part-time", "Contract", "Freelance"],
    },
    {
      id: "level",
      label: t("filters.level"),
      options: ["Junior", "Mid", "Senior", "Lead", "Manager"],
    },
    {
      id: "category",
      label: t("filters.category"),
      options: [
        "AI Engineering",
        "Machine Learning",
        "Data Science",
        "Design",
        "Product",
      ],
    },
  ] as const;

  return (
    <aside className="w-full lg:w-72 space-y-8">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
          {t("filters.title")}
        </h2>
        <Link
          href="/jobs"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {t("filters.reset")}
        </Link>
      </div>

      <div className="space-y-8">
        {filterSections.map((section) => (
          <div key={section.id} className="space-y-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] opacity-50">
              {section.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {section.options.map((option) => {
                const isActive =
                  searchParams[section.id as keyof JobSearchParams] === option;
                return (
                  <Link
                    key={option}
                    href={`?${createQueryString({
                      [section.id]: isActive ? null : option,
                      page: "1",
                    })}`}
                    className="no-underline"
                  >
                    <Badge
                      variant="outline"
                      className={cn(
                        "cursor-pointer transition-all py-1.5 px-3 border-border",
                        isActive
                          ? "border-primary bg-primary/15 text-primary shadow-sm shadow-primary/10"
                          : "bg-muted/30 text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground",
                      )}
                    >
                      {option}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
