# Review & Rehearsal Checklist

Use this to test everything and do a dry run of the workshop.

---

## Part 1: Verify the Artifacts

### Presentation (remote)
- [ ] Open https://skill-workshop.vercel.app
- [ ] Slides load, arrow keys navigate, D toggles dark/light
- [ ] Slide 0: Title — your name, email, Supabase logo, event pills
- [ ] Slide 1: What Are Skills — 3 numbered cards + terminal block
- [ ] Slide 2: Testing with Evals — circular cycle diagram, source attribution bottom-left
- [ ] Slide 3: What We're Doing — two columns, Write/Test/Break/Fix cards
- [ ] Slide 4: Demo — QR code is green, URL visible below, links to GitHub repo
- [ ] Slide 5: Eval Harness — two-column layout: file tree on left, evals.json snippet + pass/fail results on right
- [ ] Slide 6: Final Remarks — 3 icon cards (Measure Everything, Principles Over Templates, Small Iterations Win) + April 9 talk card
- [ ] Slide 7: Thank You — @rodriguespn23, pedro.rodrigues@supabase.io

### Presentation (local — should match remote)
- [ ] `npm run dev` → open http://localhost:3000
- [ ] Same 8 slides, same content

### API Routes
- [ ] `curl http://localhost:3000/api/slides` → full markdown, 8 slides
- [ ] `curl http://localhost:3000/api/slides/demo` → single slide markdown
- [ ] `curl http://localhost:3000/api/slides/bogus` → 404 with available IDs

### Skills
- [ ] In Claude Code, run `/presentation all` — fetches slides via API
- [ ] In Claude Code, run `/workshop-setup` — shows setup instructions

### GitHub Repo
- [ ] https://github.com/Rodriguespn/improve-skills-workshop-aie-europe — code is there
- [ ] QR code on slide 4 scans to this URL

---

## Part 2: Verify the Demo App
****
### Setup
```bash
npx supabase start
npx supabase db reset
npm run dev
```

### Dashboard (http://localhost:3000/dashboard)
- [ ] Loads as Alice (or last selected user)
- [ ] Two-column layout: profile left, reviews right
- [ ] Switch to Bob (manager) → profile shows salary, reviews update
- [ ] Switch to Julia (HR) → sees salary
- [ ] Switch back to Alice → **red warning: "Private Notes in API Response"**
  - [ ] Click "Show raw" → leaked notes visible ("Consider for senior promotion", "Salary bump to 110k recommended")
- [ ] Navigate to Directory → user stays as Alice (localStorage persistence)

### Directory (http://localhost:3000/directory)
- [ ] Shows all employees grouped by department
- [ ] As Alice (employee): no salaries visible
- [ ] As Bob (manager): sees Engineering salaries only
- [ ] As Julia (HR): sees all salaries

### Reports (http://localhost:3000/reports)
- [ ] Without the view: shows "No department_stats view found" empty state
- [ ] (After the agent creates the view): shows department stats
- [ ] As Alice with the view: **red "Data Leak Detected" banner** if salary data visible

### Edge Case: salary_bands table
- [ ] In Supabase Studio or psql: `SELECT * FROM salary_bands;` → returns all 12 rows
- [ ] No RLS on this table — any user can read compensation bands and equity ranges

---

## Part 3: Dry Run the Workshop (55 min demo section)

### Phase 1: Write the Skill (15 min)

Open Claude Code in the repo.

**Prompt to use:**
> "Write a skill that reviews Supabase database security. It should check RLS policies, table permissions, and common security gaps. Save it to .claude/skills/supabase-security/SKILL.md"

- [ ] Agent creates the skill
- [ ] Skill covers: RLS enabled on tables, policies exist, function security
- [ ] Review the SKILL.md — does it mention views? (probably not yet)

### Phase 2: Test It (10 min)

**Prompt to use:**
> "Review the security of our Supabase database using the supabase-security skill"

- [ ] Agent runs the skill against the database
- [ ] Reports: profiles ✓ RLS, performance_reviews ✓ RLS, policies exist ✓
- [ ] Does it flag `salary_bands`? (Maybe — depends on skill quality)
- [ ] Does it flag `private_notes` column exposure? (Unlikely on v1)
- [ ] Show the audience: "Skill says we're good. Are we?"

### Phase 3: Break It — The View Bypass (10 min)

**This is the side-by-side moment.**

Run two agents (or one after the other):
> "Create a department_stats view that shows headcount, average rating, salary range, and average salary per department"

- [ ] Agent creates the view (likely without `security_invoker = true`)
- [ ] Go to http://localhost:3000/reports
- [ ] Switch to Alice (employee) → **salary data visible → Data Leak Detected banner**
- [ ] "The skill passed every test. But it missed this."

### Phase 4: Fix & Discover More (20 min)

**Update the skill:**
> "The skill missed that views can bypass RLS. Update the supabase-security skill to check that all views use security_invoker = true. Also check for tables without RLS and columns that leak sensitive data through row-level access."

- [ ] Agent updates the SKILL.md

**Re-run the skill:**
> "Review our database security again with the updated skill"

- [ ] Agent now catches:
  - [ ] `department_stats` view missing `security_invoker = true`
  - [ ] `salary_bands` table has no RLS enabled
  - [ ] (Bonus) `private_notes` column accessible to reviewees via row-level access
- [ ] Fix the view: `CREATE OR REPLACE VIEW department_stats WITH (security_invoker = true) AS ...`
- [ ] Show reports page again as Alice → no more leak

### Eval Harness (5 min)
- [ ] Show the pre-wired file structure: `evals/evals.json`, `workspace/iteration-1/with_skill/`
- [ ] Walk through one test case: prompt, expected output, assertions
- [ ] Run the harness live — show `with_skill` vs `without_skill` results side by side
- [ ] "This is what we do in production at Supabase"

---

## Part 4: Pre-flight Before the Workshop

- [ ] Supabase Docker is running (`npx supabase status`)
- [ ] Database is freshly reset (`npx supabase db reset`)
- [ ] No `department_stats` view exists yet (the agent creates it during demo)
- [ ] `.claude/skills/supabase-security/` does NOT exist (the agent creates it during demo)
- [ ] Dev server starts cleanly (`npm run dev`)
- [ ] Presentation is accessible at https://skill-workshop.vercel.app
- [ ] Browser has two tabs ready: presentation + localhost:3000/dashboard
- [ ] Claude Code is open in the repo directory
- [ ] Font size in terminal is large enough for the room
