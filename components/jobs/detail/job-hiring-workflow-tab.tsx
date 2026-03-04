"use client";

import { useState } from "react";
import { Application, HiringStep, DEFAULT_HIRING_STEPS } from "@/types/jobs";
import { JobKanbanBoard } from "./job-kanban-board";
import { HiringStepsManager } from "./hiring-steps-manager";
import { useTranslations } from "next-intl";

interface JobHiringWorkflowTabProps {
  jobId: string;
  applications: Application[];
  hiringSteps: HiringStep[];
}

export function JobHiringWorkflowTab({
  jobId,
  applications,
  hiringSteps: initialSteps,
}: JobHiringWorkflowTabProps) {
  const t = useTranslations("Dashboard.recruiter.jobs.detail.workflow");
  const [steps, setSteps] = useState<HiringStep[]>(
    initialSteps?.length ? initialSteps : DEFAULT_HIRING_STEPS,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/40">{t("description")}</p>
        <HiringStepsManager jobId={jobId} steps={steps} onSave={setSteps} />
      </div>
      <JobKanbanBoard initialApplications={applications} stages={steps} />
    </div>
  );
}
