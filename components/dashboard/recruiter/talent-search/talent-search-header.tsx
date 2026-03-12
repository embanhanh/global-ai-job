"use client";

import { useTransition, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export function TalentSearchHeader() {
  const t = useTranslations("Dashboard.recruiter.search");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("query")?.toString() || "",
  );
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (term.trim()) {
        params.set("query", term.trim());
      } else {
        params.delete("query");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const setQuery = (term: string) => {
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t("title")}
          </h1>
          <p className="text-muted-foreground mt-1">{t("subtitle")}</p>
        </div>
        <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 flex items-center gap-2">
          <Zap className="w-4 h-4 fill-primary" />
          {t("aiPowered")}
        </Badge>
      </div>

      <form onSubmit={onSubmit} className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-primary to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-card border border-border rounded-2xl p-2 h-20 shadow-xl">
          <div className="flex items-center justify-center w-12 h-12 ml-2 rounded-xl bg-primary/10 shrink-0">
            {isPending ? (
              <Zap className="w-6 h-6 text-primary animate-pulse" />
            ) : (
              <Sparkles className="w-6 h-6 text-primary" />
            )}
          </div>
          <input
            id="ai-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/30 px-4 h-full"
          />
          <Button
            type="submit"
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20 mr-2"
          >
            <Search className="w-5 h-5 mr-2" />
            {t("submit")}
          </Button>
        </div>
      </form>

      <div className="hidden md:flex gap-2 text-xs text-muted-foreground/50 items-center">
        <span className="font-semibold uppercase tracking-wider mr-2 shrink-0">
          {t("trySearching")}:
        </span>
        <button
          onClick={() => setQuery(t("trySuggestion1"))}
          className="hover:text-primary transition-colors truncate text-left"
        >
          &quot;{t("trySuggestion1")}&quot;
        </button>
        <span className="shrink-0">•</span>
        <button
          onClick={() => setQuery(t("trySuggestion2"))}
          className="hover:text-primary transition-colors truncate text-left"
        >
          &quot;{t("trySuggestion2")}&quot;
        </button>
      </div>
    </div>
  );
}
