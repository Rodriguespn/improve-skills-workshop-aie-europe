# Skill Workshop: Employee Directory

A demo app for the "Skill Issue" workshop at MCP Dev Summit 2026.

## Quick Start

```bash
# 1. Start local Supabase
npx supabase start

# 2. Reset database (applies migrations + seed)
npx supabase db reset

# 3. Start the app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Workshop Branches

| Branch | What's There |
|--------|-------------|
| `main` | Starter app — no skills, no evals |
| `step/1-first-skill` | v1 SKILL.md (basic RLS rules) |
| `step/2-manual-test` | Agent output from table test |
| `step/3-wow-moment` | RLS view leak demo |
| `step/4-iterate` | v2 SKILL.md with view fix |
| `step/5-eval-setup` | Eval harness + Braintrust |

## Switching Users

Use the dropdown in the top-right to switch between:
- **Alice Chen** (Employee) — sees limited data
- **Bob Martinez** (Manager) — sees Engineering team salaries
- **Fiona Walsh** (Manager) — sees Product team salaries
- **Julia Adeyemi** (HR) — sees everything
