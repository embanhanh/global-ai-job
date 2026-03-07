import { createClient } from "@/lib/supabase/client";

export async function isFollowing(companyId: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data, error } = await supabase
    .from("follows")
    .select("id")
    .eq("follower_id", user.id)
    .eq("following_id", companyId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Error checking following status:", error);
    return false;
  }

  return !!data;
}

export async function getFollowedCompanies() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from("follows")
    .select(
      `
      id,
      following_id,
      companies (
        id,
        name,
        logo_url,
        industry
      )
    `,
    )
    .eq("follower_id", user.id);

  if (error) {
    console.error("Error fetching followed companies:", error);
    return [];
  }

  return data;
}
