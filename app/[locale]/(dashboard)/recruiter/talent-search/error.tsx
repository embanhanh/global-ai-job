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
    console.error(error);
  }, [error]);

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center space-y-6 text-center animate-in fade-in duration-500">
      <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 shadow-lg shadow-red-500/10">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {t("title")}
        </h2>
        <p className="text-white/50 max-w-md mx-auto">{t("description")}</p>
      </div>

      <Button
        onClick={() => reset()}
        className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl h-11 px-6 shadow-lg shadow-violet-500/20"
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        {t("tryAgain")}
      </Button>
    </div>
  );
}
