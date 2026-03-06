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
    console.error("Settings Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 text-center">
      <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
        <AlertCircle className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
        <p className="text-white/40 max-w-md mx-auto">{t("description")}</p>
      </div>
      <Button
        onClick={reset}
        variant="outline"
        className="gap-2 border-white/10 hover:bg-white/5 rounded-xl h-12 px-6"
      >
        <RefreshCcw className="w-4 h-4" />
        {t("tryAgain")}
      </Button>
    </div>
  );
}
