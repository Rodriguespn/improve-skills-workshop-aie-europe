---
name: presentation
description: Fetch slide content from the Level Up Your Skills workshop presentation
user-invocable: true
argument-hint: "[slide-id or 'all']"
---

# Workshop Presentation

Fetch and display slide content from the **Level Up Your Skills** workshop at AI Engineer Europe 2026.

## How to Use

The dev server must be running (`npm run dev`).

- `GET http://localhost:3000/api/slides` — All slides as markdown
- `GET http://localhost:3000/api/slides/{id}` — Single slide as markdown

## Available Slides

| ID | Title |
|----|-------|
| `title` | Level Up Your Skills |
| `what-are-skills` | What Are Skills? |
| `testing-with-evals` | Testing with Evals |
| `what-were-doing` | What We're Doing |
| `demo` | Demo |
| `eval-harness` | Eval Harness |
| `final-remarks` | Final Remarks |
| `thank-you` | Thank You |

## Lost? Catch Up with Step Branches

If you've fallen behind during the workshop, check out a step branch:

```bash
git checkout step/1-first-skill   # Starting point with v1 skill
git checkout step/2-manual-test   # After manual testing
git checkout step/3-break-it      # After discovering the RLS leak
git checkout step/4-fix-skill     # After fixing the skill
git checkout step/5-eval-setup    # With eval harness pre-wired
```
