import { Calendar, Mail, Phone, Wand2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type TFunction = (key: string) => string;

interface ApplicantInfoCardProps {
  applicant: {
    name: string;
    role: string;
    fitScore: number;
    email: string;
    phone: string;
    appliedDate: string;
    stage: string;
  };
  t: TFunction;
}

export function ApplicantInfoCard({ applicant, t }: ApplicantInfoCardProps) {
  return (
    <Card className="bg-[#0a0a14]/60 backdrop-blur-xl border-white/5 p-6 overflow-hidden relative">
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-violet-500/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-violet-500/10 text-violet-400 text-xl font-bold">
              {applicant.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-white">{applicant.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-white/40 text-sm">{applicant.role}</span>
              <Badge
                variant="secondary"
                className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              >
                {t("highFit")}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">
            {applicant.fitScore}%
          </div>
          <div className="text-[10px] text-white/20 font-bold uppercase tracking-wider mt-1">
            AI Match Score
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5">
        <div>
          <div className="text-[10px] text-white/20 font-bold uppercase tracking-wider mb-1">
            {t("appliedAt")}
          </div>
          <div className="text-white/80 text-sm flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-violet-400" />
            {applicant.appliedDate}
          </div>
        </div>
        <div className="col-span-2">
          <div className="text-[10px] text-white/20 font-bold uppercase tracking-wider mb-1">
            Mục liên lạc
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-violet-400" />
              {applicant.email}
            </span>
            <span className="text-white/80 text-sm flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-violet-400" />
              {applicant.phone}
            </span>
          </div>
        </div>
        <div>
          <div className="text-[10px] text-white/20 font-bold uppercase tracking-wider mb-1">
            Trạng thái hiện tại
          </div>
          <div className="text-white/80 text-sm flex items-center gap-2">
            <Wand2 className="w-3.5 h-3.5 text-violet-400" />
            {t(applicant.stage)}
          </div>
        </div>
      </div>
    </Card>
  );
}
