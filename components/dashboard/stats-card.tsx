import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden bg-[#0a0a14]/60 backdrop-blur-xl border border-white/5 p-6 group hover:border-violet-500/30 transition-all duration-300",
        className,
      )}
    >
      {/* Background Glow */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-violet-600/10 blur-3xl rounded-full group-hover:bg-violet-600/20 transition-colors duration-300" />

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/50">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-white tracking-tight">
              {value}
            </h3>
            {trend && (
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full",
                  trend.isPositive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400",
                )}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-white/30">{description}</p>
          )}
        </div>
        <div className="p-3 rounded-xl bg-violet-600/10 border border-violet-500/20 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-5 h-5 text-violet-400" />
        </div>
      </div>
    </Card>
  );
}
