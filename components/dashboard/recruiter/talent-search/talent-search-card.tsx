"use client";
import { useTranslations } from "next-intl";
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


interface TalentSearchCardProps {
  result: TalentResult;
}

export function TalentSearchCard({ result }: TalentSearchCardProps) {
  const t = useTranslations("Dashboard.recruiter.search");

  return (
    <Card className="bg-card/60 backdrop-blur-xl border-border p-6 group hover:border-primary/30 transition-all duration-300 shadow-md">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="space-y-4 flex-1">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border border-border">
                <AvatarImage src="" alt={result.name} />
                <AvatarFallback className="bg-primary/10 text-primary font-bold uppercase">
                  {result.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="text-xl font-bold group-hover:text-primary transition-colors">
                  {result.name}
                </h4>
                <p className="text-sm text-muted-foreground">
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
                variant="secondary"
                className="bg-accent text-muted-foreground border-border"
              >
                {skill}
              </Badge>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                {t("aiReasoning")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              &quot;{result.explanation}&quot;
            </p>
          </div>
        </div>

        <div className="flex md:flex-col justify-end gap-2 md:w-40">
          <Button
            variant="outline"
            className="flex-1 md:flex-none border-border hover:bg-accent rounded-xl h-11"
          >
            {t("viewDetails")}
          </Button>
          <Button className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11">
            <UserCheck className="w-4 h-4 mr-2" />
            {t("invite")}
          </Button>
        </div>
      </div>
    </Card>
  );
}
