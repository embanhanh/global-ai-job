"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { Filter } from "lucide-react";

export function JobFilter({ value }: { value?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("Dashboard.recruiter.jobs");

  const handleFilterChange = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Reset to 1st page when filter changes

    if (status && status !== "all") {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={value || "all"} onValueChange={handleFilterChange}>
      <SelectTrigger className="w-[180px] h-11 bg-white/5 border-white/10 text-white focus:ring-violet-500/50">
        <Filter className="w-4 h-4 mr-2 text-white/50" />
        <SelectValue placeholder={t("filter")} />
      </SelectTrigger>
      <SelectContent className="bg-[#0a0a14] border-white/10 text-white">
        <SelectItem value="all" className="focus:bg-white/5 focus:text-white">
          {t("allJobs", { defaultValue: "All Jobs" })}
        </SelectItem>
        <SelectItem
          value="active"
          className="focus:bg-white/5 focus:text-white"
        >
          {t("active")}
        </SelectItem>
        <SelectItem value="draft" className="focus:bg-white/5 focus:text-white">
          {t("draft")}
        </SelectItem>
        <SelectItem
          value="closed"
          className="focus:bg-white/5 focus:text-white"
        >
          {t("closed")}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
