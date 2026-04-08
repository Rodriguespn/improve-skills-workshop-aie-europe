#!/usr/bin/env python3
"""
Run the full eval harness for one iteration.

For each condition (with_skill, without_skill):
  1. Reset the database to initial conditions
  2. Run claude -p with the eval prompt (+ SKILL.md for with_skill)
  3. Grade the results against the database
  4. Print a summary

Usage:
  python evals/run_evals.py
  python evals/run_evals.py --iteration 2
  python evals/run_evals.py --condition with_skill   # run one condition only
"""

import argparse
import json
import os
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

import psycopg2
from dotenv import load_dotenv

# ── Paths ────────────────────────────────────────────────────────────────────

BASE_DIR   = Path(__file__).parent.parent   # supabase-skill/
EVALS_DIR  = Path(__file__).parent          # supabase-skill/evals/
WORKSPACE  = BASE_DIR / "workspace"
SKILL_MD   = BASE_DIR / "SKILL.md"
EVALS_JSON = EVALS_DIR / "evals.json"
SETUP_SQL  = EVALS_DIR / "setup.sql"

DB_URL = "postgresql://postgres:postgres@127.0.0.1:54322/postgres"

# ── Database helpers ─────────────────────────────────────────────────────────

def db_connect():
    return psycopg2.connect(DB_URL)


def reset_db():
    print("  Resetting database...")
    conn = db_connect()
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute(SETUP_SQL.read_text())
    if cur.description:
        rows = cur.fetchall()
        for check, result in rows:
            marker = "✓" if result.startswith("OK") else "✗"
            print(f"    {marker} {check}: {result}")
        if any(not r.startswith("OK") for _, r in rows):
            cur.close(); conn.close()
            raise RuntimeError("Database reset check failed — aborting.")
    cur.close()
    conn.close()
    print("  Database ready.\n")


# ── Grading ──────────────────────────────────────────────────────────────────

def check_view_exists(cur, view_name):
    cur.execute(
        "SELECT 1 FROM pg_views WHERE schemaname = 'public' AND viewname = %s",
        (view_name,),
    )
    exists = cur.fetchone() is not None
    return exists, (
        f"View '{view_name}' found in pg_views."
        if exists else f"View '{view_name}' not found in pg_views."
    )


def check_security_invoker(cur, view_name):
    cur.execute("SELECT reloptions FROM pg_class WHERE relname = %s", (view_name,))
    row = cur.fetchone()
    if row is None:
        return False, f"No pg_class entry for '{view_name}' — view does not exist."
    reloptions = row[0] or []
    passed = "security_invoker=true" in reloptions
    return passed, (
        f"reloptions = {reloptions}"
        if reloptions else "reloptions is NULL — security_invoker not set."
    )


def check_references_profiles(cur, view_name):
    cur.execute("SELECT definition FROM pg_views WHERE viewname = %s", (view_name,))
    row = cur.fetchone()
    if row is None:
        return False, f"View '{view_name}' not found."
    passed = "profiles" in row[0].lower()
    return passed, (
        "View definition references 'profiles'."
        if passed else f"View definition does not reference 'profiles'."
    )


def check_required_columns(cur, view_name):
    cur.execute("SELECT definition FROM pg_views WHERE viewname = %s", (view_name,))
    row = cur.fetchone()
    if row is None:
        return False, f"View '{view_name}' not found."
    definition = row[0].lower()
    required = ["headcount", "avg_salary", "min_salary", "max_salary"]
    missing = [c for c in required if c not in definition]
    passed = not missing
    return passed, (
        f"All required columns present: {required}."
        if passed else f"Missing columns: {missing}."
    )


ASSERTIONS = [
    ("The department_stats_view view exists in the database after the agent runs", check_view_exists),
    ("The view has security_invoker=true set in pg_class.reloptions",             check_security_invoker),
    ("The view selects from the profiles table",                                  check_references_profiles),
    ("The view includes headcount, avg_salary, min_salary, and max_salary columns", check_required_columns),
]


