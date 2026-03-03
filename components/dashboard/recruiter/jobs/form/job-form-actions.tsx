import { useTranslations } from "next-intl";
import { Save, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "@/i18n/navigation";
import { UseFormSetValue } from "react-hook-form";
import { JobFormValues } from "@/types/jobs";

interface JobFormActionsProps {
  isSubmitting: boolean;
  t: (key: string) => string;
  setValue: UseFormSetValue<JobFormValues>;
}

export function JobFormActions({
  isSubmitting,
  t,
  setValue,
}: JobFormActionsProps) {
  const router = useRouter();
  const t_common = useTranslations("Common");

  const handlePostJob = () => {
    setValue("status", "active");
  };

  const handleSaveDraft = () => {
    setValue("status", "draft");
  };

  return (
    <Card className="bg-[#0a0a14]/60 backdrop-blur-xl border-white/5 p-6 space-y-4">
      <h4 className="text-sm font-semibold text-white">
        {t_common("actions")}
      </h4>
      <div className="space-y-2">
        <Button
          type="submit"
          onClick={handlePostJob}
          disabled={isSubmitting}
          className="w-full bg-violet-600 hover:bg-violet-500 text-white h-11 shadow-lg shadow-violet-500/20"
        >
          <Send className="w-4 h-4 mr-2" />
          {t("submit")}
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={handleSaveDraft}
          variant="outline"
          className="w-full border-white/10 text-white hover:bg-white/5 h-11"
        >
          <Save className="w-4 h-4 mr-2" />
          {t("saveDraft")}
        </Button>
        <Button
          type="button"
          variant="ghost"
          disabled={isSubmitting}
          onClick={() => router.back()}
          className="w-full text-white/70 hover:text-white h-11"
        >
          <X className="w-4 h-4 mr-2" />
          {t("cancel")}
        </Button>
      </div>
    </Card>
  );
}
