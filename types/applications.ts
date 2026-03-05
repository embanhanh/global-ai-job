import { z } from "zod";

export const createApplySchema = (t: (key: string) => string) =>
  z.object({
    fullName: z.string().min(2, t("applyDialog.validation.fullNameMin")),
    email: z.string().email(t("applyDialog.validation.emailInvalid")),
    phone: z.string().min(10, t("applyDialog.validation.phoneMin")),
    resumeOption: z.enum(["current", "new"]),
    resumeFile:
      typeof window !== "undefined"
        ? z.instanceof(FileList).optional()
        : z.any().optional(),
    coverLetter: z.string().optional(),
  });

export type ApplyValues = z.infer<ReturnType<typeof createApplySchema>>;
