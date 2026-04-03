-- Profiles table
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  department text not null,
  role text not null check (role in ('employee', 'manager', 'hr')),
  salary integer not null,
  hire_date date not null default current_date
);

-- Performance reviews table
create table public.performance_reviews (
  id uuid primary key default gen_random_uuid(),
  reviewee_id uuid not null references public.profiles(id),
  reviewer_id uuid not null references public.profiles(id),
  rating integer not null check (rating between 1 and 5),
  comments text not null,
  private_notes text,
  review_period text not null,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.performance_reviews enable row level security;

-- Everyone can see all profile rows (app controls column visibility)
create policy "Anyone can view profiles"
  on public.profiles for select using (true);

-- Reviews: reviewees see their reviews
create policy "Reviewees see their reviews"
  on public.performance_reviews for select
  using (reviewee_id = current_setting('app.current_user_id', true)::uuid);

-- Reviews: reviewers see reviews they wrote
create policy "Reviewers see own reviews"
  on public.performance_reviews for select
  using (reviewer_id = current_setting('app.current_user_id', true)::uuid);

-- Reviews: HR sees all
create policy "HR sees all reviews"
  on public.performance_reviews for select
  using (
    exists (
      select 1 from public.profiles
      where id = current_setting('app.current_user_id', true)::uuid
        and role = 'hr'
    )
  );

-- Helper function: set current user context
create or replace function public.set_current_user(user_id uuid)
returns void language plpgsql security definer as $$
begin
  perform set_config('app.current_user_id', user_id::text, false);
end;
$$;
