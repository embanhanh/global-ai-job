"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, LogOut, LayoutDashboard, UserCircle } from "lucide-react";
import { signOutOfApp } from "@/actions/auth";
import { useTransition } from "react";
import { toast } from "sonner";

interface UserNavProps {
  user: {
    email?: string;
    user_metadata?: {
      role?: string;
    };
  } | null;
  locale: string;
}

export function UserNav({ user }: UserNavProps) {
  const t = useTranslations("Nav");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/login"
          className="text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          {t("login")}
        </Link>
        <Button
          asChild
          className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-6"
        >
          <Link href="/role-selection">{t("register")}</Link>
        </Button>
      </div>
    );
  }

  const handleSignOut = () => {
    const toastId = toast.loading(t("loggingOut") || "Logging out...");
    startTransition(async () => {
      try {
        await signOutOfApp();
        toast.success(t("logoutSuccess") || "Logged out successfully", {
          id: toastId,
        });
        router.refresh();
      } catch {
        toast.error(t("logoutError") || "Failed to log out", { id: toastId });
      }
    });
  };

  const role = user.user_metadata?.role || "candidate";
  const dashboardHref = role === "recruiter" ? "/recruiter" : "/candidate";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full bg-white/5 border border-white/10 p-0 overflow-hidden"
        >
          <UserCircle className="w-6 h-6 text-violet-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-[#0a0f1d] border-white/10 text-white"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal font-sans">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.email}</p>
            <p className="text-xs leading-none text-white/50 capitalize">
              {role}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuItem
          asChild
          className="focus:bg-white/5 focus:text-white cursor-pointer"
        >
          <Link href={dashboardHref} className="flex items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>{t("dashboard") || "Dashboard"}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          asChild
          className="focus:bg-white/5 focus:text-white cursor-pointer"
        >
          <Link href="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>{t("profile") || "Profile"}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/5" />
        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isPending}
          className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("logout") || "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
