import { getTranslations } from "next-intl/server";

export async function CompanyAbout({
  description,
}: {
  description: string | null;
}) {
  const t = await getTranslations("CompanyDetail");

  if (!description) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
        {t("about")}
      </h2>
      <div className="prose prose-slate max-w-none text-slate-600 dark:prose-invert dark:text-slate-400">
        <p className="whitespace-pre-line leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
