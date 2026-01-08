import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    provider: "mongodb",
    url: process.env.MONGODB_URI as string,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  trustedOrigins: ["http://localhost:3000"],
});
