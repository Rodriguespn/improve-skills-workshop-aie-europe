export interface Profile {
  id: string;
  full_name: string;
  email: string;
  department: string;
  role: "employee" | "manager" | "hr";
  salary: number;
  hire_date: string;
}

export interface PerformanceReview {
  id: string;
  reviewee_id: string;
  reviewer_id: string;
  rating: number;
  comments: string;
  private_notes: string | null;
  review_period: string;
  created_at: string;
  reviewer?: Profile;
  reviewee?: Profile;
}

export interface DepartmentStats {
  department: string;
  headcount: number;
  avg_rating: number;
  min_salary: number;
  max_salary: number;
  avg_salary: number;
}

export interface AppUser {
  id: string;
  name: string;
  role: "employee" | "manager" | "hr";
  department: string;
}
