import { createClient } from "@/lib/supabase/server";
import { LanguageSyncClient } from "./language-sync-client";
import { Suspense } from "react";

/**
 * Server component that fetches the user session and passes the ID to the client hook.
 * This ensures the client hook correctly responds to server-side login/logout events.
 */
export async function LanguageSync() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Suspense fallback={null}>
      <LanguageSyncClient userId={user?.id} />
    </Suspense>
  );
}
