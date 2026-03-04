"use client";

import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Mail, ThumbsUp, AlertTriangle } from "lucide-react";
import { AiMatchScore } from "./ai-match-score";
import { Application, AIInsight, aiInsightSchema } from "@/types/jobs";
import { useTranslations } from "next-intl";
import { formatDate } from "@/lib/utils";

interface QuickViewSheetProps {
  application: Application | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STAGE_COLORS: Record<string, string> = {
  sourcing: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  screening: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  interview: "bg-violet-500/20 text-violet-400 border-violet-500/30",
  offer: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  hired: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

function parseAiInsight(raw: unknown): AIInsight | null {
  if (!raw) return null;
  const result = aiInsightSchema.safeParse(raw);
  return result.success ? result.data : null;
}

export function QuickViewSheet({
  application,
  open,
  onOpenChange,
}: QuickViewSheetProps) {
  const t = useTranslations("Dashboard.recruiter.jobs.detail.quickView");
  const tCommon = useTranslations("Dashboard.recruiter.applicants.details");

  if (!application) return null;

  const name = application.profiles?.full_name ?? "Unknown";
  const email = application.profiles?.email;
  const avatar = application.profiles?.avatar_url;
  const stage = application.stage ?? "sourcing";
  const insight = parseAiInsight(application.ai_insight);
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[480px] bg-[#0f0f1a] border-white/10 overflow-y-auto p-0"
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col h-full"
        >
          {/* Header */}
          <SheetHeader className="p-6 pb-4 border-b border-white/5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-white/10">
                  <AvatarImage src={avatar ?? ""} alt={name} />
                  <AvatarFallback className="bg-violet-600/20 text-violet-400 text-lg font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <SheetTitle className="text-white text-lg font-bold">
                    {name}
                  </SheetTitle>
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white/70 transition-colors mt-0.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {email}
                    </a>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      className={`text-xs border ${STAGE_COLORS[stage] ?? STAGE_COLORS.sourcing}`}
                    >
                      {stage}
                    </Badge>
                  </div>
                </div>
              </div>
              <AiMatchScore
                score={application.fit_score}
                insight={insight}
                size="lg"
              />
            </div>
            <p className="text-xs text-white/30 mt-2">
              {tCommon("appliedAt")}:{" "}
              {formatDate(
                application.applied_date ?? application.created_at ?? "",
              )}
            </p>
          </SheetHeader>

          {/* Body */}
          <div className="flex-1 p-6 space-y-6">
            {/* AI Summary */}
            {application.ai_summary && (
              <div>
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                  {t("aiSummary")}
                </h4>
                <p className="text-sm text-white/70 leading-relaxed bg-white/3 rounded-xl p-4 border border-white/5">
                  {application.ai_summary}
                </p>
              </div>
            )}

            {/* AI Insight */}
            {insight && (
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-wider">
                  {t("aiInsight")}
                </h4>

                {insight.strengths?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-semibold text-emerald-400">
                        {tCommon("strengths")}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {insight.strengths.map((s, i) => (
                        <li
                          key={i}
                          className="text-xs text-white/60 flex gap-2 items-start"
                        >
                          <span className="text-emerald-400 mt-0.5">•</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {insight.weaknesses?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-semibold text-amber-400">
                        {tCommon("weaknesses")}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {insight.weaknesses.map((w, i) => (
                        <li
                          key={i}
                          className="text-xs text-white/60 flex gap-2 items-start"
                        >
                          <span className="text-amber-400 mt-0.5">•</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <Separator className="bg-white/5" />

            {/* CV Link */}
            {application.resume_url && (
              <Button
                variant="outline"
                className="w-full border-white/10 hover:bg-white/5 hover:text-white text-white/60"
                asChild
              >
                <a
                  href={application.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {tCommon("viewCv")} (CV gốc)
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
