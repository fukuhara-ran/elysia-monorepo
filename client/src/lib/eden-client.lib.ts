import { treaty } from "@elysiajs/eden";
import type { App } from "@elysia-monorepo/server/src/index";

// Bun inlines process.env.* at build time for browser bundles, no vite import.meta.env needed
export const api = treaty<App>(process.env.PUBLIC_API_URL ?? "http://localhost:3000", {
  fetch: { credentials: "include" }
});
