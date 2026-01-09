import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";

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

// Get trusted origins from environment variable or use defaults
const getTrustedOrigins = (): string[] => {
  const origins = process.env.TRUSTED_ORIGINS || "http://localhost:3000";
  return origins.split(",").map((origin) => origin.trim());
};

export const auth = betterAuth({
  database: mongodbAdapter(mongoDb, { client: connectedClient }),
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
