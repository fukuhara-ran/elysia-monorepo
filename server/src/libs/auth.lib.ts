import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/client";
import { env } from "./env.lib";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.CLIENT_URL],
  emailAndPassword: { enabled: true }
});
