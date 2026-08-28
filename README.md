# elysia-monorepo

setup:
```
cp .env.example .env
cp .env.example server/.env
docker compose up -d
bun install
bun run db:generate
bun run db:migrate
bun run dev
```

workspaces:
- `shared` — zod schema, single source truth type server+client
- `server` — elysia api, drizzle orm, better-auth
- `client` — react ts, bun native build (no vite), tanstack router/query/table/form

route tree gen needed once before first dev run:
```
cd client && bun run routes:generate
```
