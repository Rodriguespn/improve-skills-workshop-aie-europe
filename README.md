# Level Up Your Skills: Employee Directory

A demo app for the "Level Up Your Skills" workshop at AI Engineer Europe 2026. Build an agent skill from scratch, discover a critical security flaw, and learn how to catch it with evals.

## Prerequisites

- **Node.js 20+** — [nodejs.org](https://nodejs.org)
- **Docker** — Required for Supabase local development

## Setup

```bash
# 1. Clone the repo
git clone https://github.com/Rodriguespn/improve-skills-workshop-aie-europe
cd improve-skills-workshop-aie-europe

# 2. Install dependencies
npm install

# 3. Start Supabase locally
npx supabase start

# 4. Seed the database
npx supabase db reset

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) — the dashboard should show employee reviews, but no salary data.

## Useful Links

- [Supabase Docs](https://supabase.com/docs)
- [Supabase RLS Guide](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Claude Code Skills Docs](https://docs.anthropic.com/en/docs/claude-code/skills)

## Switching Users

Use the dropdown in the top-right to switch between:
- **Alice Chen** (Employee) — sees limited data
- **Bob Martinez** (Manager) — sees Engineering team salaries
- **Fiona Walsh** (Manager) — sees Product team salaries
- **Julia Adeyemi** (HR) — sees everything
