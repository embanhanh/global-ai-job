"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { JobInsert, JobUpdate } from "@/types/jobs";
import { sendJobNotification } from "./notifications.actions";

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

  // Notify followers if job is active
  if (data.status === "active") {
    console.log("Job is active, sending notification");
    // Get company name for notification
    const { data: company } = await supabase
      .from("companies")
      .select("name")
      .eq("id", data.company_id)
      .single();

    if (company) {
      // Trigger notification (fire and forget on the server)
      sendJobNotification(
        data.id,
        data.company_id,
        company.name,
        data.title,
      ).catch((err) => console.error("Failed to send job notification:", err));
    }
  }

  revalidatePath("/[locale]/recruiter/jobs", "page");
  return { success: true, data };
}

export async function updateJob(id: string, jobData: JobUpdate) {
  const supabase = await createClient();

  // Get current job to check status transition
  const { data: currentJob } = await supabase
    .from("jobs")
    .select("status, title, company_id, companies(name)")
    .eq("id", id)
    .single();

  const { data, error } = await supabase
    .from("jobs")
    .update(jobData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  // Notify followers if job transitioned to active
  if (
    jobData.status === "active" &&
    currentJob &&
    currentJob.status !== "active"
  ) {
    console.log("Job transitioned to active, sending notification");
    // TypeScript workaround since we know companies is joined as single object here
    const company = currentJob.companies as unknown as { name: string };
    if (company) {
      sendJobNotification(
        data.id,
        currentJob.company_id,
        company.name,
        jobData.title || currentJob.title,
      ).catch((err) => console.error("Failed to send job notification:", err));
    }
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

  // Get current job to check status transition
  const { data: currentJob } = await supabase
    .from("jobs")
    .select("status, title, company_id, companies(name)")
    .eq("id", id)
    .single();

  const { data, error } = await supabase
    .from("jobs")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  // Notify followers if job transitioned to active
  if (status === "active" && currentJob && currentJob.status !== "active") {
    console.log(
      "Job status changed to active via toggle, sending notification",
    );
    const company = currentJob.companies as unknown as { name: string };
    if (company) {
      sendJobNotification(
        data.id,
        currentJob.company_id,
        company.name,
        currentJob.title,
      ).catch((err) => console.error("Failed to send job notification:", err));
    }
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

export async function toggleSaveJobAction(jobId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  // Check if already saved
  const { data: existing } = await supabase
    .from("saved_jobs")
    .select("id")
    .eq("user_id", user.id)
    .eq("job_id", jobId)
    .maybeSingle();

  if (existing) {
    // Unsave
    const { error } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("user_id", user.id)
      .eq("job_id", jobId);

    if (error) return { success: false, error: error.message };
  } else {
    // Save
    const { error } = await supabase
      .from("saved_jobs")
      .insert({ user_id: user.id, job_id: jobId });

    if (error) return { success: false, error: error.message };
  }

  revalidatePath("/[locale]/candidate/saved", "page");
  revalidatePath(`/[locale]/jobs/${jobId}`, "page");

  return { success: true, isSaved: !existing };
}
