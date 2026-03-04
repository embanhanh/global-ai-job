"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import {
  Job,
  JobInsert,
  JobUpdate,
  HiringStep,
  DEFAULT_HIRING_STEPS,
} from "@/types/jobs";
import { Database } from "@/types/database";

export async function getJobs(params?: {
  query?: string;
  page?: number;
  pageSize?: number;
}) {
  const { query, page = 1, pageSize = 10 } = params || {};
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  let countQuery = supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("recruiter_id", user.id);

  if (query) {
    countQuery = countQuery.ilike("title", `%${query}%`);
  }

  const { count: totalCount, error: countError } = await countQuery;

  if (countError) {
    return { success: false, error: countError.message };
  }

  let dataQuery = supabase
    .from("jobs")
    .select(
      `
      *,
      companies (name, logo_url),
      applications (id)
    `,
    )
    .eq("recruiter_id", user.id)
    .order("created_at", { ascending: false });

  if (query) {
    dataQuery = dataQuery.ilike("title", `%${query}%`);
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error } = await dataQuery.range(from, to);

  if (error) {
    return { success: false, error: error.message };
  }

  const jobsWithCounts: Job[] = (
    data as unknown as Array<
      Database["public"]["Tables"]["jobs"]["Row"] & {
        companies: { name: string; logo_url: string | null } | null;
        applications: { id: string }[];
      }
    >
  ).map((job) => ({
    ...job,
    applicants_count: job.applications?.length || 0,
    hiring_steps: job.hiring_steps
      ? (job.hiring_steps as unknown as HiringStep[])
      : DEFAULT_HIRING_STEPS,
  }));

  return {
    success: true,
    data: jobsWithCounts,
    pagination: {
      page,
      pageSize,
      totalCount: totalCount || 0,
      totalPages: Math.ceil((totalCount || 0) / pageSize),
    },
  };
}

export async function getJobById(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      companies (name, logo_url),
      applications (
        id, stage, fit_score, ai_insight, ai_summary, resume_url,
        applied_date, created_at, updated_at,
        profiles (full_name, avatar_url, email)
      )
    `,
    )
    .eq("id", id)
    .eq("recruiter_id", user.id)
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  const jobWithDetails: Job = {
    ...data,
    applicants_count: (data.applications as unknown[])?.length || 0,
    hiring_steps: data.hiring_steps
      ? (data.hiring_steps as unknown as HiringStep[])
      : DEFAULT_HIRING_STEPS,
  };

  return {
    success: true,
    data: jobWithDetails,
    applications: data.applications,
  };
}

export async function createJob(jobData: Omit<JobInsert, "recruiter_id">) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("jobs")
    .insert([{ ...jobData, recruiter_id: user.id }])
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/[locale]/recruiter/jobs", "page");
  return { success: true, data };
}

export async function updateJob(id: string, jobData: JobUpdate) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("jobs")
    .update(jobData)
    .eq("id", id)
    .eq("recruiter_id", user.id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/[locale]/recruiter/jobs", "page");
  revalidatePath(`/[locale]/recruiter/jobs/${id}`, "page");
  return { success: true, data };
}

export async function updateJobStatus(
  id: string,
  status: "active" | "draft" | "closed",
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("jobs")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .eq("recruiter_id", user.id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/[locale]/recruiter/jobs", "page");
  revalidatePath(`/[locale]/recruiter/jobs/${id}`, "page");
  return { success: true, data };
}

export async function deleteJob(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", id)
    .eq("recruiter_id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/[locale]/recruiter/jobs", "page");
  return { success: true };
}
