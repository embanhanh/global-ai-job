import { z } from "zod";

export const userSettingsSchema = z.object({
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
  }),
  privacy: z.object({
    publicProfile: z.boolean(),
    showExperience: z.boolean(),
  }),
});

export type UserSettings = z.infer<typeof userSettingsSchema>;

export const DEFAULT_SETTINGS: UserSettings = {
  notifications: {
    email: true,
    push: true,
  },
  privacy: {
    publicProfile: true,
    showExperience: true,
  },
};
