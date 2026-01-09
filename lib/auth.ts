import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";
import { getCachedSession, setCachedSession, DEFAULT_SESSION_CACHE_TTL } from "./session-cache";

// Validate required environment variables
const requiredEnvVars = ["MONGODB_URI", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"];
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(
      ", "
    )}. Create a .env.local with these variables and restart the dev server.`
  );
}

// Reuse single connected client from lib/mongodb to avoid creating multiple connections
const connectedClient = await clientPromise;
const mongoDb = connectedClient.db();

// Wrap the MongoDB adapter to add a lightweight in-memory cache for session lookups.
// This reduces repeated DB reads for session validation (useful during frequent client checks).
const baseAdapter = mongodbAdapter(mongoDb, { client: connectedClient }) as any;

// Override only the session lookup with cache but keep the same adapter instance to avoid breaking internal shape
const originalGetSessionByToken = baseAdapter.getSessionByToken?.bind(baseAdapter);
if (originalGetSessionByToken) {
  baseAdapter.getSessionByToken = async (token: string) => {
    try {
      const cached = getCachedSession(token);
      if (cached) return cached;
    } catch {
      // ignore cache errors and fallback to DB
    }

    const res = await originalGetSessionByToken(token);
    try {
      if (res) setCachedSession(token, res, DEFAULT_SESSION_CACHE_TTL);
    } catch {
      // ignore caching errors
    }
    return res;
  };
}

// Get trusted origins from environment variable or use defaults
const getTrustedOrigins = (): string[] => {
  const origins = process.env.TRUSTED_ORIGINS || "http://localhost:3000";
  return origins.split(",").map((origin) => origin.trim());
};

export const auth = betterAuth({
  database: baseAdapter as any,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      nickname: {
        type: "string",
        required: false,
      },
    },
  },
  trustedOrigins: getTrustedOrigins(),
  // Enable secure cookies in production
  session: {
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
});
