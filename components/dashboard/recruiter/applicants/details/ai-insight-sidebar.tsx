import { AlertCircle, CheckCircle2, Star, Wand2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type TFunction = (
  key: string,
  values?: Record<string, string | number | boolean | Date>,
) => string;

interface AIInsightSidebarProps {
  applicant: {
    fitScore: number;
    summary: string;
  };
  t: TFunction;
}

export function AIInsightSidebar({ applicant, t }: AIInsightSidebarProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-linear-to-br from-violet-600/10 to-indigo-600/10 border-violet-500/20 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-violet-400" />
            <h3 className="font-bold text-white text-lg">{t("aiInsight")}</h3>
          </div>
          <div className="flex items-center gap-1.5 bg-violet-600/20 text-violet-400 px-3 py-1 rounded-full border border-violet-500/20">
            <Star className="w-4 h-4 fill-violet-400" />
            <span className="text-sm font-bold">
              {applicant.fitScore}% Match
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {t("summary")}
            </h4>
            <p className="text-sm text-white/60 leading-relaxed italic">
              &quot;{applicant.summary}&quot;
            </p>
          </div>

          <div className="h-px bg-white/5" />

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {t("strengths")}
            </h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                Kinh nghiệm thực tế với LLMs và RAG.
              </li>
              <li className="flex items-start gap-2 text-sm text-white/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                Kỹ năng giải quyết bài toán tối ưu hiệu năng mô hình.
              </li>
            </ul>
          </div>

          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold text-white/80 uppercase tracking-wider">
              {t("weaknesses")}
            </h4>
            <div className="flex items-start gap-2 text-sm text-white/60">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              Kỹ năng giao tiếp tiếng Anh có thể cần kiểm tra thêm.
            </div>
          </div>
        </div>

        <Button className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-xl h-11">
          {t("aiInterview")}
        </Button>
      </Card>

      <Card className="bg-[#0a0a14]/60 backdrop-blur-xl border-white/5 p-6 space-y-4">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
          {t("notes")}
        </h4>
        <div className="space-y-4">
          <Textarea
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white placeholder:text-white/20 min-h-[100px] outline-none focus:border-violet-500/50 transition-colors"
            placeholder={t("addNotes")}
          />
          <Button
            variant="outline"
            className="w-full border-white/10 text-white hover:bg-white/5 rounded-xl"
          >
            {t("saveNotes")}
          </Button>
        </div>
      </Card>
    </div>
  );
}
