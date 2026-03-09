import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/types/enums";

export async function getProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Not authenticated" };

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "id, full_name, email, phone, resume_url, role, bio, job_title, skills, experience, education, settings",
    )
    .eq("id", user.id)
    .maybeSingle();

  if (error || !profile)
    return { success: false, error: error?.message || "Profile not found" };

  return {
    success: true,
    data: profile,
  };
}

export async function getCurrentRole(): Promise<UserRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return (profile?.role as UserRole) || null;
}

export async function getProfileCompletionProgress(): Promise<number> {
  const { success, data: profile } = await getProfile();
  if (!success || !profile) return 0;

  let score = 0;

  if (profile.full_name) score += 10;
  if (profile.email) score += 10;
  if (profile.phone) score += 10;
  if (profile.bio) score += 10;
  if (profile.job_title) score += 10;
  if (profile.resume_url) score += 20;
  if (Array.isArray(profile.skills) && profile.skills.length > 0) score += 10;
  if (Array.isArray(profile.experience) && profile.experience.length > 0)
    score += 10;
  if (Array.isArray(profile.education) && profile.education.length > 0)
    score += 10;

  return Math.min(score, 100);
}
