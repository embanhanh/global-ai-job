"use client";

import { useEffect, useState } from "react";
import { getNotifications } from "@/services/notifications.service";
import { markNotificationAsRead } from "@/actions/notifications.actions";
import { formatDistanceToNow } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import { useTranslations } from "next-intl";
import { Bell, Briefcase, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  NotificationRecord,
  NewJobPostedMetadata,
  NewApplicationMetadata,
} from "@/types/notifications";

interface NotificationListProps {
  locale: string;
}

export function NotificationList({ locale }: NotificationListProps) {
  const [notifications, setNotifications] = useState<NotificationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("Dashboard.notifications");
  const dateLocale = locale === "vi" ? vi : enUS;

  useEffect(() => {
    async function fetchNotifications() {
      const data = await getNotifications();
      setNotifications(data as NotificationRecord[]);
      setIsLoading(false);
    }
    fetchNotifications();
  }, []);

  const handleRead = async (id: string) => {
    await markNotificationAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground text-sm">
        <Bell className="w-8 h-8 mx-auto mb-2 animate-pulse opacity-20" />
        {t("loading")}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground text-sm">
        <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
        {t("empty")}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {notifications.map((notification) => {
        const isJobPosted = notification.type === "NEW_JOB_POSTED";
        const isAppReceived = notification.type === "NEW_APPLICATION";
        const jobPostedMeta = notification.metadata as NewJobPostedMetadata;
        const appReceivedMeta = notification.metadata as NewApplicationMetadata;

        const href = isAppReceived
          ? `/recruiter/jobs/${appReceivedMeta.job_id}/applicants/${appReceivedMeta.application_id}`
          : `/jobs/${notification.metadata.job_id}`;

        return (
          <div
            key={notification.id}
            className={cn(
              "p-4 border-b border-border hover:bg-muted/50 transition-colors relative group",
              !notification.is_read && "bg-primary/5",
            )}
          >
            <div className="flex gap-3">
              <div className="mt-1">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-foreground/90 leading-relaxed">
                  {/* Dynamically render notification content based on type and metadata */}
                  {isJobPosted &&
                    t.rich("NEW_JOB_POSTED", {
                      company_name: jobPostedMeta.company_name,
                      job_title: jobPostedMeta.job_title,
                      company: (chunks) => (
                        <span className="font-semibold text-foreground">
                          {chunks}
                        </span>
                      ),
                      job: (chunks) => (
                        <span className="text-primary">{chunks}</span>
                      ),
                    })}
                  {isAppReceived &&
                    t.rich("NEW_APPLICATION", {
                      candidate_name: appReceivedMeta.candidate_name,
                      job_title: appReceivedMeta.job_title,
                      candidate: (chunks) => (
                        <span className="font-semibold text-foreground">
                          {chunks}
                        </span>
                      ),
                      job: (chunks) => (
                        <span className="text-primary">{chunks}</span>
                      ),
                    })}
                  {!isJobPosted && !isAppReceived && t("newNotification")}
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  {formatDistanceToNow(new Date(notification.created_at), {
                    addSuffix: true,
                    locale: dateLocale,
                  })}
                </p>
              </div>
              {!notification.is_read && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRead(notification.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity z-10 relative"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </button>
              )}
            </div>
            <Link
              href={href}
              className="absolute inset-0 z-0"
              onClick={() =>
                !notification.is_read && handleRead(notification.id)
              }
            />
          </div>
        );
      })}
    </div>
  );
}
