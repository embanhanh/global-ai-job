import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { JobFormValues } from "@/types/jobs";

interface JobDescriptionFieldProps {
  register: UseFormRegister<JobFormValues>;
  errors: FieldErrors<JobFormValues>;
  t: (key: string) => string;
}

export function JobDescriptionField({
  register,
  errors,
  t,
}: JobDescriptionFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="description" className="text-white/80">
        {t("labels.description")}
      </Label>
      <Textarea
        id="description"
        placeholder={t("placeholders.description")}
        {...register("description")}
        className={cn(
          "min-h-[300px] bg-white/5 border-white/10 text-white focus:border-violet-500/50 resize-none",
          errors.description && "border-red-500/50 focus:border-red-500/50",
        )}
      />
      {errors.description && (
        <p className="text-xs text-red-400">
          {errors.description.message as string}
        </p>
      )}
    </div>
  );
}
