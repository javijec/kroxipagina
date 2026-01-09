import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Environment variable MONGODB_URI is not set. Create a .env.local with MONGODB_URI and restart the dev server.'
  );
}

// Create a MongoDB client and get the database instance
const mongoClient = new MongoClient(process.env.MONGODB_URI);
const mongoDb = mongoClient.db();

export const auth = betterAuth({
  database: mongodbAdapter(mongoDb, { client: mongoClient }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ["http://localhost:3000"],
});
