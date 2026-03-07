"use client";

import { useLanguageSync } from "@/hooks/use-language-sync";

interface LanguageSyncClientProps {
  userId?: string;
}

/**
 * Client component that mounts the useLanguageSync hook globally.
 * Receives the userId from the Server Component wrapper. // FIXED
 */
export function LanguageSyncClient({ userId }: LanguageSyncClientProps) {
  useLanguageSync(userId);
  return null;
}
