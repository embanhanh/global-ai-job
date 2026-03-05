"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { Database } from "@/types/database";

export type Company = Database["public"]["Tables"]["companies"]["Row"];

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
  // profile_id is handled by database default auth.uid()
  const { error: linkError } = await supabase
    .from("recruiter_companies")
    .insert([
      {
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
