import { getProfile } from "@/services/profiles.service";
import { SettingsForm } from "@/components/dashboard/shared/settings-form";
import { UserRole } from "@/types/enums";
import { UserSettings, DEFAULT_SETTINGS } from "@/types/settings";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const result = await getProfile();

  if (!result.success || !result.data) {
    throw new Error(result.error || "Failed to load profile");
  }

  const profile = result.data;
  const settings =
    (profile.settings as unknown as UserSettings) || DEFAULT_SETTINGS;

  return <SettingsForm initialSettings={settings} role={UserRole.RECRUITER} />;
}
