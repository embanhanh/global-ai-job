import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";

// Next.js 16: This file replaces middleware.ts
// Named export 'proxy' is required for the new proxy convention
const intlProxy = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // Update session before intl handles the request
  await updateSession(request);
  return intlProxy(request);
}

// Alternatively, use default export (both work during transition period)
export default intlProxy;

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(vi|en)/:path*",
    // Enable redirects that add missing locales
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
