"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function JobDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Common.error");
  const tDetail = useTranslations("Dashboard.recruiter.jobs.detail");

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6 animate-in fade-in duration-500">
      <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white">{t("title")}</h2>
        <p className="text-white/40 text-sm max-w-sm">
          {error.message || t("description")}
        </p>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={reset}
          className="bg-violet-600 hover:bg-violet-500 text-white"
        >
          {t("tryAgain")}
        </Button>
        <Button
          variant="outline"
          asChild
          className="border-white/10 text-white/60 hover:text-white"
        >
          <Link href="/recruiter/jobs">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {tDetail("errorBack")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
