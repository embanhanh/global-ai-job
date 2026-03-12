import { UseFormRegister, FieldErrors, Control, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { JobFormValues } from "@/types/jobs";
import { LocationSelector } from "@/components/shared/location-selector";

interface JobBasicInfoProps {
  register: UseFormRegister<JobFormValues>;
  errors: FieldErrors<JobFormValues>;
  control: Control<JobFormValues>;
  t: (key: string) => string;
}

export function JobBasicInfo({ register, errors, control, t }: JobBasicInfoProps) {
  const jobTypes = [
    { value: "full-time", label: t("labels.jobTypes.fullTime") },
    { value: "part-time", label: t("labels.jobTypes.partTime") },
    { value: "contract", label: t("labels.jobTypes.contract") },
    { value: "freelance", label: t("labels.jobTypes.freelance") },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-foreground/80">
          {t("labels.jobTitle")}
        </Label>
        <Input
          id="title"
          placeholder={t("placeholders.jobTitle")}
          {...register("title")}
          className={cn(
            "bg-accent/50 border-border text-foreground h-11 focus:border-primary/50",
            errors.title && "border-destructive/50 focus:border-destructive/50",
          )}
        />
        {errors.title && (
          <p className="text-xs text-destructive">
            {errors.title.message as string}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-foreground/80">
            {t("labels.location")}
          </Label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <LocationSelector
                value={field.value}
                onChange={field.onChange}
                placeholder={t("placeholders.location")}
                error={!!errors.location}
              />
            )}
          />
          {errors.location && (
            <p className="text-xs text-destructive">
              {errors.location.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="job_type" className="text-foreground/80">
            {t("labels.jobType")}
          </Label>
          <select
            id="job_type"
            {...register("job_type")}
            className="w-full h-11 rounded-md border border-border bg-accent/50 px-3 py-1 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
          >
            {jobTypes.map((type) => (
              <option
                key={type.value}
                value={type.value}
                className="bg-popover text-popover-foreground"
              >
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="salary_range" className="text-foreground/80">
          {t("labels.salaryRange")}
        </Label>
        <Input
          id="salary_range"
          placeholder={t("placeholders.salaryRange")}
          {...register("salary_range")}
          className={cn(
            "bg-accent/50 border-border text-foreground h-11 focus:border-primary/50",
            errors.salary_range && "border-destructive/50 focus:border-destructive/50",
          )}
        />
      </div>
    </div>
  );
}
