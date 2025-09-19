# USC Study-Group Match Board

Help USC students swap course sections and auto-form study groups, safely and fast.

## ✨ Features (MVP)
- @usc.edu **magic-link auth** (NextAuth + MailHog for dev)
- **Course & section** data (Postgres)
- **Study post**: availability grid (48×7), goals, modality, skill level
- **Matching (Week 2)**: overlap + goals (Jaccard) + modality → greedy groups of 3–5
- **Comms & Safety (Week 3)**: group threads, reports, rate limits
- **Metrics**: groups formed, time-to-group, response rate

## 🧰 Stack
Next.js (App Router, TS) • Prisma • Postgres • Docker • NextAuth (Email) • Tailwind • pnpm

## ✅ Prereqs
- macOS (Apple Silicon)
- Docker Desktop
- Node 20 (via nvm) + pnpm
- Postgres client (`psql`)

## 🚀 Quickstart

```bash
# 1) clone
git clone https://github.com/<you>/<repo>.git
cd <repo>

# 2) infra (Postgres + MailHog)
docker compose -f infra/docker-compose.yml up -d

# 3) env
cp .env.example .env
# set NEXTAUTH_SECRET and adjust ports if needed

# 4) DB schema
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma generate

# 5) (optional) seed sample courses
pnpm exec tsx scripts/seed-courses.ts

# 6) run
pnpm dev

Useful URLs

App: http://localhost:3000

Login: http://localhost:3000/login

Session JSON: http://localhost:3000/api/auth/session

MailHog (dev emails): http://localhost:8025
