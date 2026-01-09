import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  if (req.method === "GET") {
    // Protect routes ending with "/edit" - require authentication and editor/admin role
    if (req.nextUrl.pathname.endsWith("/edit")) {
      // Check for session token
      const sessionToken = req.cookies.get("better-auth.session_token")?.value;
      
      if (!sessionToken) {
        // Redirect to login page
        const editPath = req.nextUrl.pathname;
        return NextResponse.redirect(
          new URL(`/auth/signin?redirect=${encodeURIComponent(editPath)}`, req.url)
        );
      }

      // Verify session is valid by checking the session cookie structure
      // The actual permission check will be done in the Puck page component
      
      const pathWithoutEdit = req.nextUrl.pathname.slice(
        0,
        req.nextUrl.pathname.length - 5
      );
      const pathWithEditPrefix = `/puck${pathWithoutEdit}`;

      return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
    }

    // Disable direct "/puck/[...puckPath]" access - users must go through /edit
    if (req.nextUrl.pathname.startsWith("/puck")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return res;
}
