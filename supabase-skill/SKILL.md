---
name: supabase-security
description: >
  Use when writing any SQL for Supabase — creating views, tables, functions, or RLS policies.
  Supabase has several security behaviors that differ from vanilla Postgres in ways that silently
  create vulnerabilities. This skill makes sure those traps are caught before they ship.
  Trigger whenever the user is working with Supabase schema, migrations, views, or row-level security.
---

# Supabase Security

Supabase exposes your Postgres database directly via a REST and GraphQL API. This means mistakes
that would be harmless in a backend-only app become public vulnerabilities. The three most common
traps are below — understand them, and you'll catch 90% of Supabase security issues.

## 1. Views bypass RLS by default

In Postgres, a view runs as its **owner** (usually a superuser), not as the user who queries it.
This means RLS policies on the underlying tables are silently ignored.

**Always create views with `security_invoker = true`:**

```sql
CREATE VIEW public.department_stats
WITH (security_invoker = true) AS
SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary
FROM public.profiles
GROUP BY department;
```

This forces the view to run as the querying user, so their RLS policies apply. Without it,
any authenticated user can read every row regardless of what the policies say.

> Requires Postgres 15+. Supabase projects run 15+ by default — check `config.toml` if unsure.

## 2. Every table in the public schema needs RLS

Supabase exposes the `public` schema through its Data API. A table without RLS enabled is
readable (and often writable) by anyone with an API key — including the public `anon` key.

After creating any table, always do:

```sql
ALTER TABLE public.your_table ENABLE ROW LEVEL SECURITY;
```

Then add policies that match the actual access model. No policy = no access (safe default).
A blanket `USING (true)` policy = everyone sees everything (usually wrong).

## 3. SECURITY DEFINER functions don't belong in the public schema

A `SECURITY DEFINER` function runs with the privileges of its creator, bypassing RLS entirely.
Putting one in the `public` schema means any API caller can invoke it.

```sql
-- Bad: callable by anyone via the API
CREATE FUNCTION public.admin_action() ... SECURITY DEFINER;

-- Good: hidden from the API
CREATE SCHEMA IF NOT EXISTS private;
CREATE FUNCTION private.admin_action() ... SECURITY DEFINER;
```

## Quick checklist

When writing or reviewing Supabase SQL, run through this before finishing:

- [ ] New view? Add `WITH (security_invoker = true)`
- [ ] New table in `public`? Add `ENABLE ROW LEVEL SECURITY` + appropriate policies
- [ ] New `SECURITY DEFINER` function? Move it to a private schema
- [ ] RLS policies using `auth.uid()` or a verified claim? Not a mutable session variable?
