"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, User, Heart, Settings } from "lucide-react";
export function CandidateMobileNav() {
  const t = useTranslations("Dashboard.candidate.sidebar");
  const pathname = usePathname();
  const navItems = [
    {
      href: "/candidate",
      label: t("overview"),
      icon: LayoutDashboard,
    },
    {
      href: "/candidate/applications",
      label: t("myApplications"),
      icon: FileText,
    },
    {
      href: "/candidate/profile",
      label: t("profile"),
      icon: User,
    },
    {
      href: "/candidate/saved",
      label: t("savedJobs"),
      icon: Heart,
    },
    {
      href: "/candidate/settings",
      label: t("settings"),
      icon: Settings,
    },
  ];
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-t border-border px-4 pb-safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium truncate w-full text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
