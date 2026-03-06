"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ProfileError({
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
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 text-center animate-in fade-in zoom-in duration-300">
      <div className="p-4 rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="w-12 h-12" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          {t("description")}
        </p>
      </div>
      <Button
        onClick={() => reset()}
        variant="outline"
        className="gap-2 hover:bg-muted transition-colors"
      >
        <RefreshCcw className="w-4 h-4" />
        {t("tryAgain")}
      </Button>
    </div>
  );
}
