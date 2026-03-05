"use client";

import { useTranslations } from "next-intl";
import { JobSearchParams } from "@/types/jobs";
import { useRouter, usePathname } from "next/navigation";

interface JobListHeaderProps {
  count: number;
  searchParams: JobSearchParams;
}

export function JobListHeader({ count, searchParams }: JobListHeaderProps) {
  const t = useTranslations("Landing.jobs");
  const router = useRouter();
  const pathname = usePathname();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(window.location.search);
    params.set("sort", e.target.value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
      <p className="text-white/40 text-sm">{t("stats", { count })}</p>
      <div className="flex items-center gap-2">
        <span className="text-white/20 text-xs uppercase font-bold tracking-wider">
          {t("sort.label")}
        </span>
        <select
          defaultValue={searchParams.sort || "newest"}
          onChange={handleSortChange}
          className="bg-transparent border-none text-white/60 text-sm focus:ring-0 focus:outline-none cursor-pointer font-medium hover:text-white transition-colors"
        >
          <option value="newest" className="bg-[#050816]">
            {t("sort.newest")}
          </option>
          <option value="salary" className="bg-[#050816]">
            {t("sort.salary")}
          </option>
          <option value="relevant" className="bg-[#050816]">
            {t("sort.relevant")}
          </option>
        </select>
      </div>
    </div>
  );
}
