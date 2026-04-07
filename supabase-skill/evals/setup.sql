-- Reset script: run before each eval to restore the vulnerable view state.
-- This ensures each run is independent — if an agent alters the view,
-- the next run starts fresh with the security gap intact.

DROP VIEW IF EXISTS public.department_stats;

CREATE VIEW public.department_stats AS
SELECT
  p.department,
  COUNT(*)                          AS headcount,
  AVG(p.salary)::integer            AS avg_salary,
  MIN(p.salary)                     AS min_salary,
  MAX(p.salary)                     AS max_salary,
  AVG(pr.rating)::numeric(3,2)      AS avg_performance_rating
FROM public.profiles p
LEFT JOIN public.performance_reviews pr ON pr.reviewee_id = p.id
GROUP BY p.department;

-- Verify: reloptions should be NULL (no security_invoker set)
SELECT relname, reloptions FROM pg_class WHERE relname = 'department_stats';
