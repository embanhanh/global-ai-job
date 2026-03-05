import { createClient } from "@/lib/supabase/server";
import { Database } from "@/types/database";

export type Company = Database["public"]["Tables"]["companies"]["Row"];

export type RecruiterCompanyResponse = {
  companies: Company | null;
} | null;

export async function getRecruiterCompany(): Promise<{
  success: boolean;
  data: Company | null;
  error?: string;
}> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("recruiter_companies")
    .select("companies (*)")
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return { success: true, data: null };
    }
    return { success: false, data: null, error: error.message };
  }

  const companyResult = (data as unknown as RecruiterCompanyResponse)
    ?.companies;
  return { success: true, data: companyResult || null };
}
