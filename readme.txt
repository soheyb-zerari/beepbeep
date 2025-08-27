Project: beepbeep

Short description
- NestJS + Prisma example API for restaurants and users. Uses PostgreSQL via Prisma.

Requirements
- Node 18+ / npm
- PostgreSQL (local or Docker)
- Docker & Docker Compose (optional, for containerized run)

Quick setup (local dev)
1. Install dependencies:
   npm install

2. Copy or edit `.env` in project root and set at minimum:
   JWT_SECRET=your_jwt_secret
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/beepbeep_dev?schema=public"

3. Create DB and run migrations (or let prisma create schema):
   npx prisma migrate dev --name init
   npx prisma generate

4. Start dev server:
   npm run start:dev

Open: http://localhost:3000

Docker (compose)
- A `docker-compose.yml` is included to run Postgres + app in dev mode. It expects a `.env` file in the repo root.
- Bring the stack up:
   docker-compose up --build

Notes for Docker build/run
- The Docker build must run `prisma generate` before `npm run build` so generated Prisma client types exist in the image.
- If Prisma fails with an OpenSSL/libssl error inside the container, use a Debian-based Node image or install the required libssl package in the Dockerfile (see container logs).
- If you see a Docker pipe error on Windows, ensure Docker Desktop is running and using the correct backend (WSL2) and restart Docker if necessary.

Prisma
- Schema: `prisma/schema.prisma`
- Client generated to `node_modules/.prisma/client` after `npx prisma generate`.

Tests
- Run unit tests: npm test
- E2E tests: npm run test:e2e

Troubleshooting
- "Delete ␍" or Prettier/ESLint line-ending errors: normalize files to LF, ensure editor uses LF.
- Prisma missing types during Docker build: ensure `npx prisma generate` runs in the image prior to `npm run build`.
- Prisma OpenSSL error: install libssl (or use Debian-slim base image) in Dockerfile.
- Docker Desktop pipe errors on Windows: start/restart Docker Desktop, verify `docker info` shows server info.

Contacts
- Repository root contains source under `src/` (auth, user, restaurant, database modules).

End.
