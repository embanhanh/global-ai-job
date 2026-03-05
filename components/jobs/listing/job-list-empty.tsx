"use client";

import { useTranslations } from "next-intl";

export function JobListEmpty() {
  const t = useTranslations("Landing.jobs.search");

  return (
    <div className="py-20 text-center">
      <p className="text-white/20 text-lg">{t("noResults")}</p>
    </div>
  );
}
