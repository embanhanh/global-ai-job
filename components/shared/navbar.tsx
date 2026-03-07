import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Briefcase } from "lucide-react";
import { UserNav } from "@/components/shared/user-nav";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { createClient } from "@/lib/supabase/server";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { getUnreadCountServer } from "@/services/notifications.service";

export async function Navbar({ locale }: { locale: string }) {
  const t = await getTranslations("Nav");
  const tCommon = await getTranslations("Common");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const unreadCount = user ? await getUnreadCountServer() : 0;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050816]/80 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center transition-transform group-hover:scale-110">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">
              {tCommon("brand")}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/jobs"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {t("findJobs")}
            </Link>
            <Link
              href="/companies"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {t("companies")}
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors"
            >
              {t("pricing")}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {user && (
            <NotificationBell
              initialUnreadCount={unreadCount}
              locale={locale}
            />
          )}
          <UserNav user={user} locale={locale} />
        </div>
      </div>
    </nav>
  );
}
