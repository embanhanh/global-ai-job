"use client";

import { useState, useEffect, useCallback } from "react";
import { Application, HiringStep, AIInsight } from "@/types/jobs";
import { AiMatchScore } from "./ai-match-score";
import { QuickViewSheet } from "./quick-view-sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Pagination } from "@/components/shared/pagination";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

interface ApplicantTableProps {
  applications: Application[];
  totalPages: number;
  currentPage: number;
  hiringSteps: HiringStep[];
  currentQuery?: string;
  currentStage?: string;
}

const STAGE_COLORS: Record<string, string> = {
  sourcing: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  screening: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  interview: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  offer: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  hired: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function ApplicantTable({
  applications,
  totalPages,
  currentPage,
  hiringSteps,
  currentQuery = "",
  currentStage = "all",
}: ApplicantTableProps) {
  const t = useTranslations("Dashboard.recruiter.jobs.detail.applicantTable");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(currentQuery);

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== "all") {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      // Reset page when filtering
      if (!updates.page) {
        params.delete("page");
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  // Sync internal search state with prop (url)
  useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

  // Debounce search update to URL
  useEffect(() => {
    // Only update if the query has actually changed from what's in the URL
    if (searchQuery === currentQuery) return;

    const timer = setTimeout(() => {
      updateFilters({ query: searchQuery });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, currentQuery, updateFilters]);

  const handleRowClick = (app: Application) => {
    setSelectedApp(app);
    setSheetOpen(true);
  };

  return (
    <>
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("search")}
              className="pl-10 bg-white/5 border-white/10 text-white h-11 focus:border-violet-500/50"
            />
          </div>
          <select
            value={currentStage}
            onChange={(e) => updateFilters({ stage: e.target.value })}
            className="bg-white/5 border border-white/10 text-white h-11 px-4 rounded-md focus:border-violet-500/50 outline-none text-sm min-w-[160px]"
          >
            <option value="all" className="bg-[#0a0a14]">
              {t("allStages")}
            </option>
            {hiringSteps.map((step) => (
              <option key={step.id} value={step.id} className="bg-[#0a0a14]">
                {step.label}
              </option>
            ))}
            <option value="rejected" className="bg-[#0a0a14]">
              Rejected
            </option>
          </select>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border border-white/8 overflow-hidden bg-white/2">
          {applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-white/30 text-sm">{t("empty")}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-white/8 hover:bg-transparent">
                  <TableHead className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                    {t("name")}
                  </TableHead>
                  <TableHead className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                    {t("appliedDate")}
                  </TableHead>
                  <TableHead className="text-white/40 text-xs font-semibold uppercase tracking-wider">
                    {t("stage")}
                  </TableHead>
                  <TableHead className="text-white/40 text-xs font-semibold uppercase tracking-wider text-center">
                    {t("matchScore")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => {
                  const profile = app.profiles;
                  const name = profile?.full_name ?? "Unknown";
                  const avatar = profile?.avatar_url;
                  const stage = app.stage ?? "sourcing";
                  const initials = name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <TableRow
                      key={app.id}
                      onClick={() => handleRowClick(app)}
                      className={cn(
                        "border-white/5 cursor-pointer",
                        "hover:bg-white/4 transition-colors",
                      )}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-white/10">
                            <AvatarImage src={avatar ?? ""} alt={name} />
                            <AvatarFallback className="bg-violet-600/20 text-violet-400 text-xs">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-white/80">
                            {name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-white/50">
                        {formatDate(app.applied_date ?? app.created_at ?? "")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs border ${STAGE_COLORS[stage] ?? STAGE_COLORS.sourcing}`}
                        >
                          {stage}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <AiMatchScore
                            score={app.fit_score}
                            insight={app.ai_insight as unknown as AIInsight}
                            size="sm"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination wrapper */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-4">
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </div>
        )}
      </div>

      <QuickViewSheet
        application={selectedApp}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  );
}
