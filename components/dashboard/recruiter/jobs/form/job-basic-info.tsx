import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { JobFormValues } from "@/types/jobs";

interface JobBasicInfoProps {
  register: UseFormRegister<JobFormValues>;
  errors: FieldErrors<JobFormValues>;
  t: (key: string) => string;
}

export function JobBasicInfo({ register, errors, t }: JobBasicInfoProps) {
  const jobTypes = [
    { value: "full-time", label: t("labels.jobTypes.fullTime") },
    { value: "part-time", label: t("labels.jobTypes.partTime") },
    { value: "contract", label: t("labels.jobTypes.contract") },
    { value: "freelance", label: t("labels.jobTypes.freelance") },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-white/80">
          {t("labels.jobTitle")}
        </Label>
        <Input
          id="title"
          placeholder={t("placeholders.jobTitle")}
          {...register("title")}
          className={cn(
            "bg-white/5 border-white/10 text-white h-11 focus:border-violet-500/50",
            errors.title && "border-red-500/50 focus:border-red-500/50",
          )}
        />
        {errors.title && (
          <p className="text-xs text-red-400">
            {errors.title.message as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-white/80">
            {t("labels.location")}
          </Label>
          <Input
            id="location"
            placeholder={t("placeholders.location")}
            {...register("location")}
            className={cn(
              "bg-white/5 border-white/10 text-white h-11 focus:border-violet-500/50",
              errors.location && "border-red-500/50 focus:border-red-500/50",
            )}
          />
          {errors.location && (
            <p className="text-xs text-red-400">
              {errors.location.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="job_type" className="text-white/80">
            {t("labels.jobType")}
          </Label>
          <select
            id="job_type"
            {...register("job_type")}
            className="w-full h-11 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-sm text-white focus:outline-none focus:border-violet-500/50 transition-colors"
          >
            {jobTypes.map((type) => (
              <option
                key={type.value}
                value={type.value}
                className="bg-[#0a0a14]"
              >
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="salary_range" className="text-white/80">
          {t("labels.salaryRange")}
        </Label>
        <Input
          id="salary_range"
          placeholder={t("placeholders.salaryRange")}
          {...register("salary_range")}
          className={cn(
            "bg-white/5 border-white/10 text-white h-11 focus:border-violet-500/50",
            errors.salary_range && "border-red-500/50 focus:border-red-500/50",
          )}
        />
      </div>
    </div>
  );
}
