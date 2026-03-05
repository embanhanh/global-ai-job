"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";
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
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 text-red-400 mb-4">
          <AlertCircle className="w-10 h-10" />
        </div>
        <h2 className="text-3xl font-bold text-white">{t("title")}</h2>
        <p className="text-white/40 leading-relaxed">{t("description")}</p>
        <div className="flex justify-center gap-4 pt-4">
          <Button
            onClick={() => reset()}
            className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-8 h-12 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            {t("tryAgain")}
          </Button>
        </div>
      </div>
    </div>
  );
}
