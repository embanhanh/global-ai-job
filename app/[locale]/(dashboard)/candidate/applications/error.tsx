"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Common.error");

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 rounded-2xl border border-dashed border-white/10 bg-white/5 space-y-6">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">{t("title")}</h2>
        <p className="text-white/60 max-w-md mx-auto">
          {error.message || t("description")}
        </p>
      </div>

      <Button
        onClick={() => reset()}
        variant="outline"
        className="bg-white/5 border-white/10 hover:bg-white/10 text-white gap-2 h-11 px-6"
      >
        <RefreshCcw className="w-4 h-4" />
        {t("tryAgain")}
      </Button>
    </div>
  );
}
