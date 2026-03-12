"use client";

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { JobSearchParams } from "@/types/jobs";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { LocationSelector } from "@/components/shared/location-selector";

interface JobSearchHeaderProps {
  initialParams: JobSearchParams;
}

export function JobSearchHeader({ initialParams }: JobSearchHeaderProps) {
  const t = useTranslations("Landing.jobs");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(initialParams.q || "");
  const [location, setLocation] = useState(initialParams.location || "");

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      // Reset page when filtering
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  // Debounced search for 'q'
  useEffect(() => {
    if (q === (initialParams.q || "")) return;

    const timer = setTimeout(() => {
      updateFilters({ q });
    }, 500);

    return () => clearTimeout(timer);
  }, [q, initialParams.q, updateFilters]);

  // Debounced search for 'location'
  useEffect(() => {
    if (location === (initialParams.location || "")) return;

    const timer = setTimeout(() => {
      updateFilters({ location });
    }, 500);

    return () => clearTimeout(timer);
  }, [location, initialParams.location, updateFilters]);

  const handleManualSearch = () => {
    updateFilters({ q, location });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleManualSearch();
    }
  };

  return (
    <div className="mb-12 space-y-4">
      <div className="p-2 rounded-2xl bg-card/50 border border-border backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-2 items-center">
        <div className="relative flex-1 w-full flex items-center px-4">
          <Search className="w-5 h-5 text-muted-foreground absolute left-4" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("search.placeholder")}
            className="bg-transparent border-none text-foreground placeholder:text-muted-foreground/50 h-12 pl-10 focus:ring-0 w-full outline-hidden"
          />
        </div>
        <div className="hidden md:block w-px h-8 bg-border/50" />
        <div className="relative flex-1 w-full">
          <LocationSelector
            value={location}
            onChange={setLocation}
            placeholder={t("search.location")}
            className="bg-transparent border-none hover:bg-transparent h-12 text-foreground"
          />
        </div>
        <Button
          onClick={handleManualSearch}
          className="w-full md:w-auto h-12 px-8 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 font-bold transition-all hover:scale-[1.02] text-white border-none shadow-lg shadow-primary/20"
        >
          {t("search.button")}
        </Button>
      </div>

      {/* Popular Tags */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground px-2">
        <span>{t("search.popular")}</span>
        {["AI Engineer", "React", "Python", "Data Scientist", "NLP"].map(
          (tag) => (
            <button
              key={tag}
              onClick={() => updateFilters({ q: tag })}
              className="px-3 py-1 rounded-full border border-border bg-muted/30 hover:bg-primary/10 hover:border-primary/30 transition-all text-muted-foreground hover:text-primary"
            >
              {tag}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
