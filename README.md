# Level Up Your Skills: Employee Directory

A demo app for the "Level Up Your Skills" workshop at AI Engineer Europe 2026. Build an agent skill from scratch, discover a critical security flaw, and learn how to catch it with evals.

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
| `step/3-break-it` | RLS view leak demo |
| `step/4-fix-skill` | v2 SKILL.md with view security check |
| `step/5-eval-setup` | Eval harness |

## Switching Users

Use the dropdown in the top-right to switch between:
- **Alice Chen** (Employee) — sees limited data
- **Bob Martinez** (Manager) — sees Engineering team salaries
- **Fiona Walsh** (Manager) — sees Product team salaries
- **Julia Adeyemi** (HR) — sees everything
