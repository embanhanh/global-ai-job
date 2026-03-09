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

  const { data, error } = await supabase
    .from("v_user_activities")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching user activities:", error);
    return [];
  }

  return data as UserActivity[];
}
