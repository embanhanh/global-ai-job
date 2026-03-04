"use client";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AIInsight } from "@/types/jobs";

interface AiMatchScoreProps {
  score: number | null;
  insight?: AIInsight | null;
  size?: "sm" | "md" | "lg";
}

function getScoreConfig(score: number) {
  if (score >= 70) {
    return {
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/40",
      text: "text-emerald-400",
      ring: "ring-emerald-500/30",
      label: "High Match",
    };
  }
  if (score >= 40) {
    return {
      bg: "bg-amber-500/20",
      border: "border-amber-500/40",
      text: "text-amber-400",
      ring: "ring-amber-500/30",
      label: "Medium Match",
    };
  }
  return {
    bg: "bg-slate-500/20",
    border: "border-slate-500/40",
    text: "text-slate-400",
    ring: "ring-slate-500/30",
    label: "Low Match",
  };
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function AiMatchScore({
  score,
  insight,
  size = "md",
}: AiMatchScoreProps) {
  const normalizedScore = score ?? 0;
  const config = getScoreConfig(normalizedScore);

  const badge = (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-bold ring-2 cursor-default transition-transform hover:scale-110",
        config.bg,
        config.border,
        config.text,
        config.ring,
        sizeClasses[size],
      )}
    >
      {normalizedScore}
    </div>
  );

  if (!insight) {
    return badge;
  }

  const matchedSkillsCount = insight.key_skills?.length ?? 0;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent
          side="right"
          className="max-w-[260px] bg-[#1a1a2e] border-white/10 p-3 space-y-2"
        >
          <div className="flex items-center justify-between mb-2">
            <span className={cn("text-xs font-bold", config.text)}>
              {config.label}
            </span>
            <span className="text-white/60 text-xs">
              {matchedSkillsCount} key skills
            </span>
          </div>
          {insight.match_explanation && (
            <p className="text-xs text-white/70 leading-relaxed">
              {insight.match_explanation}
            </p>
          )}
          {insight.key_skills?.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {insight.key_skills.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] bg-white/5 text-white/50 px-1.5 py-0.5 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
