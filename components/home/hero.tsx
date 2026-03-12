"use client";

import { useTranslations } from "next-intl";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { LocationSelector } from "@/components/shared/location-selector";
import { Hero3D } from "./hero-3d";
import { AnimeReveal } from "@/components/shared/anime-reveal";

export function HomeHero() {
  const t = useTranslations("Landing.hero");
  const router = useRouter();
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (location) params.set("location", location);

    const queryString = params.toString();
    router.push(`/jobs${queryString ? `?${queryString}` : ""}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 px-6 overflow-hidden bg-background">
      {/* 3D Content */}
      <Hero3D />

      {/* Background radial glow — theme-aware */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, var(--hero-glow) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <AnimeReveal stagger={150} delay={200}>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md mb-8 animate-pulse"
            style={{
              background: "var(--hero-badge-bg, var(--primary)/0.08)",
              border: "1px solid var(--primary)",
              borderColor: "oklch(from var(--primary) l c h / 0.2)",
            }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              {t("badge")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-8xl font-black text-foreground tracking-tight mb-8">
            {t("title")} <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-size-[200%_auto] animate-shimmer">
              {t("titleHighlight")}
            </span>{" "}
            <br />
            {t("titleSuffix")}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            {t("description")}
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="p-2 rounded-2xl glass shadow-2xl flex flex-col md:flex-row gap-2 items-center">
              <div className="relative flex-1 w-full flex items-center px-4">
                <Search className="w-5 h-5 text-muted-foreground absolute left-4" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("searchPlaceholder")}
                  className="bg-transparent border-none text-foreground placeholder:text-muted-foreground/60 h-12 pl-10 focus-visible:ring-0"
                />
              </div>
              <div className="hidden md:block w-px h-8 bg-border" />
              <div className="relative flex-1 w-full">
                <LocationSelector
                  value={location}
                  onChange={setLocation}
                  placeholder={t("locationPlaceholder")}
                  className="bg-transparent border-none hover:bg-transparent h-12"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="w-full md:w-auto h-12 px-8 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                {t("searchButton")}
              </Button>
            </div>
          </div>

          {/* Popular Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground mt-12">
            <span>{t("popular")}</span>
            {["AI Engineer", "React", "Python", "Data Scientist", "NLP"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => router.push(`/jobs?q=${tag}`)}
                  className="px-3 py-1 rounded-full border border-border bg-muted/40 hover:bg-muted hover:border-primary/30 transition-all text-foreground/70 hover:text-foreground"
                >
                  {tag}
                </button>
              ),
            )}
          </div>
        </AnimeReveal>
      </div>
    </section>
  );
}
