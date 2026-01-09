import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Environment variable MONGODB_URI is not set. Create a .env.local with MONGODB_URI and restart the dev server.'
  );
}

// Reuse single connected client from lib/mongodb to avoid creating multiple connections
const connectedClient = await clientPromise;
const mongoDb = connectedClient.db();

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
  trustedOrigins: ["http://localhost:3000"],
});
