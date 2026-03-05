"use client";

import { useTranslations } from "next-intl";
import { Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

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
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-6">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-violet-700/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-700/10 blur-[120px]" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-violet-300 font-medium">
              {t("badge")}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-8 text-white">
            {t("title")}{" "}
            <span className="bg-linear-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              {t("titleHighlight")}
            </span>
            <br />
            <span className="text-white/40">{t("titleSuffix")}</span>
          </h1>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed mb-12">
            {t("description")}
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative flex flex-col md:flex-row items-center gap-2 p-2 rounded-2xl md:rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="relative flex-1 w-full flex items-center px-4">
                <Search className="w-5 h-5 text-white/40 absolute left-4" />
                <Input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("searchPlaceholder")}
                  className="bg-transparent border-none text-white placeholder:text-white/30 h-12 pl-10 focus-visible:ring-0"
                />
              </div>
              <div className="hidden md:block w-px h-8 bg-white/10" />
              <div className="relative flex-1 w-full flex items-center px-4">
                <MapPin className="w-5 h-5 text-white/40 absolute left-4" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("locationPlaceholder")}
                  className="bg-transparent border-none text-white placeholder:text-white/30 h-12 pl-10 focus-visible:ring-0"
                />
              </div>
              <Button
                onClick={handleSearch}
                className="w-full md:w-auto h-12 px-8 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                {t("searchButton")}
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-white/40">
            <span>{t("popular")}</span>
            {["AI Engineer", "React", "Python", "Data Scientist", "NLP"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => router.push(`/jobs?q=${tag}`)}
                  className="px-3 py-1 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white/60 hover:text-white"
                >
                  {tag}
                </button>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
