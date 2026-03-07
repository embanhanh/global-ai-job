"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { messaging } from "@/lib/firebase-admin";
import { NewApplicationMetadata } from "@/types/notifications";

export async function markNotificationAsRead(id: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function markAllNotificationsAsRead() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Auth required" };

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", user.id)
    .eq("is_read", false);

  if (error) return { success: false, error: error.message };
  revalidatePath("/");
  return { success: true };
}

/**
 * Sends notifications to all followers of a company when a new job is posted.
 * Uses FCM Topics for efficient massive delivery.
 */
export async function sendJobNotification(
  jobId: string,
  companyId: string,
  companyName: string,
  jobTitle: string,
) {
  console.log(
    "Sending job notification",
    jobId,
    companyId,
    companyName,
    jobTitle,
  );
  const supabase = await createClient();
  const fcm = messaging();

  if (!fcm) {
    console.warn("FCM Admin not configured. Skipping push notifications.");
  }

  // 1. Create in-app notification records for all followers
  // We fetch followers to create record in 'notifications' table for history
  const { data: followers } = await supabase
    .from("follows")
    .select("follower_id")
    .eq("following_id", companyId);

  if (followers && followers.length > 0) {
    const notificationRecords = followers.map((f) => ({
      user_id: f.follower_id,
      type: "NEW_JOB_POSTED",
      metadata: {
        company_id: companyId,
        company_name: companyName,
        job_id: jobId,
        job_title: jobTitle,
      },
    }));

    // Batch insert notifications
    const { error: insertError } = await supabase
      .from("notifications")
      .insert(notificationRecords);

    if (insertError) {
      console.error("Error creating notification records:", insertError);
    }
  }

  // 2. Send Push Notification via FCM Topics
  if (fcm) {
    // Send to Vietnamese topic
    const messageVi = {
      notification: {
        title: "Việc làm mới!",
        body: `${companyName} vừa đăng tuyển: ${jobTitle}`,
      },
      data: {
        jobId,
        type: "NEW_JOB_POSTED",
        click_action: `/jobs/${jobId}`,
      },
      topic: `company_${companyId}_vi`,
    };

    // Send to English topic
    const messageEn = {
      notification: {
        title: "New Job Posted!",
        body: `${companyName} just posted: ${jobTitle}`,
      },
      data: {
        jobId,
        type: "NEW_JOB_POSTED",
        click_action: `/jobs/${jobId}`,
      },
      topic: `company_${companyId}_en`,
    };

    try {
      console.log(`Sending to topic: company_${companyId}_vi`, messageVi);
      console.log(`Sending to topic: company_${companyId}_en`, messageEn);
      await Promise.all([fcm.send(messageVi), fcm.send(messageEn)]);
      console.log(
        "Successfully sent multilingual push notifications to topics.",
      );
    } catch (error) {
      console.error("Error sending FCM notifications:", error);
    }
  }

  return { success: true };
}

/**
 * Sends a notification to the recruiter when a candidate applies for a job.
 */
export async function sendApplicationNotification(
  jobId: string,
  jobTitle: string,
  candidateId: string,
  candidateName: string,
  applicationId: string,
) {
  const supabase = await createClient();
  const fcm = messaging();

  // 1. Find the recruiter ID and their push token/language preference
  const { data: jobData } = await supabase
    .from("jobs")
    .select("recruiter_id")
    .eq("id", jobId)
    .single();

  if (!jobData) return { success: false, error: "Job not found" };
  const recruiterId = jobData.recruiter_id;

  // 2. Create in-app notification record
  const metadata: NewApplicationMetadata = {
    job_id: jobId,
    job_title: jobTitle,
    candidate_id: candidateId,
    candidate_name: candidateName,
    application_id: applicationId,
  };

  const { error: insertError } = await supabase.from("notifications").insert({
    user_id: recruiterId,
    type: "NEW_APPLICATION",
    metadata,
  });

  if (insertError) {
    console.error("Error creating notification record:", insertError);
  }

  // 3. Send Push Notification via Direct Token
  if (fcm) {
    // Get recruiter's push token and preferred language
    const { data: profile } = await supabase
      .from("profiles")
      .select("fcm_token, preferred_lang")
      .eq("id", recruiterId)
      .single();

    if (profile?.fcm_token) {
      const isVi = profile.preferred_lang === "vi";
      const message = {
        notification: {
          title: isVi ? "Ứng tuyển mới!" : "New Application!",
          body: isVi
            ? `${candidateName} vừa ứng tuyển vào vị trí ${jobTitle}`
            : `${candidateName} just applied for ${jobTitle}`,
        },
        data: {
          jobId,
          applicationId,
          type: "NEW_APPLICATION",
          click_action: `/recruiter/jobs/${jobId}`,
        },
        token: profile.fcm_token,
      };

      try {
        await fcm.send(message);
        console.log(
          "Successfully sent direct FCM notification.",
          profile.fcm_token,
        );
      } catch (error) {
        console.error("Error sending direct FCM notification:", error);
      }
    }
  }

  return { success: true };
}

/**
 * Manages FCM topic subscriptions when a user follows/unfollows or changes language.
 */
export async function syncFCMTopics(
  token: string,
  companyIds: string[],
  oldLocale?: string,
  newLocale?: string,
) {
  const fcm = messaging();
  if (!fcm) return { success: false, error: "FCM not configured" };
  if (!newLocale) return { success: false, error: "New locale required" };

  try {
    console.log(
      `Syncing topics for ${companyIds.length} companies. Target Locale: ${newLocale}, Old Locale: ${oldLocale || "none"}`,
    );

    for (const id of companyIds) {
      const newTopic = `company_${id}_${newLocale}`;

      // 1. Unsubscribe from old topic if locale changed
      if (oldLocale && oldLocale !== newLocale) {
        const oldTopic = `company_${id}_${oldLocale}`;
        console.log(`Unsubscribing from old topic: ${oldTopic}`);
        await fcm.unsubscribeFromTopic(token, oldTopic);
      }

      // 2. Always subscribe to the current language topic (idempotent in FCM)
      console.log(`Subscribing to current topic: ${newTopic}`);
      await fcm.subscribeToTopic(token, newTopic);
    }

    return { success: true };
  } catch (error) {
    console.error("Error syncing FCM topics:", error);
    return { success: false, error: "Failed to sync topics" };
  }
}

export async function manageTopicSubscription(
  token: string,
  companyId: string,
  locale: string,
  action: "subscribe" | "unsubscribe",
) {
  const fcm = messaging();
  if (!fcm) return { success: false };

  try {
    const topic = `company_${companyId}_${locale}`;
    console.log(
      `${action === "subscribe" ? "Subscribing to" : "Unsubscribing from"} topic: ${topic}`,
    );
    if (action === "subscribe") {
      await fcm.subscribeToTopic(token, topic);
    } else {
      await fcm.unsubscribeFromTopic(token, topic);
    }
    console.log(`Successfully ${action}d topic: ${topic}`);
    return { success: true };
  } catch (error) {
    console.error(`Error ${action} topic:`, error);
    return { success: false };
  }
}
