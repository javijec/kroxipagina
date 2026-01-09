import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Add security headers
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-XSS-Protection", "1; mode=block");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (req.method === "GET") {
    // Protect routes ending with "/edit" - require authentication
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

      // Rewrite to puck editor (permission check happens in Puck page component)
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

  // Protect API routes
  if (req.nextUrl.pathname.startsWith("/api/puck")) {
    if (req.method !== "GET" && req.method !== "POST") {
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
    }

    // POST requests to API must have session token
    if (req.method === "POST") {
      const sessionToken = req.cookies.get("better-auth.session_token")?.value;

      if (!sessionToken) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
    }
  }

  return res;
}
