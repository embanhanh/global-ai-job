import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

// Next.js 16: This file replaces middleware.ts
// Named export 'proxy' is required for the new proxy convention
const intlProxy = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  const pathname = request.nextUrl.pathname;
  const isProtectedPath = /^\/(vi|en)?\/(candidate|recruiter)(\/|$)/.test(
    pathname,
  );

  if (isProtectedPath && !user) {
    const locale = pathname.match(/^\/(vi|en)/)?.[1] || "vi";
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${locale}/login`;
    return NextResponse.redirect(redirectUrl);
  }

  const intlResponse = intlProxy(request);

  // Merge cookies from supabaseResponse to intlResponse to preserve auth session updates
  supabaseResponse.cookies
    .getAll()
    .forEach((cookie: { name: string; value: string }) => {
      intlResponse.cookies.set(cookie.name, cookie.value);
    });

  return intlResponse;
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
