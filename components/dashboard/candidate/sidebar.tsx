"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  User,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
interface CandidateSidebarProps {
  locale: string;
  initialProfileCompletion: number;
}
export function CandidateSidebar({
  initialProfileCompletion,
}: CandidateSidebarProps) {
  const t = useTranslations("Dashboard.candidate.sidebar");
  const t_common = useTranslations("Common");
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const profileCompletion = initialProfileCompletion;
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
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className={cn(
        "relative h-screen bg-[#0a0a14]/80 backdrop-blur-xl border-r border-white/5 flex flex-col transition-all duration-300 ease-in-out z-50 overflow-hidden hidden md:flex",
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
                  layoutId="active-pill-candidate"
                  className="absolute left-0 w-1 h-6 bg-violet-600 rounded-r-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
      {/* Profile Completion - Progress Bar */}
      {!isCollapsed && (
        <div className="px-6 py-6 border-t border-white/5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-wider text-white/40 font-semibold">
              {t("profileCompletion")}
            </span>
            <span className="text-xs font-bold text-violet-400">
              {profileCompletion}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${profileCompletion}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-violet-600 to-indigo-500 rounded-full"
            />
          </div>
        </div>
      )}
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
