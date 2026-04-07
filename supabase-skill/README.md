# Supabase Security Skill

This directory is where you build and test your Supabase security skill during the workshop.

## Structure

```
supabase-skill/
├── SKILL.md              ← you create this during the workshop
└── evals/
    └── evals.json        ← pre-loaded test cases; add your own here
```

Results from running the harness go to `workspace/` (git-ignored):

```
workspace/
└── iteration-1/
    ├── with_skill/
    │   ├── outputs/      ← agent output when skill is active
    │   └── grading.json  ← assertion results
    └── without_skill/
        ├── outputs/      ← agent output without the skill
        └── grading.json
```

## Running the Eval Harness

Once you have a `SKILL.md`, ask your agent:

```
Run the eval harness in supabase-skill/evals/evals.json.

For each test case:
1. Run the prompt with the skill active (SKILL.md loaded) — save outputs to supabase-skill/workspace/iteration-1/with_skill/
2. Run the prompt without the skill — save outputs to supabase-skill/workspace/iteration-1/without_skill/
3. Grade each assertion and save results to grading.json in each directory
```

## Adding Your Own Test Cases

Extend `evals/evals.json` with additional test cases following this format:

```json
{
  "id": 4,
  "prompt": "Your prompt here — describe a security scenario to test",
  "expected_output": "What a good answer looks like",
  "assertions": [
    "Specific, verifiable claim about the output",
    "Another claim — keep these concrete and checkable"
  ]
}
```

**Good assertions are:**
- Specific: "Flags salary_bands as missing RLS" not "identifies security issues"
- Verifiable: something you can check by reading the output
- Focused: one thing per assertion
