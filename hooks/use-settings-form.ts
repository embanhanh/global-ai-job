"use client";

import { useOptimistic, useState, useTransition, useCallback } from "react";
import { UserSettings } from "@/types/settings";
import { updateSettingsAction } from "@/actions/profile.actions";
import { toast } from "sonner";
import { UserRole } from "@/types/enums";
import { useDebouncedCallback } from "@/hooks/use-debounce";
import { useTranslations } from "next-intl";

export function useSettingsForm(initialSettings: UserSettings, role: UserRole) {
  const t = useTranslations("Dashboard.candidate.settings");
  const [, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingPublicProfile, setPendingPublicProfile] = useState<
    boolean | null
  >(null);

  const [optimisticSettings, addOptimisticSetting] = useOptimistic(
    initialSettings,
    (
      state,
      {
        section,
        key,
        value,
      }: { section: keyof UserSettings; key: string; value: boolean },
    ) => ({
      ...state,
      [section]: { ...state[section], [key]: value },
    }),
  );

  const debouncedUpdate = useDebouncedCallback(
    async (settings: UserSettings) => {
      startTransition(async () => {
        const result = await updateSettingsAction(settings);
        if (result.success) {
          toast.success(t("saveSuccess") || "Cập nhật thành công");
        } else {
          toast.error(result.error || "Có lỗi xảy ra");
        }
      });
    },
    1000,
  );

  const handleToggle = useCallback(
    (section: keyof UserSettings, key: string, value: boolean) => {
      if (
        role === UserRole.CANDIDATE &&
        section === "privacy" &&
        key === "publicProfile" &&
        !value
      ) {
        setPendingPublicProfile(value);
        setShowConfirm(true);
        return;
      }

      const updatedSettings = {
        ...optimisticSettings,
        [section]: { ...optimisticSettings[section], [key]: value },
      };

      startTransition(() => {
        addOptimisticSetting({ section, key, value });
      });
      debouncedUpdate(updatedSettings);
    },
    [role, optimisticSettings, addOptimisticSetting, debouncedUpdate],
  );

  const confirmPrivacyChange = () => {
    if (pendingPublicProfile !== null) {
      handleToggle("privacy", "publicProfile", pendingPublicProfile);
      setPendingPublicProfile(null);
    }
    setShowConfirm(false);
  };

  return {
    optimisticSettings,
    handleToggle,
    showConfirm,
    setShowConfirm,
    confirmPrivacyChange,
  };
}
