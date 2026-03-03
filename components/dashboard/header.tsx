import { createClient } from "@/lib/supabase/server";
import { UserNav } from "@/components/shared/user-nav";
import { getTranslations } from "next-intl/server";

interface DashboardHeaderProps {
  locale: string;
}

export async function DashboardHeader({ locale }: DashboardHeaderProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const t = await getTranslations({ locale, namespace: "Dashboard" });

  return (
    <header className="sticky top-0 h-20 border-b border-white/5 bg-[#06060c]/80 backdrop-blur-md z-40 px-6 md:px-8 flex items-center justify-between">
      {/* Search or Breadcrumbs can go here */}
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-white/50 md:block hidden">
          {t("headerTitle")}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* We can add a simple language switcher here later if needed */}
        <UserNav user={user || null} locale={locale} />
      </div>
    </header>
  );
}
