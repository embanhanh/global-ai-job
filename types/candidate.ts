import { z } from "zod";
export const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(2, "Company name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  period: z.string().min(2, "Period is required"),
  description: z.string().optional(),
});
export const educationSchema = z.object({
  id: z.string().optional(),
  school: z.string().min(2, "School name is required"),
  degree: z.string().min(2, "Degree is required"),
  period: z.string().min(2, "Period is required"),
});
export const candidateProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  jobTitle: z.string().min(2, "Target job title is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  experience: z.array(experienceSchema),
  education: z.array(educationSchema),
});
export type CandidateProfileValues = z.infer<typeof candidateProfileSchema>;
export type ExperienceValues = z.infer<typeof experienceSchema>;
export type EducationValues = z.infer<typeof educationSchema>;

export interface CandidateDashboardJob {
  id: string;
  title: string;
  company: {
    name: string;
    logo_url: string | null;
  };
  location: string;
  job_type: string;
  salary_range: string;
  created_at: string;
  matchScore?: number;
}

export interface CandidateApplication {
  id: string;
  job_title: string;
  company: string;
  applied_date: string;
  status: "applied" | "inReview" | "interviewing" | "offered" | "rejected";
}
