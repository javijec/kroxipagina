"use client";

import { useSession, signIn, signOut } from "lib/auth-client";
import { useState } from "react";

interface AuthButtonProps {
  textColor: string;
}

export default function AuthButton({ textColor }: AuthButtonProps) {
  const { data: session, isPending } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (isPending) {
    return <div className={`px-3 py-2 text-sm ${textColor}`}>Cargando...</div>;
  }

  if (session) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity ${textColor}`}
        >
          {session.user.image && (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="hidden md:inline">{session.user.name}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isDropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsDropdownOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                {session.user.email}
              </div>
              <button
                onClick={() => {
                  signOut();
                  setIsDropdownOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() =>
        signIn.social({
          provider: "google",
          callbackURL: window.location.pathname,
        })
      }
      className={`px-4 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity border ${
        textColor === "text-white"
          ? "border-white hover:bg-white hover:text-black"
          : "border-gray-900 hover:bg-gray-900 hover:text-white"
      }`}
    >
      Iniciar sesión
    </button>
  );
}
