"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
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
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, data: null, error: "Not authenticated" };
  }

  const { data, error } = await supabase
    .from("recruiter_companies")
    .select("companies (*)")
    .eq("profile_id", user.id)
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

export async function createCompany(companyData: Partial<Company>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, data: null, error: "Not authenticated" };
  }

  // 1. Create company
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name || "Untitled Company",
        logo_url: companyData.logo_url,
        website: companyData.website,
        description: companyData.description,
        location: companyData.location,
        industry: companyData.industry,
      },
    ])
    .select()
    .single();

  if (companyError) {
    return { success: false, data: null, error: companyError.message };
  }

  // 2. Link recruiter to company
  const { error: linkError } = await supabase
    .from("recruiter_companies")
    .insert([
      {
        profile_id: user.id,
        company_id: company.id,
        role: "admin",
      },
    ]);

  if (linkError) {
    return { success: false, data: null, error: linkError.message };
  }

  revalidatePath("/", "layout");
  return { success: true, data: company };
}
