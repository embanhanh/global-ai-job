"use server";

import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/types/enums";
import { getProfile } from "@/services/profiles.service";
import { hasAppliedToJob } from "@/services/applications.service";

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

  return { success: true, data };
}

export async function applyToJob(
  jobId: string,
  data?: {
    fullName?: string;
    email?: string;
    phone?: string;
    resumeUrl?: string;
    coverLetter?: string;
  },
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "loginRequired" };
    }

    // Check if user is a candidate using service
    const profileResult = await getProfile();
    if (!profileResult.success || !profileResult.data) {
      return { success: false, error: "candidateOnly" };
    }

    const profile = profileResult.data;

    if (profile.role !== UserRole.CANDIDATE) {
      return { success: false, error: "candidateOnly" };
    }

    const resumeUrl = data?.resumeUrl || profile.resume_url || "";

    // Check if already applied using service
    const alreadyApplied = await hasAppliedToJob(jobId);
    if (alreadyApplied) {
      return { success: false, error: "alreadyApplied" };
    }

    // Create application with specific personal info for this submission
    const { error: insertError } = await supabase.from("applications").insert({
      job_id: jobId,
      resume_url: resumeUrl,
      cover_letter: data?.coverLetter || null,
      full_name: data?.fullName || profile.full_name || "",
      email: data?.email || user.email || "",
      phone: data?.phone || profile.phone || "",
      stage: "sourcing",
      ai_status: "pending",
    });

    if (insertError) throw insertError;

    return { success: true };
  } catch (error) {
    console.error("Error applying to job:", error);
    return { success: false, error: "error" };
  }
}
