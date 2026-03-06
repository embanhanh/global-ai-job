import { Metadata } from "next";
import { JobDetailHeader } from "@/components/jobs/detail-header";
import { CompanyCard } from "@/components/jobs/company-card";
import { JobDetailContent } from "@/components/jobs/detail-content";
import { getJobById, isJobSaved } from "@/services/jobs.service";
import { notFound } from "next/navigation";
import { hasAppliedToJob } from "@/services/applications.service";
import { formatDistanceToNow } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { getProfile, getCurrentRole } from "@/services/profiles.service";
import { UserRole } from "@/types/enums";
import { createClient } from "@/lib/supabase/server";

interface JobDetailPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: JobDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) return { title: "Job Not Found" };

  return {
    title: `${job.title} - ${job.company.name} | Global AI Job Board`,
    description: `Join ${job.company.name} as a ${job.title}. Apply now on Global AI Job Board.`,
  };
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id, locale } = await params;
  const job = await getJobById(id);
  const hasApplied = await hasAppliedToJob(id);
  const profileResult = await getProfile();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = await getCurrentRole();
  const isCandidate = role === UserRole.CANDIDATE;
  const isSaved = user ? await isJobSaved(id, user.id) : false;

  const profileData =
    profileResult.success && profileResult.data
      ? {
          fullName: profileResult.data.full_name || "",
          email: profileResult.data.email || "",
          phone: profileResult.data.phone || "",
          resumeUrl: profileResult.data.resume_url || null,
        }
      : null;

  if (!job) {
    notFound();
  }

  const dateLocale = locale === "vi" ? vi : enUS;
  const postedAt = formatDistanceToNow(new Date(job.created_at), {
    addSuffix: true,
    locale: dateLocale,
  });

  const formattedJob = {
    ...job,
    postedAt,
    location: job.location || "N/A",
    description: job.description || "",
    salary: job.salary_range || "N/A",
    type: job.job_type || "Full-time",
    company: job.company.name,
    requirements: job.requirements || [],
    benefits: job.benefits || [],
  };

  return (
    <div className="min-h-screen bg-background pb-20 pt-20 space-y-4">
      <JobDetailHeader
        jobId={id}
        title={job.title}
        company={{
          name: job.company.name,
          logo_url: job.company.logo_url,
        }}
        hasApplied={hasApplied}
        profileData={profileData}
        initialIsSaved={isSaved}
        isCandidate={isCandidate}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <JobDetailContent job={formattedJob} />

        <aside className="space-y-8">
          <CompanyCard
            company={job.company.name}
            industry={job.company.industry || "N/A"}
            description={job.company.description || ""}
            website={job.company.website || "#"}
            employees={job.company.logo_url || "10-50"} // Reusing some fields for mock if missing
          />
        </aside>
      </div>

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "JobPosting",
            title: job.title,
            description: job.description,
            datePosted: job.created_at,
            validThrough: new Date(
              new Date(job.created_at).getTime() + 30 * 24 * 60 * 60 * 1000,
            ).toISOString(),
            employmentType: job.job_type,
            hiringOrganization: {
              "@type": "Organization",
              name: job.company.name,
              sameAs: job.company.website,
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: job.location,
                addressCountry: "US",
              },
            },
            baseSalary: {
              "@type": "MonetaryAmount",
              currency: "USD",
              value: {
                "@type": "QuantitativeValue",
                value: job.salary_range,
                unitText: "YEAR",
              },
            },
          }),
        }}
      />
    </div>
  );
}
