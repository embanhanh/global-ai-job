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
          className="rounded-full text-foreground/70 hover:text-foreground hover:bg-accent"
        >
          <Languages className="h-5 w-5" />
          <span className="sr-only">{t("toggle")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-popover border-border text-foreground"
      >
        <DropdownMenuItem
          onClick={() => toggleLocale("vi")}
          className={`focus:bg-accent cursor-pointer ${
            locale === "vi" ? "text-primary font-bold" : ""
          }`}
        >
          {t("vi")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => toggleLocale("en")}
          className={`focus:bg-accent cursor-pointer ${
            locale === "en" ? "text-primary font-bold" : ""
          }`}
        >
          {t("en")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
