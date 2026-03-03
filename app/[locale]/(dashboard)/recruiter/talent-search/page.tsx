import { getTranslations } from "next-intl/server";
import { TalentSearchHeader } from "@/components/dashboard/recruiter/talent-search/talent-search-header";
import { TalentSearchFilters } from "@/components/dashboard/recruiter/talent-search/talent-search-filters";
import { TalentSearchResults } from "@/components/dashboard/recruiter/talent-search/talent-search-results";
import type { TalentResult } from "@/components/dashboard/recruiter/talent-search/talent-search-card";

type TFunction = (
  key: string,
  values?: Record<string, string | number | boolean | Date>,
) => string;

export default async function TalentSearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "Dashboard.recruiter.search",
  });
  const t_common = await getTranslations({ locale, namespace: "Common" });

  // Mock search results
  const mockResults: TalentResult[] = [
    {
      id: "a1",
      name: "Nguyên Văn A",
      role: "Senior AI Engineer",
      fitScore: 98,
      skills: ["PyTorch", "LLMs", "RAG", "System Design"],
      experience: "5+ năm",
      explanation:
        "Ứng viên này có kinh nghiệm sâu rộng về RAG và triển khai LLMs, khớp 100% với yêu cầu công việc hiện tại của bạn.",
    },
    {
      id: "a4",
      name: "Phạm Minh D",
      role: "AI Tech Lead",
      fitScore: 94,
      skills: ["TensorFlow", "Computer Vision", "MLOps", "Python"],
      experience: "8+ năm",
      explanation:
        "Chuyên gia về Computer Vision, có khả năng dẫn dắt đội ngũ kỹ thuật mạnh mẽ.",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <TalentSearchHeader t={t as TFunction} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-6">
          <TalentSearchFilters
            t={t as TFunction}
            t_common={t_common as unknown as TFunction}
          />
        </div>

        <TalentSearchResults
          results={mockResults}
          t={t as unknown as TFunction}
        />
      </div>
    </div>
  );
}
