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
      href: "/settings",
      label: t("settings"),
      icon: Settings,
    },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "relative h-screen bg-[#0a0a14]/80 backdrop-blur-xl border-r border-white/5 fle x flex-col transition-all duration-300 ease-in-out z-50 overflow-hidden hidden md:flex",
        isCollapsed ? "items-center" : "",
      )}
    >
      {/* Logo Area */}
      <div
        onClick={() => router.push("/")}
        className={cn(
          "p-6 flex items-center gap-3",
          isCollapsed ? "justify-center" : "",
        )}
      >
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-violet-500/20">
          <Zap className="w-6 h-6 text-white fill-white/20" />
        </div>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-bold text-white tracking-tight"
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
                  ? "bg-violet-600/10 text-violet-400"
                  : "text-white/50 hover:text-white hover:bg-white/5",
                isCollapsed ? "justify-center px-0 w-12 h-12 mx-auto" : "",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "text-violet-400" : "group-hover:text-white",
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
                  className="absolute left-0 w-1 h-6 bg-violet-600 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
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
