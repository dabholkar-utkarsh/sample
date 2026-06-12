# exmple

Minimal Turborepo monorepo — NestJS API + two Next.js frontends, ready for Railway.

## Stack

- **Monorepo:** Turborepo + pnpm workspaces (Node 20+)
- **API:** NestJS (REST + GraphQL), BullMQ, @nestjs/schedule
- **Frontends:** Next.js 14 (App Router) — `apps/app` (portal) and `apps/admin`
- **Database:** PostgreSQL + Prisma (`packages/database`)
- **Deploy:** Railway (single API service)

## Quick start (local)

```bash
# Install
pnpm install

# Copy env and set DATABASE_URL
cp .env.example .env

# Generate Prisma client + push schema (requires Postgres)
pnpm db:generate
pnpm db:push

# Run everything
pnpm dev
```

| Service | URL |
|---------|-----|
| Public portal | http://localhost:3000 |
| Admin | http://localhost:3001 |
| API | http://localhost:4000 |
| GraphQL | http://localhost:4000/graphql |
| Health | http://localhost:4000/health |

## Deploy to Railway

1. Push this repo to GitHub.
2. Create a new **Railway** project → **Deploy from GitHub repo**.
3. Add a **PostgreSQL** plugin — Railway sets `DATABASE_URL` automatically.
4. (Optional) Add **Redis** for BullMQ queues — sets `REDIS_URL`.
5. Set environment variables from `.env.example` as needed.
6. Railway uses `railway.toml` / `railway.json` to build and start the API.

**Build:** generates Prisma client, builds `@repo/database` and `@repo/api`.  
**Start:** `node apps/api/dist/main.js`  
**Health check:** `GET /health`

### Frontends on Railway

The API is configured as the single Railway service. To deploy frontends:

- Create separate Railway services for `apps/app` and `apps/admin`
- Set root directory to the app folder
- Build: `pnpm install && pnpm build`
- Start: `pnpm start`
- Set `NEXT_PUBLIC_API_URL` to your API service URL

## API endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/hello` | Sample REST |
| GET | `/api/users` | List users |
| POST | `/graphql` | GraphQL (query `hello`, `users`; mutation `createUser`) |

## Project structure

```
apps/
  api/      NestJS backend
  app/      Public Next.js portal
  admin/    Internal admin Next.js
packages/
  database/ Prisma schema + client
```

## Optional integrations

Env vars for Clerk, Anthropic, AWS S3, and Resend are in `.env.example`. The API loads BullMQ only when `REDIS_URL` is set.
