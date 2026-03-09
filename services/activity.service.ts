import { createClient } from "@/lib/supabase/server";

export interface UserActivity {
  id: string;
  user_id: string;
  activity_key: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export async function getUserActivities(
  limit: number = 10,
): Promise<UserActivity[]> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from("v_user_activities")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching user activities:", error);
    return [];
  }

  return data as UserActivity[];
}
