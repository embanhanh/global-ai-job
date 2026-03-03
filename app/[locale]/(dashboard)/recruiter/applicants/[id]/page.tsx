import { getTranslations } from "next-intl/server";
import { ChevronLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { ApplicantInfoCard } from "@/components/dashboard/recruiter/applicants/details/applicant-info-card";
import { ApplicantTabsSection } from "@/components/dashboard/recruiter/applicants/details/applicant-tabs-section";
import { AIInsightSidebar } from "@/components/dashboard/recruiter/applicants/details/ai-insight-sidebar";

type TFunction = (
  key: string,
  values?: Record<string, string | number | boolean | Date>,
) => string;

export default async function ApplicantDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.recruiter.applicants",
  });
  const t_details = await getTranslations({
    locale,
    namespace: "Dashboard.recruiter.applicants.details",
  });

  // Mock applicant data
  const applicant = {
    id,
    name: "Nguyễn Văn A",
    role: "Senior AI Engineer",
    email: "nguyenvan.a@example.com",
    phone: "+84 90 123 4567",
    appliedDate: "26 Feb, 2024",
    fitScore: 92,
    stage: "interview",
    avatar: "",
    summary:
      "Nguyễn Văn A là một kỹ sư chuyên về AI với hơn 5 năm kinh nghiệm trong việc phát triển các mô hình học sâu. Anh ấy có kiến thức chuyên sâu về PyTorch, TensorFlow và đã từng triển khai nhiều hệ thống AI quy mô lớn trong môi trường sản xuất.",
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Link
          href="/recruiter/applicants"
          className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group px-1 w-fit"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("details.backToList")}
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="text-white/70 hover:text-white h-11 border border-white/5"
          >
            {t("details.reject")}
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-500 text-white h-11">
            {t("details.moveToInterview")}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ApplicantInfoCard applicant={applicant} t={t_details as TFunction} />
          <ApplicantTabsSection t={t_details as TFunction} />
        </div>

        <AIInsightSidebar applicant={applicant} t={t_details as TFunction} />
      </div>
    </div>
  );
}

// Minimal Avatar components
