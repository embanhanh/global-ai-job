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
      <Label htmlFor="description" className="text-foreground/80">
        {t("labels.description")}
      </Label>
      <Textarea
        id="description"
        placeholder={t("placeholders.description")}
        {...register("description")}
        className={cn(
          "min-h-[300px] bg-accent/50 border-border text-foreground focus:border-primary/50 resize-none",
          errors.description && "border-destructive/50 focus:border-destructive/50",
        )}
      />
      {errors.description && (
        <p className="text-xs text-destructive">
          {errors.description.message as string}
        </p>
      )}
    </div>
  );
}
