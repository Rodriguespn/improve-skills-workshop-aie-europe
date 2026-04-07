-- Compensation bands by level and department

create table public.salary_bands (
  id uuid primary key default gen_random_uuid(),
  department text not null,
  level text not null check (level in ('junior', 'mid', 'senior', 'staff', 'principal')),
  min_salary integer not null,
  max_salary integer not null,
  equity_range text,
  updated_at timestamptz not null default now()
);
