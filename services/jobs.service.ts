import { createClient } from "@/lib/supabase/server";
import { JobWithCompany } from "@/types/database";

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
