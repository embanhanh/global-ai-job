import { CandidateSidebar } from "@/components/dashboard/candidate/sidebar";
import { CandidateMobileNav } from "@/components/dashboard/candidate/mobile-nav";
import { DashboardHeader } from "@/components/dashboard/header";
import { getProfileCompletionProgress } from "@/services/profiles.service";

export default async function CandidateLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const profileCompletion = await getProfileCompletionProgress();

  return (
    <div className="flex h-screen bg-[#050508] text-white overflow-hidden">
      {/* Sidebar for Desktop */}
      <CandidateSidebar
        locale={locale}
        initialProfileCompletion={profileCompletion}
      />
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        {/* Header */}
        <DashboardHeader locale={locale} />
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pb-20 md:pb-0">
          <div className="container max-w-7xl mx-auto p-4 md:p-8">
            {children}
          </div>
        </main>
        {/* Bottom Nav for Mobile */}
        <CandidateMobileNav />
      </div>
    </div>
  );
}
