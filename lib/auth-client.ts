import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

// Exporta los métodos directamente del cliente
export const { signIn, signUp, signOut, useSession } = authClient;
