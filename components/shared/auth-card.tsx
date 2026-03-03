import * as React from "react";
import { cn } from "@/lib/utils";

export function AuthCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full max-w-md rounded-3xl border border-white/10 bg-white/2 backdrop-blur-xl p-8 shadow-2xl overflow-hidden",
        className,
      )}
    >
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/10 blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/10 blur-[60px] pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
