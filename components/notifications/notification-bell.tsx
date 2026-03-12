"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationList } from "./notification-list"; // Changed to relative import as per instruction
import { markAllNotificationsAsRead } from "@/actions/notifications.actions";
import { useTranslations } from "next-intl";
import { getFCM } from "@/lib/firebase";
import { onMessage } from "firebase/messaging";
import { toast } from "sonner";

interface NotificationBellProps {
  initialUnreadCount: number;
  locale: string;
}

export function NotificationBell({
  initialUnreadCount,
  locale,
}: NotificationBellProps) {
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Dashboard.notifications");

  // Listen for foreground FCM messages
  useEffect(() => {
    const messaging = getFCM();
    if (messaging) {
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("📩 [FCM] Foreground Message Received:", payload);

        // Increase unread count
        setUnreadCount((prev) => prev + 1);

        // Show a UI toast so the user knows they got a notification
        toast(payload.notification?.title || "New Notification", {
          description: payload.notification?.body,
          duration: 5000,
        });
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  const handleMarkAllRead = async () => {
    await markAllNotificationsAsRead();
    setUnreadCount(0);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-foreground/60 hover:text-foreground hover:bg-accent transition-colors"
        >
          <Bell className="w-5 h-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute top-2 right-2 flex h-3 w-3"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-80 p-0 bg-popover border-border shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h4 className="font-semibold text-foreground">{t("title")}</h4>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
            >
              {t("markAllRead")}
            </button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <NotificationList locale={locale} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
