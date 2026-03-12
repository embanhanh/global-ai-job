import { notFound } from "next/navigation";
import {
  getPublicCompanyById,
  getCompanyActiveJobs,
} from "@/services/companies-public.service";
import { isFollowing } from "@/services/follows.service";
import { CompanyHeader } from "@/components/companies/detail/CompanyHeader";
import { CompanyAbout } from "@/components/companies/detail/CompanyAbout";
import { CompanyJobsList } from "@/components/companies/detail/CompanyJobsList";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { id } = params;
  const { data: company } = await getPublicCompanyById(id);

  if (!company) {
    return {
      title: "Company Not Found",
    };
  }

  const title = `${company.name} | Global AI Job Board`;
  const description =
    company.description ||
    `View open roles and information about ${company.name} on the Global AI Job Board.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: company.logo_url ? [company.logo_url] : [],
    },
  };
}

export default async function CompanyDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;
  const [{ data: company }, { data: jobs }, isFollowingCompany] =
    await Promise.all([
      getPublicCompanyById(id),
      getCompanyActiveJobs(id),
      isFollowing(id),
    ]);

  if (!company) {
    notFound();
  }

  // Generate Organization Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url: company.website,
    logo: company.logo_url,
    description: company.description,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="bg-background min-h-screen pb-20 pt-20">
        <div className="border-b border-border bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-8 md:py-12 md:px-6">
            <CompanyHeader company={company} isFollowing={isFollowingCompany} />
          </div>
        </div>

        <div className="container mx-auto px-4 mt-8 space-y-12 md:px-6">
          <section>
            <CompanyAbout description={company.description} />
          </section>

          <section>
            <CompanyJobsList jobs={jobs || []} />
          </section>
        </div>
      </div>
    </>
  );
}
