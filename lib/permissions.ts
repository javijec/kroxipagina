/**
 * Utility for validating user permissions on the server-side
 */

export type UserRole = "admin" | "editor" | "viewer";

/**
 * Get the role of a user based on their email
 */
export function getUserRole(userEmail: string): UserRole {
  const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map((e) => e.trim()).filter(Boolean);
  const editorEmails = (process.env.ALLOWED_EDITORS || "").split(",").map((e) => e.trim()).filter(Boolean);

  if (adminEmails.includes(userEmail)) {
    return "admin";
  }
  if (editorEmails.includes(userEmail)) {
    return "editor";
  }
  return "viewer";
}

/**
 * Check if user has required role
 */
export function hasRole(
  userEmail: string | null | undefined,
  requiredRole: "admin" | "editor" | "viewer"
): boolean {
  if (!userEmail) return false;

  const userRole = getUserRole(userEmail);
  const roleHierarchy = { viewer: 0, editor: 1, admin: 2 };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

/**
 * Check if user can edit pages
 */
export function canEditPages(userEmail: string | null | undefined): boolean {
  return hasRole(userEmail, "editor");
}

/**
 * Check if user is admin
 */
export function isAdmin(userEmail: string | null | undefined): boolean {
  return hasRole(userEmail, "admin");
}
