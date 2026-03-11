"use server";

import { createClient } from "@/lib/supabase/server";
import {
  CandidateProfileValues,
  candidateProfileSchema,
  ExperienceValues,
  EducationValues,
} from "@/types/candidate";
import { UserSettings, userSettingsSchema } from "@/types/settings";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import crypto from "crypto";
import {
  generateCandidateBio,
  syncProfileEmbedding,
} from "@/services/ai-search.service";
import { Database } from "@/types/database";

export async function updateProfileAction(
  prevState: { success: boolean; error?: string } | null,
  formData: CandidateProfileValues,
) {
  // We can validate again here if needed, but the form usually does it
  const validatedFields = candidateProfileSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid fields",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  const { error: profileError, data: oldProfile } = await supabase
    .from("profiles")
    .select("content_hash, last_embedding_update")
    .eq("id", user.id)
    .single();

  if (profileError) {
    return { success: false, error: profileError.message };
  }

  // Generate new text for bio
  const newBioText = generateCandidateBio({
    job_title: validatedFields.data.jobTitle,
    skills: validatedFields.data.skills,
    experience: validatedFields.data.experience as unknown as Record<
      string,
      unknown
    >[],
    education: validatedFields.data.education as unknown as Record<
      string,
      unknown
    >[],
    bio: validatedFields.data.bio,
  } as Partial<Database["public"]["Tables"]["profiles"]["Row"]>);

  const newHash = crypto.createHash("sha256").update(newBioText).digest("hex");

  let shouldSyncEmbedding = false;
  let newTimestamp = oldProfile.last_embedding_update;
  let needsSync = false;

  if (newHash !== oldProfile.content_hash) {
    const lastUpdate = oldProfile.last_embedding_update
      ? new Date(oldProfile.last_embedding_update).getTime()
      : 0;

    // 5 minutes rate limit
    if (Date.now() - lastUpdate > 5 * 60 * 1000) {
      shouldSyncEmbedding = true;
      newTimestamp = new Date().toISOString();
      needsSync = false;
    } else {
      needsSync = true;
    }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: validatedFields.data.fullName,
      email: validatedFields.data.email,
      phone: validatedFields.data.phone,
      bio: validatedFields.data.bio,
      job_title: validatedFields.data.jobTitle,
      skills: validatedFields.data.skills,
      experience: validatedFields.data
        .experience as unknown as ExperienceValues[],
      education: validatedFields.data.education as unknown as EducationValues[],
      resume_url: validatedFields.data.resumeUrl,
      updated_at: new Date().toISOString(),
      content_hash: newHash,
      last_embedding_update: newTimestamp,
      needs_embedding_sync: needsSync,
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  if (shouldSyncEmbedding) {
    // Sync embedding async without blocking the UI
    after(async () => {
      await syncProfileEmbedding(user.id);
    });
  }

  revalidatePath("/[locale]/(dashboard)/candidate/profile", "page");

  return { success: true };
}

export async function updateSettingsAction(settings: UserSettings) {
  const validatedFields = userSettingsSchema.safeParse(settings);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid settings format",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  const { error } = await supabase
    .from("profiles")
    .update({
      settings: validatedFields.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/[locale]/(dashboard)/candidate/settings", "page");
  revalidatePath("/[locale]/(dashboard)/recruiter/settings", "page");

  return { success: true };
}
