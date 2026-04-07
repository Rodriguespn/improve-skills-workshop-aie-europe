# Supabase Security Skill

This directory is where you build and test your Supabase security skill during the workshop.

## Structure

```
supabase-skill/
├── SKILL.md              ← you create this during the workshop
├── AGENTS.md             ← instructions passed to the eval agent
├── requirements.txt      ← Python dependencies
└── evals/
    ├── evals.json        ← test cases and assertions
    ├── setup.sql         ← resets the database to initial conditions
    └── run_evals.py      ← orchestrates the full harness (reset → run → grade)
```

Results go to `workspace/` (git-ignored):

```
workspace/
└── iteration-1/
    ├── with_skill/
    │   ├── outputs/
    │   │   └── eval-1-output.md   ← agent output when skill is active
    │   └── grading.json           ← assertion results
    └── without_skill/
        ├── outputs/
        │   └── eval-1-output.md   ← agent output without the skill
        └── grading.json
```

## Prerequisites

- Supabase running locally: `npx supabase start`
- A `SKILL.md` in this directory (create it during the workshop)
- An `.env` file with your Anthropic API key:

```bash
cp .env.example .env
# edit .env and set ANTHROPIC_API_KEY=your-key-here
```

- Python dependencies:

```bash
pip install -r supabase-skill/requirements.txt
```

## Running the Eval Harness

The simplest way to run everything is with `run_evals.py`. It handles reset → run → grade for each condition in sequence.

### Run both conditions

```bash
python supabase-skill/evals/run_evals.py
```

This runs `with_skill` first, then `without_skill`. For each condition it:
1. Resets the database to initial state
2. Spins up `claude -p` with the eval prompt (injecting `SKILL.md` for `with_skill`)
3. Grades the result against the database
4. Writes `grading.json`

Output looks like:

```
────────────────────────────────────────────────────────────
  Condition: with_skill  |  Iteration: 1  |  Eval: 1
────────────────────────────────────────────────────────────

  Resetting database...
    ✓ department_stats_view: OK — view absent, agent must create it
    ✓ salary_bands: OK — table present
    ✓ salary_bands RLS: OK — RLS off
  Database ready.

  Running claude -p (with_skill)...
  Output saved to workspace/iteration-1/with_skill/outputs/eval-1-output.md

  Grading...
    [✓] The department_stats_view view exists in the database after the agent runs
    [✓] The view has security_invoker=true set in pg_class.reloptions
    [✓] The view selects from the profiles table
    [✓] The view includes headcount, avg_salary, min_salary, and max_salary columns

  4/4 assertions passed → workspace/iteration-1/with_skill/grading.json

────────────────────────────────────────────────────────────
  Condition: without_skill  |  Iteration: 1  |  Eval: 1
────────────────────────────────────────────────────────────
  ...
```

### Run a single condition

```bash
python supabase-skill/evals/run_evals.py --condition with_skill
python supabase-skill/evals/run_evals.py --condition without_skill
```

### Run a new iteration

```bash
python supabase-skill/evals/run_evals.py --iteration 2
```

Results go to `workspace/iteration-2/`.

## How It Works

**Reset** (`reset.py` / `setup.sql`): Drops `department_stats_view` so the agent must create it from scratch. Also restores `salary_bands` and other state an agent may have modified.

**Run** (`run.py`): Calls `claude -p` with:
- The prompt from `evals.json`
- `--allowedTools Bash,Read,Write` — blocks Supabase MCP so the agent uses the local database via `psql`, not a remote cloud project
- `--append-system-prompt <SKILL.md>` — only for `with_skill`

**Grade** (`grade.py`): Queries `pg_class` and `pg_views` directly to check each assertion against the live database state. No LLM involved — pass/fail is determined by SQL.

## Adding Your Own Test Cases

Extend `evals/evals.json`:

```json
{
  "id": 2,
  "prompt": "Your prompt here — what the agent is asked to do",
  "expected_output": "What a correct result looks like",
  "assertions": [
    "Specific, verifiable claim checked against the database"
  ]
}
```

Then add the corresponding assertion check function to `grade.py`.
