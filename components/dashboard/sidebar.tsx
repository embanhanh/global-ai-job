"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

interface SidebarProps {
  locale: string;
}

export function Sidebar({}: SidebarProps) {
  const t = useTranslations("Dashboard.sidebar");
  const t_common = useTranslations("Common");
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      href: "/recruiter",
      label: t("overview"),
      icon: LayoutDashboard,
    },
    {
      href: "/recruiter/jobs",
      label: t("jobs"),
      icon: Briefcase,
    },
    {
      href: "/recruiter/applicants",
      label: t("applicants"),
      icon: Users,
    },
    {
      href: "/recruiter/talent-search",
      label: t("talentSearch"),
      icon: Search,
    },
    {
      href: "/recruiter/settings",
      label: t("settings"),
      icon: Settings,
    },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "relative h-screen bg-sidebar/80 backdrop-blur-xl border-r border-sidebar-border hidden flex-col transition-all duration-300 ease-in-out z-50 overflow-hidden md:flex",
        isCollapsed ? "items-center" : "",
      )}
    >
      {/* Logo Area */}
      <div
        onClick={() => router.push("/")}
        className={cn(
          "p-6 flex items-center gap-3 cursor-pointer",
          isCollapsed ? "justify-center" : "",
        )}
      >
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
          <Zap className="w-6 h-6 text-white fill-white/20" />
        </div>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-bold text-sidebar-foreground tracking-tight"
          >
            {t_common("brand")}
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground/50 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                isCollapsed ? "justify-center px-0 w-12 h-12 mx-auto" : "",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-primary" : "group-hover:text-sidebar-foreground",
                )}
              />
              {!isCollapsed && (
                <span className="text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              )}
              {isActive && !isCollapsed && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
