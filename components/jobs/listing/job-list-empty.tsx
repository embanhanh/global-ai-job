"use client";

import { useTranslations } from "next-intl";

export function JobListEmpty() {
  const t = useTranslations("Landing.jobs.search");

  return (
    <div className="py-20 text-center">
      <p className="text-muted-foreground/50 text-xl font-medium">{t("noResults")}</p>
    </div>
  );
}
