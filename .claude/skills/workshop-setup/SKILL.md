---
name: workshop-setup
description: Set up the local environment for the Level Up Your Skills workshop
user-invocable: true
---

# Workshop Setup

Set up your local environment for the **Level Up Your Skills** workshop at AI Engineer Europe 2026.

## Prerequisites

- **Node.js 20+** — [nodejs.org](https://nodejs.org)
- **Docker** — Required for Supabase local development
- **Claude Code CLI** — [claude.ai/code](https://claude.ai/code)

## Setup Steps

Run these commands in order:

```bash
# 1. Clone the repo (if you haven't already)
git clone <repo-url>
cd skill-workshop

# 2. Install dependencies
npm install

# 3. Start Supabase locally
npx supabase start

# 4. Seed the database
npx supabase db reset

# 5. Start the dev server
npm run dev
```

## Verify It Works

1. Open [http://localhost:3000](http://localhost:3000) — you should see the Employee Directory dashboard
2. Use the role switcher (top-right) to switch between users:
   - **Alice Chen** — Employee (Engineering)
   - **Bob Martinez** — Manager (Engineering)
   - **Fiona Walsh** — Manager (Product)
   - **Julia Adeyemi** — HR
3. Open [http://localhost:3000/presentation](http://localhost:3000/presentation) — the workshop slides

## Workshop MCP Server

The workshop MCP server is **pre-configured** in `.claude/settings.json` and will be available automatically. No manual setup needed.

Use `/presentation` to fetch slide content or get help if you're lost during the workshop.

## Useful Links

- [Supabase Docs](https://supabase.com/docs)
- [Supabase RLS Guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Claude Code Skills Docs](https://docs.anthropic.com/en/docs/claude-code/skills)
