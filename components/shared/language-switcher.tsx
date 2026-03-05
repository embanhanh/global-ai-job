"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
  const t = useTranslations("Common.language");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = (newLocale: "vi" | "en") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white/70 hover:text-white hover:bg-white/5"
        >
          <Languages className="h-5 w-5" />
          <span className="sr-only">{t("toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-[#0a0f1d] border-white/10 text-white"
      >
        <DropdownMenuItem
          onClick={() => toggleLocale("vi")}
          className={`focus:bg-white/5 cursor-pointer ${
            locale === "vi" ? "text-violet-400 font-bold" : ""
          }`}
        >
          {t("vi")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleLocale("en")}
          className={`focus:bg-white/5 cursor-pointer ${
            locale === "en" ? "text-violet-400 font-bold" : ""
          }`}
        >
          {t("en")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
