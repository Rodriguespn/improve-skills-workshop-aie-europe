create or replace view public.department_stats as
select
  p.department,
  count(p.id)::integer                      as headcount,
  coalesce(round(avg(pr.rating), 2), 0)     as avg_rating,
  coalesce(min(p.salary), 0)                as min_salary,
  coalesce(max(p.salary), 0)                as max_salary,
  coalesce(round(avg(p.salary)), 0)         as avg_salary
from public.profiles p
left join public.performance_reviews pr on pr.reviewee_id = p.id
group by p.department
order by p.department;
