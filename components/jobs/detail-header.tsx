import { ChevronLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface JobDetailHeaderProps {
  title: string;
  company: string;
}

export function JobDetailHeader({ title, company }: JobDetailHeaderProps) {
  const t = useTranslations("Landing.jobs.detail");

  return (
    <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 mb-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/jobs"
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white/40" />
          </Link>
          <div className="hidden md:block">
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <p className="text-xs text-white/40">{company}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-white/10 text-white/60 hover:text-white hover:bg-white/5 rounded-full px-6 hidden sm:flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {t("share")}
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-500 text-white rounded-full px-8 font-bold shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            {t("applyNow")}
          </Button>
        </div>
      </div>
    </div>
  );
}
