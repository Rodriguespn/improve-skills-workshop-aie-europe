-- Engineering department
insert into public.profiles (id, full_name, email, department, role, salary, hire_date) values
  ('a1111111-1111-1111-1111-111111111111', 'Alice Chen',     'alice@company.com',    'Engineering', 'employee', 95000,  '2023-03-15'),
  ('b2222222-2222-2222-2222-222222222222', 'Bob Martinez',   'bob@company.com',      'Engineering', 'manager',  140000, '2021-06-01'),
  ('c3333333-3333-3333-3333-333333333333', 'Charlie Kim',    'charlie@company.com',  'Engineering', 'employee', 110000, '2022-09-20'),
  ('d4444444-4444-4444-4444-444444444444', 'Dana Okafor',    'dana@company.com',     'Engineering', 'employee', 88000,  '2024-01-10'),
  ('e5555555-5555-5555-5555-555555555555', 'Eli Nakamura',   'eli@company.com',      'Engineering', 'employee', 102000, '2023-07-22');

-- Product department
insert into public.profiles (id, full_name, email, department, role, salary, hire_date) values
  ('f6666666-6666-6666-6666-666666666666', 'Fiona Walsh',    'fiona@company.com',    'Product',     'manager',  135000, '2020-11-15'),
  ('a7777777-7777-7777-7777-777777777777', 'George Petrov',  'george@company.com',   'Product',     'employee', 92000,  '2023-05-08'),
  ('b8888888-8888-8888-8888-888888888888', 'Hannah Lee',     'hannah@company.com',   'Product',     'employee', 98000,  '2024-02-28'),
  ('c9999999-9999-9999-9999-999999999999', 'Ivan Torres',    'ivan@company.com',     'Product',     'employee', 86000,  '2024-06-12');

-- HR
insert into public.profiles (id, full_name, email, department, role, salary, hire_date) values
  ('d0000000-0000-0000-0000-000000000000', 'Julia Adeyemi',  'julia@company.com',    'HR',          'hr',       120000, '2019-08-01');

-- Performance reviews
insert into public.performance_reviews (reviewee_id, reviewer_id, rating, comments, private_notes, review_period) values
  ('a1111111-1111-1111-1111-111111111111', 'b2222222-2222-2222-2222-222222222222', 4, 'Alice consistently delivers high-quality work. Strong debugging skills.', 'Consider for senior promotion in Q3. Salary bump to 110k recommended.', '2025-H2'),
  ('c3333333-3333-3333-3333-333333333333', 'b2222222-2222-2222-2222-222222222222', 5, 'Charlie led the migration project flawlessly. Exceptional technical leadership.', 'Already at senior level performance. Fast-track to staff? Comp is below band.', '2025-H2'),
  ('d4444444-4444-4444-4444-444444444444', 'b2222222-2222-2222-2222-222222222222', 3, 'Dana is growing but needs more ownership of projects.', 'PIP not needed yet but keep an eye on delivery timelines. Do not promote this cycle.', '2025-H2'),
  ('a7777777-7777-7777-7777-777777777777', 'f6666666-6666-6666-6666-666666666666', 4, 'George has excellent product instincts. Great stakeholder communication.', 'Retention risk — got a competing offer. Need to bump comp to 105k minimum.', '2025-H2'),
  ('b8888888-8888-8888-8888-888888888888', 'f6666666-6666-6666-6666-666666666666', 4, 'Hannah ramped up incredibly fast. Already operating at mid-level.', 'Exceptional hire. Accelerate review cycle — promote in 6 months not 12.', '2025-H2'),
  ('e5555555-5555-5555-5555-555555555555', 'b2222222-2222-2222-2222-222222222222', 2, 'Eli has been struggling with deadlines and code quality this cycle.', 'Discussed with HR. Starting formal PIP next month. Do not share with team.', '2025-H2');
