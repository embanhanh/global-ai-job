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

  // Get applications for jobs owned by this recruiter
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

  // Transform data for Kanban UI if needed, or return raw
  return { success: true, data: data as Application[] };
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
  return { success: true, data };
}
