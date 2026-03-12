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
      <h2 className="text-xl font-bold text-foreground">
        {t("about")}
      </h2>
      <div className="prose prose-slate max-w-none text-muted-foreground dark:prose-invert">
        <p className="whitespace-pre-line leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
