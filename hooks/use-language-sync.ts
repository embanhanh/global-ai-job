"use client";

import { useEffect, useRef, useCallback } from "react";
import { useLocale } from "next-intl";
import { requestFCMToken } from "@/lib/firebase";
import {
  updatePreferredLanguage,
  updateFCMToken,
  clearFCMToken,
} from "@/actions/follows.actions";
import { syncFCMTopics } from "@/actions/notifications.actions";
import { getFollowedCompanies } from "@/services/follows.service";

/**
 * Hook to sync UI language with Supabase profiles and manage FCM topic subscriptions.
 * Tracks session state via serverUserId to trigger synchronization on login/logout and language changes.
 */
export function useLanguageSync(serverUserId?: string) {
  const locale = useLocale();
  const prevLocaleRef = useRef(locale);
  const prevUserIdRef = useRef<string | undefined>("INITIAL"); // Use special string to detect first meaningful run

  const syncAll = useCallback(
    async (currentLocale: string, oldLocale?: string, isLogout = false) => {
      try {
        console.log(
          `🔄 [useLanguageSync] Sync Triggered - Type: ${isLogout ? "LOGOUT" : "LOGIN/UPDATE"}`,
          {
            currentLocale,
            oldLocale,
            serverUserId,
          },
        );

        if (isLogout) {
          console.log("🚪 [useLanguageSync] Clearing FCM Token on server...");
          await clearFCMToken();
          console.log("✅ [useLanguageSync] Logout sync complete.");
          return;
        }

        // Check permission if in browser
        if (typeof window !== "undefined" && "Notification" in window) {
          if (Notification.permission !== "granted") {
            console.warn(
              "⚠️ [useLanguageSync] Notification permission not granted.",
            );
            return;
          }
        }

        const token = await requestFCMToken();
        if (!token) {
          console.warn("⚠️ [useLanguageSync] Failed to get FCM token.");
          return;
        }

        console.log("✅ [useLanguageSync] FCM Token obtained");
        await Promise.all([
          updateFCMToken(token),
          updatePreferredLanguage(currentLocale),
        ]);

        const followed = await getFollowedCompanies();
        const companyIds = followed.map(
          (f: { following_id: string }) => f.following_id,
        );

        if (companyIds.length > 0) {
          console.log(
            `📡 [useLanguageSync] Syncing topics for ${companyIds.length} companies...`,
          );
          await syncFCMTopics(token, companyIds, oldLocale, currentLocale);
        }

        console.log("✨ [useLanguageSync] SYNC COMPLETED SUCCESSFULLY.");
      } catch (error) {
        console.error("❌ [useLanguageSync] Sync error:", error);
      }
    },
    [serverUserId],
  );

  useEffect(() => {
    // 1. Handle Logout Transition
    if (
      prevUserIdRef.current !== "INITIAL" &&
      prevUserIdRef.current &&
      !serverUserId
    ) {
      console.log("🔑 [useLanguageSync] Detect Logout via Prop Change");
      syncAll(locale, undefined, true);
    }

    // 2. Handle Login or Locale Change (when user is logged in)
    if (serverUserId) {
      const isNewLogin =
        prevUserIdRef.current !== "INITIAL" &&
        !prevUserIdRef.current &&
        serverUserId;
      const isLocaleChange = prevLocaleRef.current !== locale;
      const isInitialMount = prevUserIdRef.current === "INITIAL";

      if (isNewLogin || isLocaleChange || isInitialMount) {
        const oldLocale = isLocaleChange ? prevLocaleRef.current : undefined;
        console.log("🚀 [useLanguageSync] Execution conditions met", {
          isNewLogin,
          isLocaleChange,
          isInitialMount,
        });
        syncAll(locale, oldLocale);
      }
    }

    // Update refs for next render
    if (prevLocaleRef.current !== locale) {
      prevLocaleRef.current = locale;
    }
    if (prevUserIdRef.current !== serverUserId) {
      prevUserIdRef.current = serverUserId;
    }
  }, [serverUserId, locale, syncAll]);
}
