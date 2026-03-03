import { Search, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type TFunction = (
  key: string,
  values?: Record<string, string | number | boolean | Date>,
) => string;

interface TalentSearchHeaderProps {
  t: TFunction;
}

export function TalentSearchHeader({ t }: TalentSearchHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            {t("title")}
          </h1>
          <p className="text-white/50 mt-1">{t("subtitle")}</p>
        </div>
        <Badge className="bg-violet-600/20 text-violet-400 border-violet-500/20 px-3 py-1 flex items-center gap-2">
          <Zap className="w-4 h-4 fill-violet-400" />
          {t("aiPowered")}
        </Badge>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-violet-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative flex items-center bg-[#0a0a14] border border-white/10 rounded-2xl p-2 h-20 shadow-2xl">
          <div className="flex items-center justify-center w-12 h-12 ml-2 rounded-xl bg-violet-600/10 shrink-0">
            <Sparkles className="w-6 h-6 text-violet-400" />
          </div>
          <input
            type="text"
            placeholder={t("placeholder")}
            className="flex-1 bg-transparent border-none outline-none text-lg text-white placeholder:text-white/20 px-4 h-full"
          />
          <Button
            size="lg"
            className="bg-violet-600 hover:bg-violet-500 text-white rounded-xl px-8 h-12 font-bold shadow-lg shadow-violet-500/20 mr-2"
          >
            <Search className="w-5 h-5 mr-2" />
            {t("submit")}
          </Button>
        </div>
      </div>

      <div className="flex gap-2 text-xs text-white/30">
        <span className="font-semibold uppercase tracking-wider mr-2">
          {t("trySearching")}:
        </span>
        <button className="hover:text-violet-400 transition-colors">
          &quot;Tìm kỹ sư React có 3 năm kinh nghiệm làm AI...&quot;
        </button>
        <span>•</span>
        <button className="hover:text-violet-400 transition-colors">
          &quot;Chuyên gia MLOps thành thạo Kubernetes...&quot;
        </button>
      </div>
    </div>
  );
}
