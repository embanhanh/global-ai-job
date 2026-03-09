import { createClient } from "@/lib/supabase/server";
import { Application } from "@/types/jobs";

export async function getApplicationsByRecruiter() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("applications")
    .select(
      `
      *,
      profiles (full_name, avatar_url, email),
      jobs!inner (title, recruiter_id)
    `,
    )
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

export async function hasAppliedToJob(jobId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("applications")
    .select("id")
    .eq("job_id", jobId)
    .eq("candidate_id", user.id)
    .maybeSingle();

  return !!data;
}

import { CandidateApplication } from "@/types/candidate";

export async function getApplicationsByCandidate(
  options: {
    stage?: string;
  } = {},
) {
  const supabase = await createClient();

  let dbQuery = supabase.from("applications").select(
    `
      *,
      jobs!inner (
        title,
        id,
        companies!inner (name, logo_url)
      )
    `,
  );

  if (options.stage && options.stage !== "all") {
    if (options.stage === "interview") {
      dbQuery = dbQuery.in("stage", ["interview", "interviewing"]);
    } else {
      dbQuery = dbQuery.eq("stage", options.stage);
    }
  }

  const { data, error } = await dbQuery.order("applied_date", {
    ascending: false,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data as CandidateApplication[] };
}

export async function getCandidateDashboardStats() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Get total applications
  const { count: totalApplications, error: totalError } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("candidate_id", user.id);

  // Get active interviews (stage = interview or interviewing)
  const { count: activeInterviews, error: interviewsError } = await supabase
    .from("applications")
    .select("*", { count: "exact", head: true })
    .eq("candidate_id", user.id)
    .in("stage", ["interview", "interviewing"]);

  if (totalError || interviewsError) {
    return { success: false, error: "Failed to fetch stats" };
  }

  return {
    success: true,
    data: {
      totalApplications: totalApplications || 0,
      activeInterviews: activeInterviews || 0,
    },
  };
}
