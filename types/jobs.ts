import { z } from "zod";
import { Database } from "./database";

export type Job = Database["public"]["Tables"]["jobs"]["Row"] & {
  applicants_count?: number;
  companies?: {
    name: string;
    logo_url: string | null;
  } | null;
};

export type JobInsert = Database["public"]["Tables"]["jobs"]["Insert"];
export type JobUpdate = Database["public"]["Tables"]["jobs"]["Update"];

export type Application =
  Database["public"]["Tables"]["applications"]["Row"] & {
    profiles?: {
      full_name: string | null;
      avatar_url: string | null;
      email: string | null;
    } | null;
    jobs?: {
      title: string;
    } | null;
  };

export type ApplicationInsert =
  Database["public"]["Tables"]["applications"]["Insert"];
export type ApplicationUpdate =
  Database["public"]["Tables"]["applications"]["Update"];

export type Company = Database["public"]["Tables"]["companies"]["Row"];

export const jobSchema = z.object({
  title: z.string().min(5),
  location: z.string().min(2),
  job_type: z.string().min(1),
  description: z.string().min(20),
  salary_range: z.string().optional(),
  requirements: z.array(z.object({ value: z.string() })),
  status: z.enum(["active", "draft", "closed"]),
});

export type JobFormValues = z.infer<typeof jobSchema>;

export const aiInsightSchema = z.object({
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  match_explanation: z.string(),
  key_skills: z.array(z.string()),
});

export type AIInsight = z.infer<typeof aiInsightSchema>;

export const applicationSchema = z.object({
  job_id: z.string().uuid(),
  candidate_id: z.string().uuid(),
  stage: z
    .enum(["sourcing", "screening", "interview", "offer", "hired", "rejected"])
    .default("sourcing"),
  fit_score: z.number().min(0).max(100).optional(),
  ai_insight: aiInsightSchema.nullable().optional(),
  ai_summary: z.string().nullable().optional(),
  cv_markdown: z.string().nullable().optional(),
  ai_status: z
    .enum(["pending", "processing", "completed", "failed"])
    .default("pending"),
  resume_url: z.string().url().optional().or(z.literal("")),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
