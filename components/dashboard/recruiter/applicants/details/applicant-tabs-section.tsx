import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type TFunction = (key: string) => string;

interface ApplicantTabsSectionProps {
  t: TFunction;
}

export function ApplicantTabsSection({ t }: ApplicantTabsSectionProps) {
  return (
    <Tabs defaultValue="cv" className="w-full">
      <TabsList className="bg-[#0a0a14]/40 border border-white/5 p-1 w-full justify-start h-12">
        <TabsTrigger
          value="cv"
          className="data-[state=active]:bg-white/5 data-[state=active]:text-white text-white/40 px-6"
        >
          {t("cv")}
        </TabsTrigger>
        <TabsTrigger
          value="experience"
          className="data-[state=active]:bg-white/5 data-[state=active]:text-white text-white/40 px-6"
        >
          {t("experience")}
        </TabsTrigger>
        <TabsTrigger
          value="education"
          className="data-[state=active]:bg-white/5 data-[state=active]:text-white text-white/40 px-6"
        >
          {t("education")}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cv" className="mt-4">
        <Card className="bg-[#0a0a14]/60 backdrop-blur-xl border-white/5 h-[600px] flex items-center justify-center relative group overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.05),transparent_70%)]" />
          <div className="text-center space-y-4 relative z-10">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:border-violet-500/30 transition-colors">
              <FileText className="w-8 h-8 text-white/20 group-hover:text-violet-400 transition-colors" />
            </div>
            <p className="text-white/40 text-sm">{t("loadingCv")}</p>
            <Button
              variant="outline"
              className="border-white/10 text-white/70 hover:text-white"
            >
              {t("viewCv")}
            </Button>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="experience" className="mt-4">
        <Card className="bg-[#0a0a14]/60 backdrop-blur-xl border-white/5 p-8 min-h-[400px]">
          <div className="flex flex-col items-center justify-center h-full pt-20 text-center space-y-4">
            <p className="text-white/40 italic">{t("expDetails")}</p>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="education" className="mt-4">
        <Card className="bg-[#0a0a14]/60 backdrop-blur-xl border-white/5 p-8 min-h-[400px]">
          <div className="flex flex-col items-center justify-center h-full pt-20 text-center space-y-4">
            <p className="text-white/40 italic">
              Chi tiết học vấn sẽ được hiển thị ở đây.
            </p>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
