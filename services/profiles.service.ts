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
