"use client";

import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { AIJDAssistant } from "./ai-jd-assistant";
import { toast } from "sonner";
import { JobBasicInfo } from "./form/job-basic-info";
import { JobDescriptionField } from "./form/job-description-field";
import { JobRequirementsField } from "./form/job-requirements-field";
import { JobFormActions } from "./form/job-form-actions";
import { JobHiringStepsField } from "./form/job-hiring-steps-field";
import { useRouter } from "@/i18n/navigation";
import { createJob, updateJob } from "@/actions/jobs.actions";
import {
  Company,
  JobFormValues,
  jobFormSchema,
  DEFAULT_HIRING_STEPS,
} from "@/types/jobs";

interface JobFormProps {
  initialData?: JobFormValues;
  jobId?: string;
  company: Company | null;
}

export function JobForm({ initialData, jobId, company }: JobFormProps) {
  const t = useTranslations("Dashboard.recruiter.jobs.form");
  const router = useRouter();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialData || {
      title: "",
      location: "",
      job_type: "full-time",
      description: "",
      salary_range: "",
      requirements: [],
      status: "active",
      hiring_steps: DEFAULT_HIRING_STEPS,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const currentTitle = watch("title");

  const onSubmit: SubmitHandler<JobFormValues> = async (data) => {
    if (!company) {
      toast.error("You must have a company profile before posting a job.");
      return;
    }

    try {
      // Map requirements from objects back to string array for the database
      const mappedRequirements = data.requirements.map((r) => r.value);

      if (jobId) {
        // Update mode
        const result = await updateJob(jobId, {
          ...data,
          requirements: mappedRequirements,
        });

        if (result.success) {
          toast.success(t("notifications.success"));
          router.push("/recruiter/jobs");
        } else {
          throw new Error(result.error);
        }
      } else {
        // Create mode
        const result = await createJob({
          ...data,
          requirements: mappedRequirements,
          company_id: company.id,
        });

        if (result.success) {
          toast.success(t("notifications.success"));
          router.push("/recruiter/jobs");
        } else {
          throw new Error(result.error);
        }
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : t("notifications.error");
      console.error("Submission error:", error);
      toast.error(errorMessage);
    }
  };

  const handleAISuggestion = (suggestion: string) => {
    setValue("description", suggestion, { shouldValidate: true });
    toast.info(t("notifications.aiApplied"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-5xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-card/60 backdrop-blur-xl border-border p-6 space-y-6">
            <JobBasicInfo 
              register={register} 
              errors={errors} 
              control={control}
              t={t} 
            />
            <JobDescriptionField register={register} errors={errors} t={t} />
            <JobRequirementsField control={control} t={t} />
            <JobHiringStepsField control={control} t={t} />
          </Card>
        </div>

        <div className="space-y-6">
          <AIJDAssistant
            currentTitle={currentTitle}
            onSuggest={handleAISuggestion}
          />
          <JobFormActions
            isSubmitting={isSubmitting}
            t={t}
            setValue={setValue}
          />
        </div>
      </div>
    </form>
  );
}
