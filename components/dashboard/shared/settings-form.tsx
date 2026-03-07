"use client";

import { useTranslations } from "next-intl";
import { Bell, Lock, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { UserSettings } from "@/types/settings";
import { UserRole } from "@/types/enums";
import { SettingsCard } from "./settings-card";
import { ConfirmPrivacyDialog } from "./confirm-privacy-dialog";
import { useSettingsForm } from "@/hooks/use-settings-form";

interface SettingsFormProps {
  initialSettings: UserSettings;
  role: UserRole;
}

export function SettingsForm({ initialSettings, role }: SettingsFormProps) {
  const t = useTranslations("Dashboard.candidate.settings");
  const {
    optimisticSettings,
    handleToggle,
    showConfirm,
    setShowConfirm,
    confirmPrivacyChange,
  } = useSettingsForm(initialSettings, role);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SettingsCard
          id="account"
          title={t("account.title")}
          description={t("account.description")}
          icon={Lock}
          color="bg-violet-500/10 border-violet-500/20 text-violet-400"
        >
          <div className="space-y-4 pt-4">
            {[
              { icon: Globe, label: t("account.changeEmail") },
              { icon: Lock, label: t("account.changePassword") },
            ].map((item, i) => (
              <Button
                key={i}
                variant="outline"
                className="w-full justify-start gap-3 border-white/5 bg-white/5 hover:bg-white/10"
              >
                <item.icon className="w-4 h-4" /> {item.label}
              </Button>
            ))}
          </div>
        </SettingsCard>

        <SettingsCard
          id="notifications"
          title={t("notifications.title")}
          description={t("notifications.description")}
          icon={Bell}
          color="bg-blue-500/10 border-blue-500/20 text-blue-400"
          delay={0.1}
        >
          <div className="space-y-4 pt-4">
            {[
              { key: "email", label: t("notifications.emailNotifications") },
              { key: "push", label: t("notifications.pushNotifications") },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5"
              >
                <span className="text-sm">{item.label}</span>
                <Switch
                  checked={
                    optimisticSettings.notifications[
                      item.key as keyof UserSettings["notifications"]
                    ]
                  }
                  onCheckedChange={(val) =>
                    handleToggle("notifications", item.key, val)
                  }
                />
              </div>
            ))}
          </div>
        </SettingsCard>

        <SettingsCard
          id="privacy"
          title={t("privacy.title")}
          description={t("privacy.description")}
          icon={Shield}
          color="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
          delay={0.2}
        >
          <div className="space-y-4 pt-4">
            {[
              { key: "publicProfile", label: t("privacy.publicProfile") },
              ...(role === UserRole.CANDIDATE
                ? [
                    {
                      key: "showExperience",
                      label: t("privacy.showExperience"),
                    },
                  ]
                : []),
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5"
              >
                <span className="text-sm">{item.label}</span>
                <Switch
                  checked={
                    optimisticSettings.privacy[
                      item.key as keyof UserSettings["privacy"]
                    ]
                  }
                  onCheckedChange={(val) =>
                    handleToggle("privacy", item.key, val)
                  }
                />
              </div>
            ))}
          </div>
        </SettingsCard>
      </div>

      <ConfirmPrivacyDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={confirmPrivacyChange}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
