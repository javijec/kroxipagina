import { auth } from "./auth";

export type UserRole = "admin" | "editor" | "viewer";

/**
 * Check if user has permission to access edit routes
 * Only admins and editors can edit
 */
export async function canEditPage(sessionToken?: string): Promise<boolean> {
  if (!sessionToken) return false;

  try {
    const session = await auth.api.getSession({
      headers: {
        cookie: `better-auth.session_token=${sessionToken}`,
      },
    } as any);

    if (!session?.user) return false;

    // Check if user has admin or editor role
    // For now, we'll check if user is in ADMIN_EMAILS or ALLOWED_EDITORS
    const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim()).filter(Boolean);
    const editorEmails = (process.env.ALLOWED_EDITORS || "").split(",").map(e => e.trim()).filter(Boolean);

    return adminEmails.includes(session.user.email) || editorEmails.includes(session.user.email);
  } catch (err) {
    console.error("❌ Error checking edit permission:", err);
    return false;
  }
}

/**
 * Get user role based on email
 */
export function getUserRole(email?: string): UserRole {
  if (!email) return "viewer";

  const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim()).filter(Boolean);
  const editorEmails = (process.env.ALLOWED_EDITORS || "").split(",").map(e => e.trim()).filter(Boolean);

  if (adminEmails.includes(email)) return "admin";
  if (editorEmails.includes(email)) return "editor";
  return "viewer";
}
