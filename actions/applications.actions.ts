"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Application } from "@/types/jobs";

export async function getApplicationsByRecruiter() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("applications")
    .select(
      `
      *,
      profiles (full_name, avatar_url, email),
      jobs!inner (title, recruiter_id)
    `,
    )
    .eq("jobs.recruiter_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data as Application[] };
}

export async function getApplicationsByJobId(
  jobId: string,
  options: {
    query?: string;
    stage?: string;
    page?: number;
    pageSize?: number;
  } = {},
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { query = "", stage = "all", page = 1, pageSize = 10 } = options;

  let dbQuery = supabase
    .from("applications")
    .select(
      `
      *,
      profiles!inner (full_name, avatar_url, email),
      jobs!inner (title, recruiter_id)
    `,
      { count: "exact" },
    )
    .eq("job_id", jobId)
    .eq("jobs.recruiter_id", user.id);

  // Apply filters
  if (query) {
    dbQuery = dbQuery.ilike("profiles.full_name", `%${query}%`);
  }

  if (stage && stage !== "all") {
    dbQuery = dbQuery.eq("stage", stage);
  }

  // Handle pagination
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await dbQuery
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    data: data as Application[],
    totalCount: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / pageSize),
  };
}

export async function updateApplicationStage(id: string, stage: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("applications")
    .update({ stage, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/[locale]/recruiter/applicants", "page");
  revalidatePath("/[locale]/recruiter/jobs/[id]", "page");
  return { success: true, data };
}
