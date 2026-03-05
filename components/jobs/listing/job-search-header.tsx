"use client";

import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { JobSearchParams } from "@/types/jobs";
import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

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
      <div className="p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-2 items-center">
        <div className="relative flex-1 w-full flex items-center px-4">
          <Search className="w-5 h-5 text-white/40 absolute left-4" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("search.placeholder")}
            className="bg-transparent border-none text-white placeholder:text-white/20 h-12 pl-10 focus-visible:ring-0"
          />
        </div>
        <div className="hidden md:block w-px h-8 bg-white/10" />
        <div className="relative flex-1 w-full flex items-center px-4">
          <MapPin className="w-5 h-5 text-white/40 absolute left-4" />
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t("search.location")}
            className="bg-transparent border-none text-white placeholder:text-white/20 h-12 pl-10 focus-visible:ring-0"
          />
        </div>
        <Button
          onClick={handleManualSearch}
          className="w-full md:w-auto h-12 px-8 rounded-xl bg-violet-600 hover:bg-violet-500 font-bold transition-all hover:scale-[1.02]"
        >
          {t("search.button")}
        </Button>
      </div>

      {/* Popular Tags */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-white/40 px-2">
        <span>{t("search.popular")}</span>
        {["AI Engineer", "React", "Python", "Data Scientist", "NLP"].map(
          (tag) => (
            <button
              key={tag}
              onClick={() => updateFilters({ q: tag })}
              className="px-3 py-1 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white/60 hover:text-white"
            >
              {tag}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
