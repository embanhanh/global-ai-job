import { createClient } from "@/lib/supabase/server";
import { JobWithCompany, Database } from "@/types/database";
import { Job, HiringStep, DEFAULT_HIRING_STEPS } from "@/types/jobs";

export interface GetJobsParams {
  q?: string;
  query?: string;
  location?: string;
  type?: string;
  category?: string;
  level?: string;
  page?: number;
  pageSize?: number;
  limit?: number;
  sort?: "newest" | "salary" | "relevant";
}

export async function getJobs(params: GetJobsParams = {}): Promise<{
  data: JobWithCompany[];
  count: number;
}> {
  const {
    q,
    query: queryParam,
    location,
    type,
    category,
    level,
    page = 1,
    pageSize: pageSizeParam = 10,
    limit,
    sort = "newest",
  } = params;

  const effectiveQuery = q || queryParam;
  const effectivePageSize = limit || pageSizeParam;

  const supabase = await createClient();

  let dbQuery = supabase
    .from("jobs")
    .select(
      `
      *,
      company:companies (*)
    `,
      { count: "exact" },
    )
    .eq("status", "active");

  // Apply Filters
  if (effectiveQuery) {
    dbQuery = dbQuery.ilike("title", `%${effectiveQuery}%`);
  }
  if (location) {
    dbQuery = dbQuery.ilike("location", `%${location}%`);
  }
  if (type && type !== "all") {
    dbQuery = dbQuery.eq("job_type", type);
  }
  if (category && category !== "all") {
    dbQuery = dbQuery.eq("category", category);
  }
  if (level && level !== "all") {
    dbQuery = dbQuery.eq("level", level);
  }

  // Sorting
  if (sort === "salary") {
    dbQuery = dbQuery.order("salary_range", { ascending: false });
  } else {
    dbQuery = dbQuery.order("created_at", { ascending: false });
  }

  // Pagination
  const from = (page - 1) * effectivePageSize;
  const to = from + effectivePageSize - 1;
  dbQuery = dbQuery.range(from, to);

  const { data, error, count } = await dbQuery;

  if (error) {
    console.error("Error fetching jobs:", error);
    return { data: [], count: 0 };
  }

  return {
    data: (data as JobWithCompany[]) || [],
    count: count || 0,
  };
}

export async function getJobById(id: string): Promise<JobWithCompany | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      company:companies (*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching job ${id}:`, error);
    return null;
  }

  return data as JobWithCompany;
}

export async function getRecruiterJobs(params?: {
  query?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}) {
  const { query, status, page = 1, pageSize = 10 } = params || {};
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
  if (status && status !== "all") {
    countQuery = countQuery.eq("status", status);
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
  if (status && status !== "all") {
    dataQuery = dataQuery.eq("status", status);
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

export async function getRecruiterJobById(id: string) {
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

export async function getSavedJobsByCandidate(candidateId: string): Promise<{
  data: JobWithCompany[];
  count: number;
}> {
  const supabase = await createClient();

  const { data, error, count } = await supabase
    .from("saved_jobs")
    .select(
      `
      job:jobs (
        *,
        company:companies (*)
      )
    `,
      { count: "exact" },
    )
    .eq("user_id", candidateId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved jobs:", error);
    return { data: [], count: 0 };
  }

  // Map the nested job structure to JobWithCompany[]
  const savedJobs = (
    data as unknown as Array<{
      job: JobWithCompany;
    }>
  ).map((item) => item.job);

  return {
    data: savedJobs,
    count: count || 0,
  };
}

export async function isJobSaved(
  jobId: string,
  userId: string,
): Promise<boolean> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("id")
    .eq("user_id", userId)
    .eq("job_id", jobId)
    .maybeSingle();

  if (error) {
    console.error("Error checking saved job status:", error);
    return false;
  }

  return !!data;
}
