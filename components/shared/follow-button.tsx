"use client";

import { useOptimistic, useTransition, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Loader2 } from "lucide-react";
import { toggleFollow } from "@/actions/follows.actions";
import { manageTopicSubscription } from "@/actions/notifications.actions";
import { getFCM } from "@/lib/firebase";
import { getToken } from "firebase/messaging";
import { useTranslations, useLocale } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FollowButtonProps {
  companyId: string;
  initialIsFollowing: boolean;
  className?: string;
}

export function FollowButton({
  companyId,
  initialIsFollowing,
  className,
}: FollowButtonProps) {
  const t = useTranslations("Common.follow");
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [optimisticIsFollowing, addOptimisticIsFollowing] = useOptimistic(
    initialIsFollowing,
    (state, newState: boolean) => newState,
  );

  const handleToggleFollow = useCallback(async () => {
    const newState = !optimisticIsFollowing;

    startTransition(async () => {
      addOptimisticIsFollowing(newState);
      const result = await toggleFollow(companyId);

      if (result.success) {
        // Handle FCM Topic Subscription
        const messaging = getFCM();
        if (messaging) {
          try {
            const token = await getToken(messaging, {
              vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
            });
            if (token) {
              await manageTopicSubscription(
                token,
                companyId,
                locale,
                result.action === "followed" ? "subscribe" : "unsubscribe",
              );
            }
          } catch (err) {
            console.error("FCM Token/Subscription error:", err);
          }
        }

        toast.success(
          result.action === "followed" ? t("success") : t("unfollowSuccess"),
        );
      } else {
        toast.error(result.error || t("error"));
      }
    });
  }, [companyId, optimisticIsFollowing, addOptimisticIsFollowing, locale, t]);

  return (
    <Button
      variant={optimisticIsFollowing ? "outline" : "default"}
      size="sm"
      onClick={handleToggleFollow}
      disabled={isPending}
      className={cn(
        "transition-all duration-300 gap-2",
        optimisticIsFollowing
          ? "border-violet-500/30 text-violet-400 hover:bg-violet-500/10"
          : "bg-violet-600 hover:bg-violet-500",
        className,
      )}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : optimisticIsFollowing ? (
        <BellOff className="w-4 h-4" />
      ) : (
        <Bell className="w-4 h-4" />
      )}
      {optimisticIsFollowing ? t("following") : t("follow")}
    </Button>
  );
}
