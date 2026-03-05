"use client";

import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { JobSearchParams } from "@/types/jobs";

interface JobSearchHeaderProps {
  initialParams: JobSearchParams;
}

export function JobSearchHeader({ initialParams }: JobSearchHeaderProps) {
  const t = useTranslations("Landing.jobs");

  return (
    <form
      action=""
      method="GET"
      className="mb-12 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row gap-2 items-center"
    >
      <div className="relative flex-1 w-full flex items-center px-4">
        <Search className="w-5 h-5 text-white/40 absolute left-4" />
        <Input
          name="q"
          defaultValue={initialParams.q}
          placeholder={t("search.placeholder")}
          className="bg-transparent border-none text-white placeholder:text-white/20 h-12 pl-10 focus-visible:ring-0"
        />
      </div>
      <div className="hidden md:block w-px h-8 bg-white/10" />
      <div className="relative flex-1 w-full flex items-center px-4">
        <MapPin className="w-5 h-5 text-white/40 absolute left-4" />
        <Input
          name="location"
          defaultValue={initialParams.location}
          placeholder={t("search.location")}
          className="bg-transparent border-none text-white placeholder:text-white/20 h-12 pl-10 focus-visible:ring-0"
        />
      </div>
      <Button
        type="submit"
        className="w-full md:w-auto h-12 px-8 rounded-xl bg-violet-600 hover:bg-violet-500 font-bold transition-all hover:scale-[1.02]"
      >
        {t("search.button")}
      </Button>
    </form>
  );
}
