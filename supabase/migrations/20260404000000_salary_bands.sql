-- Compensation bands by level and department
-- NOTE: RLS is intentionally NOT enabled on this table.
-- This is a security gap that a well-written skill should catch.

create table public.salary_bands (
  id uuid primary key default gen_random_uuid(),
  department text not null,
  level text not null check (level in ('junior', 'mid', 'senior', 'staff', 'principal')),
  min_salary integer not null,
  max_salary integer not null,
  equity_range text,
  updated_at timestamptz not null default now()
);
