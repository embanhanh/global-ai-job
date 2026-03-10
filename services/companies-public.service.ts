import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database";

export type CompanyPublic = Database["public"]["Tables"]["companies"]["Row"] & {
  active_jobs_count: number;
};

export interface CompanySearchParams {
  q?: string;
  industry?: string;
  page?: string;
}

const ITEMS_PER_PAGE = 12;

export async function getPublicCompanies(params: CompanySearchParams): Promise<{
  success: boolean;
  data: CompanyPublic[] | null;
  count: number;
  error?: string;
}> {
  const supabase = await createClient();
  const page = parseInt(params.page || "1", 10);
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  let query = supabase.from("companies").select(
    `
      *,
      jobs:jobs(id)
    `,
    { count: "exact" },
  );

  // Filter jobs by active status inside the select string unfortunately won't filter the join
  // To get exact active job count per company, we join jobs and count them in memory or use a specialized view.
  // Given RSC approach, we'll fetch jobs and filter in memory for now, or just trust jobs array length if we only fetch active ones.
  query = supabase.from("companies").select(
    `
      *,
      jobs (
        status
      )
    `,
    { count: "exact" },
  );

  if (params.q) {
    query = query.or(
      `name.ilike.%${params.q}%,description.ilike.%${params.q}%`,
    );
  }

  if (params.industry && params.industry !== "all") {
    query = query.eq("industry", params.industry);
  }

  const { data, count, error } = await query
    .order("name", { ascending: true })
    .range(from, to);

  if (error) {
    console.error("Error fetching companies:", error);
    return { success: false, data: null, count: 0, error: error.message };
  }

  // Transform data to calculate active jobs count
  const formattedData: CompanyPublic[] = (data || []).map((company) => {
    const activeJobs =
      (company.jobs as { status: string }[] | null)?.filter(
        (j) => j.status === "active",
      ) || [];

    // Remove the jobs array from the final output to keep it clean
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { jobs, ...companyData } = company;

    return {
      ...(companyData as Database["public"]["Tables"]["companies"]["Row"]),
      active_jobs_count: activeJobs.length,
    };
  });

  return { success: true, data: formattedData, count: count || 0 };
}

export async function getPublicCompanyById(id: string): Promise<{
  success: boolean;
  data: Database["public"]["Tables"]["companies"]["Row"] | null;
  error?: string;
}> {
  if (!id || id === "undefined") {
    return { success: false, data: null, error: "Invalid company ID" };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Not found
      return { success: true, data: null };
    }
    console.error("Error fetching company by id:", error);
    return { success: false, data: null, error: error.message };
  }

  return { success: true, data };
}

export async function getCompanyActiveJobs(companyId: string) {
  if (!companyId || companyId === "undefined") {
    return { success: false, data: null, error: "Invalid company ID" };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .select(
      `
      *,
      company:companies (
        id,
        name,
        logo_url,
        industry
      )
    `,
    )
    .eq("company_id", companyId)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching company active jobs:", error);
    return { success: false, data: null, error: error.message };
  }

  return { success: true, data };
}
