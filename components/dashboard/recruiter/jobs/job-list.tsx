"use client";

import { useTranslations } from "next-intl";
import { JobCard } from "./job-card";

type TFunction = (
  key: string,
  values?: Record<string, string | number | boolean | Date>,
) => string;

import { Job } from "@/types/jobs";

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  const t = useTranslations("Dashboard.recruiter.jobs");

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} t={t as unknown as TFunction} />
      ))}
    </div>
  );
}
