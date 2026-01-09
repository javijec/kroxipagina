"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "lib/auth-client";

export default function SetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    authClient.getSession().then((data) => {
      if (!data.data?.user) {
        router.push("/auth/signin");
      } else {
        setSession(data.data);
        // Pre-fill with existing nickname or email
        if (data.data.user.nickname) {
          setNickname(data.data.user.nickname);
          setIsEditing(false);
        } else {
          setNickname(data.data.user.email?.split("@")[0] || "");
          setIsEditing(true);
        }
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) {
      setError("Nickname is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Update user with nickname
      await authClient.updateUser(
        {
          nickname: nickname.trim(),
        },
        {
          onSuccess: () => {
            router.push(redirect);
          },
          onError: (ctx) => {
            setError(ctx.error?.message || "Error updating profile");
          },
        }
      );
    } catch (err: any) {
      setError(err.message || "Error updating profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    router.push(redirect);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {session.user.nickname ? "Welcome back!" : "Set your nickname"}
          </h2>
          <p className="text-center text-gray-600 mt-2">
            {session.user.nickname
              ? `Logged in as ${session.user.email}`
              : `Choose an alias to use on this site`}
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {isEditing ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                Nickname
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Choose your nickname"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <p className="mt-2 text-xs text-gray-500">
                This is the alias displayed on the website
              </p>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              {session.user.nickname && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setNickname(session.user.nickname);
                  }}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 font-medium text-center">{session.user.nickname}</p>
            </div>

            <button
              onClick={handleContinue}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
            >
              Continue
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full py-2 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
            >
              Change Nickname
            </button>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => authClient.signOut()}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Or sign out
          </button>
        </div>
      </div>
    </div>
  );
}
