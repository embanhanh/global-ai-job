"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Common.error");

  useEffect(() => {
    console.error("Saved Jobs Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-slate-900/50 backdrop-blur-xl rounded-3xl border border-white/10">
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">
        {t?.("title") || "Something went wrong!"}
      </h2>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        {t?.("savedJobsDescription") ||
          "We couldn't load your saved jobs. Please try again."}
      </p>
      <Button
        onClick={() => reset()}
        className="bg-violet-600 hover:bg-violet-500 text-white px-8"
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        {t?.("retry") || "Retry"}
      </Button>
    </div>
  );
}
