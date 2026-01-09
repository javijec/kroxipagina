"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { authClient } from "lib/auth-client";

export function EditButton() {
  const pathname = usePathname();
  const [canEdit, setCanEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const session = await authClient.getSession();
        
        if (!session.data?.user) {
          setCanEdit(false);
          return;
        }

        // Check if user is admin or editor
        const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean);
        const editorEmails = (process.env.NEXT_PUBLIC_ALLOWED_EDITORS || "")
          .split(",")
          .map((e) => e.trim())
          .filter(Boolean);

        const isEditor =
          adminEmails.includes(session.data.user.email) ||
          editorEmails.includes(session.data.user.email);

        setCanEdit(isEditor);
      } catch (err) {
        setCanEdit(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPermission();
  }, []);

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
