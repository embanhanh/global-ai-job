import { getTranslations } from "next-intl/server";
import { getJobById } from "@/actions/jobs.actions";
import { JobForm } from "@/components/dashboard/recruiter/jobs/job-form";
import { JobFormValues } from "@/types/jobs";
import { notFound } from "next/navigation";

interface EditJobPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  const t = await getTranslations("Dashboard.recruiter.jobs.form");

  const { data: job, success } = await getJobById(id);

  if (!success || !job) {
    notFound();
  }

  const initialData: JobFormValues = {
    title: job.title,
    location: job.location || "",
    job_type: job.job_type || "full-time",
    description: job.description || "",
    salary_range: job.salary_range || "",
    requirements: (job.requirements || []).map((r) => ({ value: r })),
    status: job.status as "active" | "draft" | "closed",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          {t("titleEdit") || "Edit Job Posting"}
        </h2>
        <p className="text-white/60">
          {t("subtitleEdit") || "Update the details of your job posting."}
        </p>
      </div>

      <JobForm initialData={initialData} jobId={id} />
    </div>
  );
}
