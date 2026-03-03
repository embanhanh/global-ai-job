import { Star, Sparkles, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface TalentResult {
  id: string;
  name: string;
  role: string;
  fitScore: number;
  skills: string[];
  experience: string;
  explanation: string;
}

type TFunction = (
  key: string,
  values?: Record<string, string | number | boolean | Date>,
) => string;

interface TalentSearchCardProps {
  result: TalentResult;
  t: TFunction;
}

export function TalentSearchCard({ result, t }: TalentSearchCardProps) {
  return (
    <Card className="bg-[#0a0a14]/60 backdrop-blur-xl border-white/5 p-6 group hover:border-violet-500/30 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="space-y-4 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border border-white/10">
                <AvatarImage src="" alt={result.name} />
                <AvatarFallback className="bg-violet-600/20 text-violet-400 font-bold uppercase">
                  {result.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-xl font-bold text-white group-hover:text-violet-400 transition-colors">
                  {result.name}
                </h4>
                <p className="text-sm text-white/50">
                  {result.role} • {result.experience}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                <Star className="w-3.5 h-3.5 fill-emerald-400" />
                <span className="text-sm font-bold">
                  {result.fitScore}% {t("match")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="bg-white/5 border-white/10 text-white/60"
              >
                {skill}
              </Badge>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-violet-600/5 border border-violet-500/10">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest">
                {t("aiReasoning")}
              </span>
            </div>
            <p className="text-sm text-white/70 italic leading-relaxed">
              &quot;{result.explanation}&quot;
            </p>
          </div>
        </div>

        <div className="flex md:flex-col justify-end gap-2 md:w-40">
          <Button
            variant="outline"
            className="flex-1 md:flex-none border-white/10 text-white hover:bg-white/5 rounded-xl h-11"
          >
            {t("viewDetails")}
          </Button>
          <Button className="flex-1 md:flex-none bg-violet-600 hover:bg-violet-500 text-white rounded-xl h-11">
            <UserCheck className="w-4 h-4 mr-2" />
            {t("invite")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
