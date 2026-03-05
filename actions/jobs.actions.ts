"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { JobInsert, JobUpdate } from "@/types/jobs";

export async function createJob(jobData: Omit<JobInsert, "recruiter_id">) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
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

  const { data, error } = await supabase
    .from("jobs")
    .update(jobData)
    .eq("id", id)
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

  const { data, error } = await supabase
    .from("jobs")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
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

  const { error } = await supabase.from("jobs").delete().eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/[locale]/recruiter/jobs", "page");
  return { success: true };
}
