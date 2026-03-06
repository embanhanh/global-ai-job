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
    })
    .eq("id", user.id);

  if (error) {
    return { success: false, error: error.message };
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
