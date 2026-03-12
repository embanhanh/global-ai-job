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
      <SelectTrigger className="w-[180px] h-11 bg-accent/50 border-sidebar-border text-foreground focus:ring-primary/50">
        <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
        <SelectValue placeholder={t("filter")} />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border text-popover-foreground">
        <SelectItem
          value="all"
          className="focus:bg-accent focus:text-accent-foreground"
        >
          {t("allJobs", { defaultValue: "All Jobs" })}
        </SelectItem>
        <SelectItem
          value="active"
          className="focus:bg-accent focus:text-accent-foreground"
        >
          {t("active")}
        </SelectItem>
        <SelectItem
          value="draft"
          className="focus:bg-accent focus:text-accent-foreground"
        >
          {t("draft")}
        </SelectItem>
        <SelectItem
          value="closed"
          className="focus:bg-accent focus:text-accent-foreground"
        >
          {t("closed")}
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
