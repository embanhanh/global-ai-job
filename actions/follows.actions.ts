"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { manageTopicSubscription } from "./notifications.actions";

export async function toggleFollow(companyId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required" };
  }

  // 1. Check if already following
  const { data: existingFollow } = await supabase
    .from("follows")
    .select("id")
    .eq("follower_id", user.id)
    .eq("following_id", companyId)
    .single();

  // Get user's profile for FCM token and lang
  const { data: profile } = await supabase
    .from("profiles")
    .select("fcm_token, preferred_lang")
    .eq("id", user.id)
    .single();

  if (existingFollow) {
    // Unfollow
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("id", existingFollow.id);

    if (error) {
      return { success: false, error: error.message };
    }

    if (profile?.fcm_token && profile?.preferred_lang) {
      manageTopicSubscription(
        profile.fcm_token,
        companyId,
        profile.preferred_lang,
        "unsubscribe",
      ).catch((err) => console.error("Failed to unsubscribe topic:", err));
    }

    revalidatePath("/jobs");
    return { success: true, action: "unfollowed" };
  } else {
    // Follow
    const { error } = await supabase.from("follows").insert({
      follower_id: user.id,
      following_id: companyId,
    });

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        return { success: true, action: "followed" };
      }
      return { success: false, error: error.message };
    }

    if (profile?.fcm_token && profile?.preferred_lang) {
      manageTopicSubscription(
        profile.fcm_token,
        companyId,
        profile.preferred_lang,
        "subscribe",
      ).catch((err) => console.error("Failed to subscribe topic:", err));
    }

    revalidatePath("/jobs");
    return { success: true, action: "followed" };
  }
}

export async function updatePreferredLanguage(lang: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false };

  const { error } = await supabase
    .from("profiles")
    .update({ preferred_lang: lang })
    .eq("id", user.id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function updateFCMToken(token: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false };

  const { error } = await supabase
    .from("profiles")
    .update({ fcm_token: token })
    .eq("id", user.id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function clearFCMToken() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: true }; // Already logged out

  const { error } = await supabase
    .from("profiles")
    .update({ fcm_token: null })
    .eq("id", user.id);

  if (error) return { success: false, error: error.message };
  return { success: true };
}
