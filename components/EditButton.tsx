"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "lib/auth-client";

export function EditButton() {
  const pathname = usePathname();
  const [canEdit, setCanEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Session caching to avoid unnecessary server validations and DB reconnections
  const CACHE_KEY = "kroxi_session_cache_v1";
  const TTL_SECS = Number(process.env.NEXT_PUBLIC_SESSION_CACHE_TTL || "300");

  const sessionRes = useSession();
  const session = (sessionRes as any)?.data ?? null;

  const getCachedSession = (): { email?: string; name?: string; expiresAt?: number } | null => {
    try {
      const raw = typeof window !== "undefined" ? sessionStorage.getItem(CACHE_KEY) : null;
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed.expiresAt || Date.now() > parsed.expiresAt) {
        sessionStorage.removeItem(CACHE_KEY);
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  };

  const setCachedSession = (data: { email?: string; name?: string } | null) => {
    try {
      if (!data) {
        sessionStorage.removeItem(CACHE_KEY);
        return;
      }
      const payload = { ...data, expiresAt: Date.now() + TTL_SECS * 1000 };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    // First check cached session
    const cached = getCachedSession();
    if (cached && cached.email) {
      const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);
      const editorEmails = (process.env.NEXT_PUBLIC_ALLOWED_EDITORS || "")
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

      const isEditor = adminEmails.includes(cached.email) || editorEmails.includes(cached.email);
      setCanEdit(isEditor);
      setIsLoading(false);
      return;
    }

    // Fallback to useSession result
    const user = session?.user;
    if (!user) {
      setCachedSession(null);
      setCanEdit(false);
      setIsLoading(false);
      return;
    }

    const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);
    const editorEmails = (process.env.NEXT_PUBLIC_ALLOWED_EDITORS || "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    const isEditor = adminEmails.includes(user.email) || editorEmails.includes(user.email);

    // Cache minimal session info for quick checks
    setCachedSession({ email: user.email, name: user.name });
    setCanEdit(isEditor);
    setIsLoading(false);
  }, [session]);

  // Don't show on edit pages or if user can't edit
  if (isLoading || !canEdit || pathname.endsWith("/edit") || pathname.startsWith("/auth")) {
    return null;
  }

  // Build edit URL correctly - if pathname is "/", it should be "/edit", otherwise "pathname/edit"
  const editUrl = pathname === "/" ? "/edit" : `${pathname}/edit`;

  return (
    <Link
      href={editUrl}
      className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors duration-200 group"
      title="Edit this page"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </Link>
  );
}
