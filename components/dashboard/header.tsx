import { createClient } from "@/lib/supabase/server";
import { UserNav } from "@/components/shared/user-nav";
import { getTranslations } from "next-intl/server";
import { getCurrentRole } from "@/services/profiles.service";
import { UserRole } from "@/types/enums";
import { NotificationBell } from "@/components/notifications/notification-bell";
import { getUnreadCountServer } from "@/services/notifications.service";
import { ThemeToggle } from "@/components/shared/theme-toggle";

interface DashboardHeaderProps {
  locale: string;
}

export async function DashboardHeader({ locale }: DashboardHeaderProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = await getCurrentRole();
  const t = await getTranslations({ locale, namespace: "Dashboard" });
  const unreadCount = user ? await getUnreadCountServer() : 0;

  const titleKey =
    role === UserRole.RECRUITER
      ? "headerTitleRecruiter"
      : "headerTitleCandidate";

  return (
    <header className="sticky top-0 h-20 border-b border-border bg-background/80 backdrop-blur-md z-40 px-6 md:px-8 flex items-center justify-between">
      {/* Search or Breadcrumbs can go here */}
      <div className="flex items-center gap-4">
        <h2 className="text-sm font-medium text-muted-foreground md:block hidden">
          {t(titleKey)}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user && (
          <NotificationBell initialUnreadCount={unreadCount} locale={locale} />
        )}
        <UserNav user={user || null} locale={locale} />
      </div>
    </header>
  );
}