def grade(condition: str, iteration: int, eval_id: int = 1) -> dict:
    view_name = "department_stats_view"
    conn = db_connect()
    cur = conn.cursor()

    graded = []
    for text, fn in ASSERTIONS:
        passed, evidence = fn(cur, view_name)
        graded.append({"text": text, "passed": passed, "evidence": evidence})
        marker = "✓" if passed else "✗"
        print(f"    [{marker}] {text}")

    cur.close()
    conn.close()

    total  = len(graded)
    passed = sum(1 for g in graded if g["passed"])

    result = {
        "condition": condition,
        "iteration": iteration,
        "graded_at": datetime.now(timezone.utc).isoformat(),
        "evals": [{
            "eval_id": eval_id,
            "assertions": graded,
            "summary": {
                "passed": passed,
                "failed": total - passed,
                "total": total,
                "pass_rate": round(passed / total, 2),
            },
        }],
        "overall_summary": {
            "passed": passed,
            "failed": total - passed,
            "total": total,
            "pass_rate": round(passed / total, 2),
        },
    }

    out_dir = WORKSPACE / f"iteration-{iteration}" / condition
    out_dir.mkdir(parents=True, exist_ok=True)
    grading_path = out_dir / "grading.json"
    grading_path.write_text(json.dumps(result, indent=2))
    print(f"\n  {passed}/{total} assertions passed → {grading_path}")
    return result


# ── Claude runner ─────────────────────────────────────────────────────────────

def run_claude(prompt: str, condition: str, iteration: int, eval_id: int) -> str:
    out_dir = WORKSPACE / f"iteration-{iteration}" / condition / "outputs"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / f"eval-{eval_id}-output.md"

    cmd = [
        "claude", "-p",
        "--dangerously-skip-permissions",
        "--add-dir", str(BASE_DIR),
        "--allowedTools", "Bash,Read,Write",
    ]

    if condition == "with_skill":
        if not SKILL_MD.exists():
            raise RuntimeError(
                f"SKILL.md not found at {SKILL_MD}.\n"
                "Create your skill file before running the with_skill condition."
            )
        cmd += ["--append-system-prompt", SKILL_MD.read_text()]

    print(f"  Running claude -p ({condition})...")
    result = subprocess.run(
        cmd,
        input=prompt,
        capture_output=True,
        text=True,
        cwd=str(BASE_DIR),
        env={**os.environ},
    )

    if result.returncode != 0:
        print("  claude exited with an error:")
        print(result.stderr)
        raise RuntimeError("claude -p failed")

    out_file.write_text(result.stdout)
    print(f"  Output saved to {out_file}")
    return result.stdout


# ── Main ──────────────────────────────────────────────────────────────────────

def run_condition(condition: str, prompt: str, iteration: int, eval_id: int):
    print(f"\n{'─' * 60}")
    print(f"  Condition: {condition}  |  Iteration: {iteration}  |  Eval: {eval_id}")
    print(f"{'─' * 60}\n")

    reset_db()
    run_claude(prompt, condition, iteration, eval_id)
    print("\n  Grading...")
    grade(condition, iteration, eval_id)


def main():
    parser = argparse.ArgumentParser(description="Run the supabase-skill eval harness")
    parser.add_argument("--iteration", type=int, default=1)
    parser.add_argument(
        "--condition",
        choices=["with_skill", "without_skill", "both"],
        default="both",
    )
    args = parser.parse_args()

    load_dotenv(BASE_DIR.parent / ".env")
    if not os.environ.get("ANTHROPIC_API_KEY"):
        raise SystemExit(
            "ANTHROPIC_API_KEY not set.\n"
            "Copy .env.example to .env and add your key."
        )

    evals = json.loads(EVALS_JSON.read_text())["evals"]

    conditions = (
        ["with_skill", "without_skill"] if args.condition == "both"
        else [args.condition]
    )

    for ev in evals:
        for condition in conditions:
            try:
                run_condition(condition, ev["prompt"], args.iteration, ev["id"])
            except RuntimeError as e:
                print(f"\n  ERROR: {e}")
                if condition == "with_skill":
                    print("  Skipping with_skill, continuing to without_skill...\n")
                    continue
                sys.exit(1)

    print(f"\n{'─' * 60}")
    print("  Done. Results in:")
    for condition in conditions:
        print(f"    workspace/iteration-{args.iteration}/{condition}/")
    print(f"{'─' * 60}\n")


if __name__ == "__main__":
    main()
