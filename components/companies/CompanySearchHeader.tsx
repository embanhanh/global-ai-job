"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "@/hooks/use-debounce";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function CompanySearchHeader() {
  const t = useTranslations("Companies.search");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    // Reset to page 1 when searching
    params.delete("page");
    router.replace(`?${params.toString()}`, { scroll: false });
  }, 500);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="h-5 w-5 text-muted-foreground" />
      </div>
      <Input
        type="search"
        defaultValue={searchParams.get("q")?.toString()}
        placeholder={t("placeholder")}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 h-12 rounded-xl bg-card shadow-sm border-border focus-visible:ring-primary"
      />
    </div>
  );
}
